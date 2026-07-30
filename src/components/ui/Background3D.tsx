"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1);
    dirLight1.position.set(10, 10, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x4f46e5, 0.5);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    // Premium Glass Material (MeshPhysicalMaterial)
    const createGlassMaterial = (color: number) => {
      return new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.1,
        roughness: 0.2,
        transmission: 0.9,
        ior: 1.5,
        thickness: 2,
        transparent: true,
        side: THREE.DoubleSide,
      });
    };

    // Shapes
    const shapes: { mesh: THREE.Mesh; basePosition: THREE.Vector3; speed: number }[] = [];

    // Icosahedron
    const icosahedron = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 0),
      createGlassMaterial(0x4f46e5)
    );
    scene.add(icosahedron);
    shapes.push({ mesh: icosahedron, basePosition: new THREE.Vector3(-3.5, 1.5, -2), speed: 1.5 });

    // Torus
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.4, 16, 50),
      createGlassMaterial(0xdb2777)
    );
    scene.add(torus);
    shapes.push({ mesh: torus, basePosition: new THREE.Vector3(3.5, -1.5, -1), speed: 2 });

    // Octahedron
    const octahedron = new THREE.Mesh(
      new THREE.OctahedronGeometry(1, 0),
      createGlassMaterial(0x0ea5e9)
    );
    scene.add(octahedron);
    shapes.push({ mesh: octahedron, basePosition: new THREE.Vector3(1.5, 3, -4), speed: 1 });

    // Sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      createGlassMaterial(0x10b981)
    );
    scene.add(sphere);
    shapes.push({ mesh: sphere, basePosition: new THREE.Vector3(-2, -3, -3), speed: 1.2 });

    // Animation Loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      const scrollY = window.scrollY;

      shapes.forEach(({ mesh, basePosition, speed }, i) => {
        // Base floating animation
        mesh.rotation.x = time * 0.2 * speed + i;
        mesh.rotation.y = time * 0.3 * speed + i;
        
        // Floating position offset
        const floatY = Math.sin(time * speed) * 0.5;

        // Scroll parallax
        const scrollParallaxY = scrollY * 0.002;
        const scrollParallaxRotX = scrollY * 0.0005;
        const scrollParallaxRotY = scrollY * 0.001;

        mesh.position.set(
          basePosition.x,
          basePosition.y + floatY + scrollParallaxY,
          basePosition.z
        );

        mesh.rotation.x += scrollParallaxRotX;
        mesh.rotation.y += scrollParallaxRotY;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-background/80" />
    </div>
  );
}
