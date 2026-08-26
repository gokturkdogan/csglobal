import { prisma } from "@/lib/prisma";
import { importEagvsCountrySyncAction } from "@/lib/admin-actions";
import { EagvsCountrySyncForm } from "@/components/admin/EagvsCountrySyncForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";

export const dynamic = "force-dynamic";

export default async function AdminEagvsCountrySyncPage() {
  const countries = await prisma.country.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="EAGVS Ülke Senkron"
        description="Tek link ile ülke detayını ve sol paneldeki tüm vize programlarını eksiksiz aktarın. Mevcut kayıtlar atlanır."
      />

      <EagvsCountrySyncForm
        countries={countries}
        action={importEagvsCountrySyncAction}
      />
    </div>
  );
}
