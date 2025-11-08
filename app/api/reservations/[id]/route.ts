import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdmin } from "@/lib/auth";

// 📌 گرفتن یک رزرو
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = checkAdmin(req as any);
  if (!admin)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const reservation = await prisma.reservation.findUnique({ where: { id } });
  if (!reservation)
    return NextResponse.json({ message: "Not Found" }, { status: 404 });

  return NextResponse.json(reservation);
}

// 📌 بروزرسانی (فقط ادمین)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = checkAdmin(req as any);
  if (!admin)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status } = await req.json();
  const updated = await prisma.reservation.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updated);
}

// --- PATCH: آپدیت رزرو ---
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { id } = await params;
    const updated = await prisma.reservation.update({
      where: { id },
      data: body, // مثلا { status: "CONFIRMED" }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update reservation" },
      { status: 500 }
    );
  }
}

// 📌 حذف رزرو (فقط ادمین)

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.reservation.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete reservation" },
      { status: 500 }
    );
  }
}
