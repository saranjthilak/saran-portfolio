import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const NODE_COUNT = 90;
const CONNECT_DIST = 1.6;
const BOUNDS = 5;

function NeuralNet() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS * 2;
      velocities[i * 3] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    return { positions, velocities };
  }, []);

  const lineGeom = useMemo(() => new THREE.BufferGeometry(), []);
  const lineColors = useMemo(() => new Float32Array(NODE_COUNT * NODE_COUNT * 6), []);
  const linePositions = useMemo(() => new Float32Array(NODE_COUNT * NODE_COUNT * 6), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pts = pointsRef.current;
    if (!pts) return;
    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < NODE_COUNT; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      for (let a = 0; a < 3; a++) {
        if (arr[i * 3 + a] > BOUNDS || arr[i * 3 + a] < -BOUNDS) {
          velocities[i * 3 + a] *= -1;
        }
      }
    }
    posAttr.needsUpdate = true;

    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECT_DIST) {
          const alpha = 1 - dist / CONNECT_DIST;
          linePositions[vertexpos++] = arr[i * 3];
          linePositions[vertexpos++] = arr[i * 3 + 1];
          linePositions[vertexpos++] = arr[i * 3 + 2];
          linePositions[vertexpos++] = arr[j * 3];
          linePositions[vertexpos++] = arr[j * 3 + 1];
          linePositions[vertexpos++] = arr[j * 3 + 2];
          // cyan -> fuchsia mix
          lineColors[colorpos++] = 0.2 * alpha;
          lineColors[colorpos++] = 0.9 * alpha;
          lineColors[colorpos++] = 1.0 * alpha;
          lineColors[colorpos++] = 0.95 * alpha;
          lineColors[colorpos++] = 0.3 * alpha;
          lineColors[colorpos++] = 1.0 * alpha;
          numConnected++;
        }
      }
    }
    lineGeom.setDrawRange(0, numConnected * 2);
    const lp = lineGeom.getAttribute("position") as THREE.BufferAttribute | undefined;
    const lc = lineGeom.getAttribute("color") as THREE.BufferAttribute | undefined;
    if (lp) lp.needsUpdate = true;
    if (lc) lc.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
    }
  });

  // attach attributes once
  useMemo(() => {
    lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeom.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
  }, [lineGeom, linePositions, lineColors]);

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#67e8f9"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeom}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

const NeuralNetBackdrop = () => {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <NeuralNet />
      </Canvas>
    </div>
  );
};

export default NeuralNetBackdrop;