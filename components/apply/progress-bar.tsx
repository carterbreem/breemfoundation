"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  steps: string[];
  currentStep: number; // 1-indexed
}

export function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Mobile: just current step */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-brand-600">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-ink-muted">{steps[currentStep - 1]}</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-500"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: full step list */}
      <ol className="hidden items-center gap-2 sm:flex">
        {steps.map((label, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
                    isDone &&
                      "bg-brand-500 text-white shadow-glow",
                    isCurrent &&
                      "bg-white text-brand-600 ring-2 ring-brand-500 ring-offset-2",
                    !isDone &&
                      !isCurrent &&
                      "bg-surface-muted text-ink-subtle"
                  )}
                >
                  {isDone ? <Check className="h-4 w-4" /> : stepNum}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-semibold uppercase tracking-[0.14em] lg:inline",
                    isCurrent
                      ? "text-brand-600"
                      : isDone
                        ? "text-ink"
                        : "text-ink-subtle"
                  )}
                >
                  {label}
                </span>
              </div>

              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 rounded-full transition-colors duration-300",
                    isDone ? "bg-brand-400" : "bg-surface-muted"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
