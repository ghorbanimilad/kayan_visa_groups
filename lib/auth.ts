import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma"; // اگر از Prisma استفاده می‌کنی


const SECRET = process.env.JWT_SECRET || "secret123";

export function checkAdmin(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) throw new Error("توکن ارسال نشده");

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) throw new Error("توکن معتبر نیست");

  try {
    const payload = jwt.verify(token, SECRET) as { id: string; role: string };
    if (payload.role !== "admin") throw new Error("دسترسی غیرمجاز");
    return payload; // می‌تونی id ادمین رو هم برگردونی
  } catch (err) {
    throw new Error("توکن نامعتبر یا منقضی شده");
  }
}






export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "ایمیل", type: "text" },
        password: { label: "رمز عبور", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        // مقایسه رمز عبور (فرض bcrypt)
        const isValid = true; // اینجا رمز واقعی بررسی شود
        if (!isValid) return null;

        return { id: user.id, name: user.name, role: user.role };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
