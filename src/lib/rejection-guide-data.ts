export const REJECTION_GUIDE_PATH = "/araclar/ikamet-vize-ret";
export const REJECTION_GUIDE_TOOL_SLUG = "ikamet-vize-ret";

export type RejectionIconKey =
  | "entry-ban"
  | "visa-deny"
  | "residency-procedure"
  | "short-stay"
  | "short-stay-cancel"
  | "family-residency"
  | "student-residency"
  | "long-term"
  | "protection-exclude"
  | "unacceptable"
  | "protection-deny"
  | "fast-track-deny"
  | "family-requirements"
  | "student-requirements"
  | "humanitarian"
  | "victim";

export type RejectionSeverity = "danger" | "warning" | "info";

export type RejectionCategory = "entry" | "visa" | "residency" | "protection";

export type RejectionSection = {
  title: string;
  contentHtml: string;
  variant?: "default" | "warning" | "info";
};

export type RejectionReason = {
  slug: string;
  title: string;
  code: string;
  shortDescription: string;
  icon: RejectionIconKey;
  severity: RejectionSeverity;
  category: RejectionCategory;
  sections: RejectionSection[];
  relatedSlugs?: string[];
};

export const rejectionGuideMeta = {
  title: "İkamet & Vize Ret Rehberi",
  description:
    "Ret kararınızda belirtilen kanun maddesini seçerek gerekçeyi, olası nedenleri ve izlenebilecek süreci inceleyin.",
  emptyTitle: "Ret kararınızdaki maddeyi seçin",
  emptyDescription:
    "Ret kararınızın “Ret Gerekçesi” bölümünde yer alan kanun maddesini soldaki listeden seçerek detaylı açıklamaya ulaşabilirsiniz.",
  disclaimerTitle: "Önemli Bilgilendirme",
  disclaimerBody:
    "Bu araç yalnızca genel bilgilendirme amacı taşır. Gösterilen bilgiler hukuki görüş veya başvurunun sonucu hakkında garanti oluşturmaz. Her ret kararı kişinin dosyası, belgeleri, geçmişi ve idari kararın içeriğine göre ayrıca değerlendirilmelidir. Güncel mevzuat ve resmi kurum uygulamaları esas alınmalıdır.",
  ctaTitle: "Ret kararınız dosyanıza özel değerlendirilmelidir.",
  ctaSubtitle:
    "Ret gerekçenizin başvuru belgeleriniz ve mevcut durumunuzla birlikte değerlendirilmesi için uzman ekibimizle iletişime geçebilirsiniz.",
};

import { rejectionReasonsContent } from "./rejection-reasons-content";

export const rejectionReasons: RejectionReason[] = rejectionReasonsContent as unknown as RejectionReason[];

export function getRejectionReasonBySlug(slug: string): RejectionReason | undefined {
  return rejectionReasons.find((item) => item.slug === slug);
}

export function buildRejectionReasonPath(slug?: string): string {
  if (!slug) return REJECTION_GUIDE_PATH;
  return `${REJECTION_GUIDE_PATH}/${slug}`;
}

export function getActiveRejectionSlugFromPathname(pathname: string): string | undefined {
  if (pathname === REJECTION_GUIDE_PATH) return undefined;
  const prefix = `${REJECTION_GUIDE_PATH}/`;
  if (!pathname.startsWith(prefix)) return undefined;
  const slug = pathname.slice(prefix.length).split("/")[0];
  return slug || undefined;
}

export function getRelatedRejectionReasons(reason: RejectionReason): RejectionReason[] {
  if (!reason.relatedSlugs?.length) return [];
  return reason.relatedSlugs
    .map((slug) => getRejectionReasonBySlug(slug))
    .filter((item): item is RejectionReason => Boolean(item));
}
