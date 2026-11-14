import { FeaturedServiceCard } from "@/components/home/FeaturedServiceCard";
import { ServicesPageHero } from "@/components/domain/ServicesPageHero";
import { findAllProgramsForListing } from "@/lib/repositories/visa-program.repository";
import { findSitePageBySlug } from "@/lib/repositories/site.repository";
import { resolveServiceCardImage } from "@/lib/country-item-image";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";
import { STATIC_PAGE_SEO } from "@/lib/static-page-seo";

const FALLBACK_TITLE = STATIC_PAGE_SEO.hizmetlerimiz.title;
const FALLBACK_DESCRIPTION = STATIC_PAGE_SEO.hizmetlerimiz.description;

export async function generateMetadata() {
  const page = await findSitePageBySlug("hizmetlerimiz");
  if (!page) {
    return buildEntityMetadata({
      entityType: SeoEntityType.SITE_PAGE,
      entityId: "hizmetlerimiz",
      path: "/hizmetlerimiz",
      fallbackTitle: FALLBACK_TITLE,
      fallbackDescription: FALLBACK_DESCRIPTION,
    });
  }

  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: page.id,
    path: "/hizmetlerimiz",
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default async function ServicesListingPage() {
  const programs = await findAllProgramsForListing();

  return (
    <>
      <ServicesPageHero serviceCount={programs.length} />

      <section className="home-band-soft border-b border-slate-200/60">
        <div className="site-container py-12 md:py-16">
          {programs.length === 0 ? (
            <p className="text-sm text-slate-500">Henüz listelenecek aktif program yok.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <FeaturedServiceCard
                  key={program.id}
                  name={program.name}
                  slug={program.slug}
                  countrySlug={program.country.slug}
                  countryName={program.country.name}
                  shortDescription={program.shortDescription}
                  processingTime={program.processingTime}
                  heroImage={resolveServiceCardImage(program.country.itemImage)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
