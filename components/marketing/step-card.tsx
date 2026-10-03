import {
  ClipboardList,
  Search,
  BadgeCheck,
  HandHeart
} from "lucide-react";
import type { Step } from "@/lib/dummy-data";

const iconMap = {
  apply: ClipboardList,
  review: Search,
  approve: BadgeCheck,
  receive: HandHeart
} as const;

export function StepCard({ step }: { step: Step }) {
  const Icon = iconMap[step.icon];

  return (
    <div className="group relative rounded-2xl border border-surface-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <div className="flex items-start justify-between">
        <span className="font-display text-3xl font-bold leading-none text-brand-100 transition-colors group-hover:text-brand-200">
          0{step.number}
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:bg-brand-500 group-hover:text-white">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-ink">
        {step.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {step.description}
      </p>
    </div>
  );
}
