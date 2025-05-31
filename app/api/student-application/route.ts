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
    const studentID = session.user.username; // Same as the username in NextAuth
    const application = await prisma.studentApplication.findUnique({
      where: { studentID },
    });

    if (!application) {
      return NextResponse.json({ application: null });
    }

    return NextResponse.json({ application });
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
