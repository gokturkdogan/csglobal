import { revalidatePath } from "next/cache";

/** Admin kayıtlarından sonra sitemap önbelleğini temizler. */
export function revalidateSitemap() {
  revalidatePath("/sitemap.xml");
}
