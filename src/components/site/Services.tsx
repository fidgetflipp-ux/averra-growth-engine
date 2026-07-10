import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Services — "Authority isn't designed. It's engineered."
 *
 * A cinematic dark-glass environment. Rotating prismatic emblem as the
 * centerpiece, editorial word-by-word headline, magnetic CTA, and five
 * scattered floating capability cards with cursor tilt + parallax.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const playfair = { fontFamily: "'Playfair Display', serif" };
const sans = { fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" };

const headingLine1: { text: string; italic?: boolean }[] = [
  { text: "Authority" }, { text: "isn't" }, { text: "designed." },
];
const headingLine2: { text: string; italic?: boolean }[] = [
  { text: "It's" }, { text: "engineered.", italic: true },
];

type Capability = {
  code: string;
  name: string;
  italic?: string;
  copy: string;
  discipline: string;
  x: number; // horizontal px offset from container center
  y: number; // vertical px offset from container middle
  z: number; // depth px (visual only)
  rot: number; // idle rotation deg
  size: number; // scale multiplier
};

const capabilities: Capability[] = [
  { code: "01", name: "Website", italic: "Design", copy: "Interfaces engineered for conversion.", discipline: "Digital Craft", x: -440, y: 20, z: -80, rot: -5, size: 0.94 },
  { code: "02", name: "Brand", italic: "Identity", copy: "Systems that compound recognition.", discipline: "Positioning", x: -180, y: -40, z: 40, rot: 2, size: 1.02 },
  { code: "03", name: "AI", italic: "Systems", copy: "Intelligence embedded across every surface.", discipline: "Applied Intelligence", x: 90, y: 30, z: 0, rot: -2, size: 1 },
  { code: "04", name: "Automation", copy: "Operations that scale without friction.", discipline: "Runtime", x: 340, y: -20, z: -60, rot: 4, size: 0.96 },
  { code: "05", name: "Growth", copy: "Compounding demand, quarter over quarter.", discipline: "Revenue Engineering", x: 560, y: 50, z: -140, rot: -6, size: 0.9 },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const rawMx = useMotionValue(0);
  const rawMy = useMotionValue(0);
  const mx = useSpring(rawMx, { stiffness: 60, damping: 20, mass: 0.6 });
  const my = useSpring(rawMy, { stiffness: 60, damping: 20, mass: 0.6 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scrollRot = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const spotlightY = useTransform(scrollYProgress, [0, 1], ["48%", "52%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    rawMx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    rawMy.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const handleMouseLeave = () => {
    rawMx.set(0);
    rawMy.set(0);
  };

  // Parallax translations
  const bgX = useTransform(mx, (v) => v * -14);
  const bgY = useTransform(my, (v) => v * -10);
  const emblemX = useTransform(mx, (v) => v * 20);
  const emblemY = useTransform(my, (v) => v * 14);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Capabilities"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden py-40 md:py-52"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% 30%, #1c1a17 0%, #131211 45%, #0a0908 100%)",
      }}
    >
      {/* Atmospheric layers */}
      <Atmosphere spotlightY={spotlightY} bgX={bgX} bgY={bgY} />
      <Particles />

      {/* Content stack */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        {/* Floating hero emblem */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          style={{ x: emblemX, y: emblemY }}
        >
          <HeroEmblem scrollRot={scrollRot} />
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          className="mt-16 flex items-center gap-3"
          style={sans}
        >
          <span className="h-px w-8 bg-white/20" />
          <span className="text-[10px] uppercase tracking-[0.42em] text-white/50">
            The Operating Environment
          </span>
          <span className="h-px w-8 bg-white/20" />
        </motion.div>

        {/* Headline */}
        <h2
          className="mt-8 text-white text-[clamp(2.75rem,7.2vw,6.5rem)]"
          style={{ ...playfair, letterSpacing: "-0.045em", lineHeight: 0.95 }}
        >
          <div className="flex flex-wrap justify-center">
            {headingLine1.map((w, i) => (
              <WordReveal key={i} delay={0.75 + i * 0.09} italic={w.italic}>
                {w.text}
              </WordReveal>
            ))}
          </div>
          <div className="flex flex-wrap justify-center">
            {headingLine2.map((w, i) => (
              <WordReveal
                key={i}
                delay={0.75 + (headingLine1.length + i) * 0.09}
                italic={w.italic}
              >
                {w.text}
              </WordReveal>
            ))}
          </div>
        </h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, delay: 1.5, ease: EASE }}
          className="mt-10 max-w-xl text-[15px] leading-[1.7] text-white"
          style={sans}
        >
          Strategy, brand, web experience, engineering, and AI systems —
          combined into one operating environment for the companies markets
          judge themselves against.
        </motion.p>

        {/* Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, delay: 1.7, ease: EASE }}
          className="mt-12"
        >
          <MagneticCta href="#packages">Begin engineering →</MagneticCta>
        </motion.div>
      </div>

      {/* Floating showcase cards field */}
      <div className="relative z-10 mx-auto mt-32 max-w-6xl px-6" style={{ perspective: "1800px" }}>
        <div className="relative mx-auto h-[560px] w-full max-w-5xl md:h-[520px]">
          {capabilities.map((c, i) => (
            <ShowcaseCard key={c.code} cap={c} index={i} mx={mx} my={my} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero emblem — rotating prismatic monogram                                 */
/* -------------------------------------------------------------------------- */

function HeroEmblem({ scrollRot }: { scrollRot: MotionValue<number> }) {
  return (
    <div className="relative h-[180px] w-[180px]" style={{ perspective: "1200px" }}>
      {/* Bronze bloom behind */}
      <motion.div
        aria-hidden
        className="absolute inset-[-40px] rounded-full"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at center, rgba(198,148,74,0.35) 0%, rgba(198,148,74,0) 65%)",
          filter: "blur(20px)",
        }}
      />
      {/* Slow breathing float */}
      <motion.div
        className="relative h-full w-full"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Continuous rotation */}
        <motion.div
          className="relative h-full w-full"
          animate={{ rotateY: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d", rotateX: scrollRot as unknown as number }}
        >
          {/* Prism panels — stacked at different Z depths */}
          {[
            { rot: 0, z: 40, opacity: 0.85 },
            { rot: 60, z: 0, opacity: 0.7 },
            { rot: 120, z: -40, opacity: 0.55 },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                transform: `rotateY(${p.rot}deg) translateZ(${p.z}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute inset-0 rounded-[22px]"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(255,240,215,0.18) 0%, rgba(198,148,74,0.28) 45%, rgba(255,255,255,0.08) 100%)",
                  border: "1px solid rgba(255,225,180,0.35)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.4), 0 20px 40px -10px rgba(0,0,0,0.6), 0 0 40px rgba(198,148,74,0.2)",
                  opacity: p.opacity,
                  backdropFilter: "blur(8px)",
                }}
              />
            </div>
          ))}
          {/* Inner core diamond */}
          <div
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[8px]"
            style={{
              background:
                "linear-gradient(135deg, #f6ddb0 0%, #c69447 55%, #7a5220 100%)",
              boxShadow:
                "inset 0 2px 4px rgba(255,255,255,0.6), 0 0 30px rgba(198,148,74,0.5)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Word-by-word blur reveal                                                  */
/* -------------------------------------------------------------------------- */

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
    <span className="inline-block overflow-hidden pb-[0.08em] pr-[0.28em]">
      <motion.span
        initial={{ y: "60%", opacity: 0, filter: "blur(14px)" }}
        whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        className={`inline-block ${italic ? "italic font-normal" : "font-medium"}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Magnetic CTA button                                                       */
/* -------------------------------------------------------------------------- */

function MagneticCta({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 15, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 180, damping: 15, mass: 0.5 });

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    px.set((e.clientX - cx) * 0.35);
    py.set((e.clientY - cy) * 0.35);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className="p-6" onMouseMove={handleMove} onMouseLeave={reset}>
      <motion.a
        ref={ref}
        href={href}
        style={{ x: sx, y: sy }}
        whileTap={{ scale: 0.97 }}
        className="group relative inline-flex items-center gap-3 rounded-full px-9 py-5 text-[15px] font-medium text-white"
      >
        {/* Layered glass background */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full transition-all duration-500 group-hover:scale-[1.04]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(255,225,180,0.25)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.25), 0 20px 40px -20px rgba(0,0,0,0.7), 0 0 0 0 rgba(198,148,74,0)",
            backdropFilter: "blur(10px)",
          }}
        />
        {/* Bronze glow on hover */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,215,150,0.4), 0 25px 60px -20px rgba(198,148,74,0.55), 0 0 40px rgba(198,148,74,0.35)",
          }}
        />
        <span className="relative z-10" style={sans}>
          {children}
        </span>
      </motion.a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Showcase card                                                             */
/* -------------------------------------------------------------------------- */

function ShowcaseCard({
  cap,
  index,
  mx,
  my,
}: {
  cap: Capability;
  index: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lx = useMotionValue(0);
  const ly = useMotionValue(0);
  const rx = useSpring(useTransform(ly, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(lx, [-0.5, 0.5], [-10, 10]), { stiffness: 140, damping: 18 });
  const glareX = useTransform(lx, [-0.5, 0.5], ["15%", "85%"]);
  const glareY = useTransform(ly, [-0.5, 0.5], ["15%", "85%"]);
  const glareBg = useTransform(
    [glareX, glareY] as unknown as MotionValue<string>[],
    ([x, y]: string[]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,225,180,0.28), rgba(255,225,180,0) 55%)`,
  );

  // Section-level parallax offset (subtle depth)
  const parallaxX = useTransform(mx, (v) => v * (8 + (index % 3) * 3));
  const parallaxY = useTransform(my, (v) => v * (6 + (index % 3) * 3));

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    lx.set((e.clientX - r.left) / r.width - 0.5);
    ly.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    lx.set(0);
    ly.set(0);
  };

  return (
    <div
      className="absolute"
      style={{
        left: `calc(50% + ${cap.x}px)`,
        top: `calc(50% + ${cap.y}px)`,
        transform: "translate(-50%, -50%)",
        zIndex: 20 + Math.round(cap.z / 10),
      }}
    >
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        initial={{ opacity: 0, y: 60, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: cap.size }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 20,
          mass: 0.9,
          delay: 1.9 + index * 0.12,
        }}
      >

      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="group relative"
        style={{
          width: 260 * cap.size,
          transformStyle: "preserve-3d",
          rotateX: rx,
          rotateY: ry,
          rotate: cap.rot,
        }}
      >
        {/* Slow float */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Ambient glow (hover) */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[36px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(198,148,74,0.35) 0%, rgba(198,148,74,0) 65%)",
              filter: "blur(24px)",
            }}
          />

          <div
            className="relative overflow-hidden rounded-[26px] p-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(38,32,26,0.85) 0%, rgba(22,19,16,0.9) 100%)",
              border: "1px solid rgba(255,220,175,0.12)",
              boxShadow:
                "0 40px 80px -30px rgba(0,0,0,0.8), 0 20px 40px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,225,180,0.15), inset 0 -1px 0 rgba(0,0,0,0.4)",
              backdropFilter: "blur(14px) saturate(140%)",
            }}
          >
            {/* Moving specular */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: glareBg as unknown as string, mixBlendMode: "overlay" }}
            />
            {/* Passive slow sheen */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{ duration: 11, repeat: Infinity, ease: "linear", delay: index * 1.8 }}
              style={{
                background:
                  "linear-gradient(75deg, transparent 35%, rgba(255,225,180,0.08) 50%, transparent 65%)",
              }}
            />

            {/* Top meta */}
            <div className="flex items-center justify-between" style={sans}>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
                {cap.code}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#c6944a]/85">
                {cap.discipline}
              </span>
            </div>

            {/* Glyph */}
            <div className="mt-10 flex justify-start">
              <CardGlyph index={index} />
            </div>

            {/* Title */}
            <h3
              className="mt-10 text-white text-[clamp(1.5rem,2vw,2rem)] leading-[1.02]"
              style={{ ...playfair, letterSpacing: "-0.02em" }}
            >
              {cap.italic ? (
                <>
                  <span className="italic font-normal">{cap.name}</span>{" "}
                  <span className="font-medium">{cap.italic}</span>
                </>
              ) : (
                <span className="italic font-normal">{cap.name}</span>
              )}
            </h3>

            <p
              className="mt-3 text-[13px] leading-[1.6] text-white/55"
              style={sans}
            >
              {cap.copy}
            </p>

            {/* Bronze hairline */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-[#c6944a]/40 to-transparent" />
              <span
                className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/40"
                style={sans}
              >
                Layer
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function CardGlyph({ index }: { index: number }) {
  // Five different abstract SVG marks, tuned to feel like metal etchings
  const marks = [
    // 01 grid lattice
    <svg key="0" width="46" height="46" viewBox="0 0 46 46" fill="none">
      <rect x="1" y="1" width="44" height="44" rx="10" stroke="url(#g0)" strokeWidth="1" />
      <path d="M15 5v36M31 5v36M5 15h36M5 31h36" stroke="url(#g0)" strokeWidth="0.8" />
      <defs>
        <linearGradient id="g0" x1="0" y1="0" x2="46" y2="46">
          <stop stopColor="#f6ddb0" stopOpacity="0.7" /><stop offset="1" stopColor="#c6944a" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>,
    // 02 monogram
    <svg key="1" width="46" height="46" viewBox="0 0 46 46" fill="none">
      <circle cx="23" cy="23" r="20" stroke="url(#g1)" strokeWidth="1" />
      <path d="M15 30l8-20 8 20M18 24h10" stroke="url(#g1)" strokeWidth="1.2" strokeLinecap="round" />
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="46" y2="46">
          <stop stopColor="#f6ddb0" stopOpacity="0.75" /><stop offset="1" stopColor="#c6944a" stopOpacity="0.35" />
        </linearGradient>
      </defs>
    </svg>,
    // 03 neural nodes
    <svg key="2" width="46" height="46" viewBox="0 0 46 46" fill="none">
      <circle cx="9" cy="10" r="2" fill="#f6ddb0" />
      <circle cx="37" cy="10" r="2" fill="#c6944a" />
      <circle cx="23" cy="23" r="3" fill="#f6ddb0" />
      <circle cx="9" cy="36" r="2" fill="#c6944a" />
      <circle cx="37" cy="36" r="2" fill="#f6ddb0" />
      <path d="M9 10L23 23L37 10M9 36L23 23L37 36" stroke="url(#g2)" strokeWidth="0.8" />
      <defs>
        <linearGradient id="g2" x1="0" y1="0" x2="46" y2="46">
          <stop stopColor="#f6ddb0" stopOpacity="0.5" /><stop offset="1" stopColor="#c6944a" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>,
    // 04 flow arrows
    <svg key="3" width="46" height="46" viewBox="0 0 46 46" fill="none">
      <path d="M6 14h22l-4-4M6 23h32l-4-4M6 32h22l-4-4" stroke="url(#g3)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="g3" x1="0" y1="0" x2="46" y2="46">
          <stop stopColor="#f6ddb0" stopOpacity="0.7" /><stop offset="1" stopColor="#c6944a" stopOpacity="0.35" />
        </linearGradient>
      </defs>
    </svg>,
    // 05 growth chart
    <svg key="4" width="46" height="46" viewBox="0 0 46 46" fill="none">
      <path d="M5 38L15 26L22 30L33 12" stroke="url(#g4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 12h6v6" stroke="url(#g4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 5v36h36" stroke="url(#g4)" strokeWidth="0.6" strokeOpacity="0.5" />
      <defs>
        <linearGradient id="g4" x1="0" y1="0" x2="46" y2="46">
          <stop stopColor="#f6ddb0" stopOpacity="0.8" /><stop offset="1" stopColor="#c6944a" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>,
  ];
  return marks[index] ?? marks[0];
}

/* -------------------------------------------------------------------------- */
/*  Atmosphere / particles                                                    */
/* -------------------------------------------------------------------------- */

function Atmosphere({
  spotlightY,
  bgX,
  bgY,
}: {
  spotlightY: MotionValue<string>;
  bgX: MotionValue<number>;
  bgY: MotionValue<number>;
}) {
  return (
    <>
      {/* Cinematic spotlight — cursor and scroll aware */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          x: bgX,
          y: bgY,
          background: useTransform(
            spotlightY,
            (sy) =>
              `radial-gradient(ellipse 55% 50% at 50% ${sy}, rgba(255,225,180,0.14) 0%, rgba(255,225,180,0) 55%)`,
          ) as unknown as string,
        }}
      />
      {/* Bronze bloom secondary */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle 400px at 50% 25%, rgba(198,148,74,0.14) 0%, rgba(198,148,74,0) 100%)",
          filter: "blur(30px)",
        }}
      />
      {/* Soft volumetric rays */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "conic-gradient(from 200deg at 50% 30%, transparent 0deg, rgba(255,225,180,0.05) 25deg, transparent 60deg, rgba(198,148,74,0.05) 160deg, transparent 220deg, rgba(255,225,180,0.04) 320deg, transparent 360deg)",
          filter: "blur(60px)",
          mixBlendMode: "screen",
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      {/* Film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />
    </>
  );
}

function Particles() {
  const dots = Array.from({ length: 26 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 47) % 100;
        const top = (i * 31) % 100;
        const size = 1 + (i % 3);
        const dur = 16 + (i % 7) * 2;
        const delay = (i % 5) * 1.4;
        const bronze = i % 4 === 0;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: bronze ? "rgba(255,220,170,0.6)" : "rgba(255,255,255,0.4)",
              boxShadow: bronze ? "0 0 6px rgba(255,220,170,0.6)" : "none",
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
          />
        );
      })}
    </div>
  );
}
