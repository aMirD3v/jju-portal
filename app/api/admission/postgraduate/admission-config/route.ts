import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const config = await prisma.admissionConfigPostGraduate.findFirst();
  return NextResponse.json(config);
}

export async function POST(req: Request) {
  const { applicationStart, applicationDeadline } = await req.json();

  if (!applicationStart || !applicationDeadline) {
    return NextResponse.json({ error: "Start and deadline required" }, { status: 400 });
  }

  // Always update the first config if it exists, otherwise create one.
  const existingConfig = await prisma.admissionConfigPostGraduate.findFirst();

  let updatedConfig;
  if (existingConfig) {
    updatedConfig = await prisma.admissionConfigPostGraduate.update({
      where: { id: existingConfig.id },
      data: {
        applicationStart: new Date(applicationStart),
        applicationDeadline: new Date(applicationDeadline),
      },
    });
  } else {
    updatedConfig = await prisma.admissionConfigPostGraduate.create({
      data: {
        applicationStart: new Date(applicationStart),
        applicationDeadline: new Date(applicationDeadline),
      },
    });
  }

  return NextResponse.json(updatedConfig);
}
