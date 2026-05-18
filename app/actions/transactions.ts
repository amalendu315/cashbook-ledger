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

export async function getTransactionsData(filters?: FilterParams) {
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

    // 2. Fetch Active Ledgers with Company Assignments
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

    // 3. Fetch ALL Active Payment Modes (Cash & Bank) with Company Assignments
    const paymentModes = await prisma.paymentMode.findMany({
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
        name: true,
        category: true,
        companies: { select: { companyId: true } },
      },
      orderBy: { name: "asc" },
    });

    // 4. Build dynamic WHERE clause
    const whereClause: any = {
      type: {
        in: ["CASH_RECEIPT", "BANK_RECEIPT", "CASH_PAYMENT", "BANK_PAYMENT"],
      },
    };

    if (isAdmin) {
      if (filters?.companyId && filters.companyId !== "ALL") {
        whereClause.companyId = filters.companyId;
      }
    } else {
      if (filters?.companyId && filters.companyId !== "ALL") {
        if (userCompanyIds.includes(filters.companyId)) {
          whereClause.companyId = filters.companyId;
        } else {
          whereClause.companyId = "UNAUTHORIZED_ACCESS";
        }
      } else {
        whereClause.companyId = { in: userCompanyIds };
      }
    }

    if (filters) {
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
      if (filters.payee) {
        whereClause.particulars = { contains: filters.payee };
      }
      if (filters.approver) {
        whereClause.approvedBy = { contains: filters.approver };
      }
    }

    // 5. Fetch transactions
    let formattedTransactions: any[] = [];
    if (prisma.transaction) {
      const transactions = await prisma.transaction.findMany({
        where: whereClause,
        include: {
          company: { select: { name: true } },
          ledger: { select: { ledger_name: true } },
          createdBy: { select: { name: true } },
          paymentMode: { select: { name: true, category: true } },
        },
        orderBy: { businessDate: "desc" },
      });

      formattedTransactions = transactions.map((t) => {
        const isReceipt = t.type.includes("RECEIPT");
        const isCash = t.type.includes("CASH");

        return {
          id: t.id,
          voucherNo: t.voucherNo,
          hotelId: t.companyId,
          hotel: t.company?.name || "Unknown",
          ledgerId: t.ledgerId,
          account: t.ledger?.ledger_name || "N/A",
          amount: t.amount,
          paymentModeId: t.paymentModeId,
          paymentModeName: t.paymentMode?.name || (isCash ? "Cash" : "Bank"),
          paymentCategory:
            t.paymentMode?.category || (isCash ? "CASH" : "BANK"),
          txType: isReceipt ? "RECEIPT" : "PAYMENT",
          txCategory: isCash ? "CASH" : "BANK",
          bDate: t.businessDate.toISOString().split("T")[0],
          note: t.remarks || "-",
          user: t.createdBy?.name || "System",
          payee: t.particulars,
        };
      });
    }

    return {
      success: true,
      transactions: formattedTransactions,
      companies,
      ledgers,
      paymentModes,
    };
  } catch (error: any) {
    console.error("Error fetching transactions:", error);
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

// Create or Update a Transaction
export async function saveTransaction(payload: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.name)
      throw new Error("Unauthorized: Session name missing.");

    if (!prisma.transaction)
      throw new Error("Database syncing. Please restart your Next.js server.");

    const dbUser = await prisma.user.findFirst({
      where: { name: session.user.name },
      select: { id: true },
    });

    if (!dbUser) {
      throw new Error("Database error: Could not verify user identity.");
    }

    if (!payload.paymentModeId) throw new Error("Payment Mode is required");

    const amountFloat = parseFloat(payload.amount);
    if (isNaN(amountFloat) || amountFloat <= 0)
      throw new Error("Invalid amount");

    const bDate = new Date(payload.businessDate);
    const dbType = `${payload.txCategory}_${payload.txType}`; // e.g., CASH_RECEIPT

    if (payload.id) {
      await prisma.transaction.update({
        where: { id: payload.id },
        data: {
          type: dbType, // Allows converting Cash <-> Bank dynamically
          companyId: payload.companyId,
          ledgerId: payload.ledgerId,
          paymentModeId: payload.paymentModeId,
          amount: amountFloat,
          businessDate: bDate,
          particulars: payload.payee,
          remarks: payload.remarks,
        },
      });
    } else {
      const prefix = `${payload.txCategory === "CASH" ? "C" : "B"}${payload.txType === "RECEIPT" ? "R" : "P"}`;
      const voucherNo = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

      await prisma.transaction.create({
        data: {
          voucherNo,
          type: dbType,
          paymentModeId: payload.paymentModeId,
          companyId: payload.companyId,
          ledgerId: payload.ledgerId,
          amount: amountFloat,
          businessDate: bDate,
          particulars: payload.payee,
          remarks: payload.remarks,
          createdById: dbUser.id,
        },
      });
    }

    revalidatePath("/transactions");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving transaction:", error);
    return { success: false, error: error.message };
  }
}

// Delete a Transaction
export async function deleteTransactionRecord(id: string) {
  try {
    await prisma.transaction.delete({ where: { id } });
    revalidatePath("/transactions");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting transaction:", error);
    return { success: false, error: error.message };
  }
}
