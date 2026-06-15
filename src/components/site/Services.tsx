import svcDesign from "@/assets/website-design-figma.png.asset.json";
import svcDev from "@/assets/svc-dev.jpg";
import svcCro from "@/assets/svc-cro.jpg";
import svcBrand from "@/assets/svc-brand.jpg";
import svcManage from "@/assets/svc-manage.jpg";
import { Reveal } from "./primitives";

const services = [
  {
    italic: "Website",
    sans: "Design",
    img: svcDesign.url,
    tags: ["Art Direction", "UI Systems", "Prototyping"],
  },
  {
    italic: "Website",
    sans: "Development",
    img: svcDev,
    tags: ["Next.js", "Headless CMS", "Performance"],
  },
  {
    italic: "Conversion",
    sans: "Optimization",
    img: svcCro,
    tags: ["CRO Audit", "A/B Testing", "Analytics"],
  },
  {
    italic: "Brand",
    sans: "Positioning",
    img: svcBrand,
    tags: ["Messaging", "Identity", "Voice"],
  },
  {
    italic: "Ongoing",
    sans: "Management",
    img: svcManage,
    tags: ["Retainer", "Iteration", "Support"],
  },
];

export function Services() {
  return (
    <section id="services" className="overflow-hidden bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="text-display mx-auto max-w-4xl text-center text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02]">
            Everything Your Site<br />Needs To <span className="text-serif-italic">Convert.</span>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-20">
          <div className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.5rem,calc((100vw-80rem)/2))] pb-6">
            {services.map((s) => (
              <article
                key={s.italic + s.sans}
                className="group relative aspect-[3/4] w-[min(78vw,420px)] shrink-0 snap-center overflow-hidden rounded-[28px] bg-ink shadow-lift"
              >
                {/* image */}
                <img
                  src={s.img}
                  alt={`${s.italic} ${s.sans}`}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
                {/* top → bottom darkening so title + pills stay legible */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/0 to-black/70" />

                {/* Title */}
                <div className="absolute inset-x-0 top-0 px-7 pt-7">
                  <h3 className="text-display text-white text-[clamp(1.75rem,2.4vw,2.4rem)] leading-[1]">
                    <span className="text-serif-italic">{s.italic}</span>{" "}
                    <span className="font-medium">{s.sans}</span>
                  </h3>
                </div>

                {/* Pills */}
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 px-5 pb-5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
