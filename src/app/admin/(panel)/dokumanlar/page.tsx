import { prisma } from "@/lib/prisma";
import {
  deleteSiteAssetAction,
  uploadSiteAssetAction,
} from "@/lib/admin-actions";
import { listSiteAssetsForAdmin } from "@/lib/repositories/site-asset.repository";
import {
  buildSiteAssetPath,
  buildSiteAssetPublicUrl,
  SITE_ASSET_ACCEPT,
} from "@/lib/site-asset";
import {
  AdminActionForm,
  AdminSelect,
  AdminSubmitButton,
} from "@/components/admin/AdminForm";
import { AdminPageHeader, AdminTable, AdminTableHead } from "@/components/admin/AdminUi";
import { AdminLink } from "@/components/admin/AdminForm";

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
        description="Form ve dilekçe PDF'leri. Site URL ile bloglarda paylaşılır; önizleme ve indirme siteden yapılır."
      />

      <AdminActionForm
        action={uploadSiteAssetAction}
        className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5"
        successMessage="Döküman yüklendi."
      >
        <div>
          <h2 className="text-base font-semibold text-slate-900">Dosya yükle</h2>
          <p className="mt-1 text-sm text-slate-500">
            Dosya adı URL&apos;de kullanılır (ör.{" "}
            <code className="text-csg-blue">almanya-schengen-formu.pdf</code>). Maks. 10MB.
          </p>
        </div>

        <AdminSelect label="Ülke" name="countryId" required defaultValue="">
          <option value="" disabled>Seçin</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </AdminSelect>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Dosya</span>
          <input
            type="file"
            name="file"
            required
            accept={SITE_ASSET_ACCEPT}
            className="mt-1.5 block w-full text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-csg-blue file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-csg-blue-dark"
          />
        </label>

        <AdminSubmitButton loadingLabel="Yükleniyor…">Yükle</AdminSubmitButton>
      </AdminActionForm>

      <AdminTable>
        <AdminTableHead>
          <th className="px-5 py-3">Dosya</th>
          <th className="px-5 py-3">Ülke</th>
          <th className="px-5 py-3">Site URL</th>
          <th className="px-5 py-3">Boyut</th>
          <th className="px-5 py-3 text-right">İşlem</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {assets.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-8 text-center text-sm text-slate-500">
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
              const publicUrl = buildSiteAssetPublicUrl(
                asset.id,
                asset.country.slug,
                asset.fileName,
              );

              return (
                <tr key={asset.id} className="hover:bg-slate-50/80">
                  <td className="px-5 py-3.5 font-medium text-slate-900">{asset.fileName}</td>
                  <td className="px-5 py-3.5 text-slate-600">{asset.country.name}</td>
                  <td className="px-5 py-3.5">
                    <code className="text-xs text-slate-600">{sitePath}</code>
                    <a
                      href={publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-xs font-medium text-csg-blue hover:underline"
                    >
                      {publicUrl}
                    </a>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">
                    {formatFileSize(asset.byteSize)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <AdminLink href={sitePath}>Önizle</AdminLink>
                    <span className="mx-2 text-slate-300">|</span>
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
