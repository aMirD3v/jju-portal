// app/api/admin/placement/assign-rooms/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const sessions = await prisma.sessionExitExam.findMany({
      include: {
        department: {
          include: {
            students: {
              include: {
                assignments: true,
              },
            },
          },
        },
      },
    });

    const rooms = await prisma.roomExitExam.findMany();

    for (const session of sessions) {
      const unassignedStudents = session.department.students.filter(
        (student) => !student.assignments.some((a) => a.sessionId === session.id)
      );

      let studentIndex = 0;

      for (const room of rooms) {
        const capacity = room.capacity;
        const assignedStudents = unassignedStudents.slice(studentIndex, studentIndex + capacity);

        for (const student of assignedStudents) {
          await prisma.assignmentExitExam.create({
            data: {
              studentId: student.id,
              sessionId: session.id,
              roomId: room.id,
            },
          });
        }

        studentIndex += capacity;

        if (studentIndex >= unassignedStudents.length) {
          break;
        }
      }
    }

    return NextResponse.json({ message: 'Students assigned to rooms successfully.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to assign students to rooms.' }, { status: 500 });
  }
}
