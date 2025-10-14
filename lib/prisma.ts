import { PrismaClient } from "@prisma/client";

declare global {
  // جلوگیری از چند بار ساخته شدن PrismaClient
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["info", "error", "warn"], // میتونی برداری اگه لازم نداشتی
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
