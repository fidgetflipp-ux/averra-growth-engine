import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

type Props = {
  progress: MotionValue<number>;
};

/**
 * Fused crystal monolith — three ultra-thin planes that read as one slab
 * at rest and gently separate into a portal as scroll progresses.
 */
export function Monolith({ progress }: Props) {
  const group = useRef<THREE.Group>(null);
  const planeFront = useRef<THREE.Mesh>(null);
  const planeBack = useRef<THREE.Mesh>(null);
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const { camera, size } = useThree();

  // Pointer values (smoothed in-frame for very gentle parallax)
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // We listen on the canvas DOM (set in MonolithStage). Here we sample
  // the framework-provided normalized device coords via useThree's mouse
  // — drei/r3f updates this automatically on pointer move within canvas.
  // Fallback: window mouse for outside canvas.
  useMemo(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      pointer.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Cache the perspective camera ref via three's camera
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = Math.max(0, Math.min(1, progress.get()));

    // Smooth pointer
    pointer.current.x += (pointer.current.tx - pointer.current.x) * Math.min(1, delta * 3.5);
    pointer.current.y += (pointer.current.ty - pointer.current.y) * Math.min(1, delta * 3.5);
    const px = pointer.current.x;
    const py = pointer.current.y;

    // ——— Group ambient motion (very slow) ———
    if (group.current) {
      const idleRotY = Math.sin(t * (2 * Math.PI) / 14) * 0.04;
      const idleRotX = Math.sin(t * (2 * Math.PI) / 18 + 1.3) * 0.015;
      const idleY = Math.sin(t * (2 * Math.PI) / 9 + 0.6) * 0.012;

      // Scroll-driven additions
      const liftY = p * 0.18;
      const rotYScroll = Math.sin(p * Math.PI) * 0.18; // pan around mid-progress
      const dollyZ = -p * 0.6; // group shifts a touch toward camera

      group.current.rotation.y = idleRotY + rotYScroll + px * 0.06;
      group.current.rotation.x = idleRotX + py * 0.04;
      group.current.position.y = idleY + liftY;
      group.current.position.x = px * 0.05;
      group.current.position.z = dollyZ;
    }

    // ——— Plane separation ———
    if (planeFront.current && planeBack.current) {
      const sep = p; // raw progress for separation
      planeFront.current.position.z = 0 + sep * 0.10;
      planeBack.current.position.z = -0.036 - sep * 0.10;
      planeFront.current.rotation.y = sep * 0.06;
      planeBack.current.rotation.y = -sep * 0.06;

      // Portal-formation scale on the outer panes
      const portalScale = 1 + Math.max(0, (p - 0.6) / 0.25) * 1.4;
      planeFront.current.scale.set(portalScale, portalScale, 1);
      planeBack.current.scale.set(portalScale, portalScale, 1);

      // Material clarity + dissolve
      const mats = [planeFront.current, planeBack.current].map(
        (m) => m.material as THREE.MeshPhysicalMaterial,
      );
      const clarity = 1 - Math.max(0, (p - 0.6) / 0.25) * 0.8;
      const dissolve = 1 - Math.max(0, (p - 0.85) / 0.15);
      mats.forEach((m) => {
        m.thickness = 0.6 * clarity;
        m.roughness = 0.05 * clarity;
        m.opacity = dissolve;
        m.envMapIntensity = 0.7 + Math.max(0, (p - 0.85) / 0.15) * 0.8;
      });
    }

    // ——— Camera dolly ———
    const cam = camera as THREE.PerspectiveCamera;
    const targetZ = THREE.MathUtils.lerp(3.2, 0.9, p);
    const targetFov = THREE.MathUtils.lerp(32, 24, p);
    cam.position.z += (targetZ - cam.position.z) * Math.min(1, delta * 4);
    cam.fov += (targetFov - cam.fov) * Math.min(1, delta * 4);
    cam.updateProjectionMatrix();

    // ——— Key light follows pointer subtly ———
    if (keyLight.current) {
      keyLight.current.position.x = 2 + px * 0.6;
      keyLight.current.position.y = 2.4 + py * 0.4;
      keyLight.current.intensity = 1.1 + p * 0.15;
    }

    // Maintain aspect
    cam.aspect = size.width / size.height;
  });

  // Slab proportions
  const W = 1.0;
  const H = 1.55;
  const T_OUTER = 0.020;
  const T_CORE = 0.024;

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.25} />
      <directionalLight
        ref={keyLight}
        position={[2, 2.4, 3]}
        intensity={1.1}
        color={"#fbf7f1"}
      />
      <directionalLight position={[-2, 1.5, -1.5]} intensity={0.35} color={"#e8efe9"} />

      <group ref={group}>
        {/* Back plane */}
        <RoundedBox
          ref={planeBack}
          args={[W, H, T_OUTER]}
          radius={0.04}
          smoothness={6}
          position={[0, 0, -0.036]}
        >
          <meshPhysicalMaterial
            transparent
            transmission={1}
            ior={1.45}
            thickness={0.6}
            roughness={0.05}
            metalness={0}
            attenuationColor={"#e8efe9"}
            attenuationDistance={1.8}
            clearcoat={1}
            clearcoatRoughness={0.08}
            envMapIntensity={0.7}
          />
        </RoundedBox>

        {/* Core */}
        <RoundedBox
          args={[W, H, T_CORE]}
          radius={0.04}
          smoothness={6}
          position={[0, 0, -0.018]}
        >
          <meshPhysicalMaterial
            transparent
            transmission={1}
            ior={1.45}
            thickness={0.8}
            roughness={0.04}
            metalness={0}
            attenuationColor={"#e8efe9"}
            attenuationDistance={1.6}
            clearcoat={1}
            clearcoatRoughness={0.06}
            envMapIntensity={0.75}
          />
        </RoundedBox>

        {/* Front plane */}
        <RoundedBox
          ref={planeFront}
          args={[W, H, T_OUTER]}
          radius={0.04}
          smoothness={6}
          position={[0, 0, 0]}
        >
          <meshPhysicalMaterial
            transparent
            transmission={1}
            ior={1.45}
            thickness={0.6}
            roughness={0.05}
            metalness={0}
            attenuationColor={"#e8efe9"}
            attenuationDistance={1.8}
            clearcoat={1}
            clearcoatRoughness={0.08}
            envMapIntensity={0.7}
          />
        </RoundedBox>
      </group>
    </>
  );
}
