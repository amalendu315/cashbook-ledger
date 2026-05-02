"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getLedgerReportData(
  companyId: string,
  ledgerId: string, // NEW: Added Ledger Filter
  fromDateStr: string,
  toDateStr: string,
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized access");

    const isAdmin =
      session.user.role === "ADMIN" || session.user.companyIds.includes("ALL");
    const userCompanyIds = session.user.companyIds || [];

    // Fetch allowed companies for the dropdown
    const companies = await prisma.company.findMany({
      where: isAdmin ? {} : { id: { in: userCompanyIds } },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    // Fetch allowed ledgers for the dropdown
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
      select: { id: true, ledger_name: true },
      orderBy: { ledger_name: "asc" },
    });

    // Determine the company filter
    let companyFilter = {};
    if (companyId && companyId !== "") {
      if (!isAdmin && !userCompanyIds.includes(companyId)) {
        throw new Error("You do not have access to this property.");
      }
      companyFilter = { companyId: companyId };
    } else {
      companyFilter = isAdmin ? {} : { companyId: { in: userCompanyIds } };
    }

    // Determine the ledger filter
    let ledgerFilter = {};
    if (ledgerId && ledgerId !== "") {
      ledgerFilter = { ledgerId: ledgerId };
    }

    const fromDate = new Date(fromDateStr);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(toDateStr);
    toDate.setHours(23, 59, 59, 999);

    if (!prisma.transaction) {
      throw new Error("Database syncing. Please restart your Next.js server.");
    }

    // 1. Calculate Base Opening Balance directly from the Ledger Master Models
    let baseLedgerFilter: any = ledgerId ? { id: ledgerId } : {};
    if (!ledgerId && !isAdmin) {
      baseLedgerFilter = {
        OR: [
          { companies: { none: {} } },
          { companies: { some: { companyId: { in: userCompanyIds } } } },
        ],
      };
    }

    const ledgersForOB = await prisma.ledger.findMany({
      where: baseLedgerFilter,
    });
    let openingBalance = 0;
    ledgersForOB.forEach((l) => {
      // Dr is Positive (+), Cr is Negative (-) for standard tracking
      if (l.openingBalanceType === "Dr") {
        openingBalance -= l.openingBalance;
      } else {
        openingBalance += l.openingBalance;
      }
    });

    // 2. Add Past Transactions to the Opening Balance (Strictly BEFORE fromDate)
    const pastTxns = await prisma.transaction.findMany({
      where: {
        ...companyFilter,
        ...ledgerFilter, // Apply specific ledger filter if selected
        businessDate: { lt: fromDate },
      },
    });

    pastTxns.forEach((t: any) => {
      if (t.type.includes("RECEIPT")) openingBalance += t.amount;
      else if (t.type.includes("PAYMENT") || t.type === "FUND_TRANSFER")
        openingBalance -= t.amount;
    });

    // Add Fund Transfers IN to Opening Balance (Only if NOT filtering by a specific Ledger)
    const pastTransfersInFilter =
      companyId && companyId !== ""
        ? { destinationCompanyId: companyId }
        : isAdmin
          ? {}
          : { destinationCompanyId: { in: userCompanyIds } };

    if (!ledgerId && Object.keys(pastTransfersInFilter).length > 0) {
      const pastTransfersIn = await prisma.transaction.findMany({
        where: {
          ...pastTransfersInFilter,
          businessDate: { lt: fromDate },
        },
      });
      pastTransfersIn.forEach((t: any) => (openingBalance += t.amount));
    }

    // 3. Fetch Transactions for the Selected Period
    const periodTxns = await prisma.transaction.findMany({
      where: {
        ...companyFilter,
        ...ledgerFilter, // Apply specific ledger filter
        businessDate: { gte: fromDate, lte: toDate },
      },
      include: {
        ledger: true,
        createdBy: { select: { name: true } },
        destinationCompany: { select: { name: true } },
        company: { select: { name: true } },
      },
    });

    let periodTransfersIn: any[] = [];
    if (!ledgerId && Object.keys(pastTransfersInFilter).length > 0) {
      periodTransfersIn = await prisma.transaction.findMany({
        where: {
          ...pastTransfersInFilter,
          businessDate: { gte: fromDate, lte: toDate },
        },
        include: {
          createdBy: { select: { name: true } },
          company: { select: { name: true } },
          destinationCompany: { select: { name: true } },
        },
      });
    }

    // 4. Format and Merge Transactions
    const formattedTransactions = [
      ...periodTxns.map((t: any) => ({
        id: t.voucherNo,
        dbId: t.id,
        hotel: t.company?.name || "Unknown",
        type: t.type,
        category: t.type.replace("_", " "),
        date: t.businessDate.toISOString().split("T")[0],
        time: t.createdAt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        particulars:
          t.type === "FUND_TRANSFER"
            ? `Transfer To: ${t.destinationCompany?.name || "Unknown"}`
            : t.particulars || (t.ledger ? t.ledger.ledger_name : "General"),
        note: t.remarks || "-",
        amount: t.amount,
        mode: t.paymentMode || "Cash",
        flowType: t.type.includes("RECEIPT") ? "in" : "out",
        user: t.createdBy?.name || "System",
        attachment: !!t.attachmentUrl,
      })),
      ...periodTransfersIn.map((t: any) => ({
        id: t.voucherNo,
        dbId: t.id,
        hotel: t.destinationCompany?.name || "Unknown",
        type: "TRANSFER_IN",
        category: "FUND TRANSFER IN",
        date: t.businessDate.toISOString().split("T")[0],
        time: t.createdAt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        particulars: `Transfer From: ${t.company?.name || "Unknown"}`,
        note: t.remarks || "-",
        amount: t.amount,
        mode: "Transfer",
        flowType: "in",
        user: t.createdBy?.name || "System",
        attachment: !!t.attachmentUrl,
      })),
    ].sort((a, b) => {
      // Sort Chronologically: Oldest first for accurate running balance
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    return {
      companies,
      ledgers,
      transactions: formattedTransactions,
      openingBalance,
      success: true,
    };
  } catch (error: any) {
    console.error("Error generating ledger report:", error);
    return {
      companies: [],
      ledgers: [],
      transactions: [],
      openingBalance: 0,
      success: false,
      error: error.message,
    };
  }
}
