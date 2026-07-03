import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Reveal } from "./primitives";
import stationeryImg from "@/assets/collage-stationery-v2.png.asset.json";
import glassImg from "@/assets/collage-glass.png.asset.json";
import monogramImg from "@/assets/collage-monogram.png.asset.json";
import analyticsImg from "@/assets/collage-analytics.png.asset.json";

const shadowRest = "0 10px 40px rgba(0,0,0,0.05)";
const shadowDeep = "0 30px 80px rgba(0,0,0,0.20)";

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
  opacity,
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
  style?: React.CSSProperties;
  motionProps: TileMotion;
  shadow: MotionValue<string>;
  opacity: MotionValue<number>;
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

export function Collage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progress 0 -> 1 as the section moves through the viewport.
  // "end end" so the animation completes only when the section's bottom
  // reaches the viewport bottom — giving the user dwell time to view the
  // collage before it opens up.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Animation window: user views the collage at rest, then scrolling opens it.
  // A0 = activation, A1 = perspective/shadow settled, A2 = fully separated.
  const A0 = 0.35;
  const A1 = 0.50;
  const A2 = 0.95;

  const perspective = useTransform(scrollYProgress, [A0, A1], [1400, 2100], { clamp: true });
  const shadow = useTransform(scrollYProgress, [A0, A1], [shadowRest, shadowDeep]);

  const k = reduce ? 0 : 1;
  const rotK = reduce ? 0 : 1;

  const stX = useTransform(scrollYProgress, [A0, A2], ["0vw", `${-55 * k}vw`]);
  const stY = useTransform(scrollYProgress, [A0, A2], ["0vh", `${-8 * k}vh`]);
  const stRY = useTransform(scrollYProgress, [A0, A1, A2], [0, -3 * rotK, 10 * rotK]);
  const stRX = useTransform(scrollYProgress, [A0, A2], [0, 0]);
  const stZ = useTransform(scrollYProgress, [A0, A1, A2], [0, 40, 120]);

  const anX = useTransform(scrollYProgress, [A0, A2], ["0vw", "0vw"]);
  const anY = useTransform(scrollYProgress, [A0, A2], ["0vh", `${-95 * k}vh`]);
  const anRY = useTransform(scrollYProgress, [A0, A2], [0, 0]);
  const anRX = useTransform(scrollYProgress, [A0, A2], [0, -8 * rotK]);
  const anZ = useTransform(scrollYProgress, [A0, A1, A2], [0, 30, 80]);

  const mgX = useTransform(scrollYProgress, [A0, A2], ["0vw", `${65 * k}vw`]);
  const mgY = useTransform(scrollYProgress, [A0, A2], ["0vh", `${-55 * k}vh`]);
  const mgRY = useTransform(scrollYProgress, [A0, A1, A2], [0, 3 * rotK, -12 * rotK]);
  const mgRX = useTransform(scrollYProgress, [A0, A2], [0, 0]);
  const mgZ = useTransform(scrollYProgress, [A0, A1, A2], [0, 50, 140]);

  const glX = useTransform(scrollYProgress, [A0, A2], ["0vw", "0vw"]);
  const glY = useTransform(scrollYProgress, [A0, A2], ["0vh", `${-90 * k}vh`]);
  const glRY = useTransform(scrollYProgress, [A0, A2], [0, 0]);
  const glRX = useTransform(scrollYProgress, [A0, A2], [0, -8 * rotK]);
  const glZ = useTransform(scrollYProgress, [A0, A1, A2], [0, 30, 80]);

  // Fade all tiles as they clear so nothing lingers into the next section.
  const tileOpacity = useTransform(scrollYProgress, [A1, A2 - 0.08, A2], [1, 1, 0]);

  return (
    <section
      ref={wrapperRef}
      aria-label="Editorial collage"
      className="relative overflow-visible"
      style={{ backgroundColor: "#F7F6F2", zIndex: 20 }}
    >
      <div className="mx-auto max-w-[1400px] overflow-visible px-6 py-32 md:py-40">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#1a1a1a]/15" />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#8a8172]">
              Selected Surfaces
            </span>
            <span className="h-px w-10 bg-[#1a1a1a]/15" />
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            className="text-display mx-auto mt-8 max-w-[22ch] text-center text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.05] text-[#1a1a1a]"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            An art-directed system, photographed{" "}
            <span className="text-serif-italic">as one.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-[54ch] text-center text-[15px] leading-relaxed text-[#5c5648]">
            Brand, product, and interface — treated as chapters of a single
            editorial. Considered material, quiet light, museum-grade
            composition.
          </p>
        </Reveal>

        <motion.div
          className="mx-auto mt-16 md:mt-20"
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
            <div style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }}>
              <Tile
                src={stationeryImg.url}
                alt="Aurelian brand identity — embossed stationery and wax seal on travertine in warm sunlight"
                className="h-full"
                position="center"
                shadow={shadow}
                motionProps={{ x: stX, y: stY, rY: stRY, rX: stRX, z: stZ }}
              />
            </div>

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

            <div style={{ gridColumn: "2 / 4", gridRow: "2 / 3" }}>
              <Tile
                src={glassImg.url}
                alt="Aurea process interface — glassmorphic strategy, design and launch modules on textured plaster"
                className="aspect-[16/9]"
                position="center"
                shadow={shadow}
                motionProps={{ x: glX, y: glY, rY: glRY, rX: glRX, z: glZ }}
              />
            </div>
          </div>
        </motion.div>
        {/* Scroll runway — gives the tile animation real dwell time without
            adding visible whitespace above the collage. */}
        <div aria-hidden style={{ height: "90vh" }} />
      </div>
    </section>
  );
}
