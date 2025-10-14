import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import validator from "validator";
import fs from "fs";
import path from "path";

// اسکیمای اعتبارسنجی کاربر برای PUT
const userSchema = z.object({
  name: z.string().min(2, "نام کاربر باید حداقل 2 کاراکتر باشد").max(50),
  fatherName: z.string().min(2, "نام پدر باید حداقل 2 کاراکتر باشد").max(50).optional(),
  phone: z.string().min(11, "شماره موبایل باید 11 رقم باشد").max(11).regex(/^09\d{9}$/, "شماره موبایل نامعتبر است").optional(),
  code: z.string().min(3, "کد کلاینت باید حداقل 3 کاراکتر باشد").optional(),
  immigrationCase: z.string().optional(),
});

// ⚡ GET /api/users/[id]
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id); // ⚡ همین کافی است
  if (isNaN(id)) {
    return NextResponse.json(
      { success: false, message: "ID نامعتبر است" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user)
      return NextResponse.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: user });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// ⚡ PUT /api/users/[id]
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return NextResponse.json({ success: false, message: "ID نامعتبر است" }, { status: 400 });

    const formData = await req.formData();

    const rawData = {
      name: formData.get("name") as string,
      fatherName: formData.get("fatherName") as string,
      phone: formData.get("phone") as string,
      code: formData.get("code") as string,
      immigrationCase: formData.get("immigrationCase") as string,
    };

    // اعتبارسنجی
    const parsed = userSchema.safeParse(rawData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const key in parsed.error.flatten().fieldErrors) {
        const messages = parsed.error.flatten().fieldErrors[key];
        if (messages && messages.length > 0) fieldErrors[key] = messages[0];
      }
      return NextResponse.json({ success: false, error: fieldErrors }, { status: 400 });
    }

    // فایل‌ها
    const files: { [key: string]: File | null } = {
      idCardImage: formData.get("idCardImage") as File | null,
      profileImage: formData.get("profileImage") as File | null,
    };
    const fileUrls: { [key: string]: string | null } = {};

    for (const key in files) {
      const file = files[key];
      if (file && file.size > 0) { // ⚡ فقط اگر فایل جدید ارسال شده
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

    // بروزرسانی کاربر
    const updateData: any = { ...parsed.data };
    if (fileUrls.idCardImage) updateData.idCardImage = fileUrls.idCardImage;
    if (fileUrls.profileImage) updateData.profileImage = fileUrls.profileImage;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: user });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}




// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const id = Number(params.id);
//     if (isNaN(id)) return NextResponse.json({ success: false, message: "ID نامعتبر است" }, { status: 400 });

//     const formData = await req.formData();

//     const rawData = {
//       name: formData.get("name") as string,
//       fatherName: formData.get("fatherName") as string,
//       phone: formData.get("phone") as string,
//       code: formData.get("code") as string,
//       immigrationCase: formData.get("immigrationCase") as string,
//     };

//     // اعتبارسنجی
//     const parsed = userSchema.safeParse(rawData);
//     if (!parsed.success) {
//       const fieldErrors: Record<string, string> = {};
//       for (const key in parsed.error.flatten().fieldErrors) {
//         const messages = parsed.error.flatten().fieldErrors[key];
//         if (messages && messages.length > 0) fieldErrors[key] = messages[0];
//       }
//       return NextResponse.json({ success: false, error: fieldErrors }, { status: 400 });
//     }

//     // فایل‌ها
//     const files: { [key: string]: File | null } = {
//       idCardImage: formData.get("idCardImage") as File | null,
//       profileImage: formData.get("profileImage") as File | null,
//     };
//     const fileUrls: { [key: string]: string | null } = { idCardImage: null, profileImage: null };

//     for (const key in files) {
//       const file = files[key];
//       if (file) {
//         if (file.size > 2 * 1024 * 1024)
//           return NextResponse.json({ error: `حجم ${key} زیاد است` }, { status: 400 });
//         if (!["image/jpeg", "image/png"].includes(file.type))
//           return NextResponse.json({ error: `فرمت ${key} فقط JPG/PNG مجاز است` }, { status: 400 });

//         const timestamp = Date.now();
//         const ext = file.name.split(".").pop();
//         const fileName = `${timestamp}-${file.name}`;
//         const uploadDir = path.join(process.cwd(), "public", "uploads");
//         if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//         const buffer = Buffer.from(await file.arrayBuffer());
//         fs.writeFileSync(path.join(uploadDir, fileName), buffer);

//         fileUrls[key] = `/uploads/${fileName}`;
//       }
//     }

//     // بروزرسانی کاربر
//     const user = await prisma.user.update({
//       where: { id },
//       data: {
//         ...parsed.data,
//         idCardImage: fileUrls.idCardImage || undefined,
//         profileImage: fileUrls.profileImage || undefined,
//       },
//     });

//     return NextResponse.json({ success: true, data: user });
//   } catch (err: any) {
//     return NextResponse.json({ success: false, message: err.message }, { status: 500 });
//   }
// }

// ⚡ DELETE /api/users/[id]
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return NextResponse.json({ success: false, message: "ID نامعتبر است" }, { status: 400 });

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "کاربر با موفقیت حذف شد" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
