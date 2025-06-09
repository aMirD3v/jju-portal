import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma"; // Adjust path as necessary

export async function DELETE() {
  try {
    // First clear assignments
    await prisma.assignmentExitExam.deleteMany({});
    // Then clear students
    // await prisma.studentExitExam.deleteMany({});

    return NextResponse.json(
      { message: "All assignments and students cleared successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Failed to clear data" },
      { status: 500 }
    );
  }
}
