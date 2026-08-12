import type { SeoEntityType } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function findSeoMetadata(entityType: SeoEntityType, entityId: string) {
  return prisma.seoMetadata.findUnique({
    where: {
      entityType_entityId: { entityType, entityId },
    },
  });
}
