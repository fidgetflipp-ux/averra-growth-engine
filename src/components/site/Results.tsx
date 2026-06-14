import { CountUp, Eyebrow, Reveal } from "./primitives";

const compare = [
  { label: "Speed", us: true, inhouse: false, agency: false, freelance: false },
  { label: "Senior craft", us: true, inhouse: true, agency: true, freelance: false },
  { label: "CRO depth", us: true, inhouse: false, agency: false, freelance: false },
  { label: "Scalability", us: true, inhouse: true, agency: true, freelance: false },
  { label: "Accountability", us: true, inhouse: true, agency: false, freelance: false },
];

const rows = [
  { name: "In-house team", desc: "Higher overhead, lacking CRO depth and design system maturity." },
  { name: "Traditional agencies", desc: "Slow timelines, high retainers, focused on awards over revenue." },
  { name: "Freelancers", desc: "Inconsistent quality. You manage them — they don't manage outcomes." },
];

export function Results() {
  return (
    <section id="results" className="border-y border-foreground/5 bg-surface py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><Eyebrow>Averra vs. the alternatives</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display mx-auto mt-5 max-w-3xl text-center text-[clamp(2rem,4.5vw,3.5rem)] headline-fade">
            Why teams hire us instead of staffing up.
          </h2>
        </Reveal>

        {/* Comparison */}
        <Reveal delay={0.16}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-foreground/8 bg-white shadow-card">
            {/* header */}
            <div className="grid grid-cols-7 gap-4 px-8 py-5 text-xs font-mono uppercase tracking-wider text-ink-soft">
              <div className="col-span-2" />
              {compare.map((c) => (
                <div key={c.label} className="text-center">{c.label}</div>
              ))}
            </div>

            {/* us row */}
            <div className="grid grid-cols-7 items-center gap-4 bg-ink px-8 py-7 text-white">
              <div className="col-span-2">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <span className="grid size-6 place-items-center rounded-md bg-white/10">
                    <span className="size-2 rounded-sm bg-brand" />
                  </span>
                  Averra
                </div>
                <p className="mt-2 text-sm text-white/60">Senior strategy, design, and engineering — one accountable team.</p>
              </div>
              {compare.map((c) => (
                <div key={c.label} className="flex justify-center">
                  <Check on />
                </div>
              ))}
            </div>

            {rows.map((row, i) => (
              <div key={row.name} className="grid grid-cols-7 items-center gap-4 border-t border-foreground/8 px-8 py-7">
                <div className="col-span-2">
                  <div className="text-lg font-semibold text-ink">{row.name}</div>
                  <p className="mt-2 text-sm text-ink-soft">{row.desc}</p>
                </div>
                {compare.map((c) => (
                  <div key={c.label} className="flex justify-center">
                    <Check on={[c.inhouse, c.agency, c.freelance][i]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Numbers strip */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            { v: 84, p: "$", s: "M", l: "Client revenue influenced" },
            { v: 3.4, s: "x", l: "Average conversion lift", dec: 1 },
            { v: 120, s: "+", l: "Projects delivered worldwide" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-2xl border border-foreground/8 bg-white p-8 shadow-card">
                <div className="text-display text-5xl text-ink">
                  <CountUp to={s.v} prefix={s.p ?? ""} suffix={s.s} decimals={s.dec ?? 0} />
                </div>
                <p className="mt-3 text-sm text-ink-soft">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Check({ on }: { on: boolean }) {
  if (on) {
    return (
      <span className="grid size-7 place-items-center rounded-full bg-brand text-ink">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="m5 12 5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className="grid size-7 place-items-center rounded-full bg-foreground/8 text-ink-soft">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}
