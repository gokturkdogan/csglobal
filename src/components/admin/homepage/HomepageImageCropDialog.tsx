"use client";

import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedImageDataUrl } from "@/lib/crop-image";

type HomepageImageCropDialogProps = {
  open: boolean;
  imageSrc: string;
  title: string;
  hint: string;
  aspectRatio: number;
  isUploading: boolean;
  onClose: () => void;
  onConfirm: (croppedDataUrl: string) => void;
};

export function HomepageImageCropDialog({
  open,
  imageSrc,
  title,
  hint,
  aspectRatio,
  isUploading,
  onClose,
  onConfirm,
}: HomepageImageCropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setIsCropping(false);
    }
  }, [open, imageSrc]);

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) {
      return;
    }

    setIsCropping(true);

    try {
      const croppedDataUrl = await getCroppedImageDataUrl(imageSrc, croppedAreaPixels);
      onConfirm(croppedDataUrl);
    } finally {
      setIsCropping(false);
    }
  };

  if (!open) {
    return null;
  }

  const busy = isCropping || isUploading;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/60 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="homepage-image-crop-title"
    >
      <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="border-b border-slate-200 px-4 py-3">
          <h2
            id="homepage-image-crop-title"
            className="text-sm font-semibold text-slate-900"
          >
            {title}
          </h2>
          <p className="mt-1 text-xs text-slate-500">{hint}</p>
        </div>

        <div key={imageSrc} className="relative h-[min(52vh,24rem)] bg-slate-950">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            objectFit="contain"
            classes={{
              containerClassName: "rounded-none",
            }}
          />
        </div>

        <div className="space-y-3 border-t border-slate-200 px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 shrink-0" aria-hidden>−</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
              className="h-1.5 w-full cursor-pointer accent-csg-blue"
              aria-label="Yakınlaştırma"
            />
            <span className="text-xs text-slate-400 shrink-0" aria-hidden>+</span>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              İptal
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={busy}
              className="rounded-md bg-csg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-csg-blue-dark disabled:opacity-50"
            >
              {busy ? (isUploading ? "Yükleniyor…" : "Kırpılıyor…") : "Kırp ve yükle"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
