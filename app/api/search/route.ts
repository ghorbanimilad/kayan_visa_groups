import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawQuery = searchParams.get("q")?.trim() || "";

    if (!rawQuery) return NextResponse.json({ results: [] });

    const queryWords = rawQuery.split(" ").filter(Boolean);

    // جستجو در VisaType
    const visas = await prisma.visaType.findMany({
      where: {
        OR: queryWords.map((word) => ({ name: { contains: word, mode: "insensitive" } })),
      },
      select: { id: true, name: true, slug: true },
    });

    // جستجو در Country
    const countries = await prisma.country.findMany({
      where: {
        OR: queryWords.map((word) => ({ name: { contains: word, mode: "insensitive" } })),
      },
      select: { id: true, name: true, slug: true },
    });

    // جستجو برای ترکیب ویزا + کشور (محتواهای مرتبط)
    const matchedContents = await prisma.content.findMany({
      where: {
        OR: [
          ...queryWords.map((word) => ({ title: { contains: word, mode: "insensitive" } })),
          ...queryWords.map((word) => ({ body: { contains: word, mode: "insensitive" } })),
        ],
      },
      select: { id: true, title: true, countryId: true },
    });

    // Merge results
    const results: any[] = [];

    visas.forEach((v) => results.push({ type: "visa", id: v.id, name: v.name, slug: v.slug }));
    countries.forEach((c) => results.push({ type: "country", id: c.id, name: c.name, slug: c.slug }));
    matchedContents.forEach((c) => results.push({ type: "content", id: c.id, title: c.title, countryId: c.countryId }));

    if (results.length === 0) return NextResponse.json({ results: [], message: "چیزی پیدا نشد" });

    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در جستجو" }, { status: 500 });
  }
}



