"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  getActiveRejectionSlugFromPathname,
  getRejectionReasonBySlug,
  REJECTION_GUIDE_PATH,
} from "@/lib/rejection-guide-data";
import { TOOLS_LIST_PATH } from "@/lib/tools";

export function RejectionGuideBreadcrumb() {
  const pathname = usePathname();
  const activeSlug = getActiveRejectionSlugFromPathname(pathname);
  const reason = activeSlug ? getRejectionReasonBySlug(activeSlug) : undefined;

  return (
    <Breadcrumb
      items={[
        { label: "Ana Sayfa", href: "/" },
        { label: "Araçlar", href: TOOLS_LIST_PATH },
        {
          label: "İkamet & Vize Ret",
          href: reason ? REJECTION_GUIDE_PATH : undefined,
        },
        ...(reason ? [{ label: reason.title }] : []),
      ]}
    />
  );
}
