import { Reveal } from "./primitives";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "Strategy sprint: audit, customer research, competitive teardown. We end with a CRO-focused brief everyone signs off on.",
    duration: "Week 1",
  },
  {
    n: "02",
    title: "Design",
    body: "Editorial-grade visual design and prototyping. You see hi-fidelity flows, not wireframes nobody can react to.",
    duration: "Week 2–3",
  },
  {
    n: "03",
    title: "Develop",
    body: "Hand-built, 95+ Lighthouse, fully responsive. Hooked into your CMS, analytics, and CRM from day one.",
    duration: "Week 3–5",
  },
  {
    n: "04",
    title: "Launch",
    body: "Soft launch, QA, performance pass, then go live — and the first round of A/B tests starts the same week.",
    duration: "Week 6",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-28 sm:py-40 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-3xl mb-20">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              The process
            </div>
            <h2 className="text-display text-4xl sm:text-6xl brand-gradient-text">
              Six weeks. One <span className="text-serif-italic" style={{ color: "var(--brand)" }}>obsessive</span> team.
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-12 sm:space-y-16">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="relative pl-16 sm:pl-24">
                  <div
                    className="absolute left-0 top-1 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full hairline bg-background text-display text-sm sm:text-base"
                    style={{ color: "var(--brand)" }}
                  >
                    {s.n}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                    <h3 className="text-display text-2xl sm:text-4xl">{s.title}</h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.duration}</span>
                  </div>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
