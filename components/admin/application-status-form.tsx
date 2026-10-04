"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Loader2,
  Save
} from "lucide-react";

const STATUS_OPTIONS = [
  { value: "SUBMITTED", label: "Submitted", Icon: Clock, color: "info" },
  {
    value: "UNDER_REVIEW",
    label: "Under Review",
    Icon: Clock,
    color: "warning"
  },
  {
    value: "MORE_INFO_REQUIRED",
    label: "Request Info",
    Icon: AlertCircle,
    color: "gold"
  },
  {
    value: "APPROVED",
    label: "Approve",
    Icon: CheckCircle2,
    color: "success"
  },
  { value: "REJECTED", label: "Reject", Icon: XCircle, color: "danger" }
] as const;

interface Props {
  applicationId: string;
  currentStatus: string;
  currentNotes: string | null;
}

export function ApplicationStatusForm({
  applicationId,
  currentStatus,
  currentNotes
}: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(
        `/api/admin/applications/${applicationId}/status`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: selected, adminNotes: notes })
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Update failed.");
      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Status buttons */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
          Set Status
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {STATUS_OPTIONS.map(({ value, label, Icon }) => {
            const active = selected === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setSelected(value)}
                className={
                  active
                    ? "flex items-center gap-2 rounded-xl border-2 border-brand-500 bg-brand-50 px-3 py-2.5 text-xs font-semibold text-brand-700"
                    : "flex items-center gap-2 rounded-xl border border-surface-border bg-white px-3 py-2.5 text-xs font-medium text-ink-muted transition-colors hover:border-brand-200 hover:text-brand-600"
                }
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="adminNotes"
          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted"
        >
          Admin Notes (internal)
        </label>
        <textarea
          id="adminNotes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Reasoning, context, or notes for other admins..."
          className="w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-subtle focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          <CheckCircle2 className="h-4 w-4" />
          Status updated successfully.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            Save Changes
          </>
        )}
      </button>
    </form>
  );
}
