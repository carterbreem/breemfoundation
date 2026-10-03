"use client";

import Link from "next/link";
import { Check, AlertCircle } from "lucide-react";
import { FieldError } from "@/components/apply/field-error";
import { cn } from "@/lib/utils";

interface Props {
  agreeTruth: boolean;
  agreePrivacy: boolean;
  errors: {
    agreeTruth?: string;
    agreePrivacy?: string;
  };
  update: (key: "agreeTruth" | "agreePrivacy", value: boolean) => void;
}

export function Step5Consent({ agreeTruth, agreePrivacy, errors, update }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-surface-border bg-surface-soft p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
          <div className="text-sm leading-relaxed text-ink">
            <p className="font-semibold">Almost there — please review:</p>
            <ul className="mt-3 space-y-1.5 text-ink-muted">
              <li>• All information you provided is accurate and truthful.</li>
              <li>• Documents you uploaded are authentic.</li>
              <li>• You&apos;ll receive a reference number after submission.</li>
              <li>• Our team responds within 72 hours on average.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <ConsentCheckbox
          id="agreeTruth"
          checked={agreeTruth}
          onChange={(v) => update("agreeTruth", v)}
          error={errors.agreeTruth}
          label="I confirm that all information and documents I've submitted are true, accurate, and complete."
        />

        <ConsentCheckbox
          id="agreePrivacy"
          checked={agreePrivacy}
          onChange={(v) => update("agreePrivacy", v)}
          error={errors.agreePrivacy}
          label={
            <>
              I have read and agree to the{" "}
              <Link
                href="/privacy"
                target="_blank"
                className="font-semibold text-brand-600 underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms"
                target="_blank"
                className="font-semibold text-brand-600 underline-offset-4 hover:underline"
              >
                Terms of Service
              </Link>
              .
            </>
          }
        />
      </div>
    </div>
  );
}

function ConsentCheckbox({
  id,
  checked,
  onChange,
  error,
  label
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  label: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all",
          checked
            ? "border-brand-300 bg-brand-50/60"
            : "border-surface-border bg-white hover:border-brand-200",
          error && "border-red-300"
        )}
      >
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="peer sr-only"
          />
          <span
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all",
              checked
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-surface-border bg-white"
            )}
          >
            {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
          </span>
        </span>
        <span className="text-sm leading-relaxed text-ink">{label}</span>
      </label>
      <FieldError message={error} />
    </div>
  );
}
