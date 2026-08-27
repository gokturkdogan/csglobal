import Link from "next/link";
import type { HomepageContent } from "@/lib/homepage";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import { buildWhatsAppUrl } from "@/lib/site-settings.shared";
import { SiteImage } from "@/components/ui/SiteImage";
import { WhatsAppIcon, whatsappButtonClass } from "@/components/ui/WhatsAppIcon";

export function HomeCtaBannerView({
  content,
  settings,
}: {
  content: HomepageContent;
  settings: SiteSettingsMap;
}) {
  const whatsappUrl = buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappMessage);
  const bannerAlt = content.ctaBannerTitle?.trim() || "İletişim çağrı banner görseli";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <SiteImage
          src={content.ctaBannerImage}
          alt={bannerAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-csg-blue/85" />
      </div>

      <div className="relative z-[2] site-container py-16 text-center md:py-20">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">{content.ctaBannerTitle}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-blue-100">{content.ctaBannerSubtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${whatsappButtonClass} px-6 py-3`}
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            WhatsApp ile yazın
          </a>
          <Link
            href="/iletisim"
            className="rounded-md border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20"
          >
            İletişim formu
          </Link>
        </div>
      </div>
    </section>
  );
}
