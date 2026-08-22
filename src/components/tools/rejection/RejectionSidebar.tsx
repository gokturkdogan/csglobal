"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RejectionReasonIcon } from "@/components/tools/rejection/RejectionIcons";
import {
  buildRejectionReasonPath,
  type RejectionIconKey,
  type RejectionReason,
} from "@/lib/rejection-guide-data";

type SidebarItem = Pick<
  RejectionReason,
  "slug" | "title" | "code" | "shortDescription" | "icon"
>;

type Props = {
  reasons: SidebarItem[];
  activeSlug?: string;
};

function MaddeTile({
  item,
  href,
  active,
  onClick,
}: {
  item: SidebarItem;
  href?: string;
  active: boolean;
  onClick?: () => void;
}) {
  const className = `group flex min-h-[88px] w-full cursor-pointer flex-col rounded-xl border px-3 py-3 text-left transition ${
    active
      ? "border-csg-red bg-csg-red text-white shadow-md shadow-csg-red/25"
      : "border-slate-200 bg-white text-slate-800 hover:border-csg-red/40 hover:bg-csg-red/[0.04]"
  }`;

  const inner = (
    <>
      <div className="flex w-full items-start justify-between gap-2">
        <span
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            active ? "bg-white/15 text-white" : "bg-csg-red/10 text-csg-red"
          }`}
        >
          <RejectionReasonIcon icon={item.icon} className="h-5 w-5" />
        </span>
        <span
          className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${
            active ? "bg-white/15 text-white/90" : "bg-slate-100 text-slate-500"
          }`}
        >
          {item.code}
        </span>
      </div>
      <span
        className={`mt-2 line-clamp-2 text-xs font-semibold leading-snug ${
          active ? "text-white" : "text-slate-900 group-hover:text-csg-red"
        }`}
      >
        {item.title}
      </span>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {inner}
      </button>
    );
  }

  return (
    <Link href={href!} className={className}>
      {inner}
    </Link>
  );
}

export function RejectionSidebar({ reasons, activeSlug }: Props) {
  const pathname = usePathname();

  return (
    <nav aria-label="Kanun maddeleri" className="flex h-full flex-col">
      <div className="border-b border-slate-200/80 px-4 py-4 md:px-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 items-center rounded bg-csg-red px-2 text-[10px] font-bold uppercase tracking-wide text-white">
            Liste
          </span>
          <h2 className="text-sm font-semibold text-slate-900">Kanun Maddeleri</h2>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          Karar belgenizdeki ret gerekçesi maddesini seçin
        </p>
      </div>

      <div className="flex-1 p-3 md:p-4">
        <ul className="grid grid-cols-2 gap-2.5">
          {reasons.map((item) => {
            const href = buildRejectionReasonPath(item.slug);
            const active = activeSlug === item.slug || pathname === href;
            return (
              <li key={item.slug}>
                <MaddeTile item={item} href={href} active={active} />
              </li>
            );
          })}
        </ul>

        <p className="mt-4 rounded-lg bg-white px-3 py-2.5 text-[11px] leading-relaxed text-slate-500 ring-1 ring-slate-200/80">
          Belgenizde yazan madde numarasını yukarıdaki listeden seçerek analizi açın.
        </p>
      </div>
    </nav>
  );
}

export function RejectionMobileSelector({ reasons, activeSlug }: Props) {
  const router = useRouter();

  return (
    <div className="border-t border-slate-200 bg-slate-50/70 p-4 lg:hidden">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex rounded-md bg-csg-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          Liste
        </span>
        <p className="text-sm font-semibold text-slate-900">Kanun Maddeleri</p>
      </div>

      <ul className="grid grid-cols-2 gap-2.5">
        {reasons.map((item) => {
          const active = activeSlug === item.slug;
          return (
            <li key={item.slug}>
              <MaddeTile
                item={item}
                active={active}
                onClick={() => router.push(buildRejectionReasonPath(item.slug))}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export type { SidebarItem, RejectionIconKey };
