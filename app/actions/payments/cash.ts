"use server";

import {prisma} from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Fetch data for the Cash Payment Grid and Form Dropdowns
export async function getCashPaymentData() {
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
              // If not admin, ledger must be Global (0 mappings) OR mapped to one of the user's companies
              OR: [
                { companies: { none: {} } },
                { companies: { some: { companyId: { in: userCompanyIds } } } },
              ],
            }),
      },
      // IMPORTANT: Include mapped companies so the frontend can filter dynamically
      select: {
        id: true,
        ledger_name: true,
        companies: { select: { companyId: true } },
      },
      orderBy: { ledger_name: "asc" },
    });

    // 3. Fetch existing cash payments (Safely checking if model exists yet)
    let formattedTransactions: any[] = [];

    if (prisma.transaction) {
      const transactions = await prisma.transaction.findMany({
        where: {
          type: "CASH_PAYMENT",
          // Only pull transactions for properties the user has access to
          ...(isAdmin ? {} : { companyId: { in: userCompanyIds } }),
        },
        include: {
          company: { select: { name: true } },
          ledger: { select: { ledger_name: true } },
          createdBy: { select: { name: true } },
        },
        orderBy: { businessDate: "desc" },
      });

      // Format for the frontend grid
      formattedTransactions = transactions.map((t: any) => ({
        id: t.id,
        voucherNo: t.voucherNo,
        hotel: t.company?.name || "Unknown",
        hotelId: t.companyId,
        payee: t.particulars,
        amount: t.amount,
        bDate: t.businessDate.toISOString().split("T")[0],
        account: t.ledger?.ledger_name || "Uncategorized",
        ledgerId: t.ledgerId,
        note: t.remarks || "-",
        user: t.createdBy?.name || "System",
      }));
    }

    return {
      transactions: formattedTransactions,
      companies,
      ledgers,
      success: true,
    };
  } catch (error: any) {
    console.error("Error fetching cash payments:", error);
    return {
      transactions: [],
      companies: [],
      ledgers: [],
      success: false,
      error: error.message,
    };
  }
}

// Create or Update a Cash Payment
export async function saveCashPayment(payload: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Unauthorized");

    if (!prisma.transaction)
      throw new Error("Database syncing. Please restart your Next.js server.");

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
          amount: amountFloat,
          businessDate: bDate,
          particulars: payload.payee,
          remarks: payload.remarks,
        },
      });
    } else {
      // CREATE
      // Generate a unique voucher number (e.g., CP-849302)
      const voucherNo = `CP-${Math.floor(100000 + Math.random() * 900000)}`;

      await prisma.transaction.create({
        data: {
          voucherNo,
          type: "CASH_PAYMENT",
          paymentMode: "Cash",
          companyId: payload.companyId,
          ledgerId: payload.ledgerId,
          amount: amountFloat,
          businessDate: bDate,
          particulars: payload.payee,
          remarks: payload.remarks,
          createdById: session.user.id, // Audit trail mapping
        },
      });
    }

    revalidatePath("/payments/cash");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving cash payment:", error);
    return { success: false, error: error.message };
  }
}

// Delete a Cash Payment
export async function deleteTransaction(id: string) {
  try {
    if (!prisma.transaction)
      throw new Error("Database syncing. Please restart your Next.js server.");

    await prisma.transaction.delete({
      where: { id },
    });

    revalidatePath("/payments/cash");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting transaction:", error);
    return { success: false, error: error.message };
  }
}
