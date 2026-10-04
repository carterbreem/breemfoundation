"use client";

import * as React from "react";
import {
  Plus,
  Save,
  Trash2,
  Loader2,
  X,
  BookOpen,
  Star
} from "lucide-react";

type AssistanceType =
  | "FINANCIAL"
  | "FOOD"
  | "HOUSING"
  | "MEDICAL"
  | "EDUCATION"
  | "EMERGENCY"
  | "OTHER"
  | null;

interface Story {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  personName: string;
  location: string | null;
  assistanceType: AssistanceType;
  amountAwarded: number | null;
  published: boolean;
  featured: boolean;
  sortOrder: number;
}

interface Props {
  initialStories: Story[];
}

const ASSISTANCE_OPTIONS: { value: AssistanceType; label: string }[] = [
  { value: "FINANCIAL", label: "Financial" },
  { value: "FOOD", label: "Food" },
  { value: "HOUSING", label: "Housing" },
  { value: "MEDICAL", label: "Medical" },
  { value: "EDUCATION", label: "Education" },
  { value: "EMERGENCY", label: "Emergency" },
  { value: "OTHER", label: "Other" },
  { value: null, label: "None" }
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function StoryEditor({ initialStories }: Props) {
  const [stories, setStories] = React.useState<Story[]>(initialStories);
  const [editing, setEditing] = React.useState<Story | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const [autoSlug, setAutoSlug] = React.useState(true);

  function startNew() {
    setEditing({
      id: "",
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      personName: "",
      location: "",
      assistanceType: "FINANCIAL",
      amountAwarded: null,
      published: true,
      featured: false,
      sortOrder: stories.length + 1
    });
    setAutoSlug(true);
    setError("");
  }

  function startEdit(story: Story) {
    setEditing({ ...story });
    setAutoSlug(false);
    setError("");
  }

  function updateField<K extends keyof Story>(key: K, value: Story[K]) {
    if (!editing) return;
    const next = { ...editing, [key]: value };
    // Auto-generate slug from title if user hasn't customized it
    if (key === "title" && autoSlug) {
      next.slug = slugify(String(value));
    }
    setEditing(next);
  }

  async function save() {
    if (!editing) return;
    if (!editing.title.trim() || !editing.personName.trim() || !editing.excerpt.trim() || !editing.content.trim()) {
      setError("Title, person name, excerpt, and content are required.");
      return;
    }
    if (!editing.slug.trim()) {
      setError("Slug is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const isNew = !editing.id;
      const res = await fetch("/api/admin/content/stories", {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editing.id || undefined,
          slug: editing.slug,
          title: editing.title,
          excerpt: editing.excerpt,
          content: editing.content,
          imageUrl: editing.imageUrl,
          personName: editing.personName,
          location: editing.location,
          assistanceType: editing.assistanceType,
          amountAwarded: editing.amountAwarded,
          published: editing.published,
          featured: editing.featured,
          sortOrder: editing.sortOrder
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Save failed.");

      const saved = data.story;
      if (!saved) throw new Error("No data returned.");

      setStories((prev) => {
        if (isNew) return [...prev, saved];
        return prev.map((s) => (s.id === saved.id ? saved : s));
      });
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this story? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/content/stories?id=${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Delete failed.");
      }
      setStories((prev) => prev.filter((s) => s.id !== id));
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
        Add Story
      </button>

      {editing && (
        <div className="rounded-2xl border-2 border-brand-200 bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-start justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">
              {editing.id ? "Edit Story" : "New Story"}
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
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Title
              </label>
              <input
                type="text"
                value={editing.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g., Rent relief after a sudden job loss"
                className="h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                URL Slug
              </label>
              <input
                type="text"
                value={editing.slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  updateField("slug", e.target.value);
                }}
                placeholder="e.g., amara-rent-relief"
                className="h-11 w-full rounded-xl border border-surface-border bg-white px-4 font-mono text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100"
              />
              <p className="mt-1 text-xs text-ink-muted">
                Auto-generated from title. Must be unique.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Person Name
                </label>
                <input
                  type="text"
                  value={editing.personName}
                  onChange={(e) => updateField("personName", e.target.value)}
                  placeholder="e.g., Amara O."
                  className="h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Location
                </label>
                <input
                  type="text"
                  value={editing.location ?? ""}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="e.g., Houston, TX"
                  className="h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Image URL
              </label>
              <input
                type="url"
                value={editing.imageUrl}
                onChange={(e) => updateField("imageUrl", e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Excerpt (short summary)
              </label>
              <textarea
                value={editing.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                rows={3}
                placeholder="One or two sentences shown on story cards..."
                className="w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Full Content
              </label>
              <textarea
                value={editing.content}
                onChange={(e) => updateField("content", e.target.value)}
                rows={6}
                placeholder="The full story text..."
                className="w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Assistance Type
                </label>
                <select
                  value={editing.assistanceType ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    updateField(
                      "assistanceType",
                      v === "" ? null : (v as AssistanceType)
                    );
                  }}
                  className="h-11 w-full rounded-xl border border-surface-border bg-white px-3 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400"
                >
                  {ASSISTANCE_OPTIONS.map((o) => (
                    <option key={o.label} value={o.value ?? ""}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  value={editing.amountAwarded ?? ""}
                  onChange={(e) =>
                    updateField(
                      "amountAwarded",
                      e.target.value === "" ? null : Number(e.target.value)
                    )
                  }
                  placeholder="e.g., 2400"
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
                    updateField("sortOrder", Number(e.target.value) || 0)
                  }
                  className="h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-surface-border bg-white px-4 py-2.5">
                <input
                  type="checkbox"
                  checked={editing.published}
                  onChange={(e) => updateField("published", e.target.checked)}
                  className="h-4 w-4 accent-brand-500"
                />
                <span className="text-sm text-ink">
                  {editing.published ? "Published" : "Hidden"}
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-surface-border bg-white px-4 py-2.5">
                <input
                  type="checkbox"
                  checked={editing.featured}
                  onChange={(e) => updateField("featured", e.target.checked)}
                  className="h-4 w-4 accent-gold-500"
                />
                <span className="text-sm text-ink">
                  {editing.featured ? "Featured on home" : "Not featured"}
                </span>
              </label>
            </div>

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {error}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
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
                    Save Story
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

      <div className="space-y-3">
        {stories.length === 0 && (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-surface-border bg-white p-12 text-center">
            <BookOpen className="h-8 w-8 text-ink-subtle" />
            <p className="mt-3 font-semibold text-ink">No stories yet</p>
            <p className="mt-1 text-sm text-ink-muted">
              Add your first success story to get started.
            </p>
          </div>
        )}

        {stories.map((story) => (
          <div
            key={story.id}
            className="rounded-2xl border border-surface-border bg-white p-5 shadow-card"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 flex-1 gap-4">
                {story.imageUrl && (
                  <div className="hidden h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={story.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {story.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-800">
                        <Star className="h-2.5 w-2.5 fill-current" />
                        Featured
                      </span>
                    )}
                    {!story.published && (
                      <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                        Hidden
                      </span>
                    )}
                    {story.assistanceType && (
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-700">
                        {story.assistanceType}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 break-words font-semibold text-ink">
                    {story.title}
                  </p>
                  <p className="mt-1 line-clamp-2 break-words text-sm text-ink-muted">
                    {story.excerpt}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 gap-2 self-start">
                <button
                  type="button"
                  onClick={() => startEdit(story)}
                  className="inline-flex h-8 items-center rounded-lg border border-surface-border bg-white px-3 text-xs font-semibold text-ink transition-colors hover:border-brand-200 hover:text-brand-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(story.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border bg-white text-ink-muted transition-colors hover:border-red-200 hover:text-red-600"
                  aria-label="Delete story"
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
