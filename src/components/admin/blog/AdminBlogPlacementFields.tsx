"use client";

import { useState } from "react";
import {
  BLOG_TOPIC_CATEGORY_VALUES,
  BLOG_TOPIC_CATEGORY_LABELS,
} from "@/lib/blog-topic-categories";
import type { BlogTopicCategoryValue } from "@/lib/blog-topic-categories";

type CountryOption = { id: string; name: string };

export function AdminBlogPlacementFields({
  countries,
  initialCountryId,
  initialTopicCategory,
}: {
  countries: CountryOption[];
  initialCountryId?: string | null;
  initialTopicCategory?: BlogTopicCategoryValue | null;
}) {
  const [countryId, setCountryId] = useState(initialCountryId ?? "");
  const showCategory = !countryId;

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Ülke (opsiyonel)</span>
        <select
          name="countryId"
          value={countryId}
          onChange={(event) => setCountryId(event.target.value)}
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
          Seçildiğinde blog ülkeye bağlanır; kategori atanmaz ve sol panelde ülkeye ait
          yazılar gösterilir.
        </span>
      </label>

      {showCategory ? (
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Kategori (zorunlu)</span>
          <select
            name="topicCategory"
            required
            defaultValue={initialTopicCategory ?? ""}
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20"
          >
            <option value="">Kategori seçin</option>
            {BLOG_TOPIC_CATEGORY_VALUES.map((category) => (
              <option key={category} value={category}>
                {BLOG_TOPIC_CATEGORY_LABELS[category]}
              </option>
            ))}
          </select>
          <span className="mt-1.5 block text-xs text-slate-500">
            Ülke seçilmediğinde blog bir kategoriye bağlı olmalıdır. Sol panelde kategori
            listesi gösterilir.
          </span>
        </label>
      ) : (
        <input type="hidden" name="topicCategory" value="" />
      )}
    </div>
  );
}
