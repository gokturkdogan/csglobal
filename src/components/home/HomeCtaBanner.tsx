"use client";

import Link from "next/link";
import type { HomepageContent } from "@/lib/homepage";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import { buildWhatsAppUrl } from "@/lib/site-settings.shared";
import { SiteImage } from "@/components/ui/SiteImage";
import { WhatsAppIcon, whatsappButtonClass } from "@/components/ui/WhatsAppIcon";
import { HomeEditableField, HomeEditableImage } from "@/components/admin/homepage/HomeEditableField";
import { useHomepageEdit } from "@/components/admin/homepage/HomepageEditContext";

export function HomeCtaBanner({
  content,
  settings,
}: {
  content: HomepageContent;
  settings: SiteSettingsMap;
}) {
  const edit = useHomepageEdit();
  const preview = edit?.editing;
  const whatsappUrl = buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappMessage);
  const bannerImage = edit?.content.ctaBannerImage ?? content.ctaBannerImage;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <HomeEditableImage
          field="ctaBannerImage"
          value={content.ctaBannerImage}
          fullBleed
          label="Alt CTA banner"
        >
          <SiteImage
            src={bannerImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </HomeEditableImage>
        <div
          className={`pointer-events-none absolute inset-0 z-[1] ${
            preview ? "bg-csg-blue/75" : "bg-csg-blue/85"
          }`}
        />
      </div>

      <div className="relative z-[2] site-container py-16 text-center md:py-20">
        <HomeEditableField
          field="ctaBannerTitle"
          value={content.ctaBannerTitle}
          className="text-2xl font-semibold text-white md:text-3xl"
          as="h2"
        />
        <HomeEditableField
          field="ctaBannerSubtitle"
          value={content.ctaBannerSubtitle}
          className="mx-auto mt-4 max-w-xl text-base text-blue-100"
          as="p"
          multiline
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {preview ? (
            <>
              <span className={`${whatsappButtonClass} px-6 py-3 opacity-90`}>
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                WhatsApp ile yazın
              </span>
              <span className="rounded-md border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white">
                İletişim formu
              </span>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}
