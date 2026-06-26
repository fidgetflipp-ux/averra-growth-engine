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

function AmbientBackground({ progress }: { progress: import("framer-motion").MotionValue<number> }) {
  // Video drifts and very gently scales as the camera moves forward.
  const videoY = useTransform(progress, [0, 1], ["0%", "12%"]);
  const videoScale = useTransform(progress, [0, 1], [1, 1.08]);
  // Fades only at the very end as the glass dissolves into the next room.
  const videoOpacity = useTransform(progress, [0, 0.85, 1], [1, 0.85, 0]);
  // A soft readability wash that strengthens slightly as scroll progresses,
  // keeping the monolith legible without ever washing the video out.
  const washOpacity = useTransform(progress, [0, 1], [0.35, 0.55]);

  return (
    <div aria-hidden className="absolute inset-0 bg-background">
      <motion.div
        style={{ y: videoY, scale: videoScale, opacity: videoOpacity }}
        className="absolute inset-0 will-change-transform"
      >
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      {/* Soft readability wash + sage bloom — barely there */}
      <motion.div
        style={{ opacity: washOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/15 to-background/70"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 50% 70%, rgba(127,185,138,0.10), transparent 70%)",
        }}
      />
      {/* Bottom blend into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
