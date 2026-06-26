import { Eyebrow, Reveal } from "./primitives";

const steps = [
  {
    n: "01",
    title: "Book",
    body: "Choose a package, reserve a slot, and pay your deposit. Instant confirmation, no sales call.",
    duration: "Day 0",
  },
  {
    n: "02",
    title: "Design",
    body: "Discovery + art direction in 72 hours. Two design directions, one revision round.",
    duration: "Day 1–4",
  },
  {
    n: "03",
    title: "Build",
    body: "Senior engineers ship pixel-perfect, accessible, lightning-fast pages on production infra.",
    duration: "Day 4–11",
  },
  {
    n: "04",
    title: "Launch",
    body: "Final QA, SEO handoff, analytics, and a 30-day care window included.",
    duration: "Day 11–14",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><Eyebrow>The Process</Eyebrow></Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display mx-auto mt-6 max-w-3xl text-center text-[clamp(2rem,5vw,4rem)]">
            Simple. Transparent. <span className="text-serif-italic">Effective.</span>
          </h2>
        </Reveal>

        <div className="relative mt-24 grid gap-px overflow-hidden rounded-2xl bg-foreground/8 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="group relative h-full bg-white p-8 transition-colors duration-500 hover:bg-surface">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.22em] text-ink-muted">{s.n}</span>
                  <span className="font-mono text-[11px] tracking-[0.18em] text-brand-ink">{s.duration}</span>
                </div>
                <h3 className="text-display mt-10 text-3xl text-ink">{s.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
                <div className="mt-10 h-px w-8 bg-foreground/30 transition-all duration-500 group-hover:w-16 group-hover:bg-brand" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
