"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getCompanyReportData(
  companyId: string,
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

    if (!companyId || companyId === "") {
      return {
        companies,
        companyName: "",
        ledgerSummary: [],
        transactions: [],
        openingBalance: 0,
        success: true,
      };
    }

    // Validate access
    if (!isAdmin && !userCompanyIds.includes(companyId)) {
      throw new Error("You do not have access to this property.");
    }

    const selectedCompany = companies.find((c) => c.id === companyId);
    const companyName = selectedCompany
      ? selectedCompany.name
      : "Unknown Property";

    const fromDate = new Date(fromDateStr);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(toDateStr);
    toDate.setHours(23, 59, 59, 999);

    if (!prisma.transaction) {
      throw new Error("Database syncing. Please restart your Next.js server.");
    }

    // 1. Calculate Opening Balance (All transactions strictly BEFORE fromDate)
    const pastTxns = await prisma.transaction.findMany({
      where: {
        companyId: companyId,
        businessDate: { lt: fromDate },
      },
    });

    let openingBalance = 0;
    pastTxns.forEach((t: any) => {
      if (t.type.includes("RECEIPT")) openingBalance += t.amount;
      else if (t.type.includes("PAYMENT") || t.type === "FUND_TRANSFER")
        openingBalance -= t.amount;
    });

    const pastTransfersIn = await prisma.transaction.findMany({
      where: {
        destinationCompanyId: companyId,
        businessDate: { lt: fromDate },
      },
    });
    pastTransfersIn.forEach((t: any) => (openingBalance += t.amount));

    // 2. Fetch Transactions for the Selected Period
    const periodTxns = await prisma.transaction.findMany({
      where: {
        companyId: companyId,
        businessDate: { gte: fromDate, lte: toDate },
      },
      include: { ledger: true, createdBy: { select: { name: true } } },
    });

    const periodTransfersIn = await prisma.transaction.findMany({
      where: {
        destinationCompanyId: companyId,
        businessDate: { gte: fromDate, lte: toDate },
      },
      include: { createdBy: { select: { name: true } } },
    });

    // 3. Group Data by Ledger for the "Overall" Tab
    const ledgerMap = new Map<string, any>();

    periodTxns.forEach((t: any) => {
      let lId = t.ledgerId;
      let lName = t.ledger ? t.ledger.ledger_name : "";

      // Explicitly categorize Fund Transfers so they aren't marked as "Unassigned"
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

      if (t.type.includes("RECEIPT")) {
        lData.in += t.amount;
      } else if (t.type.includes("PAYMENT") || t.type === "FUND_TRANSFER") {
        lData.out += t.amount;
      }

      lData.net = lData.in - lData.out;
      lData.type = lData.net >= 0 ? "Revenue" : "Expense";
    });

    // Handle Incoming Transfers
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
            ? "Internal Fund Transfer (Sent)"
            : t.particulars || (t.ledger ? t.ledger.ledger_name : "General"),
        note: t.remarks || "-",
        amount: t.amount,
        mode:
          t.paymentMode || (t.type.includes("CASH") ? "Cash" : "Bank Transfer"),
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
        particulars: "Internal Fund Transfer (Received)",
        note: t.remarks || "-",
        amount: t.amount,
        mode: t.paymentMode || "Bank Transfer",
        flowType: "in",
        user: t.createdBy?.name || "System",
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      companies,
      companyName,
      ledgerSummary,
      transactions: formattedTransactions,
      openingBalance,
      success: true,
    };
  } catch (error: any) {
    console.error("Error generating company report:", error);
    return {
      companies: [],
      companyName: "",
      ledgerSummary: [],
      transactions: [],
      openingBalance: 0,
      success: false,
      error: error.message,
    };
  }
}
