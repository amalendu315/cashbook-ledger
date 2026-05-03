"use server";

import {prisma} from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs"; // Make sure to run: pnpm add bcryptjs

// Fetch all Users and available Companies for the master page
export async function getUserMasterData() {
  try {
    const users = await prisma.user.findMany({
      include: {
        companyAccess: {
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

    // Format the users for the frontend grid
    const formattedUsers = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.isActive ? "Active" : "Inactive",
      // Admins automatically get access to all, otherwise list the mapped ones
      mappedCompanies:
        u.role === "ADMIN"
          ? [{ id: "ALL", name: "All Companies (Global)" }]
          : u.companyAccess.map((mapping) => mapping.company),
    }));

    return { users: formattedUsers, companies, success: true };
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    return { users: [], companies: [], success: false, error: error.message };
  }
}

// Create or Update a User
export async function saveUser(
  id: string | null,
  name: string,
  email: string,
  role: string,
  status: string,
  plainTextPassword: string, // Only required on creation, optional on update
  companyIds: string[],
) {
  try {
    const isActive = status === "Active";

    // Format mappings for the explicit Many-to-Many join table
    const mappedCompanies = companyIds.map((cId) => ({
      companyId: cId,
    }));

    if (id) {
      // UPDATE
      const updateData: any = {
        name,
        email,
        role,
        isActive,
        companyAccess: {
          deleteMany: {}, // Clear old access
          create: mappedCompanies, // Re-assign new access
        },
      };

      // Only update the password if the admin generated/typed a new one
      if (plainTextPassword) {
        updateData.passwordHash = await bcrypt.hash(plainTextPassword, 10);
      }

      await prisma.user.update({
        where: { id },
        data: updateData,
      });
    } else {
      // CREATE
      if (!plainTextPassword)
        throw new Error("Password is required for new users.");

      const passwordHash = await bcrypt.hash(plainTextPassword, 10);

      await prisma.user.create({
        data: {
          name,
          email,
          role,
          isActive,
          passwordHash,
          companyAccess: {
            create: mappedCompanies,
          },
        },
      });
    }

    revalidatePath("/user-management");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving user:", error);
    if (error.code === "P2002") {
      return {
        success: false,
        error: "This email address is already registered.",
      };
    }
    return { success: false, error: error.message };
  }
}

// Delete a User
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath("/user-management");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return { success: false, error: error.message };
  }
}

// Fetch a single user's detailed profile
export async function getUserDetails(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        companyAccess: {
          include: {
            company: {
              select: { id: true, name: true, companyCode: true },
            },
          },
        },
      },
    });

    if (!user) return { success: false, error: "User not found." };

    // Format for the UI
    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.isActive ? "Active" : "Inactive",
      createdAt: user.createdAt,
      mappedCompanies:
        user.role === "ADMIN"
          ? [{ id: "ALL", name: "All Companies (Global Administrator)", companyCode: "***" }]
          : user.companyAccess.map((mapping) => mapping.company),
    };

    return { user: formattedUser, success: true };
  } catch (error: any) {
    console.error("Error fetching user details:", error);
    return { success: false, error: error.message };
  }
}

// Admin forced password reset
export async function adminResetPassword(id: string, plainTextPassword: string) {
  try {
    if (!plainTextPassword || plainTextPassword.length < 6) {
      return { success: false, error: "Password must be at least 6 characters." };
    }

    const passwordHash = await bcrypt.hash(plainTextPassword, 10);

    await prisma.user.update({
      where: { id },
      data: { passwordHash },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error resetting password:", error);
    return { success: false, error: error.message };
  }
}
