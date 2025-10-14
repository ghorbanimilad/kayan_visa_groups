import { z } from "zod";

export const CountrySchema = z.object({
  name: z.string().min(2, "نام کشور باید حداقل ۲ کاراکتر باشد"),
  slug: z
    .string()
    .min(2, "Slug حداقل ۲ کاراکتر باشد")
    .regex(/^[a-z0-9-]+$/, "Slug فقط می‌تواند حروف کوچک، عدد و - داشته باشد"),
  countryCode: z.string().length(2, "کد کشور باید ۲ کاراکتر باشد مثل 'de'"),
  flagUrl: z.string().url("لینک پرچم معتبر نیست").optional(),
  coverImage: z.string().url("لینک کاور معتبر نیست").optional(),
  visaTypeId: z.string().uuid("شناسه ویزا باید uuid معتبر باشد"),
});

export const CountryUpdateSchema = CountrySchema.partial();

// 📌 برای کوئری (pagination + search)
export const CountryQuerySchema = z.object({
  page: z.string().transform((val) => parseInt(val)).default("1"),
  limit: z.string().transform((val) => parseInt(val)).default("10"),
  search: z.string().optional(),
});
