import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

import fs from "fs";
import path from "path";
import slugify from "slugify";

function escapeHTML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

//  تعریف دقیق Schema بدون تاریخ‌های غیرقابل‌تجزیه از FormData
const userSchema = z.object({
  name: z.string().min(2, "نام کاربر باید حداقل 2 کاراکتر باشد").max(50),
  fatherName: z
    .string()
    .min(2, "نام پدر باید حداقل 2 کاراکتر باشد")
    .max(50)
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(11, "شماره موبایل باید 11 رقم باشد")
    .max(11, "شماره موبایل باید حداکثر 11 رقم باشد")
    .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
  code: z
    .string()
    .min(10, "شماره ملی باید حداقل 10 کاراکتر باشد")
    .max(10, "شماره ملی باید حداکثر 10 کاراکتر باشد")
    .optional()
    .or(z.literal("")),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]),
  immigrationCase: z.string().optional().or(z.literal("")),
});


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const page = Number(url.searchParams.get("page") || 1);
    const pageSize = Number(url.searchParams.get("pageSize") || 10);

    const where: any = {};
    if (status) where.status = status.toUpperCase();

    const users = await prisma.user.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

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

    // ✅ اعتبارسنجی ورودی‌ها
    const parsed = userSchema.safeParse(rawData);
        if (!parsed.success) {
          const fieldErrors: Record<string, string> = {};
          const fieldErrorsObj = parsed.error.flatten().fieldErrors;
          for (const key of Object.keys(
            fieldErrorsObj
          ) as (keyof typeof fieldErrorsObj)[]) {
            const messages = fieldErrorsObj[key];
            if (messages && messages.length > 0)
              fieldErrors[key as string] = messages[0];
          }
          return NextResponse.json(
            { success: false, error: fieldErrors },
            { status: 400 }
          );
        }

    // ✅ پاک‌سازی داده‌ها
     const safeData = {
      name: escapeHTML(parsed.data.name),
      fatherName: parsed.data.fatherName
        ? escapeHTML(parsed.data.fatherName)
        : null,
      phone: escapeHTML(parsed.data.phone),
      code: parsed.data.code ? escapeHTML(parsed.data.code) : null,
      immigrationCase: parsed.data.immigrationCase
        ? escapeHTML(parsed.data.immigrationCase)
        : null,
      status: parsed.data.status,
      slug: slugify(parsed.data.name, { lower: true, strict: true }),
    };

    // ✅ پردازش فایل‌ها
    const files: { [key: string]: File | null } = {
      idCardImage: formData.get("idCardImage") as File | null,
      profileImage: formData.get("profileImage") as File | null,
    };

    const fileUrls: { [key: string]: string | null } = {
      idCardImage: null,
      profileImage: null,
    };

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    for (const key in files) {
  const file = files[key];
  if (!file) continue;

  // تبدیل کلید انگلیسی به نام فارسی
  const label =
    key === "idCardImage"
      ? "تصویر کارت شناسایی"
      : key === "profileImage"
      ? "تصویر پروفایل"
      : "فایل";

  if (file.size > 2 * 1024 * 1024)
    return NextResponse.json(
      { error: `${label} بیش از ۲ مگابایت است` },
      { status: 400 }
    );

  if (!["image/jpeg", "image/png"].includes(file.type))
    return NextResponse.json(
      { error: `فرمت ${label} فقط JPG یا PNG مجاز است` },
      { status: 400 }
    );

  const fileName = `${Date.now()}-${file.name}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(uploadDir, fileName), buffer);

  fileUrls[key] = `/uploads/${fileName}`;
}

const newSafeData: any = { ...parsed.data, fatherName: parsed.data.fatherName ?? "" };
    // ✅ ثبت در پایگاه داده
    const user = await prisma.user.create({
      data: {
        ...newSafeData,
        
        idCardImage: fileUrls.idCardImage,
        profileImage: fileUrls.profileImage,
      },
    });

    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    if (error.message.includes("File too large")) {
      return NextResponse.json(
        { error: "حجم فایل بیشتر از حد مجاز است" },
        { status: 400 }
      );
    }
    console.error("❌ Error creating user:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
