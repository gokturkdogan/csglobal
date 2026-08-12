"use client";

import Link from "next/link";
import type { HomepageContent } from "@/lib/homepage";
import { SiteImage } from "@/components/ui/SiteImage";
import { HomeEditableField, HomeEditableImage } from "@/components/admin/homepage/HomeEditableField";
import { useHomepageEdit } from "@/components/admin/homepage/HomepageEditContext";

export function HomeHero({
  content,
  countryQuickLinks,
}: {
  content: HomepageContent;
  countryQuickLinks: Array<{ name: string; slug: string; flag?: string | null }>;
}) {
  const edit = useHomepageEdit();
  const preview = edit?.editing;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900">
      <div className="absolute inset-0">
        <HomeEditableImage field="heroImage" value={content.heroImage} fullBleed label="Hero banner">
          <SiteImage
            src={edit?.content.heroImage ?? content.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] md:object-right"
          />
        </HomeEditableImage>
        <div
          className={`pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r ${
            preview
              ? "from-slate-900/70 via-slate-900/45 to-slate-900/15"
              : "from-slate-900/85 via-slate-900/55 to-slate-900/20"
          }`}
        />
      </div>

      <div className="relative z-[2] mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          <HomeEditableField
            field="heroBadge"
            value={content.heroBadge}
            className="text-sm font-semibold uppercase tracking-widest text-sky-300"
            as="p"
            label="Üst etiket"
          />
          <HomeEditableField
            field="heroTitle"
            value={content.heroTitle}
            className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl md:leading-tight"
            as="h1"
            label="Hero başlık"
          />
          <HomeEditableField
            field="heroSubtitle"
            value={content.heroSubtitle}
            className="mt-5 text-base leading-relaxed text-slate-200 md:text-lg"
            as="p"
            multiline
            label="Hero alt metin"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {preview ? (
              <>
                <span className="rounded-md bg-csg-red px-6 py-3 text-sm font-semibold text-white shadow-lg">
                  <HomeEditableField
                    field="heroCtaPrimary"
                    value={content.heroCtaPrimary}
                    label="Birincil buton"
                    className="text-white"
                  />
                </span>
                <span className="rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white">
                  <HomeEditableField
                    field="heroCtaSecondary"
                    value={content.heroCtaSecondary}
                    label="İkincil buton"
                    className="text-white"
                  />
                </span>
              </>
            ) : (
              <>
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
              </>
            )}
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
