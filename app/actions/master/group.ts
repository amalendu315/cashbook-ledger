"use server";

import {prisma} from "@/lib/db";
import { revalidatePath } from "next/cache";

// Fetch all Groups and their associated Companies for the master page
export async function getGroupMasterData() {
  try {
    const groups = await prisma.group.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { groups, success: true };
  } catch (error: any) {
    console.error("Error fetching group data:", error);
    return { groups: [], success: false, error: error.message };
  }
}

// Create or Update a Group (Only handles name now)
export async function saveGroup(id: string | null, name: string) {
  try {
    if (id) {
      // UPDATE
      await prisma.group.update({
        where: { id },
        data: { name },
      });
    } else {
      // CREATE
      await prisma.group.create({
        data: { name },
      });
    }

    // Tells Next.js to purge the cache and refresh the data on the page
    revalidatePath("/masters/group");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving group:", error);
    return { success: false, error: error.message };
  }
}

// Delete a Group
export async function deleteGroup(id: string) {
  try {
    await prisma.group.delete({
      where: { id },
    });
    revalidatePath("/masters/group");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting group:", error);
    return { success: false, error: error.message };
  }
}
