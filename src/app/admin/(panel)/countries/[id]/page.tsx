import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveCountryAction } from "@/lib/admin-actions";
import {
  COUNTRY_FAQ_MAX,
  COUNTRY_NOTES_MAX,
  parseCountryNotesJson,
} from "@/lib/country-detail";
import { CountryDetailSectionsEditor } from "@/components/admin/country/CountryDetailSectionsEditor";
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
    id === "new"
      ? null
      : await prisma.country.findUnique({
          where: { id },
          include: {
            faqs: {
              where: { serviceId: null, categoryId: null },
              orderBy: { sortOrder: "asc" },
              take: COUNTRY_FAQ_MAX,
            },
          },
        });

  if (id !== "new" && !country) notFound();

  const importantNotes = parseCountryNotesJson(country?.importantNotesJson);
  const faqs = country?.faqs ?? [];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={country ? `${country.name} Düzenle` : "Yeni Ülke"}
        description="Ülke bilgileri, detay sayfası içeriği ve ülkeye özel SSS."
      />

      <form action={saveCountryAction} className="max-w-3xl space-y-6">
        {country && <input type="hidden" name="id" value={country.id} />}

        <AdminFormSection title="Genel bilgiler">
          <AdminField label="Ad" name="name" value={country?.name} required />
          <AdminField label="Slug" name="slug" value={country?.slug} required />
          <AdminField label="ISO2 (bayrak kodu)" name="iso2" value={country?.iso2} />
          <AdminField
            label="Kısa açıklama (hero alt metin)"
            name="shortDescription"
            value={country?.shortDescription}
          />
          <AdminTextArea
            label="Genel açıklama (opsiyonel)"
            name="description"
            value={country?.description}
            rows={6}
          />
        </AdminFormSection>

        <AdminFormSection
          title="Detay sayfası"
          description="Ülke detay sayfasında gösterilen hızlı bilgi ve açıklama alanları."
        >
          <AdminField
            label="Vize bölgesi (opsiyonel)"
            name="visaRegion"
            value={country?.visaRegion}
            placeholder="Örn. Schengen, AB, Commonwealth"
          />
          <AdminField
            label="Ortalama işlem süresi"
            name="averageProcessingTime"
            value={country?.averageProcessingTime}
            placeholder="Örn. 10–15 iş günü"
          />
          <AdminCheckbox
            label="Randevu zorunlu"
            name="requiresAppointment"
            defaultChecked={country?.requiresAppointment ?? false}
          />
          <AdminTextArea
            label="Açıklama paragrafı 1"
            name="detailParagraph1"
            value={country?.detailParagraph1}
            rows={4}
            hint="Enter ile alt satıra geçebilirsiniz; satır sonları sitede aynı şekilde görünür."
          />
          <AdminTextArea
            label="Açıklama paragrafı 2"
            name="detailParagraph2"
            value={country?.detailParagraph2}
            rows={4}
            hint="Enter ile alt satıra geçebilirsiniz; satır sonları sitede aynı şekilde görünür."
          />
        </AdminFormSection>

        <AdminFormSection
          title="Önemli notlar"
          description={`Ülke detayında madde madde listelenir. En fazla ${COUNTRY_NOTES_MAX} not.`}
        >
          {Array.from({ length: COUNTRY_NOTES_MAX }, (_, i) => (
            <AdminTextArea
              key={i}
              label={`Not ${i + 1}`}
              name={`importantNote${i}`}
              value={importantNotes[i] ?? ""}
              rows={2}
              hint={i === 0 ? "Boş bırakılan satırlar kaydedilmez." : undefined}
            />
          ))}
        </AdminFormSection>

        <AdminFormSection
          title="Ek içerik bölümleri"
          description="Notlar ve sık sorulan sorular arasında gösterilir. Kalın yazı ve liste desteklenir."
        >
          <CountryDetailSectionsEditor initialJson={country?.detailSectionsJson} />
        </AdminFormSection>

        <AdminFormSection
          title="Sık sorulan sorular"
          description={`Bu ülkeye özel SSS. En fazla ${COUNTRY_FAQ_MAX} soru.`}
        >
          {Array.from({ length: COUNTRY_FAQ_MAX }, (_, i) => {
            const faq = faqs[i];
            return (
              <div
                key={i}
                className="space-y-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Soru {i + 1}
                </p>
                <AdminField
                  label="Soru"
                  name={`faqQuestion${i}`}
                  value={faq?.question ?? ""}
                />
                <AdminTextArea
                  label="Cevap"
                  name={`faqAnswer${i}`}
                  value={faq?.answer ?? ""}
                  rows={3}
                />
              </div>
            );
          })}
        </AdminFormSection>

        <AdminFormSection title="Yayın">
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
