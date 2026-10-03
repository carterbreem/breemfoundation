"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/apply/field-error";
import { genderValues } from "@/lib/validators/application";
import { genderLabels } from "@/lib/assistance-labels";
import { cn } from "@/lib/utils";
import type { Step1Data } from "@/lib/validators/application";

interface Props {
  data: Partial<Step1Data>;
  errors: Partial<Record<keyof Step1Data, string>>;
  update: <K extends keyof Step1Data>(key: K, value: Step1Data[K]) => void;
}

export function Step1Personal({ data, errors, update }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">
          Full Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="fullName"
          name="fullName"
          value={data.fullName ?? ""}
          onChange={(e) => update("fullName", e.target.value)}
          placeholder="As it appears on your ID"
          autoComplete="name"
          aria-invalid={!!errors.fullName}
        />
        <FieldError message={errors.fullName} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">
            Date of Birth <span className="text-red-500">*</span>
          </Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={data.dateOfBirth ?? ""}
            onChange={(e) => update("dateOfBirth", e.target.value)}
            aria-invalid={!!errors.dateOfBirth}
          />
          <FieldError message={errors.dateOfBirth} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={data.phone ?? ""}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+1 555 123 4567"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
          />
          <FieldError message={errors.phone} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={data.email ?? ""}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
        />
        <FieldError message={errors.email} />
      </div>

      <div className="space-y-3">
        <Label htmlFor="gender">
          Gender <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {genderValues.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => update("gender", g)}
              className={cn(
                "rounded-xl border px-3 py-3 text-xs font-medium transition-all sm:text-sm",
                data.gender === g
                  ? "border-brand-500 bg-brand-50 text-brand-700 shadow-card"
                  : "border-surface-border bg-white text-ink-muted hover:border-brand-200 hover:text-brand-600"
              )}
            >
              {genderLabels[g]}
            </button>
          ))}
        </div>
        <FieldError message={errors.gender} />
      </div>
    </div>
  );
}
