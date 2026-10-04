import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction
}: Props) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-surface-border bg-white p-10 text-center sm:p-12">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-soft text-ink-subtle">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow"
        >
          {actionLabel}
        </Link>
      )}

      {actionLabel && onAction && !actionHref && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
