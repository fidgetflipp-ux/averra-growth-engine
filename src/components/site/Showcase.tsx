import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, RoundedBox, Environment, ContactShadows } from "@react-three/drei";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import * as THREE from "three";
import { Eyebrow, Reveal } from "./primitives";

// ————————————————————————————————————————————————————————————————
// Centerpiece — a floating glass "workspace" panel
// Compact (~400px on screen), Apple/Linear/Raycast register.
// ————————————————————————————————————————————————————————————————

function GlassPanel({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    if (!group.current) return;
    const p = progress.get();
    // Restrained dual-axis rotation tied to scroll + tiny ambient float
    const targetY = THREE.MathUtils.lerp(-0.45, 0.45, p);
    const targetX = THREE.MathUtils.lerp(-0.12, 0.18, p) + Math.sin(t.current * 0.6) * 0.015;
    const targetFloat = Math.sin(t.current * 0.9) * 0.04;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.06;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.06;
    group.current.position.y += (targetFloat - group.current.position.y) * 0.08;
  });

  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        transmission: 0.92,
        thickness: 0.4,
        roughness: 0.12,
        metalness: 0,
        ior: 1.35,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        attenuationColor: new THREE.Color("#e8f3ec"),
        attenuationDistance: 1.6,
        envMapIntensity: 0.8,
      }),
    [],
  );

  const innerMatte = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f6f8f6",
        roughness: 0.6,
        metalness: 0,
      }),
    [],
  );

  return (
    <group ref={group}>
      {/* Outer glass slab */}
      <RoundedBox args={[2.2, 1.45, 0.12]} radius={0.09} smoothness={8} material={glass} castShadow />

      {/* Inner panel (slightly recessed) */}
      <RoundedBox
        args={[2.05, 1.3, 0.02]}
        radius={0.07}
        smoothness={6}
        position={[0, 0, 0.062]}
        material={innerMatte}
      />

      {/* Header bar */}
      <mesh position={[-0.7, 0.5, 0.075]}>
        <planeGeometry args={[0.55, 0.06]} />
        <meshBasicMaterial color="#0f0f0f" />
      </mesh>
      {/* traffic-light dots */}
      {[-0.92, -0.84, -0.76].map((x, i) => (
        <mesh key={i} position={[x, 0.58, 0.075]}>
          <circleGeometry args={[0.022, 24]} />
          <meshBasicMaterial color={["#e2e2e2", "#e2e2e2", "#e2e2e2"][i]} />
        </mesh>
      ))}

      {/* Sidebar */}
      <mesh position={[-0.78, -0.05, 0.075]}>
        <planeGeometry args={[0.34, 0.95]} />
        <meshBasicMaterial color="#eef2ee" />
      </mesh>
      {[0.28, 0.18, 0.08, -0.02, -0.12, -0.22].map((y, i) => (
        <mesh key={i} position={[-0.78, y, 0.077]}>
          <planeGeometry args={[0.26, 0.04]} />
          <meshBasicMaterial color={i === 1 ? "#cfe6d5" : "#dde3dd"} />
        </mesh>
      ))}

      {/* Main content — chart bars */}
      {[
        [-0.35, 0.35],
        [-0.18, 0.46],
        [-0.01, 0.3],
        [0.16, 0.5],
        [0.33, 0.42],
        [0.5, 0.58],
        [0.67, 0.48],
      ].map(([x, h], i) => (
        <mesh key={i} position={[x, -0.18 + h / 2, 0.077]}>
          <planeGeometry args={[0.09, h]} />
          <meshBasicMaterial color={i === 5 ? "#7fb98a" : "#dfe6df"} />
        </mesh>
      ))}

      {/* KPI row */}
      <mesh position={[-0.05, -0.45, 0.077]}>
        <planeGeometry args={[1, 0.14]} />
        <meshBasicMaterial color="#f0f4f0" />
      </mesh>
      <mesh position={[-0.32, -0.45, 0.078]}>
        <planeGeometry args={[0.22, 0.06]} />
        <meshBasicMaterial color="#7fb98a" />
      </mesh>
      <mesh position={[-0.05, -0.45, 0.078]}>
        <planeGeometry args={[0.22, 0.06]} />
        <meshBasicMaterial color="#1f1f1f" />
      </mesh>
      <mesh position={[0.22, -0.45, 0.078]}>
        <planeGeometry args={[0.22, 0.06]} />
        <meshBasicMaterial color="#cfd4cf" />
      </mesh>

      {/* Subtle green accent ring at corner */}
      <mesh position={[0.92, 0.55, 0.078]}>
        <circleGeometry args={[0.04, 32]} />
        <meshBasicMaterial color="#7fb98a" />
      </mesh>
    </group>
  );
}

// ————————————————————————————————————————————————————————————————
// Orbit card — lives in real 3D space (drei <Html transform />)
// Phase window controls fade + scale; orbit math controls position.
// ————————————————————————————————————————————————————————————————

type OrbitCardProps = {
  progress: MotionValue<number>;
  phase: [number, number, number, number]; // in, full-in, full-out, out
  angle: number; // base orbit angle (radians)
  radius: number;
  height: number;
  z: number;
  children: React.ReactNode;
};

function OrbitCard({ progress, phase, angle, radius, height, z, children }: OrbitCardProps) {
  const ref = useRef<THREE.Group>(null);
  const t = useRef(Math.random() * 10);

  useFrame((_, delta) => {
    t.current += delta;
    if (!ref.current) return;
    const p = progress.get();

    // Visibility window (smooth in / out)
    const fadeIn = THREE.MathUtils.smoothstep(p, phase[0], phase[1]);
    const fadeOut = 1 - THREE.MathUtils.smoothstep(p, phase[2], phase[3]);
    const vis = Math.max(0, Math.min(fadeIn, fadeOut));

    // Phase-5 convergence — pull cards closer to the centerpiece around p=0.78–0.86
    const converge = THREE.MathUtils.smoothstep(p, 0.74, 0.82) * (1 - THREE.MathUtils.smoothstep(p, 0.86, 0.92));
    const r = THREE.MathUtils.lerp(radius, radius * 0.62, converge);

    // Orbit: base angle + gentle scroll-driven sweep + ambient bob
    const sweep = (p - 0.5) * 0.6;
    const a = angle + sweep + Math.sin(t.current * 0.4 + angle) * 0.03;
    const x = Math.cos(a) * r;
    const baseY = height + Math.sin(t.current * 0.6 + angle * 1.7) * 0.04;
    const baseZ = z + Math.sin(t.current * 0.5 + angle) * 0.08;

    ref.current.position.set(x, baseY, baseZ);
    // Slight tilt towards camera, plus tiny rotation
    ref.current.rotation.y = -a * 0.35 + Math.sin(t.current * 0.3 + angle) * 0.04;
    ref.current.rotation.x = Math.sin(t.current * 0.4 + angle) * 0.03;

    const s = 0.0001 + vis; // avoid zero-scale frustum issues
    ref.current.scale.setScalar(s);
  });

  return (
    <group ref={ref}>
      <Html
        transform
        distanceFactor={3.2}
        center
        zIndexRange={[20, 0]}
        occlude={false}
        style={{ pointerEvents: "none" }}
      >
        <div className="w-[220px] rounded-2xl border border-foreground/8 bg-white/95 p-4 shadow-card backdrop-blur-md">
          {children}
        </div>
      </Html>
    </group>
  );
}

// ————————————————————————————————————————————————————————————————
// Scene
// ————————————————————————————————————————————————————————————————

function Scene({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.1, 3.6], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.05} castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-4, 2, -2]} intensity={0.3} color="#cfe6d5" />
      <Suspense fallback={null}>
        <GlassPanel progress={progress} />
        <Environment preset="city" />

        {/* Phase 2 — first two cards */}
        <OrbitCard progress={progress} phase={[0.04, 0.12, 0.34, 0.42]} angle={-Math.PI * 0.85} radius={1.7} height={0.35} z={0.3}>
          <div className="text-eyebrow mb-2">Website progress</div>
          <div className="space-y-1.5 text-[12px]">
            <Check>Strategy complete</Check>
            <Check>Design approved</Check>
            <div className="flex items-center gap-2 text-ink-soft">
              <span className="size-1.5 rounded-full bg-brand" /> Development in progress
            </div>
          </div>
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[10px] text-ink-muted">
              <span>Build</span><span className="text-brand-ink font-medium">72%</span>
            </div>
            <div className="h-1.5 rounded-full bg-foreground/8 overflow-hidden">
              <div className="h-full w-[72%] rounded-full bg-brand" />
            </div>
          </div>
        </OrbitCard>

        <OrbitCard progress={progress} phase={[0.07, 0.15, 0.36, 0.44]} angle={Math.PI * 0.15} radius={1.7} height={0.4} z={0.4}>
          <div className="text-eyebrow mb-2">Conversion impact</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-ink">+248%</span>
            <span className="text-[11px] text-brand-ink">lead increase</span>
          </div>
          <svg viewBox="0 0 180 36" className="mt-3 h-7 w-full">
            <path d="M0,32 C30,29 60,22 90,17 C120,13 150,7 180,2" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand" />
            <path d="M0,32 C30,29 60,22 90,17 C120,13 150,7 180,2 L180,36 L0,36 Z" className="fill-brand/12" />
          </svg>
        </OrbitCard>

        {/* Phase 3 — replacements */}
        <OrbitCard progress={progress} phase={[0.32, 0.4, 0.58, 0.66]} angle={-Math.PI * 0.25} radius={1.85} height={-0.35} z={0.5}>
          <div className="text-eyebrow mb-2">Client portal</div>
          <div className="text-[12px] font-medium text-ink">2 new updates</div>
          <div className="mt-2 space-y-1 text-[11px] text-ink-soft">
            <div className="flex items-center gap-2"><span className="size-1 rounded-full bg-brand" /> Design review ready</div>
            <div className="flex items-center gap-2"><span className="size-1 rounded-full bg-foreground/30" /> Feedback received</div>
          </div>
          <div className="mt-2 text-[10px] text-ink-muted">Updated 4 min ago</div>
        </OrbitCard>

        <OrbitCard progress={progress} phase={[0.36, 0.44, 0.6, 0.68]} angle={Math.PI * 0.7} radius={1.8} height={0.05} z={-0.2}>
          <div className="text-eyebrow mb-2">Launch timeline</div>
          <ol className="space-y-1.5 text-[12px] text-ink-soft">
            <li className="flex items-center gap-2"><span className="text-ink-muted font-mono text-[10px] w-10">Day 1</span> Strategy</li>
            <li className="flex items-center gap-2"><span className="text-ink-muted font-mono text-[10px] w-10">Day 3</span> Design</li>
            <li className="flex items-center gap-2"><span className="text-ink-muted font-mono text-[10px] w-10">Day 7</span> Development</li>
            <li className="flex items-center gap-2 text-brand-ink font-medium"><span className="font-mono text-[10px] w-10">Day 10</span> Launch</li>
          </ol>
        </OrbitCard>

        {/* Phase 4 — more cards */}
        <OrbitCard progress={progress} phase={[0.54, 0.62, 0.82, 0.9]} angle={-Math.PI * 0.55} radius={1.75} height={0.45} z={0.2}>
          <div className="text-eyebrow mb-2">Included</div>
          <div className="space-y-1.5 text-[12px]">
            <Check small>Website design</Check>
            <Check small>Development</Check>
            <Check small>SEO setup</Check>
            <Check small>Analytics</Check>
            <Check small>CMS integration</Check>
          </div>
        </OrbitCard>

        <OrbitCard progress={progress} phase={[0.58, 0.66, 0.84, 0.92]} angle={Math.PI * 0.4} radius={1.85} height={-0.4} z={0.35}>
          <div className="mb-2 flex items-center gap-0.5">
            {[0,1,2,3,4].map((i) => (
              <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-ink">
                <path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <p className="text-[12px] leading-snug text-ink-soft">
            "Delivered in <span className="text-ink font-medium">9 days</span> — better than agencies quoting 3 months."
          </p>
          <div className="mt-2 text-[10px] text-ink-muted">— Founder, Scartec</div>
        </OrbitCard>

        <ContactShadows position={[0, -1.05, 0]} opacity={0.32} blur={2.6} far={3} resolution={1024} color="#0a0a0a" />
      </Suspense>
    </Canvas>
  );
}

function Check({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${small ? "text-[12px]" : "text-[12px]"} text-ink-soft`}>
      <svg className={`${small ? "size-3" : "size-3.5"} text-brand`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </div>
  );
}

// Client-only gate so Three doesn't run in SSR
function ClientScene({ progress }: { progress: MotionValue<number> }) {
  const [mounted, setMounted] = useState(false);
  if (typeof window === "undefined") return null;
  if (!mounted) {
    queueMicrotask(() => setMounted(true));
    return null;
  }
  return <Scene progress={progress} />;
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

  const [stage, setStage] = useState("01 — Workspace");
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next =
      p < 0.2 ? "01 — Workspace" :
      p < 0.45 ? "02 — Progress" :
      p < 0.7 ? "03 — Collaboration" :
      p < 0.9 ? "04 — Delivery" : "05 — Live";
    setStage((prev) => (prev === next ? prev : next));
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.92, 1], [1, 1, 1, 0.7]);

  return (
    <section
      ref={wrapRef}
      id="showcase"
      aria-label="A scroll-driven look inside the Averra workspace"
      className="relative bg-background"
      style={{ height: "420vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient backdrop — soft, minimal, single green bloom */}
        <div aria-hidden className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[720px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.brand.DEFAULT/0.07),transparent_65%)] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(to right, oklch(0.14 0.005 260 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.14 0.005 260 / 0.05) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 80%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        </div>

        {/* Header */}
        <motion.div style={{ opacity: headerOpacity }} className="absolute inset-x-0 top-20 z-30 mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex flex-col items-center gap-4">
              <Eyebrow>Inside the workspace</Eyebrow>
              <h2 className="text-display text-center text-[clamp(2rem,4.2vw,3.25rem)] max-w-[22ch]">
                A delivery system built like <span className="text-serif-italic">a product</span>.
              </h2>
              <span className="text-eyebrow mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-brand-ink">
                {stage}
              </span>
            </div>
          </Reveal>
        </motion.div>

        {/* 3D centerpiece (compact, centered) */}
        <div className="absolute inset-0">
          <ClientScene progress={scrollYProgress} />
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
          className="absolute inset-x-0 bottom-10 z-30 flex justify-center"
        >
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-ink-muted">
            Scroll
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
              <path d="M5 1v12m0 0L1 9m4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
