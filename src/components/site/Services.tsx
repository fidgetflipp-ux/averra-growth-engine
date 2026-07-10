import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
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

const SPRING = { type: "spring" as const, stiffness: 120, damping: 22, mass: 0.9 };
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
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-advance the featured card (paused when hovering)
  useEffect(() => {
    if (hovered !== null) return;
    const id = setInterval(() => setActive((i) => (i + 1) % services.length), 5200);
    return () => clearInterval(id);
  }, [hovered]);

  const prev = (active - 1 + services.length) % services.length;
  const next = (active + 1) % services.length;

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Services"
      className="relative overflow-hidden py-40 md:py-52"
      style={{
        background:
          "linear-gradient(180deg,#FAF8F5 0%,#F3F0EA 55%,#ECE7DE 100%)",
      }}
    >
      {/* Radial spotlight behind center card */}
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
        initial={{ opacity: 0.35 }}
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
      {/* Drifting particles */}
      <Particles />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
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
          className="mt-10 text-[clamp(2.75rem,7vw,5.25rem)] text-[#1a1a1a]"
          style={{
            ...playfair,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
          }}
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
          className="mx-auto mt-10 max-w-xl text-[16px] leading-[1.65] text-[#1a1a1a]"
          style={sans}
        >
          Four capability layers. One operating environment. Engineered to compound authority across
          every surface a market leader is judged on.
        </motion.p>
      </div>

      {/* Stage */}
      <div
        className="relative z-10 mt-24 md:mt-32"
        style={{ perspective: "2200px" }}
      >
        <div className="relative mx-auto flex h-[560px] max-w-7xl items-center justify-center px-6 md:h-[620px]">
          {services.map((s, i) => {
            let role: "center" | "left" | "right" | "hidden" = "hidden";
            if (i === active) role = "center";
            else if (i === prev) role = "left";
            else if (i === next) role = "right";
            return (
              <StageCard
                key={s.italic + s.sans}
                service={s}
                role={role}
                onFocus={() => setActive(i)}
                onHover={(h) => setHovered(h ? i : null)}
                isHovered={hovered === i}
              />
            );
          })}
        </div>

        {/* Nav dots */}
        <div className="relative mt-14 flex items-center justify-center gap-3" style={sans}>
          {services.map((s, i) => (
            <button
              key={s.code}
              onClick={() => setActive(i)}
              aria-label={`Show ${s.italic} ${s.sans}`}
              className="group flex items-center gap-2"
            >
              <span
                className={`h-[6px] rounded-full transition-all duration-500 ${
                  i === active ? "w-10 bg-[#1a1a1a]" : "w-[6px] bg-[#1a1a1a]/25 group-hover:bg-[#1a1a1a]/50"
                }`}
              />
            </button>
          ))}
          <span className="ml-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#1a1a1a]/50">
            {services[active].code} / {String(services.length).padStart(2, "0")}
          </span>
        </div>
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

function StageCard({
  service,
  role,
  onFocus,
  onHover,
  isHovered,
}: {
  service: (typeof services)[number];
  role: "center" | "left" | "right" | "hidden";
  onFocus: () => void;
  onHover: (h: boolean) => void;
  isHovered: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["20%", "80%"]);
  const glareBg = useTransform(
    [glareX, glareY] as unknown as import("framer-motion").MotionValue<string>[],
    ([x, y]: string[]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.35), rgba(255,255,255,0) 45%)`,
  );

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
    onHover(false);
  };

  const target = {
    center: { x: 0, z: 0, rotateY: 0, scale: 1, opacity: 1, blur: 0 },
    left: { x: -360, z: -220, rotateY: 22, scale: 0.85, opacity: 0.72, blur: 3 },
    right: { x: 360, z: -220, rotateY: -22, scale: 0.85, opacity: 0.72, blur: 3 },
    hidden: { x: 0, z: -600, rotateY: 0, scale: 0.7, opacity: 0, blur: 8 },
  }[role];

  const isCenter = role === "center";

  return (
    <motion.article
      ref={ref}
      onMouseEnter={() => onHover(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onFocus}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{
        opacity: target.opacity,
        x: target.x,
        z: target.z,
        rotateY: target.rotateY,
        scale: target.scale,
        y: 0,
        filter: `blur(${target.blur}px)`,
      }}
      transition={SPRING}
      className="absolute cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        zIndex: isCenter ? 30 : 10,
        pointerEvents: role === "hidden" ? "none" : "auto",
      }}
      aria-label={`${service.italic} ${service.sans}`}
    >
      {/* Subtle continuous float */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          style={{
            rotateX: isCenter ? rx : 0,
            rotateY: isCenter ? ry : 0,
            transformStyle: "preserve-3d",
            width: "clamp(300px, 32vw, 440px)",
            height: "clamp(420px, 56vh, 560px)",
          }}
        >
          {/* Ambient golden glow (active only) */}
          <AnimatePresence>
            {isCenter && (
              <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.75 : 0.45 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="pointer-events-none absolute -inset-10 rounded-[44px]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(201,168,76,0.35) 0%, rgba(201,168,76,0) 65%)",
                  filter: "blur(30px)",
                }}
              />
            )}
          </AnimatePresence>

          {/* Card body */}
          <div
            className="relative h-full w-full overflow-hidden rounded-[30px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%)",
              backdropFilter: "blur(14px) saturate(140%)",
              border: "1px solid rgba(255,255,255,0.55)",
              boxShadow: isCenter
                ? "0 60px 120px -40px rgba(60,45,25,0.45), 0 30px 60px -30px rgba(60,45,25,0.35), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(60,45,25,0.05)"
                : "0 40px 80px -40px rgba(60,45,25,0.35), inset 0 1px 0 rgba(255,255,255,0.55)",
            }}
          >
            <img
              src={service.img}
              alt={`${service.italic} ${service.sans}`}
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-[filter,transform] duration-700"
              style={{
                filter: isCenter
                  ? isHovered
                    ? "saturate(1.1) brightness(1.05)"
                    : "saturate(1) brightness(1)"
                  : "saturate(0.85) brightness(0.92)",
                transform: isHovered && isCenter ? "scale(1.04)" : "scale(1)",
              }}
            />
            {/* Tonal grade */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/5 to-black/70" />

            {/* Moving specular highlight */}
            {isCenter && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: glareBg as unknown as string,
                  mixBlendMode: "overlay",
                }}
              />
            )}

            {/* Slow reflection sheen */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: isCenter ? 0 : 3 }}
              style={{
                background:
                  "linear-gradient(75deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
              }}
            />

            {/* Top meta */}
            <div className="absolute inset-x-0 top-0 flex items-start justify-between px-6 pt-6" style={sans}>
              <span
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur-md"
              >
                {service.code} — {service.discipline}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                Layer
              </span>
            </div>

            {/* Title */}
            <div className="absolute inset-x-0 bottom-0 px-6 pb-7">
              <h3
                className="text-white text-[clamp(1.75rem,2.4vw,2.4rem)] leading-[1.0]"
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
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[30px]"
              style={{
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 40px 60px -40px rgba(255,255,255,0.35)",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.article>
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
