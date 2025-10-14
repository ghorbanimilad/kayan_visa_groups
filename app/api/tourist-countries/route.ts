import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const menus = await prisma.visaType.findMany({
      where: { showInFooter: true },
      include: { countries: true },
      orderBy: { id: "asc" },
    });

    return new Response(JSON.stringify(menus), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching menus", { status: 500 });
  }
}
