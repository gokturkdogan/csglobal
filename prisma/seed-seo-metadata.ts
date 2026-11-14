import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient, SeoEntityType } from "../src/generated/prisma/client";
import { resolvePgConnectionString } from "../src/lib/pg-connection";
import { buildToolPath, siteTools, TOOLS_LIST_PATH } from "../src/lib/tools";
import {
  SITE_PAGE_SLUG_TO_SEO_KEY,
  STATIC_PAGE_SEO,
  getToolPageSeo,
} from "../src/lib/static-page-seo";

const SITE_NAME = "CSGLOBAL";
const META_DESC_MAX = 160;
const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/ulnb2wjo/image/upload/f_auto,q_auto,w_1200/v1786551822/banner-1.png";

function truncate(text: string | null | undefined, max = META_DESC_MAX): string | null {
  if (!text?.trim()) return null;
  const normalized = text.trim().replace(/\s+/g, " ");
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}


async function upsertSitePageSeoByEntityId(
  prisma: PrismaClient,
  entityId: string,
  path: string,
  metaTitle: string,
  metaDescription: string | null,
) {

  await prisma.seoMetadata.upsert({
    where: {
      entityType_entityId: {
        entityType: SeoEntityType.SITE_PAGE,
        entityId,
      },
    },
    create: {
      entityType: SeoEntityType.SITE_PAGE,
      entityId,
      metaTitle,
      metaDescription,
      ogTitle: metaTitle,
      ogDescription: metaDescription,
      ogImage: DEFAULT_OG_IMAGE,
    },
    update: {
      metaTitle,
      metaDescription,
      ogTitle: metaTitle,
      ogDescription: metaDescription,
      ogImage: DEFAULT_OG_IMAGE,
    },
  });
}

async function seedAraclarSitePages(prisma: PrismaClient): Promise<number> {
  let count = 0;

  await prisma.sitePage.upsert({
    where: { slug: "araclar" },
    create: {
      slug: "araclar",
      title: "Araçlar",
      content: "Vize ve göçmenlik süreçleriniz için hesaplama ve bilgi araçları.",
      isActive: true,
    },
    update: {
      title: "Araçlar",
      content: "Vize ve göçmenlik süreçleriniz için hesaplama ve bilgi araçları.",
    },
  });
  count++;

  for (const tool of siteTools) {
    await prisma.sitePage.upsert({
      where: { slug: `araclar-${tool.slug}` },
      create: {
        slug: `araclar-${tool.slug}`,
        title: tool.name,
        content: tool.description,
        isActive: true,
      },
      update: {
        title: tool.name,
        content: tool.description,
      },
    });
    count++;
  }

  return count;
}

async function main() {
  const pool = new Pool({
    connectionString: resolvePgConnectionString(process.env.DATABASE_URL!),
  });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  const araclarSitePageCount = await seedAraclarSitePages(prisma);

  let visaProgramCount = 0;
  let countryCount = 0;
  let categoryCount = 0;
  let consulateCount = 0;
  let sitePageCount = 0;
  let toolPageCount = 0;
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
    const metaTitle = `${program.name} | ${program.country.name} | ${SITE_NAME}`;
    const metaDescription = truncate(program.excerpt ?? program.shortDescription);

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
    visaProgramCount++;
  }

  const countries = await prisma.country.findMany({
    where: { isActive: true },
    select: { id: true, name: true, slug: true, shortDescription: true },
  });

  for (const country of countries) {
    const metaTitle = `${country.name} Vize ve Göçmenlik | ${SITE_NAME}`;
    const metaDescription = truncate(country.shortDescription);

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
    const metaTitle = `${consulate.name} | ${SITE_NAME}`;

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
        ogTitle: metaTitle,
        ogDescription: `${consulate.name} konsolosluk bilgileri ve başvuru rehberi.`,
      },
      update: {
        metaTitle,
        metaDescription: `${consulate.name} konsolosluk bilgileri ve başvuru rehberi.`,
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
    foreignConsultancyCategoryCount++;
  }

  const sitePages = await prisma.sitePage.findMany({
    where: { isActive: true },
    select: { id: true, slug: true, title: true, content: true },
  });

  for (const page of sitePages) {
    const staticSeoKey = SITE_PAGE_SLUG_TO_SEO_KEY[page.slug];
    const staticSeo = staticSeoKey ? STATIC_PAGE_SEO[staticSeoKey] : undefined;
    const metaTitle = `${staticSeo?.title ?? page.title} | ${SITE_NAME}`;
    const metaDescription = truncate(
      staticSeo?.description ?? page.content?.replace(/<[^>]+>/g, " "),
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
    sitePageCount++;
  }

  await upsertSitePageSeoByEntityId(
    prisma,
    "araclar",
    TOOLS_LIST_PATH,
    `${STATIC_PAGE_SEO.araclar.title} | ${SITE_NAME}`,
    truncate(STATIC_PAGE_SEO.araclar.description),
  );
  toolPageCount++;

  for (const tool of siteTools) {
    const path = buildToolPath(tool.slug);
    const toolSeo = getToolPageSeo(tool.slug);
    const metaTitle = `${toolSeo?.title ?? tool.name} | ${SITE_NAME}`;
    const metaDescription = truncate(toolSeo?.description ?? tool.description);

    await upsertSitePageSeoByEntityId(
      prisma,
      `araclar-${tool.slug}`,
      path,
      metaTitle,
      metaDescription,
    );
    toolPageCount++;
  }

  console.log("seo_metadata seed tamamlandı:");
  console.log(`  site_pages (araçlar): ${araclarSitePageCount}`);
  console.log(`  VISA_PROGRAM: ${visaProgramCount}`);
  console.log(`  COUNTRY: ${countryCount}`);
  console.log(`  CATEGORY: ${categoryCount}`);
  console.log(`  CONSULATE: ${consulateCount}`);
  console.log(`  SITE_PAGE: ${sitePageCount}`);
  console.log(`  SITE_PAGE (araçlar): ${toolPageCount}`);
  console.log(`  FOREIGN_CONSULTANCY_CATEGORY: ${foreignConsultancyCategoryCount}`);

  await prisma.$disconnect();
  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
