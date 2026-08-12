import Link from "next/link";
import type { HomepageContent } from "@/lib/homepage";
import { SiteImage } from "@/components/ui/SiteImage";

export function HomeHero({
  content,
  countryQuickLinks,
}: {
  content: HomepageContent;
  countryQuickLinks: Array<{ name: string; slug: string; flag?: string | null }>;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900">
      <div className="absolute inset-0">
        <SiteImage
          src={content.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] md:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/92 via-slate-900/75 to-slate-900/25" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
            {content.heroBadge}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl md:leading-tight">
            {content.heroTitle}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
            {content.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/ulkeler"
              className="rounded-md bg-csg-red px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-csg-red/20 transition hover:bg-csg-red-dark"
            >
              {content.heroCtaPrimary}
            </Link>
            <Link
              href="/iletisim"
              className="rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {content.heroCtaSecondary}
            </Link>
          </div>
        </div>

        {countryQuickLinks.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {countryQuickLinks.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                {c.flag && (
                  <SiteImage
                    src={`https://flagcdn.com/w20/${c.flag.toLowerCase()}.png`}
                    alt=""
                    width={20}
                    height={14}
                    className="rounded-sm"
                  />
                )}
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
