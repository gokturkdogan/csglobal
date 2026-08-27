import dynamic from "next/dynamic";
import type { HomepageContent } from "@/lib/homepage";

const FeaturedServicesCarousel = dynamic(
  () =>
    import("@/components/home/FeaturedServicesCarousel").then(
      (module) => module.FeaturedServicesCarousel,
    ),
  {
    loading: () => (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
          />
        ))}
      </div>
    ),
  },
);

type FeaturedItem = {
  id: string;
  name: string;
  slug: string;
  countrySlug: string;
  countryName: string;
  shortDescription: string | null;
  processingTime: string | null;
  heroImage: string | null;
};

export function HomeFeaturedSectionView({
  content,
  services,
}: {
  content: HomepageContent;
  services: FeaturedItem[];
}) {
  if (services.length === 0) return null;

  return (
    <section className="home-band-soft">
      <div className="site-container py-16 md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            {content.servicesTitle}
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{content.servicesSubtitle}</p>
        </div>
        <div className="mt-10">
          <FeaturedServicesCarousel services={services} />
        </div>
      </div>
    </section>
  );
}
