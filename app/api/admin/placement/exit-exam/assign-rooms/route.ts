// app/api/admin/placement/assign-rooms/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Fetch all sessions with departments, students, and their assignments
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

    // Fetch all rooms
    const rooms = await prisma.roomExitExam.findMany();

    for (const session of sessions) {
      // Filter out students who have any existing assignments (to any session)
      const unassignedStudents = session.department.students.filter(
        (student) => student.assignments.length === 0
      );

      let studentIndex = 0;

      for (const room of rooms) {
        const capacity = room.capacity;

        // Get a slice of unassigned students that fit into the room
        const assignedStudents = unassignedStudents.slice(studentIndex, studentIndex + capacity);

        // Create assignments
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

        // Stop assigning if we’ve exhausted all unassigned students
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
