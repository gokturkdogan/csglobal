import { ContactCTA } from "@/components/domain/ContactCTA";
import { findSitePageBySlug } from "@/lib/repositories/site.repository";
import { getSiteSettings } from "@/lib/settings";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";
import { MarkdownContent } from "@/components/MarkdownContent";

export async function generateMetadata() {
  const page = await findSitePageBySlug("iletisim");
  if (!page) return {};
  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: page.id,
    path: "/iletisim",
    fallbackTitle: "İletişim",
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const page = await findSitePageBySlug("iletisim");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
      <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">İletişim</h1>
      {page && (
        <div className="mt-6">
          <MarkdownContent content={page.content} />
        </div>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">Telefon</p>
          <a
            href={`tel:${settings.contactPhone.replace(/\s/g, "")}`}
            className="mt-1 block text-lg font-semibold text-csg-blue"
          >
            {settings.contactPhone}
          </a>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">E-posta</p>
          <a
            href={`mailto:${settings.contactEmail}`}
            className="mt-1 block text-lg font-semibold text-csg-blue"
          >
            {settings.contactEmail}
          </a>
        </div>
      </div>
      <div className="mt-10">
        <ContactCTA settings={settings} />
      </div>
    </div>
  );
}
