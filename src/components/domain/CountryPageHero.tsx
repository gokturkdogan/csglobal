import Link from "next/link";
import { SiteImage } from "@/components/ui/SiteImage";
import { siteImages } from "@/lib/media";

type CountryPageHeroProps = {
  name: string;
  shortDescription?: string | null;
  flag?: string | null;
  serviceCount: number;
  categoryCount: number;
  badge?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function CountryPageHero({
  name,
  shortDescription,
  flag,
  serviceCount,
  categoryCount,
  badge,
  subtitle,
  primaryCta,
  secondaryCta,
}: CountryPageHeroProps) {
  const displaySubtitle = subtitle ?? shortDescription;

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900">
      <div className="absolute inset-0">
        <SiteImage
          src={siteImages.countryDetailHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:object-[center_40%]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/94 via-slate-900/72 to-slate-900/35"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-slate-900/25"
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14 lg:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="cursor-pointer hover:text-white transition-colors">
                Anasayfa
              </Link>
            </li>
            <li className="text-slate-500">/</li>
            <li>
              <Link href="/ulkeler" className="cursor-pointer hover:text-white transition-colors">
                Ülkeler
              </Link>
            </li>
            <li className="text-slate-500">/</li>
            <li className="font-medium text-white">{name}</li>
          </ol>
        </nav>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-start gap-4">
              {flag && (
                <SiteImage
                  src={`https://flagcdn.com/w160/${flag.toLowerCase()}.png`}
                  alt=""
                  width={64}
                  height={48}
                  className="shrink-0 rounded-md shadow-lg ring-2 ring-white/25"
                />
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
                  {badge ?? "Ülke rehberi"}
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
                  {name}
                </h1>
              </div>
            </div>

            {displaySubtitle && (
              <p className="mt-5 text-base leading-relaxed text-slate-200 md:text-lg">
                {displaySubtitle}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {serviceCount > 0 && (
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
                >
                  <span className="text-lg font-semibold text-sky-200">{serviceCount}</span>
                  hizmet
                </span>
              )}
              {categoryCount > 0 && (
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-sm"
                >
                  <span className="font-semibold text-white">{categoryCount}</span>
                  kategori
                </span>
              )}
            </div>

            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="rounded-md cursor-pointer bg-csg-red px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-csg-red/20 transition hover:bg-csg-red-dark"
                  >
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="rounded-md cursor-pointer border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
