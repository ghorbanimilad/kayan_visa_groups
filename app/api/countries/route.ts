import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CountrySchema } from "./schema";
import { z } from "zod";

// Zod schema برای query
const CountryQuerySchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1),
  search: z.string().optional(),
});

// 📌 ایجاد کشور
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = CountrySchema.parse(body);

    const country = await prisma.country.create({ data });
    return NextResponse.json(country, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues.map((e) => e.message) },
        { status: 400 }
      );
    }
    console.error(err);
    return NextResponse.json({ error: "مشکلی پیش آمد" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // query params → Zod
    const query = CountryQuerySchema.parse({
      page: Number(searchParams.get("page") ?? 1),
      limit: Number(searchParams.get("limit") ?? 10),
      search: searchParams.get("search") ?? undefined,
    });

    const skip = (query.page - 1) * query.limit;
    const where = query.search
      ? {
          OR: [
            { name: { contains: query.search, mode: "insensitive" } },
            { slug: { contains: query.search, mode: "insensitive" } },
            { countryCode: { contains: query.search, mode: "insensitive" } },
          ],
        }
      : {};

    const [countries, total] = await Promise.all([
      prisma.country.findMany({
        where,
        skip,
        take: query.limit,
        select: { id: true, name: true, slug: true, countryCode: true },
        // include: { visaTypes: true, contents: true, covers: true }, // نام درست جدول کاورها
        orderBy: { name: "asc" },
      }),
      prisma.country.count({ where }),
    ]);

    return NextResponse.json({
      data: countries,
      pagination: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
        hasNextPage: query.page < Math.ceil(total / query.limit),
        hasPrevPage: query.page > 1,
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues.map((e) => e.message) },
        { status: 400 }
      );
    }
    console.error(err);
    return NextResponse.json({ error: "مشکلی پیش آمد" }, { status: 500 });
  }
}
