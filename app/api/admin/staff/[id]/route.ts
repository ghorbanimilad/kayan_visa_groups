// app/api/admin/staff/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";

const staffSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6).optional(),
  email: z.string().email().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const staff = await prisma.admin.findUnique({
      where: { id },
      select: { id: true, username: true, email: true, createdAt: true },
    });

    if (!staff) {
      return NextResponse.json({ message: "کارمند پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(staff);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "خطا در دریافت اطلاعات کارمند" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.admin.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'کارمند حذف شد' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'خطا در حذف کارمند' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const data = staffSchema.parse(body);

    const updateData: any = { username: data.username, email: data.email };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updatedStaff = await prisma.admin.update({
      where: { id },
      data: updateData,
      select: { id: true, username: true, email: true, createdAt: true },
    });

    return NextResponse.json(updatedStaff);
  } catch (err: any) {
    console.error(err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors.map((e) => e.message) }, { status: 400 });
    }
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
