import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Extract password and postSecondaryEducation to handle them separately
    const { password, academicYear, postSecondaryEducation, dob,  ...studentData  } = data;

    // Format dob to YYYY-MM-DD if it's a valid date
    const formattedDob = dob ? new Date(dob).toISOString() : null;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const application = await prisma.studentApplication.create({
      data: {
        ...studentData,
        dob: formattedDob, // Use the formatted date here
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
        academicYear: academicYear,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}
