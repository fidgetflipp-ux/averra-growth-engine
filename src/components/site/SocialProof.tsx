import { CountUp, Eyebrow, Reveal } from "./primitives";

const stats = [
  { value: 3.4, suffix: "x", label: "Average conversion lift" },
  { value: 41, suffix: "%", label: "Median revenue growth" },
  { value: 120, suffix: "+", label: "Sites shipped worldwide" },
  { value: 28, suffix: " days", label: "Average build-to-launch" },
];

export function SocialProof() {
  return (
    <section className="border-y border-foreground/5 bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>Outcomes, not deliverables</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display mx-auto mt-5 max-w-3xl text-center text-[clamp(2rem,4.5vw,3.5rem)] headline-fade">
            Performance our clients can put on a board report.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/8 bg-foreground/8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="bg-white p-8">
                <div className="text-display text-5xl text-ink">
                  <CountUp to={s.value} suffix={s.suffix} decimals={s.value % 1 ? 1 : 0} />
                </div>
                <p className="mt-3 text-sm text-ink-soft">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
