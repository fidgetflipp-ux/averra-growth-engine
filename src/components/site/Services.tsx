import { Eyebrow, Reveal } from "./primitives";

const services = [
  {
    title: "Website Design",
    body: "High-trust, conversion-focused design that guides users and builds credibility.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
        <path d="M8 21h8" />
        <path d="M12 18v3" />
      </svg>
    ),
  },
  {
    title: "Development",
    body: "Clean, scalable code and modern technology for speed, security, and reliability.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 8-4 4 4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="m14 5-4 14" />
      </svg>
    ),
  },
  {
    title: "Conversion Optimization",
    body: "Data-driven CRO that turns more visitors into leads and paying customers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17 9 11l4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    title: "SEO Foundation",
    body: "Technical SEO, on-page optimization, and analytics setup to grow organic traffic.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    title: "Ongoing Support",
    body: "Post-launch care, updates, and optimization to keep producing results over time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.35-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.65-7 10-7 10z" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section id="services" className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><Eyebrow>What we do</Eyebrow></Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display mx-auto mt-6 max-w-3xl text-center text-[clamp(2rem,5vw,4rem)]">
            Everything your website needs to <span className="text-serif-italic">convert.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <article className="group flex h-full flex-col rounded-2xl hairline bg-white p-6 transition-all duration-500 hover:shadow-card">
                <div className="flex size-10 items-center justify-center rounded-xl hairline text-ink">
                  <span className="block size-5">{s.icon}</span>
                </div>
                <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
