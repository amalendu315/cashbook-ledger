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

// Fetch data for the Fund Transfer Grid and Form Dropdowns
export async function getFundTransferData(filters?: FilterParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized access");

    const isAdmin =
      session.user.role === "ADMIN" || session.user.companyIds.includes("ALL");
    const userCompanyIds = session.user.companyIds || [];

    // 1. Fetch allowed companies for the "From" dropdown (RBAC restricted)
    const userCompanies = await prisma.company.findMany({
      where: isAdmin ? {} : { id: { in: userCompanyIds } },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    // 2. Fetch ALL companies for the "To" dropdown (Users can transfer to any sister property)
    const allCompanies = await prisma.company.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    // 2.5 Fetch Cash Payment Modes and their Company Assignments (CASH ONLY)
    const paymentModes = await prisma.paymentMode.findMany({
      where: {
        isActive: true,
        category: "CASH",
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
        name: true,
        companies: { select: { companyId: true } },
      },
      orderBy: { name: "asc" },
    });

    // 3. Build the dynamic WHERE clause for Transactions
    const whereClause: any = {
      type: "FUND_TRANSFER",
    };

    // Apply RBAC and Company Filter
    if (filters?.companyId && filters.companyId !== "ALL") {
      if (!isAdmin && !userCompanyIds.includes(filters.companyId)) {
        whereClause.companyId = "UNAUTHORIZED_ACCESS"; // Block unauthorized lookups
      } else {
        // Show transfers where the selected company is EITHER the source OR destination
        whereClause.OR = [
          { companyId: filters.companyId },
          { destinationCompanyId: filters.companyId },
        ];
      }
    } else if (!isAdmin) {
      // If "ALL" is selected but user is not admin, restrict to their authorized properties
      whereClause.OR = [
        { companyId: { in: userCompanyIds } },
        { destinationCompanyId: { in: userCompanyIds } },
      ];
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

      if (filters.bookingId) {
        whereClause.voucherNo = { contains: filters.bookingId };
      }
      if (filters.approver) {
        whereClause.approvedBy = { contains: filters.approver };
      }
    }

    // 4. Fetch existing Fund Transfers
    let formattedTransactions: any[] = [];

    if (prisma.transaction) {
      const transactions = await prisma.transaction.findMany({
        where: whereClause,
        include: {
          company: { select: { name: true } },
          destinationCompany: { select: { name: true } },
          createdBy: { select: { name: true } },
          paymentMode: { select: { name: true } }, // Include payment mode relation
        },
        orderBy: { businessDate: "desc" },
      });

      formattedTransactions = transactions.map((t: any) => ({
        id: t.id,
        voucherNo: t.voucherNo,
        from: t.company?.name || "Unknown Source",
        fromId: t.companyId,
        to: t.destinationCompany?.name || "Unknown Destination",
        toId: t.destinationCompanyId,
        amount: t.amount,
        paymentModeId: t.paymentModeId,
        mode: t.paymentMode?.name || "Cash", // Map mode to UI
        bDate: t.businessDate.toISOString().split("T")[0],
        note: t.remarks || "-",
        user: t.createdBy?.name || "System",
      }));
    }

    return {
      transactions: formattedTransactions,
      userCompanies,
      allCompanies,
      paymentModes, // Returned to frontend with company mappings
      success: true,
    };
  } catch (error: any) {
    console.error("Error fetching fund transfers:", error);
    return {
      transactions: [],
      userCompanies: [],
      allCompanies: [],
      paymentModes: [],
      success: false,
      error: error.message,
    };
  }
}

// Create or Update a Fund Transfer
export async function saveFundTransfer(payload: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      throw new Error("Unauthorized: Session email missing.");

    if (!prisma.transaction)
      throw new Error("Database syncing. Please restart your Next.js server.");

    // SAFETY CHECK: Verify user ID using email to avoid foreign key constraints
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!dbUser) {
      throw new Error("Database error: Could not verify user identity.");
    }

    

    if (!payload.paymentModeId) throw new Error("Payment Mode is required");

    const amountFloat = parseFloat(payload.amount);
    if (isNaN(amountFloat) || amountFloat <= 0)
      throw new Error("Invalid amount");

    if (payload.companyId === payload.destinationCompanyId) {
      throw new Error("Source and Destination properties cannot be the same.");
    }

    const bDate = new Date(payload.businessDate);

    if (payload.id) {
      // UPDATE
      await prisma.transaction.update({
        where: { id: payload.id },
        data: {
          companyId: payload.companyId,
          destinationCompanyId: payload.destinationCompanyId,
          amount: amountFloat,
          businessDate: bDate,
          paymentModeId: payload.paymentModeId, // Save dynamic payment mode
          remarks: payload.remarks,
        },
      });
    } else {
      // CREATE
      const voucherNo = `FT-${Math.floor(100000 + Math.random() * 900000)}`;

      await prisma.transaction.create({
        data: {
          voucherNo,
          type: "FUND_TRANSFER",
          paymentModeId: payload.paymentModeId, // Safe Payment Mode mapping
          companyId: payload.companyId,
          destinationCompanyId: payload.destinationCompanyId,
          amount: amountFloat,
          businessDate: bDate,
          particulars: "Internal Fund Transfer",
          remarks: payload.remarks,
          createdById: dbUser.id, // Safe DB User mapping
        },
      });
    }

    revalidatePath("/fund-transfer");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving fund transfer:", error);
    return { success: false, error: error.message };
  }
}

// Delete a Fund Transfer
export async function deleteTransaction(id: string) {
  try {
    if (!prisma.transaction)
      throw new Error("Database syncing. Please restart your Next.js server.");

    await prisma.transaction.delete({
      where: { id },
    });

    revalidatePath("/fund-transfer");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting transaction:", error);
    return { success: false, error: error.message };
  }
}
