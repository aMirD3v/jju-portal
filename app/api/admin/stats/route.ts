import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalUndergrad,
      pendingUndergrad,
      approvedUndergrad,
      rejectedUndergrad,
      totalPostgrad,
      pendingPostgrad,
      approvedPostgrad,
      rejectedPostgrad,
      registeredStudents,
    ] = await Promise.all([
      prisma.studentApplication.count(),
      prisma.studentApplication.count({ where: { status: "pending" } }),
      prisma.studentApplication.count({ where: { status: "approved" } }),
      prisma.studentApplication.count({ where: { status: "rejected" } }),
      prisma.studentApplicationPostGraduate.count(),
      prisma.studentApplicationPostGraduate.count({ where: { status: "pending" } }),
      prisma.studentApplicationPostGraduate.count({ where: { status: "approved" } }),
      prisma.studentApplicationPostGraduate.count({ where: { status: "rejected" } }),
      prisma.user.count({ where: { role: "student" } }),
    ]);

    return NextResponse.json({
      undergraduate: {
        total: totalUndergrad,
        pending: pendingUndergrad,
        approved: approvedUndergrad,
        rejected: rejectedUndergrad,
      },
      postgraduate: {
        total: totalPostgrad,
        pending: pendingPostgrad,
        approved: approvedPostgrad,
        rejected: rejectedPostgrad,
      },
      registeredStudents,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
