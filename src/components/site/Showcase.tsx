import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import * as THREE from "three";
import { Eyebrow, Reveal } from "./primitives";

import svcDesign from "@/assets/svc-design.jpg";
import svcDev from "@/assets/svc-dev.jpg";
import svcCro from "@/assets/svc-cro.jpg";
import heroLaptop from "@/assets/hero-laptop.jpg";

// ————————————————————————————————————————————————————————————————
// MacBook built from primitives (no external GLTF needed).
// Rotation & screen-content driven by a shared MotionValue.
// ————————————————————————————————————————————————————————————————

function MacBook({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const screenMat = useRef<THREE.MeshBasicMaterial>(null);

  const textures = useLoader(THREE.TextureLoader, [
    svcDesign,
    svcDev,
    svcCro,
    heroLaptop,
  ]);
  textures.forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });

  useFrame(() => {
    const p = progress.get();
    if (group.current) {
      // Smooth premium rotation tied to scroll
      const targetRotY = THREE.MathUtils.lerp(-0.55, 0.55, p);
      const targetRotX = THREE.MathUtils.lerp(0.05, -0.08, p);
      const targetY = THREE.MathUtils.lerp(-0.25, 0.15, p);
      group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.08;
      group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.08;
      group.current.position.y += (targetY - group.current.position.y) * 0.08;
    }
    if (lid.current) {
      // Lid opens from ~closed to fully open as the user scrolls in
      const openP = THREE.MathUtils.smoothstep(p, 0, 0.35);
      const target = THREE.MathUtils.lerp(-Math.PI * 0.5, -Math.PI * 0.08, openP);
      lid.current.rotation.x += (target - lid.current.rotation.x) * 0.09;
    }
    if (screenMat.current) {
      // Crossfade textures by swapping map between 4 stages
      const idx = Math.min(3, Math.floor(p * 4));
      if (screenMat.current.map !== textures[idx]) {
        screenMat.current.map = textures[idx];
        screenMat.current.needsUpdate = true;
      }
    }
  });

  // Aluminium look
  const aluminium = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#cfd2d6",
        metalness: 0.85,
        roughness: 0.35,
      }),
    [],
  );

  return (
    <group ref={group} position={[0, -0.25, 0]}>
      {/* Base */}
      <RoundedBox args={[3.2, 0.12, 2.2]} radius={0.06} smoothness={6} castShadow receiveShadow material={aluminium} />
      {/* Trackpad */}
      <mesh position={[0, 0.061, 0.55]} receiveShadow>
        <boxGeometry args={[1.1, 0.005, 0.75]} />
        <meshStandardMaterial color="#a8acb1" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Keyboard inset */}
      <mesh position={[0, 0.061, -0.25]} receiveShadow>
        <boxGeometry args={[2.7, 0.005, 0.9]} />
        <meshStandardMaterial color="#2a2d31" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Lid (rotates around back edge) */}
      <group ref={lid} position={[0, 0.06, -1.1]}>
        <group position={[0, 0, 1.1]}>
          {/* Lid back */}
          <RoundedBox
            args={[3.2, 2.0, 0.08]}
            radius={0.05}
            smoothness={6}
            position={[0, 1.0, -0.04]}
            castShadow
            material={aluminium}
          />
          {/* Screen (front of lid) */}
          <mesh position={[0, 1.0, 0.001]}>
            <planeGeometry args={[3.0, 1.85]} />
            <meshBasicMaterial ref={screenMat} map={textures[0]} toneMapped={false} />
          </mesh>
          {/* Screen bezel glow */}
          <mesh position={[0, 1.0, -0.001]}>
            <planeGeometry args={[3.08, 1.93]} />
            <meshBasicMaterial color="#0a0c0a" />
          </mesh>
        </group>
      </group>

      {/* Contact shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.07, 0.1]} receiveShadow>
        <planeGeometry args={[6, 4]} />
        <meshBasicMaterial color="#000" transparent opacity={0.0} />
      </mesh>
    </group>
  );
}

function Scene({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 4.6], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-5, 3, -3]} intensity={0.35} color="#b8e5c4" />
      <Suspense fallback={null}>
        <MacBook progress={progress} />
        <Environment preset="city" />
      </Suspense>
      {/* Soft contact shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]} receiveShadow>
        <circleGeometry args={[3, 64]} />
        <shadowMaterial transparent opacity={0.18} />
      </mesh>
    </Canvas>
  );
}

// ————————————————————————————————————————————————————————————————
// Floating info card — appears within a scroll progress window
// ————————————————————————————————————————————————————————————————

type CardProps = {
  progress: MotionValue<number>;
  range: [number, number, number, number]; // fade-in start, full-in, full-out start, fade-out end
  position: string; // tailwind position classes
  drift?: { x?: number; y?: number };
  children: React.ReactNode;
};

function FloatingCard({ progress, range, position, drift, children }: CardProps) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [
    24 + (drift?.y ?? 0),
    0,
    0,
    -24 + (drift?.y ?? 0),
  ]);
  const x = useTransform(progress, range, [
    (drift?.x ?? 0) + 12,
    0,
    0,
    (drift?.x ?? 0) - 12,
  ]);
  const scale = useTransform(progress, range, [0.96, 1, 1, 0.98]);

  return (
    <motion.div
      style={{ opacity, y, x, scale }}
      className={`pointer-events-none absolute ${position} z-30 hidden w-[230px] rounded-2xl border border-foreground/8 bg-white/95 p-4 shadow-card backdrop-blur md:block`}
    >
      {children}
    </motion.div>
  );
}

// ————————————————————————————————————————————————————————————————
// Section
// ————————————————————————————————————————————————————————————————

export function Showcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // Smooth progress with a tiny lerp for premium feel handled inside R3F frame.

  const stageLabel = useTransform(scrollYProgress, (p) => {
    if (p < 0.25) return "01 — Design";
    if (p < 0.5) return "02 — Development";
    if (p < 0.75) return "03 — Analytics";
    return "04 — Launch";
  });

  return (
    <section
      ref={wrapRef}
      id="showcase"
      aria-label="Scroll-driven showcase of the Averra build process"
      className="relative bg-background"
      style={{ height: "320vh" }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient backdrop */}
        <div aria-hidden className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.brand.DEFAULT/0.10),transparent_60%)] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(to right, oklch(0.14 0.005 260 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.14 0.005 260 / 0.05) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        </div>

        {/* Header */}
        <div className="absolute inset-x-0 top-16 z-20 mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex flex-col items-center gap-4">
              <Eyebrow>The build, scroll by scroll</Eyebrow>
              <h2 className="text-display text-center text-[clamp(2rem,4.5vw,3.5rem)] max-w-[20ch]">
                From first pixel to <span className="text-serif-italic">production</span>.
              </h2>
              <motion.div className="text-eyebrow mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-brand-ink">
                {stageLabel}
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* 3D stage */}
        <div className="absolute inset-0">
          <Scene progress={scrollYProgress} />
        </div>

        {/* Floating cards */}
        <div className="absolute inset-0 mx-auto max-w-7xl px-6">
          {/* Stage 1 — Design */}
          <FloatingCard
            progress={scrollYProgress}
            range={[0.02, 0.1, 0.22, 0.3]}
            position="left-4 top-[22%]"
          >
            <div className="text-eyebrow mb-2">Design approval</div>
            <p className="text-[12px] leading-snug text-ink-soft">
              Hero, services, packages — approved in <span className="text-ink font-medium">1 round</span>.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-brand-ink">
              <span className="size-1.5 rounded-full bg-brand" /> 3 / 3 screens signed off
            </div>
          </FloatingCard>

          <FloatingCard
            progress={scrollYProgress}
            range={[0.05, 0.13, 0.24, 0.32]}
            position="right-4 top-[18%]"
          >
            <div className="text-eyebrow mb-2">Website progress</div>
            <div className="mb-1 flex items-center justify-between text-[11px] text-ink-muted">
              <span>Design</span>
              <span className="text-brand-ink font-medium">100%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/8">
              <div className="h-full w-full rounded-full bg-brand" />
            </div>
            <div className="mt-2 text-[10px] text-ink-muted">Day 3 of 9</div>
          </FloatingCard>

          {/* Stage 2 — Development */}
          <FloatingCard
            progress={scrollYProgress}
            range={[0.27, 0.35, 0.47, 0.55]}
            position="left-8 top-[28%]"
          >
            <div className="text-eyebrow mb-2">Client portal</div>
            <p className="text-[12px] leading-snug text-ink-soft">
              New build deployed to staging. <span className="text-ink font-medium">12 components</span> shipped.
            </p>
            <div className="mt-2 text-[10px] text-ink-muted">Updated 4 min ago</div>
          </FloatingCard>

          <FloatingCard
            progress={scrollYProgress}
            range={[0.3, 0.38, 0.48, 0.56]}
            position="right-8 top-[24%]"
          >
            <div className="text-eyebrow mb-2">Performance</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-ink">0.6s</span>
              <span className="text-[11px] text-brand-ink">LCP</span>
            </div>
            <div className="mt-1 text-[10px] text-ink-muted">98 / 100 Lighthouse</div>
          </FloatingCard>

          {/* Stage 3 — Analytics */}
          <FloatingCard
            progress={scrollYProgress}
            range={[0.52, 0.6, 0.72, 0.8]}
            position="left-4 top-[20%]"
          >
            <div className="text-eyebrow mb-2">Analytics growth</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-ink">+3.4×</span>
              <span className="text-[11px] text-brand-ink">sessions</span>
            </div>
            <svg viewBox="0 0 180 40" className="mt-3 h-8 w-full">
              <path
                d="M0,35 C25,33 50,28 75,22 C100,18 125,12 180,3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-brand"
              />
              <path
                d="M0,35 C25,33 50,28 75,22 C100,18 125,12 180,3 L180,40 L0,40 Z"
                className="fill-brand/12"
              />
            </svg>
          </FloatingCard>

          <FloatingCard
            progress={scrollYProgress}
            range={[0.55, 0.63, 0.73, 0.81]}
            position="right-4 top-[26%]"
          >
            <div className="text-eyebrow mb-2">Conversion uplift</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-ink">+248%</span>
              <span className="text-[11px] text-brand-ink">vs. previous site</span>
            </div>
            <div className="mt-2 text-[10px] text-ink-muted">First 30 days post-launch</div>
          </FloatingCard>

          {/* Stage 4 — Launch */}
          <FloatingCard
            progress={scrollYProgress}
            range={[0.77, 0.85, 0.95, 1]}
            position="left-6 top-[24%]"
          >
            <div className="text-eyebrow mb-2">Project milestone</div>
            <div className="flex items-center gap-2 text-[12px] text-ink-soft">
              <svg className="size-3.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Production deployment
            </div>
            <div className="mt-1 flex items-center gap-2 text-[12px] text-ink-soft">
              <svg className="size-3.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              DNS + SSL live
            </div>
            <div className="mt-2 text-[10px] text-ink-muted">Shipped on day 9</div>
          </FloatingCard>

          <FloatingCard
            progress={scrollYProgress}
            range={[0.8, 0.88, 0.96, 1]}
            position="right-6 top-[22%]"
          >
            <div className="text-eyebrow mb-2">Live</div>
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              <span className="text-[12px] font-medium text-ink">Production healthy</span>
            </div>
            <div className="mt-2 text-[10px] text-ink-muted">99.99% uptime · Edge cached</div>
          </FloatingCard>
        </div>

        {/* Scroll hint */}
        <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center">
          <motion.div
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-ink-muted"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          >
            Scroll
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
              <path d="M5 1v12m0 0L1 9m4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
