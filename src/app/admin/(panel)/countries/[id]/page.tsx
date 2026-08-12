import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveCountryAction } from "@/lib/admin-actions";
import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";

type Props = { params: Promise<{ id: string }> };

export default async function EditCountryPage({ params }: Props) {
  const { id } = await params;
  const country =
    id === "new" ? null : await prisma.country.findUnique({ where: { id } });

  if (id !== "new" && !country) notFound();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={country ? `${country.name} Düzenle` : "Yeni Ülke"}
        description="Ülke bilgileri, slug ve kapak görseli."
      />

      <form action={saveCountryAction} className="max-w-3xl space-y-6">
        {country && <input type="hidden" name="id" value={country.id} />}

        <AdminFormSection title="Genel bilgiler">
          <AdminField label="Ad" name="name" value={country?.name} required />
          <AdminField label="Slug" name="slug" value={country?.slug} required />
          <AdminField label="ISO2 (bayrak kodu)" name="iso2" value={country?.iso2} />
          <AdminField
            label="Kısa açıklama"
            name="shortDescription"
            value={country?.shortDescription}
          />
          <AdminTextArea
            label="Açıklama"
            name="description"
            value={country?.description}
            rows={8}
          />
        </AdminFormSection>

        <AdminFormSection title="Görsel & sıralama">
          <AdminField
            label="Kapak / hero görsel URL"
            name="heroImage"
            value={country?.heroImage}
          />
          <AdminField
            label="Sıra"
            name="sortOrder"
            type="number"
            value={country?.sortOrder ?? 0}
          />
          <AdminCheckbox
            label="Aktif"
            name="isActive"
            defaultChecked={country?.isActive ?? true}
          />
        </AdminFormSection>

        <AdminSubmitButton>Kaydet</AdminSubmitButton>
      </form>
    </div>
  );
}
