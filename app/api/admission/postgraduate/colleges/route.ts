import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const colleges = await prisma.collegePostGraduate.findMany({
    include: { programs: true },
  });

  return NextResponse.json(colleges);
}
