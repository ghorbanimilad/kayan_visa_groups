import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";


// اسکیمای اعتبارسنجی با Zod
const contentSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  section: z.string().nullable(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  order: z.number(),
  countryId: z.string(),
  visaTypeIds: z.array(z.string()),
});

export async function GET() {
  try {
    const contents = await prisma.content.findMany({
      include: {
        country: true,
        visaTypes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json({ error: "مشکل در گرفتن محتوا" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contentSchema.parse(body);

    const content = await prisma.content.create({
      data: {
        title: parsed.title,
        body: parsed.body,
        section: parsed.section as any, // ContentSection enum
        imageUrl: parsed.imageUrl || "",
        order: parsed.order,
        country: { connect: { id: parsed.countryId } },
        visaTypes: {
          connect: parsed.visaTypeIds.map((id) => ({ id })),
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
    return NextResponse.json({ success: false, message: "خطا در ذخیره محتوا" }, { status: 500 });
  }
}