"use server";

import {prisma} from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Fetch data for the Cash Receipt Grid and Form Dropdowns
export async function getCashReceiptData() {
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

    // 2. Fetch Active Ledgers and their Company Assignments
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

    // 3. Fetch existing cash receipts
    let formattedTransactions: any[] = [];

    if (prisma.transaction) {
      const transactions = await prisma.transaction.findMany({
        where: {
          type: "CASH_RECEIPT",
          ...(isAdmin ? {} : { companyId: { in: userCompanyIds } }),
        },
        include: {
          company: { select: { name: true } },
          ledger: { select: { ledger_name: true } },
          createdBy: { select: { name: true } },
        },
        orderBy: { businessDate: "desc" },
      });

      formattedTransactions = transactions.map((t: any) => ({
        id: t.id,
        voucherNo: t.voucherNo,
        hotel: t.company?.name || "Unknown",
        hotelId: t.companyId,
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
    console.error("Error fetching cash receipts:", error);
    return {
      transactions: [],
      companies: [],
      ledgers: [],
      success: false,
      error: error.message,
    };
  }
}

// Create or Update a Cash Receipt
export async function saveCashReceipt(payload: any) {
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
          particulars: payload.payee, // Populated via selected ledger name
          remarks: payload.remarks,
        },
      });
    } else {
      // CREATE
      // Generate a unique voucher number for Cash Receipts (e.g., CR-849302)
      const voucherNo = `CR-${Math.floor(100000 + Math.random() * 900000)}`;

      await prisma.transaction.create({
        data: {
          voucherNo,
          type: "CASH_RECEIPT",
          paymentMode: "Cash",
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

    revalidatePath("/receipts/cash");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving cash receipt:", error);
    return { success: false, error: error.message };
  }
}

// Delete a Cash Receipt
export async function deleteTransaction(id: string) {
  try {
    if (!prisma.transaction)
      throw new Error("Database syncing. Please restart your Next.js server.");

    await prisma.transaction.delete({
      where: { id },
    });

    revalidatePath("/receipts/cash");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting transaction:", error);
    return { success: false, error: error.message };
  }
}
