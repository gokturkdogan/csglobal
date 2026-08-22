import { notFound } from "next/navigation";
import { saveForeignConsultancyContentAction } from "@/lib/admin-actions";
import { ForeignConsultancyCategoryField } from "@/components/admin/foreign-consultancy/ForeignConsultancyCategoryField";
import { ForeignConsultancyLocalizedFeatureBlock } from "@/components/admin/foreign-consultancy/ForeignConsultancyLocalizedFeatureBlock";
import { ForeignConsultancyLocalizedHeroBlock } from "@/components/admin/foreign-consultancy/ForeignConsultancyLocalizedHeroBlock";
import { ForeignConsultancyLocalizedSectionsEditor } from "@/components/admin/foreign-consultancy/ForeignConsultancyLocalizedSectionsEditor";
import { ForeignConsultancyTranslationsProvider } from "@/components/admin/foreign-consultancy/ForeignConsultancyTranslationsProvider";
import { LocalizedAdminField } from "@/components/admin/foreign-consultancy/LocalizedAdminField";
import { LocalizedAdminTextArea } from "@/components/admin/foreign-consultancy/LocalizedAdminTextArea";
import { LocalizedVisualTitleField } from "@/components/admin/foreign-consultancy/LocalizedVisualTitleField";
import {
  VisualSlugField,
  VisualSlugProvider,
} from "@/components/admin/VisualSlugProvider";
import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminActionForm,
  AdminSubmitButton,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { AdminForeignConsultancyPublicUrl } from "@/components/admin/AdminPublicUrl";
import { findForeignConsultancyContentById } from "@/lib/repositories/foreign-consultancy.repository";
import { SeoMetadataBlock } from "@/components/admin/SeoMetadataBlock";
import { findSeoMetadata } from "@/lib/repositories/seo.repository";
import { SeoEntityType } from "@/generated/prisma/client";
import { buildForeignConsultancyContentPath } from "@/lib/foreign-consultancy";
import {
  foreignConsultancyCategoryToSlug,
  type ForeignConsultancyCategoryValue,
} from "@/lib/foreign-consultancy-categories";

type Props = { params: Promise<{ id: string }> };

export default async function EditForeignConsultancyContentPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const content = isNew ? null : await findForeignConsultancyContentById(id);
  if (!isNew && !content) notFound();

  const initialPath = content
    ? buildForeignConsultancyContentPath(
        foreignConsultancyCategoryToSlug(content.category as ForeignConsultancyCategoryValue),
        content.slug,
      )
    : null;

  const seo = content
    ? await findSeoMetadata(SeoEntityType.FOREIGN_CONSULTANCY, content.id)
    : null;

  return (
    <div className="space-y-6">
      <VisualSlugProvider initialSlug={content?.slug ?? ""} initialTitle={content?.name ?? ""}>
        <AdminPageHeader
          title={content ? `${content.name} Düzenle` : "Yeni Yabancı Danışmanlık İçerik"}
          description="Banner, içerik bölümleri ve görselli alanlar. Her alanda dil sekmeleriyle çeviri ekleyebilirsiniz."
          publicUrl={
            <AdminForeignConsultancyPublicUrl
              initialCategory={content?.category as ForeignConsultancyCategoryValue | undefined}
              initialPath={initialPath}
            />
          }
        />

        <ForeignConsultancyTranslationsProvider
          initialTranslationsJson={content?.translationsJson}
        >
          <AdminActionForm action={saveForeignConsultancyContentAction} className="max-w-3xl space-y-6">
            {content && <input type="hidden" name="id" value={content.id} />}

            <AdminFormSection title="Kategori">
              <ForeignConsultancyCategoryField
                initialCategory={content?.category as ForeignConsultancyCategoryValue | undefined}
              />
            </AdminFormSection>

            <AdminFormSection title="İçerik bilgileri">
              <LocalizedVisualTitleField required />
              <VisualSlugField cloudinaryPrefix="ForeignConsultancy" placeholder="kisa-sureli-ikamet" />
              <LocalizedAdminField
                label="Liste özeti (kart / SEO)"
                field="excerpt"
                trName="excerpt"
                trValue={content?.excerpt}
                hint="Liste ve arama sonuçlarında görünür."
              />
              <LocalizedAdminTextArea
                label="Kısa açıklama (liste / kart)"
                field="shortDescription"
                trName="shortDescription"
                trValue={content?.shortDescription}
                rows={3}
                hint="Banner alt metin boşsa burada kullanılabilir."
              />
              <LocalizedAdminField
                label="İşlem süresi"
                field="processingTime"
                trName="processingTime"
                trValue={content?.processingTime}
                placeholder="Örn. 10-15 iş günü"
              />
              <AdminField
                label="Sıra"
                name="sortOrder"
                type="number"
                value={content?.sortOrder ?? 0}
              />
              <AdminCheckbox
                label="Randevu gerekli"
                name="requiresAppointment"
                defaultChecked={content?.requiresAppointment ?? false}
              />
              <AdminCheckbox
                label="Yayında (aktif)"
                name="isActive"
                defaultChecked={content?.isActive ?? true}
              />
            </AdminFormSection>

            <AdminFormSection
              title="Banner"
              description="Banner metinleri. Görsel site varsayılanından gelir."
            >
              <ForeignConsultancyLocalizedHeroBlock
                heroTitle={content?.heroTitle}
                heroSubtitle={content?.heroSubtitle}
                defaultTitle={content?.name}
                defaultSubtitle={content?.shortDescription ?? content?.excerpt}
              />
            </AdminFormSection>

            <AdminFormSection
              title="İçerik bölümleri"
              description="Her bölüm başlığı ve içeriği için dil sekmeleri kullanın."
            >
              <ForeignConsultancyLocalizedSectionsEditor initialJson={content?.sectionsJson} />
            </AdminFormSection>

            <AdminFormSection
              title="Görsel alan 1"
              description="Görsel, başlık ve metin birlikte; sitede görsel solda."
            >
              <ForeignConsultancyLocalizedFeatureBlock
                index={1}
                featureImage={content?.featureImage1 ?? ""}
                featureImageTitle={content?.featureImage1Title}
                featureImageText={content?.featureImage1Text}
              />
            </AdminFormSection>

            <AdminFormSection
              title="Görsel alan 2"
              description="Görsel, başlık ve metin birlikte; sitede görsel sağda."
            >
              <ForeignConsultancyLocalizedFeatureBlock
                index={2}
                featureImage={content?.featureImage2 ?? ""}
                featureImageTitle={content?.featureImage2Title}
                featureImageText={content?.featureImage2Text}
              />
            </AdminFormSection>

            <SeoMetadataBlock seo={seo} />

            <AdminSubmitButton>Kaydet</AdminSubmitButton>
          </AdminActionForm>
        </ForeignConsultancyTranslationsProvider>
      </VisualSlugProvider>
    </div>
  );
}
