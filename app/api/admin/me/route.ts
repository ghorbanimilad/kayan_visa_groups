import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET() {
      const cookiesStore = await cookies();
  const token = cookiesStore.get("adminToken")?.value; // ← توجه کنید
  if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { username: true, email: true, role: true },
    });

    if (!admin)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(admin);
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
