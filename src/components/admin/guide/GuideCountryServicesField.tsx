"use client";

import { useMemo, useState } from "react";

export type GuideServiceOption = {
  id: string;
  name: string;
  countryId: string;
  categoryName: string;
};

type Props = {
  countries: Array<{ id: string; name: string }>;
  services: GuideServiceOption[];
  initialCountryId: string;
  initialServiceIds: string[];
};

const selectClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

export function GuideCountryServicesField({
  countries,
  services,
  initialCountryId,
  initialServiceIds,
}: Props) {
  const [countryId, setCountryId] = useState(initialCountryId);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(initialServiceIds),
  );

  const countryServices = useMemo(
    () => services.filter((service) => service.countryId === countryId),
    [services, countryId],
  );

  const toggleService = (serviceId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(serviceId)) {
        next.delete(serviceId);
      } else {
        next.add(serviceId);
      }
      return next;
    });
  };

  const onCountryChange = (nextCountryId: string) => {
    setCountryId(nextCountryId);
    setSelectedIds(new Set());
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Ülke</span>
        <select
          name="countryId"
          required
          value={countryId}
          onChange={(e) => onCountryChange(e.target.value)}
          className={selectClass}
        >
          <option value="" disabled>Ülke seçin</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-slate-500">
          Her rehber tek bir ülkeye bağlıdır.
        </p>
      </label>

      <div className="block">
        <span className="text-sm font-medium text-slate-700">
          İlgili hizmetler (opsiyonel)
        </span>
        <p className="mt-1 text-xs text-slate-500">
          Seçilen ülkenin tüm hizmetleri listelenir. Hizmet sayfasında &quot;Konu ile
          ilgili rehberlerimiz&quot; bölümünde gösterilir.
        </p>

        {!countryId && (
          <p className="mt-3 text-sm text-slate-500">Önce ülke seçin.</p>
        )}

        {countryId && countryServices.length === 0 && (
          <p className="mt-3 text-sm text-slate-500">
            Bu ülke için aktif hizmet bulunamadı.
          </p>
        )}

        {countryServices.length > 0 && (
          <div className="mt-3 max-h-64 space-y-2 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3">
            {countryServices.map((service) => {
              const checked = selectedIds.has(service.id);
              return (
                <label
                  key={service.id}
                  className="flex cursor-pointer items-start gap-3 rounded-md px-2 py-2 hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    name="serviceIds"
                    value={service.id}
                    checked={checked}
                    onChange={() => toggleService(service.id)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-csg-blue focus:ring-csg-blue/30"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-slate-900">
                      {service.name}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {service.categoryName}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
