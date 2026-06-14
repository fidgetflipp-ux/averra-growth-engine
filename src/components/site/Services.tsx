import svcDesign from "@/assets/svc-design.jpg";
import svcDev from "@/assets/svc-dev.jpg";
import svcCro from "@/assets/svc-cro.jpg";
import svcBrand from "@/assets/svc-brand.jpg";
import svcManage from "@/assets/svc-manage.jpg";
import { Eyebrow, Reveal } from "./primitives";

const services = [
  {
    n: "01",
    title: "Website Design",
    body: "Editorial, high-trust interfaces built around your buyer journey — not a template.",
    img: svcDesign,
    tags: ["Art direction", "UI systems", "Prototyping"],
  },
  {
    n: "02",
    title: "Website Development",
    body: "Hand-built, lightning-fast sites on a modern stack. SEO-ready, accessible, easy to manage.",
    img: svcDev,
    tags: ["Next.js", "Headless CMS", "Performance"],
  },
  {
    n: "03",
    title: "Conversion Optimization",
    body: "Funnel teardown, message-market fit, and structural CRO that compounds month over month.",
    img: svcCro,
    tags: ["CRO audit", "A/B testing", "Analytics"],
  },
  {
    n: "04",
    title: "Brand Positioning",
    body: "Sharpen who you serve, what you stand for, and the words that make buyers act.",
    img: svcBrand,
    tags: ["Messaging", "Identity", "Voice"],
  },
  {
    n: "05",
    title: "Ongoing Management",
    body: "A senior team on retainer to ship continuous improvements after launch.",
    img: svcManage,
    tags: ["Retainer", "Iteration", "Support"],
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
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-xl text-center text-[17px] leading-relaxed text-ink-soft">
            Five disciplines, one senior team. Bundled into a single fixed
            engagement so you ship — fast.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl hairline bg-white transition-all duration-500 hover:shadow-lift">
                <div className="relative aspect-[5/4] overflow-hidden bg-surface">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    width={1200}
                    height={1400}
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-ink backdrop-blur">
                    {s.n}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-display text-2xl text-ink">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full hairline px-2.5 py-1 text-[11px] text-ink-soft">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
