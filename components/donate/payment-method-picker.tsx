"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { paymentMethods } from "@/lib/payment-methods";

interface PaymentMethodPickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function PaymentMethodPicker({
  value,
  onChange,
  error
}: PaymentMethodPickerProps) {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {paymentMethods.map((method) => {
          const selected = value === method.key;
          return (
            <button
              key={method.key}
              type="button"
              onClick={() => onChange(method.key)}
              className={cn(
                "group relative flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all",
                selected
                  ? "border-brand-500 bg-brand-50 shadow-card"
                  : "border-surface-border bg-white hover:border-brand-200 hover:bg-brand-50/40"
              )}
            >
              <span className="text-2xl" aria-hidden>
                {method.icon}
              </span>
              <div className="flex-1">
                <p
                  className={cn(
                    "text-sm font-semibold",
                    selected ? "text-brand-700" : "text-ink"
                  )}
                >
                  {method.label}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                  {method.description}
                </p>
              </div>
              {selected && (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}
