// app/api/admin/placement/upload-students/route.ts

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
    const studentsData = XLSX.utils.sheet_to_json(sheet);

    for (const student of studentsData) {
      const {
        studentId,
        nationalId,
        name,
        username,
        password,
        departmentName,
        examTopic,
        gender,
        enrollmentType,
        phoneNumber,
        latestGpa,
        year
      } = student as {
        studentId: string;
        nationalId: string;
        name: string;
        username: string;
        password: string;
        departmentName: string;
        examTopic: string;
        gender: string;
        enrollmentType: string;
        phoneNumber: string;
        latestGpa: number;
        year: number;
      };

      const department = await prisma.departmentExitExam.upsert({
        where: { name: departmentName },
        update: {},
        create: { name: departmentName },
      });

      await prisma.studentExitExam.upsert({
        where: { studentId },
        update: {},
        create: {
          studentId,
          nationalId,
          name,
          username,
          password,
          departmentId: department.id,
          examTopic,
          gender,
          enrollmentType,
          phoneNumber,
          latestGpa,
          year,
        },
      });
    }

    return NextResponse.json({ message: 'Students uploaded successfully.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to upload students.' }, { status: 500 });
  }
}
