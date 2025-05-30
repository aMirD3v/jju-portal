import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const availableColleges = await prisma.availableCollege.findMany({
    include: {
      college: true,
      programs: {
        include: {
          program: true,
        },
      },
    },
  });

  const result = availableColleges.map((college) => ({
    id: college.id,
    college: college.college,
    programs: college.programs.map((p) => p.program),
  }));

  return NextResponse.json(result);
}
