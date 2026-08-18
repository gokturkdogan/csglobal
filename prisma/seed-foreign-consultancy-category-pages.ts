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
  calismaIzniCategoryPageSeed,
  calismaIzniCategorySeo,
} from "./data/foreign-consultancy-calisma-izni-category";
import {
  oturmaIzniCategoryPageSeed,
  oturmaIzniCategorySeo,
} from "./data/foreign-consultancy-oturma-izni-category";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://csglobal.com").replace(/\/$/, "");

type CategoryPageSeed = typeof oturmaIzniCategoryPageSeed;
type CategorySeo = typeof oturmaIzniCategorySeo;

const CATEGORY_SEEDS: Array<{
  slug: string;
  page: CategoryPageSeed;
  seo: CategorySeo;
}> = [
  {
    slug: "oturma-izni",
    page: oturmaIzniCategoryPageSeed,
    seo: oturmaIzniCategorySeo,
  },
  {
    slug: "calisma-izni",
    page: calismaIzniCategoryPageSeed,
    seo: calismaIzniCategorySeo,
  },
];

async function upsertCategoryPage(
  prisma: PrismaClient,
  slug: string,
  pageSeed: CategoryPageSeed,
  seo: CategorySeo,
) {
  const page = await prisma.foreignConsultancyCategoryPage.upsert({
    where: { category: pageSeed.category },
    create: {
      id: pageSeed.id,
      category: pageSeed.category,
      name: pageSeed.name,
      excerpt: pageSeed.excerpt,
      shortDescription: pageSeed.shortDescription,
      heroTitle: pageSeed.heroTitle,
      heroSubtitle: pageSeed.heroSubtitle,
      sectionsJson: pageSeed.sectionsJson,
      featureImage1: pageSeed.featureImage1,
      featureImage1Title: pageSeed.featureImage1Title,
      featureImage1Text: pageSeed.featureImage1Text,
      featureImage2: pageSeed.featureImage2,
      featureImage2Title: pageSeed.featureImage2Title,
      featureImage2Text: pageSeed.featureImage2Text,
      isActive: pageSeed.isActive,
    },
    update: {
      name: pageSeed.name,
      excerpt: pageSeed.excerpt,
      shortDescription: pageSeed.shortDescription,
      heroTitle: pageSeed.heroTitle,
      heroSubtitle: pageSeed.heroSubtitle,
      sectionsJson: pageSeed.sectionsJson,
      featureImage1: pageSeed.featureImage1,
      featureImage1Title: pageSeed.featureImage1Title,
      featureImage1Text: pageSeed.featureImage1Text,
      featureImage2: pageSeed.featureImage2,
      featureImage2Title: pageSeed.featureImage2Title,
      featureImage2Text: pageSeed.featureImage2Text,
      isActive: pageSeed.isActive,
    },
  });

  const canonicalUrl = `${SITE_URL}/yabanci-danismanlik/${slug}`;

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
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      canonicalUrl,
      ogTitle: seo.metaTitle,
      ogDescription: seo.metaDescription,
    },
    update: {
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      canonicalUrl,
      ogTitle: seo.metaTitle,
      ogDescription: seo.metaDescription,
    },
  });

  console.log(`foreign_consultancy_category_pages upsert: ${slug}`);
  console.log(`seo_metadata upsert: FOREIGN_CONSULTANCY_CATEGORY ${page.id}`);
}

async function main() {
  const pool = new Pool({
    connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
  });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    for (const { slug, page, seo } of CATEGORY_SEEDS) {
      await upsertCategoryPage(prisma, slug, page, seo);
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
