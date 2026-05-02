"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getGroupReportData(
  groupIdStr: string,
  fromDateStr: string,
  toDateStr: string,
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Unauthorized access");

    const isAdmin =
      session.user.role === "ADMIN" || session.user.companyIds.includes("ALL");
    const userCompanyIds = session.user.companyIds || [];

    // 1. Fetch Groups for the Dropdown filter
    const allGroups = await prisma.group.findMany({
      orderBy: { name: "asc" },
    });

    // 2. Fetch User's allowed companies
    const allowedCompanies = await prisma.company.findMany({
      where: isAdmin ? {} : { id: { in: userCompanyIds } },
      select: { id: true, name: true },
    });

    const allowedCompanyIds = allowedCompanies.map((c) => c.id);
    const companyNameMap = new Map();
    allowedCompanies.forEach((c) => companyNameMap.set(c.id, c.name));

    const fromDate = new Date(fromDateStr);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(toDateStr);
    toDate.setHours(23, 59, 59, 999);

    if (!prisma.transaction) {
      throw new Error("Database syncing. Please restart your Next.js server.");
    }

    // 3. Fetch Transactions for the Allowed Companies in Period
    const periodTxns = await prisma.transaction.findMany({
      where: {
        companyId: { in: allowedCompanyIds },
        businessDate: { gte: fromDate, lte: toDate },
      },
      include: { ledger: true, company: { select: { name: true } } },
    });

    const periodTransfersIn = await prisma.transaction.findMany({
      where: {
        destinationCompanyId: { in: allowedCompanyIds },
        businessDate: { gte: fromDate, lte: toDate },
      },
      include: { ledger: true, destinationCompany: { select: { name: true } } },
    });

    // 4. Map transactions by Group -> Ledger -> Company
    const groupMap = new Map<string, any>();

    allGroups.forEach((g) => {
      if (groupIdStr && groupIdStr !== "" && g.id !== groupIdStr) return;
      groupMap.set(g.id, {
        id: g.id,
        name: g.name,
        totalIn: 0,
        totalOut: 0,
        netBalance: 0,
        ledgersMap: new Map<string, any>(),
      });
    });

    if (!groupIdStr || groupIdStr === "") {
      groupMap.set("UNASSIGNED", {
        id: "UNASSIGNED",
        name: "Unassigned / General Transfers",
        totalIn: 0,
        totalOut: 0,
        netBalance: 0,
        ledgersMap: new Map<string, any>(),
      });
    }

    const addStat = (
      gId: string,
      lId: string,
      lName: string,
      cId: string,
      cName: string,
      type: "in" | "out",
      amount: number,
    ) => {
      if (!groupMap.has(gId)) return;
      const g = groupMap.get(gId);

      const mapKey = `${lId}_${cId}`;
      if (!g.ledgersMap.has(mapKey)) {
        g.ledgersMap.set(mapKey, {
          id: mapKey,
          ledgerName: lName,
          companyName: cName,
          in: 0,
          out: 0,
          balance: 0,
        });
      }

      const l = g.ledgersMap.get(mapKey);

      if (type === "in") {
        g.totalIn += amount;
        l.in += amount;
      } else {
        g.totalOut += amount;
        l.out += amount;
      }
    };

    // Process Outgoing & standard transactions
    periodTxns.forEach((t: any) => {
      const gId = t.ledger?.groupId || "UNASSIGNED";
      const lId = t.ledgerId || "UNASSIGNED_LEDGER";
      const lName = t.ledger?.ledger_name || "Unassigned Ledger";
      const cId = t.companyId;
      const cName = t.company?.name || "Unknown Company";

      let flowType: "in" | "out" = "out";

      if (t.type.includes("RECEIPT")) {
        flowType = "in";
      } else if (t.type.includes("PAYMENT") || t.type === "FUND_TRANSFER") {
        flowType = "out";
      }
      addStat(gId, lId, lName, cId, cName, flowType, t.amount);
    });

    // Process Incoming Transfers
    periodTransfersIn.forEach((t: any) => {
      if (!t.destinationCompanyId) return;
      const gId = t.ledger?.groupId || "UNASSIGNED";
      const lId = t.ledgerId || "UNASSIGNED_LEDGER";
      const lName =
        t.ledger?.ledger_name || "Internal Fund Transfer (Received)";
      const cId = t.destinationCompanyId;
      const cName = t.destinationCompany?.name || "Unknown Company";

      addStat(gId, lId, lName, cId, cName, "in", t.amount);
    });

    // 5. Finalize the array formatting for the UI
    const groupBalances = Array.from(groupMap.values())
      .map((g) => {
        const ledgers = Array.from(g.ledgersMap.values()).map((l: any) => {
          l.balance = l.in - l.out;
          return l;
        });

        g.netBalance = g.totalIn - g.totalOut;
        g.ledgers = ledgers.sort((a, b) => b.balance - a.balance);
        delete g.ledgersMap;

        return g;
      })
      .filter((g) => g.ledgers.length > 0);

    return {
      groups: allGroups,
      groupBalances,
      success: true,
    };
  } catch (error: any) {
    console.error("Error generating group report:", error);
    return {
      groups: [],
      groupBalances: [],
      success: false,
      error: error.message,
    };
  }
}
