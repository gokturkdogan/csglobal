import { SiteImage } from "@/components/ui/SiteImage";
import {
  buildOpenStreetMapStaticUrl,
  resolveMapCoordinates,
} from "@/lib/static-map";

type Props = {
  /** Google embed URL (yalnızca koordinat çıkarmak için; iframe olarak kullanılmaz) */
  embedUrl?: string;
  title?: string;
  description?: string;
  addressLabel?: string;
};

const DEFAULT_ADDRESS = "Levent, Beşiktaş, İstanbul (örnek konum)";

export function ContactMapSection({
  embedUrl,
  title = "Ofis konumu",
  description = "Randevu ve yüz yüze görüşme için ofis konumumuzu haritada inceleyebilirsiniz.",
  addressLabel = DEFAULT_ADDRESS,
}: Props) {
  const { lat, lng } = resolveMapCoordinates(embedUrl);
  const staticMapUrl = buildOpenStreetMapStaticUrl(lat, lng);
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    addressLabel,
  )}`;

  return (
    <section className="mt-10 md:mt-12">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          {title}
        </h2>
        {description?.trim() && (
          <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
            {description}
          </p>
        )}
      </div>

      <div className="contact-map-card overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <a
          href={mapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-[16/9] w-full min-h-[280px] cursor-pointer sm:min-h-[320px] md:aspect-[21/9]"
          aria-label="Konumu Google Haritalarda aç"
        >
          <SiteImage
            src={staticMapUrl}
            alt={`${addressLabel} konum haritası`}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
          />
        </a>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/80 px-5 py-4 md:px-6">
          <p className="text-sm font-medium text-slate-700">{addressLabel}</p>
          <a
            href={mapsSearchUrl}
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
