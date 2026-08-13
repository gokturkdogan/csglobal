import { SiteImage } from "@/components/ui/SiteImage";
import {
  guideHeroImageClassName,
  resolveGuideHeroImage,
} from "@/lib/guide";

type Props = {
  heroImage?: string | null;
  title: string;
  subtitle?: string | null;
  badge?: string | null;
};

export function GuidePageHero({
  heroImage,
  title,
  subtitle,
  badge = "Ülke rehberi",
}: Props) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900">
      <div className="absolute inset-0">
        <SiteImage
          src={resolveGuideHeroImage(heroImage)}
          alt=""
          fill
          priority
          sizes="100vw"
          className={guideHeroImageClassName}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/94 via-slate-900/72 to-slate-900/40"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/25"
        />
      </div>

      <div className="relative z-[1] site-container py-16 md:py-20 lg:py-24">
        <div className="max-w-2xl">
          {badge?.trim() && (
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
              {badge}
            </p>
          )}
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle?.trim() && (
            <p className="mt-4 text-base leading-relaxed text-slate-200 md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
