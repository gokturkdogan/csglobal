import { SiteImage } from "@/components/ui/SiteImage";
import { siteImages } from "@/lib/media";
import { contactHeroImageClassName } from "@/lib/contact-image-slot";

type Props = {
  title: string;
  subtitle?: string;
};

export function ToolPageHero({ title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900">
      <div className="absolute inset-0">
        <SiteImage
          src={siteImages.contactHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className={contactHeroImageClassName}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/94 via-slate-900/72 to-slate-900/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/25" />
      </div>

      <div className="relative z-[1] site-container py-14 md:py-16 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">Araçlar</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-base leading-relaxed text-slate-200 md:text-lg">{subtitle}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
