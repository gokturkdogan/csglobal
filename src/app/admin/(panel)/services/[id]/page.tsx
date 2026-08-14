import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveServiceAction } from "@/lib/admin-actions";
import { ServiceFeatureBlock } from "@/components/admin/service/ServiceFeatureBlock";
import { ServiceHeroBlock } from "@/components/admin/service/ServiceHeroBlock";
import { ServiceSectionsEditor } from "@/components/admin/service/ServiceSectionsEditor";
import {
  VisualSlugField,
  VisualSlugProvider,
  VisualTitleField,
} from "@/components/admin/VisualSlugProvider";
import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminSelect,
  AdminActionForm,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin/AdminForm";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminUi";
import { AdminServicePublicUrl } from "@/components/admin/AdminPublicUrl";

type Props = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const service = isNew
    ? null
    : await prisma.service.findUnique({
        where: { id },
        include: {
          fees: true,
          country: { select: { slug: true } },
        },
      });

  if (!isNew && !service) notFound();

  const initialServicePath =
    service && service.country
      ? `/${service.country.slug}/${service.slug}`
      : null;

  const countries = await prisma.country.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <VisualSlugProvider
        initialSlug={service?.slug ?? ""}
        initialTitle={service?.name ?? ""}
      >
        <AdminPageHeader
          title={service ? `${service.name} Düzenle` : "Yeni Hizmet"}
          description="Banner, içerik bölümleri ve görselli alanlar."
          publicUrl={
            <AdminServicePublicUrl
              countries={countries}
              defaultCountryId={service?.countryId ?? ""}
              initialPath={initialServicePath}
            />
          }
        />

        <AdminActionForm action={saveServiceAction} className="max-w-3xl space-y-6">
        {service && <input type="hidden" name="id" value={service.id} />}

        <AdminFormSection title="Konum">
          <AdminSelect
            label="Ülke"
            name="countryId"
            required
            defaultValue={service?.countryId ?? ""}
          >
            <option value="" disabled>Seçin</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </AdminSelect>

          <AdminSelect
            label="Kategori"
            name="categoryId"
            required
            defaultValue={service?.categoryId ?? ""}
          >
            <option value="" disabled>Seçin</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </AdminSelect>
        </AdminFormSection>

        <AdminFormSection title="Hizmet bilgileri">
          <VisualTitleField label="Başlık" name="name" required />
          <VisualSlugField cloudinaryPrefix="Services" placeholder="turistik-vize" />
          <AdminTextArea
            label="Kısa açıklama (liste / kart)"
            name="shortDescription"
            value={service?.shortDescription}
            rows={3}
            hint="Banner alt metin boşsa burada kullanılabilir."
          />
          <AdminField
            label="İşlem süresi"
            name="processingTime"
            value={service?.processingTime}
            placeholder="Örn. 10-15 iş günü"
          />
          <AdminField
            label="Sıra"
            name="sortOrder"
            type="number"
            value={service?.sortOrder ?? 0}
          />
          <AdminCheckbox
            label="Randevu gerekli"
            name="requiresAppointment"
            defaultChecked={service?.requiresAppointment ?? false}
          />
          <AdminCheckbox
            label="Öne çıkan (anasayfada göster)"
            name="isFeatured"
            defaultChecked={service?.isFeatured ?? false}
          />
          <AdminCheckbox
            label="Aktif"
            name="isActive"
            defaultChecked={service?.isActive ?? true}
          />
        </AdminFormSection>

        <AdminFormSection
          title="Banner"
          description="Banner metinleri. Görsel ülke ayarlarından gelir."
        >
          <ServiceHeroBlock
            heroTitle={service?.heroTitle}
            heroSubtitle={service?.heroSubtitle}
            defaultTitle={service?.name}
            defaultSubtitle={service?.shortDescription}
          />
        </AdminFormSection>

        <AdminFormSection
          title="İçerik bölümleri"
          description="Blog tarzında başlık ve zengin metin blokları."
        >
          <ServiceSectionsEditor initialJson={service?.sectionsJson} />
        </AdminFormSection>

        <AdminFormSection
          title="Görsel alan 1"
          description="Görsel, başlık ve metin birlikte; sitede görsel solda."
        >
          <ServiceFeatureBlock
            index={1}
            featureImage={service?.featureImage1 ?? ""}
            featureImageTitle={service?.featureImage1Title}
            featureImageText={service?.featureImage1Text}
          />
        </AdminFormSection>

        <AdminFormSection
          title="Görsel alan 2"
          description="Görsel, başlık ve metin birlikte; sitede görsel sağda."
        >
          <ServiceFeatureBlock
            index={2}
            featureImage={service?.featureImage2 ?? ""}
            featureImageTitle={service?.featureImage2Title}
            featureImageText={service?.featureImage2Text}
          />
        </AdminFormSection>

        <AdminSubmitButton>Kaydet</AdminSubmitButton>
      </AdminActionForm>

      {service && service.fees.length > 0 && (
        <div className="max-w-3xl">
          <AdminCard>
            <h3 className="text-base font-semibold text-slate-900">Ücretler</h3>
            <p className="mt-1 text-xs text-slate-500">
              Ücret düzenleme yakında panelde ayrı eklenecek.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-slate-600">
              {service.fees.map((f) => (
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
