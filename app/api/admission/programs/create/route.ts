import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, year, collegeId } = await req.json();

  if (!name || !year || !collegeId) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const program = await prisma.program.create({
    data: { name, year, collegeId },
  });

  return NextResponse.json(program);
}
