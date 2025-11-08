import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CountryUpdateSchema } from "../schema";
import { z } from "zod";

// 📌 گرفتن کشور با id
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const country = await prisma.country.findUnique({
      where: { id },
      include: { visaTypes: true, contents: true },
    });

    if (!country) {
      return NextResponse.json({ error: "پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(country);
  } catch (error) {
    return NextResponse.json({ error: "مشکلی پیش آمد" }, { status: 500 });
  }
}

// 📌 آپدیت کشور
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();
    const data = CountryUpdateSchema.parse(body);

    const {id} = await params
    const country = await prisma.country.update({
      where: { id },
      data,
    });

    return NextResponse.json(country);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "مشکلی پیش آمد" }, { status: 500 });
  }
}

// 📌 حذف کشور
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.country.delete({ where: { id } });
    return NextResponse.json({ message: "با موفقیت حذف شد" });
  } catch (error) {
    return NextResponse.json({ error: "مشکلی پیش آمد" }, { status: 500 });
  }
}
