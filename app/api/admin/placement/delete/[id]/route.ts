// app/api/admin/placement/delete/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.studentPlacement.update({
      where: { id: params.id },
      data: { roomId: null }, // unassign room
    });
    return NextResponse.json({ message: "Placement deleted." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete placement." }, { status: 500 });
  }
}
