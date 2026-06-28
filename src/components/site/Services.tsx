import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, type MotionValue } from "framer-motion";
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
    altitude: "Ground Floor",
    tags: ["Systems", "Prototyping", "Interface"],
  },
  {
    code: "02",
    italic: "Website",
    sans: "Development",
    img: svcDev,
    discipline: "Engineering",
    altitude: "Mezzanine",
    tags: ["Next.js", "Headless", "Performance"],
  },
  {
    code: "03",
    italic: "Conversion",
    sans: "Optimization",
    img: svcCro,
    discipline: "Growth Systems",
    altitude: "Upper Gallery",
    tags: ["CRO", "Experiments", "Analytics"],
  },
  {
    code: "04",
    italic: "Brand",
    sans: "Positioning",
    img: svcBrand,
    discipline: "Strategy",
    altitude: "The Spire",
    tags: ["Messaging", "Identity", "Voice"],
  },
];

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

  // Continuous "altitude" — the camera ascends through the atrium
  const ascent = useTransform(innerProgress, [0.04, 0.96], [0, services.length - 1]);

  // Reality shift — site dissolves into a darker, cathedral environment on entry
  const envLightness = useTransform(scrollYProgress, [0.0, 0.18, 0.85, 1], [1.0, 0.09, 0.09, 1.0]);
  const envChroma = useTransform(scrollYProgress, [0.0, 0.18, 0.85, 1], [0.003, 0.014, 0.014, 0.003]);
  const bg = useMotionTemplate`oklch(${envLightness} ${envChroma} 262)`;
  const textInvert = useTransform(scrollYProgress, [0.0, 0.18, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      id="services"
      className="relative"
      style={{ height: `${services.length * 120}vh`, backgroundColor: bg }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Atrium environment — vertical cathedral void */}
        <AtriumBackdrop progress={scrollYProgress} ascent={ascent} />

        {/* Eyebrow + headline */}
        <motion.div
          className="relative z-20 mx-auto w-full max-w-7xl px-6 pt-8 md:pt-10"
          style={{
            color: useTransform(textInvert, (v) => `oklch(${0.14 + v * 0.85} 0.005 260)`),
          }}
        >
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <motion.span className="h-px w-10" style={{ backgroundColor: useTransform(textInvert, (v) => `oklch(${0.14 + v * 0.85} 0.005 260 / 0.3)`) }} />
              <span className="text-eyebrow">The System</span>
              <motion.span className="h-px w-10" style={{ backgroundColor: useTransform(textInvert, (v) => `oklch(${0.14 + v * 0.85} 0.005 260 / 0.3)`) }} />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display mx-auto mt-4 max-w-4xl text-center text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
              Everything Your Company Needs To <span className="text-serif-italic">Dominate.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-xl text-center font-sans text-[13px] leading-[1.6] opacity-70">
              Four capability layers. One operating environment. Engineered to compound authority across every surface a market leader is judged on.
            </p>
          </Reveal>
        </motion.div>

        {/* The atrium stage — vertical shaft with floating platforms */}
        <motion.div
          className="relative flex flex-1 min-h-0 items-center justify-center pt-2 md:pt-4"
          style={{
            perspective: "2400px",
            perspectiveOrigin: "50% 50%",
            color: useTransform(textInvert, (v) => `oklch(${0.14 + v * 0.85} 0.005 260)`),
          }}
        >
          {/* Left ascent rail */}
          <AscentRail ascent={ascent} textInvert={textInvert} />

          {/* The shaft — platforms float at staggered altitudes */}
          <div
            className="relative h-full w-[clamp(280px,28vw,400px)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {services.map((s, i) => (
              <Platform key={s.italic + s.sans} index={i} ascent={ascent} service={s} total={services.length} />
            ))}
          </div>

          {/* Right altitude meta */}
          <AltitudeMeta ascent={ascent} textInvert={textInvert} />
        </motion.div>
      </div>
    </motion.section>
  );
}

function AtriumBackdrop({ progress, ascent }: { progress: MotionValue<number>; ascent: MotionValue<number> }) {
  const enter = useTransform(progress, [0, 0.18, 0.85, 1], [0, 1, 1, 0]);

  // The light shaft from above — volumetric beam pouring into the atrium
  const beamOpacity = useTransform(enter, [0, 1], [0, 0.55]);
  // Vertical structural columns drift as we ascend
  const columnsY = useTransform(ascent, [0, 3], ["0%", "-18%"]);
  // Floor recedes as altitude increases
  const floorOpacity = useTransform(ascent, [0, 1.5, 3], [0.7, 0.35, 0.12]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Deep void wash on entry */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: enter,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.18 0.018 262) 0%, oklch(0.08 0.012 262) 55%, oklch(0.05 0.008 262) 100%)",
        }}
      />

      {/* Vertical structural columns — cathedral ribs */}
      <motion.div
        className="absolute inset-x-0 -top-[20%] h-[140%]"
        style={{
          y: columnsY,
          opacity: useTransform(enter, [0, 1], [0, 0.08]),
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "9% 100%",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      />

      {/* Volumetric light beam pouring from above the atrium */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          opacity: beamOpacity,
          background:
            "conic-gradient(from 180deg at 50% -8%, transparent 0deg, oklch(0.95 0.02 95 / 0.18) 174deg, oklch(0.98 0.025 95 / 0.32) 180deg, oklch(0.95 0.02 95 / 0.18) 186deg, transparent 360deg)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 95%)",
        }}
      />

      {/* Soft warm wash at the ceiling — the source */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[40%]"
        style={{
          opacity: useTransform(enter, [0, 1], [0, 0.7]),
          background:
            "radial-gradient(ellipse 50% 70% at 50% 0%, oklch(0.92 0.04 90 / 0.22) 0%, transparent 70%)",
        }}
      />

      {/* Floor — pool of light at the base */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          opacity: floorOpacity,
          background:
            "radial-gradient(ellipse 45% 35% at 50% 100%, oklch(0.25 0.015 262 / 0.6) 0%, transparent 65%)",
        }}
      />

      {/* Faint dust particles — single static layer, no JS */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: useTransform(enter, [0, 1], [0, 0.12]),
          backgroundImage:
            "radial-gradient(1px 1px at 23% 18%, white, transparent), radial-gradient(1px 1px at 67% 32%, white, transparent), radial-gradient(1px 1px at 42% 71%, white, transparent), radial-gradient(1px 1px at 81% 58%, white, transparent), radial-gradient(1px 1px at 12% 88%, white, transparent), radial-gradient(1px 1px at 55% 12%, white, transparent), radial-gradient(1px 1px at 88% 84%, white, transparent)",
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  );
}

function AscentRail({ ascent, textInvert }: { ascent: MotionValue<number>; textInvert: MotionValue<number> }) {
  const fillHeight = useTransform(ascent, [0, services.length - 1], ["0%", "100%"]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3"
      style={{ height: "60vh", opacity: useTransform(textInvert, [0, 1], [0, 0.85]) }}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/40">Ascent</span>
      <div className="relative w-px flex-1 bg-white/10">
        <motion.div
          className="absolute inset-x-0 top-0 bg-gradient-to-b from-white/80 via-white/40 to-transparent"
          style={{ height: fillHeight }}
        />
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/40">Spire</span>
    </motion.div>
  );
}

function AltitudeMeta({ ascent, textInvert }: { ascent: MotionValue<number>; textInvert: MotionValue<number> }) {
  const label = useTransform(ascent, (v) => {
    const i = Math.max(0, Math.min(services.length - 1, Math.round(v)));
    return services[i].altitude;
  });
  const num = useTransform(ascent, (v) => {
    const i = Math.max(0, Math.min(services.length - 1, Math.round(v)));
    return services[i].code;
  });
  return (
    <motion.div
      className="pointer-events-none absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-end gap-2"
      style={{ opacity: useTransform(textInvert, [0, 1], [0, 0.9]) }}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/40">Altitude</span>
      <motion.span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/85">
        {label}
      </motion.span>
      <motion.span className="text-display text-white/90 text-[22px] leading-none">
        {num}<span className="text-white/40 text-[13px]"> / 04</span>
      </motion.span>
    </motion.div>
  );
}

function Platform({
  index,
  ascent,
  service,
  total,
}: {
  index: number;
  ascent: MotionValue<number>;
  service: (typeof services)[number];
  total: number;
}) {
  // Distance from the current "floor" we're looking at. Negative = below us (already passed), positive = above us (yet to reach)
  const delta = useTransform(ascent, (v) => index - v);

  // Vertical travel — each platform sits ~70vh apart in the shaft, scroll lifts the camera so they drift downward through frame
  const FLOOR_GAP = 560; // px between platforms in 3D
  const y = useTransform(delta, (d) => d * FLOOR_GAP);
  // Slight Z recession — distant platforms sit slightly back
  const z = useTransform(delta, (d) => -Math.abs(d) * 180);
  // Tilt — platforms above tilt forward, below tilt away (cathedral perspective)
  const rotateX = useTransform(delta, (d) => Math.max(-18, Math.min(18, -d * 6)));
  const scale = useTransform(delta, (d) => {
    const a = Math.abs(d);
    if (a < 0.5) return 1;
    return Math.max(0.74, 1 - (a - 0.5) * 0.16);
  });
  const opacity = useTransform(delta, (d) => {
    const a = Math.abs(d);
    if (a >= 2) return 0;
    if (a >= 1) return 0.5 * (2 - a);
    return 1;
  });
  const filter = useTransform(delta, (d) => {
    const a = Math.abs(d);
    if (a < 0.4) return "blur(0px)";
    return `blur(${Math.min(6, (a - 0.4) * 3.5)}px)`;
  });
  const zIndex = useTransform(delta, (d) => 100 - Math.round(Math.abs(d) * 10));

  // Spotlight on the active platform — soft warm beam from above
  const spotOpacity = useTransform(delta, (d) => {
    const a = Math.abs(d);
    return a < 0.5 ? 1 - a * 1.4 : 0;
  });

  return (
    <motion.article
      className="absolute left-1/2 top-1/2"
      style={{
        x: "-50%",
        y,
        z,
        rotateX,
        scale,
        opacity,
        zIndex,
        filter,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        width: "100%",
        height: "clamp(380px, 56vh, 540px)",
        marginTop: "calc(clamp(380px, 56vh, 540px) / -2)",
      }}
      aria-label={`${service.italic} ${service.sans} — ${index + 1} of ${total}`}
    >
      {/* Volumetric spotlight isolating the active platform */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[60%] -top-[40%] h-[60%]"
        style={{
          opacity: spotOpacity,
          background:
            "radial-gradient(ellipse 35% 100% at 50% 0%, oklch(0.95 0.025 90 / 0.45) 0%, oklch(0.9 0.03 90 / 0.12) 40%, transparent 75%)",
        }}
      />

      {/* The platform itself — a glass slab suspended in the void */}
      <div className="relative size-full overflow-hidden rounded-[20px] bg-ink">
        <img
          src={service.img}
          alt={`${service.italic} ${service.sans}`}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        {/* Tonal grade */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/80" />
        {/* Inner glass edge */}
        <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/10" />

        {/* Top meta */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between px-6 pt-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
            {service.code} / {service.discipline}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
            {service.altitude}
          </span>
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
      </div>

      {/* Reflection slab beneath — the platform floats above a polished floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full h-[40%] w-[90%] -translate-x-1/2 opacity-30"
        style={{
          transform: "translateX(-50%) rotateX(180deg)",
          transformOrigin: "top center",
          background:
            "linear-gradient(to bottom, oklch(0.3 0.012 262 / 0.5), transparent 80%)",
          maskImage: "linear-gradient(to bottom, black, transparent 60%)",
          filter: "blur(2px)",
        }}
      />
    </motion.article>
  );
}
