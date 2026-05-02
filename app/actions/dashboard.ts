"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getDashboardData(dateStr: string, companyIdStr: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized access");

    const isAdmin =
      session.user.role === "ADMIN" || session.user.companyIds.includes("ALL");
    const userCompanyIds = session.user.companyIds || [];

    // 1. Fetch Allowed Companies for the Dropdown Filter
    const companies = await prisma.company.findMany({
      where: isAdmin ? {} : { id: { in: userCompanyIds } },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    // 2. Build our Database Filters
    const targetDate = new Date(dateStr);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const companyFilter =
      companyIdStr === "ALL"
        ? isAdmin
          ? {}
          : { companyId: { in: userCompanyIds } }
        : { companyId: companyIdStr };

    const destinationFilter =
      companyIdStr === "ALL"
        ? isAdmin
          ? {}
          : { destinationCompanyId: { in: userCompanyIds } }
        : { destinationCompanyId: companyIdStr };

    // 3. Fetch Transactions (Outgoing and General)
    const outgoingTransactions = await prisma.transaction.findMany({
      where: {
        businessDate: { gte: startOfDay, lte: endOfDay },
        ...companyFilter,
      },
      include: { ledger: true, company: true, destinationCompany: true },
    });

    // 3b. Fetch Incoming Fund Transfers
    let incomingTransfers: any[] = [];
    if (Object.keys(destinationFilter).length > 0 || isAdmin) {
      incomingTransfers = await prisma.transaction.findMany({
        where: {
          businessDate: { gte: startOfDay, lte: endOfDay },
          type: "FUND_TRANSFER",
          ...destinationFilter,
        },
        include: { ledger: true, company: true, destinationCompany: true },
      });
    }

    const uniqueTxns = new Map();

    // 4. Calculate KPIs (Cash vs Bank) taking Transfer Modes into account
    let cashIn = 0,
      cashOut = 0,
      bankIn = 0,
      bankOut = 0;

    outgoingTransactions.forEach((t) => {
      uniqueTxns.set(t.id, t);
      if (t.type === "CASH_RECEIPT") cashIn += t.amount;
      if (t.type === "CASH_PAYMENT") cashOut += t.amount;
      if (t.type === "BANK_RECEIPT") bankIn += t.amount;
      if (t.type === "BANK_PAYMENT") bankOut += t.amount;

      if (t.type === "FUND_TRANSFER") {
        if (t.paymentMode === "Cash") cashOut += t.amount;
        else bankOut += t.amount;
      }
    });

    incomingTransfers.forEach((t) => {
      // Add to KPIs as Inflow for the destination
      if (t.paymentMode === "Cash") cashIn += t.amount;
      else bankIn += t.amount;

      // If we are looking at a specific company that is strictly the destination,
      // we need to add a cloned inward version of this transaction for charts/lists
      if (!uniqueTxns.has(t.id)) {
        uniqueTxns.set(t.id + "_in", { ...t, _isIncoming: true });
      }
    });

    const allRelevantTxns = Array.from(uniqueTxns.values());

    // 5. Generate Chart Data
    const chartData = [
      { time: "08:00", Inflow: 0, Outflow: 0 },
      { time: "11:00", Inflow: 0, Outflow: 0 },
      { time: "14:00", Inflow: 0, Outflow: 0 },
      { time: "17:00", Inflow: 0, Outflow: 0 },
      { time: "20:00", Inflow: 0, Outflow: 0 },
      { time: "23:00", Inflow: 0, Outflow: 0 },
    ];

    allRelevantTxns.forEach((t) => {
      const hour = t.createdAt.getHours();
      let bucketIndex = 0;
      if (hour >= 8 && hour < 11) bucketIndex = 0;
      else if (hour >= 11 && hour < 14) bucketIndex = 1;
      else if (hour >= 14 && hour < 17) bucketIndex = 2;
      else if (hour >= 17 && hour < 20) bucketIndex = 3;
      else if (hour >= 20 && hour < 23) bucketIndex = 4;
      else bucketIndex = 5;

      if (t.type.includes("RECEIPT") || t._isIncoming) {
        chartData[bucketIndex].Inflow += t.amount;
      }
      if (
        t.type.includes("PAYMENT") ||
        (!t._isIncoming && t.type === "FUND_TRANSFER")
      ) {
        chartData[bucketIndex].Outflow += t.amount;
      }
    });

    // 6. Fetch Recent Activity
    const recentTransactions = allRelevantTxns
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 6)
      .map((t) => {
        const isReceipt = t.type.includes("RECEIPT") || t._isIncoming;
        const isPayment =
          t.type.includes("PAYMENT") ||
          (!t._isIncoming && t.type === "FUND_TRANSFER");

        let details =
          t.particulars || (t.ledger ? t.ledger.ledger_name : "General");
        if (t.type === "FUND_TRANSFER") {
          if (t._isIncoming) details = `Transfer from ${t.company?.name}`;
          else details = `Transfer to ${t.destinationCompany?.name}`;
        }

        return {
          id: t.voucherNo,
          type: t._isIncoming ? "FUND TRANSFER IN" : t.type.replace("_", " "),
          details,
          amountIn: isReceipt
            ? t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })
            : "-",
          amountOut: isPayment
            ? t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })
            : "-",
          mode: t.paymentMode || "Cash",
          date: t.businessDate.toISOString().split("T")[0],
        };
      });

    // 7. 🔥 SYSTEM ALERTS (Approvals Removed) 🔥
    const alerts = [];
    let alertId = 1;

    // Check for High Value Transactions today
    const highValueTxns = allRelevantTxns.filter(
      (t) => t.amount >= 50000,
    ).length;
    if (highValueTxns > 0) {
      alerts.push({
        id: alertId++,
        title: "High Value Activity",
        desc: `${highValueTxns} transaction(s) recorded over ₹50,000 today.`,
        type: "info",
        time: "Today",
      });
    }

    // Fund Transfers today (Counting Outgoing Only to prevent double count in UI)
    const fundTransfers = outgoingTransactions.filter(
      (t) => t.type === "FUND_TRANSFER",
    ).length;
    if (fundTransfers > 0) {
      alerts.push({
        id: alertId++,
        title: "Fund Transfers Executed",
        desc: `${fundTransfers} internal fund transfer(s) occurred today.`,
        type: "warning",
        time: "Today",
      });
    }

    if (alerts.length === 0) {
      alerts.push({
        id: alertId++,
        title: "System Status Clear",
        desc: "All ledgers are updated and reconciled.",
        type: "success",
        time: "Just now",
      });
    }

    return {
      success: true,
      companies,
      kpis: { cashIn, cashOut, bankIn, bankOut },
      chartData,
      recentTransactions,
      alerts,
    };
  } catch (error: any) {
    console.error("Dashboard Data Error:", error);
    return { success: false, error: error.message };
  }
}
