"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Fetch all Ledgers, Groups, and available Companies for the master page
export async function getLedgerMasterData() {
  try {
    const ledgers = await prisma.ledger.findMany({
      include: {
        group: {
          select: { id: true, name: true }, // Bring in the mandatory Group Name
        },
        companies: {
          include: {
            company: {
              select: { id: true, name: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const companies = await prisma.company.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    const groups = await prisma.group.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    // Flatten the nested mapping structure to make it easy for the frontend
    const formattedLedgers = ledgers.map((l) => ({
      id: l.id,
      name: l.ledger_name,
      details: l.ledger_details,
      status: l.isActive ? "Active" : "Inactive",
      openingBalance: l.openingBalance,
      openingBalanceType: l.openingBalanceType,
      group: l.group,
      mappedCompanies: l.companies.map((mapping) => mapping.company),
    }));

    return { ledgers: formattedLedgers, companies, groups, success: true };
  } catch (error: any) {
    console.error("Error fetching ledger data:", error);
    return {
      ledgers: [],
      companies: [],
      groups: [],
      success: false,
      error: error.message,
    };
  }
}

// Create or Update a Ledger
export async function saveLedger(
  id: string | null,
  ledger_name: string,
  ledger_details: string,
  status: string,
  groupId: string,
  companyIds: string[],
  openingBalance: number,
  openingBalanceType: string,
) {
  try {
    const isActive = status === "Active";

    // Format mappings for the explicit Many-to-Many join table
    const mappedCompanies = companyIds.map((cId) => ({
      companyId: cId,
    }));

    if (id) {
      // UPDATE
      await prisma.ledger.update({
        where: { id },
        data: {
          ledger_name,
          ledger_details,
          isActive,
          groupId, // Save the assigned group
          openingBalance,
          openingBalanceType,
          companies: {
            // Delete old mappings and recreate them
            deleteMany: {},
            create: mappedCompanies,
          },
        },
      });
    } else {
      // CREATE
      await prisma.ledger.create({
        data: {
          ledger_name,
          ledger_details,
          isActive,
          groupId, // Save the assigned group
          openingBalance,
          openingBalanceType,
          companies: {
            create: mappedCompanies,
          },
        },
      });
    }

    revalidatePath("/masters/ledger");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving ledger:", error);
    return { success: false, error: error.message };
  }
}

// Delete a Ledger
export async function deleteLedger(id: string) {
  try {
    await prisma.ledger.delete({
      where: { id },
    });
    revalidatePath("/masters/ledger");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting ledger:", error);
    return { success: false, error: error.message };
  }
}
