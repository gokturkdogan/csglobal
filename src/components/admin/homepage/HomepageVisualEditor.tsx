"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import type { HomepageContent } from "@/lib/homepage";
import type { SiteSettingsMap } from "@/lib/site-settings.shared";
import { updateHomepageEditorAction } from "@/lib/admin-actions";
import { AdminLoadingButton } from "@/components/admin/AdminForm";
import { useAdminToast } from "@/components/admin/AdminToast";
import { HomepageEditProvider, useHomepageEdit } from "./HomepageEditContext";

const HomepageLivePreview = dynamic(
  () =>
    import("./HomepageLivePreview").then((module) => module.HomepageLivePreview),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
        Önizleme yükleniyor…
      </div>
    ),
  },
);

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
    itemImage?: string | null;
    visaPrograms: { id: string }[];
  }>;
  programs: Array<{
    id: string;
    name: string;
    slug: string;
    excerpt: string | null;
    publishedAt: Date | null;
    country: { name: string; slug: string; itemImage?: string | null } | null;
  }>;
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
  const toast = useAdminToast();
  const [pending, setPending] = useState(false);

  async function handleSave() {
    if (!edit) return;
    setPending(true);
    try {
      const result = await updateHomepageEditorAction(JSON.stringify(edit.content));
      if (result.ok) {
        toast.show({ variant: "success", message: result.message });
      } else {
        toast.show({ variant: "error", message: result.message });
      }
    } catch {
      toast.show({
        variant: "error",
        message: "Anasayfa kaydedilemedi. Lütfen tekrar deneyin.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Anasayfa: Görsel Düzenleyici</h1>
          <code
            className="mt-2 block break-all rounded-md bg-slate-100 px-2.5 py-1.5 text-sm text-slate-700 select-all"
          >
            /
          </code>
          <p className="mt-2 text-sm text-slate-600">
            WordPress benzeri önizleme; metinlere tıklayıp düzenleyin, görsellerde &quot;Görseli değiştir&quot;
            kullanın.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
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
          <AdminLoadingButton pending={pending} onClick={handleSave}>
            Değişiklikleri kaydet
          </AdminLoadingButton>
        </div>
      </div>

      <div className="-mx-4 md:-mx-6 lg:-mx-8">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
          <div className="border-b border-slate-200 bg-white px-4 py-2 text-center text-xs text-slate-500">
            Canlı önizleme: düzenlenebilir alanlar mavi çizgili kenarlıkla vurgulanır
          </div>
          <HomepageLivePreview initialContent={initialContent} previewData={previewData} />
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Öne çıkan programlar, ülkeler ve rehber yazıları ilgili menülerden yönetilir. SSS soruları
        bu önizlemede düzenlenir; kaydettiğinizde anasayfaya yansır.
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
