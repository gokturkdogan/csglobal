import { notFound } from "next/navigation";
import { saveForeignConsultancyCategoryPageAction } from "@/lib/admin-actions";
import { ForeignConsultancyLocalizedFeatureBlock } from "@/components/admin/foreign-consultancy/ForeignConsultancyLocalizedFeatureBlock";
import { ForeignConsultancyLocalizedHeroBlock } from "@/components/admin/foreign-consultancy/ForeignConsultancyLocalizedHeroBlock";
import { ForeignConsultancyLocalizedSectionsEditor } from "@/components/admin/foreign-consultancy/ForeignConsultancyLocalizedSectionsEditor";
import { ForeignConsultancyTranslationsProvider } from "@/components/admin/foreign-consultancy/ForeignConsultancyTranslationsProvider";
import { LocalizedAdminField } from "@/components/admin/foreign-consultancy/LocalizedAdminField";
import { LocalizedAdminTextArea } from "@/components/admin/foreign-consultancy/LocalizedAdminTextArea";
import { LocalizedVisualTitleField } from "@/components/admin/foreign-consultancy/LocalizedVisualTitleField";
import { VisualSlugProvider } from "@/components/admin/VisualSlugProvider";
import {
  AdminCheckbox,
  AdminFormSection,
  AdminActionForm,
  AdminSubmitButton,
  AdminButtonLink,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { AdminPublicUrlDisplay } from "@/components/admin/AdminPublicUrl";
import { findForeignConsultancyCategoryPageForAdmin } from "@/lib/repositories/foreign-consultancy.repository";
import { SeoMetadataBlock } from "@/components/admin/SeoMetadataBlock";
import { findSeoMetadata } from "@/lib/repositories/seo.repository";
import { SeoEntityType } from "@/generated/prisma/client";
import {
  buildForeignConsultancyCategoryPath,
  getForeignConsultancyOption,
} from "@/lib/foreign-consultancy";
import { getForeignConsultancyCategoryLabel } from "@/lib/foreign-consultancy-categories";

type Props = { params: Promise<{ categorySlug: string }> };

export default async function AdminForeignConsultancyCategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const option = getForeignConsultancyOption(categorySlug);
  if (!option) notFound();

  const page = await findForeignConsultancyCategoryPageForAdmin(categorySlug);
  const categoryLabel = getForeignConsultancyCategoryLabel(option.category);
  const publicPath = buildForeignConsultancyCategoryPath(categorySlug);

  const seo = page
    ? await findSeoMetadata(SeoEntityType.FOREIGN_CONSULTANCY_CATEGORY, page.id)
    : null;

  return (
    <div className="space-y-6">
      <VisualSlugProvider initialSlug="" initialTitle={page?.name ?? option.title}>
        <AdminPageHeader
          title={`${categoryLabel} İçerik`}
          description="Kategori sayfasının orta alanı. Her alanda dil sekmeleriyle çeviri ekleyebilirsiniz."
          publicUrl={<AdminPublicUrlDisplay path={publicPath} />}
          actions={
            <AdminButtonLink href={publicPath} variant="secondary">
              Sayfayı görüntüle
            </AdminButtonLink>
          }
        />

        <ForeignConsultancyTranslationsProvider initialTranslationsJson={page?.translationsJson}>
          <AdminActionForm action={saveForeignConsultancyCategoryPageAction} className="max-w-3xl space-y-6">
            {page && <input type="hidden" name="id" value={page.id} />}
            <input type="hidden" name="categorySlug" value={categorySlug} />

            <AdminFormSection title="Sayfa bilgileri">
              <LocalizedVisualTitleField required />
              <LocalizedAdminField
                label="Liste özeti (kart / SEO)"
                field="excerpt"
                trName="excerpt"
                trValue={page?.excerpt}
                hint="Arama sonuçlarında görünür."
              />
              <LocalizedAdminTextArea
                label="Kısa açıklama"
                field="shortDescription"
                trName="shortDescription"
                trValue={page?.shortDescription ?? option.description}
                rows={3}
                hint="Banner alt metin boşsa burada kullanılabilir."
              />
              <AdminCheckbox
                label="Yayında (aktif)"
                name="isActive"
                defaultChecked={page?.isActive ?? true}
              />
            </AdminFormSection>

            <AdminFormSection
              title="Banner"
              description="Kategori sayfası üst banner metinleri."
            >
              <ForeignConsultancyLocalizedHeroBlock
                heroTitle={page?.heroTitle}
                heroSubtitle={page?.heroSubtitle}
                defaultTitle={page?.name ?? option.title}
                defaultSubtitle={page?.shortDescription ?? option.description}
              />
            </AdminFormSection>

            <AdminFormSection
              title="İçerik bölümleri"
              description="Her bölüm başlığı ve içeriği için dil sekmeleri kullanın."
            >
              <ForeignConsultancyLocalizedSectionsEditor initialJson={page?.sectionsJson} />
            </AdminFormSection>

            <AdminFormSection title="Görsel alan 1">
              <ForeignConsultancyLocalizedFeatureBlock
                index={1}
                featureImage={page?.featureImage1 ?? ""}
                featureImageTitle={page?.featureImage1Title}
                featureImageText={page?.featureImage1Text}
              />
            </AdminFormSection>

            <AdminFormSection title="Görsel alan 2">
              <ForeignConsultancyLocalizedFeatureBlock
                index={2}
                featureImage={page?.featureImage2 ?? ""}
                featureImageTitle={page?.featureImage2Title}
                featureImageText={page?.featureImage2Text}
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
