import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get counts of applications by status
    const [total, pending, approved, rejected, registered] = await Promise.all([
      prisma.studentApplication.count(),
      prisma.studentApplication.count({ where: { status: "pending" } }),
      prisma.studentApplication.count({ where: { status: "approved" } }),
      prisma.studentApplication.count({ where: { status: "rejected" } }),
      prisma.user.count({ where: { role: "student" } }),
    ]);

    return NextResponse.json({
      total,
      pending,
      approved,
      rejected,
      registered,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
