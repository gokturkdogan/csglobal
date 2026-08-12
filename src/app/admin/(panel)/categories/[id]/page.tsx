import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveCategoryAction } from "@/lib/admin-actions";
import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminSelect,
  AdminSubmitButton,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";

type Props = { params: Promise<{ id: string }> };

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const category = isNew
    ? null
    : await prisma.category.findUnique({ where: { id } });

  if (!isNew && !category) notFound();

  const countries = await prisma.country.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  const allCategories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, countryId: true },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={category ? `${category.name} Düzenle` : "Yeni Kategori"}
        description="Kategori hiyerarşisi ve slug yapılandırması."
      />

      <form action={saveCategoryAction} className="max-w-3xl space-y-6">
        {category && <input type="hidden" name="id" value={category.id} />}

        <AdminFormSection title="Konum">
          <AdminSelect
            label="Ülke"
            name="countryId"
            required
            defaultValue={category?.countryId ?? ""}
          >
            <option value="" disabled>Seçin</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </AdminSelect>

          <AdminSelect
            label="Üst kategori"
            name="parentId"
            defaultValue={category?.parentId ?? ""}
          >
            <option value="">Yok (kök)</option>
            {allCategories
              .filter((c) => c.id !== category?.id)
              .map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
          </AdminSelect>
        </AdminFormSection>

        <AdminFormSection title="Bilgiler">
          <AdminField label="Ad" name="name" value={category?.name} required />
          <AdminField label="Slug" name="slug" value={category?.slug} required />
          <AdminField
            label="Tip (visa, residence, work…)"
            name="categoryType"
            value={category?.categoryType}
          />
          <AdminField
            label="Kısa açıklama"
            name="shortDescription"
            value={category?.shortDescription}
          />
          <AdminField
            label="Sıra"
            name="sortOrder"
            type="number"
            value={category?.sortOrder ?? 0}
          />
          <AdminCheckbox
            label="Aktif"
            name="isActive"
            defaultChecked={category?.isActive ?? true}
          />
        </AdminFormSection>

        <AdminSubmitButton>Kaydet</AdminSubmitButton>
      </form>
    </div>
  );
}
