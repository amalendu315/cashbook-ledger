"use server";

import {prisma} from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Fetch data for the Bank Receipt Grid and Form Dropdowns
export async function getBankReceiptData() {
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
      // IMPORTANT: Include mapped companies so the frontend can filter dynamically
      select: {
        id: true,
        ledger_name: true,
        companies: { select: { companyId: true } },
      },
      orderBy: { ledger_name: "asc" },
    });

    // 3. Fetch existing bank receipts
    let formattedTransactions: any[] = [];

    if (prisma.transaction) {
      const transactions = await prisma.transaction.findMany({
        where: {
          type: "BANK_RECEIPT",
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
        mode: t.paymentMode || "Bank Transfer",
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
    console.error("Error fetching bank receipts:", error);
    return {
      transactions: [],
      companies: [],
      ledgers: [],
      success: false,
      error: error.message,
    };
  }
}

// Create or Update a Bank Receipt
export async function saveBankReceipt(payload: any) {
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
          paymentMode: payload.paymentMode,
          particulars: payload.payee, // Populated via selected ledger name
          remarks: payload.remarks,
        },
      });
    } else {
      // CREATE
      // Generate a unique voucher number for Bank Receipts (e.g., BR-849302)
      const voucherNo = `BR-${Math.floor(100000 + Math.random() * 900000)}`;

      await prisma.transaction.create({
        data: {
          voucherNo,
          type: "BANK_RECEIPT",
          paymentMode: payload.paymentMode || "Bank Transfer",
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

    revalidatePath("/receipts/bank");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving bank receipt:", error);
    return { success: false, error: error.message };
  }
}

// Delete a Bank Receipt
export async function deleteTransaction(id: string) {
  try {
    if (!prisma.transaction)
      throw new Error("Database syncing. Please restart your Next.js server.");

    await prisma.transaction.delete({
      where: { id },
    });

    revalidatePath("/receipts/bank");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting transaction:", error);
    return { success: false, error: error.message };
  }
}
