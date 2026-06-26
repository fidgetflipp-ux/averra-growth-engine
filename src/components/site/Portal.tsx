import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Hero } from "./Hero";

import heroVideo from "@/assets/hero-bg.mp4.asset.json";

/**
 * PortalStage — the architectural light portal.
 *
 * One tall section pins a sticky viewport for the entire scroll range.
 * A single spring (`progress`) drives:
 *   • the ambient video (fades only at the very end),
 *   • the hero text (fades out as the camera leaves the room),
 *   • the R3F camera (slow architectural dolly toward the glass),
 *   • the glass material (clarifies, then dissolves on arrival),
 *   • the world behind the glass (already there, atmospheric haze clears).
 *
 * Nothing fades in. Nothing appears. The visitor simply walks deeper into
 * the same world and finds themselves inside the Showcase.
 */
export function PortalStage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // One inertial spring — the protagonist's footsteps.
  const progress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 24,
    mass: 0.9,
  });

  return (
    <section
      ref={ref}
      aria-label="Averra"
      className="relative"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <AmbientBackground progress={progress} />



        {/* Hero text */}
        <div className="absolute inset-0 z-10">
          <Hero progress={progress} />
        </div>
      </div>
    </section>
  );
}

function AmbientBackground({ progress }: { progress: MotionValue<number> }) {
  // Video drifts very gently as the camera moves forward.
  const videoY = useTransform(progress, [0, 1], ["0%", "8%"]);
  const videoScale = useTransform(progress, [0, 1], [1, 1.06]);
  // The room only fades out at the very end, as we pass through the glass.
  const videoOpacity = useTransform(progress, [0, 0.7, 1], [1, 0.85, 0]);
  const washOpacity = useTransform(progress, [0, 0.5, 1], [0.35, 0.42, 0.0]);

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

      <motion.div
        style={{ opacity: washOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/15 to-background/65"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 50% 70%, rgba(127,185,138,0.10), transparent 70%)",
        }}
      />
    </div>
  );
}
