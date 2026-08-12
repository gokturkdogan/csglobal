import { SiteImage } from "@/components/ui/SiteImage";
import {
  resolveAboutHeroImage,
  type AboutPageEditable,
} from "@/lib/about";
import { aboutHeroImageClassName } from "@/lib/about-image-slots";

type Props = {
  content: AboutPageEditable;
};

export function AboutPageHero({ content }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900">
      <div className="absolute inset-0">
        <SiteImage
          src={resolveAboutHeroImage(content.heroImage)}
          alt=""
          fill
          priority
          sizes="100vw"
          className={aboutHeroImageClassName}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/94 via-slate-900/75 to-slate-900/45"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-slate-900/20"
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
            {content.heroBadge}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            {content.heroTitle}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-200 md:text-lg">
            {content.heroSubtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
