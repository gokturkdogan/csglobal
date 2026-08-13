import type { PrismaClient } from "../../src/generated/prisma/client";
import { SeoEntityType } from "../../src/generated/prisma/client";
import {
  TICARI_SAMPLE_SERVICES,
  VISA_ROOT_CATEGORIES,
} from "../data/visa-categories";

export async function wipeArticlesOnly(prisma: PrismaClient) {
  const articleIds = (
    await prisma.article.findMany({ select: { id: true } })
  ).map((a) => a.id);

  if (articleIds.length === 0) {
    return { deleted: 0 };
  }

  await prisma.seoMetadata.deleteMany({
    where: { entityType: SeoEntityType.ARTICLE, entityId: { in: articleIds } },
  });
  await prisma.articleService.deleteMany({
    where: { articleId: { in: articleIds } },
  });
  const result = await prisma.article.deleteMany();

  return { deleted: result.count };
}

export async function wipeServicesOnly(prisma: PrismaClient) {
  const serviceIds = (
    await prisma.service.findMany({ select: { id: true } })
  ).map((s) => s.id);

  if (serviceIds.length === 0) {
    return { deleted: 0 };
  }

  await prisma.seoMetadata.deleteMany({
    where: { entityType: SeoEntityType.SERVICE, entityId: { in: serviceIds } },
  });
  await prisma.faq.deleteMany({ where: { serviceId: { in: serviceIds } } });
  await prisma.articleService.deleteMany({ where: { serviceId: { in: serviceIds } } });
  await prisma.fee.deleteMany({ where: { serviceId: { in: serviceIds } } });
  await prisma.serviceSection.deleteMany({ where: { serviceId: { in: serviceIds } } });
  await prisma.serviceDocument.deleteMany({ where: { serviceId: { in: serviceIds } } });
  const result = await prisma.service.deleteMany();

  return { deleted: result.count };
}

export async function wipeServicesAndCategories(prisma: PrismaClient) {
  const serviceIds = (
    await prisma.service.findMany({ select: { id: true } })
  ).map((s) => s.id);
  const categoryIds = (
    await prisma.category.findMany({ select: { id: true } })
  ).map((c) => c.id);

  if (serviceIds.length > 0) {
    await prisma.seoMetadata.deleteMany({
      where: { entityType: SeoEntityType.SERVICE, entityId: { in: serviceIds } },
    });
    await prisma.faq.deleteMany({ where: { serviceId: { in: serviceIds } } });
    await prisma.articleService.deleteMany({ where: { serviceId: { in: serviceIds } } });
    await prisma.fee.deleteMany({ where: { serviceId: { in: serviceIds } } });
    await prisma.serviceSection.deleteMany({ where: { serviceId: { in: serviceIds } } });
    await prisma.serviceDocument.deleteMany({ where: { serviceId: { in: serviceIds } } });
  }

  if (categoryIds.length > 0) {
    await prisma.seoMetadata.deleteMany({
      where: { entityType: SeoEntityType.CATEGORY, entityId: { in: categoryIds } },
    });
    await prisma.faq.deleteMany({ where: { categoryId: { in: categoryIds } } });
  }

  await prisma.service.deleteMany();
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
    await prisma.service.upsert({
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
        sortOrder: i + 1,
      },
    });
  }
}

export async function seedVisaDataOnly(prisma: PrismaClient) {
  await seedGlobalVisaCategories(prisma);

  const globalCategoryCount = await prisma.category.count();
  const totalServices = await prisma.service.count();

  return {
    globalCategories: globalCategoryCount,
    totalServices,
  };
}

export async function reseedVisaStructureForAllCountries(prisma: PrismaClient) {
  await wipeServicesAndCategories(prisma);
  return seedVisaDataOnly(prisma);
}
