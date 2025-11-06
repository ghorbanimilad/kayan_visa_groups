export const runtime = "nodejs";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// دریافت کاربر از JWT موجود در cookie
async function getCurrentUser(req: NextRequest) {
  const token = req.cookies.get("adminToken")?.value;
  

  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return { id: decoded.id, role: decoded.role || "EMPLOYEE" };
  } catch (err) {
    console.log("JWT verify error:", err);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const user = await getCurrentUser(req);
  const pathname = url.pathname;

  
  // مسیرهای ادمین فقط برای ادمین
  const adminPaths = [
    "/dashboard/setting", // مسیر واقعی پروژه را اینجا بنویس
    "/dashboard/reports",
    "/dashboard/staff",
  ];

  // مسیرهای کارمند (ادمین هم می‌تواند ببیند)
  const staffPaths = [
    "/dashboard/reports",
  ];

  // چک مسیرهای ادمین
  if (adminPaths.some(path => pathname.startsWith(path))) {
    const role = user?.role?.toLowerCase();
    if (!user || role !== "admin") {
      url.pathname = "/dashboard"; // redirect
      return NextResponse.redirect(url);
    }
  }

  // چک مسیرهای کارمند
  if (staffPaths.some(path => pathname.startsWith(path))) {
    if (!user) {
      url.pathname = "/login"; // اگر لاگین نیست
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// matcher برای مسیرهایی که middleware باید اعمال شود
export const config = {
  matcher: [
    "/dashboard/setting/:path*",  // مسیر واقعی
    "/dashboard/reports/:path*",
    "/dashboard/staff/:path*",
    "/dashboard/messages/:path*",
  ],
};
