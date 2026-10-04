import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Mail, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatRelative } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Messages · Admin",
  robots: { index: false, follow: false }
};

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });

  const unreadCount = messages.filter((m) => m.status === "NEW").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Messages
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Contact form submissions from the public
          </p>
        </div>
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
          <MessageSquare className="h-3.5 w-3.5" />
          {messages.length} total · {unreadCount} new
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-surface-border bg-white p-12 text-center">
          <MessageSquare className="h-8 w-8 text-ink-subtle" />
          <p className="mt-3 font-semibold text-ink">No messages yet</p>
          <p className="mt-1 max-w-sm text-sm text-ink-muted">
            Messages submitted through the contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-2xl border border-surface-border bg-white p-5 shadow-card"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-ink">
                      {msg.name}
                    </p>
                    <span className="text-xs text-ink-muted">
                      · {msg.email}
                    </span>
                    {msg.status === "NEW" && (
                      <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        New
                      </span>
                    )}
                  </div>
                  {msg.subject && (
                    <p className="mt-2 text-sm font-medium text-ink">
                      {msg.subject}
                    </p>
                  )}
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-muted">
                    {msg.message}
                  </p>
                  <p className="mt-3 text-xs text-ink-subtle">
                    {formatRelative(msg.createdAt)}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                  <a
                    href={`mailto:${msg.email}?subject=${encodeURIComponent(
                      msg.subject ? `Re: ${msg.subject}` : "Re: Your message to Breem Foundation"
                    )}`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-brand-500 px-4 text-xs font-semibold text-white transition-colors hover:bg-brand-600"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Reply
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
