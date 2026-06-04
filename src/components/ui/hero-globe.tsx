import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const WireGlobe = () => {
  const group = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15;
      group.current.rotation.x += delta * 0.04;
    }
    if (particles.current) {
      particles.current.rotation.y -= delta * 0.05;
    }
  });

  // Particle field
  const count = 600;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 3.2 + Math.random() * 2.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return (
    <>
      <group ref={group}>
        {/* Wireframe globe */}
        <mesh>
          <icosahedronGeometry args={[2, 3]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.35} />
        </mesh>
        {/* Inner glow sphere */}
        <mesh>
          <sphereGeometry args={[1.95, 32, 32]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.06} />
        </mesh>
        {/* Outer faint ring */}
        <mesh rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[2.6, 0.01, 8, 128]} />
          <meshBasicMaterial color="#e879f9" transparent opacity={0.45} />
        </mesh>
        <mesh rotation={[Math.PI / 1.6, Math.PI / 4, 0]}>
          <torusGeometry args={[2.9, 0.008, 8, 128]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
        </mesh>
      </group>

      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#a78bfa"
          size={0.025}
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>
    </>
  );
};

const HeroGlobe = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <WireGlobe />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroGlobe;