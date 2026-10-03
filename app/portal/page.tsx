import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  LogOut,
  ShieldCheck
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/shared/motion";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import {
  applicationStatusLabels,
  applicationStatusBadgeVariant
} from "@/lib/assistance-labels";
import { formatDate } from "@/lib/utils";
import { LogoutButton } from "@/components/portal/logout-button";

export const metadata: Metadata = {
  title: "My Portal",
  description: "View your application status and messages.",
  robots: { index: false, follow: false }
};

export default async function PortalDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const application = await prisma.application.findUnique({
    where: { userId: user.id },
    include: {
      documents: { orderBy: { uploadedAt: "desc" } },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 5
      }
    }
  });

  return (
    <section className="min-h-screen bg-surface-soft py-12 lg:py-16">
      <Container size="md">
        {/* Header */}
        <FadeUp>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                Applicant Portal
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Welcome{user.name ? `, ${user.name.split(" ")[0]}` : ""}
              </h1>
              <p className="mt-2 text-sm text-ink-muted">
                Signed in as {user.email}
              </p>
            </div>
            <LogoutButton />
          </div>
        </FadeUp>

        {/* No application yet */}
        {!application && (
          <FadeUp delay={1}>
            <div className="mt-10 rounded-3xl border border-surface-border bg-white p-8 text-center shadow-card sm:p-12">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <FileText className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-ink sm:text-2xl">
                No application on file
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
                You haven&apos;t submitted an application yet, or your existing
                application isn&apos;t linked to this account. If you already
                applied, you can link it using your reference number.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild variant="primary" size="lg">
                  <Link href="/apply" className="gap-2">
                    Apply for Assistance
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Need help linking?</Link>
                </Button>
              </div>
            </div>
          </FadeUp>
        )}

        {/* Application summary */}
        {application && (
          <div className="mt-10 space-y-6">
            {/* Status card */}
            <FadeUp delay={1}>
              <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      Reference Number
                    </p>
                    <p className="mt-1 font-display text-2xl font-bold text-gradient-brand">
                      {application.referenceNumber}
                    </p>
                    <p className="mt-2 text-xs text-ink-muted">
                      Submitted {formatDate(application.createdAt, { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <Badge
                    variant={applicationStatusBadgeVariant[application.status]}
                    size="lg"
                  >
                    {applicationStatusLabels[application.status]}
                  </Badge>
                </div>

                <div className="mt-6 grid gap-4 border-t border-surface-border pt-6 sm:grid-cols-2">
                  <InfoRow label="Assistance Type" value={application.assistanceType} />
                  <InfoRow
                    label="Amount Requested"
                    value={
                      application.amountRequested
                        ? `$${application.amountRequested}`
                        : "Not specified"
                    }
                  />
                  <InfoRow label="Country" value={application.country} />
                  <InfoRow label="City" value={`${application.city}, ${application.state}`} />
                </div>

                {/* Status-specific message */}
                <StatusMessage status={application.status} />
              </div>
            </FadeUp>

            {/* Documents */}
            <FadeUp delay={2}>
              <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-ink">
                      Your Documents
                    </h2>
                    <p className="text-xs text-ink-muted">
                      {application.documents.length} file{application.documents.length === 1 ? "" : "s"} uploaded
                    </p>
                  </div>
                </div>

                {application.documents.length > 0 ? (
                  <ul className="mt-6 space-y-2">
                    {application.documents.map((doc) => (
                      <li
                        key={doc.id}
                        className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-soft p-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600">
                            <FileText className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-ink">
                              {doc.fileName}
                            </p>
                            <p className="text-xs text-ink-muted">
                              {doc.kind === "APPLICANT_PHOTO" ? "Photo" : "Supporting"} ·{" "}
                              {formatDate(doc.uploadedAt)}
                            </p>
                          </div>
                        </div>
                        <Badge variant="neutral" size="sm">
                          {doc.status}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-6 text-sm text-ink-muted">
                    No documents on file.
                  </p>
                )}

                <p className="mt-6 text-xs text-ink-muted">
                  Need to upload additional documents? We&apos;ll email you a
                  link when we need more information.
                </p>
              </div>
            </FadeUp>

            {/* Messages */}
            <FadeUp delay={3}>
              <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <MessageSquare className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-ink">
                      Messages from Our Team
                    </h2>
                    <p className="text-xs text-ink-muted">
                      {application.messages.length} message{application.messages.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>

                {application.messages.length > 0 ? (
                  <ul className="mt-6 space-y-3">
                    {application.messages.map((msg) => (
                      <li
                        key={msg.id}
                        className="rounded-xl border border-surface-border bg-surface-soft p-4"
                      >
                        <p className="text-sm leading-relaxed text-ink">
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
                ) : (
                  <p className="mt-6 text-sm text-ink-muted">
                    No messages yet. We&apos;ll reach out here if we need
                    anything from you.
                  </p>
                )}
              </div>
            </FadeUp>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-ink-muted">
          <ShieldCheck className="mr-1 inline h-3 w-3" />
          Your data is encrypted and confidential.
        </p>
      </Container>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

function StatusMessage({ status }: { status: string }) {
  const messages: Record<string, { icon: React.ReactNode; title: string; body: string }> = {
    SUBMITTED: {
      icon: <Clock className="h-5 w-5" />,
      title: "Application received",
      body: "Our team has received your application and will begin reviewing it shortly. Expect a response within 72 hours on average."
    },
    UNDER_REVIEW: {
      icon: <Clock className="h-5 w-5" />,
      title: "Under review",
      body: "A member of our team is currently reviewing your application. We may reach out if we need clarification."
    },
    MORE_INFO_REQUIRED: {
      icon: <AlertCircle className="h-5 w-5" />,
      title: "More information needed",
      body: "We need a little more information to complete your review. Please check your messages below — we've sent you specific details."
    },
    APPROVED: {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "Approved",
      body: "Congratulations — your application has been approved. Our team will be in touch with next steps for delivering your assistance."
    },
    REJECTED: {
      icon: <AlertCircle className="h-5 w-5" />,
      title: "Not approved",
      body: "Unfortunately, we're unable to approve your application at this time. Please check your messages for details. You're welcome to apply again if your situation changes."
    }
  };

  const m = messages[status] ?? messages.SUBMITTED;

  return (
    <div className="mt-6 flex items-start gap-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
        {m.icon}
      </span>
      <div>
        <p className="font-semibold text-ink">{m.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{m.body}</p>
      </div>
    </div>
  );
}
