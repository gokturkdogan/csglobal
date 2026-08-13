"use client";

import Link from "next/link";

type Props = {
  fileName: string;
  countryName: string;
  countrySlug: string;
  mimeType: string | null;
  viewUrl: string;
};

function isPdf(mimeType: string | null, fileName: string): boolean {
  if (mimeType === "application/pdf") return true;
  return fileName.toLowerCase().endsWith(".pdf");
}

function isImage(mimeType: string | null, fileName: string): boolean {
  if (mimeType?.startsWith("image/")) return true;
  return /\.(png|jpe?g|webp)$/i.test(fileName);
}

export function SiteAssetViewer({
  fileName,
  countryName,
  countrySlug,
  mimeType,
  viewUrl,
}: Props) {
  const showPdf = isPdf(mimeType, fileName);
  const showImage = isImage(mimeType, fileName);

  return (
    <div className="site-container py-8 md:py-12">
      <nav className="text-sm text-slate-500">
        <Link href={`/${countrySlug}`} className="hover:text-csg-blue hover:underline">
          {countryName}
        </Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-700">Döküman</span>
      </nav>

      <header className="mt-4 border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-csg-blue">
          {countryName}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          {fileName}
        </h1>
      </header>

      <div className="mt-8">
        {showPdf && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <iframe
              title={`${fileName} önizleme`}
              src={viewUrl}
              className="h-[min(80vh,900px)] w-full bg-slate-100"
            />
          </div>
        )}

        {showImage && !showPdf && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={viewUrl}
              alt={fileName}
              className="mx-auto max-h-[80vh] w-auto max-w-full rounded-lg"
            />
          </div>
        )}

        {!showPdf && !showImage && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
            <p className="text-sm text-slate-600">
              Bu dosya türü tarayıcıda önizlenemez.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
