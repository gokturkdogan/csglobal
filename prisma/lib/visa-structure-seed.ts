import type { PrismaClient } from "../../src/generated/prisma/client";
import { SeoEntityType } from "../../src/generated/prisma/client";
import {
  TICARI_SAMPLE_SERVICES,
  VISA_ROOT_CATEGORIES,
} from "../data/visa-categories";

export async function wipeVisaProgramsOnly(prisma: PrismaClient) {
  const programIds = (
    await prisma.visaProgram.findMany({ select: { id: true } })
  ).map((p) => p.id);

  if (programIds.length === 0) {
    return { deleted: 0 };
  }

  await prisma.seoMetadata.deleteMany({
    where: {
      entityType: { in: [SeoEntityType.VISA_PROGRAM, SeoEntityType.SERVICE, SeoEntityType.ARTICLE] },
      entityId: { in: programIds },
    },
  });
  await prisma.faq.deleteMany({ where: { visaProgramId: { in: programIds } } });
  await prisma.fee.deleteMany({ where: { visaProgramId: { in: programIds } } });
  await prisma.visaProgramSection.deleteMany({
    where: { visaProgramId: { in: programIds } },
  });
  await prisma.visaProgramDocument.deleteMany({
    where: { visaProgramId: { in: programIds } },
  });
  await prisma.visaProgramCategoryLink.deleteMany({
    where: { visaProgramId: { in: programIds } },
  });
  const result = await prisma.visaProgram.deleteMany();

  return { deleted: result.count };
}

/** @deprecated wipeVisaProgramsOnly kullanın */
export async function wipeServicesOnly(prisma: PrismaClient) {
  return wipeVisaProgramsOnly(prisma);
}

/** @deprecated Birleşik tabloda rehber ayrımı yok */
export async function wipeArticlesOnly(prisma: PrismaClient) {
  return { deleted: 0 };
}

export async function wipeServicesAndCategories(prisma: PrismaClient) {
  const programIds = (
    await prisma.visaProgram.findMany({ select: { id: true } })
  ).map((p) => p.id);
  const categoryIds = (
    await prisma.category.findMany({ select: { id: true } })
  ).map((c) => c.id);

  if (programIds.length > 0) {
    await prisma.seoMetadata.deleteMany({
      where: {
        entityType: {
          in: [SeoEntityType.VISA_PROGRAM, SeoEntityType.SERVICE, SeoEntityType.ARTICLE],
        },
        entityId: { in: programIds },
      },
    });
    await prisma.faq.deleteMany({ where: { visaProgramId: { in: programIds } } });
    await prisma.fee.deleteMany({ where: { visaProgramId: { in: programIds } } });
    await prisma.visaProgramSection.deleteMany({
      where: { visaProgramId: { in: programIds } },
    });
    await prisma.visaProgramDocument.deleteMany({
      where: { visaProgramId: { in: programIds } },
    });
    await prisma.visaProgramCategoryLink.deleteMany({
      where: { visaProgramId: { in: programIds } },
    });
  }

  if (categoryIds.length > 0) {
    await prisma.seoMetadata.deleteMany({
      where: { entityType: SeoEntityType.CATEGORY, entityId: { in: categoryIds } },
    });
    await prisma.faq.deleteMany({ where: { categoryId: { in: categoryIds } } });
    await prisma.visaProgramCategoryLink.deleteMany({
      where: { categoryId: { in: categoryIds } },
    });
  }

  await prisma.visaProgram.deleteMany();
  await prisma.category.deleteMany();
}

export async function seedGlobalVisaCategories(prisma: PrismaClient) {
  for (const cat of VISA_ROOT_CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      create: {
        slug: cat.slug,
        name: cat.name,
        categoryType: cat.categoryType,
        shortDescription: cat.shortDescription,
        sortOrder: cat.sortOrder,
        isActive: true,
      },
      update: {
        name: cat.name,
        categoryType: cat.categoryType,
        shortDescription: cat.shortDescription,
        sortOrder: cat.sortOrder,
        isActive: true,
      },
    });
  }
}

export async function seedCountryTicariServices(
  prisma: PrismaClient,
  countryId: string,
  countryName: string,
  options?: { featuredTicari?: boolean },
) {
  const featuredTicari = options?.featuredTicari ?? false;
  const ticariCategory = await prisma.category.findUnique({
    where: { slug: "ticari-vizeler" },
  });
  if (!ticariCategory) {
    throw new Error("Ticari Vizeler kategorisi bulunamadı");
  }

  for (const [i, svc] of TICARI_SAMPLE_SERVICES.entries()) {
    const program = await prisma.visaProgram.upsert({
      where: {
        countryId_slug: {
          countryId,
          slug: svc.slug,
        },
      },
      create: {
        countryId,
        categoryId: ticariCategory.id,
        slug: svc.slug,
        name: `${countryName} ${svc.name}`,
        shortDescription: svc.shortDescription,
        processingTime: svc.processingTime,
        isFeatured: featuredTicari && svc.isFeatured,
        isActive: true,
        showInCategoryPanel: true,
        requiresAppointment: true,
        sortOrder: i + 1,
      },
      update: {
        categoryId: ticariCategory.id,
        name: `${countryName} ${svc.name}`,
        shortDescription: svc.shortDescription,
        processingTime: svc.processingTime,
        isFeatured: featuredTicari && svc.isFeatured,
        isActive: true,
        showInCategoryPanel: true,
        sortOrder: i + 1,
      },
    });

    await prisma.visaProgramCategoryLink.upsert({
      where: {
        visaProgramId_categoryId: {
          visaProgramId: program.id,
          categoryId: ticariCategory.id,
        },
      },
      create: {
        visaProgramId: program.id,
        categoryId: ticariCategory.id,
      },
      update: {},
    });
  }
}

export async function seedVisaDataOnly(prisma: PrismaClient) {
  await seedGlobalVisaCategories(prisma);

  const globalCategoryCount = await prisma.category.count();
  const totalPrograms = await prisma.visaProgram.count();

  return {
    globalCategories: globalCategoryCount,
    totalServices: totalPrograms,
  };
}

export async function reseedVisaStructureForAllCountries(prisma: PrismaClient) {
  await wipeServicesAndCategories(prisma);
  return seedVisaDataOnly(prisma);
}
