import { getSiteSettings } from "@/lib/settings";
import { updateSettingsAction } from "@/lib/admin-actions";
import {
  AdminField,
  AdminFormSection,
  AdminActionForm,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Site Ayarları"
        description="Genel site bilgileri, logo ve sosyal medya bağlantıları. İletişim bilgileri İletişim sayfasından yönetilir."
      />

      <AdminActionForm action={updateSettingsAction} className="max-w-2xl space-y-6">
        <AdminFormSection title="Genel">
          <AdminField label="Site adı" name="siteName" value={settings.siteName} />
          <AdminField
            label="Header logo URL"
            name="headerLogoUrl"
            value={settings.headerLogoUrl}
            placeholder="Cloudinary veya /images/..."
          />
          <AdminTextArea
            label="Site açıklaması"
            name="siteDescription"
            value={settings.siteDescription}
            rows={2}
          />
        </AdminFormSection>

        <AdminFormSection title="Sosyal medya">
          <AdminField label="Facebook URL" name="facebookUrl" value={settings.facebookUrl} />
          <AdminField label="Instagram URL" name="instagramUrl" value={settings.instagramUrl} />
          <AdminField label="Twitter URL" name="twitterUrl" value={settings.twitterUrl} />
        </AdminFormSection>

        <AdminSubmitButton>Ayarları kaydet</AdminSubmitButton>
      </AdminActionForm>
    </div>
  );
}
