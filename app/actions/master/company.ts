"use server";

import {prisma} from "@/lib/db";
import { revalidatePath } from "next/cache";

// Fetch all Companies for the master page
export async function getCompanyMasterData() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { companies, success: true };
  } catch (error: any) {
    console.error("Error fetching company data:", error);
    return { companies: [], success: false, error: error.message };
  }
}

// Create or Update a Company
export async function saveCompany(
  id: string | null,
  companyCode: string,
  name: string,
) {
  try {
    if (id) {
      // UPDATE
      await prisma.company.update({
        where: { id },
        data: {
          companyCode,
          name,
        },
      });
    } else {
      // CREATE
      await prisma.company.create({
        data: {
          companyCode,
          name,
        },
      });
    }

    // Purge cache to reflect changes instantly
    revalidatePath("/masters/company");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving company:", error);
    // Graceful error handling for unique constraint failures
    if (error.code === "P2002") {
      return { success: false, error: "This Company Code is already in use." };
    }
    return { success: false, error: error.message };
  }
}

// Delete a Company
export async function deleteCompany(id: string) {
  try {
    await prisma.company.delete({
      where: { id },
    });
    revalidatePath("/masters/company");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting company:", error);
    return { success: false, error: error.message };
  }
}
