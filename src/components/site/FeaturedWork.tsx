import { Eyebrow, Reveal } from "./primitives";

const focusAreas = [
  {
    label: "Professional Services & Consulting",
    sector: "Trust-led",
    headline: "For firms whose expertise deserves a site that matches it.",
    points: ["Authority-driven positioning", "Case studies & credibility content", "Lead capture & booking flows"],
    accent: "from-emerald-200/40 to-teal-100/40",
  },
  {
    label: "SaaS & Technology",
    sector: "Conversion-led",
    headline: "Product positioning that turns visitors into demo bookings.",
    points: ["Landing pages built to convert", "Scalable design systems", "Performance & Core Web Vitals"],
    accent: "from-slate-200/60 to-blue-100/40",
  },
  {
    label: "Healthcare, Finance & Real Estate",
    sector: "High-trust",
    headline: "For categories where credibility is the deciding factor.",
    points: ["Trust-first UX & messaging", "Local & market positioning", "Compliance-aware builds"],
    accent: "from-amber-100/60 to-rose-100/40",
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="border-y border-foreground/5 bg-surface py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><Eyebrow>Where we focus</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display mx-auto mt-5 max-w-3xl text-center text-[clamp(2rem,4.5vw,3.5rem)] headline-fade">
            Built for businesses ready to lead their market.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-xl text-center text-ink-soft">
            We work best with established, ambitious companies whose current
            site undersells the quality of their business.
          </p>
        </Reveal>

        <div className="mt-16 space-y-5">
          {focusAreas.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <div className="group grid items-stretch overflow-hidden rounded-2xl border border-foreground/8 bg-white transition-all duration-300 hover:shadow-soft md:grid-cols-12">
                <div className="md:col-span-5">
                  <div className={`relative h-full min-h-[220px] bg-gradient-to-br ${c.accent} p-10`}>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-soft">
                      <span className="size-1.5 rounded-full bg-ink" /> {c.sector}
                    </div>
                    <div className="mt-12 text-display text-2xl leading-snug text-ink md:text-3xl">
                      {c.label}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-10 md:col-span-7">
                  <div>
                    <h3 className="text-2xl font-semibold leading-tight tracking-tight text-ink md:text-3xl">
                      {c.headline}
                    </h3>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {c.points.map((p) => (
                        <li key={p} className="rounded-full border border-foreground/10 bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
