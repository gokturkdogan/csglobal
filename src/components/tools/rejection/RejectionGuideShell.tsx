import Link from "next/link";
import { RejectionSidebar, RejectionMobileSelector } from "@/components/tools/rejection/RejectionSidebar";
import { RejectionDisclaimer } from "@/components/tools/rejection/RejectionContent";
import {
  rejectionGuideMeta,
  rejectionReasons,
  REJECTION_GUIDE_PATH,
} from "@/lib/rejection-guide-data";
import { TOOLS_LIST_PATH } from "@/lib/tools";

type Props = {
  activeSlug?: string;
  children: React.ReactNode;
};

export function RejectionGuideShell({ activeSlug, children }: Props) {
  const sidebarItems = rejectionReasons.map((item) => ({
    slug: item.slug,
    title: item.title,
    code: item.code,
    shortDescription: item.shortDescription,
    icon: item.icon,
  }));

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg shadow-slate-900/[0.05]">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-csg-blue-dark to-csg-blue px-5 py-6 text-white md:px-8 md:py-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-csg-red/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-white/10 blur-3xl"
          />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={TOOLS_LIST_PATH}
                className="inline-flex cursor-pointer items-center rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/90 ring-1 ring-white/15 transition hover:bg-white/15"
              >
                Araçlar
              </Link>
              <span className="inline-flex items-center rounded-md bg-csg-red px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                Dijital araç
              </span>
            </div>

            <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              İkamet &amp; Vize Ret
              <span className="mt-1 block text-white/85">Rehberi ve Analizi</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
              {rejectionGuideMeta.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/10">
                {rejectionReasons.length} madde
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/10">
                6458 sayılı kanun
              </span>
              <Link
                href={REJECTION_GUIDE_PATH}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/10 transition hover:bg-white/15"
              >
                Analizi sıfırla
              </Link>
            </div>
          </div>
        </div>

        <RejectionMobileSelector reasons={sidebarItems} activeSlug={activeSlug} />

        {/* Atasa tarzı ikili tool paneli */}
        <div className="hidden border-t border-slate-200 lg:grid lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)] lg:items-stretch">
          <aside className="border-r border-slate-200 bg-slate-50/60">
            <RejectionSidebar reasons={sidebarItems} activeSlug={activeSlug} />
          </aside>
          <div className="min-w-0 bg-white">{children}</div>
        </div>

        <div className="border-t border-slate-200 lg:hidden">
          <div className="min-w-0 bg-white p-4 sm:p-5">{children}</div>
        </div>
      </div>

      <RejectionDisclaimer />
    </div>
  );
}
