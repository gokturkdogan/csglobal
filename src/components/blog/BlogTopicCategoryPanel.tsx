"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { buildBlogListPath, buildBlogPath } from "@/lib/paths";
import type { BlogTopicCategoryValue } from "@/lib/blog-topic-categories";

export type BlogTopicCategoryPanelItem = {
  category: BlogTopicCategoryValue;
  label: string;
  posts: { id: string; title: string; slug: string }[];
};

export function BlogTopicCategoryPanel({
  categories,
  activeCategory,
  currentPostId,
}: {
  categories: BlogTopicCategoryPanelItem[];
  activeCategory?: BlogTopicCategoryValue | null;
  currentPostId?: string;
}) {
  const [openCategory, setOpenCategory] = useState<BlogTopicCategoryValue | null>(
    activeCategory ?? null,
  );

  const toggle = (category: BlogTopicCategoryValue) => {
    setOpenCategory((current) => (current === category ? null : category));
  };

  return (
    <nav
      aria-label="Blog kategorileri"
      className="country-panel-card scroll-mt-24 flex max-h-[inherit] flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white text-sm shadow-md shadow-csg-blue/[0.05] ring-1 ring-slate-900/[0.04]"
    >
      <div className="country-panel-header shrink-0 px-3.5 py-3">
        <h2 className="text-xs font-semibold tracking-wide text-white">Kategoriler</h2>
        <p className="mt-0.5 text-[11px] leading-snug">Kategori seçerek yazılara göz atın</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white">
        {categories.map((item) => {
          const isOpen = openCategory === item.category;
          const posts = item.posts.filter((post) => post.id !== currentPostId);
          const itemCount = posts.length;
          const meta = `${itemCount} yazı`;

          return (
            <PanelRow
              key={item.category}
              isOpen={isOpen}
              onToggle={() => toggle(item.category)}
              title={item.label}
              meta={meta}
              count={itemCount}
            >
              {itemCount === 0 ? (
                <p className="px-2 py-2 text-xs text-slate-500">
                  Bu kategoride başka yazı yok.
                </p>
              ) : (
                <ul className="space-y-0.5">
                  {posts.map((post) => (
                    <li key={post.id}>
                      <Link
                        href={buildBlogPath(post.slug)}
                        className="group flex cursor-pointer items-center justify-between gap-1.5 rounded-md border border-transparent px-2 py-2 text-xs transition hover:border-csg-blue/15 hover:bg-csg-blue/[0.04]"
                      >
                        <span className="min-w-0 font-medium leading-snug text-slate-900 group-hover:text-csg-blue line-clamp-2">
                          {post.title}
                        </span>
                        <ArrowIcon />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </PanelRow>
          );
        })}
      </div>

      <div className="border-t border-slate-100 bg-slate-50/50 px-3 py-2">
        <Link
          href={buildBlogListPath()}
          className="text-[11px] font-medium text-csg-blue hover:text-csg-blue/80"
        >
          Tüm bloglar
        </Link>
      </div>
    </nav>
  );
}

function PanelRow({
  isOpen,
  onToggle,
  title,
  meta,
  count,
  children,
}: {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  meta: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <div
      className={`border-b border-slate-100 last:border-b-0 ${
        isOpen ? "bg-slate-50/80" : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left transition ${
          isOpen ? "bg-csg-blue/[0.04]" : "hover:bg-slate-50"
        }`}
        aria-expanded={isOpen}
      >
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition ${
            isOpen
              ? "bg-csg-blue text-white shadow-sm shadow-csg-blue/30"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <ChevronIcon open={isOpen} />
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={`block text-sm font-medium leading-snug ${
              isOpen ? "text-csg-blue" : "text-slate-900"
            }`}
          >
            {title}
          </span>
          <span className="mt-0.5 block text-[10px] text-slate-500">{meta}</span>
        </span>
        <span
          className={`shrink-0 rounded-full px-1.5 py-0 text-[10px] font-semibold leading-5 min-w-[1.25rem] text-center ${
            isOpen
              ? "bg-csg-blue text-white"
              : count > 0
                ? "bg-slate-100 text-slate-600"
                : "bg-slate-50 text-slate-400"
          }`}
        >
          {count}
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-slate-100/80 bg-white px-2 pb-2 pt-0.5">
          {children}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-slate-300 transition group-hover:text-csg-blue group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
