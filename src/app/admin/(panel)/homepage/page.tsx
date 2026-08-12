import { getSiteSettings } from "@/lib/settings";
import { updateHomepageAction } from "@/lib/admin-actions";
import { buildHomepageContent } from "@/lib/homepage";

export default async function AdminHomepagePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const settings = await getSiteSettings();
  const content = buildHomepageContent(settings);
  const params = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-csg-blue">Anasayfa İçeriği</h1>
      <p className="mt-2 text-sm text-csg-gray">
        Hero banner, şirket tanıtımı, bölüm başlıkları ve görseller. Öne çıkan hizmetler
        Hizmetler menüsünden &quot;Öne çıkan&quot; ile seçilir.
      </p>

      {params.saved && (
        <p className="mt-4 text-sm text-green-600">Anasayfa kaydedildi.</p>
      )}

      <form action={updateHomepageAction} className="mt-8 space-y-10 max-w-3xl">
        <section className="space-y-4 rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900">Hero banner</h2>
          <Field label="Üst etiket" name="homeHeroBadge" value={content.heroBadge} />
          <Field label="Başlık" name="homeHeroTitle" value={content.heroTitle} />
          <TextArea label="Alt açıklama" name="homeHeroSubtitle" value={content.heroSubtitle} rows={3} />
          <Field
            label="Arka plan görsel URL"
            name="homeHeroImage"
            value={content.heroImage}
            hint="Örn: /images/hero-banner.png veya https://..."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Birincil buton" name="homeHeroCtaPrimary" value={content.heroCtaPrimary} />
            <Field label="İkincil buton" name="homeHeroCtaSecondary" value={content.heroCtaSecondary} />
          </div>
        </section>

        <section className="space-y-4 rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900">Şirket tanıtımı</h2>
          <Field label="Başlık" name="homeAboutTitle" value={content.aboutTitle} />
          <TextArea label="Metin" name="homeAboutText" value={content.aboutText} rows={5} />
          <Field label="Görsel URL" name="homeAboutImage" value={content.aboutImage} />
          <TextArea
            label="İstatistikler (JSON)"
            name="homeStatsJson"
            value={JSON.stringify(content.stats, null, 2)}
            rows={6}
            hint='[{"label":"Ülke","value":"20+"}]'
          />
        </section>

        <section className="space-y-4 rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900">Neden biz & süreç</h2>
          <Field label="Neden biz başlık" name="homeWhyUsTitle" value={content.whyUsTitle} />
          <TextArea
            label="Neden biz (JSON)"
            name="homeWhyUsJson"
            value={JSON.stringify(content.whyUsItems, null, 2)}
            rows={8}
          />
          <Field label="Süreç başlık" name="homeProcessTitle" value={content.processTitle} />
          <TextArea
            label="Süreç adımları (JSON)"
            name="homeProcessJson"
            value={JSON.stringify(content.processSteps, null, 2)}
            rows={8}
          />
        </section>

        <section className="space-y-4 rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900">Bölüm başlıkları</h2>
          <Field label="Hizmetler başlık" name="homeServicesTitle" value={content.servicesTitle} />
          <TextArea label="Hizmetler alt metin" name="homeServicesSubtitle" value={content.servicesSubtitle} rows={2} />
          <Field label="Ülkeler başlık" name="homeCountriesTitle" value={content.countriesTitle} />
          <Field label="Rehberler başlık" name="homeArticlesTitle" value={content.articlesTitle} />
        </section>

        <section className="space-y-4 rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900">Alt CTA banner</h2>
          <Field label="Başlık" name="homeCtaBannerTitle" value={content.ctaBannerTitle} />
          <TextArea label="Alt metin" name="homeCtaBannerSubtitle" value={content.ctaBannerSubtitle} rows={2} />
          <Field label="Görsel URL" name="homeCtaBannerImage" value={content.ctaBannerImage} />
        </section>

        <section className="space-y-4 rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900">SEO içerik alanları</h2>
          <Field label="Giriş başlık" name="homeSeoIntroTitle" value={content.seoIntroTitle} />
          <TextArea
            label="Giriş paragrafları (JSON array)"
            name="homeSeoIntroJson"
            value={JSON.stringify(content.seoIntroParagraphs, null, 2)}
            rows={5}
          />
          <Field label="SEO blokları başlık" name="homeSeoBlocksTitle" value={content.seoBlocksTitle} />
          <TextArea
            label="SEO blokları (JSON)"
            name="homeSeoBlocksJson"
            value={JSON.stringify(content.seoBlocks, null, 2)}
            rows={10}
          />
          <Field label="Hizmet grupları başlık" name="homeServiceAreasTitle" value={content.serviceAreasTitle} />
          <TextArea label="Hizmet grupları alt metin" name="homeServiceAreasSubtitle" value={content.serviceAreasSubtitle} rows={2} />
          <Field label="SSS başlık" name="homeFaqTitle" value={content.faqTitle} />
          <TextArea label="SSS alt metin" name="homeFaqSubtitle" value={content.faqSubtitle} rows={2} />
        </section>

        <section className="space-y-4 rounded-lg border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900">Anasayfa meta SEO</h2>
          <Field label="Meta title" name="homeSeoTitle" value={content.seoTitle} />
          <TextArea label="Meta description" name="homeSeoDescription" value={content.seoDescription} rows={2} />
        </section>

        <button type="submit" className="rounded-lg bg-csg-blue px-6 py-2 font-semibold text-white">
          Anasayfayı kaydet
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  hint,
}: {
  label: string;
  name: string;
  value: string;
  hint?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        defaultValue={value}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
      />
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

function TextArea({
  label,
  name,
  value,
  rows = 4,
  hint,
}: {
  label: string;
  name: string;
  value: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <textarea
        name={name}
        rows={rows}
        defaultValue={value}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
      />
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}
