import { SiteImage } from "@/components/ui/SiteImage";
import {
  consulateHeroImageClassName,
  resolveConsulateHeroImage,
} from "@/lib/consulate";

type Props = {
  heroImage?: string | null;
  title: string;
  badge?: string | null;
};

export function ConsulatePageHero({
  heroImage,
  title,
  badge = "Konsolosluk",
}: Props) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900">
      <div className="absolute inset-0">
        <SiteImage
          src={resolveConsulateHeroImage(heroImage)}
          alt=""
          fill
          priority
          sizes="100vw"
          className={consulateHeroImageClassName}
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
        </div>
      </div>
    </section>
  );
}
