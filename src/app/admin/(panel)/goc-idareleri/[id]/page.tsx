import { notFound } from "next/navigation";
import { saveImmigrationOfficeAction } from "@/lib/admin-actions";
import {
  VisualSlugField,
  VisualSlugProvider,
  VisualTitleField,
} from "@/components/admin/VisualSlugProvider";
import {
  AdminActionForm,
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { findImmigrationOfficeForAdmin } from "@/lib/repositories/immigration-office.repository";

type Props = { params: Promise<{ id: string }> };

export default async function EditImmigrationOfficePage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const office = isNew ? null : await findImmigrationOfficeForAdmin(id);
  if (!isNew && !office) notFound();

  return (
    <div className="space-y-6">
      <VisualSlugProvider
        initialSlug={office?.slug ?? ""}
        initialTitle={office?.institutionName ?? ""}
      >
        <AdminPageHeader
          title={office ? office.institutionName : "Yeni Göç İdaresi Ekle"}
          description="Public Göç İdaresi Bul aracında görünecek müdürlük bilgilerini yönetin."
        />

        <AdminActionForm action={saveImmigrationOfficeAction} className="max-w-3xl space-y-6">
          {office ? <input type="hidden" name="id" value={office.id} /> : null}

          <AdminFormSection title="Temel bilgiler">
            <VisualTitleField
              label="Kurum Adı"
              name="institutionName"
              required
              placeholder="İstanbul İl Göç İdaresi Müdürlüğü"
            />
            <VisualSlugField
              label="Slug"
              cloudinaryPrefix="ImmigrationOffices"
            />
            <AdminField
              label="Şehir"
              name="city"
              required
              value={office?.city ?? ""}
              placeholder="İstanbul"
            />
            <AdminField
              label="İlçe"
              name="district"
              value={office?.district ?? ""}
              placeholder="Fatih"
            />
            <AdminTextArea
              label="Adres"
              name="address"
              rows={3}
              value={office?.address ?? ""}
            />
            <AdminField
              label="Telefon"
              name="phone"
              value={office?.phone ?? ""}
              placeholder="+90 212 000 00 00"
            />
            <AdminTextArea
              label="Çalışma Saatleri"
              name="workingHours"
              rows={2}
              value={office?.workingHours ?? ""}
              hint="Serbest metin. Örnek: Pazartesi–Cuma 08:30–17:00"
            />
          </AdminFormSection>

          <AdminFormSection title="Konum">
            <AdminField
              label="Latitude"
              name="latitude"
              value={office?.latitude != null ? String(office.latitude) : ""}
              placeholder="41.0082"
            />
            <AdminField
              label="Longitude"
              name="longitude"
              value={office?.longitude != null ? String(office.longitude) : ""}
              placeholder="28.9784"
            />
            <AdminTextArea
              label="Google Maps URL"
              name="mapsUrl"
              rows={2}
              value={office?.mapsUrl ?? ""}
              mono
              hint="Varsa yol tarifi doğrudan bu URL ile açılır."
            />
          </AdminFormSection>

          <AdminFormSection title="Ek bilgiler">
            <AdminTextArea
              label="Kısa Açıklama"
              name="shortDescription"
              rows={2}
              value={office?.shortDescription ?? ""}
            />
            <AdminTextArea
              label="Notlar"
              name="notes"
              rows={3}
              value={office?.notes ?? ""}
              hint="Yalnızca admin panelinde saklanır."
            />
            <AdminField
              label="Sıralama"
              name="sortOrder"
              type="number"
              value={office?.sortOrder ?? 0}
              hint="Küçük sayı önce listelenir."
            />
            <AdminCheckbox
              label="Aktif"
              name="isActive"
              defaultChecked={office?.isActive ?? true}
            />
          </AdminFormSection>

          <AdminSubmitButton>Kaydet</AdminSubmitButton>
        </AdminActionForm>
      </VisualSlugProvider>
    </div>
  );
}
