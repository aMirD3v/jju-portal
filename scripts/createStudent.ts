// scripts/createStudent.ts
import { PrismaClient } from '@prisma/client';
import { generateStudentBarcode } from '../lib/barcodeGenerator';

const prisma = new PrismaClient();

async function createStudent(name: string, email: string, studentId: string) {
  try {
    // Create student in database
    const student = await prisma.studentUser.create({
      data: {
        name,
        email,
        studentId,
      },
    });

    // Generate barcode
    const barcodePath = await generateStudentBarcode(studentId);
    console.log(`Student created successfully! Barcode saved at: ${barcodePath}`);

    return student;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Example usage (you would call this from a command line or another script)
// createStudent('John Doe', 'john@university.edu', 'STD123456');