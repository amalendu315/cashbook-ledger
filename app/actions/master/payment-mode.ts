"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getPaymentModes() {
  try {
    const paymentModes = await prisma.paymentMode.findMany({
      orderBy: { name: "asc" },
    });
    return { success: true, data: paymentModes };
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
        },
      });
    } else {
      // Create new
      await prisma.paymentMode.create({
        data: {
          name: payload.name,
          category: payload.category,
          isActive: payload.isActive,
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
