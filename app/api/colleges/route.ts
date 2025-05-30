import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const colleges = await prisma.college.findMany({
    include: { programs: true },
  });

  return NextResponse.json(colleges);
}
