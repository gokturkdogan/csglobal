"use client";

import { useState, type ChangeEvent } from "react";
import {
  SITE_ASSET_ACCEPT,
  SITE_ASSET_MAX_BATCH,
  SITE_ASSET_MAX_BYTES,
} from "@/lib/site-asset";

function formatMaxFileSize(): string {
  const mb = SITE_ASSET_MAX_BYTES / (1024 * 1024);
  return `${mb}MB`;
}

export function SiteAssetBulkUploadField() {
  const [fileCount, setFileCount] = useState(0);
  const [error, setError] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const list = event.target.files;
    if (!list || list.length === 0) {
      setFileCount(0);
      setError("");
      return;
    }

    if (list.length > SITE_ASSET_MAX_BATCH) {
      setError(`Tek seferde en fazla ${SITE_ASSET_MAX_BATCH} dosya seçebilirsiniz.`);
      event.target.value = "";
      setFileCount(0);
      return;
    }

    const tooLarge = Array.from(list).find((file) => file.size > SITE_ASSET_MAX_BYTES);
    if (tooLarge) {
      setError(`${tooLarge.name} dosya boyutu sınırını (${formatMaxFileSize()}) aşıyor.`);
      event.target.value = "";
      setFileCount(0);
      return;
    }

    setError("");
    setFileCount(list.length);
  }

  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Dosyalar</span>
        <input
          type="file"
          name="files"
          multiple
          required
          accept={SITE_ASSET_ACCEPT}
          onChange={handleChange}
          className="mt-1.5 block w-full text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-csg-blue file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-csg-blue-dark"
        />
      </label>
      <p className="mt-1.5 text-xs text-slate-500">
        Aynı ülke için tek seferde en fazla {SITE_ASSET_MAX_BATCH} dosya. Her dosya
        max. {formatMaxFileSize()}.
      </p>
      {fileCount > 0 && (
        <p className="mt-1 text-xs font-medium text-csg-blue">
          {fileCount} dosya seçildi
        </p>
      )}
      {error && (
        <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}
