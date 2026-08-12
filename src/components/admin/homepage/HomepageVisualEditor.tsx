"use client";

import { useState } from "react";
import Link from "next/link";
import type { HomepageContent } from "@/lib/homepage";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import { updateHomepageEditorAction } from "@/lib/admin-actions";
import { HomepageEditProvider, useHomepageEdit } from "./HomepageEditContext";
import { HomepageLivePreview } from "./HomepageLivePreview";

type PreviewData = {
  quickLinks: Array<{ name: string; slug: string; flag?: string | null }>;
  featuredItems: Array<{
    id: string;
    name: string;
    slug: string;
    countrySlug: string;
    countryName: string;
    shortDescription: string | null;
    processingTime: string | null;
    heroImage: string | null;
  }>;
  popularCountries: Array<{
    name: string;
    slug: string;
    shortDescription?: string | null;
    flag?: string | null;
    heroImage?: string | null;
    services: { id: string }[];
  }>;
  articles: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    publishedAt: Date | null;
    articleCategory: { name: string };
  }>;
  faqs: Array<{ id: string; question: string; answer: string }>;
  settings: SiteSettingsMap;
};

function HomepageEditorInner({
  initialContent,
  previewData,
}: {
  initialContent: HomepageContent;
  previewData: PreviewData;
}) {
  const edit = useHomepageEdit();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSave() {
    if (!edit) return;
    setStatus("saving");
    try {
      await updateHomepageEditorAction(JSON.stringify(edit.content));
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Anasayfa — Görsel Düzenleyici</h1>
          <p className="mt-1 text-sm text-slate-600">
            WordPress benzeri önizleme; metinlere tıklayıp düzenleyin, görsellerde &quot;Görseli değiştir&quot;
            kullanın.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {status === "saved" && (
            <span className="text-sm font-medium text-emerald-600">Kaydedildi ✓</span>
          )}
          {status === "error" && (
            <span className="text-sm font-medium text-red-600">Kayıt hatası</span>
          )}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Sıfırla
          </button>
          <Link
            href="/"
            target="_blank"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-csg-blue hover:text-csg-blue"
          >
            Canlı site
          </Link>
          <button
            type="button"
            disabled={status === "saving"}
            onClick={handleSave}
            className="rounded-lg bg-csg-blue px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-csg-blue-dark disabled:opacity-60"
          >
            {status === "saving" ? "Kaydediliyor…" : "Değişiklikleri kaydet"}
          </button>
        </div>
      </div>

      <div className="-mx-4 md:-mx-6 lg:-mx-8">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
          <div className="border-b border-slate-200 bg-white px-4 py-2 text-center text-xs text-slate-500">
            Canlı önizleme — düzenlenebilir alanlar mavi çizgili kenarlıkla vurgulanır
          </div>
          <HomepageLivePreview initialContent={initialContent} previewData={previewData} />
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Öne çıkan hizmetler, ülkeler ve SSS içerikleri ilgili menülerden yönetilir; burada yalnızca
        anasayfa metinleri ve görselleri düzenlenir.
      </p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Meta SEO (arama sonuçları)</h2>
        <div className="mt-4 space-y-4 max-w-2xl">
          <MetaSeoFields />
        </div>
      </div>
    </>
  );
}

function MetaSeoFields() {
  const edit = useHomepageEdit();
  if (!edit) return null;

  return (
    <>
      <label className="block text-sm">
        <span className="font-medium text-slate-700">Meta title</span>
        <input
          type="text"
          value={edit.content.seoTitle}
          onChange={(e) => edit.updateField("seoTitle", e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-slate-700">Meta description</span>
        <textarea
          rows={2}
          value={edit.content.seoDescription}
          onChange={(e) => edit.updateField("seoDescription", e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>
    </>
  );
}

export function HomepageVisualEditor({
  initialContent,
  previewData,
}: {
  initialContent: HomepageContent;
  previewData: PreviewData;
}) {
  return (
    <HomepageEditProvider initialContent={initialContent}>
      <HomepageEditorInner initialContent={initialContent} previewData={previewData} />
    </HomepageEditProvider>
  );
}
