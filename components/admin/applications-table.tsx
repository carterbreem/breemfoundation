import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { ApplicationStatusBadge } from "@/components/admin/status-badge";
import { formatDate } from "@/lib/utils";
import type { ApplicationStatus, AssistanceType } from "@prisma/client";

interface Row {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  country: string;
  assistanceType: AssistanceType;
  amountRequested: unknown;
  status: ApplicationStatus;
  createdAt: Date;
}

export function ApplicationsTable({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-surface-border bg-white p-12 text-center">
        <FileText className="h-8 w-8 text-ink-subtle" />
        <p className="mt-3 font-semibold text-ink">No applications found</p>
        <p className="mt-1 max-w-sm text-sm text-ink-muted">
          Adjust your filters or wait for new submissions.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: card list */}
      <div className="space-y-3 lg:hidden">
        {rows.map((row) => {
          const amount = row.amountRequested
            ? Number(row.amountRequested)
            : null;
          return (
            <Link
              key={row.id}
              href={`/admin/applications/${row.id}`}
              className="block rounded-2xl border border-surface-border bg-white p-4 shadow-card transition-colors active:bg-surface-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">
                    {row.fullName}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-ink-muted">
                    {row.email}
                  </p>
                </div>
                <ApplicationStatusBadge status={row.status} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-ink-muted">Reference</p>
                  <p className="mt-0.5 font-mono text-ink">
                    {row.referenceNumber}
                  </p>
                </div>
                <div>
                  <p className="text-ink-muted">Type</p>
                  <p className="mt-0.5 text-ink">
                    {row.assistanceType.charAt(0) +
                      row.assistanceType.slice(1).toLowerCase()}
                  </p>
                </div>
                <div>
                  <p className="text-ink-muted">Country</p>
                  <p className="mt-0.5 text-ink">{row.country}</p>
                </div>
                <div>
                  <p className="text-ink-muted">Amount</p>
                  <p className="mt-0.5 text-ink">
                    {amount ? `$${amount.toFixed(2)}` : "—"}
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

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-2xl border border-surface-border bg-white shadow-card lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead className="border-b border-surface-border bg-surface-soft">
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                <th className="px-5 py-3">Applicant</th>
                <th className="px-5 py-3">Reference</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Country</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Submitted</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {rows.map((row) => {
                const amount = row.amountRequested
                  ? Number(row.amountRequested)
                  : null;
                return (
                  <tr
                    key={row.id}
                    className="text-sm transition-colors hover:bg-surface-soft"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-ink">
                        {row.fullName}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-muted">
                        {row.email}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-ink-muted">
                        {row.referenceNumber}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-ink">
                      {row.assistanceType.charAt(0) +
                        row.assistanceType.slice(1).toLowerCase()}
                    </td>
                    <td className="px </-5 py-4 text-ink-mdivuted">
                      {row.country}
                    </>
td>
                    <td className="px-             5 py-4">
                      {amount ? (
                        <span className="font-semibold text-ink">
                          ${amount.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-ink-subtle">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <ApplicationStatusBadge status={row.status} />
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
                        href={`/admin/applications/${row.id}`}
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
    </>
  );
}
