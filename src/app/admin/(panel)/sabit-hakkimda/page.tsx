import { saveFixedAboutAction } from "@/lib/admin-actions";
import { getSiteSettings } from "@/lib/settings";
import { resolveFixedAbout } from "@/lib/fixed-about";
import {
  fixedAboutPortraitClassName,
  fixedAboutPortraitImageSlot,
} from "@/lib/fixed-about-image-slot";
import {
  AdminActionForm,
  AdminField,
  AdminFormSection,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin/AdminForm";
import { AdminManagedImageField } from "@/components/admin/AdminManagedImageField";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { FixedAboutSection } from "@/components/layout/FixedAboutSection";

export default async function AdminFixedAboutPage() {
  const settings = await getSiteSettings();
  const preview = resolveFixedAbout(settings);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Sabit hakkımda alanı"
        description="Tüm sayfalarda footer üstünde, yasal bilgilendirmenin hemen üzerinde görünür."
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <p className="border-b border-slate-100 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
          Canlı önizleme (kaydetmeden önce mevcut site verisi)
        </p>
        <FixedAboutSection content={preview} />
      </div>

      <AdminActionForm action={saveFixedAboutAction} className="max-w-2xl space-y-6">
        <AdminFormSection
          title="İçerik"
          description="Başlık, metin, portre görseli ve LinkedIn profil linki."
        >
          <AdminField
            label="Başlık"
            name="fixedAboutTitle"
            value={settings.fixedAboutTitle || preview.title}
            required
          />
          <AdminTextArea
            label="Metin"
            name="fixedAboutText"
            value={settings.fixedAboutText || preview.text}
            rows={8}
            hint="Paragraf metni; satır sonları korunur."
          />
          <AdminManagedImageField
            name="fixedAboutImage"
            defaultValue={settings.fixedAboutImage}
            slot={fixedAboutPortraitImageSlot}
            previewVariant="portrait"
            imageClassName={fixedAboutPortraitClassName}
            hint="Portre fotoğrafı. Kaydet ile site ayarına yazılır."
          />
          <AdminField
            label="LinkedIn profil URL"
            name="fixedAboutLinkedInUrl"
            type="url"
            value={settings.fixedAboutLinkedInUrl}
            placeholder="https://www.linkedin.com/in/..."
            hint="Dolu olduğunda sitede LinkedIn butonu görünür."
          />
        </AdminFormSection>

        <div className="flex justify-end border-t border-slate-200 pt-4">
          <AdminSubmitButton>Kaydet</AdminSubmitButton>
        </div>
      </AdminActionForm>
    </div>
  );
}