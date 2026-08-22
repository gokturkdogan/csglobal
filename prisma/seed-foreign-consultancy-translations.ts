/**
 * Yabancı danışmanlık kategori sayfalarının çeviri alanlarını upsert eder.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { resolvePgConnectionString } from "../src/lib/pg-connection";
import { serializeForeignConsultancyTranslations } from "../src/lib/i18n/foreign-consultancy/translations";
import { calismaIzniCategoryTranslations } from "./data/fc-translations/calisma-izni-translations";
import { oturmaIzniCategoryTranslations } from "./data/fc-translations/oturma-izni-translations";

const CATEGORY_TRANSLATIONS = [
  {
    category: "OTURMA_IZNI" as const,
    translations: oturmaIzniCategoryTranslations,
  },
  {
    category: "CALISMA_IZNI" as const,
    translations: calismaIzniCategoryTranslations,
  },
];

async function main() {
  const pool = new Pool({
    connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
  });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    for (const item of CATEGORY_TRANSLATIONS) {
      const translationsJson = serializeForeignConsultancyTranslations(item.translations);

      await prisma.foreignConsultancyCategoryPage.updateMany({
        where: { category: item.category },
        data: { translationsJson },
      });

      console.log(`translations_json updated: ${item.category}`);
    }
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
