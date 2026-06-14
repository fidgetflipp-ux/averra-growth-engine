import { Eyebrow, Reveal } from "./primitives";
import scartec from "@/assets/scartec-hero.png.asset.json";

/**
 * Selected Work — outcome-led list.
 * Visual slot on the left is a sized placeholder ready for real client
 * screenshots (drop a .jpg into src/assets and swap the `cover` reference).
 */
const cases = [
  {
    client: "ScarTec Therapeutics",
    sector: "Biotechnology",
    headline: "A clinical-stage homepage that earns credibility at first scroll.",
    metric: "+340%",
    metricLabel: "Investor page views",
    period: "90 days post-launch",
    cover: scartec.url,
  },
  {
    client: "Quanta",
    sector: "Fintech platform",
    headline: "Repositioned a clinical platform and 3.4×'d demo bookings.",
    metric: "+248%",
    metricLabel: "Demo requests",
    period: "90 days post-launch",
  },
  {
    client: "Northwind Capital",
    sector: "Finance",
    headline: "A site that finally felt like the AUM behind it.",
    metric: "$84M",
    metricLabel: "New inquiries",
    period: "12 months",
  },
  {
    client: "Atelier 9",
    sector: "DTC commerce",
    headline: "Replatformed and cut LCP by 62%, lifting conversion 41%.",
    metric: "+41%",
    metricLabel: "Conversion rate",
    period: "60 days post-launch",
  },
  {
    client: "Verde",
    sector: "Sustainable fashion",
    headline: "A brand-led storefront that grew revenue 87% YoY.",
    metric: "+87%",
    metricLabel: "Revenue YoY",
    period: "Annual",
  },
];

function CaseVisual({ label, cover }: { label: string; cover?: string }) {
  if (cover) {
    return (
      <div className="relative h-full min-h-[320px] overflow-hidden rounded-xl bg-surface">
        <img
          src={cover}
          alt={`${label} — website preview`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    );
  }
  // Editorial placeholder card — swap with real client mockup imagery later.
  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-xl bg-surface">
      <div className="absolute inset-0 bg-dotgrid-light opacity-60" />
      <div className="absolute inset-6 rounded-lg border border-foreground/8 bg-white shadow-card">
        <div className="flex items-center gap-1.5 border-b border-foreground/6 px-3 py-2">
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
          <span className="size-2 rounded-full bg-foreground/15" />
        </div>
        <div className="space-y-3 p-5">
          <div className="h-2 w-16 rounded bg-foreground/10" />
          <div className="h-6 w-3/4 rounded bg-foreground/12" />
          <div className="h-6 w-1/2 rounded bg-foreground/10" />
          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="aspect-[4/3] rounded bg-foreground/8" />
            <div className="aspect-[4/3] rounded bg-foreground/8" />
            <div className="aspect-[4/3] rounded bg-foreground/8" />
          </div>
        </div>
      </div>
      <span className="absolute bottom-4 left-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        {label}
      </span>
    </div>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" className="bg-surface py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><Eyebrow>Selected work</Eyebrow></Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display mx-auto mt-6 max-w-3xl text-center text-[clamp(2rem,5vw,4rem)]">
            Results that speak for <span className="text-serif-italic">themselves.</span>
          </h2>
        </Reveal>

        <div className="mt-20 space-y-6">
          {cases.map((c, i) => (
            <Reveal key={c.client} delay={i * 0.04}>
              <a
                href="#"
                className="group grid items-stretch overflow-hidden rounded-2xl hairline bg-white transition-all duration-500 hover:shadow-lift md:grid-cols-12"
              >
                <div className="p-5 md:col-span-6 md:p-8">
                  <CaseVisual label={`${c.client} — preview`} cover={"cover" in c ? c.cover : undefined} />
                </div>
                <div className="flex flex-col justify-between gap-10 p-8 md:col-span-6 md:p-12">
                  <div>
                    <div className="flex items-center gap-3 text-eyebrow">
                      <span>{c.sector}</span>
                      <span className="h-px w-6 bg-foreground/15" />
                      <span>{c.client}</span>
                    </div>
                    <h3 className="text-display mt-6 text-[clamp(1.5rem,2.6vw,2.25rem)] text-ink">
                      {c.headline}
                    </h3>
                  </div>
                  <div className="flex items-end justify-between gap-6 border-t border-foreground/8 pt-6">
                    <div>
                      <div className="text-display text-4xl text-ink">{c.metric}</div>
                      <div className="mt-1.5 text-sm text-ink-soft">{c.metricLabel}</div>
                      <div className="mt-0.5 text-xs text-ink-muted">{c.period}</div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                      Case study
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
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
