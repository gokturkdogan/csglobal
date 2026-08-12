"use client";

import { useRef, useState } from "react";
import { uploadCloudinaryHomeImageAction } from "@/lib/admin-actions";
import { dataUrlToFile, readImageFileAsDataUrl } from "@/lib/crop-image";
import { HomepageImageCropDialog } from "./HomepageImageCropDialog";

export function CloudinaryImagePicker({
  publicId,
  onChange,
  label,
  placement = "bottom",
  aspectRatio,
  cropHint,
}: {
  publicId: string;
  onChange: (url: string) => void;
  label?: string;
  placement?: "bottom" | "top";
  aspectRatio: number;
  cropHint: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cropSource, setCropSource] = useState<string | null>(null);
  const [cropOpen, setCropOpen] = useState(false);

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
        {error && (
          <p className="mb-2 rounded-md bg-white px-2 py-1 text-xs font-medium text-red-600 shadow-sm">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || cropOpen}
          className="rounded-md bg-csg-blue/95 px-3 py-1.5 text-xs font-semibold text-white shadow-lg hover:bg-csg-blue disabled:opacity-60"
        >
          {uploading ? "Yükleniyor…" : "Görseli değiştir"}
        </button>
        <input
          ref={fileInputRef}
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
