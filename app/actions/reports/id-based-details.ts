"use server";

import { prisma } from "@/lib/db";

export async function getCompanyDashboard(
  companyId: string,
  fromDate: string,
  toDate: string,
) {
  try {
    // Canvas Fallback
    if (!prisma.company) return mockCompanyData();

    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });
    if (!company) throw new Error("Company not found");

    const from = new Date(fromDate);
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999);

    // Get transactions strictly before 'from' date to calculate Opening Balance
    const pastTransactions = await prisma.transaction.findMany({
      where: { companyId, businessDate: { lt: from } },
    });

    // Assume standard 0 opening balance for company if not defined elsewhere, plus past net flow
    let openingBalance = pastTransactions.reduce((acc, tx) => {
      // Simplified logic: Receipts add, Payments subtract
      if (tx.type.includes("RECEIPT")) return acc + tx.amount;
      if (tx.type.includes("PAYMENT")) return acc - tx.amount;
      return acc;
    }, 0);

    // Get current period transactions
    const periodTransactions = await prisma.transaction.findMany({
      where: {
        companyId,
        businessDate: { gte: from, lte: to },
      },
      include: {
        ledger: true,
        createdBy: true,
        paymentMode: true, // <-- Included payment mode relation
      },
      orderBy: { businessDate: "desc" },
    });

    let totalIn = 0;
    let totalOut = 0;

    const formattedTx = periodTransactions.map((tx) => {
      const isIn = tx.type.includes("RECEIPT") || tx.type === "TRANSFER_IN";
      if (isIn) totalIn += tx.amount;
      else totalOut += tx.amount;

      return {
        id: tx.id,
        voucherNo: tx.voucherNo,
        date: tx.businessDate.toISOString().split("T")[0],
        type: tx.type.replace("_", " "),
        particulars: tx.particulars,
        ledgerName: tx.ledger?.ledger_name || "N/A",
        mode: tx.paymentMode?.name || "Unknown", // Safely extract name
        paymentCategory: tx.paymentMode?.category || "Unknown", // Added category mapping
        amount: tx.amount,
        flowType: isIn ? "in" : "out",
        user: tx.createdBy?.name || "System",
      };
    });

    return {
      success: true,
      data: {
        companyName: company.name,
        companyCode: company.companyCode,
        openingBalance,
        totalIn,
        totalOut,
        closingBalance: openingBalance + totalIn - totalOut,
        transactions: formattedTx,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getLedgerDashboard(
  ledgerId: string,
  fromDate: string,
  toDate: string,
) {
  try {
    if (!prisma.ledger) return mockLedgerData();

    const ledger = await prisma.ledger.findUnique({
      where: { id: ledgerId },
      include: { group: true },
    });
    if (!ledger) throw new Error("Ledger not found");

    const from = new Date(fromDate);
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999);

    const pastTransactions = await prisma.transaction.findMany({
      where: { ledgerId, businessDate: { lt: from } },
    });

    // Start with Ledger's master opening balance
    let openingBalance =
      ledger.openingBalanceType === "Cr"
        ? ledger.openingBalance
        : -ledger.openingBalance;

    // Add past transactions
    pastTransactions.forEach((tx) => {
      if (tx.type.includes("RECEIPT")) openingBalance += tx.amount;
      if (tx.type.includes("PAYMENT")) openingBalance -= tx.amount;
    });

    const periodTransactions = await prisma.transaction.findMany({
      where: {
        ledgerId,
        businessDate: { gte: from, lte: to },
      },
      include: {
        company: true,
        createdBy: true,
        paymentMode: true, // <-- Included payment mode relation
      },
      orderBy: { businessDate: "desc" },
    });

    let totalIn = 0;
    let totalOut = 0;

    const formattedTx = periodTransactions.map((tx) => {
      const isIn = tx.type.includes("RECEIPT");
      if (isIn) totalIn += tx.amount;
      else totalOut += tx.amount;

      return {
        id: tx.id,
        voucherNo: tx.voucherNo,
        date: tx.businessDate.toISOString().split("T")[0],
        type: tx.type.replace("_", " "),
        companyName: tx.company?.name || "N/A",
        particulars: tx.particulars,
        mode: tx.paymentMode?.name || "Unknown", // Safely extract name
        paymentCategory: tx.paymentMode?.category || "Unknown", // Added category mapping
        amount: tx.amount,
        flowType: isIn ? "in" : "out",
      };
    });

    return {
      success: true,
      data: {
        ledgerName: ledger.ledger_name,
        groupName: ledger.group?.name || "Uncategorized",
        type: ledger.openingBalanceType,
        openingBalance,
        totalIn,
        totalOut,
        closingBalance: openingBalance + totalIn - totalOut,
        transactions: formattedTx,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getTransactionDetails(id: string) {
  try {
    // Canvas Fallback Data
    if (!prisma.transaction) {
      return {
        success: true,
        data: {
          id: "mock1",
          voucherNo: "CR-92842",
          type: "CASH_RECEIPT",
          date: "2024-05-12",
          amount: 15000,
          particulars: "Grand Udaan Hotel - Event Booking",
          mode: "Cash",
          paymentCategory: "CASH",
          remarks:
            "Received advance payment for the corporate summit. Cleared by manager.",
          companyName: "Grand Udaan Hotel",
          ledgerName: "Event Revenue",
          userName: "Admin User",
          flowType: "in",
        },
      };
    }

    const tx = await prisma.transaction.findUnique({
      where: { id },
      include: {
        company: true,
        ledger: true,
        createdBy: true,
        destinationCompany: true, // If it's a fund transfer
        paymentMode: true, // <-- Included payment mode relation
      },
    });

    if (!tx) throw new Error("Transaction not found");

    const isInwards = tx.type.includes("RECEIPT") || tx.type === "TRANSFER_IN";

    return {
      success: true,
      data: {
        id: tx.id,
        voucherNo: tx.voucherNo,
        type: tx.type,
        date: tx.businessDate.toISOString().split("T")[0],
        amount: tx.amount,
        particulars: tx.particulars,
        mode: tx.paymentMode?.name || "Unknown", // Safely extract name
        paymentCategory: tx.paymentMode?.category || "Unknown", // Added category mapping
        remarks: tx.remarks || "No remarks provided.",
        companyName: tx.company.name,
        ledgerName:
          tx.ledger?.ledger_name ||
          (tx.destinationCompany
            ? `Transfer to ${tx.destinationCompany.name}`
            : "N/A"),
        userName: tx.createdBy.name,
        flowType: isInwards ? "in" : "out",
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- Mocks for Canvas Preview ---
function mockCompanyData() {
  return {
    success: true,
    data: {
      companyName: "Grand Udaan Hotel",
      companyCode: "UDAAN-01",
      openingBalance: 150000,
      totalIn: 45000,
      totalOut: 12000,
      closingBalance: 183000,
      transactions: [
        {
          id: "1",
          voucherNo: "CR-101",
          date: "2024-05-12",
          type: "CASH RECEIPT",
          particulars: "Room 101 Booking",
          ledgerName: "Room Revenue",
          mode: "Physical Cash",
          paymentCategory: "CASH",
          amount: 45000,
          flowType: "in",
          user: "Admin",
        },
        {
          id: "2",
          voucherNo: "BP-205",
          date: "2024-05-13",
          type: "BANK PAYMENT",
          particulars: "Plumbing Repair",
          ledgerName: "Maintenance",
          mode: "HDFC Bank",
          paymentCategory: "BANK",
          amount: 12000,
          flowType: "out",
          user: "Manager",
        },
      ],
    },
  };
}

function mockLedgerData() {
  return {
    success: true,
    data: {
      ledgerName: "Room Revenue",
      groupName: "Direct Incomes",
      type: "Cr",
      openingBalance: 500000,
      totalIn: 85000,
      totalOut: 0,
      closingBalance: 585000,
      transactions: [
        {
          id: "1",
          voucherNo: "CR-101",
          date: "2024-05-12",
          type: "CASH RECEIPT",
          companyName: "Grand Udaan Hotel",
          particulars: "Room 101 Booking",
          mode: "Physical Cash",
          paymentCategory: "CASH",
          amount: 45000,
          flowType: "in",
        },
        {
          id: "2",
          voucherNo: "BR-99",
          date: "2024-05-14",
          type: "BANK RECEIPT",
          companyName: "Udaan Olive",
          particulars: "Corporate Booking",
          mode: "SBI Transfer",
          paymentCategory: "BANK",
          amount: 40000,
          flowType: "in",
        },
      ],
    },
  };
}
