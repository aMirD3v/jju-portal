// app/api/apply/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { password, postSecondaryEducation, ...studentData } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const application = await prisma.studentApplication.create({
      data: {
        ...studentData,
        postSecondary: {
          create: postSecondaryEducation,
        },
      },
    });

    await prisma.user.create({
      data: {
        username: studentData.studentID,
        password: hashedPassword,
        role: "student",
        email: studentData.studentEmail,
        name: `${studentData.firstName} ${studentData.fatherName}`,
        studentID: studentData.studentID,
        institute: studentData.institute,
        department: studentData.department,
        academicYear: studentData.academicYear,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}
