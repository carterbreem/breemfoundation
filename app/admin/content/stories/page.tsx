import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { StoryEditor } from "@/components/admin/story-editor";

export const metadata: Metadata = {
  title: "Manage Success Stories · Admin",
  robots: { index: false, follow: false }
};

export default async function AdminStoriesPage() {
  const stories = await prisma.successStory.findMany({
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }]
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Success Stories
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {stories.length} stor{stories.length === 1 ? "y" : "ies"} in the database
        </p>
      </div>

      <StoryEditor
        initialStories={stories.map((s) => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          excerpt: s.excerpt,
          content: s.content,
          imageUrl: s.imageUrl,
          personName: s.personName,
          location: s.location,
          assistanceType: s.assistanceType,
          amountAwarded: s.amountAwarded ? Number(s.amountAwarded) : null,
          published: s.published,
          featured: s.featured,
          sortOrder: s.sortOrder
        }))}
      />
    </div>
  );
}
