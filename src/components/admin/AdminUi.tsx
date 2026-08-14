import Link from "next/link";
import type { ReactNode } from "react";
import { formatPublicSitePath } from "@/lib/site-url";

export function AdminPageHeader({
  title,
  description,
  actions,
  publicPath,
  publicUrl,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  /** Statik site yolu, örn. /hakkimizda */
  publicPath?: string;
  /** Canlı URL (slug değişiminde güncellenen bileşen) */
  publicUrl?: ReactNode;
}) {
  const staticPath = publicPath ? formatPublicSitePath(publicPath) : null;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          {title}
        </h1>
        {staticPath && (
          <code
            className="mt-2 block break-all rounded-md bg-slate-100 px-2.5 py-1.5 text-sm text-slate-700 select-all"
          >
            {staticPath}
          </code>
        )}
        {publicUrl}
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function AdminCard({
  children,
  className = "",
  padding = true,
}: {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-slate-200/80 bg-white shadow-sm ${padding ? "p-5 md:p-6" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function AdminAlert({
  variant = "success",
  children,
}: {
  variant?: "success" | "info";
  children: ReactNode;
}) {
  const styles =
    variant === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-blue-200 bg-blue-50 text-blue-800";

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm font-medium ${styles}`}>
      {children}
    </div>
  );
}

export function AdminTable({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <AdminCard padding={false} className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">{children}</table>
      </div>
      {footer}
    </AdminCard>
  );
}

export function AdminTableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-slate-200 bg-slate-50/80">
      <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {children}
      </tr>
    </thead>
  );
}

export function AdminStatusBadge({
  active,
  activeLabel = "Aktif",
  inactiveLabel = "Pasif",
}: {
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        active
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {active ? activeLabel : inactiveLabel}
    </span>
  );
}

export function AdminStatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number | string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-csg-blue/40 hover:shadow-md"
    >
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-csg-blue transition group-hover:text-csg-blue-dark">
        {value}
      </p>
      <p className="mt-3 text-xs font-medium text-csg-blue opacity-0 transition group-hover:opacity-100">
        Yönet →
      </p>
    </Link>
  );
}
