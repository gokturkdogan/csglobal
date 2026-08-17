/**
 * Yalnızca liste/anasayfa site_pages kayıtlarını upsert eder.
 * Mevcut veriyi silmez; db:seed çalıştırmaya gerek kalmaz.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { resolvePgConnectionString } from "../src/lib/pg-connection";

const PAGES = [
  {
    slug: "ulkeler",
    title: "Tüm Ülkeler",
    content: "CSGLOBAL vize ve göçmenlik programları kapsanan ülkeler.",
  },
  {
    slug: "hizmetlerimiz",
    title: "Vize Programları",
    content: "Tüm ülkelerdeki vize, oturum ve göçmenlik programları.",
  },
  {
    slug: "home",
    title: "Anasayfa",
    content: "CSGLOBAL vize ve göçmenlik danışmanlığı.",
  },
] as const;

async function main() {
  const pool = new Pool({
    connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
  });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    for (const page of PAGES) {
      await prisma.sitePage.upsert({
        where: { slug: page.slug },
        create: {
          slug: page.slug,
          title: page.title,
          content: page.content,
          isActive: true,
        },
        update: {
          title: page.title,
          isActive: true,
        },
      });
      console.log(`site_pages upsert: ${page.slug}`);
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
