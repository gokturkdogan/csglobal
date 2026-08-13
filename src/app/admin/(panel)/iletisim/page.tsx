import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveContactPageAction } from "@/lib/admin-actions";
import { getSiteSettings } from "@/lib/settings";
import {
  contactHeroImageClassName,
  contactHeroImageSlot,
} from "@/lib/contact-image-slot";
import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminActionForm,
  AdminSubmitButton,
  AdminTextArea,
  AdminButtonLink,
} from "@/components/admin/AdminForm";
import { AdminManagedImageField } from "@/components/admin/AdminManagedImageField";
import { AdminPageHeader } from "@/components/admin/AdminUi";

export default async function AdminContactPage() {
  const page = await prisma.sitePage.findFirst({ where: { slug: "iletisim" } });
  if (!page) notFound();

  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="İletişim"
        description="İletişim sayfası hero, kanallar, harita ve site genelinde kullanılan iletişim bilgileri."
        actions={
          <AdminButtonLink href="/iletisim" variant="secondary">
            Sayfayı görüntüle
          </AdminButtonLink>
        }
      />

      <AdminActionForm action={saveContactPageAction} className="max-w-3xl space-y-6">
        <input type="hidden" name="id" value={page.id} />

        <AdminFormSection
          title="Hero alanı"
          description="İletişim sayfasının üst banner bölümü."
        >
          <AdminField label="Başlık" name="title" value={page.title} required />
          <AdminTextArea
            label="Alt metin"
            name="content"
            value={page.content}
            rows={4}
            hint="Hero bölümünde başlık altında görünen açıklama metni."
          />
          <AdminManagedImageField
            name="contactHeroImage"
            defaultValue={settings.contactHeroImage}
            slot={contactHeroImageSlot}
            previewVariant="hero"
            imageClassName={contactHeroImageClassName}
            hint="PNG, JPG veya WebP; sabit 3.2:1 oranında kırpılır. Kaydet ile siteye uygulanır."
          />
          <AdminCheckbox label="Sayfa yayında" name="isActive" defaultChecked={page.isActive} />
        </AdminFormSection>

        <AdminFormSection
          title="İletişim bilgileri"
          description="Telefon, e-posta, WhatsApp ve adres; site genelinde (header, footer, Hakkımızda) de kullanılır."
        >
          <AdminField
            label="Telefon"
            name="contactPhone"
            value={settings.contactPhone}
            placeholder="+90 212 ..."
          />
          <AdminField
            label="E-posta"
            name="contactEmail"
            type="email"
            value={settings.contactEmail}
            placeholder="info@csglobal.com"
          />
          <AdminField
            label="WhatsApp numarası"
            name="whatsappNumber"
            value={settings.whatsappNumber}
            placeholder="+905xxxxxxxxx"
          />
          <AdminTextArea
            label="WhatsApp varsayılan mesaj"
            name="whatsappMessage"
            value={settings.whatsappMessage}
            rows={2}
          />
          <AdminTextArea label="Adres" name="address" value={settings.address} rows={2} />
        </AdminFormSection>

        <AdminFormSection title="Harita" description="Google Maps embed URL'si.">
          <AdminTextArea
            label="Harita embed URL"
            name="contactMapEmbedUrl"
            value={settings.contactMapEmbedUrl}
            rows={3}
            mono
            hint="Google Haritalar → Paylaş → Haritayı yerleştir ile alınan iframe src adresi. Boş bırakırsanız varsayılan Levent konumu kullanılır."
          />
        </AdminFormSection>

        <AdminSubmitButton>Kaydet</AdminSubmitButton>
      </AdminActionForm>
    </div>
  );
}
