import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveServiceAction, saveServiceSectionAction } from "@/lib/admin-actions";

type Props = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const service = isNew
    ? null
    : await prisma.service.findUnique({
        where: { id },
        include: {
          sections: { orderBy: { sortOrder: "asc" } },
          fees: true,
        },
      });

  if (!isNew && !service) notFound();

  const countries = await prisma.country.findMany({ orderBy: { name: "asc" } });
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, countryId: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-csg-blue">
        {service ? `${service.name} Düzenle` : "Yeni Hizmet"}
      </h1>

      <form action={saveServiceAction} className="mt-6 space-y-4 max-w-3xl">
        {service && <input type="hidden" name="id" value={service.id} />}

        <label className="block text-sm font-medium">
          Ülke
          <select
            name="countryId"
            required
            defaultValue={service?.countryId ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="" disabled>Seçin</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium">
          Kategori
          <select
            name="categoryId"
            required
            defaultValue={service?.categoryId ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="" disabled>Seçin</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <Field label="Ad" name="name" value={service?.name} required />
        <Field label="Slug" name="slug" value={service?.slug} required />
        <Field label="Kısa açıklama" name="shortDescription" value={service?.shortDescription} />
        <Field label="İşlem süresi" name="processingTime" value={service?.processingTime} />
        <Field label="Kapak görsel URL" name="heroImage" value={service?.heroImage} />
        <Field label="Sıra" name="sortOrder" type="number" value={service?.sortOrder ?? 0} />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="requiresAppointment" defaultChecked={service?.requiresAppointment ?? false} />
          Randevu gerekli
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isFeatured" defaultChecked={service?.isFeatured ?? false} />
          Öne çıkan
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isActive" defaultChecked={service?.isActive ?? true} />
          Aktif
        </label>

        <button type="submit" className="rounded-lg bg-csg-blue px-6 py-2 font-semibold text-white">
          Kaydet
        </button>
      </form>

      {service && (
        <div className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold text-csg-blue">İçerik bölümleri</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {service.sections.map((sec) => (
              <li key={sec.id} className="rounded border border-slate-200 px-3 py-2">
                {sec.title} <span className="text-csg-gray">({sec.slug})</span>
              </li>
            ))}
          </ul>

          <form action={saveServiceSectionAction} className="mt-6 space-y-3 rounded-lg border border-slate-200 p-4">
            <input type="hidden" name="serviceId" value={service.id} />
            <p className="font-medium text-sm">Yeni bölüm ekle</p>
            <Field label="Başlık" name="title" required />
            <Field label="Slug" name="slug" required />
            <label className="block text-sm font-medium">
              İçerik (Markdown)
              <textarea name="content" rows={6} required className="mt-1 w-full rounded-lg border px-3 py-2 font-mono text-sm" />
            </label>
            <Field label="Sıra" name="sortOrder" type="number" value={service.sections.length} />
            <button type="submit" className="rounded bg-slate-800 px-4 py-2 text-sm text-white">
              Bölüm ekle
            </button>
          </form>

          {service.fees.length > 0 && (
            <div className="mt-8">
              <h3 className="font-medium">Ücretler</h3>
              <ul className="mt-2 text-sm text-csg-gray">
                {service.fees.map((f) => (
                  <li key={f.id}>{f.name}: {f.amount.toString()} {f.currency}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
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
