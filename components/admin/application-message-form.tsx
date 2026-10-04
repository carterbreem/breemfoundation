"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send, AlertCircle } from "lucide-react";

interface Props {
  applicationId: string;
  applicantName: string;
  applicantEmail: string;
}

export function ApplicationMessageForm({
  applicationId,
  applicantName,
  applicantEmail
}: Props) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/admin/applications/${applicationId}/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body })
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Send failed.");
      setBody("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Send failed.");
    } finally {
      setLoading(false);
    }
  }

  // Build the mailto link for direct emailing the applicant
  const subject = "Breem Foundation — Your Application";
  const mailtoHref = `mailto:${applicantEmail}?subject=${encodeURIComponent(
    subject
  )}`;

  return (
    <div className="space-y-4">
      {/* Email applicant button (mailto) */}
      <a
        href={mailtoHref}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-brand-500 bg-white px-6 text-sm font-semibold text-brand-600 transition-all hover:bg-brand-50"
      >
        <Send className="h-4 w-4" />
        Email {applicantName.split(" ")[0]} directly
      </a>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-surface-border" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-subtle">
          or send a portal message
        </span>
        <div className="h-px flex-1 bg-surface-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          placeholder="Type a message the applicant will see in their portal..."
          className="w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-subtle focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100"
        />

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || body.trim().length < 2}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
