import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionName, date, startTime, endTime, departmentId } = await req.json();

    if (!sessionName || !date || !startTime || !endTime || !departmentId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const session = await prisma.sessionExitExam.create({
      data: {
        sessionName,
        date: new Date(date),
        startTime: new Date(`${date}T${startTime}`),
        endTime: new Date(`${date}T${endTime}`),
        departmentId,
      },
    });

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sessions = await prisma.sessionExitExam.findMany({
      include: {
        department: true,
        _count: {
          select: { assignments: true },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const session = await prisma.sessionExitExam.findUnique({
      where: { id: sessionId },
      include: { _count: { select: { assignments: true } } },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session._count.assignments > 0) {
      return NextResponse.json(
        { error: "Cannot delete session with assigned students" },
        { status: 400 }
      );
    }

    await prisma.sessionExitExam.delete({ where: { id: sessionId } });
    return NextResponse.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Error deleting session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
