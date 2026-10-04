import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { ApplicationsFilters } from "@/components/admin/applications-filters";
import { ApplicationsTable } from "@/components/admin/applications-table";
import { ExportButtons } from "@/components/admin/export-buttons";
import { prisma } from "@/lib/prisma";
import type {
  ApplicationStatus,
  AssistanceType,
  Prisma
} from "@prisma/client";

export const metadata: Metadata = {
  title: "Applications · Admin",
  robots: { index: false, follow: false }
};

const PAGE_SIZE = 20;

interface PageProps {
  searchParams: Promise<{
    q?: string;
    status?: string;
    type?: string;
    page?: string;
  }>;
}

export default async function AdminApplicationsPage({
  searchParams
}: PageProps) {
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const status = params.status ?? "";
  const type = params.type ?? "";
  const page = Math.max(1, Number(params.page ?? "1") || 1);

  const where: Prisma.ApplicationWhereInput = {};
  if (q) {
    where.OR = [
      { fullName: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { referenceNumber: { contains: q, mode: "insensitive" } }
    ];
  }
  if (status) where.status = status as ApplicationStatus;
  if (type) where.assistanceType = type as AssistanceType;

  const [total, rows] = await Promise.all([
    prisma.application.count({ where }),
    prisma.application.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        referenceNumber: true,
        fullName: true,
        email: true,
        country: true,
        assistanceType: true,
        amountRequested: true,
        status: true,
        createdAt: true
      }
    })
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Applications
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {total} total · Page {page} of {totalPages}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 self-start">
          <ExportButtons type="applications" />
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
            <FileText className="h-3.5 w-3.5" />
            {total} application{total === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <ApplicationsFilters />
      <ApplicationsTable rows={rows} />

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          searchParams={{ q, status, type }}
        />
      )}
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  searchParams
}: {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string>;
}) {
  function buildHref(page: number) {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(searchParams)) {
      if (v) params.set(k, v);
    }
    params.set("page", String(page));
    return `/admin/applications?${params.toString()}`;
  }

  return (
    <div className="flex items-center justify-between rounded-2xl border border-surface-border bg-white p-4 shadow-card">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        className={
          currentPage === 1
            ? "pointer-events-none rounded-lg border border-surface-border px-3 py-1.5 text-sm font-medium text-ink-subtle"
            : "rounded-lg border border-surface-border px-3 py-1.5 text-sm font-medium text-ink hover:border-brand-300 hover:text-brand-600"
        }
      >
        Previous
      </Link>
      <p className="text-sm text-ink-muted">
        Page <span className="font-semibold text-ink">{currentPage}</span> of{" "}
        {totalPages}
      </p>
      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        className={
          currentPage === totalPages
            ? "pointer-events-none rounded-lg border border-surface-border px-3 py-1.5 text-sm font-medium text-ink-subtle"
            : "rounded-lg border border-surface-border px-3 py-1.5 text-sm font-medium text-ink hover:border-brand-300 hover:text-brand-600"
        }
      >
        Next
      </Link>
    </div>
  );
}
