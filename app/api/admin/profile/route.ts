import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

// GET: گرفتن اطلاعات ادمین
export async function GET(req: Request) {
  try {
    // فرض می‌کنیم تنها یک ادمین داریم یا کاربر وارد شده با session
    const admin = await prisma.admin.findFirst({
      select: { id: true, username: true, email: true },
    });

    if (!admin) {
      return NextResponse.json({ message: "ادمین یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(admin);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "خطا در دریافت پروفایل" }, { status: 500 });
  }
}

// PUT: بروزرسانی پروفایل
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username) {
      return NextResponse.json({ message: "نام کاربری الزامی است" }, { status: 400 });
    }

    const admin = await prisma.admin.findFirst();
    if (!admin) {
      return NextResponse.json({ message: "ادمین یافت نشد" }, { status: 404 });
    }

    let hashedPassword;
    if (password && password.length > 0) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: admin.id },
      data: {
        username,
        email: email || null,
        ...(hashedPassword ? { password: hashedPassword } : {}),
      },
      select: { id: true, username: true, email: true },
    });

    return NextResponse.json(updatedAdmin);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "خطا در بروزرسانی پروفایل" }, { status: 500 });
  }
}
