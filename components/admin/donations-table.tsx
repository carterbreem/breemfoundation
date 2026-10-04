import Link from "next/link";
import { ArrowRight, DollarSign } from "lucide-react";
import { DonationStatusBadge } from "@/components/admin/status-badge";
import { formatDate } from "@/lib/utils";
import type {
  DonationStatus,
  PaymentMethod,
  DonationFrequency
} from "@prisma/client";

interface Row {
  id: string;
  referenceNumber: string;
  donorName: string;
  donorEmail: string;
  isAnonymous: boolean;
  amount: unknown;
  currency: string;
  frequency: DonationFrequency;
  paymentMethod: PaymentMethod;
  status: DonationStatus;
  createdAt: Date;
}

export function DonationsTable({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-surface-border bg-white p-12 text-center">
        <DollarSign className="h-8 w-8 text-ink-subtle" />
        <p className="mt-3 font-semibold text-ink">No donations found</p>
        <p className="mt-1 max-w-sm text-sm text-ink-muted">
          Adjust your filters or wait for new donation intents.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-3 lg:hidden">
        {rows.map((row) => {
          return (
            <Link
              key={row.id}
              href={`/admin/donations/${row.id}`}
              className="block rounded-2xl border border-surface-border bg-white p-4 shadow-card transition-colors active:bg-surface-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">
                    {row.isAnonymous ? "Anonymous Donor" : row.donorName}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-ink-muted">
                    {row.donorEmail}
                  </p>
                </div>
                <DonationStatusBadge status={row.status} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-ink-muted">Amount</p>
                  <p className="mt-0.5 font-bold text-ink">
                    {row.currency === "USD" ? "$" : ""}
                    {Number(row.amount).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-ink-muted">Frequency</p>
                  <p className="mt-0.5 text-ink">
                    {row.frequency === "MONTHLY" ? "Monthly" : "One-time"}
                  </p>
                </div>
                <div>
                  <p className="text-ink-muted">Method</p>
                  <p className="mt-0.5 text-ink">
                    {row.paymentMethod.replace(/_/g, " ")}
                  </p>
                </div>
                <div>
                  <p className="text-ink-muted">Reference</p>
                  <p className="mt-0.5 font-mono text-ink">
                    {row.referenceNumber}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-surface-border pt-3 text-xs">
                <span className="text-ink-muted">
                  {formatDate(row.createdAt, {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-brand-600">
                  View
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-surface-border bg-white shadow-card lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b border-surface-border bg-surface-soft">
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                <th className="px-5 py-3">Donor</th>
                <th className="px-5 py-3">Reference</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Method</th>
                <th className="px-5 py-3">Frequency</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Received</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className="text-sm transition-colors hover:bg-surface-soft"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-ink">
                        {row.isAnonymous
                          ? "Anonymous Donor"
                          : row.donorName}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-muted">
                        {row.donorEmail}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-ink-muted">
                        {row.referenceNumber}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-bold text-ink">
                        {row.currency === "USD" ? "$" : ""}
                        {Number(row.amount).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-ink-muted">
                      {row.paymentMethod.replace(/_/g, " ")}
                    </td>
                    <td className="px-5 py-4 text-xs text-ink-muted">
                      {row.frequency === "MONTHLY" ? "Monthly" : "One-time"}
                    </td>
                    <td className="px-5 py-4">
                      <DonationStatusBadge status={row.status} />
                    </td>
                    <td className="px-5 py-4 text-xs text-ink-muted">
                      {formatDate(row.createdAt, {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/donations/${row.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
                      >
                        View
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
