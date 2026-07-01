import { motion } from "framer-motion";
import { Reveal } from "./primitives";
import laptopImg from "@/assets/collage-laptop.png.asset.json";
import tabletImg from "@/assets/collage-tablet.png.asset.json";
import stationeryImg from "@/assets/collage-stationery.png.asset.json";

const ease = [0.22, 1, 0.36, 1] as const;

function Panel({
  className = "",
  children,
  ratio,
}: {
  className?: string;
  children: React.ReactNode;
  ratio?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group relative overflow-hidden bg-[#EFEDE6] ${className}`}
      style={{
        aspectRatio: ratio,
        transition: "box-shadow 500ms cubic-bezier(0.22,1,0.36,1)",
        boxShadow:
          "0 1px 2px rgba(30,26,20,0.04), 0 18px 40px -24px rgba(30,26,20,0.18)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[500ms] group-hover:opacity-100"
        style={{
          boxShadow:
            "0 4px 10px rgba(30,26,20,0.06), 0 40px 90px -30px rgba(30,26,20,0.32)",
        }}
      />
      {children}
    </motion.div>
  );
}

function ImagePanel({
  src,
  alt,
  className,
  ratio,
  position = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  ratio: string;
  position?: string;
}) {
  return (
    <Panel className={className} ratio={ratio}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        style={{ objectPosition: position }}
      />
    </Panel>
  );
}

function ProcessPanel() {
  const steps = [
    { k: "01", t: "Strategy", s: "Positioning · Narrative" },
    { k: "02", t: "Design & Development", s: "Art direction · Engineering" },
    { k: "03", t: "Launch & Optimization", s: "Ship · Measure · Refine" },
  ];
  return (
    <Panel ratio="16 / 9" className="!bg-[#F1EFE8]">
      {/* soft ambient wash */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 0%, rgba(255,255,255,0.7), transparent 60%), radial-gradient(100% 80% at 100% 100%, rgba(180,170,150,0.10), transparent 60%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#7a7365]">
            Averra · System
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#7a7365]">
            v04
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {steps.map((s, i) => (
            <div
              key={s.k}
              className="rounded-2xl border border-[#1a1a1a]/6 bg-white/60 p-3 backdrop-blur-md md:p-4"
              style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset" }}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === 1 ? "bg-[#7a8a5a]" : "bg-[#c9c2b1]"
                  }`}
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#8a8172]">
                  {s.k}
                </span>
              </div>
              <div className="mt-2 font-[var(--font-display)] text-[13px] leading-tight text-[#1a1a1a] md:text-[15px]">
                {s.t}
              </div>
              <div className="mt-1 text-[10px] leading-snug text-[#7a7365] md:text-[11px]">
                {s.s}
              </div>
              <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-[#1a1a1a]/6">
                <div
                  className="h-full rounded-full bg-[#1a1a1a]/40"
                  style={{ width: i === 0 ? "100%" : i === 1 ? "62%" : "12%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function LogoPanel() {
  return (
    <Panel ratio="1 / 1" className="!bg-[#F7F6F2]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg
            viewBox="0 0 120 120"
            className="h-14 w-14 md:h-16 md:w-16"
            aria-hidden
          >
            <path
              d="M60 22 L96 96 H82 L60 46 L38 96 H24 Z M46 78 H74"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <div className="mt-4 font-[var(--font-display)] text-[15px] tracking-[0.36em] text-[#1a1a1a]">
            AVERRA
          </div>
          <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.28em] text-[#8a8172]">
            Studio · MMXXVI
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.24em] text-[#8a8172]">
        Mark
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.24em] text-[#8a8172]">
        01
      </div>
    </Panel>
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
          <h2
            className="text-display mx-auto mt-8 max-w-[22ch] text-center text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.05] text-[#1a1a1a]"
          >
            An art-directed system, photographed{" "}
            <span className="text-serif-italic">as one.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-[54ch] text-center text-[15px] leading-relaxed text-[#5c5648]">
            Website, brand, product, and dashboard — treated as chapters of a
            single editorial. Considered material, quiet light, museum-grade
            composition.
          </p>
        </Reveal>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-12 gap-[2px] md:mt-20">
          {/* Left — Website Design 4:5 */}
          <div className="col-span-12 md:col-span-6 md:row-span-2">
            <ImagePanel
              src={laptopImg.url}
              alt="Website design displayed on a matte aluminum laptop within a travertine interior"
              ratio="4 / 5"
              position="center"
            />
          </div>

          {/* Top middle — Process 16:9 */}
          <div className="col-span-12 md:col-span-4">
            <ProcessPanel />
          </div>

          {/* Top right — Logo 1:1 */}
          <div className="col-span-12 md:col-span-2">
            <LogoPanel />
          </div>

          {/* Bottom wide — Analytics 16:7 */}
          <div className="col-span-12 md:col-span-6">
            <ImagePanel
              src={tabletImg.url}
              alt="Premium analytics dashboard on a tablet resting on travertine stone in warm sunlight"
              ratio="16 / 7"
              position="center"
            />
          </div>

          {/* Fifth — Brand Identity 4:5 */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <ImagePanel
              src={stationeryImg.url}
              alt="Embossed business cards, letterpress stationery and sage envelope on stone"
              ratio="4 / 5"
              position="center"
            />
          </div>

          {/* Editorial caption card to balance the grid */}
          <div className="col-span-12 lg:col-span-2">
            <Panel ratio="4 / 5" className="!bg-[#EEEBE2]">
              <div className="relative flex h-full flex-col justify-between p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8a8172]">
                  Chapter 05
                </span>
                <div>
                  <div className="font-[var(--font-display)] text-[22px] leading-[1.1] text-[#1a1a1a]">
                    Materials,
                    <br />
                    light,
                    <br />
                    restraint.
                  </div>
                  <div className="mt-4 h-px w-8 bg-[#1a1a1a]/30" />
                  <div className="mt-4 text-[11px] leading-relaxed text-[#5c5648]">
                    Travertine · Aluminum · Ivory paper · Champagne metal.
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </section>
  );
}
