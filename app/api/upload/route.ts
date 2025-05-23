import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import sanitize from "sanitize-filename";

// Max 5MB files
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  const formData = await req.formData();

  const studentID = sanitize(formData.get("studentID") as string);
  if (!studentID) {
    return NextResponse.json({ error: "Missing studentID" }, { status: 400 });
  }

  const files: File[] = [];
  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.size > 0) {
      files.push(value);
    }
  }

  if (files.length === 0) {
    return NextResponse.json({ error: "No valid files" }, { status: 400 });
  }

  const uploadedPaths: Record<string, string> = {};

  const dir = path.join(process.cwd(), "public/uploads", studentID);
  await mkdir(dir, { recursive: true });

  for (const file of files) {
    const ext = path.extname(file.name);
    const baseName = sanitize(path.basename(file.name, ext));
    const safeName = `${baseName}-${uuidv4()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const targetPath = path.join(dir, safeName);

    await writeFile(targetPath, buffer);
    uploadedPaths[file.name] = `/uploads/${studentID}/${safeName}`;
  }

  return NextResponse.json({ success: true, paths: uploadedPaths });
}
