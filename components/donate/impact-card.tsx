import { Heart } from "lucide-react";

export function ImpactCard() {
  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-surface-border bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
          <Heart className="h-5 w-5" />
        </span>
        <h3 className="font-display text-lg font-semibold text-ink">
          What your donation supports
        </h3>
      </div>
      <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-muted">
        <li className="flex gap-3">
          <span className="text-brand-500">•</span>
          <span>Emergency rent and utility relief for families at risk of losing their home</span>
        </li>
        <li className="flex gap-3">
          <span className="text-brand-500">•</span>
          <span>Medical and surgical support for individuals facing life-threatening conditions</span>
        </li>
        <li className="flex gap-3">
          <span className="text-brand-500">•</span>
          <span>Food security and grocery assistance for households in crisis</span>
        </li>
        <li className="flex gap-3">
          <span className="text-brand-500">•</span>
          <span>Education grants so students can finish what they started</span>
        </li>
      </ul>
      <p className="mt-6 border-t border-surface-border pt-5 text-xs text-ink-muted">
        <strong className="text-ink">91 cents</strong> of every dollar reaches
        families directly.
      </p>
    </div>
  );
}
