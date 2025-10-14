import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import validator from "validator";
import fs from "fs";
import path from "path";
import slugify from "slugify";

// اعتبارسنجی ورودی‌ها
const userSchema = z.object({
  name: z.string().min(2, "نام کاربر باید حداقل 2 کاراکتر باشد").max(50),
  fatherName: z
    .string()
    .min(2, "نام پدر باید حداقل 2 کاراکتر باشد")
    .max(50)
    .optional(),
  phone: z
    .string()
    .min(11, "شماره موبایل باید 11 کاراکتر باشد")
    .max(11)
    .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است")
    .optional(),
  code: z.string().min(3, "شماره کلاینت باید حداقل 3 کاراکتر باشد").optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]),
  immigrationCase: z.string().optional(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export async function GET(req: Request) {
  try {
    // گرفتن query params (مثلاً برای pagination یا فیلتر)
    const url = new URL(req.url);
    const status = url.searchParams.get("status"); // اختیاری
    const page = Number(url.searchParams.get("page") || 1);
    const pageSize = Number(url.searchParams.get("pageSize") || 10);

    // ساخت شرط فیلتر
    const where: any = {};
    if (status) where.status = status.toUpperCase();

    // گرفتن داده‌ها از دیتابیس
    const users = await prisma.user.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    // تعداد کل برای pagination
    const total = await prisma.user.count({ where });

    return NextResponse.json({
      success: true,
      data: users,
      meta: { page, pageSize, total },
    });
  } catch (error: any) {
    console.error("❌ خطا در دریافت کاربران:", error);
    return NextResponse.json(
      { success: false, message: "مشکلی پیش آمد", error: error.message },
      { status: 500 }
    );
  }
}



export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const rawData = {
      name: formData.get("name") as string,
      fatherName: formData.get("fatherName") as string,
      phone: formData.get("phone") as string,
      code: formData.get("code") as string,
      immigrationCase: formData.get("immigrationCase") as string,
      status: formData.get("status") as string,
    };

    const parsed = userSchema.safeParse(rawData);
    if (!parsed.success) {
      const fieldErrors: { [key: string]: string } = {};
      for (const key in parsed.error.flatten().fieldErrors) {
        const messages = parsed.error.flatten().fieldErrors[key];
        if (messages && messages.length > 0) {
          fieldErrors[key] = messages[0];
        }
      }

      return NextResponse.json({ success: false, error: fieldErrors }, { status: 400 });
    }

    const safeData = {
      name: validator.escape(parsed.data.name),
      fatherName: parsed.data.fatherName ? validator.escape(parsed.data.fatherName) : null,
      phone: parsed.data.phone ? validator.escape(parsed.data.phone) : null,
      code: parsed.data.code ? validator.escape(parsed.data.code) : null,
      immigrationCase: parsed.data.immigrationCase ? validator.escape(parsed.data.immigrationCase) : null,
      status: parsed.data.status,
      slug: slugify(parsed.data.name, { lower: true, strict: true }), // ✨ اضافه شد
    };

    const files: { [key: string]: File | null } = {
      idCardImage: formData.get("idCardImage") as File | null,
      profileImage: formData.get("profileImage") as File | null,
    };

    const fileUrls: { [key: string]: string | null } = {
      idCardImage: null,
      profileImage: null,
    };

    for (const key in files) {
      const file = files[key];
      if (file) {
        if (file.size > 2 * 1024 * 1024)
          return NextResponse.json({ error: `حجم ${key} زیاد است` }, { status: 400 });
        if (!["image/jpeg", "image/png"].includes(file.type))
          return NextResponse.json({ error: `فرمت ${key} فقط JPG/PNG مجاز است` }, { status: 400 });

        const timestamp = Date.now();
        const ext = file.name.split(".").pop();
        const fileName = `${timestamp}-${file.name}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(path.join(uploadDir, fileName), buffer);

        fileUrls[key] = `/uploads/${fileName}`;
      }
    }

    const user = await prisma.user.create({
      data: {
        ...safeData,
        idCardImage: fileUrls.idCardImage,
        profileImage: fileUrls.profileImage,
      },
    });

    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

