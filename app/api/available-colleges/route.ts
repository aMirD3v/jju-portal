import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET: Available colleges (time-checked unless bypass=true)
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const bypass = url.searchParams.get('bypassTime') === 'true';

  const config = await prisma.admissionConfig.findFirst();
  const now = new Date();

  const applicationStarted = config && now >= config.applicationStart;
  const applicationEnded = config && now > config.applicationDeadline;

  if (!bypass && (!applicationStarted || applicationEnded)) {
    return NextResponse.json([]);
  }

  const available = await prisma.availableCollege.findMany({
    include: {
      college: {
        include: { programs: true },
      },
    },
  });

  return NextResponse.json(available.map((item) => item.college));
}

// POST: Add an available college
export async function POST(req: Request) {
  const body = await req.json();
  const { collegeId } = body;

  if (!collegeId) {
    return NextResponse.json({ error: 'Missing collegeId' }, { status: 400 });
  }

  const added = await prisma.availableCollege.create({
    data: { collegeId },
  });

  return NextResponse.json(added);
}

// DELETE: Remove an available college
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const collegeId = Number(searchParams.get('collegeId'));

  if (!collegeId) {
    return NextResponse.json({ error: 'Missing collegeId' }, { status: 400 });
  }

  const deleted = await prisma.availableCollege.deleteMany({
    where: { collegeId },
  });

  return NextResponse.json(deleted);
}
