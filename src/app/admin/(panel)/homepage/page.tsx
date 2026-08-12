import { getSiteSettings } from "@/lib/settings";
import { updateHomepageAction } from "@/lib/admin-actions";
import { buildHomepageContent } from "@/lib/homepage";
import {
  AdminField,
  AdminFormSection,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin/AdminForm";
import { AdminAlert, AdminPageHeader } from "@/components/admin/AdminUi";

export default async function AdminHomepagePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const settings = await getSiteSettings();
  const content = buildHomepageContent(settings);
  const params = await searchParams;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Anasayfa İçeriği"
        description="Hero banner, şirket tanıtımı, bölüm başlıkları ve görseller. Öne çıkan hizmetler Hizmetler menüsünden seçilir."
      />

      {params.saved && <AdminAlert>Anasayfa kaydedildi.</AdminAlert>}

      <form action={updateHomepageAction} className="max-w-3xl space-y-6">
        <AdminFormSection title="Hero banner">
          <AdminField label="Üst etiket" name="homeHeroBadge" value={content.heroBadge} />
          <AdminField label="Başlık" name="homeHeroTitle" value={content.heroTitle} />
          <AdminTextArea
            label="Alt açıklama"
            name="homeHeroSubtitle"
            value={content.heroSubtitle}
            rows={3}
          />
          <AdminField
            label="Arka plan görsel URL"
            name="homeHeroImage"
            value={content.heroImage}
            hint="Örn: /images/hero-banner.png veya https://..."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField
              label="Birincil buton"
              name="homeHeroCtaPrimary"
              value={content.heroCtaPrimary}
            />
            <AdminField
              label="İkincil buton"
              name="homeHeroCtaSecondary"
              value={content.heroCtaSecondary}
            />
          </div>
        </AdminFormSection>

        <AdminFormSection title="Şirket tanıtımı">
          <AdminField label="Başlık" name="homeAboutTitle" value={content.aboutTitle} />
          <AdminTextArea label="Metin" name="homeAboutText" value={content.aboutText} rows={5} />
          <AdminField label="Görsel URL" name="homeAboutImage" value={content.aboutImage} />
          <AdminTextArea
            label="İstatistikler (JSON)"
            name="homeStatsJson"
            value={JSON.stringify(content.stats, null, 2)}
            rows={6}
            hint='[{"label":"Ülke","value":"20+"}]'
            mono
          />
        </AdminFormSection>

        <AdminFormSection title="Neden biz & süreç">
          <AdminField label="Neden biz başlık" name="homeWhyUsTitle" value={content.whyUsTitle} />
          <AdminTextArea
            label="Neden biz (JSON)"
            name="homeWhyUsJson"
            value={JSON.stringify(content.whyUsItems, null, 2)}
            rows={8}
            mono
          />
          <AdminField label="Süreç başlık" name="homeProcessTitle" value={content.processTitle} />
          <AdminTextArea
            label="Süreç adımları (JSON)"
            name="homeProcessJson"
            value={JSON.stringify(content.processSteps, null, 2)}
            rows={8}
            mono
          />
        </AdminFormSection>

        <AdminFormSection title="Bölüm başlıkları">
          <AdminField
            label="Hizmetler başlık"
            name="homeServicesTitle"
            value={content.servicesTitle}
          />
          <AdminTextArea
            label="Hizmetler alt metin"
            name="homeServicesSubtitle"
            value={content.servicesSubtitle}
            rows={2}
          />
          <AdminField
            label="Ülkeler başlık"
            name="homeCountriesTitle"
            value={content.countriesTitle}
          />
          <AdminField
            label="Rehberler başlık"
            name="homeArticlesTitle"
            value={content.articlesTitle}
          />
        </AdminFormSection>

        <AdminFormSection title="Alt CTA banner">
          <AdminField
            label="Başlık"
            name="homeCtaBannerTitle"
            value={content.ctaBannerTitle}
          />
          <AdminTextArea
            label="Alt metin"
            name="homeCtaBannerSubtitle"
            value={content.ctaBannerSubtitle}
            rows={2}
          />
          <AdminField
            label="Görsel URL"
            name="homeCtaBannerImage"
            value={content.ctaBannerImage}
          />
        </AdminFormSection>

        <AdminFormSection title="SEO içerik alanları">
          <AdminField
            label="Giriş başlık"
            name="homeSeoIntroTitle"
            value={content.seoIntroTitle}
          />
          <AdminTextArea
            label="Giriş paragrafları (JSON array)"
            name="homeSeoIntroJson"
            value={JSON.stringify(content.seoIntroParagraphs, null, 2)}
            rows={5}
            mono
          />
          <AdminField
            label="SEO blokları başlık"
            name="homeSeoBlocksTitle"
            value={content.seoBlocksTitle}
          />
          <AdminTextArea
            label="SEO blokları (JSON)"
            name="homeSeoBlocksJson"
            value={JSON.stringify(content.seoBlocks, null, 2)}
            rows={10}
            mono
          />
          <AdminField
            label="Hizmet grupları başlık"
            name="homeServiceAreasTitle"
            value={content.serviceAreasTitle}
          />
          <AdminTextArea
            label="Hizmet grupları alt metin"
            name="homeServiceAreasSubtitle"
            value={content.serviceAreasSubtitle}
            rows={2}
          />
          <AdminField label="SSS başlık" name="homeFaqTitle" value={content.faqTitle} />
          <AdminTextArea
            label="SSS alt metin"
            name="homeFaqSubtitle"
            value={content.faqSubtitle}
            rows={2}
          />
        </AdminFormSection>

        <AdminFormSection title="Anasayfa meta SEO">
          <AdminField label="Meta title" name="homeSeoTitle" value={content.seoTitle} />
          <AdminTextArea
            label="Meta description"
            name="homeSeoDescription"
            value={content.seoDescription}
            rows={2}
          />
        </AdminFormSection>

        <AdminSubmitButton>Anasayfayı kaydet</AdminSubmitButton>
      </form>
    </div>
  );
}
