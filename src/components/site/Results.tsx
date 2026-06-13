import { TrendingUp, Zap, Target } from "lucide-react";
import { CountUp, Reveal } from "./primitives";

const outcomes = [
  { icon: TrendingUp, value: 3.4, suffix: "×", label: "Average conversion uplift", desc: "Across the last 40 launches, measured 90 days post go-live." },
  { icon: Zap, value: 0.8, suffix: "s", label: "Median LCP shipped", desc: "Every site we ship is engineered for Core Web Vitals from day one." },
  { icon: Target, value: 96, suffix: "%", label: "Client retention", desc: "Most clients renew for ongoing CRO retainers after launch." },
];

export function Results() {
  return (
    <section className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl hairline p-8 sm:p-16"
            style={{
              background:
                "radial-gradient(ellipse at top right, color-mix(in oklab, var(--brand) 20%, transparent), transparent 55%), var(--surface)",
            }}
          >
            <div
              className="absolute -right-20 -top-20 h-80 w-80 rounded-full blur-3xl opacity-50"
              style={{ background: "var(--gradient-brand)" }}
            />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Numbers that compound
              </div>
              <h2 className="text-display text-4xl sm:text-6xl brand-gradient-text max-w-3xl">
                Growth isn't a vibe. <span className="text-serif-italic" style={{ color: "var(--brand)" }}>Measure it.</span>
              </h2>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                {outcomes.map((o) => (
                  <div key={o.label} className="relative">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg hairline mb-6"
                      style={{ background: "color-mix(in oklab, var(--brand) 10%, transparent)" }}
                    >
                      <o.icon className="h-4 w-4" style={{ color: "var(--brand)" }} />
                    </div>
                    <div className="text-display text-5xl sm:text-6xl">
                      <CountUp to={o.value} suffix={o.suffix} />
                    </div>
                    <div className="mt-3 text-sm font-medium">{o.label}</div>
                    <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{o.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
