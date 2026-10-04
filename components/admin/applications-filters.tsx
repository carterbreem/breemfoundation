"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "SUBMITTED", label: "Submitted" },
  { value: "UNDER_REVIEW", label: "Under Review" },
  { value: "MORE_INFO_REQUIRED", label: "More Info Required" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" }
];

const ASSISTANCE_OPTIONS = [
  { value: "", label: "All types" },
  { value: "FINANCIAL", label: "Financial" },
  { value: "FOOD", label: "Food" },
  { value: "HOUSING", label: "Housing" },
  { value: "MEDICAL", label: "Medical" },
  { value: "EDUCATION", label: "Education" },
  { value: "EMERGENCY", label: "Emergency" },
  { value: "OTHER", label: "Other" }
];

export function ApplicationsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = React.useState(searchParams.get("q") ?? "");

  function applyFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset page when filtering
    params.delete("page");
    router.push(`/admin/applications?${params.toString()}`);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    applyFilter("q", query.trim());
  }

  function clearAll() {
    setQuery("");
    router.push("/admin/applications");
  }

  const hasFilters =
    searchParams.get("q") ||
    searchParams.get("status") ||
    searchParams.get("type");

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-surface-border bg-white p-4 shadow-card sm:flex-row sm:items-center">
      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, or reference..."
          className="h-11 w-full rounded-xl border border-surface-border bg-white pl-11 pr-4 text-sm text-ink placeholder:text-ink-subtle focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100"
        />
      </form>

      {/* Status filter */}
      <select
        value={searchParams.get("status") ?? ""}
        onChange={(e) => applyFilter("status", e.target.value)}
        className="h-11 rounded-xl border border-surface-border bg-white px-3 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400"
      >
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Type filter */}
      <select
        value={searchParams.get("type") ?? ""}
        onChange={(e) => applyFilter("type", e.target.value)}
        className="h-11 rounded-xl border border-surface-border bg-white px-3 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400"
      >
        {ASSISTANCE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Clear */}
      {hasFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-surface-border bg-white px-4 text-sm font-medium text-ink-muted transition-colors hover:border-red-200 hover:text-red-600"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </button>
      )}
    </div>
  );
}
