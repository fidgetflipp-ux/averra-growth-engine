import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import * as THREE from "three";
import { Monolith } from "./Monolith";

type Props = {
  progress: MotionValue<number>;
};

/**
 * Hosts the R3F canvas. Sized via CSS — at idle a ~520px column,
 * scaled up by the portal transition as the camera approaches.
 */
export function MonolithStage({ progress }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // Pause raf when offscreen
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Stage scales up to fill viewport as portal forms
  const scale = useTransform(progress, [0, 0.6, 1], [1, 1.6, 2.6]);
  const opacity = useTransform(progress, [0, 0.92, 1], [1, 1, 0]);
  // Soft floor shadow stretches as monolith lifts
  const shadowOpacity = useTransform(progress, [0, 0.5, 0.85], [0.18, 0.12, 0]);
  const shadowScale = useTransform(progress, [0, 1], [1, 1.8]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ scale, opacity }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
    >
      <div className="relative h-[78vh] max-h-[760px] w-[min(46vw,520px)]">
        <Canvas
          dpr={[1, 1.75]}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
          camera={{ position: [0, 0, 3.2], fov: 32 }}
          frameloop={active ? "always" : "demand"}
          style={{ background: "transparent" }}
        >
          <Monolith progress={progress} />
        </Canvas>

        {/* Soft floor contact shadow (CSS, not 3D) */}
        <motion.div
          style={{ opacity: shadowOpacity, scaleX: shadowScale }}
          className="pointer-events-none absolute left-1/2 bottom-[-4%] h-10 w-[70%] -translate-x-1/2 rounded-[50%] bg-foreground/60 blur-2xl"
        />
      </div>
    </motion.div>
  );
}
