import type { Fee } from "@/generated/prisma/client";

export function FeeTable({ fees }: { fees: Fee[] }) {
  if (fees.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 font-medium">Kalem</th>
            <th className="px-4 py-3 font-medium">Tutar</th>
            <th className="px-4 py-3 font-medium">Açıklama</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {fees.map((fee) => (
            <tr key={fee.id} className="bg-white">
              <td className="px-4 py-3 font-medium text-slate-900">{fee.name}</td>
              <td className="px-4 py-3 text-slate-700">
                {fee.amount.toString()} {fee.currency}
              </td>
              <td className="px-4 py-3 text-slate-600">{fee.description ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
