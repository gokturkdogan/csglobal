import { notFound } from "next/navigation";
import { saveForeignConsultancyContentAction } from "@/lib/admin-actions";
import { ServiceFeatureBlock } from "@/components/admin/service/ServiceFeatureBlock";
import { ServiceHeroBlock } from "@/components/admin/service/ServiceHeroBlock";
import { ServiceSectionsEditor } from "@/components/admin/service/ServiceSectionsEditor";
import { ForeignConsultancyCategoryField } from "@/components/admin/foreign-consultancy/ForeignConsultancyCategoryField";
import {
  VisualSlugField,
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
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { AdminForeignConsultancyPublicUrl } from "@/components/admin/AdminPublicUrl";
import { findForeignConsultancyContentById } from "@/lib/repositories/foreign-consultancy.repository";
import { SeoMetadataBlock } from "@/components/admin/SeoMetadataBlock";
import { findSeoMetadata } from "@/lib/repositories/seo.repository";
import { SeoEntityType } from "@/generated/prisma/client";
import {
  buildForeignConsultancyContentPath,
} from "@/lib/foreign-consultancy";
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
          description="Banner, içerik bölümleri ve görselli alanlar. Ülke modülünden bağımsız içerik."
          publicUrl={
            <AdminForeignConsultancyPublicUrl
              initialCategory={content?.category as ForeignConsultancyCategoryValue | undefined}
              initialPath={initialPath}
            />
          }
        />

        <AdminActionForm action={saveForeignConsultancyContentAction} className="max-w-3xl space-y-6">
          {content && <input type="hidden" name="id" value={content.id} />}

          <AdminFormSection title="Kategori">
            <ForeignConsultancyCategoryField
              initialCategory={content?.category as ForeignConsultancyCategoryValue | undefined}
            />
          </AdminFormSection>

          <AdminFormSection title="İçerik bilgileri">
            <VisualTitleField label="Başlık" name="name" required />
            <VisualSlugField cloudinaryPrefix="ForeignConsultancy" placeholder="kisa-sureli-ikamet" />
            <AdminField
              label="Liste özeti (kart / SEO)"
              name="excerpt"
              value={content?.excerpt}
              hint="Liste ve arama sonuçlarında görünür."
            />
            <AdminTextArea
              label="Kısa açıklama (liste / kart)"
              name="shortDescription"
              value={content?.shortDescription}
              rows={3}
              hint="Banner alt metin boşsa burada kullanılabilir."
            />
            <AdminField
              label="İşlem süresi"
              name="processingTime"
              value={content?.processingTime}
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
            <ServiceHeroBlock
              heroTitle={content?.heroTitle}
              heroSubtitle={content?.heroSubtitle}
              defaultTitle={content?.name}
              defaultSubtitle={content?.shortDescription ?? content?.excerpt}
            />
          </AdminFormSection>

          <AdminFormSection
            title="İçerik bölümleri"
            description="Başlık ve zengin metin blokları."
          >
            <ServiceSectionsEditor initialJson={content?.sectionsJson} />
          </AdminFormSection>

          <AdminFormSection
            title="Görsel alan 1"
            description="Görsel, başlık ve metin birlikte; sitede görsel solda."
          >
            <ServiceFeatureBlock
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
            <ServiceFeatureBlock
              index={2}
              featureImage={content?.featureImage2 ?? ""}
              featureImageTitle={content?.featureImage2Title}
              featureImageText={content?.featureImage2Text}
            />
          </AdminFormSection>

          <SeoMetadataBlock seo={seo} />

          <AdminSubmitButton>Kaydet</AdminSubmitButton>
        </AdminActionForm>
      </VisualSlugProvider>
    </div>
  );
}
