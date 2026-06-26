import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Hero } from "./Hero";
import { MonolithStage } from "./hero/MonolithStage";
import heroVideo from "@/assets/hero-bg.mp4.asset.json";

/**
 * PortalStage — the architectural hero.
 *
 * One tall section. Inside, a sticky viewport pins for the entire scroll
 * range. A single `useScroll` drives a single spring (`progress`) that all
 * layers read from. The hero text fades out, the monolith's three planes
 * separate while the camera dollies toward them, the glass clarifies and
 * finally dissolves — at which point the sticky releases and the next
 * section (Showcase) takes over scroll naturally.
 *
 * No layered cross-fades, no "second section sliding up". The visitor
 * walks through the object.
 */
export function PortalStage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Single inertial spring — every animation downstream reads this.
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    mass: 0.8,
  });

  return (
    <section
      ref={ref}
      aria-label="Averra"
      className="relative"
      style={{ height: "220vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Cinematic ambient background — calm, never loud */}
        <AmbientBackground progress={progress} />

        {/* The monolith — full viewport canvas */}
        <MonolithStage progress={progress} />

        {/* Hero text overlay */}
        <div className="absolute inset-0 z-10">
          <Hero progress={progress} />
        </div>
      </div>
    </section>
  );
}
