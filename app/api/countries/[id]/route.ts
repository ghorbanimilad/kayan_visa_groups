import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CountryUpdateSchema } from "../schema";
import { z } from "zod";

// 📌 گرفتن کشور با id
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const country = await prisma.country.findUnique({
      where: { id: params.id },
      include: { visaType: true, contents: true },
    });

    if (!country)
      return NextResponse.json({ error: "پیدا نشد" }, { status: 404 });
    return NextResponse.json(country);
  } catch (error) {
    return NextResponse.json({ error: "مشکلی پیش آمد" }, { status: 500 });
  }
}

// 📌 آپدیت کشور
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const data = CountryUpdateSchema.parse(body);

    const country = await prisma.country.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(country);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "مشکلی پیش آمد" }, { status: 500 });
  }
}

// 📌 حذف کشور
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.country.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "با موفقیت حذف شد" });
  } catch (error) {
    return NextResponse.json({ error: "مشکلی پیش آمد" }, { status: 500 });
  }
}
