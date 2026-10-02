import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Heading = "h2"
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden />
          {eyebrow}
        </span>
      )}
      <Heading
        className={cn(
          "font-display font-bold tracking-tight text-ink text-balance",
          Heading === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl lg:text-5xl"
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed text-ink-muted text-pretty",
            isCenter ? "max-w-2xl" : "max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
