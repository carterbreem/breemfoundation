"use client";

import { cn } from "@/lib/utils";
import { presetAmounts } from "@/lib/validators/donation";

interface AmountPickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function AmountPicker({ value, onChange, error }: AmountPickerProps) {
  const isCustom = value !== "" && !presetAmounts.includes(Number(value));

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {presetAmounts.map((amt) => {
          const selected = value === String(amt);
          return (
            <button
              key={amt}
              type="button"
              onClick={() => onChange(String(amt))}
              className={cn(
                "rounded-xl border-2 py-3 text-center font-display text-base font-bold transition-all",
                selected
                  ? "border-brand-500 bg-brand-500 text-white shadow-glow"
                  : "border-surface-border bg-white text-ink hover:border-brand-300 hover:bg-brand-50/50"
              )}
            >
              ${amt}
            </button>
          );
        })}
      </div>

      {/* Custom amount */}
      <div className="mt-4">
        <label
          htmlFor="customAmount"
          className="mb-2 block text-sm font-medium text-ink"
        >
          Or enter a custom amount
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-ink-muted">
            $
          </span>
          <input
            id="customAmount"
            type="text"
            inputMode="decimal"
            value={isCustom || value === "" ? value : ""}
            onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="Enter any amount"
            className={cn(
              "h-12 w-full rounded-xl border border-surface-border bg-white pl-8 pr-4 text-base font-medium text-ink transition-colors",
              "placeholder:text-ink-subtle",
              "focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100",
              error && "border-red-400"
            )}
            aria-invalid={!!error}
          />
        </div>
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}
