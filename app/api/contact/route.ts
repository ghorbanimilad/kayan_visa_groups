import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  phone: z.string().min(8, "شماره تماس معتبر نیست"), // ✅ اضافه شد
  email: z.string().email("ایمیل معتبر نیست"),
  message: z.string().min(5, "پیام باید حداقل ۵ کاراکتر باشد"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, phone, email, message } = parsed.data;
    // چک تکراری بودن ایمیل یا تلفن
    const where: any = { OR: [] };
    if (email) where.OR.push({ email });
    if (phone) where.OR.push({ phone });

    let duplicate = null;
    if (where.OR.length > 0) {
      duplicate = await prisma.contactMessage.findFirst({ where });
    }

    if (duplicate) {
      return NextResponse.json(
        { error: "این پیام قبلاً ثبت شده است" },
        { status: 400 }
      );
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        phone,
        email,
        message,
      },
    });
    return NextResponse.json({ success: true, data: newMessage });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return NextResponse.json(
      { error: "خطایی در پردازش درخواست رخ داد" },
      { status: 500 }
    );
  }
}
