import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import svcDesign from "@/assets/website-design-figma.png.asset.json";
import svcDev from "@/assets/svc-dev.jpg";
import svcCro from "@/assets/svc-cro.jpg";
import svcBrand from "@/assets/svc-brand.jpg";

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
const playfair = { fontFamily: "'Playfair Display', serif" };
const sans = { fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" };

const headingWords: { text: string; italic?: boolean }[] = [
  { text: "Everything" },
  { text: "Your" },
  { text: "Company" },
  { text: "Needs" },
  { text: "To" },
  { text: "Dominate.", italic: true },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  // Total scroll length gives each card its own beat
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Continuous active index (float). Cards blend around this value.
  const rawIndex = useTransform(scrollYProgress, [0.05, 0.95], [0, services.length - 1]);
  const activeIndex = useSpring(rawIndex, { stiffness: 90, damping: 22, mass: 0.6 });

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Services"
      className="relative"
      style={{ height: `${services.length * 110}vh` }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          background: "linear-gradient(180deg,#FAF8F5 0%,#F3F0EA 55%,#ECE7DE 100%)",
        }}
      >
        {/* Radial spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 62%, rgba(255,244,220,0.55) 0%, rgba(255,244,220,0) 65%)",
          }}
        />
        {/* Ambient light rays */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: [0.28, 0.42, 0.28] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "conic-gradient(from 210deg at 50% 40%, transparent 0deg, rgba(201,168,76,0.06) 30deg, transparent 90deg, rgba(255,255,255,0.05) 180deg, transparent 260deg)",
            filter: "blur(40px)",
          }}
        />
        {/* Vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(60,45,25,0.14) 100%)",
          }}
        />
        {/* Film grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            backgroundSize: "240px 240px",
          }}
        />
        <Particles />

        {/* Header */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 md:pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center justify-center gap-3"
            style={sans}
          >
            <span className="h-px w-8 bg-[#1a1a1a]/25" />
            <span className="text-[10px] uppercase tracking-[0.42em] text-[#1a1a1a]/60">
              The System
            </span>
            <span className="h-px w-8 bg-[#1a1a1a]/25" />
          </motion.div>

          <h2
            className="mt-8 text-[clamp(2.25rem,5.5vw,4.25rem)] text-[#1a1a1a]"
            style={{ ...playfair, letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            {headingWords.map((w, i) => (
              <WordReveal key={i} delay={i * 0.09} italic={w.italic}>
                {w.text}
              </WordReveal>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.65, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.65] text-[#1a1a1a]"
            style={sans}
          >
            Four capability layers. One operating environment. Engineered to compound authority
            across every surface a market leader is judged on.
          </motion.p>
        </div>

        {/* Stage */}
        <div
          className="relative z-10 mt-6 flex items-center justify-center"
          style={{ perspective: "2400px", height: "clamp(420px, 55vh, 560px)" }}
        >
          <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
            {services.map((s, i) => (
              <ScrollCard
                key={s.italic + s.sans}
                index={i}
                total={services.length}
                activeIndex={activeIndex}
                service={s}
              />
            ))}
          </div>
        </div>

        {/* Progress meta */}
        <ProgressMeta activeIndex={activeIndex} />
      </div>
    </section>
  );
}

function WordReveal({
  children,
  delay,
  italic,
}: {
  children: string;
  delay: number;
  italic?: boolean;
}) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] pr-[0.28em] align-baseline">
      <motion.span
        initial={{ y: "60%", opacity: 0, filter: "blur(14px)" }}
        whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.0, delay, ease: EASE }}
        className={`inline-block ${italic ? "italic" : ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

function ScrollCard({
  index,
  total,
  activeIndex,
  service,
}: {
  index: number;
  total: number;
  activeIndex: MotionValue<number>;
  service: (typeof services)[number];
}) {
  // Shortest signed distance from center — continuous orbit
  const delta = useTransform(activeIndex, (v) => {
    let d = index - v;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  });

  // Card positions: center (d=0), left (d=-1), right (d=1), further out fades
  const ANGLE = 26; // degrees per step
  const X_STEP = 380; // px per step
  const Z_STEP = 240; // depth per step

  const rotateY = useTransform(delta, (d) => d * ANGLE);
  const x = useTransform(delta, (d) => d * X_STEP);
  const z = useTransform(delta, (d) => -Math.abs(d) * Z_STEP);
  const scale = useTransform(delta, (d) => {
    const a = Math.abs(d);
    if (a <= 1) return 1 - a * 0.15;
    return Math.max(0.6, 0.85 - (a - 1) * 0.15);
  });
  const opacity = useTransform(delta, (d) => {
    const a = Math.abs(d);
    if (a >= 2.3) return 0;
    if (a >= 1) return 0.75 - (a - 1) * 0.55;
    return 1;
  });
  const filter = useTransform(delta, (d) => {
    const a = Math.abs(d);
    if (a < 0.35) return "blur(0px)";
    return `blur(${Math.min(6, (a - 0.35) * 4)}px)`;
  });
  const zIndex = useTransform(delta, (d) => 100 - Math.round(Math.abs(d) * 10));
  const isCenter = useTransform(delta, (d) => (Math.abs(d) < 0.5 ? 1 : 0));
  const glowOpacity = useTransform(delta, (d) => {
    const a = Math.abs(d);
    return a < 0.6 ? 0.45 * (1 - a / 0.6) : 0;
  });
  const imgBrightness = useTransform(delta, (d) =>
    Math.abs(d) < 0.5 ? "saturate(1) brightness(1)" : "saturate(0.85) brightness(0.92)",
  );

  // Subtle continuous float
  const floatY = useMotionValue(0);
  return (
    <motion.article
      className="absolute left-1/2 top-1/2"
      style={{
        x,
        z,
        rotateY,
        scale,
        opacity,
        filter,
        zIndex,
        translateX: "-50%",
        translateY: "-50%",
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        width: "clamp(300px, 30vw, 420px)",
        height: "clamp(420px, 55vh, 560px)",
        willChange: "transform, opacity, filter",
      }}
      aria-label={`${service.italic} ${service.sans}`}
    >
      <motion.div
        style={{ y: floatY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-full w-full"
      >
        {/* Ambient golden glow when centered */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-10 rounded-[44px]"
          style={{
            opacity: glowOpacity,
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.35) 0%, rgba(201,168,76,0) 65%)",
            filter: "blur(30px)",
          }}
        />

        {/* Card body */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[30px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%)",
            backdropFilter: "blur(14px) saturate(140%)",
            border: "1px solid rgba(255,255,255,0.55)",
            boxShadow:
              "0 60px 120px -40px rgba(60,45,25,0.45), 0 30px 60px -30px rgba(60,45,25,0.35), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(60,45,25,0.05)",
          }}
        >
          <motion.img
            src={service.img}
            alt={`${service.italic} ${service.sans}`}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
            style={{ filter: imgBrightness }}
          />
          {/* Tonal grade */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/5 to-black/70" />

          {/* Slow reflection sheen */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "linear",
              delay: index * 1.4,
            }}
            style={{
              background:
                "linear-gradient(75deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
            }}
          />

          {/* Top meta */}
          <div
            className="absolute inset-x-0 top-0 flex items-start justify-between px-6 pt-6"
            style={sans}
          >
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur-md">
              {service.code} — {service.discipline}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
              Layer
            </span>
          </div>

          {/* Title */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-7">
            <h3
              className="text-white text-[clamp(1.65rem,2.2vw,2.3rem)] leading-[1.0]"
              style={{ ...playfair, letterSpacing: "-0.02em" }}
            >
              <span className="italic font-normal">{service.italic}</span>{" "}
              <span className="font-medium">{service.sans}</span>
            </h3>
            <div className="mt-4 flex flex-wrap gap-1.5" style={sans}>
              {service.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85 backdrop-blur-md"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Edge lighting */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[30px]"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 40px 60px -40px rgba(255,255,255,0.35)",
              opacity: isCenter,
            }}
          />
        </div>
      </motion.div>
    </motion.article>
  );
}

function ProgressMeta({ activeIndex }: { activeIndex: MotionValue<number> }) {
  const label = useTransform(activeIndex, (v) => {
    const i = Math.round(v) % services.length;
    return services[(i + services.length) % services.length].code;
  });
  const total = String(services.length).padStart(2, "0");
  return (
    <div
      className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2"
      style={sans}
    >
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#1a1a1a]/55">
        <motion.span>{label}</motion.span>
        <span className="h-px w-10 bg-[#1a1a1a]/25" />
        <span>{total}</span>
      </div>
    </div>
  );
}

function Particles() {
  const dots = Array.from({ length: 18 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const size = 1 + (i % 3);
        const dur = 14 + (i % 7) * 2;
        const delay = (i % 5) * 1.4;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#1a1a1a]/25"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            animate={{ y: [-8, 8, -8], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
          />
        );
      })}
    </div>
  );
}
