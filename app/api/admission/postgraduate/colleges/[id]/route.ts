import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const college = await prisma.collegePostGraduate.findUnique({
      where: { id },
      include: {
        programs: true, // Ensure programs are included in the response
      },
    });

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error("Error fetching college:", error);
    return NextResponse.json({ error: "Failed to fetch college data" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { name } = await req.json();
  const id = parseInt(params.id);

  if (!name || isNaN(id)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const college = await prisma.collegePostGraduate.update({
    where: { id },
    data: { name },
  });

  return NextResponse.json(college);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  // Remove programs + available entries
  await prisma.collegePostGraduate.delete({
    where: { id },
  });

  return NextResponse.json({ message: "College deleted successfully" });
}
