import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const placements = await prisma.studentPlacement.findMany({
    include: { room: true },
    orderBy: { name: "asc" },
  });

  const data = placements.map((s) => ({
    id: s.id,
    studentId: s.studentId,
    name: s.name,
    department: s.department,
    room: s.room ? s.room.name : "Not assigned",
  }));

  return NextResponse.json(data);
}
