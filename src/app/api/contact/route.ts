import { NextResponse } from "next/server";

import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

interface SendMailRequest {
    email: string;
    object: string;
    content: string;
    token: string;
}

export async function POST(request: Request) {

    const { email, object, content, token } = await request.json() as SendMailRequest;

    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify`
    const params = new URLSearchParams()
    params.append('secret', secretKey || '')
    params.append('response', token)

    const response = await fetch(verificationURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
    })

    const data = await response.json()

    if (!data.success) {
        return NextResponse.json({ success: false, message: 'reCaptchaInvalid' })
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

    // Configurer l'email
    const mailOptions: Mail.Options = {
        from: `"Formulaire de contact" <${process.env.RECEIVER_EMAIL}>`,
        replyTo: email, 
        to: process.env.RECEIVER_EMAIL,
        subject: object,
        text: content,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch(e: unknown) {
        console.log(e);
        return NextResponse.json({ success: false, message: "serverError" });
    }

    return NextResponse.json({
        success: true,
    });
}