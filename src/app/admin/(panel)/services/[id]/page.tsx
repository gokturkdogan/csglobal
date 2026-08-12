import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveServiceAction, saveServiceSectionAction } from "@/lib/admin-actions";
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

type Props = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const service = isNew
    ? null
    : await prisma.service.findUnique({
        where: { id },
        include: {
          sections: { orderBy: { sortOrder: "asc" } },
          fees: true,
        },
      });

  if (!isNew && !service) notFound();

  const countries = await prisma.country.findMany({ orderBy: { name: "asc" } });
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={service ? `${service.name} Düzenle` : "Yeni Hizmet"}
        description="Hizmet detayları, öne çıkan işareti ve içerik bölümleri."
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
          <AdminField label="Ad" name="name" value={service?.name} required />
          <AdminField label="Slug" name="slug" value={service?.slug} required />
          <AdminField
            label="Kısa açıklama"
            name="shortDescription"
            value={service?.shortDescription}
          />
          <AdminField
            label="İşlem süresi"
            name="processingTime"
            value={service?.processingTime}
          />
          <AdminField label="Kapak görsel URL" name="heroImage" value={service?.heroImage} />
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

        <AdminSubmitButton>Kaydet</AdminSubmitButton>
      </AdminActionForm>

      {service && (
        <div className="max-w-3xl space-y-6">
          <AdminCard>
            <h2 className="text-base font-semibold text-slate-900">İçerik bölümleri</h2>
            {service.sections.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">Henüz bölüm eklenmedi.</p>
            ) : (
              <ul className="mt-4 divide-y divide-slate-100">
                {service.sections.map((sec) => (
                  <li key={sec.id} className="flex items-center justify-between py-3 text-sm">
                    <span className="font-medium text-slate-900">{sec.title}</span>
                    <span className="text-slate-500">{sec.slug}</span>
                  </li>
                ))}
              </ul>
            )}
          </AdminCard>

          <AdminFormSection title="Yeni bölüm ekle">
            <AdminActionForm action={saveServiceSectionAction} className="space-y-4">
              <input type="hidden" name="serviceId" value={service.id} />
              <AdminField label="Başlık" name="title" required />
              <AdminField label="Slug" name="slug" required />
              <AdminTextArea
                label="İçerik (Markdown)"
                name="content"
                rows={6}
                mono
              />
              <AdminField
                label="Sıra"
                name="sortOrder"
                type="number"
                value={service.sections.length}
              />
              <AdminSubmitButton
                className="!bg-slate-800 hover:!bg-slate-900"
                loadingLabel="Ekleniyor…"
              >
                Bölüm ekle
              </AdminSubmitButton>
            </AdminActionForm>
          </AdminFormSection>

          {service.fees.length > 0 && (
            <AdminCard>
              <h3 className="text-base font-semibold text-slate-900">Ücretler</h3>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                {service.fees.map((f) => (
                  <li key={f.id}>
                    {f.name}: {f.amount.toString()} {f.currency}
                  </li>
                ))}
              </ul>
            </AdminCard>
          )}
        </div>
      )}
    </div>
  );
}
