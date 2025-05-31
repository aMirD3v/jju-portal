import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { status, rejectionReason } = await req.json();

  if (!status) {
    return NextResponse.json({ error: "Status is required" }, { status: 400 });
  }

  try {
    const updateData: any = { status };

    if (status === "rejected" && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    } else if (status !== "rejected") {
      // Clear rejectionReason if not rejected
      updateData.rejectionReason = null;
    }

    const updated = await prisma.studentApplication.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
