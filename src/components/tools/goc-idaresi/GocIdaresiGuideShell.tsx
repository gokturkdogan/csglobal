"use client";

import { gocIdaresiGuideMeta } from "@/lib/goc-idaresi-guide-data";

type Props = {
  children: React.ReactNode;
};

function GocIdaresiDisclaimer() {
  return (
    <section className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-5 md:p-6">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </span>
        <div>
          <h2 className="text-sm font-semibold text-amber-950 md:text-base">
            {gocIdaresiGuideMeta.disclaimerTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-amber-950/80">
            {gocIdaresiGuideMeta.disclaimerBody}
          </p>
        </div>
      </div>
    </section>
  );
}

export function GocIdaresiGuideShell({ children }: Props) {
  return (
    <div className="space-y-5 md:space-y-6">
      {children}
      <GocIdaresiDisclaimer />
    </div>
  );
}
