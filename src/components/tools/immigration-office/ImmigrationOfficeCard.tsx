import type { ReactNode } from "react";
import { buildImmigrationOfficeDirectionsUrl } from "@/lib/immigration-office";
import type { ImmigrationOfficePublicRecord } from "@/lib/repositories/immigration-office.repository";

type Props = {
  office: ImmigrationOfficePublicRecord;
};

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export function ImmigrationOfficeCard({ office }: Props) {
  const locationLabel = [office.district, office.city].filter(Boolean).join(" / ");
  const directionsUrl = buildImmigrationOfficeDirectionsUrl(office);
  const phoneHref = office.phone ? `tel:${office.phone.replace(/\s+/g, "")}` : null;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:border-csg-blue/25 hover:shadow-md md:p-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold leading-snug text-slate-900">
            {office.institutionName}
          </h2>
          {locationLabel ? (
            <p className="mt-1 text-sm font-medium text-csg-blue">{locationLabel}</p>
          ) : null}
          {office.shortDescription ? (
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{office.shortDescription}</p>
          ) : null}
        </div>

        <div className="space-y-3">
          <InfoRow
            label="Adres"
            value={office.address}
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            }
          />

          {office.workingHours ? (
            <InfoRow
              label="Çalışma Saatleri"
              value={office.workingHours}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              }
            />
          ) : null}

          {office.phone ? (
            <InfoRow
              label="Telefon"
              value={office.phone}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              }
            />
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
        {directionsUrl ? (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-xl bg-csg-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-csg-blue/90"
          >
            Yol Tarifi Al
          </a>
        ) : null}
        {phoneHref ? (
          <a
            href={phoneHref}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-csg-blue/30 hover:text-csg-blue"
          >
            Telefon Et
          </a>
        ) : null}
      </div>
    </article>
  );
}
