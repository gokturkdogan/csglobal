"use client";

import type { BlogTopicCategoryValue } from "@/lib/blog-topic-categories";
import type { HomepageContent, HomeCountryOption, HomePopularCountry } from "@/lib/homepage";
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
  countryOptions: HomeCountryOption[];
  countryCatalog: HomePopularCountry[];
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
  featuredArticles: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    publishedAt: Date | null;
    topicCategory?: BlogTopicCategoryValue | null;
    country: { name: string; slug: string; itemImage?: string | null } | null;
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
      <HomeHero content={content} countryOptions={previewData.countryOptions} />
      <HomeSeoIntro content={content} />
      <HomeAbout content={content} />
      <HomeServiceAreas content={content} />
      <HomeFeaturedSection content={content} services={previewData.featuredItems} />
      <HomeWhyUs content={content} />
      <HomeSeoBlocks content={content} />
      <HomeProcess content={content} />
      <HomeCountriesSection content={content} countryCatalog={previewData.countryCatalog} />
      <HomeFaqPreview content={content} />
      <HomeArticlesSection content={content} articles={previewData.featuredArticles} />
      <HomeCtaBanner content={content} settings={previewData.settings} />
    </div>
  );
}
