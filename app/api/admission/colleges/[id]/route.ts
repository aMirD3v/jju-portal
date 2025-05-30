import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { name } = await req.json();
  const id = parseInt(params.id);

  if (!name || isNaN(id)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const college = await prisma.college.update({
    where: { id },
    data: { name },
  });

  return NextResponse.json(college);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  // Remove programs + available entries
  await prisma.college.delete({
    where: { id },
  });

  return NextResponse.json({ message: "College deleted successfully" });
}
