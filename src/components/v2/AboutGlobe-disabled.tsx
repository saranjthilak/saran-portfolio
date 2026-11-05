"use client";

/**
 * AboutGlobe — wireframe data globe for the About section.
 * Slow-rotating icosahedron shell + node field + orbit rings,
 * with a subtle cursor parallax. Real 3D via react-three-fiber.
 * Dynamically imported with ssr:false by the consuming section.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import * as THREE from "three";

const FALLBACK_ACCENT = "#00df8f";

function useAccentColor(): string {
  const [color, setColor] = useState(FALLBACK_ACCENT);

  useEffect(() => {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    // Accent token is stored as "H S% L%" (e.g. "158 100% 44%")
    const parts = raw.split(/\s+/).map(Number);
    if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
      const c = new THREE.Color();
      c.setHSL(parts[0] / 360, parts[1] / 100, parts[2] / 100);
      setColor(`#${c.getHexString()}`);
    }
  }, []);

  return color;
}

/** Evenly distributed points on a unit sphere (fibonacci lattice). */
function fibonacciSphere(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    arr[i * 3] = Math.cos(theta) * radius;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = Math.sin(theta) * radius;
  }
  return arr;
}

interface GlobeProps {
  accent: string;
  reducedMotion: boolean;
}

function Globe({ accent, reducedMotion }: GlobeProps) {
  const parallax = useRef<THREE.Group>(null!);
  const spin = useRef<THREE.Group>(null!);
  const shell = useRef<THREE.Mesh>(null!);
  const ringA = useRef<THREE.Mesh>(null!);
  const ringB = useRef<THREE.Mesh>(null!);

  const nodes = useMemo(() => fibonacciSphere(220), []);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    if (!reducedMotion) {
      // Slow axial spin + gentle shell wobble
      spin.current.rotation.y += d * 0.14;
      shell.current.rotation.x = Math.sin(t * 0.18) * 0.1;
      ringA.current.rotation.z += d * 0.06;
      ringB.current.rotation.z -= d * 0.045;
    }

    // Cursor parallax — eased so it feels like a gimbal, not a mirror
    const ease = Math.min(1, d * 2.4);
    parallax.current.rotation.y +=
      (state.pointer.x * 0.28 - parallax.current.rotation.y) * ease;
    parallax.current.rotation.x +=
      (-state.pointer.y * 0.2 - parallax.current.rotation.x) * ease;
  });

  return (
    <group ref={parallax} scale={1}>
      <group ref={spin}>
        {/* Outer wireframe shell */}
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial
            wireframe
            color={accent}
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>
        {/* Inner denser shell for depth */}
        <mesh scale={0.97}>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshBasicMaterial
            wireframe
            color={accent}
            transparent
            opacity={0.1}
            depthWrite={false}
          />
        </mesh>
        {/* Node field on the sphere surface */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[nodes, 3]}
              count={nodes.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            color={accent}
            transparent
            opacity={0.85}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {/* Orbit rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.3, 0.35, 0]}>
        <torusGeometry args={[2.15, 0.006, 8, 160]} />
        <meshBasicMaterial color={accent} transparent opacity={0.3} depthWrite={false} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.75, -0.55, 0.4]}>
        <torusGeometry args={[1.95, 0.004, 8, 160]} />
        <meshBasicMaterial color={accent} transparent opacity={0.18} depthWrite={false} />
      </mesh>
    </group>
  );
}

interface AboutGlobeProps {
  className?: string;
  style?: CSSProperties;
}

export default function AboutGlobe({ className = "", style }: AboutGlobeProps) {
  const accent = useAccentColor();
  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={style}
      data-about-globe
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <Globe accent={accent} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
