import type { Category, Service } from "@/generated/prisma/client";
import {
  findCategoriesByCountry,
  findCategoryChildren,
  findCategoryInCountry,
} from "@/lib/repositories/category.repository";
import { findServicesByCategory } from "@/lib/repositories/service.repository";

export type CategoryNode = Category & {
  children: CategoryNode[];
  services: Service[];
  hasContent: boolean;
  slugPath: string[];
};

export async function buildCategoryTree(countryId: string): Promise<CategoryNode[]> {
  const allCategories = await findCategoriesByCountry(countryId);
  const servicesByCategory = await loadServicesMap(countryId, allCategories);

  const map = new Map<string, CategoryNode>();
  for (const cat of allCategories) {
    map.set(cat.id, {
      ...cat,
      children: [],
      services: servicesByCategory.get(cat.id) ?? [],
      hasContent: false,
      slugPath: [],
    });
  }

  const roots: CategoryNode[] = [];
  for (const node of map.values()) {
    if (node.parentId) {
      const parent = map.get(node.parentId);
      if (parent) parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  function assignPaths(node: CategoryNode, parentPath: string[]) {
    node.slugPath = [...parentPath, node.slug];
    for (const child of node.children) {
      assignPaths(child, node.slugPath);
    }
  }
  for (const root of roots) {
    assignPaths(root, []);
  }

  for (const node of map.values()) {
    node.hasContent = computeHasContent(node);
  }

  return roots.filter((n) => n.hasContent);
}

async function loadServicesMap(countryId: string, categories: Category[]) {
  const map = new Map<string, Service[]>();
  for (const cat of categories) {
    const services = await findServicesByCategory(cat.id);
    if (services.length > 0) map.set(cat.id, services);
  }
  return map;
}

function computeHasContent(node: CategoryNode): boolean {
  if (node.services.length > 0) return true;
  const activeChildren = node.children.filter((c) => computeHasContent(c));
  node.children = activeChildren;
  return activeChildren.length > 0;
}

export async function getCategoryBranch(
  countryId: string,
  segments: string[],
): Promise<{ categories: Category[]; leaf: Category | null }> {
  let parentId: string | null = null;
  const chain: Category[] = [];

  for (const segment of segments) {
    const cat = await findCategoryInCountry(countryId, segment, parentId);
    if (!cat) return { categories: chain, leaf: null };
    chain.push(cat);
    parentId = cat.id;
  }

  return { categories: chain, leaf: chain[chain.length - 1] ?? null };
}

export async function getCategoryChildrenWithServices(categoryId: string) {
  const children = await findCategoryChildren(categoryId);
  const visibleChildren = [];
  for (const child of children) {
    const sub = await findCategoryChildren(child.id);
    const services = await findServicesByCategory(child.id);
    const hasSub = sub.length > 0;
    const hasSvc = services.length > 0;
    if (hasSub || hasSvc) {
      visibleChildren.push({
        category: child,
        childCount: sub.length,
        serviceCount: services.length,
      });
    }
  }
  const services = await findServicesByCategory(categoryId);
  return { children: visibleChildren, services };
}
