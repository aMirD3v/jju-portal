// /app/api/applications/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const applications = await prisma.studentApplicationPostGraduate.findMany({
      include: { postSecondary: true },
      orderBy: { createdAt: "asc" },
    });

    // Extract unique sets (like Firebase logic)
    const institutes = new Set<string>();
    const departments = new Set<string>();
    const years = new Set<string>();

    applications.forEach((app) => {
      if (app.institute) institutes.add(app.institute);
      if (app.department) departments.add(app.department);
      if (app.academicYear) years.add(app.academicYear);
    });

    return NextResponse.json({
      applications,
      institutes: Array.from(institutes),
      departments: Array.from(departments),
      years: Array.from(years).sort(),
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
