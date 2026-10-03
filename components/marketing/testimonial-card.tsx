import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/dummy-data";

export function TestimonialCard({
  testimonial
}: {
  testimonial: Testimonial;
}) {
  return (
    <figure className="relative flex h-full flex-col rounded-2xl border border-surface-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Quote
        className="absolute right-5 top-5 h-8 w-8 text-brand-100"
        aria-hidden
      />

      <div className="flex items-center gap-1 text-gold-500">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-surface-border pt-5">
        <span className="relative h-11 w-11 overflow-hidden rounded-full border border-surface-border">
          <Image
            src={testimonial.avatarUrl}
            alt={testimonial.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
          <p className="text-xs text-ink-muted">
            {testimonial.role} · {testimonial.location}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
