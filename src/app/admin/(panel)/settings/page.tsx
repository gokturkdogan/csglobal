import { getSiteSettings } from "@/lib/settings";
import { updateSettingsAction } from "@/lib/admin-actions";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const settings = await getSiteSettings();
  const params = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-csg-blue">Site Ayarları</h1>
      {params.saved && (
        <p className="mt-2 text-sm text-green-600">Ayarlar kaydedildi.</p>
      )}

      <form action={updateSettingsAction} className="mt-6 space-y-4 max-w-xl">
        <label className="block text-sm font-medium">Site Adı<input name="siteName" value={settings.siteName} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
        <label className="block text-sm font-medium">Header logo URL<input name="headerLogoUrl" value={settings.headerLogoUrl} placeholder="Cloudinary veya /images/..." className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
        <label className="block text-sm font-medium">Site Açıklaması<textarea name="siteDescription" rows={2} value={settings.siteDescription} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
        <label className="block text-sm font-medium">WhatsApp Numarası<input name="whatsappNumber" value={settings.whatsappNumber} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
        <label className="block text-sm font-medium">WhatsApp Mesajı<textarea name="whatsappMessage" rows={2} value={settings.whatsappMessage} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
        <label className="block text-sm font-medium">Telefon<input name="contactPhone" value={settings.contactPhone} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
        <label className="block text-sm font-medium">E-posta<input name="contactEmail" value={settings.contactEmail} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
        <label className="block text-sm font-medium">Adres<textarea name="address" rows={2} value={settings.address} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
        <label className="block text-sm font-medium">Facebook URL<input name="facebookUrl" value={settings.facebookUrl} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
        <label className="block text-sm font-medium">Instagram URL<input name="instagramUrl" value={settings.instagramUrl} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
        <label className="block text-sm font-medium">Twitter URL<input name="twitterUrl" value={settings.twitterUrl} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
        <button type="submit" className="rounded-lg bg-csg-blue px-6 py-2 font-semibold text-white">Kaydet</button>
      </form>
    </div>
  );
}
