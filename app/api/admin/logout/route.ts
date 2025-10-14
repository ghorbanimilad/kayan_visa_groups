import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  // حذف کوکی با ست کردن مقدار خالی و maxAge=0
  response.cookies.set("adminToken", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
