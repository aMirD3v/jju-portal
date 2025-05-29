import { NextResponse } from "next/server";
import { minioClient } from "@/lib/minio";
import { randomUUID } from "crypto";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();

  const uploaded: Record<string, string> = {};
  const MINIO_BASE = "http://localhost:9000/student-docs/";

  const upload = async (file: File, folder: string) => {
    const arrayBuffer = await file.arrayBuffer();
    const ext = path.extname(file.name || ".bin");
    const filename = `${folder}/${randomUUID()}${ext}`;
    await minioClient.putObject(
      "student-docs",
      filename,
      Buffer.from(arrayBuffer),
      undefined,
      {
        "Content-Type": file.type,
      }
    );
    uploaded[folder] = MINIO_BASE + filename;
  };

  const fileFields = [
    "studentPhoto",
    "diploma",
    "grade12result",
    "grade10result",
    "grade8result",
    "highSchoolTranscript",
  ];

  for (const field of fileFields) {
    const file = formData.get(field);
    if (file && typeof file !== "string") {
      await upload(file, field);
    }
  }

  return NextResponse.json({ uploaded });
}
