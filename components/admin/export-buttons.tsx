"use client";

import { Download } from "lucide-react";

interface Props {
  type: "applications" | "donations";
}

export function ExportButtons({ type }: Props) {
  const href = `/api/admin/export/${type}`;
  const label = type === "applications" ? "Export Applications" : "Export Donations";

  return (
    <a
      href={href}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-surface-border bg-white px-4 text-xs font-semibold text-ink transition-all hover:border-brand-200 hover:text-brand-600"
    >
      <Download className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}
