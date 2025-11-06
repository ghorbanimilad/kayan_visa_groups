import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

async function getCurrentUser(req: NextRequest) {
  const token = req.cookies.get("adminToken")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown;
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      const payload = decoded as { id: string; role?: string };
      return { id: payload.id, role: payload.role || "EMPLOYEE" };
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.admin.findUnique({
      where: { id: user.id },
      select: { id: true, username: true, email: true, role: true },
    });

    if (!dbUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(dbUser);
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
