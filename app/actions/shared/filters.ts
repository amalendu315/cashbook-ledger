// app/actions/shared/filters.ts
"use server";

import { prisma } from "@/lib/db";

export async function getAccessibleCompanies(userId: string, role: string) {
  try {
    if (role === "ADMIN") {
      // Admins get all companies
      const companies = await prisma.company.findMany({
        select: { id: true, name: true, companyCode: true },
        orderBy: { name: "asc" },
      });
      return { success: true, companies };
    } else {
      // Standard users only get mapped companies
      const access = await prisma.userCompanyAccess.findMany({
        where: { userId },
        include: {
          company: {
            select: { id: true, name: true, companyCode: true },
          },
        },
      });

      const mappedCompanies = access
        .map((a) => a.company)
        .sort((a, b) => a.name.localeCompare(b.name));

      return { success: true, companies: mappedCompanies };
    }
  } catch (error: any) {
    console.error("Error fetching companies:", error);
    return { success: false, error: error.message };
  }
}
