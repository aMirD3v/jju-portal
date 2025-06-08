import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.departmentExitExam.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
}
