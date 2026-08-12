import { getSiteSettings } from "@/lib/settings";
import { updateSettingsAction } from "@/lib/admin-actions";
import {
  AdminField,
  AdminFormSection,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin/AdminForm";
import { AdminAlert, AdminPageHeader } from "@/components/admin/AdminUi";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const settings = await getSiteSettings();
  const params = await searchParams;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Site Ayarları"
        description="Genel site bilgileri, logo, iletişim ve sosyal medya bağlantıları."
      />

      {params.saved && <AdminAlert>Ayarlar kaydedildi.</AdminAlert>}

      <form action={updateSettingsAction} className="max-w-2xl space-y-6">
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

        <AdminFormSection title="İletişim">
          <AdminField label="WhatsApp numarası" name="whatsappNumber" value={settings.whatsappNumber} />
          <AdminTextArea
            label="WhatsApp mesajı"
            name="whatsappMessage"
            value={settings.whatsappMessage}
            rows={2}
          />
          <AdminField label="Telefon" name="contactPhone" value={settings.contactPhone} />
          <AdminField label="E-posta" name="contactEmail" value={settings.contactEmail} />
          <AdminTextArea label="Adres" name="address" value={settings.address} rows={2} />
        </AdminFormSection>

        <AdminFormSection title="Sosyal medya">
          <AdminField label="Facebook URL" name="facebookUrl" value={settings.facebookUrl} />
          <AdminField label="Instagram URL" name="instagramUrl" value={settings.instagramUrl} />
          <AdminField label="Twitter URL" name="twitterUrl" value={settings.twitterUrl} />
        </AdminFormSection>

        <AdminSubmitButton>Ayarları kaydet</AdminSubmitButton>
      </form>
    </div>
  );
}
