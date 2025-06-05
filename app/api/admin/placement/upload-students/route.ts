// app/api/admin/placement/upload-students/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx"; // ⬅️ Use named import!

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Expected: [{ studentId, name, department }]
  for (const item of data) {
    if (!item.studentId || !item.name) continue;

    await prisma.studentPlacement.upsert({
      where: { studentId: String(item.studentId) },
      update: { name: String(item.name), department: String(item.department || "") },
      create: {
        studentId: String(item.studentId),
        name: String(item.name),
        department: String(item.department || ""),
      },
    });
  }

  return NextResponse.json({ message: "Students uploaded successfully!" });
}
