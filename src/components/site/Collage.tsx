import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Reveal } from "./primitives";
import stationeryImg from "@/assets/collage-stationery-v2.png.asset.json";
import glassImg from "@/assets/collage-glass.png.asset.json";
import monogramImg from "@/assets/collage-monogram.png.asset.json";
import analyticsImg from "@/assets/collage-analytics.png.asset.json";

const shadowRest = "0 10px 40px rgba(0,0,0,0.05)";
const shadowDeep = "0 30px 80px rgba(0,0,0,0.22)";

type TileMotion = {
  x: MotionValue<string>;
  y: MotionValue<string>;
  rY: MotionValue<number>;
  rX: MotionValue<number>;
  z: MotionValue<number>;
};

function Tile({
  src,
  alt,
  className = "",
  position = "center",
  style,
  motionProps,
  shadow,
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
  style?: React.CSSProperties;
  motionProps: TileMotion;
  shadow: MotionValue<string>;
}) {
  return (
    <motion.div
      style={{
        x: motionProps.x,
        y: motionProps.y,
        rotateY: motionProps.rY,
        rotateX: motionProps.rX,
        z: motionProps.z,
        boxShadow: shadow,
        borderRadius: 32,
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...style,
      }}
      className={`relative overflow-hidden bg-[#EFEDE6] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
    </motion.div>
  );
}

function Observatory({ opacity, coreOpacity }: { opacity: MotionValue<number>; coreOpacity: MotionValue<number> }) {
  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#0A0B0F]" />
      {/* Deep radial atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, #141826 0%, #0A0B0F 55%, #05060A 100%)",
        }}
      />
      {/* Starfield — two layered dot grids */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 0.6px, transparent 0.9px)",
          backgroundSize: "3px 3px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35] animate-[drift_60s_linear_infinite]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 0.5px, transparent 0.8px)",
          backgroundSize: "5px 5px",
        }}
      />
      {/* Sage core glow */}
      <motion.div
        style={{ opacity: coreOpacity }}
        className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        // sage tint that matches site palette
        // low-opacity emerald-sage for premium feel
        // eslint-disable-next-line react/forbid-dom-props
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(196,214,180,0.55) 0%, rgba(100,140,110,0.18) 40%, transparent 70%)",
          }}
        />
      </motion.div>
      {/* Horizon line */}
      <div className="absolute inset-x-0 top-[62%] h-px bg-white/[0.08]" />
      <div className="absolute inset-x-0 top-[62%] h-px bg-white/[0.04] blur-sm" />
    </motion.div>
  );
}

export function Collage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Progress helpers — clamped ranges
  // Perspective deepens 0.10 → 0.30
  const perspective = useTransform(scrollYProgress, [0.10, 0.30], [1200, 2100], { clamp: true });

  // Shadow interpolates ivory rest → deep during activation
  const shadow = useTransform(scrollYProgress, [0.10, 0.30], [shadowRest, shadowDeep]);

  // Observatory opacity
  const observatoryOpacity = useTransform(scrollYProgress, [0.20, 0.65], [0, 1], { clamp: true });
  const coreOpacity = useTransform(scrollYProgress, [0.30, 1.0], [0, 0.9], { clamp: true });

  // Section background — ivory → transparent as the walls part
  const bgOpacity = useTransform(scrollYProgress, [0.25, 0.60], [1, 0], { clamp: true });

  // Headline drift up & dim as we descend
  const headlineY = useTransform(scrollYProgress, [0.0, 0.55], [0, -80], { clamp: true });
  const headlineOpacity = useTransform(scrollYProgress, [0.0, 0.35, 0.55], [1, 0.6, 0], { clamp: true });

  // Reveal caption at the end
  const captionOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1], { clamp: true });
  const captionY = useTransform(scrollYProgress, [0.75, 0.95], [12, 0], { clamp: true });

  // Motion scale for mobile / reduced motion
  const k = reduce ? 0 : 1;
  const rotK = reduce ? 0 : 1;

  // Per-tile transforms — start moving at 0.15, end at 1.0
  // 1. Stationery (left large) — drifts left + slight outward rotate
  const stX = useTransform(scrollYProgress, [0.15, 1.0], ["0vw", `${-55 * k}vw`]);
  const stY = useTransform(scrollYProgress, [0.15, 1.0], ["0vh", `${-8 * k}vh`]);
  const stRY = useTransform(scrollYProgress, [0.15, 0.30, 1.0], [0, -3 * rotK, 12 * rotK]);
  const stRX = useTransform(scrollYProgress, [0.15, 1.0], [0, 0]);
  const stZ = useTransform(scrollYProgress, [0.15, 0.30, 1.0], [0, 40, 120]);

  // 2. Analytics (top center) — drifts up
  const anX = useTransform(scrollYProgress, [0.15, 1.0], ["0vw", "0vw"]);
  const anY = useTransform(scrollYProgress, [0.15, 0.30, 1.0], ["0vh", `${-2 * k}vh`, `${-60 * k}vh`]);
  const anRY = useTransform(scrollYProgress, [0.15, 1.0], [0, 0]);
  const anRX = useTransform(scrollYProgress, [0.15, 1.0], [0, -10 * rotK]);
  const anZ = useTransform(scrollYProgress, [0.15, 0.30, 1.0], [0, 30, 80]);

  // 3. Monogram (top right) — drifts upper-right
  const mgX = useTransform(scrollYProgress, [0.15, 1.0], ["0vw", `${45 * k}vw`]);
  const mgY = useTransform(scrollYProgress, [0.15, 1.0], ["0vh", `${-35 * k}vh`]);
  const mgRY = useTransform(scrollYProgress, [0.15, 0.30, 1.0], [0, 3 * rotK, -14 * rotK]);
  const mgRX = useTransform(scrollYProgress, [0.15, 1.0], [0, 0]);
  const mgZ = useTransform(scrollYProgress, [0.15, 0.30, 1.0], [0, 50, 140]);

  // 4. Glass / process (bottom wide) — drifts down
  const glX = useTransform(scrollYProgress, [0.15, 1.0], ["0vw", "0vw"]);
  const glY = useTransform(scrollYProgress, [0.15, 0.30, 1.0], ["0vh", `${2 * k}vh`, `${60 * k}vh`]);
  const glRY = useTransform(scrollYProgress, [0.15, 1.0], [0, 0]);
  const glRX = useTransform(scrollYProgress, [0.15, 1.0], [0, 10 * rotK]);
  const glZ = useTransform(scrollYProgress, [0.15, 0.30, 1.0], [0, 30, 80]);

  return (
    <section
      ref={wrapperRef}
      aria-label="Editorial collage — architectural reveal"
      className="relative"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Observatory (behind everything) */}
        <Observatory opacity={observatoryOpacity} coreOpacity={coreOpacity} />

        {/* Ivory scrim on top of observatory — fades as walls part */}
        <motion.div
          aria-hidden
          style={{ opacity: bgOpacity, backgroundColor: "#F7F6F2" }}
          className="absolute inset-0"
        />

        {/* Content */}
        <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
          <div className="w-full max-w-[1400px]">
            {/* Headline */}
            <motion.div style={{ y: headlineY, opacity: headlineOpacity }}>
              <Reveal>
                <div className="flex items-center justify-center gap-3">
                  <motion.span
                    style={{ backgroundColor: useTransform(bgOpacity, [0, 1], ["rgba(255,255,255,0.3)", "rgba(26,26,26,0.15)"]) }}
                    className="h-px w-10"
                  />
                  <motion.span
                    style={{ color: useTransform(bgOpacity, [0, 1], ["rgba(255,255,255,0.7)", "#8a8172"]) }}
                    className="font-mono text-[11px] uppercase tracking-[0.24em]"
                  >
                    Selected Surfaces
                  </motion.span>
                  <motion.span
                    style={{ backgroundColor: useTransform(bgOpacity, [0, 1], ["rgba(255,255,255,0.3)", "rgba(26,26,26,0.15)"]) }}
                    className="h-px w-10"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <motion.h2
                  style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    color: useTransform(bgOpacity, [0, 1], ["#F5F3EE", "#1a1a1a"]),
                  }}
                  className="text-display mx-auto mt-6 max-w-[22ch] text-center text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05]"
                >
                  An art-directed system, photographed{" "}
                  <span className="text-serif-italic">as one.</span>
                </motion.h2>
              </Reveal>
            </motion.div>

            {/* Collage grid — the walls */}
            <motion.div
              className="mx-auto mt-10"
              style={{
                maxWidth: 1000,
                perspective,
                perspectiveOrigin: "50% 40%",
              }}
            >
              <div
                className="grid"
                style={{
                  gridTemplateColumns: "38fr 35fr 22fr",
                  gridTemplateRows: "auto auto",
                  gap: 24,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Left large — spans both rows */}
                <div style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }}>
                  <Tile
                    src={stationeryImg.url}
                    alt="Aurelian brand identity — embossed stationery and wax seal on travertine"
                    className="h-full"
                    position="center"
                    style={{ minHeight: "48vh" }}
                    shadow={shadow}
                    motionProps={{ x: stX, y: stY, rY: stRY, rX: stRX, z: stZ }}
                  />
                </div>

                {/* Top center — analytics */}
                <div style={{ gridColumn: "2 / 3", gridRow: "1 / 2" }}>
                  <Tile
                    src={analyticsImg.url}
                    alt="Aurelia analytics dashboard on a tablet"
                    className="aspect-[3/2]"
                    position="center"
                    shadow={shadow}
                    motionProps={{ x: anX, y: anY, rY: anRY, rX: anRX, z: anZ }}
                  />
                </div>

                {/* Top right — monogram */}
                <div style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }}>
                  <Tile
                    src={monogramImg.url}
                    alt="Embossed monogram mark on ivory paper"
                    className="aspect-square"
                    position="center"
                    shadow={shadow}
                    motionProps={{ x: mgX, y: mgY, rY: mgRY, rX: mgRX, z: mgZ }}
                  />
                </div>

                {/* Bottom wide — glass / process */}
                <div style={{ gridColumn: "2 / 4", gridRow: "2 / 3" }}>
                  <Tile
                    src={glassImg.url}
                    alt="Aurea process interface — glassmorphic modules on textured plaster"
                    className="aspect-[16/9]"
                    position="center"
                    shadow={shadow}
                    motionProps={{ x: glX, y: glY, rY: glRY, rX: glRX, z: glZ }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reveal caption */}
        <motion.div
          style={{ opacity: captionOpacity, y: captionY }}
          className="pointer-events-none absolute inset-x-0 bottom-24 z-20 text-center"
        >
          <p
            className="text-[clamp(1.4rem,2.4vw,2rem)] leading-tight text-white/90"
            style={{ fontFamily: "'Fraunces', 'Times New Roman', serif", fontStyle: "italic" }}
          >
            Enter the standard.
          </p>
        </motion.div>
      </div>

      {/* Local keyframes for starfield drift */}
      <style>{`
        @keyframes drift {
          0%   { background-position: 0 0; }
          100% { background-position: 200px 120px; }
        }
      `}</style>
    </section>
  );
}
