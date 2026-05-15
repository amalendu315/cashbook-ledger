"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getPaymentModes() {
  try {
    // 1. Fetch all payment modes along with their company mappings
    const paymentModes = await prisma.paymentMode.findMany({
      include: {
        companies: {
          include: {
            company: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    // 2. Fetch all companies to populate the multi-select options
    const allCompanies = await prisma.company.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    // 3. Flatten the relational data for the frontend
    const formattedModes = paymentModes.map((pm) => ({
      id: pm.id,
      name: pm.name,
      category: pm.category,
      isActive: pm.isActive,
      companyIds: pm.companies.map((c) => c.companyId),
      companyNames: pm.companies.map((c) => c.company.name).join(", "),
    }));

    return {
      success: true,
      data: formattedModes,
      companies: allCompanies,
    };
  } catch (error: any) {
    console.error("Error fetching payment modes:", error);
    return { success: false, error: error.message };
  }
}

export async function savePaymentMode(payload: {
  id?: string;
  name: string;
  category: string;
  isActive: boolean;
  companyIds: string[]; // NEW: Array of selected company IDs
}) {
  try {
    if (payload.id) {
      // Update existing
      await prisma.paymentMode.update({
        where: { id: payload.id },
        data: {
          name: payload.name,
          category: payload.category,
          isActive: payload.isActive,
          // Overwrite many-to-many relationship: wipe old ones, insert new ones
          companies: {
            deleteMany: {},
            create: payload.companyIds.map((companyId) => ({
              companyId,
            })),
          },
        },
      });
    } else {
      // Create new
      await prisma.paymentMode.create({
        data: {
          name: payload.name,
          category: payload.category,
          isActive: payload.isActive,
          // Create the mapping relations concurrently
          companies: {
            create: payload.companyIds.map((companyId) => ({
              companyId,
            })),
          },
        },
      });
    }

    revalidatePath("/master/payment-mode");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving payment mode:", error);
    // Handle unique constraint violation on name
    if (error.code === "P2002") {
      return {
        success: false,
        error: "A payment mode with this name already exists.",
      };
    }
    return { success: false, error: error.message };
  }
}

export async function deletePaymentMode(id: string) {
  try {
    await prisma.paymentMode.delete({
      where: { id },
    });
    revalidatePath("/master/payment-mode");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting payment mode:", error);
    // If it's linked to transactions, Prisma will throw a foreign key constraint error
    if (error.code === "P2003") {
      return {
        success: false,
        error:
          "Cannot delete this payment mode because it is currently used in existing transactions.",
      };
    }
    return { success: false, error: error.message };
  }
}
