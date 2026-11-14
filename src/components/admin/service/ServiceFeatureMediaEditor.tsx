"use client";

import { useMemo, useState } from "react";
import { AdminManagedImageField } from "@/components/admin/AdminManagedImageField";
import { AdminManagedVideoField } from "@/components/admin/AdminManagedVideoField";
import { VisualSlugGate } from "@/components/admin/VisualSlugProvider";
import {
  SERVICE_PAGE_SORT_ORDER_MAX,
  SERVICE_PAGE_SORT_ORDER_MIN,
  normalizePageSortOrder,
} from "@/lib/service-constants";
import {
  SERVICE_FEATURE_MEDIA_MAX_PER_KIND,
  SERVICE_FEATURE_TEXT_MAX,
  SERVICE_FEATURE_TITLE_MAX,
  type ServiceFeatureMediaPayload,
  parseFeatureMediaJson,
  serializeFeatureMediaJson,
} from "@/lib/service-feature-media";
import {
  countryFeatureDynamicImageSlot,
  countryFeatureVideoSlot,
} from "@/lib/country-image-slots";
import {
  serviceFeatureDynamicImageSlot,
  serviceFeatureVideoSlot,
} from "@/lib/service-image-slots";
import { ForeignConsultancyMediaLocaleField } from "@/components/admin/foreign-consultancy/ForeignConsultancyMediaLocaleField";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

const textareaClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

type MediaRow = {
  url: string;
  title: string;
  text: string;
  sortOrder: number;
};

type FeatureMediaSlotScope = "service" | "country";

type Props = {
  initialJson?: string | null;
  slotScope?: FeatureMediaSlotScope;
  /** Yabancı danışmanlık: başlık/metin için dil sekmeleri */
  fcMediaI18n?: boolean;
  legacy?: {
    featureImage1?: string | null;
    featureImage1Title?: string | null;
    featureImage1Text?: string | null;
    featureImage2?: string | null;
    featureImage2Title?: string | null;
    featureImage2Text?: string | null;
  };
};

function nextMediaSortOrder(images: MediaRow[], videos: MediaRow[]): number {
  const all = [...images, ...videos];
  const max = all.reduce((acc, row) => Math.max(acc, row.sortOrder), 0);
  return Math.min(SERVICE_PAGE_SORT_ORDER_MAX, max + 1);
}

function emptyRow(sortOrder: number): MediaRow {
  return { url: "", title: "", text: "", sortOrder };
}

function updateRow(
  rows: MediaRow[],
  index: number,
  field: keyof MediaRow,
  value: string | number,
): MediaRow[] {
  return rows.map((row, i) => {
    if (i !== index) return row;
    if (field === "sortOrder") {
      return {
        ...row,
        sortOrder: normalizePageSortOrder(value, row.sortOrder),
      };
    }
    return { ...row, [field]: value };
  });
}

function CharCountLabel({
  label,
  length,
  maxLength,
}: {
  label: string;
  length: number;
  maxLength: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span
        className={`shrink-0 text-xs font-medium tabular-nums ${
          length >= maxLength ? "text-amber-600" : "text-slate-400"
        }`}
      >
        {length}/{maxLength}
      </span>
    </div>
  );
}

function MediaRowsEditor({
  kind,
  rows,
  setRows,
  slug,
  slotScope,
  fcMediaI18n,
  allImages,
  allVideos,
}: {
  kind: "image" | "video";
  rows: MediaRow[];
  setRows: (next: MediaRow[]) => void;
  slug: string;
  slotScope: FeatureMediaSlotScope;
  fcMediaI18n?: boolean;
  allImages: MediaRow[];
  allVideos: MediaRow[];
}) {
  const label = kind === "image" ? "Görsel" : "Video";
  const canAdd = rows.length < SERVICE_FEATURE_MEDIA_MAX_PER_KIND;

  return (
    <div className="space-y-4">
      {rows.length === 0 && (
        <p className="text-sm text-slate-500">
          Henüz {kind === "image" ? "görsel" : "video"} alanı yok. En fazla{" "}
          {SERVICE_FEATURE_MEDIA_MAX_PER_KIND} adet ekleyebilirsiniz.
        </p>
      )}

      {rows.map((row, index) => {
        const slot =
          kind === "image"
            ? slotScope === "country"
              ? countryFeatureDynamicImageSlot(slug, index + 1)
              : serviceFeatureDynamicImageSlot(slug, index + 1)
            : slotScope === "country"
              ? countryFeatureVideoSlot(slug, index + 1)
              : serviceFeatureVideoSlot(slug, index + 1);

        return (
          <div
            key={`${kind}-${index}`}
            className="space-y-4 rounded-lg border border-slate-200 bg-slate-50/60 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label} alan {index + 1}
              </p>
              <button
                type="button"
                onClick={() => setRows(rows.filter((_, i) => i !== index))}
                className="cursor-pointer text-xs font-medium text-red-600 hover:text-red-700"
              >
                Kaldır
              </button>
            </div>

            {kind === "image" ? (
              <AdminManagedImageField
                name={`${kind}MediaDummyUrl_${index}`}
                defaultValue={row.url}
                slot={slot}
                previewVariant="card"
                onUrlChange={(url) => setRows(updateRow(rows, index, "url", url))}
              />
            ) : (
              <AdminManagedVideoField
                name={`${kind}MediaDummyUrl_${index}`}
                defaultValue={row.url}
                slot={slot}
                onUrlChange={(url) => setRows(updateRow(rows, index, "url", url))}
              />
            )}

            <label className="block max-w-[8rem]">
              <span className="text-sm font-medium text-slate-700">Sayfa sırası</span>
              <input
                type="number"
                min={SERVICE_PAGE_SORT_ORDER_MIN}
                max={SERVICE_PAGE_SORT_ORDER_MAX}
                value={row.sortOrder}
                onChange={(e) => setRows(updateRow(rows, index, "sortOrder", e.target.value))}
                className={inputClass}
              />
            </label>

            {fcMediaI18n ? (
              <>
                <ForeignConsultancyMediaLocaleField
                  label="Başlık"
                  kind={kind}
                  url={row.url}
                  field="title"
                  trValue={row.title}
                  onTrChange={(value) => setRows(updateRow(rows, index, "title", value))}
                />
                <ForeignConsultancyMediaLocaleField
                  label="Metin"
                  kind={kind}
                  url={row.url}
                  field="text"
                  trValue={row.text}
                  onTrChange={(value) => setRows(updateRow(rows, index, "text", value))}
                  multiline
                />
              </>
            ) : (
              <>
                <label className="block">
                  <CharCountLabel
                    label="Başlık"
                    length={row.title.length}
                    maxLength={SERVICE_FEATURE_TITLE_MAX}
                  />
                  <input
                    type="text"
                    value={row.title}
                    maxLength={SERVICE_FEATURE_TITLE_MAX}
                    onChange={(e) => setRows(updateRow(rows, index, "title", e.target.value))}
                    className={inputClass}
                  />
                </label>

                <label className="block">
                  <CharCountLabel
                    label="Metin"
                    length={row.text.length}
                    maxLength={SERVICE_FEATURE_TEXT_MAX}
                  />
                  <textarea
                    value={row.text}
                    maxLength={SERVICE_FEATURE_TEXT_MAX}
                    rows={4}
                    onChange={(e) => setRows(updateRow(rows, index, "text", e.target.value))}
                    className={textareaClass}
                  />
                </label>
              </>
            )}
          </div>
        );
      })}

      {canAdd && (
        <button
          type="button"
          onClick={() =>
            setRows([...rows, emptyRow(nextMediaSortOrder(allImages, allVideos))])
          }
          className="cursor-pointer rounded-lg border border-dashed border-csg-blue/40 bg-white px-4 py-2 text-sm font-semibold text-csg-blue hover:bg-csg-blue/5"
        >
          + {label} alanı ekle
        </button>
      )}
    </div>
  );
}

export function ServiceFeatureMediaEditor({
  initialJson,
  legacy,
  slotScope = "service",
  fcMediaI18n = false,
}: Props) {
  const initial = parseFeatureMediaJson(initialJson, legacy);

  const legacySeedImageRows = (): MediaRow[] => {
    const rows: MediaRow[] = [];
    const push = (
      sortOrder: number,
      url?: string | null,
      title?: string | null,
      text?: string | null,
    ) => {
      const trimmed = url?.trim();
      if (!trimmed) return;
      rows.push({
        url: trimmed,
        title: title?.trim() ?? "",
        text: text?.trim() ?? "",
        sortOrder,
      });
    };
    push(1, legacy?.featureImage1, legacy?.featureImage1Title, legacy?.featureImage1Text);
    push(2, legacy?.featureImage2, legacy?.featureImage2Title, legacy?.featureImage2Text);
    return rows;
  };

  const [images, setImages] = useState<MediaRow[]>(() =>
    (initial.images.length > 0 ? initial.images : legacySeedImageRows()).map((item, index) => ({
      url: item.url,
      title: item.title,
      text: item.text,
      sortOrder: normalizePageSortOrder(item.sortOrder, index + 1),
    })),
  );
  const [videos, setVideos] = useState<MediaRow[]>(
    initial.videos.map((item, index) => ({
      url: item.url,
      title: item.title,
      text: item.text,
      sortOrder: normalizePageSortOrder(
        item.sortOrder,
        initial.images.length + index + 1,
      ),
    })),
  );

  const serialized = useMemo(() => {
    const payload: ServiceFeatureMediaPayload = {
      images: images
        .filter((row) => row.url.trim() && (row.title.trim() || row.text.trim()))
        .map((row) => ({
          url: row.url.trim(),
          title: row.title.trim(),
          text: row.text.trim(),
          sortOrder: row.sortOrder,
        })),
      videos: videos
        .filter((row) => row.url.trim() && (row.title.trim() || row.text.trim()))
        .map((row) => ({
          url: row.url.trim(),
          title: row.title.trim(),
          text: row.text.trim(),
          sortOrder: row.sortOrder,
        })),
    };
    return serializeFeatureMediaJson(payload);
  }, [images, videos]);

  return (
    <div className="space-y-8">
      <input type="hidden" name="featureMediaJson" value={serialized} readOnly />

      {fcMediaI18n && (
        <p className="text-xs text-slate-500">
          Başlık ve metin alanlarında dil sekmeleriyle çeviri ekleyebilirsiniz (opsiyonel).{" "}
          <strong>Sayfa sırası</strong> içerik bölümleriyle ortaktır (1-{SERVICE_PAGE_SORT_ORDER_MAX}).
        </p>
      )}

      {slotScope === "service" && !fcMediaI18n && (
        <p className="text-xs text-slate-500">
          <strong>Sayfa sırası</strong>, içerik bölümleriyle aynı numaralandırmayı kullanır
          (1-{SERVICE_PAGE_SORT_ORDER_MAX}). Örneğin içerik 1-2, görsel 3, içerik 5.
        </p>
      )}

      <VisualSlugGate>
        {(slug) => (
          <>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Görsel alanları</h3>
              <p className="mt-1 text-xs text-slate-500">
                Sitede görseller sırayla, bir sol bir sağ düzeninde gösterilir. En fazla{" "}
                {SERVICE_FEATURE_MEDIA_MAX_PER_KIND} görsel.
              </p>
              <div className="mt-4">
                <MediaRowsEditor
                  kind="image"
                  rows={images}
                  setRows={setImages}
                  slug={slug}
                  slotScope={slotScope}
                  fcMediaI18n={fcMediaI18n}
                  allImages={images}
                  allVideos={videos}
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">Video alanları</h3>
              <p className="mt-1 text-xs text-slate-500">
                Videolar Cloudinary üzerinden yüklenir. En fazla{" "}
                {SERVICE_FEATURE_MEDIA_MAX_PER_KIND} video.
              </p>
              <div className="mt-4">
                <MediaRowsEditor
                  kind="video"
                  rows={videos}
                  setRows={setVideos}
                  slug={slug}
                  slotScope={slotScope}
                  fcMediaI18n={fcMediaI18n}
                  allImages={images}
                  allVideos={videos}
                />
              </div>
            </div>
          </>
        )}
      </VisualSlugGate>
    </div>
  );
}