import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(5).optional(),
});

export async function getUserFromToken(req: NextRequest) {
  // 1️⃣ ابتدا از Authorization header بخونه
  const authHeader = req.headers.get("authorization");
  let token = authHeader?.split(" ")[1];

  // 2️⃣ اگر نبود، از cookie بخونه
  if (!token) {
    token = req.cookies.get("adminToken")?.value || req.cookies.get("token")?.value;
  }

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: "ADMIN" | "EMPLOYEE";
    };
  } catch {
    return null;
  }
}

// ✅ GET: دریافت یک گزارش
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.cookies.get("adminToken")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: "EMPLOYEE" | "ADMIN";
    };

    const report = await prisma.workReport.findUnique({
      where: { id: params.id },
      include: {
        admin: true,
        employee: true,
      },
    });

    if (!report)
      return NextResponse.json({ error: "Report not found" }, { status: 404 });

    if (decoded.role !== "ADMIN" && report.employeeId !== decoded.id)
      return NextResponse.json({ error: "Access denied" }, { status: 403 });

    return NextResponse.json(report);
  } catch (err) {
    console.error("Error in GET /api/workReports/[id]:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 🟡 PATCH: ویرایش گزارش
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    
    const body = await req.json();
    const parsedData = updateSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.errors }, { status: 400 });
    }

    const report = await prisma.workReport.findUnique({
      where: { id: params.id },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const updatedReport = await prisma.workReport.update({
      where: { id: params.id },
      data: parsedData.data,
    });

    return NextResponse.json(updatedReport);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 🔴 DELETE: حذف گزارش
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUserFromToken(req);
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const report = await prisma.workReport.findUnique({
    where: { id: params.id },
  });
  if (!report)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  if (user.role !== "ADMIN" && report.adminId !== user.id)
    return NextResponse.json({ message: "Access denied" }, { status: 403 });

  await prisma.workReport.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted successfully" });
}
