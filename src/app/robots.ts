import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/services/seo.service";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/", "/asset/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
