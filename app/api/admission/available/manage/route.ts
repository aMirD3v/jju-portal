import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { collegeId, programIds } = await req.json();

  if (!collegeId || !Array.isArray(programIds)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  let availableCollege = await prisma.availableCollege.findFirst({
    where: { collegeId },
  });

  if (!availableCollege) {
    availableCollege = await prisma.availableCollege.create({
      data: { collegeId },
    });
  }

  await prisma.availableProgram.deleteMany({
    where: { availableCollegeId: availableCollege.id },
  });

  const data = programIds.map((programId: number) => ({
    programId,
    availableCollegeId: availableCollege.id,
  }));

  await prisma.availableProgram.createMany({ data });

  return NextResponse.json({ success: true });
}
