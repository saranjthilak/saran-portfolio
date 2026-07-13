import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

/* ── Orbiting Ring ── */
const OrbitalRing = ({ radius, speed, color, thickness = 0.015 }: { radius: number; speed: number; color: string; thickness?: number }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.5 + 0.8;
    ref.current.rotation.z = t;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, thickness, 32, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.7} />
    </mesh>
  );
};

/* ── Floating Data Particles ── */
const DataParticles = ({ count = 120 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 2.5;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#f97316"),
      new THREE.Color("#22d3ee"),
      new THREE.Color("#a855f7"),
      new THREE.Color("#f97316"),
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return cols;
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.05;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(t + i) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
};

/* ── Central Energy Core ── */
const EnergyCore = () => {
  const ref = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.2;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
  });

  return (
    <group>
      {/* Outer glow sphere */}
      <mesh ref={glowRef} scale={1.3}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={0.3}
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
      {/* Inner distorted sphere */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={ref}>
          <icosahedronGeometry args={[0.55, 4]} />
          <MeshDistortMaterial
            color="#0a0a0b"
            emissive="#f97316"
            emissiveIntensity={1.5}
            roughness={0.15}
            metalness={0.9}
            distort={0.25}
            speed={3}
          />
        </mesh>
      </Float>
    </group>
  );
};

/* ── Wireframe Icosahedron Shell ── */
const WireShell = () => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.08;
    ref.current.rotation.x = t * 0.05;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshStandardMaterial
        color="#f97316"
        emissive="#f97316"
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
};

/* ── Connection Beams (using Line geometry) ── */
const ConnectionBeams = () => {
  const groupRef = useRef<THREE.Group>(null!);

  const geometries = useMemo(() => {
    const colors = ["#f97316", "#22d3ee", "#a855f7"];
    const result: { geometry: THREE.BufferGeometry; color: string }[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(
          Math.cos(angle) * 2.5,
          (Math.random() - 0.5) * 1.5,
          Math.sin(angle) * 2.5
        ),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      result.push({ geometry: geo, color: colors[i % colors.length] });
    }
    return result;
  }, []);

  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.03;
  });

  return (
    <group ref={groupRef}>
      {geometries.map((item, i) => (
        <lineSegments key={i} geometry={item.geometry}>
          <lineBasicMaterial color={item.color} transparent opacity={0.25} />
        </lineSegments>
      ))}
    </group>
  );
};

/* ── Pulsing Energy Rings (flat) ── */
const PulseRing = ({ delay = 0 }: { delay?: number }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = ((clock.getElapsedTime() + delay) % 3) / 3;
    ref.current.scale.setScalar(0.5 + t * 3);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.15;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <ringGeometry args={[0.95, 1, 64]} />
      <meshBasicMaterial color="#f97316" transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
};

/* ── Main Scene ── */
const ContactScene3D = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-45" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0.5, 9], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          <pointLight position={[3, 3, 3]} intensity={0.8} color="#f97316" />
          <pointLight position={[-3, -2, 2]} intensity={0.4} color="#22d3ee" />
          <pointLight position={[0, -3, -2]} intensity={0.3} color="#a855f7" />

          <group position={[0, -0.8, 0]}>
            <EnergyCore />
            <WireShell />
            <OrbitalRing radius={1.2} speed={0.5} color="#f97316" thickness={0.012} />
            <OrbitalRing radius={1.6} speed={-0.3} color="#22d3ee" thickness={0.008} />
            <OrbitalRing radius={2.2} speed={0.2} color="#a855f7" thickness={0.006} />
            <ConnectionBeams />
            <PulseRing delay={0} />
            <PulseRing delay={1} />
            <PulseRing delay={2} />
          </group>
          <DataParticles count={200} />
          <Stars radius={10} depth={40} count={1000} factor={2} saturation={0.5} fade speed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ContactScene3D;
