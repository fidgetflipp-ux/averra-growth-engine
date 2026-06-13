import { Brush, Code2, LineChart, Sparkles, ArrowUpRight } from "lucide-react";
import { Reveal, SpotlightCard } from "./primitives";

const services = [
  {
    icon: Brush,
    title: "Web Design",
    body: "Editorial, brand-first design systems built around your story — not a template.",
    tags: ["Art direction", "Design systems", "Prototyping"],
  },
  {
    icon: Code2,
    title: "Web Development",
    body: "Hand-crafted, blazing-fast builds in Next.js, Shopify, and Framer. 95+ Lighthouse, always.",
    tags: ["Next.js", "Shopify", "Headless"],
  },
  {
    icon: LineChart,
    title: "Conversion Optimization",
    body: "Research-led CRO — heatmaps, session replays, A/B tests — to compound revenue post-launch.",
    tags: ["A/B testing", "Funnels", "Analytics"],
  },
  {
    icon: Sparkles,
    title: "Brand Positioning",
    body: "Sharper messaging, stronger narrative, premium visual identity that earns the price tag.",
    tags: ["Messaging", "Identity", "Strategy"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              What we do
            </div>
            <h2 className="text-display text-4xl sm:text-6xl brand-gradient-text">
              Everything your site needs to <span className="text-serif-italic" style={{ color: "var(--brand)" }}>convert</span>.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-xl">
              Four disciplines, one team, one outcome — a website that earns trust on first glance
              and pays for itself within a quarter.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <SpotlightCard className="h-full p-8 sm:p-10">
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl hairline"
                    style={{ background: "color-mix(in oklab, var(--brand) 12%, transparent)" }}
                  >
                    <s.icon className="h-5 w-5" style={{ color: "var(--brand)" }} />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-foreground group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <h3 className="mt-8 text-2xl sm:text-3xl text-display">{s.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed max-w-md">{s.body}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full hairline px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
