import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ContactCTA } from "@/components/domain/ContactCTA";
import { findSitePageBySlug } from "@/lib/repositories/site.repository";
import { getSiteSettings } from "@/lib/settings";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

export async function generateMetadata() {
  const page = await findSitePageBySlug("hakkimizda");
  if (!page) return {};
  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: page.id,
    path: "/hakkimizda",
    fallbackTitle: page.title,
  });
}

export default async function AboutPage() {
  const page = await findSitePageBySlug("hakkimizda");
  if (!page) notFound();
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
      <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">{page.title}</h1>
      <div className="mt-8">
        <MarkdownContent content={page.content} />
      </div>
      <div className="mt-12">
        <ContactCTA settings={settings} />
      </div>
    </div>
  );
}
