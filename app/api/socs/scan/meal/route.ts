// app/api/scan/meal/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { MealType } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { studentId, mealType } = await request.json();

    if (!studentId || !mealType) {
      return NextResponse.json(
        { error: 'studentId and mealType are required' },
        { status: 400 }
      );
    }

    // Validate mealType
    if (!Object.values(MealType).includes(mealType)) {
      return NextResponse.json(
        { error: 'Invalid mealType' },
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

    // Check if student has already accessed this meal today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAccess = await prisma.cafeteriaAccess.findFirst({
      where: {
        studentId: student.id,
        mealType,
        date: {
          gte: today,
        },
      },
    });

    if (existingAccess) {
      return NextResponse.json(
        { error: `${mealType} already accessed today` },
        { status: 400 }
      );
    }

    // Log the meal access
    const mealAccess = await prisma.cafeteriaAccess.create({
      data: {
        studentId: student.id,
        mealType,
      },
    });

    return NextResponse.json({
      message: 'Meal access logged successfully',
      mealAccess,
    });
  } catch (error) {
    console.error('Meal access error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}