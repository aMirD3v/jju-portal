// app/api/admin/placement/upload-rooms/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const roomsData = XLSX.utils.sheet_to_json(sheet);

    for (const room of roomsData) {
      const { name, capacity } = room as { name: string; capacity: number };

      await prisma.roomExitExam.upsert({
        where: { name },
        update: { capacity },
        create: { name, capacity },
      });
    }

    return NextResponse.json({ message: 'Rooms uploaded successfully.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to upload rooms.' }, { status: 500 });
  }
}
