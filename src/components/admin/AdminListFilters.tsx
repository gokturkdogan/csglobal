import Link from "next/link";
import {
  hasActiveAdminListFilters,
  ADMIN_LIST_SEARCH_PARAM,
  type AdminListFilterField,
  type AdminListFilterValues,
} from "@/lib/admin-list-filters";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

type Props = {
  basePath: string;
  filters: AdminListFilterValues;
  searchPlaceholder?: string;
  fields?: AdminListFilterField[];
};

export function AdminListFilters({
  basePath,
  filters,
  searchPlaceholder = "Ad, slug veya başlıkta ara…",
  fields = [],
}: Props) {
  const active = hasActiveAdminListFilters(filters);

  return (
    <form
      method="get"
      action={basePath}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1.4fr)_repeat(auto-fit,minmax(180px,1fr))]">
        <label className="block min-w-0">
          <span className="text-sm font-medium text-slate-700">Arama</span>
          <input
            type="search"
            name={ADMIN_LIST_SEARCH_PARAM}
            defaultValue={filters.q}
            placeholder={searchPlaceholder}
            className={`mt-1.5 ${inputClass}`}
          />
        </label>

        {fields.map((field) => (
          <label key={field.name} className="block min-w-0">
            <span className="text-sm font-medium text-slate-700">{field.label}</span>
            <select
              name={field.name}
              defaultValue={field.value}
              className={`mt-1.5 ${inputClass}`}
            >
              <option value="">{field.emptyLabel ?? "Tümü"}</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-lg bg-csg-blue px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-csg-blue/90"
        >
          Filtrele
        </button>
        {active ? (
          <Link
            href={basePath}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Filtreleri temizle
          </Link>
        ) : null}
      </div>
    </form>
  );
}
