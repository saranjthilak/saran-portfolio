import { useEffect, useRef, useCallback } from "react";

/* ── colour tokens matching the portfolio palette ── */
const COLORS = [
  { r: 249, g: 115, b: 22 },   // orange (primary)
  { r: 34,  g: 211, b: 238 },  // cyan
  { r: 232, g: 121, b: 249 },  // fuchsia
  { r: 129, g: 140, b: 248 },  // indigo
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: typeof COLORS[number];
  alpha: number;
  shape: "circle" | "square" | "triangle";
  rotation: number;
  rotationSpeed: number;
  pulsePhase: number;
  pulseSpeed: number;
}

const PARTICLE_COUNT = 45;
const BASE_ALPHA = 0.08;
const MAX_ALPHA = 0.14;
const MOUSE_RADIUS = 250;
const MOUSE_FORCE = 0.015;

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const reducedMotionRef = useRef(false);

  const createParticle = useCallback((w: number, h: number): Particle => {
    const shape = (["circle", "square", "triangle"] as const)[
      Math.floor(Math.random() * 3)
    ];
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: 3 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: BASE_ALPHA + Math.random() * 0.04,
      shape,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.008,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.005 + Math.random() * 0.01,
    };
  }, []);

  const drawTriangle = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const angle = rotation + (i * Math.PI * 2) / 3 - Math.PI / 2;
        const px = x + Math.cos(angle) * size;
        const py = y + Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    },
    []
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* size canvas to viewport */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* initialise particles */
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height)
    );

    /* mouse tracking */
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    /* render loop */
    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isReduced = reducedMotionRef.current;

      for (const p of particlesRef.current) {
        if (!isReduced) {
          /* subtle mouse repulsion */
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }

          /* drift */
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotationSpeed;
          p.pulsePhase += p.pulseSpeed;

          /* damping */
          p.vx *= 0.995;
          p.vy *= 0.995;

          /* wrap edges */
          if (p.x < -20) p.x = canvas.width + 20;
          if (p.x > canvas.width + 20) p.x = -20;
          if (p.y < -20) p.y = canvas.height + 20;
          if (p.y > canvas.height + 20) p.y = -20;
        }

        /* pulsing alpha */
        const pulse = Math.sin(p.pulsePhase) * 0.03;
        const alpha = Math.min(MAX_ALPHA, p.alpha + pulse);

        const { r, g, b } = p.color;

        /* draw glow halo */
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        /* draw shape */
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else if (p.shape === "square") {
          const half = p.size;
          ctx.beginPath();
          ctx.rect(-half, -half, half * 2, half * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          drawTriangle(ctx, 0, 0, p.size, 0);
          ctx.fill();
          ctx.stroke();
        }

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [createParticle, drawTriangle]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 1 }}
    />
  );
};

export default ParticleField;
