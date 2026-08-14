import { FeaturedServiceCard } from "@/components/home/FeaturedServiceCard";
import { ServicesPageHero } from "@/components/domain/ServicesPageHero";
import { findAllServicesForListing } from "@/lib/repositories/service.repository";
import { resolveServiceCardImage } from "@/lib/country-item-image";
import { buildEntityMetadata } from "@/lib/services/seo.service";

export async function generateMetadata() {
  return buildEntityMetadata({
    entityType: "SITE_PAGE",
    entityId: "hizmetlerimiz",
    path: "/hizmetlerimiz",
    fallbackTitle: "Hizmetlerimiz",
    fallbackDescription:
      "CSGLOBAL vize, oturum ve göçmenlik hizmetleri. Tüm ülkelerdeki hizmetleri tek listede inceleyin.",
  });
}

export default async function ServicesListingPage() {
  const services = await findAllServicesForListing();

  return (
    <>
      <ServicesPageHero serviceCount={services.length} />

      <section className="home-band-soft border-b border-slate-200/60">
        <div className="site-container py-12 md:py-16">
          {services.length === 0 ? (
            <p className="text-sm text-slate-500">Henüz listelenecek aktif hizmet yok.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <FeaturedServiceCard
                  key={service.id}
                  name={service.name}
                  slug={service.slug}
                  countrySlug={service.country.slug}
                  countryName={service.country.name}
                  shortDescription={service.shortDescription}
                  processingTime={service.processingTime}
                  heroImage={resolveServiceCardImage(service.country.itemImage)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
