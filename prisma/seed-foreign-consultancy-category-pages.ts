/**
 * Yabancı danışmanlık kategori sayfalarının SEO içeriğini upsert eder.
 * Mevcut veriyi silmez; yalnızca tanımlı kategori kayıtlarını günceller.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient, SeoEntityType } from "../src/generated/prisma/client";
import { resolvePgConnectionString } from "../src/lib/pg-connection";
import {
  oturmaIzniCategoryPageSeed,
  oturmaIzniCategorySeo,
} from "./data/foreign-consultancy-oturma-izni-category";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://csglobal.com").replace(/\/$/, "");

async function main() {
  const pool = new Pool({
    connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
  });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    const page = await prisma.foreignConsultancyCategoryPage.upsert({
      where: { category: oturmaIzniCategoryPageSeed.category },
      create: {
        id: oturmaIzniCategoryPageSeed.id,
        category: oturmaIzniCategoryPageSeed.category,
        name: oturmaIzniCategoryPageSeed.name,
        excerpt: oturmaIzniCategoryPageSeed.excerpt,
        shortDescription: oturmaIzniCategoryPageSeed.shortDescription,
        heroTitle: oturmaIzniCategoryPageSeed.heroTitle,
        heroSubtitle: oturmaIzniCategoryPageSeed.heroSubtitle,
        sectionsJson: oturmaIzniCategoryPageSeed.sectionsJson,
        featureImage1: oturmaIzniCategoryPageSeed.featureImage1,
        featureImage1Title: oturmaIzniCategoryPageSeed.featureImage1Title,
        featureImage1Text: oturmaIzniCategoryPageSeed.featureImage1Text,
        featureImage2: oturmaIzniCategoryPageSeed.featureImage2,
        featureImage2Title: oturmaIzniCategoryPageSeed.featureImage2Title,
        featureImage2Text: oturmaIzniCategoryPageSeed.featureImage2Text,
        isActive: oturmaIzniCategoryPageSeed.isActive,
      },
      update: {
        name: oturmaIzniCategoryPageSeed.name,
        excerpt: oturmaIzniCategoryPageSeed.excerpt,
        shortDescription: oturmaIzniCategoryPageSeed.shortDescription,
        heroTitle: oturmaIzniCategoryPageSeed.heroTitle,
        heroSubtitle: oturmaIzniCategoryPageSeed.heroSubtitle,
        sectionsJson: oturmaIzniCategoryPageSeed.sectionsJson,
        featureImage1: oturmaIzniCategoryPageSeed.featureImage1,
        featureImage1Title: oturmaIzniCategoryPageSeed.featureImage1Title,
        featureImage1Text: oturmaIzniCategoryPageSeed.featureImage1Text,
        featureImage2: oturmaIzniCategoryPageSeed.featureImage2,
        featureImage2Title: oturmaIzniCategoryPageSeed.featureImage2Title,
        featureImage2Text: oturmaIzniCategoryPageSeed.featureImage2Text,
        isActive: oturmaIzniCategoryPageSeed.isActive,
      },
    });

    const canonicalUrl = `${SITE_URL}/yabanci-danismanlik/oturma-izni`;

    await prisma.seoMetadata.upsert({
      where: {
        entityType_entityId: {
          entityType: SeoEntityType.FOREIGN_CONSULTANCY_CATEGORY,
          entityId: page.id,
        },
      },
      create: {
        entityType: SeoEntityType.FOREIGN_CONSULTANCY_CATEGORY,
        entityId: page.id,
        metaTitle: oturmaIzniCategorySeo.metaTitle,
        metaDescription: oturmaIzniCategorySeo.metaDescription,
        canonicalUrl,
        ogTitle: oturmaIzniCategorySeo.metaTitle,
        ogDescription: oturmaIzniCategorySeo.metaDescription,
      },
      update: {
        metaTitle: oturmaIzniCategorySeo.metaTitle,
        metaDescription: oturmaIzniCategorySeo.metaDescription,
        canonicalUrl,
        ogTitle: oturmaIzniCategorySeo.metaTitle,
        ogDescription: oturmaIzniCategorySeo.metaDescription,
      },
    });

    console.log("foreign_consultancy_category_pages upsert: oturma-izni");
    console.log("seo_metadata upsert: FOREIGN_CONSULTANCY_CATEGORY", page.id);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
