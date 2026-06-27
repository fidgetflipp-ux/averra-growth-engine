import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
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

const EASE = [0.22, 1, 0.36, 1] as const;

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // active index drifts from 0 → services.length - 1 across the scroll range
  const activeIndex = useTransform(scrollYProgress, [0.05, 0.95], [0, services.length - 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-white"
      style={{ height: `${services.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Eyebrow + headline */}
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 md:pt-24">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-foreground/20" />
              <span className="text-eyebrow">Future State</span>
              <span className="h-px w-10 bg-foreground/20" />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display mx-auto mt-8 max-w-5xl text-center text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.02em]">
              Everything Your Company
              <br />
              Needs To <span className="text-serif-italic">Dominate.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-center text-[15px] leading-[1.7] text-ink-soft">
              We design and build digital experiences that create authority, trust, and market leadership.
            </p>
          </Reveal>
        </div>

        {/* 3D carousel */}
        <div
          className="relative flex flex-1 items-center justify-center pt-10 md:pt-16"
          style={{ perspective: "2000px" }}
        >
          <div
            className="relative h-[clamp(380px,58vh,560px)] w-[clamp(260px,30vw,360px)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {services.map((s, i) => (
              <Card key={s.italic + s.sans} index={i} activeIndex={activeIndex} service={s} total={services.length} />
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mx-auto w-full max-w-7xl px-6 pb-10">
          <Progress activeIndex={activeIndex} total={services.length} />
        </div>
      </div>
    </section>
  );
}

function Card({
  index,
  activeIndex,
  service,
  total,
}: {
  index: number;
  activeIndex: MotionValue<number>;
  service: (typeof services)[number];
  total: number;
}) {
  // shortest signed distance around the ring → continuous circular orbit
  const delta = useTransform(activeIndex, (v) => {
    let d = index - v;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  });

  const RADIUS = 380; // ring depth in px
  const ANGLE_STEP = 55; // degrees between adjacent cards on the ring

  const rotateY = useTransform(delta, (d) => d * ANGLE_STEP);
  const translateX = useTransform(delta, (d) => Math.sin((d * ANGLE_STEP * Math.PI) / 180) * RADIUS);
  const translateZ = useTransform(delta, (d) => (Math.cos((d * ANGLE_STEP * Math.PI) / 180) - 1) * RADIUS);

  const opacity = useTransform(delta, (d) => {
    const a = Math.abs(d);
    if (a >= 2) return 0;
    if (a >= 1) return 0.55 * (2 - a);
    return 1;
  });
  const scale = useTransform(delta, (d) => {
    const a = Math.abs(d);
    if (a <= 1) return 1 - a * 0.18; // center card stands out
    return Math.max(0.7, 0.82 - (a - 1) * 0.1);
  });
  const zIndex = useTransform(delta, (d) => 100 - Math.round(Math.abs(d) * 10));
  const filter = useTransform(delta, (d) => {
    const a = Math.abs(d);
    if (a < 0.5) return "blur(0px)";
    return `blur(${Math.min(5, (a - 0.5) * 3.5)}px)`;
  });

  return (
    <motion.article
      className="absolute inset-0 overflow-hidden rounded-[28px] bg-ink shadow-lift"
      style={{
        rotateY,
        x: translateX,
        z: translateZ,
        scale,
        opacity,
        zIndex,
        filter,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        transition: "none",
        willChange: "transform, opacity, filter",
      }}
      aria-label={`${service.italic} ${service.sans} — ${index + 1} of ${total}`}
    >
      <img
        src={service.img}
        alt={`${service.italic} ${service.sans}`}
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/0 to-black/70" />

      <div className="absolute inset-x-0 top-0 px-7 pt-7">
        <h3 className="text-display text-white text-[clamp(1.5rem,2.2vw,2.2rem)] leading-[1]">
          <span className="text-serif-italic">{service.italic}</span>{" "}
          <span className="font-medium">{service.sans}</span>
        </h3>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 px-5 pb-5">
        {service.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-md"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

function Progress({ activeIndex, total }: { activeIndex: MotionValue<number>; total: number }) {
  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} index={i} activeIndex={activeIndex} />
      ))}
    </div>
  );
}

function Dot({ index, activeIndex }: { index: number; activeIndex: MotionValue<number> }) {
  const opacity = useTransform(activeIndex, (v) => {
    const d = Math.abs(index - v);
    return Math.max(0.2, 1 - d * 0.55);
  });
  const width = useTransform(activeIndex, (v) => (Math.abs(index - v) < 0.5 ? 28 : 14));
  return (
    <motion.span
      style={{ opacity, width }}
      className="h-[2px] rounded-full bg-ink"
      transition={{ ease: EASE, duration: 0.6 }}
    />
  );
}
