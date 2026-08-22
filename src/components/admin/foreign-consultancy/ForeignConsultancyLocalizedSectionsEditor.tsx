"use client";

import { useMemo, useState } from "react";
import { AdminRichTextEditor } from "@/components/admin/AdminRichTextEditorLazy";
import { LocaleFieldTabs } from "@/components/admin/foreign-consultancy/LocaleFieldTabs";
import { useForeignConsultancyTranslations } from "@/components/admin/foreign-consultancy/ForeignConsultancyTranslationsProvider";
import {
  FOREIGN_CONSULTANCY_LOCALES,
  type ForeignConsultancyLocale,
} from "@/lib/i18n/foreign-consultancy/locales";
import {
  type ServiceContentSection,
  parseServiceSectionsJson,
  serializeServiceSections,
} from "@/lib/service-page";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

type Props = {
  initialJson: string | null | undefined;
};

function getSectionsForLocale(
  locale: ForeignConsultancyLocale,
  trSections: ServiceContentSection[],
  getSectionsJsonForLocale: (locale: ForeignConsultancyLocale) => string,
): ServiceContentSection[] {
  if (locale === "tr") return trSections;
  return parseServiceSectionsJson(getSectionsJsonForLocale(locale));
}

function isSectionFieldFilled(
  locale: ForeignConsultancyLocale,
  sectionIndex: number,
  field: keyof ServiceContentSection,
  trSections: ServiceContentSection[],
  getSectionsJsonForLocale: (locale: ForeignConsultancyLocale) => string,
): boolean {
  const sections = getSectionsForLocale(locale, trSections, getSectionsJsonForLocale);
  return Boolean(sections[sectionIndex]?.[field]?.trim());
}

export function ForeignConsultancyLocalizedSectionsEditor({ initialJson }: Props) {
  const { getSectionsJsonForLocale, setSectionsJsonForLocale } = useForeignConsultancyTranslations();
  const [trSections, setTrSections] = useState<ServiceContentSection[]>(() =>
    parseServiceSectionsJson(initialJson),
  );

  const trSerialized = useMemo(() => serializeServiceSections(trSections), [trSections]);

  const syncLocaleSections = (
    locale: Exclude<ForeignConsultancyLocale, "tr">,
    sections: ServiceContentSection[],
  ) => {
    setSectionsJsonForLocale(locale, serializeServiceSections(sections));
  };

  const ensureLocaleLength = (
    locale: Exclude<ForeignConsultancyLocale, "tr">,
    length: number,
  ) => {
    const current = getSectionsForLocale(locale, trSections, getSectionsJsonForLocale);
    if (current.length >= length) return current;

    const next = [...current];
    while (next.length < length) {
      next.push({ title: "", content: "" });
    }
    syncLocaleSections(locale, next);
    return next;
  };

  const addSection = () => {
    setTrSections((prev) => {
      const next = [...prev, { title: "", content: "" }];
      for (const locale of FOREIGN_CONSULTANCY_LOCALES) {
        if (locale === "tr") continue;
        const current = getSectionsForLocale(locale, prev, getSectionsJsonForLocale);
        syncLocaleSections(locale, [...current, { title: "", content: "" }]);
      }
      return next;
    });
  };

  const removeSection = (index: number) => {
    setTrSections((prev) => {
      const next = prev.filter((_, sectionIndex) => sectionIndex !== index);
      for (const locale of FOREIGN_CONSULTANCY_LOCALES) {
        if (locale === "tr") continue;
        const current = getSectionsForLocale(locale, prev, getSectionsJsonForLocale);
        syncLocaleSections(
          locale,
          current.filter((_, sectionIndex) => sectionIndex !== index),
        );
      }
      return next;
    });
  };

  const updateTrSection = (
    index: number,
    field: keyof ServiceContentSection,
    value: string,
  ) => {
    setTrSections((prev) =>
      prev.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [field]: value } : section,
      ),
    );
  };

  const updateLocaleSection = (
    locale: Exclude<ForeignConsultancyLocale, "tr">,
    index: number,
    field: keyof ServiceContentSection,
    value: string,
  ) => {
    const current = ensureLocaleLength(locale, trSections.length);
    const next = current.map((section, sectionIndex) =>
      sectionIndex === index ? { ...section, [field]: value } : section,
    );
    syncLocaleSections(locale, next);
  };

  return (
    <div className="space-y-4">
      <input type="hidden" name="sectionsJson" value={trSerialized} readOnly />

      {trSections.length === 0 && (
        <p className="text-sm text-slate-500">
          Henüz içerik bölümü yok. Başlık ve zengin metin blokları ekleyebilirsiniz.
        </p>
      )}

      {trSections.map((section, index) => (
        <SectionBlock
          key={index}
          index={index}
          trSection={section}
          trSections={trSections}
          getSectionsJsonForLocale={getSectionsJsonForLocale}
          onRemove={() => removeSection(index)}
          onUpdateTr={(field, value) => updateTrSection(index, field, value)}
          onUpdateLocale={(locale, field, value) =>
            updateLocaleSection(locale, index, field, value)
          }
        />
      ))}

      <button
        type="button"
        onClick={addSection}
        className="cursor-pointer rounded-lg border border-dashed border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-csg-blue hover:text-csg-blue"
      >
        + Bölüm ekle
        {trSections.length > 0 ? ` (${trSections.length})` : ""}
      </button>
    </div>
  );
}

function SectionBlock({
  index,
  trSection,
  trSections,
  getSectionsJsonForLocale,
  onRemove,
  onUpdateTr,
  onUpdateLocale,
}: {
  index: number;
  trSection: ServiceContentSection;
  trSections: ServiceContentSection[];
  getSectionsJsonForLocale: (locale: ForeignConsultancyLocale) => string;
  onRemove: () => void;
  onUpdateTr: (field: keyof ServiceContentSection, value: string) => void;
  onUpdateLocale: (
    locale: Exclude<ForeignConsultancyLocale, "tr">,
    field: keyof ServiceContentSection,
    value: string,
  ) => void;
}) {
  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Bölüm {index + 1}
        </p>
        <button
          type="button"
          onClick={onRemove}
          className="cursor-pointer text-xs font-medium text-red-600 hover:text-red-700"
        >
          Kaldır
        </button>
      </div>

      <LocalizedSectionField
        label="Bölüm başlığı"
        field="title"
        sectionIndex={index}
        trValue={trSection.title}
        trSections={trSections}
        getSectionsJsonForLocale={getSectionsJsonForLocale}
        onUpdateTr={(value) => onUpdateTr("title", value)}
        onUpdateLocale={(locale, value) => onUpdateLocale(locale, "title", value)}
        placeholder="Örn. Başvuru süreci"
      />

      <LocalizedSectionField
        label="İçerik"
        field="content"
        sectionIndex={index}
        trValue={trSection.content}
        trSections={trSections}
        getSectionsJsonForLocale={getSectionsJsonForLocale}
        onUpdateTr={(value) => onUpdateTr("content", value)}
        onUpdateLocale={(locale, value) => onUpdateLocale(locale, "content", value)}
        richText
      />
    </div>
  );
}

function LocalizedSectionField({
  label,
  field,
  sectionIndex,
  trValue,
  trSections,
  getSectionsJsonForLocale,
  onUpdateTr,
  onUpdateLocale,
  placeholder,
  richText = false,
}: {
  label: string;
  field: keyof ServiceContentSection;
  sectionIndex: number;
  trValue: string;
  trSections: ServiceContentSection[];
  getSectionsJsonForLocale: (locale: ForeignConsultancyLocale) => string;
  onUpdateTr: (value: string) => void;
  onUpdateLocale: (locale: Exclude<ForeignConsultancyLocale, "tr">, value: string) => void;
  placeholder?: string;
  richText?: boolean;
}) {
  const [activeLocale, setActiveLocale] = useState<ForeignConsultancyLocale>("tr");

  const filledLocales = useMemo(
    () =>
      Object.fromEntries(
        FOREIGN_CONSULTANCY_LOCALES.map((locale) => [
          locale,
          isSectionFieldFilled(locale, sectionIndex, field, trSections, getSectionsJsonForLocale),
        ]),
      ) as Partial<Record<ForeignConsultancyLocale, boolean>>,
    [field, getSectionsJsonForLocale, sectionIndex, trSections],
  );

  const localeValue =
    activeLocale === "tr"
      ? trValue
      : getSectionsForLocale(activeLocale, trSections, getSectionsJsonForLocale)[sectionIndex]?.[
          field
        ] ?? "";

  return (
    <div className="block space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <LocaleFieldTabs
          activeLocale={activeLocale}
          onLocaleChange={setActiveLocale}
          filledLocales={filledLocales}
          compact
        />
      </div>

      {richText ? (
        <AdminRichTextEditor
          value={localeValue}
          onChange={(value) => {
            if (activeLocale === "tr") {
              onUpdateTr(value);
              return;
            }
            onUpdateLocale(activeLocale, value);
          }}
          placeholder="Paragraf, kalın metin, liste ve bağlantılar ekleyebilirsiniz."
        />
      ) : (
        <input
          type="text"
          value={localeValue}
          onChange={(event) => {
            if (activeLocale === "tr") {
              onUpdateTr(event.target.value);
              return;
            }
            onUpdateLocale(activeLocale, event.target.value);
          }}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}
