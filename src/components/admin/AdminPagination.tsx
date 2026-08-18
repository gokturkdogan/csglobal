import Link from "next/link";
import { buildAdminPageUrl } from "@/lib/admin-pagination";

type Props = {
  basePath: string;
  page: number;
  pageSize: number;
  totalCount: number;
  filters?: Record<string, string | undefined>;
};

export function AdminPagination({
  basePath,
  page,
  pageSize,
  totalCount,
  filters,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  if (totalCount <= pageSize) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);

  const linkClass =
    "rounded-md border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 text-sm text-slate-600">
      <span>{from}-{to} / {totalCount}</span>
      <div className="flex items-center gap-2">
        {page > 1 ? (
          <Link
            href={buildAdminPageUrl(basePath, page - 1, pageSize, filters)}
            className={linkClass}
          >
            Önceki
          </Link>
        ) : null}
        <span>Sayfa {page} / {totalPages}</span>
        {page < totalPages ? (
          <Link
            href={buildAdminPageUrl(basePath, page + 1, pageSize, filters)}
            className={linkClass}
          >
            Sonraki
          </Link>
        ) : null}
      </div>
    </div>
  );
}
