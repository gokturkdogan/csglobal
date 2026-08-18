import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient, SeoEntityType } from "../src/generated/prisma/client";
import { resolvePgConnectionString } from "../src/lib/pg-connection";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://csglobal.com").replace(/\/$/, "");
const SITE_NAME = "CSGLOBAL";
const META_DESC_MAX = 160;

function truncate(text: string | null | undefined, max = META_DESC_MAX): string | null {
  if (!text?.trim()) return null;
  const normalized = text.trim().replace(/\s+/g, " ");
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

function canonicalPath(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

async function main() {
  const pool = new Pool({
    connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
  });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  let visaProgramCount = 0;
  let countryCount = 0;
  let categoryCount = 0;
  let consulateCount = 0;
  let sitePageCount = 0;
  let foreignConsultancyCategoryCount = 0;

  const programs = await prisma.visaProgram.findMany({
    where: { isActive: true, country: { isActive: true } },
    select: {
      id: true,
      name: true,
      slug: true,
      excerpt: true,
      shortDescription: true,
      country: { select: { name: true, slug: true } },
    },
  });

  for (const program of programs) {
    const path = `/${program.country.slug}/${program.slug}`;
    const metaTitle = `${program.name} | ${program.country.name} | ${SITE_NAME}`;
    const metaDescription = truncate(program.excerpt ?? program.shortDescription);
    const canonicalUrl = canonicalPath(path);

    await prisma.seoMetadata.upsert({
      where: {
        entityType_entityId: {
          entityType: SeoEntityType.VISA_PROGRAM,
          entityId: program.id,
        },
      },
      create: {
        entityType: SeoEntityType.VISA_PROGRAM,
        entityId: program.id,
        metaTitle,
        metaDescription,
        canonicalUrl,
        ogTitle: metaTitle,
        ogDescription: metaDescription,
      },
      update: {
        metaTitle,
        metaDescription,
        canonicalUrl,
        ogTitle: metaTitle,
        ogDescription: metaDescription,
      },
    });
    visaProgramCount++;
  }

  const countries = await prisma.country.findMany({
    where: { isActive: true },
    select: { id: true, name: true, slug: true, shortDescription: true },
  });

  for (const country of countries) {
    const metaTitle = `${country.name} Vize ve Göçmenlik | ${SITE_NAME}`;
    const metaDescription = truncate(country.shortDescription);
    const canonicalUrl = canonicalPath(`/${country.slug}`);

    await prisma.seoMetadata.upsert({
      where: {
        entityType_entityId: {
          entityType: SeoEntityType.COUNTRY,
          entityId: country.id,
        },
      },
      create: {
        entityType: SeoEntityType.COUNTRY,
        entityId: country.id,
        metaTitle,
        metaDescription,
        canonicalUrl,
        ogTitle: metaTitle,
        ogDescription: metaDescription,
      },
      update: {
        metaTitle,
        metaDescription,
        canonicalUrl,
        ogTitle: metaTitle,
        ogDescription: metaDescription,
      },
    });
    countryCount++;
  }

  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: { id: true, name: true, slug: true, shortDescription: true },
  });

  for (const category of categories) {
    const metaTitle = `${category.name} | ${SITE_NAME}`;
    const metaDescription = truncate(category.shortDescription);

    await prisma.seoMetadata.upsert({
      where: {
        entityType_entityId: {
          entityType: SeoEntityType.CATEGORY,
          entityId: category.id,
        },
      },
      create: {
        entityType: SeoEntityType.CATEGORY,
        entityId: category.id,
        metaTitle,
        metaDescription,
        ogTitle: metaTitle,
        ogDescription: metaDescription,
      },
      update: {
        metaTitle,
        metaDescription,
        ogTitle: metaTitle,
        ogDescription: metaDescription,
      },
    });
    categoryCount++;
  }

  const consulates = await prisma.consulate.findMany({
    where: { isActive: true, country: { isActive: true } },
    select: {
      id: true,
      name: true,
      slug: true,
      country: { select: { slug: true } },
    },
  });

  for (const consulate of consulates) {
    const path = `/${consulate.country.slug}/konsolosluklar/${consulate.slug}`;
    const metaTitle = `${consulate.name} | ${SITE_NAME}`;
    const canonicalUrl = canonicalPath(path);

    await prisma.seoMetadata.upsert({
      where: {
        entityType_entityId: {
          entityType: SeoEntityType.CONSULATE,
          entityId: consulate.id,
        },
      },
      create: {
        entityType: SeoEntityType.CONSULATE,
        entityId: consulate.id,
        metaTitle,
        metaDescription: `${consulate.name} konsolosluk bilgileri ve başvuru rehberi.`,
        canonicalUrl,
        ogTitle: metaTitle,
        ogDescription: `${consulate.name} konsolosluk bilgileri ve başvuru rehberi.`,
      },
      update: {
        metaTitle,
        metaDescription: `${consulate.name} konsolosluk bilgileri ve başvuru rehberi.`,
        canonicalUrl,
        ogTitle: metaTitle,
        ogDescription: `${consulate.name} konsolosluk bilgileri ve başvuru rehberi.`,
      },
    });
    consulateCount++;
  }

  const foreignConsultancyCategories = await prisma.foreignConsultancyCategoryPage.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      excerpt: true,
      shortDescription: true,
      category: true,
    },
  });

  const foreignCategoryPaths: Record<string, string> = {
    OTURMA_IZNI: "/yabanci-danismanlik/oturma-izni",
    CALISMA_IZNI: "/yabanci-danismanlik/calisma-izni",
  };

  for (const categoryPage of foreignConsultancyCategories) {
    const path = foreignCategoryPaths[categoryPage.category];
    if (!path) continue;

    const metaTitle = `${categoryPage.name} | ${SITE_NAME}`;
    const metaDescription = truncate(
      categoryPage.excerpt ?? categoryPage.shortDescription,
    );
    const canonicalUrl = canonicalPath(path);

    await prisma.seoMetadata.upsert({
      where: {
        entityType_entityId: {
          entityType: SeoEntityType.FOREIGN_CONSULTANCY_CATEGORY,
          entityId: categoryPage.id,
        },
      },
      create: {
        entityType: SeoEntityType.FOREIGN_CONSULTANCY_CATEGORY,
        entityId: categoryPage.id,
        metaTitle,
        metaDescription,
        canonicalUrl,
        ogTitle: metaTitle,
        ogDescription: metaDescription,
      },
      update: {
        metaTitle,
        metaDescription,
        canonicalUrl,
        ogTitle: metaTitle,
        ogDescription: metaDescription,
      },
    });
    foreignConsultancyCategoryCount++;
  }

  const sitePages = await prisma.sitePage.findMany({
    where: { isActive: true },
    select: { id: true, slug: true, title: true, content: true },
  });

  const staticDescriptions: Record<string, string> = {
    home: "CSGLOBAL vize ve göçmenlik danışmanlığı. Uzman ekibimizle vize süreçlerinizi yönetin.",
    hakkimizda: "CSGLOBAL vize ve göçmenlik danışmanlığı hakkında bilgi edinin.",
    iletisim:
      "Vize ve göçmenlik danışmanlığı için telefon, WhatsApp veya e-posta ile CSGLOBAL uzman ekibine ulaşın.",
    ulkeler: "CSGLOBAL vize ve göçmenlik programları kapsanan ülkeler.",
    hizmetlerimiz:
      "CSGLOBAL vize, oturum ve göçmenlik programları. Tüm ülkelerdeki programları tek listede inceleyin.",
    bloglar: "Vize, oturum ve göçmenlik süreçlerine dair blog yazıları.",
  };

  for (const page of sitePages) {
    const path =
      page.slug === "home"
        ? "/"
        : page.slug === "rehberlerimiz"
          ? null
          : `/${page.slug}`;
    const metaTitle = `${page.title} | ${SITE_NAME}`;
    const metaDescription = truncate(
      staticDescriptions[page.slug] ?? page.content?.replace(/<[^>]+>/g, " "),
    );

    await prisma.seoMetadata.upsert({
      where: {
        entityType_entityId: {
          entityType: SeoEntityType.SITE_PAGE,
          entityId: page.id,
        },
      },
      create: {
        entityType: SeoEntityType.SITE_PAGE,
        entityId: page.id,
        metaTitle,
        metaDescription,
        canonicalUrl: path ? canonicalPath(path) : null,
        ogTitle: metaTitle,
        ogDescription: metaDescription,
      },
      update: {
        metaTitle,
        metaDescription,
        canonicalUrl: path ? canonicalPath(path) : null,
        ogTitle: metaTitle,
        ogDescription: metaDescription,
      },
    });
    sitePageCount++;
  }

  console.log("seo_metadata seed tamamlandı:");
  console.log(`  VISA_PROGRAM: ${visaProgramCount}`);
  console.log(`  COUNTRY: ${countryCount}`);
  console.log(`  CATEGORY: ${categoryCount}`);
  console.log(`  CONSULATE: ${consulateCount}`);
  console.log(`  SITE_PAGE: ${sitePageCount}`);
  console.log(`  FOREIGN_CONSULTANCY_CATEGORY: ${foreignConsultancyCategoryCount}`);

  await prisma.$disconnect();
  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
