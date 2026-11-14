import { notFound } from "next/navigation";
import { saveVisaProgramAction } from "@/lib/admin-actions";
import { ServiceFeatureMediaEditor } from "@/components/admin/service/ServiceFeatureMediaEditor";
import { ServiceHeroBlock } from "@/components/admin/service/ServiceHeroBlock";
import { ServiceSectionsEditor } from "@/components/admin/service/ServiceSectionsEditor";
import { GuideCountryCategoriesField } from "@/components/admin/guide/GuideCountryCategoriesField";
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
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminUi";
import { AdminServicePublicUrl } from "@/components/admin/AdminPublicUrl";
import {
  findVisaProgramById,
  listCategoriesForVisaProgramAdmin,
} from "@/lib/repositories/visa-program.repository";
import { SeoMetadataBlock } from "@/components/admin/SeoMetadataBlock";
import { findSeoMetadata } from "@/lib/repositories/seo.repository";
import { SeoEntityType } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export default async function EditVisaProgramPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const program = isNew ? null : await findVisaProgramById(id);
  if (!isNew && !program) notFound();

  const initialProgramPath =
    program && program.country
      ? `/${program.country.slug}/${program.slug}`
      : null;

  const countries = await prisma.country.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });

  const categoryOptions = await listCategoriesForVisaProgramAdmin();
  const selectedCategoryIds =
    program?.categoryLinks.map((link) => link.categoryId) ??
    (program?.categoryId ? [program.categoryId] : []);

  const defaultCountryId = program?.countryId ?? countries[0]?.id ?? "";

  const seo =
    program
      ? await findSeoMetadata(SeoEntityType.VISA_PROGRAM, program.id)
      : null;

  return (
    <div className="space-y-6">
      <VisualSlugProvider
        initialSlug={program?.slug ?? ""}
        initialTitle={program?.name ?? ""}
      >
        <AdminPageHeader
          title={program ? `${program.name} Düzenle` : "Yeni Vize Programı"}
          description="Banner, içerik bölümleri, kategori bağlantıları, görsel ve video alanları."
          publicUrl={
            <AdminServicePublicUrl
              countries={countries}
              defaultCountryId={program?.countryId ?? ""}
              initialPath={initialProgramPath}
            />
          }
        />

        <AdminActionForm action={saveVisaProgramAction} className="max-w-3xl space-y-6">
          {program && <input type="hidden" name="id" value={program.id} />}

          <AdminFormSection title="Konum ve kategoriler">
            <GuideCountryCategoriesField
              countries={countries}
              categories={categoryOptions}
              initialCountryId={defaultCountryId}
              initialCategoryIds={selectedCategoryIds}
              initialShowInCategoryPanel={program?.showInCategoryPanel ?? true}
            />
          </AdminFormSection>

          <AdminFormSection title="Program bilgileri">
            <VisualTitleField label="Başlık" name="name" required />
            <VisualSlugField cloudinaryPrefix="Services" placeholder="turistik-vize" />
            <AdminField
              label="Liste özeti (kart / SEO)"
              name="excerpt"
              value={program?.excerpt}
              hint="Program kartlarında ve arama sonuçlarında görünür."
            />
            <AdminTextArea
              label="Kısa açıklama (liste / kart)"
              name="shortDescription"
              value={program?.shortDescription}
              rows={3}
              hint="Banner alt metin boşsa burada kullanılabilir."
            />
            <AdminField
              label="İşlem süresi"
              name="processingTime"
              value={program?.processingTime}
              placeholder="Örn. 10-15 iş günü"
            />
            <AdminField
              label="Sıra"
              name="sortOrder"
              type="number"
              value={program?.sortOrder ?? 0}
            />
            <AdminCheckbox
              label="Randevu gerekli"
              name="requiresAppointment"
              defaultChecked={program?.requiresAppointment ?? false}
            />
            <AdminCheckbox
              label="Öne çıkan (anasayfada göster)"
              name="isFeatured"
              defaultChecked={program?.isFeatured ?? false}
            />
            <AdminCheckbox
              label="Yayında (aktif)"
              name="isActive"
              defaultChecked={program?.isActive ?? true}
            />
          </AdminFormSection>

          <AdminFormSection
            title="Banner"
            description="Banner metinleri. Görsel ülke ayarlarından gelir."
          >
            <ServiceHeroBlock
              heroTitle={program?.heroTitle}
              heroSubtitle={program?.heroSubtitle}
              defaultTitle={program?.name}
              defaultSubtitle={program?.shortDescription ?? program?.excerpt}
            />
          </AdminFormSection>

          <AdminFormSection
            title="İçerik bölümleri"
            description="Her bölüme sayfa sırası verin; görsel/video alanlarıyla karışık dizilebilir."
          >
            <ServiceSectionsEditor initialJson={program?.sectionsJson} />
          </AdminFormSection>

          <AdminFormSection
            title="Görsel ve video alanları"
            description="Cloudinary ile görsel ve video. Sayfa sırası içerik bölümleriyle ortaktır; en fazla 10+10 alan."
          >
            <ServiceFeatureMediaEditor
              initialJson={program?.featureMediaJson}
              legacy={
                program
                  ? {
                      featureImage1: program.featureImage1,
                      featureImage1Title: program.featureImage1Title,
                      featureImage1Text: program.featureImage1Text,
                      featureImage2: program.featureImage2,
                      featureImage2Title: program.featureImage2Title,
                      featureImage2Text: program.featureImage2Text,
                    }
                  : undefined
              }
            />
          </AdminFormSection>

          <SeoMetadataBlock seo={seo} />

          <AdminSubmitButton>Kaydet</AdminSubmitButton>
        </AdminActionForm>

        {program && program.fees.length > 0 && (
          <div className="max-w-3xl">
            <AdminCard>
              <h3 className="text-base font-semibold text-slate-900">Ücretler</h3>
              <p className="mt-1 text-xs text-slate-500">
                Ücret düzenleme yakında panelde ayrı eklenecek.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                {program.fees.map((f) => (
                  <li key={f.id}>
                    {f.name}: {f.amount.toString()} {f.currency}
                  </li>
                ))}
              </ul>
            </AdminCard>
          </div>
        )}
      </VisualSlugProvider>
    </div>
  );
}
