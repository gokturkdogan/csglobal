import { SiteImage } from "@/components/ui/SiteImage";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import type { FixedAboutContent } from "@/lib/fixed-about";
import { fixedAboutPortraitClassName } from "@/lib/fixed-about-image-slot";
import { shouldShowFixedAbout } from "@/lib/fixed-about";

export function FixedAboutSection({ content }: { content: FixedAboutContent }) {
  if (!shouldShowFixedAbout(content)) return null;

  const { title, text, imageUrl, linkedInUrl } = content;

  return (
    <section
      className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50/90"
      aria-labelledby="fixed-about-heading"
    >
      <div className="site-container py-12 md:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10 lg:gap-12">
            {imageUrl && (
              <div className="mx-auto w-full max-w-[220px] shrink-0 md:mx-0 md:max-w-[240px]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-md ring-1 ring-slate-900/5">
                  <SiteImage
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 220px, 240px"
                    className={fixedAboutPortraitClassName}
                  />
                </div>
              </div>
            )}

            <div className="min-w-0 flex-1 text-center md:text-left">
              <h2
                id="fixed-about-heading"
                className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl"
              >
                {title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-[1.05rem] md:leading-7">
                {text}
              </p>
              {linkedInUrl && (
                <div className="mt-6 flex justify-center md:justify-start">
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-lg border border-[#0A66C2]/20 bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/40 focus:ring-offset-2"
                  >
                    <LinkedInIcon className="h-5 w-5" />
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}