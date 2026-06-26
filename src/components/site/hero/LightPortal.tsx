import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, RoundedBox, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { useTransform, type MotionValue } from "framer-motion";

import heroAsset from "@/assets/yeon-ritual-hero.png.asset.json";

type Props = {
  progress: MotionValue<number>;
};

/**
 * LightPortal — a sheet of nearly-invisible architectural glass.
 *
 * The visitor barely perceives it at rest; only light behaves differently.
 * As the camera dollies forward, refractions strengthen, polished edges
 * brighten, and the world behind (the Showcase preview, mounted as a 3D
 * plane behind the glass) is revealed THROUGH the glass — not on top of it.
 * Finally the camera passes through and the glass dissolves.
 */
export function LightPortalCanvas({ progress }: Props) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      camera={{ position: [0, 0, 5.2], fov: 36 }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene progress={progress} />
      </Suspense>
    </Canvas>
  );
}

function Scene({ progress }: { progress: MotionValue<number> }) {
  const { camera, size } = useThree();
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const glassGroup = useRef<THREE.Group>(null);
  const glassMesh = useRef<THREE.Mesh>(null);
  const edgeGroup = useRef<THREE.Group>(null);
  const backdrop = useRef<THREE.Mesh>(null);

  // texture for the world behind the glass — same hero used by Showcase,
  // so when the camera passes through, the visual is continuous with the DOM
  // Showcase rendered below the sticky stage.
  const tex = useTexture(heroAsset.url);
  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);

  // Pointer drives subtle parallax (cursor "alters perspective").
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      pointer.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = Math.max(0, Math.min(1, progress.get()));

    // Smooth pointer (gentle natural inertia)
    const ease = Math.min(1, delta * 2.2);
    pointer.current.x += (pointer.current.tx - pointer.current.x) * ease;
    pointer.current.y += (pointer.current.ty - pointer.current.y) * ease;
    const px = pointer.current.x;
    const py = pointer.current.y;

    // ——— Camera: slow architectural dolly toward the glass ———
    const cam = camera as THREE.PerspectiveCamera;
    // Eased progress so motion feels physically motivated, not linear.
    const ep = easeInOutCubic(p);
    const targetZ = THREE.MathUtils.lerp(5.2, 0.35, ep);
    const targetFov = THREE.MathUtils.lerp(36, 30, ep);
    // Tiny breathing drift + cursor parallax
    const driftX = Math.sin(t * 0.18) * 0.06 + px * 0.18;
    const driftY = Math.cos(t * 0.13) * 0.04 + py * 0.12;
    cam.position.x += (driftX - cam.position.x) * Math.min(1, delta * 1.6);
    cam.position.y += (driftY - cam.position.y) * Math.min(1, delta * 1.6);
    cam.position.z += (targetZ - cam.position.z) * Math.min(1, delta * 2.4);
    cam.fov += (targetFov - cam.fov) * Math.min(1, delta * 2.4);
    cam.lookAt(0, 0, 0);
    cam.aspect = size.width / size.height;
    cam.updateProjectionMatrix();

    // ——— Glass: barely-perceptible rotation + breathing ———
    if (glassGroup.current) {
      const idleRotY = Math.sin(t * 0.12) * 0.012;
      const idleRotX = Math.sin(t * 0.09 + 0.7) * 0.008;
      const scrollRotY = ep * 0.06; // a few degrees over the whole scroll
      glassGroup.current.rotation.y = idleRotY + scrollRotY + px * 0.02;
      glassGroup.current.rotation.x = idleRotX + py * 0.015;
      glassGroup.current.position.y = Math.sin(t * 0.18 + 1.2) * 0.01;
    }

    // ——— Glass material: clarifies + dissolves at the very end ———
    if (glassMesh.current) {
      const mat = glassMesh.current.material as any;
      // Edges/highlights strengthen mid-scroll, then everything dissolves 0.9→1
      const reveal = THREE.MathUtils.smoothstep(p, 0.15, 0.75);
      const dissolve = 1 - THREE.MathUtils.smoothstep(p, 0.88, 1);
      if (mat) {
        mat.transmission = 1;
        mat.thickness = 0.18 + reveal * 0.22;
        mat.chromaticAberration = 0.012 + reveal * 0.035;
        mat.distortion = 0.02 + reveal * 0.04;
        mat.distortionScale = 0.25;
        mat.temporalDistortion = 0.08;
        mat.roughness = 0.0;
        mat.ior = 1.5;
        mat.opacity = dissolve;
        mat.transparent = true;
      }
    }

    // ——— Polished edge brightens as we approach, then dissolves ———
    if (edgeGroup.current) {
      const reveal = THREE.MathUtils.smoothstep(p, 0.1, 0.8);
      const dissolve = 1 - THREE.MathUtils.smoothstep(p, 0.88, 1);
      edgeGroup.current.traverse((obj) => {
        const m = (obj as THREE.Mesh).material as THREE.MeshPhysicalMaterial | undefined;
        if (m && "emissiveIntensity" in m) {
          m.emissiveIntensity = (0.08 + reveal * 0.65) * dissolve;
          m.opacity = 0.95 * dissolve;
          m.transparent = true;
        }
      });
    }

    // ——— Backdrop (the Showcase world behind the glass) ———
    if (backdrop.current) {
      // Already exists in the world; only its presence to the camera grows
      // as we move closer. No fade-in tricks — atmospheric haze clears.
      const mat = backdrop.current.material as THREE.MeshBasicMaterial;
      // Reveal range tuned so that by the time we are at the glass, the
      // image is essentially fully clear and matches the DOM Showcase below.
      const clarity = THREE.MathUtils.smoothstep(p, 0.25, 0.95);
      mat.opacity = clarity;
      mat.transparent = true;
    }
  });

  // Sheet proportions — large monumental pane of architectural glazing.
  const W = 3.4;
  const H = 4.8;
  const T = 0.06;

  return (
    <>
      <Environment preset="apartment" environmentIntensity={0.55} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={0.9} color={"#fbf7f1"} />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} color={"#e8efe9"} />

      {/* Backdrop world (the Showcase preview) — sits behind the glass */}
      <mesh ref={backdrop} position={[0, 0, -2.6]}>
        <planeGeometry args={[7.2, 4.05]} />
        <meshBasicMaterial map={tex} transparent opacity={0} toneMapped={false} />
      </mesh>

      {/* Soft atmospheric haze plane between backdrop and glass */}
      <mesh position={[0, 0, -1.2]}>
        <planeGeometry args={[14, 9]} />
        <meshBasicMaterial color={"#f6f4ef"} transparent opacity={0.06} depthWrite={false} />
      </mesh>

      <group ref={glassGroup}>
        {/* The sheet of museum glass — nearly invisible. */}
        <RoundedBox
          ref={glassMesh}
          args={[W, H, T]}
          radius={0.04}
          smoothness={6}
        >
          <MeshTransmissionMaterial
            transmission={1}
            ior={1.5}
            thickness={0.18}
            chromaticAberration={0.012}
            anisotropicBlur={0.1}
            distortion={0.02}
            distortionScale={0.25}
            temporalDistortion={0.08}
            roughness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            attenuationDistance={3}
            attenuationColor={"#f4f7f3"}
            backside={false}
            samples={6}
            resolution={512}
          />
        </RoundedBox>

        {/* Edge frame — four very thin polished highlights */}
        <group ref={edgeGroup}>
          <EdgeFrame width={W} height={H} thickness={T} />
        </group>
      </group>
    </>
  );
}

function EdgeFrame({ width, height, thickness }: { width: number; height: number; thickness: number }) {
  const edgeColor = "#f5f7f3";
  const w = 0.012;
  const t = thickness * 1.05;
  // Four thin strips along the perimeter — they catch light as if the pane
  // were beveled. Material is mostly emissive so the edges glow softly.
  return (
    <group>
      {[
        { pos: [0, height / 2, 0], size: [width, w, t] },
        { pos: [0, -height / 2, 0], size: [width, w, t] },
        { pos: [width / 2, 0, 0], size: [w, height, t] },
        { pos: [-width / 2, 0, 0], size: [w, height, t] },
      ].map((s, i) => (
        <mesh key={i} position={s.pos as [number, number, number]}>
          <boxGeometry args={s.size as [number, number, number]} />
          <meshPhysicalMaterial
            color={edgeColor}
            emissive={edgeColor}
            emissiveIntensity={0.2}
            metalness={0.6}
            roughness={0.05}
            transparent
            opacity={0.95}
          />
        </mesh>
      ))}
    </group>
  );
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/**
 * Subtle SVG dispersion arcs that ride along the perimeter of the visible
 * glass — adds the "rainbow whisper" without dominating. Pure CSS overlay,
 * doesn't cost a frame.
 */
export function PortalDispersion({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.15, 0.7, 0.92, 1], [0.55, 0.7, 0.95, 0.5, 0]);
  const rotate = useTransform(progress, [0, 1], [0, 4]);
  const scale = useTransform(progress, [0, 1], [1, 1.18]);
  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <motion.div
        style={{
          width: "min(46vw, 540px)",
          height: "min(78vh, 760px)",
          position: "relative",
          rotate,
          scale,
        }}
        className="rounded-[4px]"
      >
        {/* Faint outer halo — the only proof the glass is there at rest */}
        <span
          className="absolute -inset-2 rounded-[8px]"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.55), 0 0 60px 0 rgba(190,210,200,0.18), inset 0 0 0 1px rgba(255,255,255,0.45)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.0) 30%, rgba(255,255,255,0.0) 70%, rgba(255,255,255,0.05) 100%)",
          }}
        />
        {/* Travelling highlight — slow, alive */}
        <span
          className="absolute inset-0 overflow-hidden rounded-[4px]"
          style={{ mixBlendMode: "screen" }}
        >
          <span
            className="absolute -inset-y-10 left-0 w-[40%] animate-[portal-highlight_14s_ease-in-out_infinite] opacity-70"
            style={{
              background:
                "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.0) 30%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.0) 70%, transparent 100%)",
              filter: "blur(6px)",
            }}
          />
        </span>
        {/* corner spectral fringes */}
        {([
          ["-top-1 -left-1", "radial-gradient(circle at 0% 0%, rgba(255,170,170,0.55), rgba(180,220,255,0) 60%)"],
          ["-top-1 -right-1", "radial-gradient(circle at 100% 0%, rgba(180,255,210,0.5), rgba(180,200,255,0) 60%)"],
          ["-bottom-1 -left-1", "radial-gradient(circle at 0% 100%, rgba(200,210,255,0.5), rgba(255,210,180,0) 60%)"],
          ["-bottom-1 -right-1", "radial-gradient(circle at 100% 100%, rgba(255,220,180,0.55), rgba(180,255,220,0) 60%)"],
        ] as const).map(([pos, bg], i) => (
          <span
            key={i}
            className={`absolute ${pos} h-32 w-32 rounded-full blur-2xl`}
            style={{ background: bg as string, mixBlendMode: "screen" }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
