import { prisma } from "@/lib/prisma";
import { slugFromTitle } from "@/lib/slug";
import {
  matchEagvsCategoryId,
  resolveCanonicalCategoryName,
  inferCategoryType,
  type EagvsCategoryMatchContext,
} from "@/lib/eagvs-category-match";
import type { EagvsCategoryHint } from "@/lib/eagvs-scrape";

export type EnsureEagvsCategoryResult = {
  categoryId: string;
  categoryName: string;
  created: boolean;
};

export async function loadActiveEagvsCategories(): Promise<EagvsCategoryHint[]> {
  return prisma.category.findMany({
    where: { isActive: true },
    select: { id: true, name: true, slug: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

/**
 * EAGVS bağlamından kategori eşleştirir; yoksa kanonik adla yeni kategori oluşturur.
 */
export async function ensureEagvsCategoryId(
  context: EagvsCategoryMatchContext,
  categories?: EagvsCategoryHint[],
): Promise<EnsureEagvsCategoryResult> {
  const activeCategories = categories ?? await loadActiveEagvsCategories();
  const matchedId = matchEagvsCategoryId(context, activeCategories);
  if (matchedId) {
    const matched = activeCategories.find((category) => category.id === matchedId);
    return {
      categoryId: matchedId,
      categoryName: matched?.name ?? "",
      created: false,
    };
  }

  const sourceLabel =
    context.pageSidebarGroup ||
    context.breadcrumbActive ||
    context.pageSidebarActiveLabel ||
    context.linkLabel ||
    context.groupTitle ||
    "";

  const categoryName = resolveCanonicalCategoryName(sourceLabel, context);
  const existingByName = activeCategories.find(
    (category) => category.name.toLowerCase() === categoryName.toLowerCase(),
  );
  if (existingByName) {
    return {
      categoryId: existingByName.id,
      categoryName: existingByName.name,
      created: false,
    };
  }

  const slug = slugFromTitle(categoryName);
  const existingBySlug = await prisma.category.findUnique({
    where: { slug },
    select: { id: true, name: true, isActive: true },
  });
  if (existingBySlug) {
    return {
      categoryId: existingBySlug.id,
      categoryName: existingBySlug.name,
      created: false,
    };
  }

  const maxSort = await prisma.category.aggregate({ _max: { sortOrder: true } });
  const created = await prisma.category.create({
    data: {
      name: categoryName,
      slug,
      categoryType: inferCategoryType(categoryName),
      shortDescription: null,
      isActive: true,
      sortOrder: (maxSort._max.sortOrder ?? 0) + 1,
    },
    select: { id: true, name: true },
  });

  return {
    categoryId: created.id,
    categoryName: created.name,
    created: true,
  };
}
