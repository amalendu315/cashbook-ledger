"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getDashboardData(dateStr: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized access");

    const isAdmin =
      session.user.role === "ADMIN" || session.user.companyIds.includes("ALL");
    const userCompanyIds = session.user.companyIds || [];

    // 1. Fetch Allowed Companies
    const companies = await prisma.company.findMany({
      where: isAdmin ? {} : { id: { in: userCompanyIds } },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    // 2. Fetch Cash Payment Mode IDs to enforce "Cash Only" dashboard
    const cashPaymentModes = await prisma.paymentMode.findMany({
      where: { category: "CASH", isActive: true },
      select: { id: true },
    });
    const cashPaymentModeIds = cashPaymentModes.map((pm) => pm.id);
    const cashCondition = { paymentModeId: { in: cashPaymentModeIds } };

    // 3. Build Global Filters
    const targetDate = new Date(dateStr);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
    const authorizedCompanyIds = companies.map((c) => c.id);

    const companyFilter = { companyId: { in: authorizedCompanyIds } };
    const destCompanyFilter = {
      destinationCompanyId: { in: authorizedCompanyIds },
    };

    // 4. Fetch All Relevant Transactions for Authorized Companies
    const pastTxns = await prisma.transaction.findMany({
      where: {
        businessDate: { lt: startOfDay },
        ...companyFilter,
        ...cashCondition,
      },
      select: { companyId: true, type: true, amount: true },
    });

    const pastTransfersIn = await prisma.transaction.findMany({
      where: {
        businessDate: { lt: startOfDay },
        type: "FUND_TRANSFER",
        ...destCompanyFilter,
        ...cashCondition,
      },
      select: { destinationCompanyId: true, amount: true },
    });

    const todayTxns = await prisma.transaction.findMany({
      where: {
        businessDate: { gte: startOfDay, lte: endOfDay },
        ...companyFilter,
        ...cashCondition,
      },
      select: { companyId: true, type: true, amount: true },
    });

    const todayTransfersIn = await prisma.transaction.findMany({
      where: {
        businessDate: { gte: startOfDay, lte: endOfDay },
        type: "FUND_TRANSFER",
        ...destCompanyFilter,
        ...cashCondition,
      },
      select: { destinationCompanyId: true, amount: true },
    });

    // 5. Build and Aggregate Stats Map per Company
    const statsMap = new Map();
    companies.forEach((c) => {
      statsMap.set(c.id, {
        id: c.id,
        name: c.name,
        openingBalance: 0,
        cashIn: 0,
        cashOut: 0,
        closingBalance: 0,
      });
    });

    // Process Opening Balances
    pastTxns.forEach((t) => {
      const stats = statsMap.get(t.companyId);
      if (!stats) return;
      if (t.type.includes("RECEIPT")) stats.openingBalance += t.amount;
      if (t.type.includes("PAYMENT") || t.type === "FUND_TRANSFER")
        stats.openingBalance -= t.amount;
    });

    pastTransfersIn.forEach((t) => {
      const stats = statsMap.get(t.destinationCompanyId);
      if (!stats) return;
      stats.openingBalance += t.amount;
    });

    // Process Today's In/Out Cash Flows
    todayTxns.forEach((t) => {
      const stats = statsMap.get(t.companyId);
      if (!stats) return;
      if (t.type.includes("RECEIPT")) stats.cashIn += t.amount;
      if (t.type.includes("PAYMENT") || t.type === "FUND_TRANSFER")
        stats.cashOut += t.amount;
    });

    todayTransfersIn.forEach((t) => {
      const stats = statsMap.get(t.destinationCompanyId);
      if (!stats) return;
      stats.cashIn += t.amount;
    });

    // Compute final closing balances
    const companyStats = Array.from(statsMap.values()).map((s) => {
      s.closingBalance = s.openingBalance + s.cashIn - s.cashOut;
      return s;
    });

    return {
      success: true,
      companyStats,
    };
  } catch (error: any) {
    console.error("Dashboard Data Error:", error);
    return { success: false, error: error.message };
  }
}
