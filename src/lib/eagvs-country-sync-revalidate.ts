import { revalidatePath } from "next/cache";
import { buildVisaProgramPath } from "@/lib/paths";
import { revalidateSitemap } from "@/lib/sitemap-revalidate";
import type { EagvsCountrySyncResult } from "@/lib/eagvs-country-sync";

export function revalidateAfterEagvsCountrySync(result: EagvsCountrySyncResult): void {
  revalidatePath(`/${result.countrySlug}`);
  revalidatePath("/admin/countries");
  revalidatePath(`/admin/countries/${result.countryId}`);
  revalidatePath("/admin/vize-programlari");
  revalidatePath("/admin/dokumanlar");
  revalidatePath("/admin/eagvs-country-sync");
  revalidatePath("/admin/eagvs-country-batch");
  revalidateSitemap();

  for (const program of result.programs) {
    revalidatePath(buildVisaProgramPath(result.countrySlug, program.slug));
  }

  for (const document of result.documents) {
    revalidatePath(document.publicPath);
  }
}
