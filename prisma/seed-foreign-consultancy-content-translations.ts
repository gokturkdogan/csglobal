/**
 * prisma/data/fc-translations/contents/ altındaki çeviri dosyalarını DB'ye yazar.
 */
import "dotenv/config";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { resolvePgConnectionString } from "../src/lib/pg-connection";
import { serializeForeignConsultancyTranslations } from "../src/lib/i18n/foreign-consultancy/translations";
import type { ForeignConsultancyTranslations } from "../src/lib/i18n/foreign-consultancy/translations";

type ContentTranslationModule = {
  contentSlug: string;
  contentTranslations: ForeignConsultancyTranslations;
};

const CONTENTS_DIR = path.join(
  process.cwd(),
  "prisma/data/fc-translations/contents",
);

async function main() {
  if (!fs.existsSync(CONTENTS_DIR)) {
    console.error("Çeviri dizini yok:", CONTENTS_DIR);
    process.exit(1);
  }

  const files = fs
    .readdirSync(CONTENTS_DIR)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .sort();

  if (files.length === 0) {
    console.error("Çeviri dosyası bulunamadı.");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
  });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  let updated = 0;

  try {
    for (const file of files) {
      const modulePath = pathToFileURL(path.join(CONTENTS_DIR, file)).href;
      const mod = (await import(modulePath)) as ContentTranslationModule;

      if (!mod.contentSlug || !mod.contentTranslations) {
        console.warn(`Atlandı (eksik export): ${file}`);
        continue;
      }

      const translationsJson = serializeForeignConsultancyTranslations(mod.contentTranslations);
      const result = await prisma.foreignConsultancyContent.updateMany({
        where: { slug: mod.contentSlug },
        data: { translationsJson },
      });

      if (result.count === 0) {
        console.warn(`DB kaydı bulunamadı: ${mod.contentSlug}`);
        continue;
      }

      updated += result.count;
      console.log(`translations_json updated: ${mod.contentSlug}`);
    }

    console.log(`Toplam güncellenen: ${updated}`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
