"use client";

import { useMemo, useState } from "react";
import {
  type ServiceContentSection,
  parseServiceSectionsJson,
  serializeServiceSections,
} from "@/lib/service-page";
import {
  SERVICE_PAGE_SORT_ORDER_MAX,
  SERVICE_PAGE_SORT_ORDER_MIN,
  normalizePageSortOrder,
} from "@/lib/service-constants";
import { AdminRichTextEditor } from "@/components/admin/AdminRichTextEditorLazy";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

type Props = {
  initialJson: string | null | undefined;
};

function nextSortOrder(sections: ServiceContentSection[]): number {
  const max = sections.reduce(
    (acc, section) => Math.max(acc, section.sortOrder ?? 0),
    0,
  );
  return Math.min(SERVICE_PAGE_SORT_ORDER_MAX, max + 1);
}

export function ServiceSectionsEditor({ initialJson }: Props) {
  const parsed = parseServiceSectionsJson(initialJson);
  const [sections, setSections] = useState<ServiceContentSection[]>(parsed);

  const serialized = useMemo(() => serializeServiceSections(sections), [sections]);

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { title: "", content: "", sortOrder: nextSortOrder(prev) },
    ]);
  };

  const removeSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSection = (
    index: number,
    field: keyof ServiceContentSection,
    value: string | number,
  ) => {
    setSections((prev) =>
      prev.map((section, i) => {
        if (i !== index) return section;
        if (field === "sortOrder") {
          return {
            ...section,
            sortOrder: normalizePageSortOrder(value, section.sortOrder ?? index + 1),
          };
        }
        return { ...section, [field]: value };
      }),
    );
  };

  return (
    <div className="space-y-4">
      <input type="hidden" name="sectionsJson" value={serialized} readOnly />

      <p className="text-xs text-slate-500">
        Her bölümün <strong>sayfa sırası</strong> numarası, görsel ve video alanlarıyla aynı
        skalada (1-{SERVICE_PAGE_SORT_ORDER_MAX}) çalışır. Örneğin sıra 3 bir görsel alanı
        araya gelebilir.
      </p>

      {sections.length === 0 && (
        <p className="text-sm text-slate-500">
          Henüz içerik bölümü yok. Başlık ve zengin metin blokları ekleyebilirsiniz.
        </p>
      )}

      {sections.map((section, index) => (
        <div
          key={index}
          className="space-y-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              İçerik bölümü
            </p>
            <button
              type="button"
              onClick={() => removeSection(index)}
              className="cursor-pointer text-xs font-medium text-red-600 hover:text-red-700"
            >
              Kaldır
            </button>
          </div>

          <label className="block max-w-[8rem]">
            <span className="text-sm font-medium text-slate-700">Sayfa sırası</span>
            <input
              type="number"
              min={SERVICE_PAGE_SORT_ORDER_MIN}
              max={SERVICE_PAGE_SORT_ORDER_MAX}
              value={section.sortOrder ?? index + 1}
              onChange={(e) => updateSection(index, "sortOrder", e.target.value)}
              className={inputClass}
            />
          </label>

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
                placeholder="Paragraf, kalın metin, liste ve bağlantılar ekleyebilirsiniz."
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addSection}
        className="cursor-pointer rounded-lg border border-dashed border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-csg-blue hover:text-csg-blue"
      >
        + Bölüm ekle
        {sections.length > 0 ? ` (${sections.length})` : ""}
      </button>
    </div>
  );
}