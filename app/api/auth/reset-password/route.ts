// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

// هش کردن توکن با Web Crypto API
async function hashToken(token: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// اعتبارسنجی رمز عبور
function validatePassword(password: string) {
  // حداقل 8 کاراکتر، حروف بزرگ و کوچک، عدد و کاراکتر ویژه
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    // اعتبارسنجی رمز جدید
    if (!validatePassword(password)) {
      return NextResponse.json(
        { message: "رمز عبور باید حداقل 8 کاراکتر و شامل حروف بزرگ، کوچک، عدد و کاراکتر ویژه باشد." },
        { status: 400 }
      );
    }

        const hashedToken = await hashToken(token);

    // بررسی وجود توکن و اینکه منقضی نشده باشد
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: hashedToken },
      include: { admin: true },
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return NextResponse.json(
        { message: "توکن نامعتبر یا منقضی شده است." },
        { status: 400 }
      );
    }

    // هش کردن رمز جدید
    const hashedPassword = await bcrypt.hash(password, 10);

    // ذخیره رمز جدید در دیتابیس
    await prisma.admin.update({
      where: { id: resetToken.adminId },
      data: { password: hashedPassword },
    });

    // حذف توکن بعد از استفاده
    await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });

    return NextResponse.json({ message: "رمز عبور با موفقیت تغییر کرد." });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}
