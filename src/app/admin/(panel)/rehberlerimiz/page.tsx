import { prisma } from "@/lib/prisma";
import { saveGuidesListPageAction } from "@/lib/admin-actions";
import { parseGuidesListPageEditableFromSettings } from "@/lib/guides-list-page";
import { ensureGuidesListSitePage } from "@/lib/repositories/site.repository";
import { getSiteSettings } from "@/lib/settings";
import { AdminGuidesListHeroImageField } from "@/components/admin/guides/AdminGuidesListHeroImageField";
import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminActionForm,
  AdminSubmitButton,
  AdminTextArea,
  AdminButtonLink,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";

export default async function AdminGuidesListPage() {
  const page = await ensureGuidesListSitePage();
  const settings = await getSiteSettings();
  const content = parseGuidesListPageEditableFromSettings(settings);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Rehberlerimiz"
        description="Rehber liste sayfası (/rehber): hero, kart listesi üst metni ve alt CTA alanı."
        actions={
          <AdminButtonLink href="/rehber" variant="secondary">
            Sayfayı görüntüle
          </AdminButtonLink>
        }
      />

      <AdminActionForm action={saveGuidesListPageAction} className="max-w-3xl space-y-6">
        <input type="hidden" name="id" value={page.id} />

        <AdminFormSection
          title="Hero alanı"
          description="Rehberlerimiz sayfasının üst banner bölümü."
        >
          <AdminField label="Üst etiket" name="heroBadge" value={content.heroBadge} />
          <AdminField
            label="Sayfa başlığı (H1)"
            name="heroTitle"
            value={content.heroTitle}
            required
          />
          <AdminTextArea
            label="Hero alt metin"
            name="heroSubtitle"
            value={content.heroSubtitle}
            rows={3}
          />
          <AdminGuidesListHeroImageField name="heroImage" defaultValue={content.heroImage} />
          <AdminCheckbox label="Sayfa yayında" name="isActive" defaultChecked={page.isActive} />
        </AdminFormSection>

        <AdminFormSection title="Rehber listesi">
          <AdminTextArea
            label="Liste üst metni"
            name="listIntro"
            value={content.listIntro}
            rows={2}
            hint="Kartların üzerinde görünen kısa açıklama."
          />
        </AdminFormSection>

        <AdminFormSection
          title="Alt CTA alanı"
          description="Tüm rehberlerin altında koyu mavi gradient bölüm."
        >
          <AdminField label="Başlık" name="ctaTitle" value={content.ctaTitle} />
          <AdminTextArea
            label="Alt metin"
            name="ctaSubtitle"
            value={content.ctaSubtitle}
            rows={3}
          />
          <AdminField
            label="Birincil buton metni"
            name="ctaPrimaryLabel"
            value={content.ctaPrimaryLabel}
            hint="WhatsApp bağlantısı site ayarlarındaki numarayı kullanır."
          />
          <AdminField
            label="İkincil buton metni"
            name="ctaSecondaryLabel"
            value={content.ctaSecondaryLabel}
          />
          <AdminField
            label="İkincil buton linki"
            name="ctaSecondaryHref"
            value={content.ctaSecondaryHref}
            placeholder="/iletisim"
          />
        </AdminFormSection>

        <AdminSubmitButton>Kaydet</AdminSubmitButton>
      </AdminActionForm>
    </div>
  );
}
