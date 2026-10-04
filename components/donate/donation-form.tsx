"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Repeat,
  Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AmountPicker } from "@/components/donate/amount-picker";
import { PaymentMethodPicker } from "@/components/donate/payment-method-picker";
import { donationSchema } from "@/lib/validators/donation";
import { cn } from "@/lib/utils";

type Frequency = "ONE_TIME" | "MONTHLY";

export function DonationForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const [amount, setAmount] = React.useState("50");
  const [frequency, setFrequency] = React.useState<Frequency>("ONE_TIME");
  const [donorName, setDonorName] = React.useState("");
  const [donorEmail, setDonorEmail] = React.useState("");
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [dedication, setDedication] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError("");
    setErrors({});

    const parsed = donationSchema.safeParse({
      amount,
      frequency,
      donorName,
      donorEmail,
      isAnonymous,
      paymentMethod,
      dedication
    });

    if (!parsed.success) {
      const newErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as string;
        if (!newErrors[path]) newErrors[path] = issue.message;
      }
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error ?? "Donation failed. Please try again.");
      }

      if (data.referenceNumber) {
        router.push(
          `/donate/success?ref=${encodeURIComponent(data.referenceNumber)}`
        );
      } else {
        throw new Error("Server did not return a reference number.");
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setSubmitting(false);
    }
  }

  const displayAmount = amount ? Number(amount).toFixed(0) : "0";
  const frequencyLabel = frequency === "MONTHLY" ? "/month" : "";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ── Amount + Frequency ─────────────────────── */}
      <section className="rounded-3xl border border-surface-border bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Gift className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Choose your gift
            </h2>
            <p className="text-xs text-ink-muted">
              Every dollar goes directly to families in need
            </p>
          </div>
        </div>

        {/* Frequency toggle */}
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-surface-soft p-1">
          {(["ONE_TIME", "MONTHLY"] as const).map((f) => {
            const active = frequency === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFrequency(f)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all",
                  active
                    ? "bg-white text-brand-600 shadow-sm"
                    : "text-ink-muted hover:text-ink"
                )}
              >
                {f === "ONE_TIME" ? (
                  <>
                    <Heart className="h-3.5 w-3.5" />
                    One-time
                  </>
                ) : (
                  <>
                    <Repeat className="h-3.5 w-3.5" />
                    Monthly
                  </>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <Label>Donation Amount (USD)</Label>
          <div className="mt-3">
            <AmountPicker
              value={amount}
              onChange={setAmount}
              error={errors.amount}
            />
          </div>
        </div>
      </section>

      {/* ── Payment Method ─────────────────────────── */}
      <section className="rounded-3xl border border-surface-border bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Payment method
            </h2>
            <p className="text-xs text-ink-muted">
              We&apos;ll email you the exact payment details after you submit
            </p>
          </div>
        </div>

        <div className="mt-6">
          <PaymentMethodPicker
            value={paymentMethod}
            onChange={setPaymentMethod}
            error={errors.paymentMethod}
          />
        </div>
      </section>

      {/* ── Donor info ─────────────────────────────── */}
      <section className="rounded-3xl border border-surface-border bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Heart className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Your details
            </h2>
            <p className="text-xs text-ink-muted">
              So we can send you a receipt and payment details
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="donorName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="donorName"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              aria-invalid={!!errors.donorName}
            />
            {errors.donorName && (
              <p className="text-xs font-medium text-red-600">
                {errors.donorName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="donorEmail">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="donorEmail"
              type="email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!errors.donorEmail}
            />
            {errors.donorEmail && (
              <p className="text-xs font-medium text-red-600">
                {errors.donorEmail}
              </p>
            )}
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-surface-border bg-surface-soft p-4 transition-colors hover:border-brand-200">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-brand-500"
            />
            <div>
              <p className="text-sm font-medium text-ink">
                Donate anonymously
              </p>
              <p className="mt-0.5 text-xs text-ink-muted">
                Your name won&apos;t be shown publicly. We&apos;ll still send
                you a receipt.
              </p>
            </div>
          </label>

          <div className="space-y-2">
            <Label htmlFor="dedication">
              Dedication Message{" "}
              <span className="text-ink-subtle">(optional)</span>
            </Label>
            <Textarea
              id="dedication"
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              placeholder="In honor of... / In memory of... / A message you'd like to share"
              rows={3}
            />
            {errors.dedication && (
              <p className="text-xs font-medium text-red-600">
                {errors.dedication}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Summary + Submit ───────────────────────── */}
      <section className="rounded-3xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 shadow-card sm:p-8">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-medium text-ink-muted">
            {frequency === "MONTHLY" ? "Monthly gift" : "One-time gift"}
          </p>
          <p className="font-display text-3xl font-bold text-gradient-brand">
            ${displayAmount}
            <span className="ml-0.5 text-base font-medium text-ink-muted">
              {frequencyLabel}
            </span>
          </p>
        </div>

        {submitError && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{submitError}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="gold"
          size="xl"
          className="mt-6 w-full gap-2"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Heart className="h-5 w-5" />
              Continue with my donation
            </>
          )}
        </Button>

        <p className="mt-4 text-center text-xs leading-relaxed text-ink-muted">
          After you submit, we&apos;ll email you the exact payment details
          for your chosen method. Your donation is confirmed once we verify
          receipt.
        </p>
      </section>
    </form>
  );
}
