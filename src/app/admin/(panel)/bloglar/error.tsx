"use client";

import { AdminAlert } from "@/components/admin/AdminUi";

export default function AdminBlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-4">
      <AdminAlert variant="info">
        Blog sayfası yüklenemedi: {error.message || "Bilinmeyen hata"}
      </AdminAlert>
      <p className="text-sm text-slate-600">
        Migration uygulanmamış olabilir. Sunucuda{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">npx prisma migrate deploy</code>{" "}
        çalıştırın ve uygulamayı yeniden deploy edin.
      </p>
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
