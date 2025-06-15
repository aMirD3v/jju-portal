// app/api/scan/access/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { AccessType } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { studentId, accessType } = await request.json();

    if (!studentId || !accessType) {
      return NextResponse.json(
        { error: 'studentId and accessType are required' },
        { status: 400 }
      );
    }

    // Validate accessType
    if (!Object.values(AccessType).includes(accessType)) {
      return NextResponse.json(
        { error: 'Invalid accessType' },
        { status: 400 }
      );
    }

    // Check if student exists
    const student = await prisma.studentUser.findUnique({
      where: { studentId },
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Log the access
    const accessLog = await prisma.accessLog.create({
      data: {
        studentId: student.id,
        accessType,
      },
    });

    return NextResponse.json({
      message: 'Access logged successfully',
      accessLog,
    });
  } catch (error) {
    console.error('Access log error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}