import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 40);

    const deleted = await prisma.immigrationEvaluation.deleteMany({
      where: { createdAt: { lt: cutoffDate } },
    });

    console.log(`حذف شد ${deleted.count} فرم قدیمی`);
    return NextResponse.json({ message: "حذف انجام شد", deleted: deleted.count });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "خطا در حذف فرم‌های قدیمی" }, { status: 500 });
  }
}
