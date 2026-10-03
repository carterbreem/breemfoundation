import { Container } from "@/components/ui/container";
import { FadeUp } from "@/components/shared/motion";
import { stats } from "@/lib/dummy-data";

export function Stats() {
  return (
    <section className="border-y border-surface-border bg-surface-soft">
      <Container size="full" className="py-14 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i} className="text-center sm:text-left">
              <div className="relative">
                <p className="font-display text-4xl font-bold leading-none tracking-tight text-gradient-brand sm:text-5xl">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-gold-500">{stat.suffix}</span>
                  )}
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink">
                  {stat.label}
                </p>
                <p className="mt-1.5 text-sm text-ink-muted">
                  {stat.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
