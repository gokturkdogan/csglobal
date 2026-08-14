"use client";

import dynamic from "next/dynamic";

export const AdminRichTextEditor = dynamic(
  () =>
    import("./AdminRichTextEditor").then((module) => module.AdminRichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-8 text-center text-sm text-slate-500">
        Metin editörü yükleniyor…
      </div>
    ),
  },
);
