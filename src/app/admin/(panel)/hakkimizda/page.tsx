import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveAboutPageAction } from "@/lib/admin-actions";
import {
  parseAboutPageEditableFromSettings,
  paragraphsToText,
} from "@/lib/about";
import { ABOUT_VALUES_COUNT } from "@/lib/about-image-slots";
import { getSiteSettings } from "@/lib/settings";
import {
  aboutHeroImageClassName,
  aboutHeroImageSlot,
  aboutWhoWeAreImageSlot,
  aboutValuesSectionImageSlot,
} from "@/lib/about-image-slots";
import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminActionForm,
  AdminSubmitButton,
  AdminTextArea,
  AdminButtonLink,
} from "@/components/admin/AdminForm";
import { AdminManagedImageField } from "@/components/admin/AdminManagedImageField";
import { AdminPageHeader } from "@/components/admin/AdminUi";

export default async function AdminAboutPage() {
  const page = await prisma.sitePage.findFirst({ where: { slug: "hakkimizda" } });
  if (!page) notFound();

  const settings = await getSiteSettings();
  const content = parseAboutPageEditableFromSettings(settings);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Hakkımızda"
        description="Hero, kurumsal metinler, görseller ve değerlerimiz bölümü."
        actions={
          <AdminButtonLink href="/hakkimizda" variant="secondary">
            Sayfayı görüntüle
          </AdminButtonLink>
        }
      />

      <AdminActionForm action={saveAboutPageAction} className="max-w-3xl space-y-6">
        <input type="hidden" name="id" value={page.id} />

        <AdminFormSection title="Hero" description="Sayfa üst banner ve giriş metinleri.">
          <AdminField label="Üst etiket" name="heroBadge" value={content.heroBadge} />
          <AdminField label="Sayfa başlığı (H1)" name="heroTitle" value={content.heroTitle} required />
          <AdminTextArea
            label="Hero alt metin"
            name="heroSubtitle"
            value={content.heroSubtitle}
            rows={3}
          />
          <AdminManagedImageField
            name="heroImage"
            defaultValue={content.heroImage}
            slot={aboutHeroImageSlot}
            previewVariant="hero"
            imageClassName={aboutHeroImageClassName}
          />
          <AdminCheckbox label="Sayfa yayında" name="isActive" defaultChecked={page.isActive} />
        </AdminFormSection>

        <AdminFormSection title="Biz kimiz">
          <AdminManagedImageField
            name="whoWeAreImage"
            defaultValue={content.whoWeAreImage}
            slot={aboutWhoWeAreImageSlot}
            previewVariant="card"
          />
          <AdminField label="Bölüm başlığı" name="whoWeAreTitle" value={content.whoWeAreTitle} />
          <AdminTextArea
            label="Giriş paragrafı"
            name="whoWeAreLead"
            value={content.whoWeAreLead}
            rows={2}
          />
          <AdminTextArea
            label="İçerik paragrafları"
            name="whoWeAreBody"
            value={paragraphsToText(content.whoWeAreParagraphs)}
            rows={8}
            hint="Paragraflar arasında boş satır bırakın."
          />
        </AdminFormSection>

        <AdminFormSection title="Vizyon ve misyon">
          <AdminField label="Vizyon başlığı" name="visionTitle" value={content.visionTitle} />
          <AdminTextArea label="Vizyon metni" name="visionText" value={content.visionText} rows={4} />
          <AdminField label="Misyon başlığı" name="missionTitle" value={content.missionTitle} />
          <AdminTextArea label="Misyon metni" name="missionText" value={content.missionText} rows={4} />
        </AdminFormSection>

        <AdminFormSection
          title="Değerlerimiz"
          description="4 değer kartı ve bölüm görseli."
        >
          <AdminField label="Bölüm başlığı" name="valuesTitle" value={content.valuesTitle} />
          <AdminTextArea
            label="Bölüm alt metni"
            name="valuesSubtitle"
            value={content.valuesSubtitle}
            rows={2}
          />
          <AdminManagedImageField
            name="valuesSectionImage"
            defaultValue={content.valuesSectionImage}
            slot={aboutValuesSectionImageSlot}
            previewVariant="card"
          />

          {Array.from({ length: ABOUT_VALUES_COUNT }, (_, i) => {
            const item = content.valuesItems[i];
            return (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-4"
              >
                <p className="text-sm font-semibold text-slate-800">Değer {i + 1}</p>
                <AdminField
                  label="Başlık"
                  name={`valuesItem${i}Title`}
                  value={item?.title ?? ""}
                />
                <AdminTextArea
                  label="Açıklama"
                  name={`valuesItem${i}Description`}
                  value={item?.description ?? ""}
                  rows={3}
                />
              </div>
            );
          })}
        </AdminFormSection>

        <AdminSubmitButton>Kaydet</AdminSubmitButton>
      </AdminActionForm>
    </div>
  );
}
