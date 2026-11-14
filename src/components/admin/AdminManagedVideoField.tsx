"use client";

import { useRef, useState } from "react";
import { uploadCloudinaryServiceVideoAction } from "@/lib/admin-actions";
import type { ManagedImageSlot } from "@/components/admin/AdminManagedImageField";

export function AdminManagedVideoField({
  name,
  defaultValue,
  slot,
  hint,
  onUrlChange,
}: {
  name: string;
  defaultValue: string;
  slot: ManagedImageSlot;
  hint?: string;
  onUrlChange?: (url: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasVideo = url.trim().length > 0;

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("publicId", slot.publicId);
      formData.append("file", file);
      const result = await uploadCloudinaryServiceVideoAction(formData);
      setUrl(result.secureUrl);
      onUrlChange?.(result.secureUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Video yüklenemedi");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="block">
      <span className="text-sm font-medium text-slate-700">{slot.label}</span>
      <p className="mt-1 text-xs text-slate-500">
        Cloudinary: <code className="text-csg-blue">{slot.publicId}</code>
      </p>

      <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
        {hasVideo ? (
          <video
            src={url}
            controls
            playsInline
            className="mx-auto block h-auto w-full max-h-[28rem] object-contain"
            preload="metadata"
          />
        ) : (
          <div className="flex min-h-[10rem] items-center justify-center text-xs text-slate-400 sm:min-h-[12rem]">
            Video yok
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50 p-3">
          {error && (
            <p className="text-xs font-medium text-red-600">{error}</p>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-fit cursor-pointer rounded-md bg-csg-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-csg-blue/90 disabled:opacity-60"
          >
            {uploading ? "Yükleniyor…" : hasVideo ? "Videoyu değiştir" : "Video yükle"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      <input type="hidden" name={name} value={url} />

      <span className="mt-1.5 block text-xs text-slate-500">
        MP4, WebM veya MOV. Panelde ayrı MB sınırı yok; yükleme boyutu sunucu ve Cloudinary planına bağlıdır.
        {hint ? ` ${hint}` : ""}
      </span>
    </div>
  );
}