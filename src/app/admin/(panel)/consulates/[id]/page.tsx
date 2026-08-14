import { notFound } from "next/navigation";
import { saveConsulateAction } from "@/lib/admin-actions";
import { ConsulateHeroBlock } from "@/components/admin/consulate/ConsulateHeroBlock";
import { ConsulateSectionsEditor } from "@/components/admin/consulate/ConsulateSectionsEditor";
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
  AdminSelect,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { AdminConsulatePublicUrl } from "@/components/admin/AdminPublicUrl";
import {
  buildConsulatePath,
} from "@/lib/paths";
import { findConsulateForAdmin } from "@/lib/repositories/consulate.repository";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export default async function EditConsulatePage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const consulate = isNew ? null : await findConsulateForAdmin(id);
  if (!isNew && !consulate) notFound();

  const countries = await prisma.country.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });

  const initialConsulatePath =
    consulate?.country
      ? buildConsulatePath(consulate.country.slug, consulate.slug)
      : null;

  return (
    <div className="space-y-6">
      <VisualSlugProvider
        initialSlug={consulate?.slug ?? ""}
        initialTitle={consulate?.name ?? ""}
      >
        <AdminPageHeader
          title={consulate ? consulate.name : "Yeni Konsolosluk"}
          description="Banner metinleri, içerik bölümleri ve harita. Görsel ülke ayarlarından gelir."
          publicUrl={
            <AdminConsulatePublicUrl
              countries={countries}
              defaultCountryId={consulate?.countryId ?? countries[0]?.id ?? ""}
              initialPath={initialConsulatePath}
            />
          }
        />

        <AdminActionForm action={saveConsulateAction} className="max-w-3xl space-y-6">
          {consulate && <input type="hidden" name="id" value={consulate.id} />}

          <AdminFormSection title="Genel">
            <VisualTitleField label="Ad" name="name" required />
            <VisualSlugField
              cloudinaryPrefix="Consulates"
              placeholder="ankara-buyukelciligi"
            />
            <AdminSelect
              label="Ülke"
              name="countryId"
              required
              defaultValue={consulate?.countryId ?? countries[0]?.id ?? ""}
            >
              <option value="" disabled>Seçin</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </AdminSelect>
            <AdminField
              label="Sıra"
              name="sortOrder"
              type="number"
              value={consulate?.sortOrder ?? 0}
              hint="Liste sıralaması; küçük sayı önce gelir."
            />
            <AdminCheckbox
              label="Yayında"
              name="isActive"
              defaultChecked={consulate?.isActive ?? true}
            />
          </AdminFormSection>

          <AdminFormSection
            title="Banner"
            description="Banner başlık. Görsel ülke ayarlarından gelir."
          >
            <ConsulateHeroBlock
              heroTitle={consulate?.heroTitle}
              defaultTitle={consulate?.name}
            />
          </AdminFormSection>

          <AdminFormSection
            title="İçerik bölümleri"
            description="Başlık ve zengin metin blokları."
          >
            <ConsulateSectionsEditor initialJson={consulate?.sectionsJson} />
          </AdminFormSection>

          <AdminFormSection
            title="Konum"
            description="Google Maps embed ve adres metni."
          >
            <AdminTextArea
              label="Harita embed URL"
              name="mapEmbedUrl"
              value={consulate?.mapEmbedUrl}
              rows={3}
              mono
              hint="Google Haritalar → Paylaş → Haritayı yerleştir ile alınan iframe src adresi."
            />
            <AdminTextArea
              label="Adres"
              name="mapAddress"
              value={consulate?.mapAddress}
              rows={2}
              hint="Harita altında ve Google Haritalarda aç linkinde kullanılır."
            />
          </AdminFormSection>

          <AdminSubmitButton>Kaydet</AdminSubmitButton>
        </AdminActionForm>
      </VisualSlugProvider>
    </div>
  );
}
