import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx"; // ⚠️ Use named import

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Expected: [{ name, capacity }]
    for (const item of data) {
      if (!item.name || !item.capacity) continue;

      await prisma.room.upsert({
        where: { name: String(item.name) },
        update: { capacity: Number(item.capacity) },
        create: { name: String(item.name), capacity: Number(item.capacity) },
      });
    }

    return NextResponse.json({ message: "Rooms uploaded successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to upload rooms" }, { status: 500 });
  }
}
