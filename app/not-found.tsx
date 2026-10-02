import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <Container size="md" className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="font-display text-7xl font-bold text-gradient-brand sm:text-9xl">
        404
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
        The page may have been moved, deleted, or never existed. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" variant="primary">
          <Link href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/contact" className="gap-2">
            <Search className="h-4 w-4" />
            Contact Support
          </Link>
        </Button>
      </div>
    </Container>
  );
}
