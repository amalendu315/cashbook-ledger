"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getLedgerReportData(
  companyId: string,
  groupId: string, // NEW: Group Filter
  ledgerId: string,
  paymentModeId: string,
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

    // NEW: Fetch all groups for the dropdown
    const groups = await prisma.group.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    // Fetch allowed ledgers for the dropdown (now returning groupId as well)
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
      select: { id: true, ledger_name: true, groupId: true },
      orderBy: { ledger_name: "asc" },
    });

    // Fetch all active payment modes with their company assignments
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

    // Determine the ledger & group filters for transactions
    let ledgerFilter: any = {};
    if (ledgerId && ledgerId !== "") {
      ledgerFilter = { ledgerId: ledgerId };
    } else if (groupId && groupId !== "") {
      ledgerFilter = { ledger: { groupId: groupId } }; // Fetch any transaction linked to a ledger in this group
    }

    // Determine the payment mode filter
    let pModeFilter = {};
    if (paymentModeId && paymentModeId !== "") {
      pModeFilter = { paymentModeId: paymentModeId };
    }

    const fromDate = new Date(fromDateStr);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(toDateStr);
    toDate.setHours(23, 59, 59, 999);

    if (!prisma.transaction) {
      throw new Error("Database syncing. Please restart your Next.js server.");
    }

    // 1. Calculate Base Opening Balance directly from the Ledger Master Models
    let baseLedgerFilter: any = {};
    if (ledgerId) {
      baseLedgerFilter.id = ledgerId;
    } else if (groupId) {
      baseLedgerFilter.groupId = groupId;
    }

    // Combine with RBAC constraints
    if (!isAdmin) {
      baseLedgerFilter.OR = [
        { companies: { none: {} } },
        { companies: { some: { companyId: { in: userCompanyIds } } } },
      ];
    }

    const ledgersForOB = await prisma.ledger.findMany({
      where: baseLedgerFilter,
    });
    let openingBalance = 0;
    ledgersForOB.forEach((l) => {
      // Dr is Positive (+), Cr is Negative (-) for standard tracking
      if (l.openingBalanceType === "Cr") {
        openingBalance -= l.openingBalance;
      } else {
        openingBalance += l.openingBalance;
      }
    });

    // 2. Add Past Transactions to the Opening Balance (Strictly BEFORE fromDate)
    const pastTxns = await prisma.transaction.findMany({
      where: {
        ...companyFilter,
        ...ledgerFilter,
        ...pModeFilter, // Applied payment mode filter
        businessDate: { lt: fromDate },
      },
    });

    pastTxns.forEach((t: any) => {
      if (t.type.includes("RECEIPT")) openingBalance += t.amount;
      else if (t.type.includes("PAYMENT") || t.type === "FUND_TRANSFER")
        openingBalance -= t.amount;
    });

    // Add Fund Transfers IN to Opening Balance (Only if NOT filtering by a specific Ledger or Group)
    const pastTransfersInFilter =
      companyId && companyId !== ""
        ? { destinationCompanyId: companyId }
        : isAdmin
          ? {}
          : { destinationCompanyId: { in: userCompanyIds } };

    if (
      !ledgerId &&
      !groupId &&
      Object.keys(pastTransfersInFilter).length > 0
    ) {
      const pastTransfersIn = await prisma.transaction.findMany({
        where: {
          ...pastTransfersInFilter,
          ...pModeFilter, // Applied payment mode filter
          businessDate: { lt: fromDate },
        },
      });
      pastTransfersIn.forEach((t: any) => (openingBalance += t.amount));
    }

    // 3. Fetch Transactions for the Selected Period
    const periodTxns = await prisma.transaction.findMany({
      where: {
        ...companyFilter,
        ...ledgerFilter,
        ...pModeFilter, // Applied payment mode filter
        businessDate: { gte: fromDate, lte: toDate },
      },
      include: {
        ledger: true,
        createdBy: { select: { name: true } },
        destinationCompany: { select: { name: true } },
        company: { select: { name: true } },
        paymentMode: true, // Include mode dynamically
      },
    });

    let periodTransfersIn: any[] = [];
    if (
      !ledgerId &&
      !groupId &&
      Object.keys(pastTransfersInFilter).length > 0
    ) {
      periodTransfersIn = await prisma.transaction.findMany({
        where: {
          ...pastTransfersInFilter,
          ...pModeFilter, // Applied payment mode filter
          businessDate: { gte: fromDate, lte: toDate },
        },
        include: {
          createdBy: { select: { name: true } },
          company: { select: { name: true } },
          destinationCompany: { select: { name: true } },
          paymentMode: true, // Include mode dynamically
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
        mode: t.paymentMode?.name || "Unknown",
        paymentCategory: t.paymentMode?.category || "Unknown", // Used by UI tabs
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
        mode: t.paymentMode?.name || "Unknown",
        paymentCategory: t.paymentMode?.category || "Unknown",
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
      groups, // Returned for Group Dropdown
      ledgers,
      paymentModes,
      transactions: formattedTransactions,
      openingBalance,
      success: true,
    };
  } catch (error: any) {
    console.error("Error generating ledger report:", error);
    return {
      companies: [],
      groups: [],
      ledgers: [],
      paymentModes: [],
      transactions: [],
      openingBalance: 0,
      success: false,
      error: error.message,
    };
  }
}
