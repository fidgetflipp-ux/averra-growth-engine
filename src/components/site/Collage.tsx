import { motion } from "framer-motion";
import { Reveal } from "./primitives";
import stationeryImg from "@/assets/collage-stationery-v2.png.asset.json";
import glassImg from "@/assets/collage-glass.png.asset.json";
import monogramImg from "@/assets/collage-monogram.png.asset.json";
import analyticsImg from "@/assets/collage-analytics.png.asset.json";

const ease = [0.22, 1, 0.36, 1] as const;
const shadow = "0 10px 40px rgba(0,0,0,0.05)";

function Tile({
  src,
  alt,
  className = "",
  position = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease }}
      whileHover={{ scale: 1.02 }}
      style={{
        borderRadius: 32,
        boxShadow: shadow,
        transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)",
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
  return (
    <section
      aria-label="Editorial collage"
      className="relative"
      style={{ backgroundColor: "#F7F6F2" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-32 md:py-40">
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
          <h2 className="text-display mx-auto mt-8 max-w-[22ch] text-center text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.05] text-[#1a1a1a]">
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

        {/*
          Grid: 100 cols, 24px gap.
          Row 1: left (38) | center (35) | right (22) — small rounding buffer for gaps.
          Row 2: left continues | analytics (spans center+right = 59).
        */}
        <div
          className="mx-auto mt-16 grid md:mt-20"
          style={{
            maxWidth: 1000,
            gridTemplateColumns: "38fr 35fr 22fr",
            gridTemplateRows: "auto auto",
            gap: 24,
          }}
        >
          {/* Left large — spans both rows */}
          <div style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }}>
            <Tile
              src={stationeryImg.url}
              alt="Aurelian brand identity — embossed stationery, business cards and wax seal on travertine in warm sunlight"
              className="h-full"
              position="center"
            />
          </div>

          {/* Top center — analytics tablet (landscape) */}
          <div style={{ gridColumn: "2 / 3", gridRow: "1 / 2" }}>
            <Tile
              src={analyticsImg.url}
              alt="Aurelia analytics dashboard on a tablet in an architectural travertine interior"
              className="aspect-[3/2]"
              position="center"
            />
          </div>

          {/* Top right square */}
          <div style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }}>
            <Tile
              src={monogramImg.url}
              alt="Embossed monogram mark on ivory paper"
              className="aspect-square"
              position="center"
            />
          </div>

          {/* Bottom wide — Aurea process interface (spans center + right) */}
          <div style={{ gridColumn: "2 / 4", gridRow: "2 / 3" }}>
            <Tile
              src={glassImg.url}
              alt="Aurea process interface — glassmorphic strategy, design and launch modules on textured plaster"
              className="aspect-[16/9]"
              position="center"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
