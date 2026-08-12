"use client";

import { useCallback, useEffect, useState } from "react";
import {
  listCloudinaryHomeImagesAction,
  uploadCloudinaryHomeImageAction,
} from "@/lib/admin-actions";
import { dataUrlToFile, readImageFileAsDataUrl } from "@/lib/crop-image";
import { homeImageAssetLabel } from "@/lib/cloudinary/home-folder";
import { HomepageImageCropDialog } from "./HomepageImageCropDialog";

type GalleryItem = {
  publicId: string;
  secureUrl: string;
  format: string;
  width: number;
  height: number;
};

export function CloudinaryImagePicker({
  publicId,
  currentUrl,
  onChange,
  label,
  placement = "bottom",
  aspectRatio,
  cropHint,
}: {
  publicId: string;
  currentUrl: string;
  onChange: (url: string) => void;
  label?: string;
  placement?: "bottom" | "top";
  aspectRatio: number;
  cropHint: string;
}) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [cropSource, setCropSource] = useState<string | null>(null);
  const [cropOpen, setCropOpen] = useState(false);

  const loadGallery = useCallback(async () => {
    setLoadingGallery(true);
    setError(null);
    try {
      const items = await listCloudinaryHomeImagesAction();
      setGallery(items);
    } catch {
      setError("Home klasörü görselleri yüklenemedi");
    } finally {
      setLoadingGallery(false);
    }
  }, []);

  useEffect(() => {
    if (open) loadGallery();
  }, [open, loadGallery]);

  async function uploadFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("publicId", publicId);
      formData.append("file", file);
      const result = await uploadCloudinaryHomeImageAction(formData);
      onChange(result.secureUrl);
      setCropOpen(false);
      setCropSource(null);
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yükleme başarısız");
    } finally {
      setUploading(false);
    }
  }

  async function handleFileSelected(file: File) {
    setError(null);
    try {
      const dataUrl = await readImageFileAsDataUrl(file);
      setCropSource(dataUrl);
      setCropOpen(true);
    } catch {
      setError("Görsel okunamadı");
    }
  }

  const positionClass =
    placement === "top"
      ? "top-4 left-4 right-4"
      : "bottom-3 left-3 right-3";

  const cropTitle = label ?? "Görseli kırp";

  return (
    <>
      <div className={`absolute ${positionClass} z-50 pointer-events-auto`}>
        {open ? (
          <div className="rounded-xl bg-white p-4 shadow-2xl ring-2 ring-csg-blue/30 max-h-[70vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {label ?? "Görsel"}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Cloudinary: <code className="text-csg-blue">{publicId}</code>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                Kapat
              </button>
            </div>

            {error && (
              <p className="mt-2 text-xs font-medium text-red-600">{error}</p>
            )}

            <div className="mt-3">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-csg-blue/40 bg-slate-50 px-4 py-6 text-center hover:bg-slate-100">
                <span className="text-sm font-medium text-csg-blue">
                  {uploading ? "Yükleniyor…" : "Yeni görsel yükle (kırpma sonrası)"}
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  PNG, JPG, WebP — max 10MB. Sabit oranda kırpılır, aynı konuma yazılır.
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  disabled={uploading || cropOpen}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleFileSelected(file);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Home klasöründen seç
              </p>
              {loadingGallery ? (
                <p className="mt-2 text-xs text-slate-500">Yükleniyor…</p>
              ) : gallery.length === 0 ? (
                <p className="mt-2 text-xs text-slate-500">Henüz görsel yok.</p>
              ) : (
                <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {gallery.map((item) => (
                    <button
                      key={item.publicId}
                      type="button"
                      onClick={() => {
                        onChange(item.secureUrl);
                        setOpen(false);
                      }}
                      className={`group relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition ${
                        currentUrl === item.secureUrl
                          ? "border-csg-blue ring-2 ring-csg-blue/30"
                          : "border-slate-200 hover:border-csg-blue/50"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.secureUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-black/60 px-1 py-0.5 text-[10px] text-white truncate">
                        {homeImageAssetLabel(item.publicId)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md bg-csg-blue/95 px-3 py-1.5 text-xs font-semibold text-white shadow-lg hover:bg-csg-blue"
          >
            Görseli değiştir
          </button>
        )}
      </div>

      {cropSource ? (
        <HomepageImageCropDialog
          key={cropSource}
          open={cropOpen}
          imageSrc={cropSource}
          title={cropTitle}
          hint={cropHint}
          aspectRatio={aspectRatio}
          isUploading={uploading}
          onClose={() => {
            if (!uploading) {
              setCropOpen(false);
              setCropSource(null);
            }
          }}
          onConfirm={(croppedDataUrl) => {
            const file = dataUrlToFile(croppedDataUrl, `${publicId.replace("/", "-")}.jpg`);
            void uploadFile(file);
          }}
        />
      ) : null}
    </>
  );
}
