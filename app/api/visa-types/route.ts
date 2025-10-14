import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // مسیر رو با ساختار پروژه‌ات تنظیم کن
import jwt from "jsonwebtoken";
import { z } from "zod";

//  schema برای هدر Authorization
const AuthHeaderSchema = z.object({
  authorization: z
    .string()
    .startsWith("Bearer ")
    .describe("Authorization header must start with 'Bearer '"),
});

//  schema برای query params (مثال: includeContents=true/false)
const QuerySchema = z.object({
  includeContents: z
    .string()
    .optional()
    .transform((val) => val === "true"),
});

// 3) schema برای شکل خروجی (simplified)
const contentSchema = z.object({
  id: z.string(),
  title: z.string(),
  imageUrl: z.string().nullable().optional(),
});

const CountrySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  countryCode: z.string(),
  flagUrl: z.string().nullable().optional(),
  coverImage: z.string().nullable().optional(),
  contents: z.array(contentSchema).optional(),
});

// ورودی Post
const CreateVisaTypeSchema = z.object({
  name: z.string().min(2, "نام باید حداقل 2 کاراکتر باشد"),
  slug: z.string().min(2, "slug باید حداقل 2 کاراکتر باشد."),
  countryIds: z.array(z.string()).optional(),
  showInNavbar: z.boolean().optional(),
  showInFooter: z.boolean().optional(),
});

const VisaTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  countries: z.array(CountrySchema),
  showInNavbar: z.boolean(),
  showInFooter: z.boolean(),
});

// type VisaType = z.infer<typeof VisaTypeSchema>;
const ResponseSchema = z.array(VisaTypeSchema);

/* ------------------------
   Helper: verify JWT
   ------------------------ */
// function verifyJwt(token: string) {
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET!);
//     return { ok: true, payload };
//   } catch (err) {
//     return { ok: false, error: err };
//   }
// }

/* ----------------------------
   API Route: GET
   ----------------------------*/


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const countryId = url.searchParams.get("country");

    if (!countryId) {
      return NextResponse.json(
        { success: false, message: "پارامتر country الزامی است" },
        { status: 400 }
      );
    }

    // گرفتن همه visaTypes مرتبط با کشور
    const visas = await prisma.visaType.findMany({
      where: {
        countries: { some: { id: countryId } },
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    return NextResponse.json({ success: true, data: visas });
  } catch (err) {
    console.error("Visa-types API error:", err);
    return NextResponse.json(
      { success: false, message: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}



/* ----------------------------
   API Route: POST
   ----------------------------*/
export async function POST(req: Request) {
  try {
    // Header validation
    const headerObj = { authorization: req.headers.get("authorization") ?? "" };
    const parsedHeader = AuthHeaderSchema.safeParse(headerObj);
    if (!parsedHeader.success) {
      return NextResponse.json(
        { error: "Missing or invalid Authorization header" },
        { status: 401 }
      );
    }

    // JWT check
    const token = headerObj.authorization.split(" ")[1];
    const jwtCheck = verifyJwt(token);
    if (!jwtCheck.ok) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Body validation
    const body = await req.json();
    const parsed = CreateVisaTypeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid body", details: parsed.error.format() },
        { status: 400 }
      );
    }

    // Create VisaType with optional countries (Many-to-Many)
    const visaType = await prisma.visaType.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        countries: parsed.data.countryIds
          ? { connect: parsed.data.countryIds.map((id) => ({ id })) }
          : undefined,
          
      },
      include: { countries: true },
    });

    const safe = VisaTypeSchema.safeParse(visaType);
    if (!safe.success) {
      return NextResponse.json(
        { error: "Server response shape mismatch" },
        { status: 500 }
      );
    }

    return NextResponse.json(safe.data, { status: 201 });
  } catch (err) {
    console.error("POST /visa-types error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
