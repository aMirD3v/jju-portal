import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const studentID = session.user.username;

    // First, check undergraduate application
    const undergradApplication = await prisma.studentApplication.findUnique({
      where: { studentID },
      include: {
        postSecondary: true,
      },
    });

    // Then, check postgraduate application
    const postgradApplication = await prisma.studentApplicationPostGraduate.findUnique({
      where: { studentID },
      include: {
        postSecondary: true,
      },
    });

    // Determine which application exists
    let applicationType = null;
    let applicationData = null;

    if (undergradApplication) {
      applicationType = "undergraduate";
      applicationData = undergradApplication;
    } else if (postgradApplication) {
      applicationType = "postgraduate";
      applicationData = postgradApplication;
    }

    return NextResponse.json({
      applicationType,
      application: applicationData,
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
