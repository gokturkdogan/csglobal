import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ContactInfoCards } from "@/components/domain/ContactPageContent";
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
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
      <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">{page.title}</h1>
      <div className="mt-8">
        <MarkdownContent content={page.content} />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900">İletişim bilgilerimiz</h2>
        <p className="mt-2 text-sm text-slate-600">
          Sorularınız için bize telefon, e-posta veya WhatsApp üzerinden ulaşabilirsiniz.
        </p>
        <div className="mt-6">
          <ContactInfoCards settings={settings} includeWhatsApp />
        </div>
      </section>
    </div>
  );
}
