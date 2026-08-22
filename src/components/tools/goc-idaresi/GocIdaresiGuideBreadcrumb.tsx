"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  getActiveGocIdaresiSlugFromPathname,
  getGocIdaresiTopicBySlug,
  GOC_IDARESI_GUIDE_PATH,
  gocIdaresiGuideMeta,
} from "@/lib/goc-idaresi-guide-data";
import { TOOLS_LIST_PATH } from "@/lib/tools";

export function GocIdaresiGuideBreadcrumb() {
  const pathname = usePathname();
  const activeSlug = getActiveGocIdaresiSlugFromPathname(pathname);
  const topic = activeSlug ? getGocIdaresiTopicBySlug(activeSlug) : undefined;

  return (
    <Breadcrumb
      items={[
        { label: "Ana Sayfa", href: "/" },
        { label: "Araçlar", href: TOOLS_LIST_PATH },
        {
          label: gocIdaresiGuideMeta.title,
          href: topic ? GOC_IDARESI_GUIDE_PATH : undefined,
        },
        ...(topic ? [{ label: topic.title }] : []),
      ]}
    />
  );
}
