import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import jwt from "jsonwebtoken";

// ----------------------
// Schema برای ایجاد گزارش
// ----------------------
const workReportSchema = z.object({
  title: z.string().min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),
  content: z.string().min(5, "توضیحات باید حداقل ۵ کاراکتر باشد"),
});

// ----------------------
// دریافت اطلاعات کاربر از کوکی
// ----------------------
async function getUserFromCookie(req: NextRequest) {
  const token = req.cookies.get("adminToken")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string; // حتما string چون مدل شما UUID است
      role: "EMPLOYEE" | "ADMIN";
    };
  } catch {
    return null;
  }
}

// ----------------------
// POST - کارمند گزارش بسازد
// ----------------------
export async function POST(req: NextRequest) {
  const user = await getUserFromCookie(req);
  if (!user) return NextResponse.json({ message: "احراز هویت نامعتبر" }, { status: 401 });

  if (user.role !== "EMPLOYEE") {
    return NextResponse.json({ message: "فقط کارمند می‌تواند گزارش بسازد" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "داده‌های نامعتبر" }, { status: 400 });
  }

  const parsed = workReportSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { message: parsed.error.issues.map(e => e.message).join(", ") },
      { status: 400 }
    );

  const { title, content } = parsed.data;
  const adminUser = await prisma.admin.findFirst({
  where: { role: "ADMIN" }, // فرض می‌کنیم فقط یک ادمین داریم یا اولین ادمین
});

if (!adminUser) {
  throw new Error("No admin found");
}
  

  try {
    const report = await prisma.workReport.create({
      data: {
        title,
        content,
        adminId: adminUser.id,        // کارمند خودش
        employeeId: user.id,     // مشخص می‌کنیم کارمند خودش ثبت کرده
        status: "PENDING",       // وضعیت پیش‌فرض
      },
    });
    return NextResponse.json(report, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "خطا در ایجاد گزارش" }, { status: 500 });
  }
}

// ----------------------
// GET - admin همه گزارش‌ها را ببیند
// ----------------------

// export async function GET(req: NextRequest) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader) {
//       return NextResponse.json({ error: "No authorization header" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];

//     if (!token || token === "undefined" || token === "null") {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     let decoded: any;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     } catch (err) {
//       console.error("JWT error:", err);
//       return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
//     }

//     // اگر نقش کاربر ادمین است همه گزارش‌ها را ببیند
//     if (decoded.role === "ADMIN") {
//       const reports = await prisma.workReport.findMany({
//         include: { admin: true },
//         orderBy: { createdAt: "desc" },
//       });
//       return NextResponse.json(reports);
//     }

//     // اگر کارمند است فقط گزارش‌های خودش را ببیند
//     const reports = await prisma.workReport.findMany({
//       where: { employeeId: decoded.id },
//       include: { admin: true },
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json(reports);
//   } catch (err) {
//     console.error("Unexpected error in /api/workReports:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }


export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("adminToken")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // مشخص کردن تایپ دقیق برای payload توکن
    let decoded: { id: string; role: "EMPLOYEE" | "ADMIN" };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: "EMPLOYEE" | "ADMIN" };
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    const reports = await prisma.workReport.findMany({
      include: {
        admin: { select: { username: true, email: true, role: true } },
      },
      where: decoded.role === "ADMIN" ? {} : { employeeId: decoded.id },
      orderBy: { createdAt: "desc" },
    });

    // 🔹 در اینجا اطلاعات کارمند را از جدول User می‌گیریم
    const employeeIds = Array.from(
      new Set(reports.map(r => r.employeeId).filter((id): id is string => id !== null))
    );
    const employees = await prisma.admin.findMany({
      where: { id: { in: employeeIds } },
      select: { id: true, username: true, email: true },
    });

    // 🔹 الحاق اطلاعات کارمند به گزارش‌ها
    const reportsWithEmployee = reports.map(r => ({
      ...r,
      employee: employees.find(e => e.id === r.employeeId) || null,
    }));

    return NextResponse.json(reportsWithEmployee);
  } catch (err) {
    console.error("Error fetching reports:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


