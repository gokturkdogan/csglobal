/**
 * Belirtilen slug'lar için Türkçe içerik alanlarını JSON olarak stdout'a yazar.
 * Kullanım: tsx prisma/lib/export-fc-content-batch.ts slug-1 slug-2 ...
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../../src/generated/prisma/client";
import { resolvePgConnectionString } from "../../src/lib/pg-connection";

async function main() {
  const slugs = process.argv.slice(2);
  if (slugs.length === 0) {
    console.error("En az bir slug gerekli.");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
  });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    const contents = await prisma.foreignConsultancyContent.findMany({
      where: { slug: { in: slugs } },
      select: {
        slug: true,
        category: true,
        name: true,
        excerpt: true,
        shortDescription: true,
        heroTitle: true,
        heroSubtitle: true,
        sectionsJson: true,
        featureImage1Title: true,
        featureImage1Text: true,
        featureImage2Title: true,
        featureImage2Text: true,
        processingTime: true,
      },
    });

    const ordered = slugs
      .map((slug) => contents.find((item) => item.slug === slug))
      .filter(Boolean);

    process.stdout.write(JSON.stringify(ordered, null, 2));
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
