import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sessionId = params.id;

    const session = await prisma.sessionExitExam.findUnique({
      where: { id: sessionId },
      include: {
        _count: {
          select: { assignments: true },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session._count.assignments > 0) {
      return NextResponse.json(
        { error: "Cannot delete a session with assignments" },
        { status: 400 }
      );
    }

    await prisma.sessionExitExam.delete({
      where: { id: sessionId },
    });

    return NextResponse.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Error deleting session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
