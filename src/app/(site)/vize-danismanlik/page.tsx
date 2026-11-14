import { buildEntityMetadata } from "@/lib/services/seo.service";
import { findActiveCountries } from "@/lib/repositories/country.repository";
import { findSitePageBySlug } from "@/lib/repositories/site.repository";
import { CountryGrid } from "@/components/domain/CountryCard";
import { CountriesPageHero } from "@/components/domain/CountriesPageHero";
import {
  VIZE_CONSULTANCY_LIST_PATH,
  VIZE_CONSULTANCY_LIST_SITE_PAGE_SLUG,
} from "@/lib/paths";
import { SeoEntityType } from "@/generated/prisma/client";
import { STATIC_PAGE_SEO } from "@/lib/static-page-seo";

const FALLBACK_TITLE = STATIC_PAGE_SEO.vizeDanismanlik.title;
const FALLBACK_DESCRIPTION = STATIC_PAGE_SEO.vizeDanismanlik.description;

async function findVizeConsultancyListSitePage() {
  return (
    (await findSitePageBySlug(VIZE_CONSULTANCY_LIST_SITE_PAGE_SLUG)) ??
    (await findSitePageBySlug("ulkeler"))
  );
}

export async function generateMetadata() {
  const page = await findVizeConsultancyListSitePage();
  if (!page) {
    return buildEntityMetadata({
      entityType: SeoEntityType.SITE_PAGE,
      entityId: VIZE_CONSULTANCY_LIST_SITE_PAGE_SLUG,
      path: VIZE_CONSULTANCY_LIST_PATH,
      fallbackTitle: FALLBACK_TITLE,
      fallbackDescription: FALLBACK_DESCRIPTION,
    });
  }

  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: page.id,
    path: VIZE_CONSULTANCY_LIST_PATH,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default async function VizeConsultancyCountriesPage() {
  const countries = await findActiveCountries();

  return (
    <>
      <CountriesPageHero countryCount={countries.length} />
      <section className="home-band-soft">
        <div className="site-container py-12 md:py-16">
          <CountryGrid countries={countries} />
        </div>
      </section>
    </>
  );
}