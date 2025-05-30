import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const config = await prisma.admissionConfig.findFirst();

  if (!config) {
    return NextResponse.json({ error: 'Admission config not found' }, { status: 404 });
  }

  return NextResponse.json(config);
}
