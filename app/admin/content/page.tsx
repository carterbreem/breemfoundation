import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, Star, HelpCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Content · Admin",
  robots: { index: false, follow: false }
};

export default async function AdminContentPage() {
  const [storyCount, testimonialCount, faqCount] = await Promise.all([
    prisma.successStory.count(),
    prisma.testimonial.count(),
    prisma.faq.count()
  ]);

  const sections = [
    {
      href: "/admin/content/stories",
      title: "Success Stories",
      description: "Showcase real families helped by Breem Foundation",
      icon: BookOpen,
      count: storyCount,
      color: "brand"
    },
    {
      href: "/admin/content/testimonials",
      title: "Testimonials",
      description: "Quotes from donors, applicants, and community partners",
      icon: Star,
      count: testimonialCount,
      color: "gold"
    },
    {
      href: "/admin/content/faqs",
      title: "FAQs",
      description: "Answer common questions from applicants and donors",
      icon: HelpCircle,
      count: faqCount,
      color: "brand"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Content
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Manage what appears on the public website
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ href, title, description, icon: Icon, count }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-surface-border bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl font-bold text-ink">
                {count}
              </span>
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold text-ink">
              {title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              {description}
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600">
              Manage
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
