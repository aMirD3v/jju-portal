import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { studentId } = await req.json();

  const student = await prisma.studentPlacement.findUnique({
    where: { studentId },
    include: { room: true },
  });

  if (!student) {
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  }

  return NextResponse.json({
    name: student.name,
    room: student.room ? student.room.name : "Not assigned yet",
  });
}
