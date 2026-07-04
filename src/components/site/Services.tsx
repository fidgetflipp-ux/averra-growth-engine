import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import svcDesign from "@/assets/website-design-figma.png.asset.json";
import svcDev from "@/assets/svc-dev.jpg";
import svcCro from "@/assets/svc-cro.jpg";
import svcBrand from "@/assets/svc-brand.jpg";
import { Reveal } from "./primitives";

const services = [
  {
    code: "01",
    italic: "Website",
    sans: "Design",
    img: svcDesign.url,
    discipline: "Art Direction",
    tags: ["Systems", "Prototyping", "Interface"],
  },
  {
    code: "02",
    italic: "Website",
    sans: "Development",
    img: svcDev,
    discipline: "Engineering",
    tags: ["Next.js", "Headless", "Performance"],
  },
  {
    code: "03",
    italic: "Conversion",
    sans: "Optimization",
    img: svcCro,
    discipline: "Growth Systems",
    tags: ["CRO", "Experiments", "Analytics"],
  },
  {
    code: "04",
    italic: "Brand",
    sans: "Positioning",
    img: svcBrand,
    discipline: "Strategy",
    tags: ["Messaging", "Identity", "Voice"],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: innerProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const activeIndex = useTransform(innerProgress, [0.05, 0.95], [0, services.length - 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-white"
      style={{ height: `${services.length * 110}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Eyebrow + headline */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-8 md:pt-10 text-ink">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <span className="text-eyebrow opacity-0">The System</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-['Inter'] font-medium mx-auto mt-4 max-w-4xl text-center text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              Everything Your Company Needs To <span className="text-serif-italic">Dominate.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-xl text-center font-sans text-[13px] leading-[1.6] opacity-70">
              Four capability layers. One operating environment. Engineered to compound authority across every surface a
              market leader is judged on.
            </p>
          </Reveal>
        </div>

        {/* Orbital stage */}
        <div
          className="relative flex flex-1 min-h-0 items-start justify-center pt-18 text-ink"
          style={{
            perspective: "2800px",
            perspectiveOrigin: "50% 45%",
          }}
        >

          <div
            className="relative shrink-0 h-[clamp(380px,56vh,540px)] w-[clamp(280px,28vw,400px)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {services.map((s, i) => (
              <Card key={s.italic + s.sans} index={i} activeIndex={activeIndex} service={s} total={services.length} />
            ))}
          </div>

          {/* Active index meta (mono) */}
          <ActiveMeta activeIndex={activeIndex} />
        </motion.div>
      </div>
    </motion.section>
  );
}

function EnvironmentBackdrop({ progress }: { progress: MotionValue<number> }) {
  const ceilingOpacity = useTransform(progress, [0, 0.18, 0.85, 1], [1, 0.35, 0.35, 1]);
  const floorOpacity = useTransform(progress, [0, 0.18, 0.85, 1], [1, 0.6, 0.6, 1]);
  const spotOpacity = useTransform(progress, [0, 0.18, 0.85, 1], [0, 0.55, 0.55, 0]);
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Theatrical spotlight that emerges during transition */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: spotOpacity,
          background: "radial-gradient(ellipse 45% 60% at 50% 50%, oklch(0.32 0.015 260) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          opacity: floorOpacity,
          background: "radial-gradient(ellipse 55% 38% at 50% 100%, oklch(0.14 0.005 260 / 0.06) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(to right, oklch(0.985 0.003 260) 1px, transparent 1px)",
          backgroundSize: "12.5% 100%",
        }}
      />
    </div>
  );
}

function GroundPlane() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[58%] h-[1px] w-[70vw] -translate-x-1/2"
      style={{
        background: "linear-gradient(to right, transparent, oklch(0.14 0.005 260 / 0.08), transparent)",
      }}
    />
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
  // Shortest signed distance — continuous orbit
  const delta = useTransform(activeIndex, (v) => {
    let d = index - v;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  });

  const RADIUS = 520;
  const ANGLE_STEP = 48;

  const rotateY = useTransform(delta, (d) => d * ANGLE_STEP);
  const translateX = useTransform(delta, (d) => Math.sin((d * ANGLE_STEP * Math.PI) / 180) * RADIUS);
  const translateZ = useTransform(delta, (d) => (Math.cos((d * ANGLE_STEP * Math.PI) / 180) - 1) * RADIUS);

  const opacity = useTransform(delta, (d) => {
    const a = Math.abs(d);
    if (a >= 2.2) return 0;
    if (a >= 1) return 0.45 * (2.2 - a);
    return 1;
  });
  const scale = useTransform(delta, (d) => {
    const a = Math.abs(d);
    if (a <= 1) return 1 - a * 0.16;
    return Math.max(0.66, 0.8 - (a - 1) * 0.1);
  });
  const zIndex = useTransform(delta, (d) => 100 - Math.round(Math.abs(d) * 10));
  const filter = useTransform(delta, (d) => {
    const a = Math.abs(d);
    if (a < 0.4) return "blur(0px) saturate(1)";
    const blur = Math.min(6, (a - 0.4) * 4);
    const sat = Math.max(0.6, 1 - (a - 0.4) * 0.25);
    return `blur(${blur}px) saturate(${sat})`;
  });
  // Atmospheric fade — distant cards wash slightly into the room light
  const atmosphere = useTransform(delta, (d) => {
    const a = Math.abs(d);
    return Math.min(0.35, a * 0.18);
  });

  return (
    <motion.article
      className="absolute inset-0 overflow-hidden rounded-[24px] bg-ink"
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
        boxShadow: "0 40px 80px -40px oklch(0.14 0.005 260 / 0.35), 0 1px 0 0 oklch(1 0 0 / 0.06) inset",
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
      {/* Tonal grade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/75" />
      {/* Atmospheric haze on distant cards */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white"
        style={{ opacity: atmosphere }}
      />

      {/* Top meta — mono */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between px-6 pt-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
          {service.code} / {service.discipline}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">Layer</span>
      </div>

      {/* Title */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-6">
        <h3 className="text-display text-white text-[clamp(1.5rem,2.2vw,2.2rem)] leading-[1.02]">
          <span className="text-serif-italic">{service.italic}</span>{" "}
          <span className="font-medium">{service.sans}</span>
        </h3>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function ActiveMeta({ activeIndex }: { activeIndex: MotionValue<number> }) {
  const current = useTransform(activeIndex, (v) => {
    const i = Math.round(v) % services.length;
    return services[(i + services.length) % services.length].code;
  });
  const total = String(services.length).padStart(2, "0");
  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] opacity-60">
        <motion.span>{current}</motion.span>
        <span className="h-px w-8 bg-current opacity-30" />
        <span>{total}</span>
      </div>
    </div>
  );
}
