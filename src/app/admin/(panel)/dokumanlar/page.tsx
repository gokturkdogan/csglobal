import { prisma } from "@/lib/prisma";
import {
  deleteSiteAssetAction,
  uploadSiteAssetAction,
} from "@/lib/admin-actions";
import { listSiteAssetsForAdmin } from "@/lib/repositories/site-asset.repository";
import { SiteAssetBulkUploadField } from "@/components/admin/SiteAssetBulkUploadField";
import { SiteAssetShowInMenuField } from "@/components/admin/SiteAssetShowInMenuField";
import {
  AdminActionForm,
  AdminSelect,
  AdminSubmitButton,
} from "@/components/admin/AdminForm";
import { AdminPageHeader, AdminTable, AdminTableHead } from "@/components/admin/AdminUi";
import { buildSiteAssetPath, SITE_ASSET_MAX_BATCH } from "@/lib/site-asset";

function formatFileSize(bytes: number | null | undefined): string {
  if (!bytes || bytes <= 0) return "-";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const dynamic = "force-dynamic";

export default async function AdminDocumentsPage() {
  const assets = await listSiteAssetsForAdmin();
  const countries = await prisma.country.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Dökümanlar"
        description="Form ve dilekçe PDF'leri. Site URL ile bloglarda paylaşılır."
      />

      <AdminActionForm
        action={uploadSiteAssetAction}
        className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5"
        successMessage="Dökümanlar yüklendi."
      >
        <div>
          <h2 className="text-base font-semibold text-slate-900">Dosya yükle</h2>
          <p className="mt-1 text-sm text-slate-500">
            Ülke seçin, ardından aynı ülke için en fazla {SITE_ASSET_MAX_BATCH} dosyayı
            toplu seçip yükleyin. Dosya adı URL&apos;de kullanılır (ör.{" "}
            <code className="text-csg-blue">almanya-schengen-formu.pdf</code>).
          </p>
        </div>

        <AdminSelect label="Ülke" name="countryId" required defaultValue="">
          <option value="" disabled>Seçin</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </AdminSelect>

        <SiteAssetBulkUploadField />

        <SiteAssetShowInMenuField variant="upload" />

        <AdminSubmitButton loadingLabel="Yükleniyor…">Yükle</AdminSubmitButton>
      </AdminActionForm>

      <AdminTable>
        <AdminTableHead>
          <th className="px-5 py-3">Dosya</th>
          <th className="px-5 py-3">Ülke</th>
          <th className="px-5 py-3">Menü</th>
          <th className="px-5 py-3">Site URL</th>
          <th className="px-5 py-3">Boyut</th>
          <th className="px-5 py-3 text-right">İşlem</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {assets.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-500">
                Henüz döküman yüklenmemiş.
              </td>
            </tr>
          ) : (
            assets.map((asset) => {
              const sitePath = buildSiteAssetPath(
                asset.id,
                asset.country.slug,
                asset.fileName,
              );

              return (
                <tr key={asset.id} className="hover:bg-slate-50/80">
                  <td className="px-5 py-3.5 font-medium text-slate-900">{asset.fileName}</td>
                  <td className="px-5 py-3.5 text-slate-600">{asset.country.name}</td>
                  <td className="px-5 py-3.5">
                    <SiteAssetShowInMenuField
                      variant="list"
                      assetId={asset.id}
                      initialChecked={asset.showInMenu}
                    />
                  </td>
                  <td className="px-5 py-3.5">
                    <code className="text-xs text-slate-600 select-all break-all">
                      {sitePath}
                    </code>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    {formatFileSize(asset.byteSize)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <AdminActionForm
                      action={deleteSiteAssetAction}
                      className="inline"
                      successMessage="Döküman silindi."
                    >
                      <input type="hidden" name="id" value={asset.id} />
                      <button
                        type="submit"
                        className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Sil
                      </button>
                    </AdminActionForm>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </AdminTable>
    </div>
  );
}
