import { cache } from "react";
import type { SeoEntityType } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const findSeoMetadata = cache(async (entityType: SeoEntityType, entityId: string) => {
  return prisma.seoMetadata.findUnique({
    where: {
      entityType_entityId: { entityType, entityId },
    },
  });
});

export type SeoMetadataUpsertInput = {
  entityType: SeoEntityType;
  entityId: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  structuredData?: string | null;
};

export async function upsertSeoMetadata(input: SeoMetadataUpsertInput) {
  const {
    entityType,
    entityId,
    metaTitle,
    metaDescription,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage,
    robotsIndex,
    robotsFollow,
    structuredData,
  } = input;

  return prisma.seoMetadata.upsert({
    where: { entityType_entityId: { entityType, entityId } },
    create: {
      entityType,
      entityId,
      metaTitle,
      metaDescription,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      robotsIndex: robotsIndex ?? true,
      robotsFollow: robotsFollow ?? true,
      structuredData,
    },
    update: {
      metaTitle,
      metaDescription,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      robotsIndex: robotsIndex ?? true,
      robotsFollow: robotsFollow ?? true,
      structuredData,
    },
  });
}
