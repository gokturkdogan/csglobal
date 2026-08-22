"use client";

type Props = {
  city: string;
  search: string;
  cities: string[];
  onCityChange: (city: string) => void;
  onSearchChange: (search: string) => void;
};

export function ImmigrationOfficeFilters({
  city,
  search,
  cities,
  onCityChange,
  onSearchChange,
}: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-[minmax(180px,240px)_minmax(0,1fr)] md:items-end">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Şehir seçiniz</span>
        <select
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-csg-blue focus:ring-2 focus:ring-csg-blue/20"
        >
          <option value="">Tüm Şehirler</option>
          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Kurum adı veya adres ile ara…</span>
        <div className="relative mt-1.5">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Kurum adı veya adres ile ara…"
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pr-3 pl-10 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-csg-blue focus:ring-2 focus:ring-csg-blue/20"
          />
        </div>
      </label>
    </div>
  );
}
