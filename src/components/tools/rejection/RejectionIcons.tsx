import type { RejectionIconKey } from "@/lib/rejection-guide-data";

type IconProps = {
  className?: string;
};

function SvgBase({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className ?? "h-5 w-5"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function RejectionReasonIcon({
  icon,
  className,
}: {
  icon: RejectionIconKey;
  className?: string;
}) {
  switch (icon) {
    case "entry-ban":
      return (
        <SvgBase className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M5 5l14 14" />
        </SvgBase>
      );
    case "visa-deny":
      return (
        <SvgBase className={className}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <circle cx="12" cy="10" r="2.5" />
          <path d="M8 17h8" />
        </SvgBase>
      );
    case "residency-procedure":
      return (
        <SvgBase className={className}>
          <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" />
          <path d="M14 3h7v7" />
          <path d="M10 14 21 3" />
        </SvgBase>
      );
    case "short-stay":
      return (
        <SvgBase className={className}>
          <path d="M3 10h18" />
          <path d="M7 6v8M12 4v12M17 7v6" />
        </SvgBase>
      );
    case "short-stay-cancel":
      return (
        <SvgBase className={className}>
          <path d="M12 3v3" />
          <path d="M12 18v3" />
          <path d="M4.2 4.2l2.1 2.1" />
          <path d="M17.7 17.7l2.1 2.1" />
          <circle cx="12" cy="12" r="5" />
          <path d="M9.5 9.5l5 5" />
        </SvgBase>
      );
    case "family-residency":
    case "family-requirements":
      return (
        <SvgBase className={className}>
          <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
          <circle cx="10" cy="8" r="3" />
          <path d="M18 8v11" />
          <path d="M15 11h6" />
        </SvgBase>
      );
    case "student-residency":
    case "student-requirements":
      return (
        <SvgBase className={className}>
          <path d="M12 3 2 8l10 5 10-5-10-5Z" />
          <path d="M6 10v6c0 1.7 2.7 3 6 3s6-1.3 6-3v-6" />
        </SvgBase>
      );
    case "long-term":
      return (
        <SvgBase className={className}>
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="M4.9 4.9l2.8 2.8" />
          <path d="M16.3 16.3l2.8 2.8" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
          <circle cx="12" cy="12" r="4" />
        </SvgBase>
      );
    case "protection-exclude":
      return (
        <SvgBase className={className}>
          <path d="M12 3 4 7v6c0 5 3.5 7.7 8 8 4.5-.3 8-3 8-8V7l-8-4Z" />
          <path d="M9 12h6" />
        </SvgBase>
      );
    case "unacceptable":
      return (
        <SvgBase className={className}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 8l8 8M16 8l-8 8" />
        </SvgBase>
      );
    case "protection-deny":
      return (
        <SvgBase className={className}>
          <path d="M12 3 4 7v6c0 5 3.5 7.7 8 8 4.5-.3 8-3 8-8V7l-8-4Z" />
          <path d="M12 8v5" />
          <path d="M12 16h.01" />
        </SvgBase>
      );
    case "fast-track-deny":
      return (
        <SvgBase className={className}>
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
        </SvgBase>
      );
    case "humanitarian":
      return (
        <SvgBase className={className}>
          <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10Z" />
        </SvgBase>
      );
    case "victim":
      return (
        <SvgBase className={className}>
          <circle cx="12" cy="7" r="3" />
          <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
          <path d="M12 10v4" />
        </SvgBase>
      );
    default:
      return (
        <SvgBase className={className}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6" />
        </SvgBase>
      );
  }
}

export function RejectionSectionIcon({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  if (title.includes("Ne Anlama")) {
    return (
      <SvgBase className={className}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 10v6" />
        <path d="M12 7h.01" />
      </SvgBase>
    );
  }
  if (title.includes("Nedenler")) {
    return (
      <SvgBase className={className}>
        <path d="M8 6h13" />
        <path d="M8 12h13" />
        <path d="M8 18h13" />
        <path d="M3 6h.01" />
        <path d="M3 12h.01" />
        <path d="M3 18h.01" />
      </SvgBase>
    );
  }
  if (title.includes("Örnek")) {
    return (
      <SvgBase className={className}>
        <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
        <path d="M14 3v5h5" />
        <path d="M8 13h8M8 17h5" />
      </SvgBase>
    );
  }
  if (title.includes("Düzelir")) {
    return (
      <SvgBase className={className}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </SvgBase>
    );
  }
  if (title.includes("Son Değildir")) {
    return (
      <SvgBase className={className}>
        <path d="M12 3v3" />
        <path d="M6 6l2 2" />
        <path d="M18 6l-2 2" />
        <path d="M4 12H2" />
        <path d="M22 12h-2" />
        <path d="M6 18l2-2" />
        <path d="M18 18l-2-2" />
        <path d="M12 18v3" />
        <circle cx="12" cy="12" r="4" />
      </SvgBase>
    );
  }
  return (
    <SvgBase className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
    </SvgBase>
  );
}
