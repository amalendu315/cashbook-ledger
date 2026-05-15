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

    // 1.5 Fetch Cash Payment Mode IDs to enforce "Cash Only" dashboard dynamically
    const cashPaymentModes = await prisma.paymentMode.findMany({
      where: { category: "CASH", isActive: true },
      select: { id: true },
    });
    const cashPaymentModeIds = cashPaymentModes.map((pm) => pm.id);

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

    // STRICT CASH CONDITIONS: Only include transactions linked to a "CASH" payment mode
    const cashCondition = {
      paymentModeId: { in: cashPaymentModeIds },
    };

    // 3. CALCULATE OPENING BALANCE (Historical Cash Transactions prior to startOfDay)
    const pastOutgoingGrouped = await prisma.transaction.groupBy({
      by: ["type"],
      where: {
        businessDate: { lt: startOfDay },
        ...companyFilter,
        ...cashCondition,
      },
      _sum: { amount: true },
    });

    let pastCashIn = 0;
    let pastCashOut = 0;

    pastOutgoingGrouped.forEach((g) => {
      if (g.type === "CASH_RECEIPT") pastCashIn += g._sum.amount || 0;
      if (g.type === "CASH_PAYMENT") pastCashOut += g._sum.amount || 0;
      if (g.type === "FUND_TRANSFER") pastCashOut += g._sum.amount || 0;
    });

    if (Object.keys(destinationFilter).length > 0 || isAdmin) {
      const pastIncomingTransfers = await prisma.transaction.aggregate({
        where: {
          businessDate: { lt: startOfDay },
          type: "FUND_TRANSFER",
          paymentModeId: { in: cashPaymentModeIds },
          ...destinationFilter,
        },
        _sum: { amount: true },
      });
      pastCashIn += pastIncomingTransfers._sum.amount || 0;
    }

    const openingBalance = pastCashIn - pastCashOut;

    // 4. FETCH TODAY'S CASH TRANSACTIONS
    const todayOutgoing = await prisma.transaction.findMany({
      where: {
        businessDate: { gte: startOfDay, lte: endOfDay },
        ...companyFilter,
        ...cashCondition,
      },
      include: {
        ledger: true,
        company: true,
        destinationCompany: true,
        paymentMode: { select: { name: true } }, // Includes mode to show in list
      },
    });

    let todayIncomingTransfers: any[] = [];
    if (Object.keys(destinationFilter).length > 0 || isAdmin) {
      todayIncomingTransfers = await prisma.transaction.findMany({
        where: {
          businessDate: { gte: startOfDay, lte: endOfDay },
          type: "FUND_TRANSFER",
          paymentModeId: { in: cashPaymentModeIds },
          ...destinationFilter,
        },
        include: {
          ledger: true,
          company: true,
          destinationCompany: true,
          paymentMode: { select: { name: true } },
        },
      });
    }

    const uniqueTxns = new Map();
    let cashIn = 0;
    let cashOut = 0;

    // Process outgoing/internal cash transactions
    todayOutgoing.forEach((t) => {
      uniqueTxns.set(t.id, t);
      if (t.type === "CASH_RECEIPT") cashIn += t.amount;
      if (t.type === "CASH_PAYMENT" || t.type === "FUND_TRANSFER") {
        cashOut += t.amount;
      }
    });

    // Process incoming cash transfers
    todayIncomingTransfers.forEach((t) => {
      cashIn += t.amount;
      if (!uniqueTxns.has(t.id)) {
        uniqueTxns.set(t.id + "_in", { ...t, _isIncoming: true });
      }
    });

    const closingBalance = openingBalance + cashIn - cashOut;
    const allRelevantTxns = Array.from(uniqueTxns.values());

    // 5. Generate Chart Data (Cash Only)
    const chartData = [
      { time: "08:00", "Cash In": 0, "Cash Out": 0 },
      { time: "11:00", "Cash In": 0, "Cash Out": 0 },
      { time: "14:00", "Cash In": 0, "Cash Out": 0 },
      { time: "17:00", "Cash In": 0, "Cash Out": 0 },
      { time: "20:00", "Cash In": 0, "Cash Out": 0 },
      { time: "23:00", "Cash In": 0, "Cash Out": 0 },
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

      if (t.type === "CASH_RECEIPT" || t._isIncoming) {
        chartData[bucketIndex]["Cash In"] += t.amount;
      }
      if (
        t.type === "CASH_PAYMENT" ||
        (!t._isIncoming && t.type === "FUND_TRANSFER")
      ) {
        chartData[bucketIndex]["Cash Out"] += t.amount;
      }
    });

    // 6. Fetch Recent Activity (Cash Only)
    const recentTransactions = allRelevantTxns
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 6)
      .map((t) => {
        const isReceipt = t.type === "CASH_RECEIPT" || t._isIncoming;
        const isPayment =
          t.type === "CASH_PAYMENT" ||
          (!t._isIncoming && t.type === "FUND_TRANSFER");

        let details =
          t.particulars || (t.ledger ? t.ledger.ledger_name : "General");
        if (t.type === "FUND_TRANSFER") {
          if (t._isIncoming) details = `Cash received from ${t.company?.name}`;
          else details = `Cash transferred to ${t.destinationCompany?.name}`;
        }

        return {
          id: t.voucherNo,
          type: t._isIncoming ? "CASH TRANSFER IN" : t.type.replace("_", " "),
          details,
          amountIn: isReceipt
            ? t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })
            : "-",
          amountOut: isPayment
            ? t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })
            : "-",
          mode: t.paymentMode?.name || "Cash", // Now dynamically pulled from PaymentMode master!
          date: t.businessDate.toISOString().split("T")[0],
        };
      });

    // 7. System Alerts
    const alerts = [];
    let alertId = 1;

    const highValueTxns = allRelevantTxns.filter(
      (t) => t.amount >= 50000,
    ).length;
    if (highValueTxns > 0) {
      alerts.push({
        id: alertId++,
        title: "High Value Cash Activity",
        desc: `${highValueTxns} cash transaction(s) recorded over ₹50,000 today.`,
        type: "info",
        time: "Today",
      });
    }

    const fundTransfers = todayOutgoing.filter(
      (t) => t.type === "FUND_TRANSFER",
    ).length;
    if (fundTransfers > 0) {
      alerts.push({
        id: alertId++,
        title: "Cash Transfers Executed",
        desc: `${fundTransfers} internal cash transfer(s) occurred today.`,
        type: "warning",
        time: "Today",
      });
    }

    if (alerts.length === 0) {
      alerts.push({
        id: alertId++,
        title: "Cashbook Status Clear",
        desc: "All physical cash flow is updated and stable.",
        type: "success",
        time: "Just now",
      });
    }

    return {
      success: true,
      companies,
      kpis: { openingBalance, cashIn, cashOut, closingBalance },
      chartData,
      recentTransactions,
      alerts,
    };
  } catch (error: any) {
    console.error("Dashboard Data Error:", error);
    return { success: false, error: error.message };
  }
}
