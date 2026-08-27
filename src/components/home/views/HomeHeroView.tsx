import Link from "next/link";
import type { HomepageContent, HomeCountryOption } from "@/lib/homepage";
import { resolveHeroQuickLinks } from "@/lib/homepage";
import { FlagImage } from "@/components/ui/FlagImage";
import { SiteImage } from "@/components/ui/SiteImage";

export function HomeHeroView({
  content,
  countryOptions,
  siteName,
}: {
  content: HomepageContent;
  countryOptions: HomeCountryOption[];
  siteName: string;
}) {
  const quickLinks = resolveHeroQuickLinks(content.heroQuickLinkSlugs, countryOptions);
  const heroAlt = content.heroTitle?.trim() || `${siteName} vize danışmanlığı hero görseli`;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900">
      <div className="absolute inset-0">
        <SiteImage
          src={content.heroImage}
          alt={heroAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-[center_30%] md:object-right"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-slate-900/85 via-slate-900/55 to-slate-900/20"
        />
      </div>

      <div className="relative z-[2] site-container py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
            {content.heroBadge}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl md:leading-tight">
            {content.heroTitle}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-200 md:text-lg">
            {content.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/ulkeler"
              className="rounded-md cursor-pointer bg-csg-red px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-csg-red/20 transition hover:bg-csg-red-dark"
            >
              {content.heroCtaPrimary}
            </Link>
            <Link
              href="/iletisim"
              className="rounded-md cursor-pointer border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {content.heroCtaSecondary}
            </Link>
          </div>
        </div>

        {quickLinks.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {quickLinks.map((country) => (
              <Link
                key={country.slug}
                href={`/${country.slug}`}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                {country.flag && (
                  <FlagImage flag={country.flag} displayWidth={20} className="rounded-sm" />
                )}
                {country.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
