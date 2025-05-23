import { NextResponse } from "next/server";
import { getAllUsers, updateUser } from "@/lib/admin";

export async function GET() {
  const users = await getAllUsers();
  return NextResponse.json(users);
}

export async function PUT(req: Request) {
  const { id, name, role } = await req.json();
  await updateUser(id, { name, role });
  return NextResponse.json({ success: true });
}
