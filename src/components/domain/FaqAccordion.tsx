"use client";

import { useState } from "react";

export function FaqAccordion({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  const [open, setOpen] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left text-sm font-medium text-slate-900 hover:bg-slate-50"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            {item.question}
            <span className="text-slate-400">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
