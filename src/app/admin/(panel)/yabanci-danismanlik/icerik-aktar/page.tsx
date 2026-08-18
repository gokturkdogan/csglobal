import { importForeignConsultancyFromUrlsAction } from "@/lib/admin-actions";
import { prisma } from "@/lib/prisma";
import {
  buildForeignConsultancyContentPath,
} from "@/lib/foreign-consultancy";
import {
  foreignConsultancyCategoryToSlug,
  type ForeignConsultancyCategoryValue,
} from "@/lib/foreign-consultancy-categories";
import { FOREIGN_CONSULTANCY_IMPORT_URL_LIMIT } from "@/lib/foreign-consultancy-url-import";
import {
  AdminActionForm,
  AdminField,
  AdminFormSection,
  AdminLink,
  AdminSubmitButton,
} from "@/components/admin/AdminForm";
import { AdminAlert, AdminPageHeader } from "@/components/admin/AdminUi";

type Props = {
  searchParams: Promise<{ created?: string }>;
};

export default async function AdminForeignConsultancyImportPage({
  searchParams,
}: Props) {
  const params = await searchParams;
  const createdIds = params.created
    ? params.created.split(",").map((id) => id.trim()).filter(Boolean)
    : [];

  const imported =
    createdIds.length > 0
      ? await prisma.foreignConsultancyContent.findMany({
          where: { id: { in: createdIds } },
          select: { id: true, name: true, slug: true, category: true },
          orderBy: { name: "asc" },
        })
      : [];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="URL'den İçerik Aktar"
        description="Mıhcı, Kulaçoğlu ve benzeri yapıdaki sayfalardan içerik oluşturur. Kategori otomatik olarak çalışma izni seçilir; içerik bölümlere ayrılır."
      />

      {imported.length > 0 ? (
        <AdminAlert variant="success">
          <p className="font-medium">{imported.length} içerik oluşturuldu ve yayına alındı.</p>
          <ul className="mt-3 space-y-2 text-sm">
            {imported.map((item) => {
              const category = item.category as ForeignConsultancyCategoryValue;
              const publicPath = buildForeignConsultancyContentPath(
                foreignConsultancyCategoryToSlug(category),
                item.slug,
              );
              return (
                <li key={item.id}>
                  <AdminLink href={`/admin/yabanci-danismanlik/${item.id}`}>
                    {item.name}
                  </AdminLink>
                  <span className="text-slate-500"> · </span>
                  <AdminLink href={publicPath} external>Görüntüle</AdminLink>
                </li>
              );
            })}
          </ul>
        </AdminAlert>
      ) : null}

      <AdminActionForm
        action={importForeignConsultancyFromUrlsAction}
        className="max-w-3xl space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        successMessage="İçerik aktarımı tamamlandı."
      >
        <AdminFormSection
          title="Kaynak URL'ler"
          description={`En fazla ${FOREIGN_CONSULTANCY_IMPORT_URL_LIMIT} adres (ör. mihci.av.tr). Başlık ilk bölüm; içindekiler atlanır; kaynak linkleri temizlenir; her alt başlık ayrı bölüm.`}
        >
          <input type="hidden" name="category" value="CALISMA_IZNI" />
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            Kategori: <strong>Çalışma izni</strong> (sabit)
          </div>
          {Array.from({ length: FOREIGN_CONSULTANCY_IMPORT_URL_LIMIT }, (_, index) => index + 1).map(
            (n) => (
              <AdminField
                key={n}
                label={n === 1 ? "URL 1" : `URL ${n} (opsiyonel)`}
                name={`importUrl${n}`}
                type="url"
                placeholder={n === 1 ? "https://mihci.av.tr/..." : "https://..."}
              />
            ),
          )}
        </AdminFormSection>

        <AdminSubmitButton loadingLabel="Aktarılıyor…">İçeriği aktar</AdminSubmitButton>
      </AdminActionForm>
    </div>
  );
}
