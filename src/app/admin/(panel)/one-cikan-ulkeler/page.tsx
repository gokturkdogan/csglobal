import { findActiveCountries } from "@/lib/repositories/country.repository";
import { getSiteSettings } from "@/lib/settings";
import { saveFeaturedCountriesAction } from "@/lib/admin-actions";
import {
  AdminActionForm,
  AdminFormSection,
  AdminSubmitButton,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";
import { FeaturedCountriesEditor } from "@/components/admin/country/FeaturedCountriesEditor";

export default async function AdminFeaturedCountriesPage() {
  const settings = await getSiteSettings();
  const countries = await findActiveCountries();

  const options = countries.map((country) => ({
    name: country.name,
    slug: country.slug,
    flag: country.flag,
  }));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Öne çıkan ülkeler"
        description="Ülke detay sayfalarının altında listelenen 5 popüler ülke ve bir yedek seçimi."
      />

      <AdminActionForm action={saveFeaturedCountriesAction} className="max-w-6xl space-y-6">
        <AdminFormSection
          title="Popüler ülke listesi"
          description="İlk 5 kart her ülke detayında görünür. Ziyaret edilen ülke bu beşlik içindeyse listeden çıkarılır ve yedek ülke gösterilir."
        >
          <FeaturedCountriesEditor
            initialJson={settings.countryDetailPopularCountrySlugsJson}
            countries={options}
          />
        </AdminFormSection>

        <div className="flex justify-end border-t border-slate-200 pt-4">
          <AdminSubmitButton>Kaydet</AdminSubmitButton>
        </div>
      </AdminActionForm>
    </div>
  );
}