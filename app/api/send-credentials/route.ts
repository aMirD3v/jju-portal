// app/api/send-credentials/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, username, password, name } = body;

  if (!email || !username || !password || !name) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Admissions Office" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Admission Portal Credentials',
    text: `Hello ${name},\n\nYour account has been created.\n\nUsername: ${username}\nPassword: ${password}\n\nPlease change your password after logging in.\n\nThanks!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
