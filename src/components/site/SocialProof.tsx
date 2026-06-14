import { Eyebrow, Reveal } from "./primitives";

const principles = [
  {
    title: "Senior team only",
    body: "No account managers shuffling your project between juniors. You work directly with senior strategists, designers, and engineers.",
  },
  {
    title: "Strategy before pixels",
    body: "Every project starts with positioning, audience, and funnel — not a template. Design decisions follow from business goals.",
  },
  {
    title: "Built to convert",
    body: "Every page is designed around an outcome: credibility, leads, or sales — not just visual polish.",
  },
  {
    title: "One accountable partner",
    body: "Strategy, design, and engineering under one roof. No handoffs, no agencies subcontracting your project out.",
  },
];

export function SocialProof() {
  return (
    <section id="difference" className="border-y border-foreground/5 bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>How we're different</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display mx-auto mt-5 max-w-3xl text-center text-[clamp(2rem,4.5vw,3.5rem)] headline-fade">
            Built like a growth partner, not a vendor.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/8 bg-foreground/8 md:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="h-full bg-white p-8">
                <div className="grid size-9 place-items-center rounded-lg bg-brand-soft">
                  <span className="size-2 rounded-sm bg-brand" />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-ink">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
