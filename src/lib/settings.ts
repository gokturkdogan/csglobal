import { cache } from "react";
import { prisma } from "@/lib/prisma";
import {
  defaultSiteSettings,
  type SiteSettingsMap,
  buildWhatsAppUrl,
} from "@/lib/site-settings.shared";

export type { SiteSettingsMap };
export { buildWhatsAppUrl };

export const getSiteSettings = cache(async (): Promise<SiteSettingsMap> => {
  try {
    const rows = await prisma.siteSetting.findMany();
    const map = { ...defaultSiteSettings };
    for (const row of rows) {
      const key = row.key as keyof SiteSettingsMap;
      if (key in map) {
        map[key] = row.value;
      }
    }
    return map;
  } catch {
    return defaultSiteSettings;
  }
});
