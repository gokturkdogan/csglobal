import type { ImmigrationOfficePublicRecord } from "@/lib/repositories/immigration-office.repository";
import { ImmigrationOfficeCard } from "@/components/tools/immigration-office/ImmigrationOfficeCard";

type Props = {
  offices: ImmigrationOfficePublicRecord[];
};

export function ImmigrationOfficeList({ offices }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {offices.map((office) => (
        <ImmigrationOfficeCard key={office.id} office={office} />
      ))}
    </div>
  );
}
