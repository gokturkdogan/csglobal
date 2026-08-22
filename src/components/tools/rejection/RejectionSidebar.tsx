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

function MaddeListItem({
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
  const className = `group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
    active
      ? "bg-csg-red/[0.08] ring-1 ring-csg-red/25"
      : "hover:bg-slate-50"
  }`;

  const inner = (
    <>
      <span
        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          active ? "bg-csg-red text-white" : "bg-csg-red/10 text-csg-red"
        }`}
      >
        <RejectionReasonIcon icon={item.icon} className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block text-[10px] font-bold uppercase tracking-wide ${
            active ? "text-csg-red" : "text-slate-400"
          }`}
        >
          Madde {item.code}
        </span>
        <span
          className={`mt-0.5 block text-sm font-medium leading-snug ${
            active ? "text-csg-red" : "text-slate-800 group-hover:text-slate-950"
          }`}
        >
          {item.title}
        </span>
      </span>
      <span
        aria-hidden
        className={`shrink-0 text-sm transition ${
          active ? "text-csg-red" : "text-slate-300 group-hover:text-slate-400"
        }`}
      >
        →
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
    <nav
      aria-label="Kanun maddeleri"
      className="country-panel-card flex max-h-[inherit] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
    >
      <div className="shrink-0 border-b border-slate-200 bg-slate-900 px-5 py-4 text-white md:px-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
          Kanun maddeleri
        </p>
        <h2 className="mt-2 text-sm font-semibold md:text-base">Ret gerekçesi seçin</h2>
        <p className="mt-1.5 text-xs leading-relaxed text-white/70">
          Belgenizdeki madde numarasını listeden seçin
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
        <ul className="space-y-1">
          {reasons.map((item) => {
            const href = buildRejectionReasonPath(item.slug);
            const active = activeSlug === item.slug || pathname === href;
            return (
              <li key={item.slug}>
                <MaddeListItem item={item} href={href} active={active} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="shrink-0 border-t border-slate-100 px-3 py-2.5">
        <p className="text-[11px] leading-relaxed text-slate-500">
          Karar belgenizdeki ret gerekçesi maddesini seçerek analizi açın.
        </p>
      </div>
    </nav>
  );
}

export function RejectionMobileSelector({ reasons, activeSlug }: Props) {
  const router = useRouter();

  return (
    <div className="border-t border-slate-200 bg-slate-50/70 p-4 lg:hidden">
      <label htmlFor="rejection-reason-select" className="mb-2 block text-sm font-semibold text-slate-900">
        Ret gerekçesi seçin
      </label>
      <select
        id="rejection-reason-select"
        value={activeSlug ?? ""}
        onChange={(event) => {
          const value = event.target.value;
          router.push(value ? buildRejectionReasonPath(value) : buildRejectionReasonPath());
        }}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-900 outline-none focus:border-csg-red focus:ring-2 focus:ring-csg-red/20"
      >
        <option value="">Madde seçin</option>
        {reasons.map((item) => (
          <option key={item.slug} value={item.slug}>
            Madde {item.code}: {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export type { SidebarItem, RejectionIconKey };
