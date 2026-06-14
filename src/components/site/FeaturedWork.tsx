import { Eyebrow, Reveal } from "./primitives";

const cases = [
  {
    client: "Quanta Health",
    sector: "B2B SaaS",
    headline: "Repositioned a clinical platform and 3.4×'d demo bookings.",
    metric: "+248%",
    metricLabel: "Demo requests",
    accent: "from-emerald-200/40 to-teal-100/40",
  },
  {
    client: "Northwind Capital",
    sector: "Finance",
    headline: "A site that finally felt like the AUM behind it.",
    metric: "$84M",
    metricLabel: "New inquiries (12 mo)",
    accent: "from-slate-200/60 to-blue-100/40",
  },
  {
    client: "Atelier 9",
    sector: "DTC commerce",
    headline: "Replatformed to Shopify, cut LCP by 62%.",
    metric: "+41%",
    metricLabel: "Conversion rate",
    accent: "from-amber-100/60 to-rose-100/40",
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="border-y border-foreground/5 bg-surface py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><Eyebrow>Selected work</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display mx-auto mt-5 max-w-3xl text-center text-[clamp(2rem,4.5vw,3.5rem)] headline-fade">
            Case studies from brands we've grown.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-5">
          {cases.map((c, i) => (
            <Reveal key={c.client} delay={i * 0.05}>
              <a
                href="#"
                className="group grid items-stretch overflow-hidden rounded-2xl border border-foreground/8 bg-white transition-all duration-300 hover:shadow-soft md:grid-cols-12"
              >
                <div className="md:col-span-5">
                  <div className={`relative h-full min-h-[260px] bg-gradient-to-br ${c.accent} p-10`}>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-soft">
                      <span className="size-1.5 rounded-full bg-ink" /> {c.sector}
                    </div>
                    <div className="mt-12 text-display text-5xl text-ink">{c.metric}</div>
                    <div className="mt-2 text-sm text-ink-soft">{c.metricLabel}</div>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-10 md:col-span-7">
                  <div>
                    <div className="text-sm font-medium text-ink-soft">{c.client}</div>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink md:text-3xl">
                      {c.headline}
                    </h3>
                  </div>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink">
                    Read the case study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
