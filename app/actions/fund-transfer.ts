"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Fetch data for the Fund Transfer Grid and Form Dropdowns
export async function getFundTransferData() {
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

    // 3. Fetch existing Fund Transfers
    let formattedTransactions: any[] = [];

    if (prisma.transaction) {
      const transactions = await prisma.transaction.findMany({
        where: {
          type: "FUND_TRANSFER",
          // Show transfers where the user's company is either the source OR the destination
          ...(isAdmin
            ? {}
            : {
                OR: [
                  { companyId: { in: userCompanyIds } },
                  { destinationCompanyId: { in: userCompanyIds } },
                ],
              }),
        },
        include: {
          company: { select: { name: true } },
          destinationCompany: { select: { name: true } },
          createdBy: { select: { name: true } },
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
        mode: t.paymentMode || "Bank Transfer", // Capture the payment mode
        bDate: t.businessDate.toISOString().split("T")[0],
        note: t.remarks || "-",
        user: t.createdBy?.name || "System",
      }));
    }

    return {
      transactions: formattedTransactions,
      userCompanies,
      allCompanies,
      success: true,
    };
  } catch (error: any) {
    console.error("Error fetching fund transfers:", error);
    return {
      transactions: [],
      userCompanies: [],
      allCompanies: [],
      success: false,
      error: error.message,
    };
  }
}

// Create or Update a Fund Transfer
export async function saveFundTransfer(payload: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Unauthorized");

    if (!prisma.transaction)
      throw new Error("Database syncing. Please restart your Next.js server.");

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
          paymentMode: payload.paymentMode, // Save updated payment mode
          remarks: payload.remarks,
        },
      });
    } else {
      // CREATE
      // Generate a unique voucher number for Fund Transfers (e.g., FT-849302)
      const voucherNo = `FT-${Math.floor(100000 + Math.random() * 900000)}`;

      await prisma.transaction.create({
        data: {
          voucherNo,
          type: "FUND_TRANSFER",
          paymentMode: payload.paymentMode || "Bank Transfer", // Assign chosen mode
          companyId: payload.companyId,
          destinationCompanyId: payload.destinationCompanyId,
          amount: amountFloat,
          businessDate: bDate,
          particulars: "Internal Fund Transfer",
          remarks: payload.remarks,
          createdById: session.user.id,
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
