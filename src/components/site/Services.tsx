import { Eyebrow, Reveal } from "./primitives";
import heroShot from "@/assets/yeon-ritual-hero.png.asset.json";

const features = [
  {
    title: "Website Design",
    body: "Editorial interfaces shaped around your buyer — never a template.",
  },
  {
    title: "Website Development",
    body: "Hand-built, lightning-fast sites engineered to scale with you.",
  },
  {
    title: "Conversion Optimization",
    body: "Structural CRO that compounds revenue month after month.",
  },
  {
    title: "Brand Positioning",
    body: "Sharper words and identity that make buyers move with intent.",
  },
  {
    title: "Ongoing Management",
    body: "A senior team on retainer, shipping improvements continuously.",
  },
];

const metrics = [
  { value: "120+", label: "Projects shipped" },
  { value: "3.4×", label: "Average conversion lift" },
  { value: "14 days", label: "Average delivery" },
  { value: "98", label: "Lighthouse performance" },
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
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-xl text-center text-[17px] leading-relaxed text-ink-soft">
            Five disciplines, one senior team. Bundled into a single fixed
            engagement so you ship — fast.
          </p>
        </Reveal>

        {/* Feature row */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl hairline bg-[hsl(var(--hairline))] sm:grid-cols-2 lg:grid-cols-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.04}>
              <article className="group relative h-full bg-white p-7 transition-colors duration-500 hover:bg-surface">
                <span className="absolute left-0 top-7 h-5 w-px bg-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <h3 className="text-display text-[19px] leading-tight text-ink">
                  {f.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                  {f.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-[12px] font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more <span aria-hidden>→</span>
                </span>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Centerpiece */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-28 max-w-6xl [perspective:2400px]">
            <div
              className="relative overflow-hidden rounded-[20px] hairline bg-white"
              style={{
                transform: "rotateX(8deg) rotateY(-2deg)",
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 60px 120px -40px rgba(15, 23, 25, 0.35), 0 20px 40px -20px rgba(15, 23, 25, 0.18)",
              }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b hairline bg-[hsl(var(--surface))]/70 px-4 py-3 backdrop-blur">
                <span className="size-2.5 rounded-full bg-[#FF5F57]/80" />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]/80" />
                <span className="size-2.5 rounded-full bg-[#28C840]/80" />
                <div className="mx-auto rounded-full bg-white px-4 py-1 font-mono text-[11px] tracking-wide text-ink-soft hairline">
                  yeonritual.com
                </div>
              </div>
              <div className="relative aspect-[16/9] bg-black">
                <img
                  src={heroShot.url}
                  alt="Premium website built by Averra"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            </div>
            {/* Soft floor glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-12 -bottom-10 h-24 rounded-[50%] blur-3xl"
              style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.28), transparent 70%)" }}
            />
          </div>
        </Reveal>

        {/* Metrics */}
        <div className="mt-32 grid gap-px overflow-hidden rounded-2xl hairline bg-[hsl(var(--hairline))] sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.05}>
              <div className="flex h-full flex-col justify-between gap-10 bg-white p-8">
                <span className="text-display text-[clamp(2.25rem,3.5vw,3rem)] leading-none text-ink">
                  {m.value}
                </span>
                <span className="text-[13px] uppercase tracking-[0.18em] text-ink-soft">
                  {m.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
