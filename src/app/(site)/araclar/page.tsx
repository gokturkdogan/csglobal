import { ToolsList } from "@/components/domain/ToolsList";
import { ToolsPageHero } from "@/components/domain/ToolsPageHero";
import { TOOLS_LIST_PATH, siteTools } from "@/lib/tools";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

const FALLBACK_TITLE = "Araçlar";
const FALLBACK_DESCRIPTION =
  "Vize ve göçmenlik süreçleriniz için hesaplama ve bilgi araçları. CSGLOBAL pratik yardımcılar.";

export async function generateMetadata() {
  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: "araclar",
    path: TOOLS_LIST_PATH,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESCRIPTION,
  });
}

export default function ToolsPage() {
  return (
    <>
      <ToolsPageHero toolCount={siteTools.length} />

      <section className="home-band-soft border-b border-slate-200/60">
        <div className="site-container py-12 md:py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Tüm araçlar</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              İhtiyacınıza uygun aracı seçerek devam edin.
            </p>
          </div>
          <div className="mt-10">
            <ToolsList />
          </div>
        </div>
      </section>
    </>
  );
}
