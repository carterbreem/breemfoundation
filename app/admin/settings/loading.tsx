export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-40 animate-pulse rounded bg-surface-muted" />
      <div className="h-48 animate-pulse rounded-2xl bg-surface-muted" />
      <div className="h-72 animate-pulse rounded-2xl bg-surface-muted" />
    </div>
  );
}
