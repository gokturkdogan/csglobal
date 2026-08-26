import { prisma } from "@/lib/prisma";
import tahditKodlariData from "@/data/tahdit-kodlari.json";
import { rejectionReasons } from "@/lib/rejection-guide-data";
import { buildToolPath, siteTools } from "@/lib/tools";

export type AdminDashboardToolStat = {
  slug: string;
  name: string;
  href: string;
  count: number | null;
};

export type AdminDashboardStats = {
  countries: number;
  categories: number;
  visaPrograms: number;
  blogPosts: number;
  blogPostsActive: number;
  blogPostsFeatured: number;
  foreignConsultancyTotal: number;
  foreignConsultancyOturma: number;
  foreignConsultancyCalisma: number;
  tools: AdminDashboardToolStat[];
};

function toolReferenceCount(slug: string, immigrationOffices: number): number | null {
  switch (slug) {
    case "ikamet-vize-ret":
      return rejectionReasons.length;
    case "goc-idaresi-bul":
      return immigrationOffices;
    case "tahdit-kodlari":
      return tahditKodlariData.codes.length;
    default:
      return null;
  }
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const [
    countries,
    categories,
    visaPrograms,
    blogPosts,
    blogPostsActive,
    blogPostsFeatured,
    immigrationOffices,
    foreignConsultancyTotal,
    foreignConsultancyOturma,
    foreignConsultancyCalisma,
  ] = await Promise.all([
    prisma.country.count(),
    prisma.category.count(),
    prisma.visaProgram.count(),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { isActive: true } }),
    prisma.blogPost.count({ where: { isActive: true, isFeatured: true } }),
    prisma.immigrationOffice.count({ where: { isActive: true } }),
    prisma.foreignConsultancyContent.count(),
    prisma.foreignConsultancyContent.count({ where: { category: "OTURMA_IZNI" } }),
    prisma.foreignConsultancyContent.count({ where: { category: "CALISMA_IZNI" } }),
  ]);

  const tools: AdminDashboardToolStat[] = siteTools.map((tool) => ({
    slug: tool.slug,
    name: tool.name,
    href: buildToolPath(tool.slug),
    count: toolReferenceCount(tool.slug, immigrationOffices),
  }));

  return {
    countries,
    categories,
    visaPrograms,
    blogPosts,
    blogPostsActive,
    blogPostsFeatured,
    foreignConsultancyTotal,
    foreignConsultancyOturma,
    foreignConsultancyCalisma,
    tools,
  };
}
