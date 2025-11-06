import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

/**
 * Zod schema for creating a reservation
 */
const createReservationSchema = z.object({
  fullName: z
    .string()
    .min(3, "نام کامل الزامی است")
    .max(20, "نام کامل نمی‌تواند بیشتر از 20 کاراکتر باشد")
    .trim(),
  email: z
    .string()
    .email("ایمیل نامعتبر است")
    .max(60, "ایمیل نمی‌تواند بیشتر از 60 کاراکتر باشد")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  phone: z
    .string()
    .regex(/^\+?[0-9]+$/, "شماره تلفن فقط می‌تواند شامل عدد و + باشد")
    .min(8, "شماره تلفن حداقل ۸ رقم باید داشته باشد")
    .max(11, "شماره تلفن نمی‌تواند بیشتر از 11 رقم باشد"),
  visaType: z.enum(
    ["student", "work", "tourist", "investment", "family"],
    "نوع ویزا معتبر نیست"
  ),
});

// 📌 گرفتن همه رزروها
export async function GET(req: Request) {
  try {
    

    const reservations = await prisma.reservation.findMany({
      orderBy: { createAt: "desc" },
    });

    return NextResponse.json(reservations);
  } catch (err) {
    console.error("GET /reservations error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * POST: ایجاد رزرو توسط کاربر (بدون نیاز به توکن ادمین)
 * ورودی با zod اعتبارسنجی می‌شود
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // اعتبارسنجی با Zod
    const parsed = createReservationSchema.safeParse(body);
    if (!parsed.success) {
      // برگردوندن خطاهای Zod با وضعیت 400
      const errors = parsed.error.format();
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    // آماده‌سازی داده‌ها (فیلد ایمیل ممکنه undefined باشه)
    const { fullName, email, phone, visaType } = parsed.data;

    const existing = await prisma.reservation.findFirst({
      where: {
        OR: [{ phone }, { email: email ?? null }],
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "این رزرو قبلاً ثبت شده است" },
        { status: 400 }
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        fullName,
        email: email ?? null,
        phone,
        visaType,
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (err) {
    console.error("POST /reservations error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
