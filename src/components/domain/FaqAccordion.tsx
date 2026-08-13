"use client";

import { useState } from "react";

export function FaqAccordion({
  items,
  variant = "default",
  initialOpenIndex = 0,
}: {
  items: Array<{ question: string; answer: string }>;
  variant?: "default" | "modern";
  initialOpenIndex?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(initialOpenIndex);

  if (items.length === 0) return null;

  const isModern = variant === "modern";

  return (
    <div
      className={
        isModern
          ? "space-y-2"
          : "divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white"
      }
    >
      {items.map((item, i) => {
        const isOpen = open === i;

        return (
          <div
            key={i}
            className={
              isModern
                ? `overflow-hidden rounded-xl border transition-all duration-200 ${
                    isOpen
                      ? "border-csg-blue/25 bg-white shadow-md shadow-csg-blue/5 ring-1 ring-csg-blue/10"
                      : "border-slate-200/80 bg-white/90 hover:border-csg-blue/15 hover:shadow-sm"
                  }`
                : undefined
            }
          >
            <button
              type="button"
              className={`flex w-full cursor-pointer items-center justify-between gap-4 text-left ${
                isModern
                  ? "px-5 py-4 text-content font-semibold text-slate-900"
                  : "px-5 py-4 text-sm font-medium text-slate-900 hover:bg-slate-50"
              }`}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="min-w-0">{item.question}</span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                  isModern
                    ? isOpen
                      ? "bg-csg-blue text-white"
                      : "bg-slate-100 text-slate-500"
                    : "text-slate-400"
                }`}
              >
                {isModern ? (
                  <Chevron open={isOpen} />
                ) : (
                  (isOpen ? "−" : "+")
                )}
              </span>
            </button>
            {isOpen && (
              <div
                className={
                  isModern
                    ? "border-t border-slate-100 px-5 pb-5 pt-1 text-content text-slate-600"
                    : "px-5 pb-4 text-content text-slate-600"
                }
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
