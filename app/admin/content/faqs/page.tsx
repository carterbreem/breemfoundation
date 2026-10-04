import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { FaqEditor } from "@/components/admin/faq-editor";

export const metadata: Metadata = {
  title: "Manage FAQs · Admin",
  robots: { index: false, follow: false }
};

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          FAQs
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {faqs.length} question{faqs.length === 1 ? "" : "s"} in the database
        </p>
      </div>

      <FaqEditor
        initialFaqs={faqs.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
          category: f.category,
          published: f.published,
          sortOrder: f.sortOrder
        }))}
      />
    </div>
  );
}
