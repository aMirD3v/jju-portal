import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const studentsData = XLSX.utils.sheet_to_json(sheet, { defval: '' }); // important: fills empty cells with ''

    const failedRows: number[] = [];
    const departmentCache: Record<string, string> = {};

    const studentPromises = studentsData.map(async (student, index) => {
      try {
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
          year,
        } = student as Record<string, any>;

        // Clean & convert
        const cleanStudent = {
          studentId: (studentId || '').toString().trim(),
          nationalId: nationalId ? nationalId.toString().trim() : null,
          name: name ? name.toString().trim() : null,
          username: username ? username.toString().trim() : null,
          password: password ? password.toString().trim() : null,
          departmentName: (departmentName || '').toString().trim(),
          examTopic: examTopic ? examTopic.toString().trim() : null,
          gender: gender ? gender.toString().trim() : null,
          enrollmentType: enrollmentType ? enrollmentType.toString().trim() : null,
          phoneNumber: phoneNumber ? phoneNumber.toString().trim() : null,
          latestGpa: latestGpa !== '' && !isNaN(parseFloat(latestGpa)) ? parseFloat(latestGpa) : null,
          year: year !== '' && !isNaN(parseInt(year)) ? parseInt(year) : null,
        };

        // Validate required fields (you can adjust based on business logic)
        if (!cleanStudent.studentId || !cleanStudent.departmentName) {
          throw new Error(`Missing required studentId or departmentName`);
        }

        // Reuse department if already cached
        let departmentId = departmentCache[cleanStudent.departmentName];
        if (!departmentId) {
          const department = await prisma.departmentExitExam.upsert({
            where: { name: cleanStudent.departmentName },
            update: {},
            create: { name: cleanStudent.departmentName },
          });
          departmentId = department.id;
          departmentCache[cleanStudent.departmentName] = departmentId;
        }

        await prisma.studentExitExam.upsert({
          where: { studentId: cleanStudent.studentId },
          update: {},
          create: {
            studentId: cleanStudent.studentId,
            nationalId: cleanStudent.nationalId,
            name: cleanStudent.name,
            username: cleanStudent.username,
            password: cleanStudent.password,
            departmentId,
            examTopic: cleanStudent.examTopic,
            gender: cleanStudent.gender,
            enrollmentType: cleanStudent.enrollmentType,
            phoneNumber: cleanStudent.phoneNumber,
            latestGpa: cleanStudent.latestGpa,
            year: cleanStudent.year,
          },
        });
      } catch (err) {
        console.error(`❌ Failed at row ${index + 2}:`, err);
        failedRows.push(index + 2);
      }
    });

    await Promise.all(studentPromises);

    const message = failedRows.length
      ? `Upload finished with some errors (rows: ${failedRows.join(', ')})`
      : 'Students uploaded successfully.';

    return NextResponse.json({ message });
  } catch (err) {
    console.error('❌ Upload error:', err);
    return NextResponse.json({ error: 'Failed to upload students.' }, { status: 500 });
  }
}
