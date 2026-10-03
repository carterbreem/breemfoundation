"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/apply/field-error";
import { assistanceTypeValues } from "@/lib/validators/application";
import {
  assistanceTypeLabels,
  assistanceTypeDescriptions
} from "@/lib/assistance-labels";
import { cn } from "@/lib/utils";
import type { Step3Data } from "@/lib/validators/application";

interface Props {
  data: Partial<Step3Data>;
  errors: Partial<Record<keyof Step3Data, string>>;
  update: <K extends keyof Step3Data>(key: K, value: Step3Data[K]) => void;
}

export function Step3Assistance({ data, errors, update }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>
          Type of Assistance Needed <span className="text-red-500">*</span>
        </Label>
        <div className="grid gap-3 sm:grid-cols-2">
          {assistanceTypeValues.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => update("assistanceType", t)}
              className={cn(
                "flex flex-col rounded-xl border p-4 text-left transition-all",
                data.assistanceType === t
                  ? "border-brand-500 bg-brand-50 shadow-card"
                  : "border-surface-border bg-white hover:border-brand-200 hover:bg-brand-50/40"
              )}
            >
              <span
                className={cn(
                  "text-sm font-semibold",
                  data.assistanceType === t ? "text-brand-700" : "text-ink"
                )}
              >
                {assistanceTypeLabels[t]}
              </span>
              <span className="mt-1 text-xs leading-relaxed text-ink-muted">
                {assistanceTypeDescriptions[t]}
              </span>
            </button>
          ))}
        </div>
        <FieldError message={errors.assistanceType} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amountRequested">Amount Requested (USD) — Optional</Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-ink-muted">
            $
          </span>
          <Input
            id="amountRequested"
            name="amountRequested"
            inputMode="decimal"
            value={data.amountRequested ?? ""}
            onChange={(e) => update("amountRequested", e.target.value)}
            placeholder="500.00"
            className="pl-8"
            aria-invalid={!!errors.amountRequested}
          />
        </div>
        <p className="text-xs text-ink-muted">
          Leave blank if you&apos;re not sure. We&apos;ll work with you.
        </p>
        <FieldError message={errors.amountRequested} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="needExplanation">
          Detailed Explanation of Need <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="needExplanation"
          name="needExplanation"
          value={data.needExplanation ?? ""}
          onChange={(e) => update("needExplanation", e.target.value)}
          placeholder="Tell us about your situation — what happened, what's urgent, what you've already tried..."
          rows={7}
          aria-invalid={!!errors.needExplanation}
        />
        <p className="text-xs text-ink-muted">
          Minimum 30 characters. The more detail, the faster we can help.
        </p>
        <FieldError message={errors.needExplanation} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="howItWillHelp">
          How Will This Assistance Help? <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="howItWillHelp"
          name="howItWillHelp"
          value={data.howItWillHelp ?? ""}
          onChange={(e) => update("howItWillHelp", e.target.value)}
          placeholder="Describe the difference this would make for you or your family..."
          rows={5}
          aria-invalid={!!errors.howItWillHelp}
        />
        <p className="text-xs text-ink-muted">Minimum 20 characters.</p>
        <FieldError message={errors.howItWillHelp} />
      </div>

      <div className="space-y-3">
        <Label>Have you received assistance from Breem Foundation before?</Label>
        <div className="flex gap-2">
          {[
            { label: "No", value: false },
            { label: "Yes", value: true }
          ].map(({ label, value }) => (
            <button
              key={label}
              type="button"
              onClick={() => update("receivedBefore", value)}
              className={cn(
                "flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all",
                data.receivedBefore === value
                  ? "border-brand-500 bg-brand-50 text-brand-700 shadow-card"
                  : "border-surface-border bg-white text-ink-muted hover:border-brand-200"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {data.receivedBefore === true && (
          <div className="space-y-2 pt-2">
            <Label htmlFor="receivedBeforeNote">
              Please tell us when and for what
            </Label>
            <Textarea
              id="receivedBeforeNote"
              name="receivedBeforeNote"
              value={data.receivedBeforeNote ?? ""}
              onChange={(e) => update("receivedBeforeNote", e.target.value)}
              placeholder="e.g., December 2024 — assistance with rent"
              rows={3}
            />
            <FieldError message={errors.receivedBeforeNote} />
          </div>
        )}
      </div>
    </div>
  );
}
