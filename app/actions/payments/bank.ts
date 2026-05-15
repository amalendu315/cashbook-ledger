"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface FilterParams {
  companyId?: string;
  fromDate?: string;
  toDate?: string;
  bookingId?: string;
  payee?: string;
  approver?: string;
}

// Fetch data for the Bank Payment Grid and Form Dropdowns
export async function getBankPaymentData(filters?: FilterParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized access");

    const isAdmin =
      session.user.role === "ADMIN" || session.user.companyIds.includes("ALL");
    const userCompanyIds = session.user.companyIds || [];

    // 1. Fetch allowed companies (RBAC)
    const companies = await prisma.company.findMany({
      where: isAdmin ? {} : { id: { in: userCompanyIds } },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    // 2. Fetch Active Ledgers based on Company Assignments
    const ledgers = await prisma.ledger.findMany({
      where: {
        isActive: true,
        ...(isAdmin
          ? {}
          : {
              OR: [
                { companies: { none: {} } },
                { companies: { some: { companyId: { in: userCompanyIds } } } },
              ],
            }),
      },
      select: {
        id: true,
        ledger_name: true,
        companies: { select: { companyId: true } },
      },
      orderBy: { ledger_name: "asc" },
    });

    const paymentModes = await prisma.paymentMode.findMany({
      where: { isActive: true, category: "BANK" },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    // 3. Build the dynamic WHERE clause for Transactions
    const whereClause: any = {
      type: "BANK_PAYMENT",
    };

    // Apply RBAC and Company Filter
    if (isAdmin) {
      if (filters?.companyId && filters.companyId !== "ALL") {
        whereClause.companyId = filters.companyId;
      }
    } else {
      if (filters?.companyId && filters.companyId !== "ALL") {
        // Ensure requested company is within user's allowed companies
        if (userCompanyIds.includes(filters.companyId)) {
          whereClause.companyId = filters.companyId;
        } else {
          whereClause.companyId = "UNAUTHORIZED_ACCESS"; // Block access
        }
      } else {
        // Restrict to only their allowed companies
        whereClause.companyId = { in: userCompanyIds };
      }
    }

    // Apply remaining filters if they exist
    if (filters) {
      // Date Range Filtering
      if (filters.fromDate && filters.toDate) {
        whereClause.businessDate = {
          gte: new Date(filters.fromDate),
          lte: new Date(filters.toDate),
        };
      } else if (filters.fromDate) {
        whereClause.businessDate = { gte: new Date(filters.fromDate) };
      } else if (filters.toDate) {
        whereClause.businessDate = { lte: new Date(filters.toDate) };
      }

      // Text searches
      if (filters.bookingId) {
        whereClause.voucherNo = { contains: filters.bookingId };
      }
      if (filters.payee) {
        whereClause.particulars = { contains: filters.payee };
      }
      if (filters.approver) {
        whereClause.approvedBy = { contains: filters.approver };
      }
    }

    // 4. Fetch existing bank payments using the dynamic clause
    let formattedTransactions: any[] = [];

    if (prisma.transaction) {
      const transactions = await prisma.transaction.findMany({
        where: whereClause,
        include: {
          company: { select: { name: true } },
          ledger: { select: { ledger_name: true } },
          createdBy: { select: { name: true } },
          paymentMode: { select: { name: true } },
        },
        orderBy: { businessDate: "desc" },
      });

      formattedTransactions = transactions.map((t) => ({
        id: t.id,
        voucherNo: t.voucherNo,
        hotelId: t.companyId,
        hotel: t.company?.name || "Unknown",
        ledgerId: t.ledgerId,
        account: t.ledger?.ledger_name || "N/A",
        amount: t.amount,
        paymentModeId: t.paymentModeId,
        paymentModeName: t.paymentMode?.name || "Bank Transfer",
        bDate: t.businessDate.toISOString().split("T")[0],
        note: t.remarks || "-",
        user: t.createdBy?.name || "System",
        payee: t.particulars,
      }));
    }

    return {
      success: true,
      transactions: formattedTransactions,
      companies,
      ledgers,
      paymentModes,
    };
  } catch (error: any) {
    console.error("Error fetching bank payments:", error);
    return {
      success: false,
      transactions: [],
      companies: [],
      ledgers: [],
      paymentModes: [],
      error: error.message,
    };
  }
}

// Create or Update a Bank Payment
export async function saveBankPayment(payload: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Unauthorized");

    if (!prisma.transaction)
      throw new Error("Database syncing. Please restart your Next.js server.");

    if (!payload.paymentModeId) throw new Error("Payment Mode is required");


    const amountFloat = parseFloat(payload.amount);
    if (isNaN(amountFloat) || amountFloat <= 0)
      throw new Error("Invalid amount");

    const bDate = new Date(payload.businessDate);

    if (payload.id) {
      // UPDATE
      await prisma.transaction.update({
        where: { id: payload.id },
        data: {
          companyId: payload.companyId,
          ledgerId: payload.ledgerId,
          paymentModeId: payload.paymentModeId,
          amount: amountFloat,
          businessDate: bDate,
          paymentMode: payload.paymentMode,
          particulars: payload.payee,
          remarks: payload.remarks,
        },
      });
    } else {
      // CREATE
      // Generate a unique voucher number for Bank Payments (e.g., BP-849302)
      const voucherNo = `BP-${Math.floor(100000 + Math.random() * 900000)}`;

      await prisma.transaction.create({
        data: {
          voucherNo,
          type: "BANK_PAYMENT",
          paymentModeId: payload.paymentModeId,
          companyId: payload.companyId,
          ledgerId: payload.ledgerId,
          amount: amountFloat,
          businessDate: bDate,
          particulars: payload.payee,
          remarks: payload.remarks,
          createdById: session.user.id,
        },
      });
    }

    revalidatePath("/payments/bank");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving bank payment:", error);
    return { success: false, error: error.message };
  }
}

// Delete a Bank Payment
export async function deleteTransaction(id: string) {
  try {
    if (!prisma.transaction)
      throw new Error("Database syncing. Please restart your Next.js server.");

    await prisma.transaction.delete({
      where: { id },
    });

    revalidatePath("/payments/bank");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting transaction:", error);
    return { success: false, error: error.message };
  }
}
