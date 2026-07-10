import { Eyebrow, Reveal } from "./primitives";

const packages = [
  {
    name: "Essential",
    price: "$6,500",
    deposit: "$2,000 deposit",
    delivery: "7 days",
    summary: "A focused, conversion-grade marketing site for a single offer.",
    features: [
      "Up to 5 designed pages",
      "Brand-led art direction",
      "Mobile + accessibility pass",
      "Analytics + SEO setup",
      "1 round of revisions",
    ],
    accent: false,
  },
  {
    name: "Signature",
    price: "$14,000",
    deposit: "$4,000 deposit",
    delivery: "10 days",
    summary: "A full website system with messaging, CRO, and a CMS.",
    features: [
      "Up to 12 designed pages",
      "Messaging + positioning workshop",
      "Custom CMS + editor handoff",
      "Conversion review + A/B test plan",
      "2 rounds of revisions",
      "30 days post-launch care",
    ],
    accent: true,
  },
  {
    name: "Flagship",
    price: "From $32,000",
    deposit: "$8,000 deposit",
    delivery: "14 days",
    summary: "A bespoke flagship build for category-defining brands.",
    features: [
      "Unlimited pages + templates",
      "Bespoke design system",
      "Engineering on production infra",
      "Integrations (CRM, payments, AI)",
      "Unlimited revisions in scope",
      "90 days post-launch care",
    ],
    accent: false,
  },
];

export function Packages() {
  return (
    <section id="packages" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><Eyebrow>Reserve your project</Eyebrow></Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display mx-auto mt-5 max-w-3xl text-center text-[clamp(2rem,5vw,4rem)]">
            Fixed price. Fixed timeline. <span className="text-serif-italic">No surprises.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-4 max-w-xl text-center text-[17px] leading-relaxed text-ink-soft">
            Choose a package, secure a slot with a deposit, and we begin within
            48 hours. No sales calls required.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <article
                className={`group relative flex h-full flex-col rounded-2xl p-8 transition-all duration-500 ${
                  p.accent
                    ? "bg-ink text-white shadow-lift"
                    : "hairline bg-white hover:shadow-card"
                }`}
              >
                {p.accent && (
                  <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-ink">
                    Most chosen
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <h3 className="text-display text-2xl">{p.name}</h3>
                  <span className={`font-mono text-[11px] tracking-[0.18em] ${p.accent ? "text-white/60" : "text-ink-muted"}`}>
                    {p.delivery}
                  </span>
                </div>
                <p className={`mt-3 text-[15px] leading-relaxed ${p.accent ? "text-white/70" : "text-ink-soft"}`}>
                  {p.summary}
                </p>

                <div className={`mt-8 border-t pt-8 ${p.accent ? "border-white/15" : "border-foreground/8"}`}>
                  <div className="text-display text-5xl">{p.price}</div>
                  <div className={`mt-1.5 text-sm ${p.accent ? "text-white/60" : "text-ink-muted"}`}>
                    {p.deposit} to reserve
                  </div>
                </div>

                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[14px]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`mt-1 shrink-0 ${p.accent ? "text-brand" : "text-ink"}`}>
                        <path d="M4 12.5 9 17.5 20 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className={p.accent ? "text-white/85" : "text-ink-soft"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#start"
                  className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium transition-all duration-300 ${
                    p.accent
                      ? "bg-white text-ink hover:bg-white/90"
                      : "bg-ink text-white hover:bg-ink/90"
                  }`}
                >
                  Reserve {p.name}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-ink-muted">
            <span>Deposits secure your production slot</span>
            <span className="h-3 w-px bg-foreground/15" />
            <span>Pay-in-full available at checkout</span>
            <span className="h-3 w-px bg-foreground/15" />
            <span>NDA-friendly</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
