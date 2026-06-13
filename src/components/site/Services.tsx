import { Eyebrow, Reveal } from "./primitives";

const services = [
  {
    title: "Conversion-led web design",
    body:
      "Brand systems, IA, and page architecture built around the moments that turn visitors into pipeline.",
    bullets: ["Brand & visual system", "Landing pages", "Marketing site"],
  },
  {
    title: "Engineering & performance",
    body:
      "Next.js, Webflow, and Shopify builds — measured in Lighthouse scores, not just pixel perfection.",
    bullets: ["Next.js / Webflow / Shopify", "CMS architecture", "Core Web Vitals"],
  },
  {
    title: "Growth & CRO",
    body:
      "Ongoing experimentation programs: research, hypotheses, A/B tests, and revenue attribution.",
    bullets: ["Research & analytics", "A/B testing", "Funnel optimization"],
  },
  {
    title: "Retainer partnership",
    body:
      "Fractional design + engineering for teams that need senior craft without hiring in-house.",
    bullets: ["Weekly sprints", "Strategy reviews", "Async Slack channel"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>What we do</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display mx-auto mt-5 max-w-3xl text-center text-[clamp(2rem,4.5vw,3.75rem)] headline-fade">
            A senior team across <span className="text-serif-italic font-normal text-ink">brand, build,</span> and growth.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-xl text-center text-ink-soft">
            One accountable team handles strategy, design, and engineering — so
            every decision compounds toward revenue, not handoffs.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="group relative h-full rounded-2xl border border-foreground/8 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-semibold tracking-tight text-ink">{s.title}</h3>
                  <span className="font-mono text-xs text-ink-soft">0{i + 1}</span>
                </div>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="rounded-full border border-foreground/10 bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
