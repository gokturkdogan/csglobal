import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveCountryAction } from "@/lib/admin-actions";

type Props = { params: Promise<{ id: string }> };

export default async function EditCountryPage({ params }: Props) {
  const { id } = await params;
  const country =
    id === "new" ? null : await prisma.country.findUnique({ where: { id } });

  if (id !== "new" && !country) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-csg-blue">
        {country ? `${country.name} Düzenle` : "Yeni Ülke"}
      </h1>

      <form action={saveCountryAction} className="mt-6 space-y-4 max-w-3xl">
        {country && <input type="hidden" name="id" value={country.id} />}

        <Field label="Ad" name="name" value={country?.name} required />
        <Field label="Slug" name="slug" value={country?.slug} required />
        <Field label="ISO2" name="iso2" value={country?.iso2} />
        <Field label="Kısa açıklama" name="shortDescription" value={country?.shortDescription} />
        <TextArea label="Açıklama" name="description" value={country?.description} rows={8} />
        <Field
          label="Kapak / hero görsel URL"
          name="heroImage"
          value={country?.heroImage}
        />
        <Field label="Sıra" name="sortOrder" type="number" value={country?.sortOrder ?? 0} />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={country?.isActive ?? true}
          />
          Aktif
        </label>

        <button
          type="submit"
          className="rounded-lg bg-csg-blue px-6 py-2 font-semibold text-white hover:bg-csg-blue-dark"
        >
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

function TextArea({
  label,
  name,
  value,
  rows = 6,
}: {
  label: string;
  name: string;
  value?: string | null;
  rows?: number;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <textarea
        name={name}
        rows={rows}
        defaultValue={value ?? ""}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
      />
    </label>
  );
}
