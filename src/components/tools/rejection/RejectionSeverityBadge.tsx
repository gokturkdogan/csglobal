import type { RejectionCategory, RejectionSeverity } from "@/lib/rejection-guide-data";

export function getSeverityConfig(severity: RejectionSeverity) {
  switch (severity) {
    case "danger":
      return {
        label: "Kritik Engel",
        dot: "bg-csg-red",
        badge: "bg-csg-red/10 text-csg-red ring-csg-red/20",
        border: "border-csg-red",
        headerBorder: "border-t-csg-red",
        iconWrap: "bg-csg-red/10 text-csg-red",
        summaryCard: "border-csg-red/20 bg-csg-red/[0.04]",
        sidebarActive: "bg-csg-red/[0.08] ring-1 ring-csg-red/25 shadow-sm",
        sidebarLabel: "text-csg-red/80",
        sidebarTitle: "text-csg-red",
        sidebarIcon: "bg-csg-red text-white",
        sidebarArrow: "text-csg-red",
      };
    case "warning":
      return {
        label: "Önemli Uyarı",
        dot: "bg-amber-500",
        badge: "bg-amber-100 text-amber-800 ring-amber-200/80",
        border: "border-amber-400",
        headerBorder: "border-t-amber-500",
        iconWrap: "bg-amber-100 text-amber-700",
        summaryCard: "border-amber-200/80 bg-amber-50/40",
        sidebarActive: "bg-amber-50 ring-1 ring-amber-200/80 shadow-sm",
        sidebarLabel: "text-amber-700/80",
        sidebarTitle: "text-amber-800",
        sidebarIcon: "bg-amber-500 text-white",
        sidebarArrow: "text-amber-600",
      };
    case "info":
      return {
        label: "Önemli Bilgi",
        dot: "bg-csg-blue-light",
        badge: "bg-csg-blue/10 text-csg-blue ring-csg-blue/15",
        border: "border-csg-blue-light",
        headerBorder: "border-t-csg-blue",
        iconWrap: "bg-csg-blue/10 text-csg-blue",
        summaryCard: "border-csg-blue/15 bg-csg-blue/[0.04]",
        sidebarActive: "bg-csg-blue/[0.06] ring-1 ring-csg-blue/20 shadow-sm",
        sidebarLabel: "text-csg-blue/80",
        sidebarTitle: "text-csg-blue",
        sidebarIcon: "bg-csg-blue text-white",
        sidebarArrow: "text-csg-blue",
      };
  }
}

export function getCategoryLabel(category: RejectionCategory): string {
  switch (category) {
    case "entry":
      return "Giriş";
    case "visa":
      return "Vize";
    case "residency":
      return "İkamet";
    case "protection":
      return "Koruma";
  }
}

export function RejectionSeverityBadge({
  severity,
  size = "sm",
}: {
  severity: RejectionSeverity;
  size?: "sm" | "md";
}) {
  const config = getSeverityConfig(severity);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wide ring-1 ${config.badge} ${
        size === "md" ? "px-3 py-1 text-[11px]" : "px-2 py-0.5 text-[10px]"
      }`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

export function RejectionCategoryBadge({
  category,
}: {
  category: RejectionCategory;
}) {
  return (
    <span className="inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
      {getCategoryLabel(category)}
    </span>
  );
}
