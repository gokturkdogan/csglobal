import { prisma } from "@/lib/prisma";
import { importEagvsPageAction } from "@/lib/admin-actions";
import { EagvsImportForm } from "@/components/admin/EagvsImportForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";

export const dynamic = "force-dynamic";

export default async function AdminEagvsImportPage() {
  const [countries, categories] = await Promise.all([
    prisma.country.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true },
    }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      select: { id: true, name: true, slug: true },
    }),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="EAGVS İçe Aktarma"
        description="EAGVS sayfa linkinden içerik çekip vize programı olarak kaydedin."
      />

      <EagvsImportForm
        countries={countries}
        categories={categories}
        action={importEagvsPageAction}
      />
    </div>
  );
}
