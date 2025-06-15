// lib/barcodeGenerator.ts
import bwipjs from 'bwip-js';
import fs from 'fs';
import path from 'path';

export async function generateStudentBarcode(studentId: string) {
  try {
    const png = await bwipjs.toBuffer({
      bcid: 'code128',       // Barcode type
      text: studentId,       // Text to encode
      scale: 3,              // 3x scaling factor
      height: 10,            // Bar height, in millimeters
      includetext: true,     // Show human-readable text
      textxalign: 'center',  // Always good to center the text
    });

    // Ensure directory exists
    const dir = path.join(process.cwd(), 'public', 'barcodes');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Save file
    const filePath = path.join(dir, `${studentId}.png`);
    fs.writeFileSync(filePath, png);

    return `/barcodes/${studentId}.png`;
  } catch (error) {
    console.error('Barcode generation failed:', error);
    throw error;
  }
}