/**
 * Sabit sayfaların varsayılan SEO başlık/açıklamaları (tek kaynak).
 *
 * - Sayfalar `generateMetadata` içinde bunları fallback olarak kullanır.
 * - `prisma/seed-seo-metadata.ts` seo_metadata kayıtlarını bu değerlerle yazar.
 *
 * Başlıklar marka eki olmadan yazılır; layout şablonu " | {siteName}" ekler.
 * Hedef: ek dahil ≤ 60 karakter, açıklama ≤ 160 karakter.
 */
export type StaticPageSeo = { title: string; description: string };

export const STATIC_PAGE_SEO = {
  home: {
    title: "Vize, Oturum ve Çalışma İzni Danışmanlığı",
    description:
      "Vize, oturum izni, çalışma izni ve vatandaşlık danışmanlığı. Ülke bazlı güncel evrak, ücret ve süre bilgileri. CSGLOBAL ile güvenilir göçmenlik rehberi.",
  },
  vizeDanismanlik: {
    title: "Ülkelere Göre Vize ve Göçmenlik Rehberi",
    description:
      "Almanya, Amerika, İngiltere ve 120'den fazla ülke için vize, oturum ve çalışma izni rehberi: gerekli evraklar, ücretler, süreler ve konsolosluklar.",
  },
  hizmetlerimiz: {
    title: "Vize, Oturum ve Çalışma İzni Programları",
    description:
      "Turistik, ticari, öğrenci ve çalışma vizeleri ile oturum izni ve vatandaşlık programları. Ülke ülke gerekli evrak, ücret ve süreleri inceleyin.",
  },
  bloglar: {
    title: "Vize ve Göçmenlik Blogu: Güncel Rehberler",
    description:
      "Vize başvurusu, oturum izni, çalışma izni ve vatandaşlık süreçleri hakkında güncel rehber yazıları, pratik ipuçları ve uzman değerlendirmeleri.",
  },
  hakkimizda: {
    title: "Hakkımızda: Vize ve Göçmenlik Danışmanlığı",
    description:
      "CSGLOBAL hakkında: vize, oturum ve göçmenlik süreçlerinde uzman danışmanlık ekibimiz, çalışma şeklimiz ve şeffaf hizmet anlayışımız.",
  },
  iletisim: {
    title: "İletişim: Vize Danışmanlığı İçin Bize Ulaşın",
    description:
      "Vize ve göçmenlik danışmanlığı için telefon, WhatsApp veya e-posta ile CSGLOBAL uzman ekibine ulaşın.",
  },
  araclar: {
    title: "Vize ve Göçmenlik Hesaplama Araçları",
    description:
      "Deport süresi, vize cezası hesaplama, tahdit kodları, Göç İdaresi adresleri ve ikamet/vize ret gerekçeleri: ücretsiz vize ve göçmenlik araçları.",
  },
  "araclar-deport-hesaplama": {
    title: "Deport Süresi Hesaplama (Giriş Yasağı)",
    description:
      "Türkiye'ye giriş yasağı süresini çıkış şeklinize ve ihlal sürenize göre tahmini hesaplayın. Gönüllü çıkış ile sınır dışı arasındaki farkı görün.",
  },
  "araclar-vize-cezasi-hesaplama": {
    title: "Vize ve İkamet Cezası Hesaplama 2026",
    description:
      "Vize veya ikamet ihlali için 2026 tarifesine göre tahmini idari para cezasını hesaplayın. Sonuç, güncel kura göre TL karşılığıyla gösterilir.",
  },
  "araclar-ikamet-vize-ret": {
    title: "İkamet ve Vize Ret Gerekçeleri Rehberi",
    description:
      "İkamet veya vize ret kararınızdaki kanun maddesini seçin. Gerekçenin anlamını, olası nedenleri ve izlenebilecek süreci madde madde inceleyin.",
  },
  "araclar-goc-idaresi-bul": {
    title: "Göç İdaresi Bul: Adres ve Çalışma Saatleri",
    description:
      "İl veya kurum adına göre Göç İdaresi müdürlüğünün adresini, çalışma saatlerini ve yol tarifini bulun. CS GLOBAL Ankara: 05382666590.",
  },
  "araclar-tahdit-kodlari": {
    title: "Tahdit Kodları ve Anlamları: Güncel Liste",
    description:
      "Ç, G, N, O ve V tahdit kodlarının anlamını, Türkiye giriş durumunu ve varsa yasak süresini inceleyin. CS GLOBAL: 05382666590.",
  },
} as const satisfies Record<string, StaticPageSeo>;

export type StaticPageSeoKey = keyof typeof STATIC_PAGE_SEO;

/** site_pages.slug → STATIC_PAGE_SEO anahtarı (eski slug'lar dahil). */
export const SITE_PAGE_SLUG_TO_SEO_KEY: Record<string, StaticPageSeoKey> = {
  home: "home",
  "vize-danismanlik": "vizeDanismanlik",
  ulkeler: "vizeDanismanlik",
  hizmetlerimiz: "hizmetlerimiz",
  bloglar: "bloglar",
  rehber: "bloglar",
  hakkimizda: "hakkimizda",
  iletisim: "iletisim",
  araclar: "araclar",
  "araclar-deport-hesaplama": "araclar-deport-hesaplama",
  "araclar-vize-cezasi-hesaplama": "araclar-vize-cezasi-hesaplama",
  "araclar-ikamet-vize-ret": "araclar-ikamet-vize-ret",
  "araclar-goc-idaresi-bul": "araclar-goc-idaresi-bul",
  "araclar-tahdit-kodlari": "araclar-tahdit-kodlari",
};

export function getToolPageSeo(toolSlug: string): StaticPageSeo | undefined {
  const key = `araclar-${toolSlug}`;
  return key in STATIC_PAGE_SEO ? STATIC_PAGE_SEO[key as StaticPageSeoKey] : undefined;
}
