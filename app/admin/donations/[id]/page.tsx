import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Heart } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { DonationStatusBadge } from "@/components/admin/status-badge";
import { EmailDonorButton } from "@/components/admin/email-donor-button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Donation Detail · Admin",
  robots: { index: false, follow: false }
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DonationDetailPage({ params }: PageProps) {
  const { id } = await params;

  const donation = await prisma.donation.findUnique({ where: { id } });
  if (!donation) notFound();

  const amount = Number(donation.amount);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/donations"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:underline"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to Donations
      </Link>

      <section className="rounded-2xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 shadow-card sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="font-display text-lg font-semibold text-ink">
              Ready to collect this donation?
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Click below to email the donor the exact payment details for
              their chosen method. The status will update automatically.
            </p>
          </div>
          <EmailDonorButton
            donationId={donation.id}
            donorEmail={donation.donorEmail}
            donorName={donation.isAnonymous ? "Anonymous" : donation.donorName}
            currentStatus={donation.status}
          />
        </div>
      </section>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="break-words font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {donation.isAnonymous ? "Anonymous Donor" : donation.donorName}
          </h1>
          <p className="mt-1 break-all font-mono text-sm text-ink-muted">
            {donation.referenceNumber}
          </p>
        </div>
        <DonationStatusBadge status={donation.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
            <h2 className="mb-5 font-display text-lg font-semibold text-ink">
              Donor Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow label="Name" value={donation.donorName} />
              <InfoRow label="Email" value={donation.donorEmail} />
              <InfoRow
                label="Anonymous"
                value={donation.isAnonymous ? "Yes" : "No"}
              />
              <InfoRow
                label="Received"
                value={formatDate(donation.createdAt, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit"
                })}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
            <h2 className="mb-5 font-display text-lg font-semibold text-ink">
              Donation Details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow
                label="Amount"
                value={`${donation.currency === "USD" ? "$" : ""}${amount.toFixed(2)}`}
              />
              <InfoRow
                label="Frequency"
                value={donation.frequency === "MONTHLY" ? "Monthly" : "One-time"}
              />
              <InfoRow
                label="Payment Method"
                value={donation.paymentMethod.replace(/_/g, " ")}
              />
              <InfoRow label="Currency" value={donation.currency} />
            </div>

            {donation.dedication && (
              <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-800">
                  Dedication
                </p>
                <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-ink">
                  {donation.dedication}
                </p>
              </div>
            )}
          </section>

          {donation.adminNotes && (
            <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
              <h2 className="mb-5 font-display text-lg font-semibold text-ink">
                Admin Notes
              </h2>
              <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-ink-muted">
                {donation.adminNotes}
              </p>
            </section>
          )}
        </div>

        <div className="min-w-0 lg:col-span-1">
          <div className="space-y-4 lg:sticky lg:top-24">
            <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Timeline
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs text-ink-muted">Received</dt>
                  <dd className="mt-0.5 break-words text-ink">
                    {formatDate(donation.createdAt, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit"
                    })}
                  </dd>
                </div>
                {donation.detailsSentAt && (
                  <div>
                    <dt className="text-xs text-ink-muted">Details Sent</dt>
                    <dd className="mt-0.5 break-words text-ink">
                      {formatDate(donation.detailsSentAt, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                      })}
                    </dd>
                  </div>
                )}
                {donation.completedAt && (
                  <div>
                    <dt className="text-xs text-ink-muted">Completed</dt>
                    <dd className="mt-0.5 break-words text-ink">
                      {formatDate(donation.completedAt, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                      })}
                    </dd>
                  </div>
                )}
              </dl>
            </section>

            <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                <Heart className="h-3.5 w-3.5" />
                Reminders
              </h3>
              <ul className="space-y-2 text-xs leading-relaxed text-ink-muted">
                <li>• Send payment details within 24 hours.</li>
                <li>• Always include the reference number in the email.</li>
                <li>• Confirm receipt and send a tax receipt.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <p className="mt-1 break-words text-sm text-ink">{value}</p>
    </div>
  );
}
