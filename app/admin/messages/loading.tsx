export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-surface-muted" />
      <div className="space-y-3">
        <div className="h-32 animate-pulse rounded-2xl bg-surface-muted" />
        <div className="h-32 animate-pulse rounded-2xl bg-surface-muted" />
      </div>
    </div>
  );
}
