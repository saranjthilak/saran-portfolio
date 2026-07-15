import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ── colour tokens (matches --primary orange) ── */
const ORB_COLOR = "rgba(249, 115, 22, 0.9)";
const ORB_GLOW = "rgba(249, 115, 22, 0.35)";
const PARTICLE_COLOR = "rgba(249, 115, 22, ##ALPHA##)"; // template
const RING_COLOR = "rgba(249, 115, 22, 0.7)";

/* ── particle system ── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const MAX_PARTICLES = 35;

const CustomCursor = () => {
  /* motion values for the main orb */
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /* orb follows tightly */
  const orbX = useSpring(mouseX, { stiffness: 600, damping: 35, mass: 0.3 });
  const orbY = useSpring(mouseY, { stiffness: 600, damping: 35, mass: 0.3 });

  /* ring follows with a softer lag */
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.6 });

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const enabledRef = useRef(true);

  /* particle canvas */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastPosRef = useRef({ x: -100, y: -100 });
  const velocityRef = useRef({ x: 0, y: 0 });



  /* ── spawn particles along the trail ── */
  const spawnParticle = useCallback((px: number, py: number, vx: number, vy: number) => {
    if (particlesRef.current.length >= MAX_PARTICLES) return;
    const speed = Math.sqrt(vx * vx + vy * vy);
    if (speed < 1.5) return; // only emit when actually moving

    const spread = Math.min(speed * 0.12, 1.8);
    const life = 25 + Math.random() * 20;
    particlesRef.current.push({
      x: px + (Math.random() - 0.5) * 4,
      y: py + (Math.random() - 0.5) * 4,
      vx: (Math.random() - 0.5) * spread - vx * 0.02,
      vy: (Math.random() - 0.5) * spread - vy * 0.02,
      life,
      maxLife: life,
      size: 1.2 + Math.random() * 1.8,
    });
  }, []);

  /* ── canvas animation loop ── */
  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* match canvas to window */
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.life -= 1;

      if (p.life <= 0) return false;

      const alpha = (p.life / p.maxLife) * 0.7;
      const radius = p.size * (p.life / p.maxLife);

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = PARTICLE_COLOR.replace("##ALPHA##", alpha.toFixed(3));
      ctx.fill();

      /* subtle glow per particle */
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = PARTICLE_COLOR.replace("##ALPHA##", (alpha * 0.15).toFixed(3));
      ctx.fill();

      return true;
    });

    rafRef.current = requestAnimationFrame(drawParticles);
  }, []);

  /* ── main event listeners ── */
  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches;
    if (isTouch) {
      enabledRef.current = false;
      return;
    }

    let spawnAccum = 0;

    const move = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      if (!visible) setVisible(true);

      /* velocity for particle spread */
      velocityRef.current = {
        x: clientX - lastPosRef.current.x,
        y: clientY - lastPosRef.current.y,
      };

      /* throttle spawning to every ~2px of travel */
      const dx = clientX - lastPosRef.current.x;
      const dy = clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      spawnAccum += dist;
      if (spawnAccum > 3) {
        spawnParticle(clientX, clientY, velocityRef.current.x, velocityRef.current.y);
        spawnAccum = 0;
      }

      lastPosRef.current = { x: clientX, y: clientY };

      /* detect interactive elements */
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]'
      );
      setHovering(interactive);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    document.documentElement.classList.add("cursor-none-root");

    /* start particle loop */
    rafRef.current = requestAnimationFrame(drawParticles);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("cursor-none-root");
      cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY, visible, spawnParticle, drawParticles]);



  if (!enabledRef.current) return null;

  return (
    <>
      {/* Particle canvas — full viewport, behind the orb */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{ opacity: visible ? 1 : 0 }}
      />

      {/* Magnetic ring (visible on hover) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 44 : 0,
            height: hovering ? 44 : 0,
            opacity: hovering ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.4 }}
          className="rounded-full"
          style={{
            border: `1.5px solid ${RING_COLOR}`,
            boxShadow: `0 0 12px ${ORB_GLOW}, inset 0 0 12px ${ORB_GLOW}`,
            background: "rgba(249, 115, 22, 0.04)",
          }}
        />
      </motion.div>

      {/* Glowing orb (always visible) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{
          x: orbX,
          y: orbY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.6 : hovering ? 0.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          {/* Outer glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 22,
              height: 22,
              borderRadius: 9999,
              background: `radial-gradient(circle, ${ORB_GLOW} 0%, transparent 70%)`,
              filter: "blur(2px)",
            }}
          />
          {/* Core orb */}
          <div
            style={{
              position: "relative",
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: `radial-gradient(circle at 35% 35%, rgba(255,200,140,0.95), ${ORB_COLOR})`,
              boxShadow: `0 0 8px ${ORB_COLOR}, 0 0 20px ${ORB_GLOW}, 0 0 40px rgba(249, 115, 22, 0.12)`,
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
