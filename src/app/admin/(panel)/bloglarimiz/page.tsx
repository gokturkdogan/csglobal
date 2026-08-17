import { saveGuidesListPageAction } from "@/lib/admin-actions";
import {
  findBlogListSitePageRecord,
  parseGuidesListPageEditableFromSettings,
} from "@/lib/guides-list-page";
import { getSiteSettings } from "@/lib/settings";
import {
  guidesListHeroImageClassName,
  guidesListHeroImageSlot,
} from "@/lib/guides-list-image-slot";
import { buildBlogListPath } from "@/lib/paths";
import { AdminManagedImageField } from "@/components/admin/AdminManagedImageField";
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

export default async function AdminBlogsListPage() {
  const page = await findBlogListSitePageRecord();
  if (!page) {
    return (
      <div className="space-y-4">
        <AdminPageHeader title="Bloglarımız" />
        <p className="text-sm text-slate-600">
          Blog liste sayfası kaydı bulunamadı. Veritabanı seed işlemini çalıştırın.
        </p>
      </div>
    );
  }
  const settings = await getSiteSettings();
  const content = parseGuidesListPageEditableFromSettings(settings);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Bloglarımız"
        description="Blog liste sayfası: hero, kart listesi üst metni ve alt CTA alanı."
        publicPath={buildBlogListPath()}
        actions={
          <AdminButtonLink href={buildBlogListPath()} variant="secondary">
            Sayfayı görüntüle
          </AdminButtonLink>
        }
      />

      <AdminActionForm action={saveGuidesListPageAction} className="max-w-3xl space-y-6">
        <input type="hidden" name="id" value={page.id} />

        <AdminFormSection
          title="Hero alanı"
          description="Bloglarımız sayfasının üst banner bölümü."
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
          <AdminManagedImageField
            name="heroImage"
            defaultValue={content.heroImage}
            slot={guidesListHeroImageSlot}
            previewVariant="hero"
            imageClassName={guidesListHeroImageClassName}
            hint="PNG, JPG veya WebP; sabit 3.2:1 oranında kırpılır. Kaydet ile siteye uygulanır."
          />
          <AdminCheckbox label="Sayfa yayında" name="isActive" defaultChecked={page.isActive} />
        </AdminFormSection>

        <AdminFormSection title="Blog listesi">
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
          description="Tüm blogların altında koyu mavi gradient bölüm."
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
            placeholder="/iletisim veya https://..."
            hint="Site içi: /yol. Dış site: tam https adresi."
          />
        </AdminFormSection>

        <AdminSubmitButton>Kaydet</AdminSubmitButton>
      </AdminActionForm>
    </div>
  );
}
