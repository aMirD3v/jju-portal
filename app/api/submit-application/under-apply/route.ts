import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Helper: Generate Ethiopian year suffix
const getEthiopianYearSuffix = (): string => {
  const date = new Date();
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const ethYear =
    gMonth < 9 || (gMonth === 9 && date.getDate() < 11)
      ? gYear - 8
      : gYear - 7;
  return String(ethYear).slice(-2);
};

const getEthiopianYear = (): number => {
  const date = new Date();
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  return gMonth < 9 || (gMonth === 9 && date.getDate() < 11)
    ? gYear - 8
    : gYear - 7;
};


// Helper: Generate the new Student ID
const generateStudentID = async (): Promise<string> => {
  const yearSuffix = getEthiopianYearSuffix();
  const idPrefix = `JJU${yearSuffix}AD-UG`;

  const existingStudents = await prisma.studentApplication.findMany({
    where: {
      studentID: {
        startsWith: idPrefix,
      },
    },
    select: {
      studentID: true,
    },
  });

  const existingNumbers = existingStudents
    .map((s) => {
      const match = s.studentID.match(new RegExp(`^${idPrefix}(\\d{4})$`));
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((n): n is number => n !== null);

  const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
  const paddedNumber = String(nextNumber).padStart(4, "0");

  return `${idPrefix}${paddedNumber}`;
};

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      password,
      postSecondaryEducation,
      uploadedFiles,
      dob,
      email,
      studentPhoto,        // ❌ not saved
      educationDocs,       // ❌ not saved
      ...student
    } = data;

    // Generate new Student ID
    const studentID = await generateStudentID();

    const academicYear = getEthiopianYear();

    // Format DOB
    const dobFormatted = dob ? new Date(dob).toISOString() : null;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the student application
    const application = await prisma.studentApplication.create({
      data: {
        ...student,
        studentID,                      // 💡 Use generated ID
        academicYear: String(academicYear),  // 💡 Save as string or number
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
        username: studentID,                   // 💡 Use generated ID
        password: hashedPassword,
        role: "student",
        email: student.studentEmail,
        name: `${student.firstName} ${student.fatherName}`,
      },
    });

         // 📧 Send email with credentials
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
    
        const mailOptions = {
          from: `"Admissions Office" <${process.env.EMAIL_USER}>`,
          to: student.studentEmail,
          subject: "Your Admission Portal Credentials",
          text: `Hello ${student.firstName},
    
    Your student account has been created.
    
    Username: ${studentID}
    Password: ${password}
    
    Please use the username and password to login to the portal
    
    Thanks!`,
        };
    
        await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, studentID });
  } catch (error) {
    console.error("Error in application submission:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
