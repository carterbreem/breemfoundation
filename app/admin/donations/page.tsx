import type { Metadata } from "next";
import Link from "next/link";
import { DollarSign } from "lucide-react";
import { DonationsTable } from "@/components/admin/donations-table";
import { ExportButtons } from "@/components/admin/export-buttons";
import { prisma } from "@/lib/prisma";
import type { DonationStatus, PaymentMethod, Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "Donations · Admin",
  robots: { index: false, follow: false }
};

const PAGE_SIZE = 20;

interface PageProps {
  searchParams: Promise<{
    status?: string;
    method?: string;
    page?: string;
  }>;
}

export default async function AdminDonationsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = params.status ?? "";
  const method = params.method ?? "";
  const page = Math.max(1, Number(params.page ?? "1") || 1);

  const where: Prisma.DonationWhereInput = {};
  if (status) where.status = status as DonationStatus;
  if (method) where.paymentMethod = method as PaymentMethod;

  const [total, rows] = await Promise.all([
    prisma.donation.count({ where }),
    prisma.donation.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    })
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Donations
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {total} total · Page {page} of {totalPages}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 self-start">
          <ExportButtons type="donations" />
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-3 py-1.5 text-xs font-semibold text-gold-700">
            <DollarSign className="h-3.5 w-3.5" />
            {total} donation{total === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-surface-border bg-white p-4 shadow-card sm:flex-row">
        <select
          value={status}
          onChange={(e) => {
            const url = new URL(window.location.href);
            if (e.target.value) url.searchParams.set("status", e.target.value);
            else url.searchParams.delete("status");
            url.searchParams.delete("page");
            window.location.href = url.toString();
          }}
          className="h-11 rounded-xl border border-surface-border bg-white px-3 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400"
          defaultValue={status}
        >
          <option value="">All statuses</option>
          <option value="PENDING_PAYMENT">Pending Payment</option>
          <option value="PAYMENT_DETAILS_SENT">Details Sent</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="REFUNDED">Refunded</option>
        </select>

        <select
          value={method}
          onChange={(e) => {
            const url = new URL(window.location.href);
            if (e.target.value) url.searchParams.set("method", e.target.value);
            else url.searchParams.delete("method");
            url.searchParams.delete("page");
            window.location.href = url.toString();
          }}
          className="h-11 rounded-xl border border-surface-border bg-white px-3 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400"
          defaultValue={method}
        >
          <option value="">All methods</option>
          <option value="BANK_TRANSFER">Bank Transfer</option>
          <option value="CASH_APP">Cash App</option>
          <option value="PAYPAL">PayPal</option>
          <option value="ZELLE">Zelle</option>
          <option value="VENMO">Venmo</option>
        </select>
      </div>

      <DonationsTable rows={rows} />

      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-2xl border border-surface-border bg-white p-4 shadow-card">
          <Link
            href={`/admin/donations?page=${Math.max(1, page - 1)}${status ? `&status=${status}` : ""}${method ? `&method=${method}` : ""}`}
            className={
              page === 1
                ? "pointer-events-none rounded-lg border border-surface-border px-3 py-1.5 text-sm font-medium text-ink-subtle"
                : "rounded-lg border border-surface-border px-3 py-1.5 text-sm font-medium text-ink hover:border-brand-300 hover:text-brand-600"
            }
          >
            Previous
          </Link>
          <p className="text-sm text-ink-muted">
            Page <span className="font-semibold text-ink">{page}</span> of{" "}
            {totalPages}
          </p>
          <Link
            href={`/admin/donations?page=${Math.min(totalPages, page + 1)}${status ? `&status=${status}` : ""}${method ? `&method=${method}` : ""}`}
            className={
              page === totalPages
                ? "pointer-events-none rounded-lg border border-surface-border px-3 py-1.5 text-sm font-medium text-ink-subtle"
                : "rounded-lg border border-surface-border px-3 py-1.5 text-sm font-medium text-ink hover:border-brand-300 hover:text-brand-600"
            }
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
