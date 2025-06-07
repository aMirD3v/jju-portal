// app/api/student/placement/exit-exam/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const studentId = req.nextUrl.searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json({ error: 'Missing studentId parameter.' }, { status: 400 });
    }

    const student = await prisma.studentExitExam.findUnique({
      where: { studentId },
      include: {
        assignments: {
          include: {
            session: true,
            room: true,
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }

    const assignments = student.assignments.map((assignment) => ({
      sessionName: assignment.session.sessionName,
      date: assignment.session.date,
      startTime: assignment.session.startTime,
      endTime: assignment.session.endTime,
      roomName: assignment.room.name,
    }));

    return NextResponse.json({ studentName: student.name, assignments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to retrieve student assignments.' }, { status: 500 });
  }
}
