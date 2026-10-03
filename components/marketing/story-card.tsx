import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Story } from "@/lib/dummy-data";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-surface-muted">
        <Image
          src={story.imageUrl}
          alt={story.personName}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/0 to-transparent"
          aria-hidden
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Badge variant="gold" size="md">
            <Sparkles className="h-3 w-3" />
            {story.category}
          </Badge>
          {story.amountAwarded && (
            <Badge variant="default" size="md">
              {story.amountAwarded}
            </Badge>
          )}
        </div>
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <p className="font-display text-lg font-semibold leading-tight">
            {story.personName}
          </p>
          <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-white/85">
            <MapPin className="h-3 w-3" />
            {story.location}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-brand-600">
          {story.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {story.excerpt}
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          Read full story
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}
