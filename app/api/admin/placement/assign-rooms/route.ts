// app/api/admin/assign-rooms/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const rooms = await prisma.room.findMany({ orderBy: { name: "asc" } });
  const students = await prisma.studentPlacement.findMany({ where: { roomId: null } });

  let roomIndex = 0;
  let currentCapacity = 0;

  for (const student of students) {
    const room = rooms[roomIndex];

    await prisma.studentPlacement.update({
      where: { id: student.id },
      data: { roomId: room.id },
    });

    currentCapacity++;
    if (currentCapacity >= room.capacity) {
      roomIndex++;
      currentCapacity = 0;
    }
  }

  return NextResponse.json({ message: "Placement completed!" });
}
