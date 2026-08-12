import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveCategoryAction } from "@/lib/admin-actions";

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
    <div>
      <h1 className="text-2xl font-bold text-csg-blue">
        {category ? `${category.name} Düzenle` : "Yeni Kategori"}
      </h1>

      <form action={saveCategoryAction} className="mt-6 space-y-4 max-w-3xl">
        {category && <input type="hidden" name="id" value={category.id} />}

        <label className="block text-sm font-medium">
          Ülke
          <select
            name="countryId"
            required
            defaultValue={category?.countryId ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="" disabled>Seçin</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium">
          Üst kategori
          <select
            name="parentId"
            defaultValue={category?.parentId ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="">Yok (kök)</option>
            {allCategories
              .filter((c) => c.id !== category?.id)
              .map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
          </select>
        </label>

        <Field label="Ad" name="name" value={category?.name} required />
        <Field label="Slug" name="slug" value={category?.slug} required />
        <Field label="Tip (visa, residence, work…)" name="categoryType" value={category?.categoryType} />
        <Field label="Kısa açıklama" name="shortDescription" value={category?.shortDescription} />
        <Field label="Sıra" name="sortOrder" type="number" value={category?.sortOrder ?? 0} />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isActive" defaultChecked={category?.isActive ?? true} />
          Aktif
        </label>

        <button type="submit" className="rounded-lg bg-csg-blue px-6 py-2 font-semibold text-white">
          Kaydet
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  value?: string | number | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={value ?? ""}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
      />
    </label>
  );
}
