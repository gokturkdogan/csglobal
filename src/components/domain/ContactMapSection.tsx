type Props = {
  /** Google Maps embed URL veya q= adres/koordinat */
  embedUrl?: string;
  title?: string;
  addressLabel?: string;
};

/** Şimdilik örnek konum — Levent, İstanbul */
const DEFAULT_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.634509812374!2d29.0096!3d41.0812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6321a558a3f%3A0x96c14f3a8b877461!2sLevent%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str";

const DEFAULT_ADDRESS = "Levent, Beşiktaş — İstanbul (örnek konum)";

export function ContactMapSection({
  embedUrl = DEFAULT_EMBED_URL,
  title = "Ofis konumu",
  addressLabel = DEFAULT_ADDRESS,
}: Props) {
  return (
    <section className="mt-10 md:mt-12">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
          Randevu ve yüz yüze görüşme için ofis konumumuzu haritada inceleyebilirsiniz.
        </p>
      </div>

      <div className="contact-map-card overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="relative aspect-[16/9] w-full min-h-[280px] sm:min-h-[320px] md:aspect-[21/9]">
          <iframe
            title="CSGLOBAL ofis konumu"
            src={embedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/80 px-5 py-4 md:px-6">
          <p className="text-sm font-medium text-slate-700">{addressLabel}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLabel)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-sm font-semibold text-csg-blue transition hover:text-csg-blue-dark hover:underline"
          >
            Google Haritalarda aç →
          </a>
        </div>
      </div>
    </section>
  );
}
