import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminTextArea,
} from "@/components/admin/AdminForm";

type SeoMetadataValues = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  ogImage?: string | null;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  structuredData?: string | null;
};

export function SeoMetadataBlock({ seo }: { seo?: SeoMetadataValues | null }) {
  return (
    <AdminFormSection
      title="SEO"
      description="Arama motoru ve sosyal paylaşım meta verileri. Boş alanlar sayfa içeriğinden türetilir."
    >
      <AdminField
        label="Meta başlık"
        name="seoMetaTitle"
        value={seo?.metaTitle}
        placeholder="Örn. Almanya Turistik Vize | CSGLOBAL"
      />
      <AdminTextArea
        label="Meta açıklama"
        name="seoMetaDescription"
        value={seo?.metaDescription}
        rows={3}
        hint="Önerilen uzunluk: 150-160 karakter."
      />
      <AdminField
        label="Canonical URL"
        name="seoCanonicalUrl"
        value={seo?.canonicalUrl}
        placeholder="https://csglobal.com/almanya/turistik-vize"
      />
      <AdminField
        label="OG görsel URL"
        name="seoOgImage"
        value={seo?.ogImage}
        placeholder="https://..."
      />
      <AdminCheckbox
        label="Robots: index"
        name="seoRobotsIndex"
        defaultChecked={seo?.robotsIndex ?? true}
      />
      <AdminCheckbox
        label="Robots: follow"
        name="seoRobotsFollow"
        defaultChecked={seo?.robotsFollow ?? true}
      />
      <AdminTextArea
        label="Yapısal veri (JSON-LD)"
        name="seoStructuredData"
        value={seo?.structuredData}
        rows={6}
        hint="Tek nesne veya JSON dizisi. Geçerli JSON olmalı."
      />
    </AdminFormSection>
  );
}
