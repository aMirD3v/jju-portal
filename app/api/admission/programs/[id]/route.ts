import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { name, year } = await req.json();
  const id = parseInt(params.id);

  if (!name || !year || isNaN(id)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const program = await prisma.program.update({
    where: { id },
    data: { name, year },
  });

  return NextResponse.json(program);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await prisma.program.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Program deleted successfully" });
}
