// app/api/admin/create-student/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateStudentBarcode } from '@/lib/barcodeGenerator';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, studentId } = await request.json();

    if (!name || !email || !studentId) {
      return NextResponse.json(
        { error: 'Name, email, and studentId are required' },
        { status: 400 }
      );
    }

    // Validate studentId format
    if (!/^STD\d{6}$/.test(studentId)) {
      return NextResponse.json(
        { error: 'Student ID must be in STDXXXXXX format (6 digits)' },
        { status: 400 }
      );
    }

    // Check if student ID or email already exists
    const existingStudent = await prisma.studentUser.findFirst({
      where: {
        OR: [
          { studentId },
          { email },
        ],
      },
    });

    if (existingStudent) {
      return NextResponse.json(
        { error: 'Student with this ID or email already exists' },
        { status: 400 }
      );
    }

    // Create student in database
    const student = await prisma.studentUser.create({
      data: {
        name,
        email,
        studentId,
      },
    });

    // Generate barcode
    await generateStudentBarcode(studentId);

    return NextResponse.json({
      message: 'Student created successfully',
      student,
    });
  } catch (error) {
    console.error('Create student error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}