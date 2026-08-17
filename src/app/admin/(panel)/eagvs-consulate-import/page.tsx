import { prisma } from "@/lib/prisma";
import { importEagvsConsulateAction } from "@/lib/admin-actions";
import { EagvsConsulateImportForm } from "@/components/admin/EagvsConsulateImportForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";

export const dynamic = "force-dynamic";

export default async function AdminEagvsConsulateImportPage() {
  const countries = await prisma.country.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="EAGVS Konsolosluk İçe Aktarma"
        description="EAGVS konsolosluk sayfasından içerik, harita embed ve adres bilgisini aktarın."
      />

      <EagvsConsulateImportForm
        countries={countries}
        action={importEagvsConsulateAction}
      />
    </div>
  );
}
