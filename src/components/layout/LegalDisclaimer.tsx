/** Site genelinde footer altında gösterilen yasal bilgilendirme metni. */
export function LegalDisclaimer() {
  return (
    <section
      className="border-t border-slate-200 bg-slate-100/90"
      aria-label="Yasal bilgilendirme"
    >
      <div className="site-container py-5 md:py-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500 md:text-xs">
            Yasal bilgilendirme
          </p>
          <p className="mt-2 text-center text-xs leading-relaxed text-slate-600 md:text-sm">
            İnternet sitemizde yer alan bilgiler Çankaya Danışmanlık tarafından, 6458 numaralı
            yabancılar kanunu ve bağlamında sadece bilgi amaçlı olarak temin edilmektedir. Web
            sitemizdeki tüm içeriklerin telif hakkı Çankaya Danışmanlığa aittir. Tüm makaleler hak
            sahipliğinin tescili amacıyla elektronik imzalı zaman damgalıdır.
          </p>
        </div>
      </div>
    </section>
  );
}
