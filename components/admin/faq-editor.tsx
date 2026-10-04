"use client";

import * as React from "react";
import { Plus, Save, Trash2, Loader2, X, Check, HelpCircle } from "lucide-react";

interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  published: boolean;
  sortOrder: number;
}

interface Props {
  initialFaqs: Faq[];
}

interface ApiResponse {
  ok?: boolean;
  faq?: Faq;
  id?: string;
  error?: string;
}

export function FaqEditor({ initialFaqs }: Props) {
  const [faqs, setFaqs] = React.useState<Faq[]>(initialFaqs);
  const [editing, setEditing] = React.useState<Faq | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  function startNew() {
    setEditing({
      id: "",
      question: "",
      answer: "",
      category: "General",
      published: true,
      sortOrder: faqs.length + 1
    });
    setError("");
  }

  function startEdit(faq: Faq) {
    setEditing({ ...faq });
    setError("");
  }

  async function save() {
    if (!editing) return;
    if (!editing.question.trim() || !editing.answer.trim()) {
      setError("Question and answer are required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const isNew = !editing.id;
      const res = await fetch("/api/admin/content/faqs", {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editing.id || undefined,
          question: editing.question,
          answer: editing.answer,
          category: editing.category,
          published: editing.published,
          sortOrder: editing.sortOrder
        })
      });

      const data: ApiResponse = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Save failed.");

      const saved = data.faq;
      if (!saved) throw new Error("No data returned.");

      setFaqs((prev) => {
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
    if (!confirm("Delete this FAQ? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/content/faqs?id=${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Delete failed.");
      }
      setFaqs((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Add button */}
      <button
        type="button"
        onClick={startNew}
        className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow"
      >
        <Plus className="h-4 w-4" />
        Add FAQ
      </button>

      {/* Editor */}
      {editing && (
        <div className="rounded-2xl border-2 border-brand-200 bg-white p-6 shadow-card">
          <div className="flex items-start justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">
              {editing.id ? "Edit FAQ" : "New FAQ"}
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
                Question
              </label>
              <input
                type="text"
                value={editing.question}
                onChange={(e) =>
                  setEditing({ ...editing, question: e.target.value })
                }
                placeholder="e.g., Who is eligible to apply?"
                className="h-11 w-full rounded-xl border border-surface-border bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Answer
              </label>
              <textarea
                value={editing.answer}
                onChange={(e) =>
                  setEditing({ ...editing, answer: e.target.value })
                }
                rows={5}
                placeholder="Provide a clear, friendly answer..."
                className="w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm text-ink focus-visible:outline-none focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Category
                </label>
                <input
                  type="text"
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value })
                  }
                  placeholder="General"
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
        {faqs.length === 0 && (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-surface-border bg-white p-12 text-center">
            <HelpCircle className="h-8 w-8 text-ink-subtle" />
            <p className="mt-3 font-semibold text-ink">No FAQs yet</p>
            <p className="mt-1 text-sm text-ink-muted">
              Add your first FAQ to get started.
            </p>
          </div>
        )}

        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="rounded-2xl border border-surface-border bg-white p-5 shadow-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-700">
                    {faq.category}
                  </span>
                  {!faq.published && (
                    <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="mt-2 font-semibold text-ink">{faq.question}</p>
                <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
                  {faq.answer}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(faq)}
                  className="inline-flex h-8 items-center rounded-lg border border-surface-border bg-white px-3 text-xs font-semibold text-ink transition-colors hover:border-brand-200 hover:text-brand-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(faq.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border bg-white text-ink-muted transition-colors hover:border-red-200 hover:text-red-600"
                  aria-label="Delete FAQ"
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
