type CountryOption = { id: string; name: string };

export function AdminBlogCountryField({
  countries,
  initialCountryId,
}: {
  countries: CountryOption[];
  initialCountryId?: string | null;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">Ülke (opsiyonel)</span>
      <select
        name="countryId"
        defaultValue={initialCountryId ?? ""}
        className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20"
      >
        <option value="">Ülke seçilmedi</option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
      <span className="mt-1.5 block text-xs text-slate-500">
        Seçildiğinde blog detay sayfasında sol tarafta ülke paneli gösterilir.
      </span>
    </label>
  );
}
