import "dotenv/config";
import fs from "fs";
import path from "path";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { resolvePgConnectionString } from "../src/lib/pg-connection";
import { slugFromTitle } from "../src/lib/slug";
import {
  importEagvsPage,
  type EagvsContentType,
} from "../src/lib/eagvs-import";

const pool = new Pool({
  connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
});
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

function parseArgs(argv: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      out[key] = "true";
    } else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

async function resolveCountryId(countrySlug: string): Promise<string> {
  const country = await prisma.country.findFirst({
    where: { slug: countrySlug },
    select: { id: true },
  });
  if (!country) {
    throw new Error(`Ülke bulunamadı: ${countrySlug}`);
  }
  return country.id;
}

async function resolveOrCreateCategoryId(
  categoryName: string,
  createIfMissing: boolean,
): Promise<string> {
  const trimmed = categoryName.trim();
  const slug = slugFromTitle(trimmed);

  const existing = await prisma.category.findFirst({
    where: {
      OR: [{ slug }, { name: { equals: trimmed, mode: "insensitive" } }],
    },
    select: { id: true },
  });
  if (existing) return existing.id;

  if (!createIfMissing) {
    throw new Error(`Kategori bulunamadı: ${trimmed} (slug: ${slug})`);
  }

  const maxSort = await prisma.category.aggregate({ _max: { sortOrder: true } });
  const sortOrder = (maxSort._max.sortOrder ?? 0) + 1;

  const created = await prisma.category.create({
    data: {
      slug,
      name: trimmed,
      categoryType: "eagvs_import",
      shortDescription: trimmed,
      sortOrder,
      isActive: true,
    },
    select: { id: true },
  });

  console.log(`Kategori oluşturuldu: ${trimmed} (${slug})`);
  return created.id;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const url = args.url?.trim();
  const countrySlug = args.country?.trim();
  const categoryName = args.category?.trim();
  const typeRaw = args.type?.trim().toLowerCase();

  if (!url || !countrySlug || !categoryName || !typeRaw) {
    console.error(
      "Kullanım: tsx prisma/import-eagvs-page.ts --url <eagvs-url> --country <slug> --category <ad> --type rehber|program [--slug <slug>] [--save-json] [--no-create-category]",
    );
    process.exit(1);
  }

  if (typeRaw !== "rehber" && typeRaw !== "program") {
    throw new Error(`Geçersiz type: ${typeRaw} (rehber veya program olmalı)`);
  }
  const contentType = typeRaw as EagvsContentType;

  const countryId = await resolveCountryId(countrySlug);
  const createCategory = args["no-create-category"] !== "true";
  const categoryId = await resolveOrCreateCategoryId(categoryName, createCategory);

  console.log(`EAGVS sayfası alınıyor: ${url}`);
  const result = await importEagvsPage({
    url,
    countryId,
    categoryId,
    contentType,
    slug: args.slug?.trim(),
  });

  console.log(`Başlık: ${result.title}`);
  console.log(`Slug: ${result.slug}`);
  console.log(`Bölüm: ${result.sectionCount}`);
  console.log(`Kayıt: ${result.editPath}`);

  if (args["save-json"] === "true") {
    const { scrapeEagvsPage } = await import("../src/lib/eagvs-scrape");
    const scraped = await scrapeEagvsPage(url);
    const outDir = path.join(process.cwd(), "prisma/eagvs-content");
    fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, `${result.slug}.json`);
    fs.writeFileSync(outPath, JSON.stringify(scraped.sections, null, 2), "utf8");
    console.log(`JSON kaydedildi: ${outPath}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
