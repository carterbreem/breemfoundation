import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { TestimonialEditor } from "@/components/admin/testimonial-editor";

export const metadata: Metadata = {
  title: "Manage Testimonials · Admin",
  robots: { index: false, follow: false }
};

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }]
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Testimonials
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {testimonials.length} testimonial{testimonials.length === 1 ? "" : "s"} in the database
        </p>
      </div>

      <TestimonialEditor
        initialTestimonials={testimonials.map((t) => ({
          id: t.id,
          name: t.name,
          role: t.role,
          location: t.location,
          quote: t.quote,
          avatarUrl: t.avatarUrl,
          rating: t.rating,
          published: t.published,
          sortOrder: t.sortOrder
        }))}
      />
    </div>
  );
}
