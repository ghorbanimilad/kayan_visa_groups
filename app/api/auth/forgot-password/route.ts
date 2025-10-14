import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

// تولید توکن امن
function generateToken() {
  return crypto.getRandomValues(new Uint8Array(32))
    .reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
}

// هش کردن توکن با Web Crypto API
async function hashToken(token: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json(
        { message: "کاربری با این ایمیل یافت نشد." },
        { status: 404 }
      );
    }

    // تولید و هش توکن
    const token = generateToken();
    const hashedToken = await hashToken(token);

    await prisma.passwordResetToken.create({
      data: {
        token: hashedToken,
        adminId: admin.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 15),
      },
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // SSL
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!, // App Password واقعی
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/admin/reset-password?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER!,
      to: email,
      subject: "بازیابی رمز عبور ادمین",
      html: `<h2>بازنشانی رمز عبور</h2><p>برای تغییر رمز عبور روی لینک زیر کلیک کنید:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    return NextResponse.json({ message: "لینک بازنشانی ارسال شد." });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: err.message || "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}
