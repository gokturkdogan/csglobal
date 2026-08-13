"use client";

import type { HomepageContent } from "@/lib/homepage";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeWhyUs } from "@/components/home/HomeWhyUs";
import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { HomeSeoIntro, HomeSeoBlocks } from "@/components/home/HomeSeoSections";
import { HomeServiceAreas } from "@/components/home/HomeServiceAreas";
import { HomeFaqPreview } from "@/components/home/HomeFaqPreview";
import { HomeFeaturedSection } from "@/components/home/HomeFeaturedSection";
import { HomeCountriesSection } from "@/components/home/HomeCountriesSection";
import { HomeArticlesSection } from "@/components/home/HomeArticlesSection";
import { useHomepageEdit } from "./HomepageEditContext";

type PreviewData = {
  quickLinks: Array<{ name: string; slug: string; flag?: string | null }>;
  featuredItems: Array<{
    id: string;
    name: string;
    slug: string;
    countrySlug: string;
    countryName: string;
    shortDescription: string | null;
    processingTime: string | null;
    heroImage: string | null;
  }>;
  popularCountries: Array<{
    name: string;
    slug: string;
    shortDescription?: string | null;
    flag?: string | null;
    heroImage?: string | null;
    services: { id: string }[];
  }>;
  articles: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    heroImage?: string | null;
    publishedAt: Date | null;
    country: { name: string } | null;
  }>;
  settings: SiteSettingsMap;
};

export function HomepageLivePreview({
  initialContent,
  previewData,
}: {
  initialContent: HomepageContent;
  previewData: PreviewData;
}) {
  const edit = useHomepageEdit();
  const content = edit?.content ?? initialContent;

  return (
    <div
      className="homepage-editor-preview bg-white text-slate-900 shadow-inner"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("a") && !target.closest("[role='button']")) {
          e.preventDefault();
        }
      }}
    >
      <HomeHero content={content} countryQuickLinks={previewData.quickLinks} />
      <HomeSeoIntro content={content} />
      <HomeAbout content={content} />
      <HomeServiceAreas content={content} />
      <HomeFeaturedSection content={content} services={previewData.featuredItems} />
      <HomeWhyUs content={content} />
      <HomeSeoBlocks content={content} />
      <HomeProcess content={content} />
      <HomeCountriesSection content={content} countries={previewData.popularCountries} />
      <HomeFaqPreview content={content} />
      <HomeArticlesSection content={content} articles={previewData.articles} />
      <HomeCtaBanner content={content} settings={previewData.settings} />
    </div>
  );
}
