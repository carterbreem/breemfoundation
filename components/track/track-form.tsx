"use client";

import { useState } from "react";
import {
  Loader2,
  Search,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  MapPin,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import {
  applicationStatusLabels,
  applicationStatusBadgeVariant
} from "@/lib/assistance-labels";

interface TrackedApp {
  referenceNumber: string;
  fullName: string;
  status: string;
  assistanceType: string;
  submittedAt: string;
  updatedAt: string;
  city: string;
  state: string;
  country: string;
  amountRequested: string | null;
  documentsCount: number;
  messages: { id: string; body: string; createdAt: string }[];
}

const STATUS_MESSAGES: Record<
  string,
  { icon: React.ReactNode; title: string; body: string }
> = {
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

export function TrackForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [app, setApp] = useState<TrackedApp | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setApp(null);

    const fd = new FormData(e.currentTarget);
    const fullName = String(fd.get("fullName") ?? "");
    const referenceNumber = String(fd.get("referenceNumber") ?? "");

    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, referenceNumber })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Couldn't find application.");
      setApp(data.application);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white shadow-glow">
            <Search className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              Find your application
            </h2>
            <p className="text-xs text-ink-muted">
              Both fields must match our records exactly
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              required
              placeholder="As it appears on your application"
              autoComplete="name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referenceNumber">
              Reference Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="referenceNumber"
              name="referenceNumber"
              required
              placeholder="BF-2026-XXXXXX"
              className="font-mono uppercase"
              autoCapitalize="characters"
            />
            <p className="text-xs text-ink-muted">
              Format: BF-YYYY-XXXXXX (found on your confirmation page)
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Track My Application
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Result */}
      {app && (
        <div className="mt-8 space-y-6">
          {/* Status card */}
          <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Reference Number
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-gradient-brand">
                  {app.referenceNumber}
                </p>
                <p className="mt-2 text-xs text-ink-muted">
                  Submitted{" "}
                  {formatDate(app.submittedAt, {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </p>
              </div>
              <Badge
                variant={
                  (applicationStatusBadgeVariant[app.status] as
                    | "default"
                    | "info"
                    | "warning"
                    | "success"
                    | "danger"
                    | "neutral"
                    | "gold") ?? "info"
                }
                size="lg"
              >
                {applicationStatusLabels[app.status] ?? app.status}
              </Badge>
            </div>

            <div className="mt-6 grid gap-4 border-t border-surface-border pt-6 sm:grid-cols-2">
              <InfoRow label="Assistance Type" value={app.assistanceType} />
              <InfoRow
                label="Amount Requested"
                value={app.amountRequested ? `$${app.amountRequested}` : "Not specified"}
              />
              <InfoRow
                label="Location"
                value={`${app.city}, ${app.state}, ${app.country}`}
              />
              <InfoRow
                label="Documents"
                value={`${app.documentsCount} file${app.documentsCount === 1 ? "" : "s"}`}
              />
            </div>

            {/* Status-specific message */}
            {STATUS_MESSAGES[app.status] && (
              <div className="mt-6 flex items-start gap-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
                  {STATUS_MESSAGES[app.status].icon}
                </span>
                <div>
                  <p className="font-semibold text-ink">
                    {STATUS_MESSAGES[app.status].title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {STATUS_MESSAGES[app.status].body}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          {app.messages.length > 0 && (
            <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    Messages from Our Team
                  </h3>
                  <p className="text-xs text-ink-muted">
                    {app.messages.length} message
                    {app.messages.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {app.messages.map((msg) => (
                  <li
                    key={msg.id}
                    className="rounded-xl border border-surface-border bg-surface-soft p-4"
                  >
                    <p className="text-sm leading-relaxed text-ink">{msg.body}</p>
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
            </div>
          )}
        </div>
      )}

      <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
        <ShieldCheck className="h-3 w-3" />
        Your data is encrypted and confidential.
      </p>
    </div>
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
