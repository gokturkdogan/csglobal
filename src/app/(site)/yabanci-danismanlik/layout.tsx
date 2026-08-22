import { ForeignConsultancyLanguageSwitcher } from "@/components/foreign-consultancy/ForeignConsultancyLanguageSwitcher";
import { getForeignConsultancyLocale } from "@/lib/i18n/foreign-consultancy/server";
import { isRtlForeignConsultancyLocale } from "@/lib/i18n/foreign-consultancy/locales";

export default async function ForeignConsultancyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getForeignConsultancyLocale();
  const isRtl = isRtlForeignConsultancyLocale(locale);

  return (
    <div dir={isRtl ? "rtl" : "ltr"} lang={locale}>
      <div className="border-b border-slate-200/80 bg-slate-50">
        <div className="site-container py-2.5">
          <ForeignConsultancyLanguageSwitcher locale={locale} />
        </div>
      </div>
      {children}
    </div>
  );
}
