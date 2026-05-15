"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getCompanyReportData(
  companyId: string,
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

    const emptyResponse = {
      companies,
      paymentModes,
      companyName: "",
      companyCode: "",
      ledgerSummary: [],
      transactions: [],
      openingBalance: 0,
      totalIn: 0,
      totalOut: 0,
      closingBalance: 0,
      cashSummary: { opening: 0, in: 0, out: 0, closing: 0 },
      bankSummary: { opening: 0, in: 0, out: 0, closing: 0 },
      success: true,
    };

    if (!companyId || companyId === "") return emptyResponse;

    // Validate access
    if (!isAdmin && !userCompanyIds.includes(companyId)) {
      throw new Error("You do not have access to this property.");
    }

    const selectedCompany = await prisma.company.findUnique({
      where: { id: companyId },
    });
    const companyName = selectedCompany
      ? selectedCompany.name
      : "Unknown Property";
    const companyCode = selectedCompany ? selectedCompany.companyCode : "";

    const fromDate = new Date(fromDateStr);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(toDateStr);
    toDate.setHours(23, 59, 59, 999);

    // Apply Payment Mode Filter if selected
    const pModeFilter =
      paymentModeId && paymentModeId !== "" ? { paymentModeId } : {};

    // 1. Calculate Opening Balances (All transactions strictly BEFORE fromDate)
    const pastTxns = await prisma.transaction.findMany({
      where: {
        companyId: companyId,
        businessDate: { lt: fromDate },
        ...pModeFilter,
      },
      include: { paymentMode: true },
    });
    const pastTransfersIn = await prisma.transaction.findMany({
      where: {
        destinationCompanyId: companyId,
        businessDate: { lt: fromDate },
        ...pModeFilter,
      },
      include: {
        createdBy: { select: { name: true } },
        company: { select: { name: true } },
        destinationCompany: { select: { name: true } },
        paymentMode: true,
      },
    });

    let openingBalance = 0;
    let cashOpening = 0;
    let bankOpening = 0;

    pastTxns.forEach((t: any) => {
      const isCash = t.paymentMode?.category === "CASH";
      const isBank = t.paymentMode?.category === "BANK";

      if (t.type.includes("RECEIPT")) {
        openingBalance += t.amount;
        if (isCash) cashOpening += t.amount;
        if (isBank) bankOpening += t.amount;
      } else if (t.type.includes("PAYMENT") || t.type === "FUND_TRANSFER") {
        openingBalance -= t.amount;
        if (isCash) cashOpening -= t.amount;
        if (isBank) bankOpening -= t.amount;
      }
    });

    pastTransfersIn.forEach((t: any) => {
      openingBalance += t.amount;
      const isCash = t.paymentMode?.category === "CASH";

      if (isCash) cashOpening += t.amount;
      else bankOpening += t.amount; // Defaults non-cash transfers to Bank
    });

    // 2. Fetch Transactions for the Selected Period
    const periodTxns = await prisma.transaction.findMany({
      where: {
        companyId: companyId,
        businessDate: { gte: fromDate, lte: toDate },
        ...pModeFilter,
      },
      include: {
        ledger: true,
        createdBy: { select: { name: true } },
        destinationCompany: { select: { name: true } },
        paymentMode: true,
      },
    });

    const periodTransfersIn = await prisma.transaction.findMany({
      where: {
        destinationCompanyId: companyId,
        businessDate: { gte: fromDate, lte: toDate },
        ...pModeFilter,
      },
      include: {
        createdBy: { select: { name: true } },
        company: { select: { name: true } },
        paymentMode: true,
      },
    });

    // 3. Group Data by Ledger for the "Overall" Tab
    const ledgerMap = new Map<string, any>();
    let totalIn = 0;
    let totalOut = 0;
    let cashIn = 0,
      cashOut = 0;
    let bankIn = 0,
      bankOut = 0;

    periodTxns.forEach((t: any) => {
      // --- KPI Aggregations ---
      const isCash = t.paymentMode?.category === "CASH";
      const isBank = t.paymentMode?.category === "BANK";

      if (t.type.includes("RECEIPT")) {
        totalIn += t.amount;
        if (isCash) cashIn += t.amount;
        if (isBank) bankIn += t.amount;
      } else if (t.type.includes("PAYMENT") || t.type === "FUND_TRANSFER") {
        totalOut += t.amount;
        if (isCash) cashOut += t.amount;
        if (isBank) bankOut += t.amount;
      }

      // --- Ledger Summaries ---
      let lId = t.ledgerId;
      let lName = t.ledger ? t.ledger.ledger_name : "";

      if (t.type === "FUND_TRANSFER") {
        lId = "TRANSFER_OUT";
        lName = "Internal Fund Transfers (Sent)";
      } else if (!lId) {
        lId = "UNASSIGNED";
        lName = "Unassigned / General Expenses";
      }

      if (!ledgerMap.has(lId)) {
        ledgerMap.set(lId, {
          id: lId,
          name: lName,
          in: 0,
          out: 0,
          net: 0,
          transactions: 0,
          type: "Unknown",
        });
      }

      const lData = ledgerMap.get(lId);
      lData.transactions += 1;

      if (t.type.includes("RECEIPT")) lData.in += t.amount;
      else if (t.type.includes("PAYMENT") || t.type === "FUND_TRANSFER")
        lData.out += t.amount;

      lData.net = lData.in - lData.out;
      lData.type = lData.net >= 0 ? "Revenue" : "Expense";
    });

    // Handle Incoming Transfers for Summaries
    if (periodTransfersIn.length > 0) {
      ledgerMap.set("TRANSFER_IN", {
        id: "TRANSFER_IN",
        name: "Internal Fund Transfers (Received)",
        in: 0,
        out: 0,
        net: 0,
        transactions: 0,
        type: "Revenue",
      });
      const lData = ledgerMap.get("TRANSFER_IN");

      periodTransfersIn.forEach((t: any) => {
        lData.transactions += 1;
        lData.in += t.amount;
        lData.net += t.amount;

        totalIn += t.amount;
        const isCash = t.paymentMode?.category === "CASH";
        if (isCash) cashIn += t.amount;
        else bankIn += t.amount;
      });
    }

    const ledgerSummary = Array.from(ledgerMap.values()).sort(
      (a, b) => b.net - a.net,
    );

    // 4. Format All Transactions for the Cash/Bank/Transfer Tabs
    const formattedTransactions = [
      ...periodTxns.map((t: any) => ({
        id: t.id,
        voucherNo: t.voucherNo,
        type: t.type,
        category: t.type.replace("_", " "),
        date: t.businessDate.toISOString().split("T")[0],
        time: t.createdAt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        particulars:
          t.type === "FUND_TRANSFER"
            ? t.destinationCompany?.name
              ? `Internal Fund Transfer (Sent to ${t.destinationCompany.name})`
              : "Internal Fund Transfer (Sent)"
            : t.particulars || (t.ledger ? t.ledger.ledger_name : "General"),
        ledgerName:
          t.ledger?.ledger_name ||
          (t.type === "FUND_TRANSFER" ? "Fund Transfer" : "N/A"),
        note: t.remarks || "-",
        amount: t.amount,
        mode: t.paymentMode?.name || "Unknown",
        paymentCategory: t.paymentMode?.category || "Unknown", // Used by UI to filter locally
        flowType: t.type.includes("RECEIPT") ? "in" : "out",
        user: t.createdBy?.name || "System",
      })),
      ...periodTransfersIn.map((t: any) => ({
        id: t.id,
        voucherNo: t.voucherNo,
        type: "TRANSFER_IN",
        category: "FUND TRANSFER IN",
        date: t.businessDate.toISOString().split("T")[0],
        time: t.createdAt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        particulars: t.company?.name
          ? `Internal Fund Transfer (Received from ${t.company.name})`
          : "Internal Fund Transfer (Received)",
        ledgerName: "Fund Transfer",
        note: t.remarks || "-",
        amount: t.amount,
        mode: t.paymentMode?.name || "Unknown",
        paymentCategory: t.paymentMode?.category || "Unknown",
        flowType: "in",
        user: t.createdBy?.name || "System",
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      companies,
      paymentModes,
      companyName,
      companyCode,
      ledgerSummary,
      transactions: formattedTransactions,
      openingBalance,
      totalIn,
      totalOut,
      closingBalance: openingBalance + totalIn - totalOut,
      cashSummary: {
        opening: cashOpening,
        in: cashIn,
        out: cashOut,
        closing: cashOpening + cashIn - cashOut,
      },
      bankSummary: {
        opening: bankOpening,
        in: bankIn,
        out: bankOut,
        closing: bankOpening + bankIn - bankOut,
      },
      success: true,
    };
  } catch (error: any) {
    console.error("Error generating company report:", error);
    return {
      companies: [],
      paymentModes: [],
      companyName: "",
      companyCode: "",
      ledgerSummary: [],
      transactions: [],
      openingBalance: 0,
      totalIn: 0,
      totalOut: 0,
      closingBalance: 0,
      cashSummary: { opening: 0, in: 0, out: 0, closing: 0 },
      bankSummary: { opening: 0, in: 0, out: 0, closing: 0 },
      success: false,
      error: error.message,
    };
  }
}
