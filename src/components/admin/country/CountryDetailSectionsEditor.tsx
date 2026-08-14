"use client";

import { useMemo, useState } from "react";
import {
  COUNTRY_DETAIL_SECTIONS_MAX,
  type CountryDetailSection,
  parseCountryDetailSectionsJson,
} from "@/lib/country-detail";
import { normalizeRichTextContent } from "@/lib/rich-text";
import { AdminRichTextEditor } from "@/components/admin/AdminRichTextEditorLazy";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

type Props = {
  initialJson: string | null | undefined;
};

function serializeSections(sections: CountryDetailSection[]): string {
  const valid = sections
    .map((section) => ({
      title: section.title.trim(),
      content: normalizeRichTextContent(section.content) ?? "",
    }))
    .filter((section) => section.title && section.content)
    .slice(0, COUNTRY_DETAIL_SECTIONS_MAX);

  return JSON.stringify(valid);
}

export function CountryDetailSectionsEditor({ initialJson }: Props) {
  const parsed = parseCountryDetailSectionsJson(initialJson);
  const [sections, setSections] = useState<CountryDetailSection[]>(parsed);

  const serialized = useMemo(() => serializeSections(sections), [sections]);

  const addSection = () => {
    if (sections.length >= COUNTRY_DETAIL_SECTIONS_MAX) return;
    setSections((prev) => [...prev, { title: "", content: "" }]);
  };

  const removeSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSection = (
    index: number,
    field: keyof CountryDetailSection,
    value: string,
  ) => {
    setSections((prev) =>
      prev.map((section, i) =>
        i === index ? { ...section, [field]: value } : section,
      ),
    );
  };

  return (
    <div className="space-y-4">
      <input type="hidden" name="detailSectionsJson" value={serialized} readOnly />

      {sections.length === 0 && (
        <p className="text-sm text-slate-500">
          Henüz ek içerik bölümü yok. Notlar ve SSS arasında gösterilecek bölümler
          ekleyebilirsiniz.
        </p>
      )}

      {sections.map((section, index) => (
        <div
          key={index}
          className="space-y-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Bölüm {index + 1}
            </p>
            <button
              type="button"
              onClick={() => removeSection(index)}
              className="cursor-pointer text-xs font-medium text-red-600 hover:text-red-700"
            >
              Kaldır
            </button>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Bölüm başlığı</span>
            <input
              type="text"
              value={section.title}
              onChange={(e) => updateSection(index, "title", e.target.value)}
              placeholder="Örn. Başvuru süreci"
              className={inputClass}
            />
          </label>

          <div className="block">
            <span className="text-sm font-medium text-slate-700">İçerik</span>
            <div className="mt-1.5">
              <AdminRichTextEditor
                value={section.content}
                onChange={(html) => updateSection(index, "content", html)}
                placeholder="Paragraf, liste ve bağlantılar ekleyebilirsiniz."
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addSection}
        disabled={sections.length >= COUNTRY_DETAIL_SECTIONS_MAX}
        className="cursor-pointer rounded-lg border border-dashed border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-csg-blue hover:text-csg-blue disabled:cursor-not-allowed disabled:opacity-50"
      >
        + Bölüm ekle
        {sections.length > 0
          ? ` (${sections.length}/${COUNTRY_DETAIL_SECTIONS_MAX})`
          : ""}
      </button>
    </div>
  );
}
