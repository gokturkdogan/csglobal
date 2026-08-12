import type { ReactNode } from "react";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import { buildWhatsAppUrl } from "@/lib/site-settings.shared";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

function ContactIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${className}`}
    >
      {children}
    </span>
  );
}

type Props = {
  settings: SiteSettingsMap;
  includeWhatsApp?: boolean;
};

export function ContactWhatsAppBanner({ settings }: Props) {
  const whatsappUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    settings.whatsappMessage,
  );
  const phoneHref = settings.contactPhone
    ? `tel:${settings.contactPhone.replace(/\s/g, "")}`
    : null;

  return (
    <section className="contact-whatsapp-banner relative overflow-hidden">
      <div className="contact-whatsapp-banner-glow pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="contact-whatsapp-banner-glow pointer-events-none absolute -bottom-16 left-1/4 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-[1] flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
              <WhatsAppIcon className="h-8 w-8 text-white" />
            </span>
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-200">
              En hızlı kanal
            </p>
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            WhatsApp ile hemen uzman danışmana bağlanın
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/85 md:text-[1.05rem]">
            Ülke, vize türü ve sürecinizi kısaca yazın; uzman ekibimiz aynı gün
            içinde size dönüş yapar. Online başvuru veya belge yükleme yok.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch lg:min-w-[240px]">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-whatsapp-cta-btn inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-[#1da851] hover:shadow-xl"
          >
            <WhatsAppIcon className="h-6 w-6 shrink-0" />
            WhatsApp&apos;ta yazın
          </a>
          {phoneHref && (
            <a
              href={phoneHref}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {settings.contactPhone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function ContactInfoCards({ settings, includeWhatsApp = false }: Props) {
  const phoneHref = settings.contactPhone
    ? `tel:${settings.contactPhone.replace(/\s/g, "")}`
    : null;

  const whatsappUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    settings.whatsappMessage,
  );

  const items = [
    phoneHref && {
      key: "phone",
      label: "Telefon",
      value: settings.contactPhone,
      hint: "Hafta içi mesai saatlerinde",
      href: phoneHref,
      iconBg: "bg-csg-blue/10 text-csg-blue",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
    },
    settings.contactEmail && {
      key: "email",
      label: "E-posta",
      value: settings.contactEmail,
      hint: "Detaylı sorular için",
      href: `mailto:${settings.contactEmail}`,
      iconBg: "bg-violet-50 text-violet-600",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
    includeWhatsApp &&
      settings.whatsappNumber && {
        key: "whatsapp",
        label: "WhatsApp",
        value: settings.whatsappNumber,
        hint: "Hızlı mesaj için",
        href: whatsappUrl,
        iconBg: "bg-emerald-50 text-emerald-600",
        icon: <WhatsAppIcon className="h-6 w-6" />,
      },
  ].filter(Boolean) as Array<{
    key: string;
    label: string;
    value: string;
    hint?: string;
    href?: string;
    iconBg: string;
    icon: ReactNode;
  }>;

  if (items.length === 0) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const inner = (
          <div className="contact-info-card flex gap-4 p-6">
            <ContactIcon className={item.iconBg}>{item.icon}</ContactIcon>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {item.label}
              </p>
              <p
                className={`mt-2 text-lg font-semibold leading-snug tracking-tight ${
                  item.href ? "text-csg-blue" : "text-slate-900"
                }`}
              >
                {item.value}
              </p>
              {item.hint && (
                <p className="mt-1.5 text-sm text-slate-500">{item.hint}</p>
              )}
            </div>
          </div>
        );

        if (item.href) {
          return (
            <a
              key={item.key}
              href={item.href}
              target={item.key === "whatsapp" ? "_blank" : undefined}
              rel={item.key === "whatsapp" ? "noopener noreferrer" : undefined}
              className="contact-info-card-link cursor-pointer block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-csg-blue/40"
            >
              {inner}
            </a>
          );
        }

        return (
          <div key={item.key} className="rounded-2xl">
            {inner}
          </div>
        );
      })}
    </div>
  );
}
