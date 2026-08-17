import { prisma } from "@/lib/prisma";
import { importEagvsBlogPageAction } from "@/lib/admin-actions";
import { EagvsBlogImportForm } from "@/components/admin/EagvsBlogImportForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";

export const dynamic = "force-dynamic";

export default async function AdminEagvsBlogImportPage() {
  const countries = await prisma.country.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="EAGVS Blog İçe Aktarma"
        description="EAGVS sayfa linkinden içerik çekip blog olarak kaydedin. Ülke URL üzerinden otomatik eşleşir."
      />

      <EagvsBlogImportForm countries={countries} action={importEagvsBlogPageAction} />
    </div>
  );
}
