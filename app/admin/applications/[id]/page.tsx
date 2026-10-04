import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Users,
  FileText,
  Download,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { ApplicationStatusBadge } from "@/components/admin/status-badge";
import { ApplicationStatusForm } from "@/components/admin/application-status-form";
import { ApplicationMessageForm } from "@/components/admin/application-message-form";
import { enrichDocumentsWithUrls } from "@/lib/admin/documents";

export const metadata: Metadata = {
  title: "Application Detail · Admin",
  robots: { index: false, follow: false }
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      documents: { orderBy: { uploadedAt: "desc" } },
      messages: { orderBy: { createdAt: "desc" } }
    }
  });

  if (!application) {
    notFound();
  }

  const documentsWithUrls = await enrichDocumentsWithUrls(
    application.documents
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/admin/applications"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:underline"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Applications
          </Link>
          <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {application.fullName}
          </h1>
          <p className="mt-1 font-mono text-sm text-ink-muted">
            {application.referenceNumber}
          </p>
        </div>
        <ApplicationStatusBadge status={application.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Left: Applicant info ─────────────────── */}
        <div className="space-y-6 lg:col-span-2">
          {/* Personal info */}
          <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
            <h2 className="mb-5 font-display text-lg font-semibold text-ink">
              Applicant Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={application.email}
              />
              <InfoRow
                icon={<Phone className="h-4 w-4" />}
                label="Phone"
                value={application.phone}
              />
              <InfoRow
                icon={<Calendar className="h-4 w-4" />}
                label="Date of Birth"
                value={formatDate(application.dateOfBirth)}
              />
              <InfoRow
                icon={<Users className="h-4 w-4" />}
                label="Gender"
                value={application.gender.replace(/_/g, " ")}
              />
              <InfoRow
                icon={<Briefcase className="h-4 w-4" />}
                label="Employment"
                value={application.employmentStatus}
              />
              <InfoRow
                icon={<Users className="h-4 w-4" />}
                label="Marital Status"
                value={application.maritalStatus}
              />
              <div className="sm:col-span-2">
                <InfoRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Address"
                  value={`${application.homeAddress}, ${application.city}, ${application.state}, ${application.country}`}
                />
              </div>
            </div>
          </section>

          {/* Assistance request */}
          <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
            <h2 className="mb-5 font-display text-lg font-semibold text-ink">
              Assistance Request
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoRow
                  label="Type"
                  value={application.assistanceType}
                />
                <InfoRow
                  label="Amount Requested"
                  value={
                    application.amountRequested
                      ? `$${Number(application.amountRequested).toFixed(2)}`
                      : "Not specified"
                  }
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Explanation of Need
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink">
                  {application.needExplanation}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  How This Will Help
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink">
                  {application.howItWillHelp}
                </p>
              </div>
              {application.receivedBefore && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-xs font-semibold text-amber-900">
                    Received previous assistance
                  </p>
                  {application.receivedBeforeNote && (
                    <p className="mt-1 text-sm text-amber-800">
                      {application.receivedBeforeNote}
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Documents */}
          <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
            <h2 className="mb-5 font-display text-lg font-semibold text-ink">
              Documents ({documentsWithUrls.length})
            </h2>
            <ul className="space-y-3">
              {documentsWithUrls.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-surface-border bg-surface-soft p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600">
                      <FileText className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">
                        {doc.fileName}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {doc.kind === "APPLICANT_PHOTO" ? "Photo" : "Supporting"}{" "}
                        · {Math.round(doc.sizeBytes / 1024)} KB ·{" "}
                        {formatDate(doc.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {doc.signedUrl ? (
                      <>
                        <a
                          href={doc.signedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-surface-border bg-white px-3 text-xs font-semibold text-ink transition-colors hover:border-brand-200 hover:text-brand-600"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View
                        </a>
                        <a
                          href={doc.signedUrl}
                          download={doc.fileName}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white transition-colors hover:bg-brand-600"
                          aria-label={`Download ${doc.fileName}`}
                        >
                          <Download className="h-3.5 w-3.5" />
                        </a>
                      </>
                    ) : (
                      <span className="text-xs text-ink-subtle">
                        Unavailable
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Conversation */}
          <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <MessageSquare className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Conversation
                </h2>
                <p className="text-xs text-ink-muted">
                  {application.messages.length} message
                  {application.messages.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            {application.messages.length > 0 && (
              <ul className="mb-6 space-y-3">
                {application.messages.map((msg) => (
                  <li
                    key={msg.id}
                    className="rounded-xl border border-surface-border bg-surface-soft p-4"
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">
                      {msg.body}
                    </p>
                    <p className="mt-2 text-xs text-ink-muted">
                      {formatDate(msg.createdAt, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <ApplicationMessageForm
              applicationId={application.id}
              applicantName={application.fullName}
              applicantEmail={application.email}
            />
          </section>
        </div>

        {/* ── Right: Actions ───────────────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
              <h2 className="mb-5 font-display text-lg font-semibold text-ink">
                Review Actions
              </h2>
              <ApplicationStatusForm
                applicationId={application.id}
                currentStatus={application.status}
                currentNotes={application.adminNotes}
              />
            </section>

            <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Metadata
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs text-ink-muted">Submitted</dt>
                  <dd className="mt-0.5 text-ink">
                    {formatDate(application.createdAt, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit"
                    })}
                  </dd>
                </div>
                {application.reviewedAt && (
                  <div>
                    <dt className="text-xs text-ink-muted">Last Reviewed</dt>
                    <dd className="mt-0.5 text-ink">
                      {formatDate(application.reviewedAt, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                      })}
                    </dd>
                  </div>
                )}
                {application.submittedIp && (
                  <div>
                    <dt className="text-xs text-ink-muted">Submitted IP</dt>
                    <dd className="mt-0.5 font-mono text-xs text-ink">
                      {application.submittedIp}
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <p className="mt-1 flex items-center gap-2 text-sm text-ink">
        {icon && <span className="text-ink-muted">{icon}</span>}
        <span className="break-words">{value}</span>
      </p>
    </div>
  );
}
