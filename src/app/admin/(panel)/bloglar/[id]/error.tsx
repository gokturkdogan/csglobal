"use client";

import { AdminAlert } from "@/components/admin/AdminUi";

export default function AdminBlogEditError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-4">
      <AdminAlert variant="info">
        Blog düzenleme sayfası yüklenemedi: {error.message || "Bilinmeyen hata"}
      </AdminAlert>
      <button
        type="button"
        onClick={reset}
        className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-csg-blue hover:text-csg-blue"
      >
        Tekrar dene
      </button>
    </div>
  );
}
