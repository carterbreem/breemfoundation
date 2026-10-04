"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  donationId: string;
  donorEmail: string;
  donorName: string;
  currentStatus: string;
}

export function EmailDonorButton({
  donationId,
  donorEmail,
  donorName,
  currentStatus
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleClick() {
    setLoading(true);
    setError("");
    setDone(false);

    try {
      const res = await fetch(
        `/api/admin/donations/${donationId}/send-details`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({})
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Failed.");

      // Open the pre-filled email in the admin's email client
      if (data.mailto) {
        window.location.href = data.mailto;
      }

      setDone(true);
      router.refresh();
      setTimeout(() => setDone(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed.");
    } finally {
      setLoading(false);
    }
  }

  const alreadySent = currentStatus === "PAYMENT_DETAILS_SENT" || currentStatus === "COMPLETED";

  return (
    <div className="shrink-0">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Preparing...
          </>
        ) : (
          <>
            <Mail className="h-4 w-4" />
            {alreadySent ? "Re-send Details" : "Email Donor"}
          </>
        )}
      </button>

      <p className="mt-2 text-center text-xs text-ink-muted">
        {alreadySent
          ? `Already sent · To: ${donorEmail}`
          : `Pre-filled email to ${donorName} · ${donorEmail}`}
      </p>

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {done && (
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          <p>Email opened. Status updated to Details Sent.</p>
        </div>
      )}
    </div>
  );
}
