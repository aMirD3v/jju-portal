// /api/admin/placement/exit-exam/view-results.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const assignments = await prisma.assignmentExitExam.findMany({
      include: {
        student: {
          include: {
            department: true,
          },
        },
        room: true,
        session: true,
      },
      orderBy: {
        session: {
          date: "asc",
        },
      },
    });

    return NextResponse.json({ assignments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch assignments" }, { status: 500 });
  }
}
