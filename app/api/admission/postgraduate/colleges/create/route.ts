import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const college = await prisma.collegePostGraduate.create({
    data: { name },
  });

  return NextResponse.json(college);
}
