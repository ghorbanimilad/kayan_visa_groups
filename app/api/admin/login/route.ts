import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { username, password, remember } = await req.json();

    // پیدا کردن کاربر
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin)
      return NextResponse.json(
        { error: "نام کاربری یا رمز عبور اشتباه است" },
        { status: 401 }
      );

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid)
      return NextResponse.json(
        { error: "نام کاربری یا رمز عبور اشتباه است" },
        { status: 401 }
      );

    // ساخت JWT با نقش
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET!,
      { expiresIn: remember ? "30d" : "1h" }
    );

    // ست کردن کوکی امن
    const response = NextResponse.json({ message: "موفق" });
    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false, // 🔹 localhost = false
      sameSite: "strict",
      path: "/",
      maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60,
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
