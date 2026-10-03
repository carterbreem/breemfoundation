"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/apply/field-error";
import { countries, usStates } from "@/lib/countries";
import {
  maritalStatusValues,
  employmentStatusValues
} from "@/lib/validators/application";
import { cn } from "@/lib/utils";
import type { Step2Data } from "@/lib/validators/application";

interface Props {
  data: Partial<Step2Data>;
  errors: Partial<Record<keyof Step2Data, string>>;
  update: <K extends keyof Step2Data>(key: K, value: Step2Data[K]) => void;
}

export function Step2Location({ data, errors, update }: Props) {
  const isUS = data.country === "United States";
  const stateOptions = isUS ? usStates : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="country">
            Country <span className="text-red-500">*</span>
          </Label>
          <select
            id="country"
            name="country"
            value={data.country ?? ""}
            onChange={(e) => update("country", e.target.value)}
            aria-invalid={!!errors.country}
            className={cn(
              "h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink transition-colors",
              "focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100",
              errors.country && "border-red-400"
            )}
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <FieldError message={errors.country} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">
            State / Province <span className="text-red-500">*</span>
          </Label>
          {stateOptions ? (
            <select
              id="state"
              name="state"
              value={data.state ?? ""}
              onChange={(e) => update("state", e.target.value)}
              aria-invalid={!!errors.state}
              className={cn(
                "h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink transition-colors",
                "focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100",
                errors.state && "border-red-400"
              )}
            >
              <option value="">Select state</option>
              {stateOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          ) : (
            <Input
              id="state"
              name="state"
              value={data.state ?? ""}
              onChange={(e) => update("state", e.target.value)}
              placeholder="e.g., Lagos, Ontario, Bavaria"
              aria-invalid={!!errors.state}
            />
          )}
          <FieldError message={errors.state} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">
          City <span className="text-red-500">*</span>
        </Label>
        <Input
          id="city"
          name="city"
          value={data.city ?? ""}
          onChange={(e) => update("city", e.target.value)}
          placeholder="City"
          aria-invalid={!!errors.city}
        />
        <FieldError message={errors.city} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="homeAddress">
          Home Address <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="homeAddress"
          name="homeAddress"
          value={data.homeAddress ?? ""}
          onChange={(e) => update("homeAddress", e.target.value)}
          placeholder="Street address, apartment, postal code"
          rows={3}
          aria-invalid={!!errors.homeAddress}
        />
        <FieldError message={errors.homeAddress} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="maritalStatus">
            Marital Status <span className="text-red-500">*</span>
          </Label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={data.maritalStatus ?? ""}
            onChange={(e) => update("maritalStatus", e.target.value)}
            aria-invalid={!!errors.maritalStatus}
            className={cn(
              "h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink transition-colors",
              "focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100",
              errors.maritalStatus && "border-red-400"
            )}
          >
            <option value="">Select status</option>
            {maritalStatusValues.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <FieldError message={errors.maritalStatus} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employmentStatus">
            Employment Status <span className="text-red-500">*</span>
          </Label>
          <select
            id="employmentStatus"
            name="employmentStatus"
            value={data.employmentStatus ?? ""}
            onChange={(e) => update("employmentStatus", e.target.value)}
            aria-invalid={!!errors.employmentStatus}
            className={cn(
              "h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink transition-colors",
              "focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100",
              errors.employmentStatus && "border-red-400"
            )}
          >
            <option value="">Select status</option>
            {employmentStatusValues.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <FieldError message={errors.employmentStatus} />
        </div>
      </div>
    </div>
  );
}
