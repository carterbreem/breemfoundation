"use client";

import * as React from "react";
import { Plus, Save, Trash2, Loader2, X, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  location: string | null;
  quote: string;
  avatarUrl: string | null;
  rating: number;
  published: boolean;
  sortOrder: number;
}

interface Props {
  initialTestimonials: Testimonial[];
}

export function TestimonialEditor({ initialTestimonials }: Props) {
  const [items, setItems] = React.useState<Testimonial[]>(initialTestimonials);
  const [editing, setEditing] = React.useState<Testimonial | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  function startNew() {
    setEditing({
      id: "",
      name: "",
      role: "",
      location: "",
      quote: "",
      avatarUrl: "",
      rating: 5,
      published: true,
      sortOrder: items.length + 1
    });
    setError("");
  }

  function startEdit(t: Testimonial) {
    setEditing({ ...t });
    setError("");
  }

  async function save() {
    if (!editing) return;
    if (!editing.name.trim() || !editing.quote.trim()) {
      setError("Name and quote are required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const isNew = !editing.id;
      const res = await fetch("/api/admin/content/testimonials", {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editing.id || undefined,
          name: editing.name,
          role: editing.role,
          location: editing.location,
          quote: editing.quote,
          avatarUrl: editing.avatarUrl,
          rating: editing.rating,
          published: editing.published,
          sortOrder: editing.sortOrder
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Save failed.");

      const saved = data.testimonial;
      if (!saved) throw new Error("No data returned.");

      setItems((prev) => {
        if (isNew) return [...prev, saved];
        return prev.map((f) => (f.id === saved.id ? saved : f));
      });
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/admin/content/testimonials?id=${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Delete failed.");
      setItems((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed.");
    }
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={startNew}
        className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow"
      >
        <Plus className="h-4 w-4" />
        Add Testimonial
      </button>

      {editing && (
        <div className="rounded-2xl border-2 border-brand-200 bg-white p-6 shadow-card">
          <div className="flex items-start justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">
              {editing.id ? "Edit Testimonial" : "New Testimonial"}
            </h2>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Name
                </label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  className="h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Role
                </label>
                <input
                  type="text"
                  value={editing.role ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, role: e.target.value })
                  }
                  placeholder="e.g., Mother of three"
                  className="h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Location
                </label>
                <input
                  type="text"
                  value={editing.location ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, location: e.target.value })
                  }
                  placeholder="City, State"
                  className="h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={editing.avatarUrl ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, avatarUrl: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Quote
              </label>
              <textarea
                value={editing.quote}
                onChange={(e) =>
                  setEditing({ ...editing, quote: e.target.value })
                }
                rows={4}
                className="w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={editing.rating}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      rating: Math.min(5, Math.max(1, Number(e.target.value) || 5))
                    })
                  }
                  className="h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={editing.sortOrder}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      sortOrder: Number(e.target.value) || 0
                    })
                  }
                  className="h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Published
                </label>
                <label className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-surface-border bg-white px-4">
                  <input
                    type="checkbox"
                    checked={editing.published}
                    onChange={(e) =>
                      setEditing({ ...editing, published: e.target.checked })
                    }
                    className="h-4 w-4 accent-brand-500"
                  />
                  <span className="text-sm text-ink">
                    {editing.published ? "Visible" : "Hidden"}
                  </span>
                </label>
              </div>
            </div>

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="inline-flex h-11 items-center rounded-full border border-surface-border bg-white px-6 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {items.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-surface-border bg-white p-5 shadow-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-gold-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                  {!t.published && (
                    <span className="ml-2 rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {t.name}
                  {t.role && (
                    <span className="font-normal text-ink-muted">
                      {" "}
                      · {t.role}
                    </span>
                  )}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-ink-muted">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(t)}
                  className="inline-flex h-8 items-center rounded-lg border border-surface-border bg-white px-3 text-xs font-semibold text-ink transition-colors hover:border-brand-200 hover:text-brand-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(t.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border bg-white text-ink-muted transition-colors hover:border-red-200 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
