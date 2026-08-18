import { notFound } from "next/navigation";
import { saveForeignConsultancyCategoryPageAction } from "@/lib/admin-actions";
import { ServiceFeatureBlock } from "@/components/admin/service/ServiceFeatureBlock";
import { ServiceHeroBlock } from "@/components/admin/service/ServiceHeroBlock";
import { ServiceSectionsEditor } from "@/components/admin/service/ServiceSectionsEditor";
import {
  VisualSlugProvider,
  VisualTitleField,
} from "@/components/admin/VisualSlugProvider";
import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminActionForm,
  AdminSubmitButton,
  AdminTextArea,
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
          description="Kategori sayfasının orta alanında görünen SEO içeriği. Soldaki içerik listesi ayrı yönetilir."
          publicUrl={<AdminPublicUrlDisplay path={publicPath} />}
          actions={
            <AdminButtonLink href={publicPath} variant="secondary">
              Sayfayı görüntüle
            </AdminButtonLink>
          }
        />

        <AdminActionForm action={saveForeignConsultancyCategoryPageAction} className="max-w-3xl space-y-6">
          {page && <input type="hidden" name="id" value={page.id} />}
          <input type="hidden" name="categorySlug" value={categorySlug} />

          <AdminFormSection title="Sayfa bilgileri">
            <VisualTitleField label="Başlık" name="name" required />
            <AdminField
              label="Liste özeti (kart / SEO)"
              name="excerpt"
              value={page?.excerpt}
              hint="Arama sonuçlarında görünür."
            />
            <AdminTextArea
              label="Kısa açıklama"
              name="shortDescription"
              value={page?.shortDescription ?? option.description}
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
            <ServiceHeroBlock
              heroTitle={page?.heroTitle}
              heroSubtitle={page?.heroSubtitle}
              defaultTitle={page?.name ?? option.title}
              defaultSubtitle={page?.shortDescription ?? option.description}
            />
          </AdminFormSection>

          <AdminFormSection
            title="İçerik bölümleri"
            description="Orta alanda görünen ana SEO içeriği."
          >
            <ServiceSectionsEditor initialJson={page?.sectionsJson} />
          </AdminFormSection>

          <AdminFormSection title="Görsel alan 1">
            <ServiceFeatureBlock
              index={1}
              featureImage={page?.featureImage1 ?? ""}
              featureImageTitle={page?.featureImage1Title}
              featureImageText={page?.featureImage1Text}
            />
          </AdminFormSection>

          <AdminFormSection title="Görsel alan 2">
            <ServiceFeatureBlock
              index={2}
              featureImage={page?.featureImage2 ?? ""}
              featureImageTitle={page?.featureImage2Title}
              featureImageText={page?.featureImage2Text}
            />
          </AdminFormSection>

          <SeoMetadataBlock seo={seo} />

          <AdminSubmitButton>Kaydet</AdminSubmitButton>
        </AdminActionForm>
      </VisualSlugProvider>
    </div>
  );
}
