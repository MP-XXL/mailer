import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

  try {
    const { name, message } = await req.json()

    const mailData = {
      from: 'test@example.com',
      to: 'badrobotmp@gmail.com',
      subject: `New feedback from ${name}`,
      text: `${message}`,
      html: `<p>${message}</p>`,
    };

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    });

    await transport.sendMail(mailData, (error: any, info: any) => {
      if (error) console.log(error);
      console.log(`Message sent: ${info.messageId}`);
    });

    return NextResponse.json({ ok: true, message: 'Email sent successfully' })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}
