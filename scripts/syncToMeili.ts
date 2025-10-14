// scripts/syncToMeili.ts
import { prisma } from "../lib/prisma";
import { meiliClient, SEARCH_INDEX } from "../lib/meili";

async function main() {
  const index = await meiliClient.index(SEARCH_INDEX);

  // تنظیمات ایندکس (فیلدهای قابل سرچ + ترتیب)
  await index.updateFilterableAttributes(["type", "countryCode", "visaSlug"]);
  await index.updateSearchableAttributes(["title", "description", "body", "name"]);
  await index.updateRankingRules([
    "words",
    "typo",
    "proximity",
    "attribute",
    "exactness",
    "desc(createdAt)",
  ]);

  const countries = await prisma.country.findMany({
    include: { visaTypes: true, contents: true },
  });

  const visaTypes = await prisma.visaType.findMany({
    include: { countries: true },
  });

  const contents = await prisma.content.findMany({
    include: { country: true, visaTypes: true },
  });

  const docs: any[] = [];

  // کشورها
  for (const c of countries) {
    docs.push({
      id: `country-${c.id}`,
      type: "country",
      title: c.name,
      description: "", // می‌تونی خلاصه‌ای از contents اضافه کنی
      countryCode: c.countryCode,
      slug: c.slug,
      createdAt: c.createdAt ?? new Date().toISOString(),
    });
  }

  // ویزاها
  for (const v of visaTypes) {
    docs.push({
      id: `visa-${v.id}`,
      type: "visa",
      title: v.name,
      description: "", // اختیاری
      visaSlug: v.slug,
      showInNavbar: v.showInNavbar,
      createdAt: new Date().toISOString(),
    });
  }

  // محتواها (مقالات/صفحات مرتبط با کشور یا ویزا)
  for (const ct of contents) {
    docs.push({
      id: `content-${ct.id}`,
      type: "content",
      title: ct.title,
      body: ct.body,
      description: ct.body ? ct.body.slice(0, 300) : "",
      countryId: ct.countryId,
      countrySlug: ct.country.slug,
      visaTypes: ct.visaTypes?.map((v) => v.slug) ?? [],
      createdAt: ct.createdAt,
    });
  }

  if (docs.length === 0) {
    console.log("هیچ سندی برای ایندکس وجود ندارد.");
    return;
  }

  const response = await index.addDocuments(docs);
  console.log("Sent documents to Meili. updateId:", response.updateId);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
