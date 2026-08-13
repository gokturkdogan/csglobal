"use client";

import type { HomepageContent } from "@/lib/homepage";
import { FeaturedServicesCarousel } from "@/components/home/FeaturedServicesCarousel";
import { HomeEditableField } from "@/components/admin/homepage/HomeEditableField";

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

export function HomeFeaturedSection({
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
          <HomeEditableField
            field="servicesTitle"
            value={content.servicesTitle}
            className="text-2xl font-semibold text-slate-900 md:text-3xl"
            as="h2"
          />
          <HomeEditableField
            field="servicesSubtitle"
            value={content.servicesSubtitle}
            className="mt-3 text-slate-600 leading-relaxed"
            as="p"
            multiline
          />
        </div>
        <div className="mt-10">
          <FeaturedServicesCarousel services={services} />
        </div>
      </div>
    </section>
  );
}
