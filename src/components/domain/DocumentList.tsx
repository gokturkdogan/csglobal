import type { ApplicantProfile, Document, VisaProgramDocument } from "@/generated/prisma/client";

type ProgramDocumentWithRelations = VisaProgramDocument & {
  document: Document;
  applicantProfile: ApplicantProfile | null;
};

export function DocumentList({
  documents,
  title,
}: {
  documents: ProgramDocumentWithRelations[];
  title?: string;
}) {
  if (documents.length === 0) return null;

  const grouped = groupByProfile(documents);

  return (
    <div className="space-y-6">
      {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
      {grouped.map((group) => (
        <div key={group.label}>
          <p className="text-sm font-medium text-slate-700">{group.label}</p>
          <ul className="mt-2 space-y-2">
            {group.items.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-2 text-sm text-slate-600"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-csg-red" />
                <span>
                  {item.document.name}
                  {item.isRequired && (
                    <span className="ml-1 text-xs text-slate-400">(zorunlu)</span>
                  )}
                  {item.descriptionOverride && (
                    <span className="block text-xs text-slate-500 mt-0.5">
                      {item.descriptionOverride}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function groupByProfile(items: ProgramDocumentWithRelations[]) {
  const map = new Map<string, ProgramDocumentWithRelations[]>();
  for (const item of items) {
    const label = item.applicantProfile?.name ?? "Genel belgeler";
    const list = map.get(label) ?? [];
    list.push(item);
    map.set(label, list);
  }
  return Array.from(map.entries()).map(([label, items]) => ({ label, items }));
}
