import { buildEntityMetadata } from "@/lib/services/seo.service";
import { findActiveCountries } from "@/lib/repositories/country.repository";
import { findSitePageBySlug } from "@/lib/repositories/site.repository";
import { CountryGrid } from "@/components/domain/CountryCard";
import { CountriesPageHero } from "@/components/domain/CountriesPageHero";
import { SeoEntityType } from "@/generated/prisma/client";

const FALLBACK_TITLE = "Tüm Ülkeler";
const FALLBACK_DESCRIPTION =
  "CSGLOBAL vize ve göçmenlik programları kapsanan ülkeler.";

export async function generateMetadata() {
  const page = await findSitePageBySlug("ulkeler");
  if (!page) {
    return buildEntityMetadata({
      entityType: SeoEntityType.SITE_PAGE,
      entityId: "ulkeler",
      path: "/ulkeler",
      fallbackTitle: FALLBACK_TITLE,
      fallbackDescription: FALLBACK_DESCRIPTION,
    });
  }

  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: page.id,
    path: "/ulkeler",
    fallbackTitle: page.title,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default async function CountriesPage() {
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
