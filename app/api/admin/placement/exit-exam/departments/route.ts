import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const depts = await prisma.departmentExitExam.findMany({ orderBy: { name: "asc"} });
  return NextResponse.json(depts);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required." }, { status: 400 });
  
  const dept = await prisma.departmentExitExam.create({ data: { name }});
  return NextResponse.json(dept);
}
