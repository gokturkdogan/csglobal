import { FeaturedServiceCard } from "@/components/home/FeaturedServiceCard";
import { ServicesPageHero } from "@/components/domain/ServicesPageHero";
import { findAllProgramsForListing } from "@/lib/repositories/visa-program.repository";
import { resolveServiceCardImage } from "@/lib/country-item-image";
import { buildEntityMetadata } from "@/lib/services/seo.service";

export async function generateMetadata() {
  return buildEntityMetadata({
    entityType: "SITE_PAGE",
    entityId: "hizmetlerimiz",
    path: "/hizmetlerimiz",
    fallbackTitle: "Vize Programları",
    fallbackDescription:
      "CSGLOBAL vize, oturum ve göçmenlik programları. Tüm ülkelerdeki programları tek listede inceleyin.",
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
