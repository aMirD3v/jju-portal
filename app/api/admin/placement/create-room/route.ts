import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, capacity } = await req.json();

  if (!name || !capacity) {
    return NextResponse.json({ error: "Room name and capacity are required." }, { status: 400 });
  }

  try {
    const room = await prisma.room.create({
      data: { name, capacity: Number(capacity) },
    });

    return NextResponse.json({ message: "Room created successfully!", room });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create room." }, { status: 500 });
  }
}
