"use client";

import { useMemo, useState } from "react";
import { Search, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs, faqCategories } from "@/lib/dummy-data";

export function FaqList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchesCategory =
        category === "All" || f.category === category;
      const matchesQuery =
        q === "" ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="h-12 w-full rounded-xl border border-surface-border bg-white pl-11 pr-4 text-sm text-ink placeholder:text-ink-subtle focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100"
            aria-label="Search FAQs"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold transition-all",
                category === cat
                  ? "border-brand-500 bg-brand-500 text-white shadow-card"
                  : "border-surface-border bg-white text-ink-muted hover:border-brand-200 hover:text-brand-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-surface-border bg-surface-soft p-10 text-center">
            <Inbox className="h-8 w-8 text-ink-subtle" />
            <p className="mt-3 font-semibold text-ink">
              No matching questions
            </p>
            <p className="mt-1 max-w-sm text-sm text-ink-muted">
              Try a different keyword, or contact us — we&apos;re happy to
              help.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((faq) => (
              <details
                key={faq.id}
                className="group rounded-2xl border border-surface-border bg-white p-5 transition-all open:border-brand-200 open:shadow-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <div className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                    <span className="inline-flex w-fit items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-700">
                      {faq.category}
                    </span>
                    <span className="font-display text-base font-semibold text-ink sm:text-lg">
                      {faq.question}
                    </span>
                  </div>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-surface-border text-ink-muted transition-transform group-open:rotate-45 group-open:border-brand-300 group-open:text-brand-600">
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M7 2v10M2 7h10" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
