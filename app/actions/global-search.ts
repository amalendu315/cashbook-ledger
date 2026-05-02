"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function performGlobalSearch(searchTerm: string) {
  try {
    // --- Mock Data Fallback for Canvas Preview ---
    if (!prisma.transaction) {
      return {
        success: true,
        results: {
          transactions: [
            {
              id: "1",
              voucherNo: "CR-92842",
              type: "CASH_RECEIPT",
              amount: 15000,
              company: "Grand Udaan Hotel",
              date: "2024-05-12",
            },
            {
              id: "2",
              voucherNo: "FT-11023",
              type: "FUND_TRANSFER",
              amount: 50000,
              company: "Udaan Olive",
              date: "2024-05-12",
            },
          ].filter((t) =>
            t.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
          ledgers: [
            { id: "L1", name: "Room Revenue", type: "Revenue" },
            { id: "L2", name: "Maintenance Expense", type: "Expense" },
          ].filter((l) =>
            l.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
          companies: [
            { id: "C1", name: "Grand Udaan Hotel", code: "UDAAN-01" },
          ].filter((c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        },
      };
    }
    // ---------------------------------------------

    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized");

    const isAdmin =
      session.user.role === "ADMIN" || session.user.companyIds.includes("ALL");
    const userCompanyIds = session.user.companyIds || [];

    if (!searchTerm || searchTerm.trim().length < 2) {
      return {
        success: true,
        results: { transactions: [], ledgers: [], companies: [] },
      };
    }

    const query = searchTerm.trim();
    const isNumeric = !isNaN(parseFloat(query));

    // Security Filters
    const companyFilter = isAdmin ? {} : { id: { in: userCompanyIds } };
    const transactionCompanyFilter = isAdmin
      ? {}
      : { companyId: { in: userCompanyIds } };

    // 1. Search Transactions (Matches Voucher No, Remarks, Particulars, or exact Amount)
    const transactions = await prisma.transaction.findMany({
      where: {
        ...transactionCompanyFilter,
        OR: [
          { voucherNo: { contains: query } },
          { remarks: { contains: query } },
          { particulars: { contains: query } },
          ...(isNumeric ? [{ amount: parseFloat(query) }] : []),
        ],
      },
      take: 4,
      include: { company: true },
      orderBy: { businessDate: "desc" },
    });

    // 2. Search Ledgers
    const ledgers = await prisma.ledger.findMany({
      where: {
        ledger_name: { contains: query },
      },
      take: 4,
    });

    // 3. Search Companies
    const companies = await prisma.company.findMany({
      where: {
        ...companyFilter,
        OR: [
          { name: { contains: query } },
          { companyCode: { contains: query } },
        ],
      },
      take: 3,
    });

    return {
      success: true,
      results: {
        transactions: transactions.map((t) => ({
          id: t.id,
          voucherNo: t.voucherNo,
          type: t.type,
          amount: t.amount,
          company: t.company?.name || "Unknown",
          date: t.businessDate.toISOString().split("T")[0],
        })),
        ledgers: ledgers.map((l) => ({
          id: l.id,
          name: l.ledger_name,
          type:
            l.openingBalanceType === "Cr" ? "Credit Balance" : "Debit Balance",
        })),
        companies: companies.map((c) => ({
          id: c.id,
          name: c.name,
          code: c.companyCode,
        })),
      },
    };
  } catch (error: any) {
    console.error("Global search error:", error);
    return { success: false, error: error.message };
  }
}
