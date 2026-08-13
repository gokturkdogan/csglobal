import Link from "next/link";
import type { GuidesListPageContent } from "@/lib/guides-list-page";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import { buildWhatsAppUrl } from "@/lib/site-settings.shared";
import { WhatsAppIcon, whatsappButtonClass } from "@/components/ui/WhatsAppIcon";

type Props = {
  content: GuidesListPageContent;
  settings: SiteSettingsMap;
};

export function GuidesListCtaSection({ content, settings }: Props) {
  const whatsappUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    settings.whatsappMessage,
  );

  return (
    <section className="relative overflow-hidden border-t border-slate-200">
      <div
        className="absolute inset-0 bg-gradient-to-br from-csg-blue-dark via-csg-blue to-csg-blue-light"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.12),transparent)]"
      />

      <div className="relative z-[1] site-container py-16 text-center md:py-20">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          {content.ctaTitle}
        </h2>
        {content.ctaSubtitle.trim() && (
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-blue-100">
            {content.ctaSubtitle}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${whatsappButtonClass} px-6 py-3`}
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            {content.ctaPrimaryLabel}
          </a>
          <Link
            href={content.ctaSecondaryHref}
            className="rounded-md border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            {content.ctaSecondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
