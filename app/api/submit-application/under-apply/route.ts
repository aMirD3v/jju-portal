import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      password,
      postSecondaryEducation,
      uploadedFiles,
      dob,
      email,
      studentPhoto,        // ❌ exclude from DB save
      educationDocs,       // ❌ exclude from DB save
      ...student
    } = data;

    // Format DOB
    const dobFormatted = dob ? new Date(dob).toISOString() : null;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the student application
    const application = await prisma.studentApplication.create({
      data: {
        ...student,
        dob: dobFormatted,
        studentPhotoUrl: uploadedFiles?.studentPhoto || null,
        diplomaUrl: uploadedFiles?.diploma || null,
        grade12Url: uploadedFiles?.grade12result || null,
        grade10Url: uploadedFiles?.grade10result || null,
        grade8Url: uploadedFiles?.grade8result || null,
        highSchoolUrl: uploadedFiles?.highSchoolTranscript || null,
        postSecondary: {
          create: postSecondaryEducation,
        },
      },
    });

    // Create the user account
    await prisma.user.create({
      data: {
        username: student.studentID,
        password: hashedPassword,
        role: "student",
        email: student.studentEmail,
        name: `${student.firstName} ${student.fatherName}`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in application submission:", error);
    return NextResponse.json({ success: false, error: String(error) });
  }
}
