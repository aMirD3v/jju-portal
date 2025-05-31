import { NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import path from "path";
import fs from "fs";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get the student's application
  const studentID = session.user.username;
  const app = await prisma.studentApplication.findUnique({
    where: { studentID },
  });

  if (!app) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 }
    );
  }

  // Load the ID card template and stamp
  const templatePath = path.join(
    process.cwd(),
    "public",
    "student_id_card_template.png"
  );
  const stampPath = path.join(process.cwd(), "public", "stamp.png");

  const template = await loadImage(templatePath);
  const stamp = await loadImage(stampPath);

  // Create a canvas
  const canvas = createCanvas(template.width, template.height);
  const ctx = canvas.getContext("2d");

  // Draw the template
  ctx.drawImage(template, 0, 0);

  // Draw student photo (if available)
  if (app.studentPhotoUrl) {
    const photo = await loadImage(app.studentPhotoUrl);
    ctx.drawImage(photo, 795, 200, 240, 300); // adjust position and size
  }

  // Draw student details
  ctx.font = "28px bold 'Times New Roman'";
  ctx.fillStyle = "#000";

  ctx.fillText(
    ` ${app.firstName} ${app.fatherName} ${app.gFatherName}`,
    180,
    280
  );
  ctx.fillText(` ${app.studentID}`, 180, 325,);
  ctx.fillText(` ${app.institute}`, 190, 375);
  ctx.fillText(` ${app.department}`, 200, 425);
  ctx.fillText(` ${app.admission}`, 200, 470);

  // Draw the stamp
  ctx.drawImage(stamp, canvas.width - 520, canvas.height - 360, 320, 300);

  // Return as PNG
  const buffer = canvas.toBuffer("image/png");

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
}
