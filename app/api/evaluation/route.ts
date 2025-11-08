import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// 🎯 اسکیمای Zod برای اعتبارسنجی
const evaluationSchema = z.object({
  fullName: z.string().min(3),
  age: z
    .string()
    .transform((v) => Number(v))
    .refine((v) => v > 17 && v < 65, "سن باید بین ۱۸ تا ۶۵ باشد"),
  education: z.enum(["highschool", "bachelor", "master", "phd"]),
  experience: z
    .string()
    .transform((v) => Number(v))
    .refine((v) => v >= 0 && v <= 40, "سابقه بین ۰ تا ۴۰ سال باشد"),
  englishLevel: z.enum(["beginner", "intermediate", "advanced"]),
  country: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = evaluationSchema.parse(body);

    // 🔍 چک کنیم آیا این ایمیل قبلاً فرم ارسال کرده؟
    const existing = await prisma.immigrationEvaluation.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json(
        {
          message: "شما قبلاً فرم ارزیابی را ارسال کرده‌اید.",
          error: true,
        },
        { status: 409 } // Conflict
      );
    }

    // ✅ ذخیره فرم جدید
    const newEvaluation = await prisma.immigrationEvaluation.create({
      data,
    });

    return NextResponse.json(
      { message: "فرم با موفقیت ذخیره شد", data: newEvaluation },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues.map((e) => e.message) },
        { status: 400 }
      );
    }

    console.error(err);
    return NextResponse.json(
      { message: "خطای سرور هنگام ثبت فرم" },
      { status: 500 }
    );
  }
}

// ------------------- GET -------------------
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (email) {
      const evaluation = await prisma.immigrationEvaluation.findUnique({
        where: { email },
      });
      if (!evaluation)
        return NextResponse.json({ message: "یافت نشد" }, { status: 404 });
      return NextResponse.json(evaluation);
    }

    const allEvaluations = await prisma.immigrationEvaluation.findMany();
    return NextResponse.json(allEvaluations);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}
