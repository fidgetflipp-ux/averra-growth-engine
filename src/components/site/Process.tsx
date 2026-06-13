import { Eyebrow, Reveal } from "./primitives";

const steps = [
  { n: "01", title: "Audit & strategy", body: "We pressure-test your funnel, positioning, and analytics to find the highest-leverage moves before a single pixel moves." },
  { n: "02", title: "Design system", body: "A brand and component system built for speed: tokens, layouts, and motion patterns your team can extend forever." },
  { n: "03", title: "Engineering", body: "Production-grade Next.js, Webflow, or Shopify — fast, accessible, and instrumented for measurement on day one." },
  { n: "04", title: "Launch & optimize", body: "Quiet launch, dashboards, and a CRO roadmap. We stay close for the 90 days that matter most." },
];

export function Process() {
  return (
    <section id="process" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><Eyebrow>The roadmap to results</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display mx-auto mt-5 max-w-3xl text-center text-[clamp(2rem,4.5vw,3.5rem)] headline-fade">
            A focused, four-phase engagement.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-foreground/8 bg-surface p-7 transition-colors hover:bg-white hover:shadow-card">
                <div className="font-mono text-xs text-brand">STEP — {s.n}</div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
