// app/api/admin/staff/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";

const staffSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  email: z.string().email().optional(),
});

export async function GET() {
  try {
    const staffList = await prisma.admin.findMany({
      where: { role: "EMPLOYEE" },
      select: { id: true, username: true, email: true, createdAt: true },
    });
    return NextResponse.json(staffList);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در دریافت لیست کارمندان" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = staffSchema.parse(body);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newStaff = await prisma.admin.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: "EMPLOYEE",
      },
      select: { id: true, username: true, email: true, createdAt: true },
    });

    return NextResponse.json(newStaff, { status: 201 });
  } catch (err: any) {
    console.error(err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues.map(e => e.message) }, { status: 400 });
    }
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
