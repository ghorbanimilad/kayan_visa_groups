import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contentSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  section: z.string().nullable(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  order: z.number(),
  countryId: z.string(),
  visaTypeIds: z.array(z.string()),
});

export async function GET(req: Request, context: { params: { id: string } }) {
  // ⚠️ باید await کنیم
  const { params } = await context;
  const { id } = params;

  if (!id) {
    return NextResponse.json({ success: false, message: "شناسه محتوا ارسال نشده" }, { status: 400 });
  }

  try {
    const content = await prisma.content.findUnique({
      where: { id },
      include: { country: true, visaTypes: true },
    });

    if (!content) {
      return NextResponse.json({ success: false, message: "محتوا یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: content.id,
        title: content.title,
        body: content.body,
        section: content.section,
        imageUrl: content.imageUrl,
        order: content.order,
        countryId: content.country.id,
        visaTypeIds: content.visaTypes.map((v) => v.id),
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "خطا در دریافت محتوا" }, { status: 500 });
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    const parsed = contentSchema.parse(body);

    const content = await prisma.content.update({
      where: { id },
      data: {
        title: parsed.title,
        body: parsed.body,
        section: parsed.section as any,
        imageUrl: parsed.imageUrl || "",
        order: parsed.order,
        country: { connect: { id: parsed.countryId } },
        visaTypes: {
          set: parsed.visaTypeIds.map((id) => ({ id })),
        },
      },
    });

    return NextResponse.json({ success: true, data: content });
  } catch (err: any) {
    console.error(err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: err.errors.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: false, message: "خطا در آپدیت محتوا" }, { status: 500 });
  }
}
