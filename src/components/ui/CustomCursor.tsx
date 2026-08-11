"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ── Trail config ──────────────────────────────────────────────────────────────
const TRAIL_LENGTH = 14;   // number of historical positions
const TRAIL_DECAY  = 0.82; // opacity multiplier per position (0→1 = older→newer)

// ── Accent color (matches CSS --accent: 185 100% 50%) ────────────────────────
const ACCENT      = "hsl(185, 100%, 50%)";
const ACCENT_RGBA = (a: number) => `hsla(185, 100%, 50%, ${a})`;

type Pos = { x: number; y: number };

export default function CustomCursor() {
  const [ready,    setReady]    = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [isTouch,  setIsTouch]  = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Motion values ─────────────────────────────────────────────────────────
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Ring springs slightly behind the dot
  const rx = useSpring(mx, { damping: 26, stiffness: 220, mass: 0.6 });
  const ry = useSpring(my, { damping: 26, stiffness: 220, mass: 0.6 });

  // ── Trail buffer ─────────────────────────────────────────────────────────
  const trailRef    = useRef<Pos[]>([]);
  const rafRef      = useRef<number>(0);
  const curPosRef   = useRef<Pos>({ x: -200, y: -200 });

  useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(touch);
    if (touch) return;
    setReady(true);

    // ── Canvas trail renderer ───────────────────────────────────────────────
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const trail = trailRef.current;
      for (let i = 0; i < trail.length; i++) {
        // i=0 is oldest, i=length-1 is newest
        const age    = (trail.length - 1 - i) / (trail.length - 1); // 0=oldest, 1=newest
        const alpha  = Math.pow(age, 1.6) * 0.55;
        const radius = 2.5 * age + 0.5;
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = ACCENT_RGBA(alpha);
        ctx.shadowColor  = ACCENT;
        ctx.shadowBlur   = 6 * age;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Mouse tracking ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      const p = { x: e.clientX, y: e.clientY };
      curPosRef.current = p;
      mx.set(p.x);
      my.set(p.y);

      trailRef.current.push(p);
      if (trailRef.current.length > TRAIL_LENGTH) {
        trailRef.current.shift();
      }
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => { mx.set(-200); my.set(-200); trailRef.current = []; };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isTouch, mx, my]);

  // ── Interactive element detection ─────────────────────────────────────────
  useEffect(() => {
    if (isTouch) return;

    const SELECTOR = [
      "a", "button", '[role="button"]',
      "input", "textarea", "select", "label",
      "[data-cursor]", ".card-surface", ".card-ink",
      ".glass-panel",
    ].join(", ");

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    const bind = () => {
      const els = document.querySelectorAll<Element>(SELECTOR);
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
      return els;
    };

    let els = bind();

    const observer = new MutationObserver(() => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      els = bind();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      observer.disconnect();
    };
  }, [isTouch]);

  // ── Hide native cursor globally ───────────────────────────────────────────
  useEffect(() => {
    if (isTouch) return;
    document.documentElement.style.cursor = "none";
    return () => { document.documentElement.style.cursor = ""; };
  }, [isTouch]);

  if (isTouch || !ready) return null;

  return (
    <>
      {/* Trail canvas — full-screen, behind everything */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9990]"
        aria-hidden
      />

      {/* ── Inner dot — exact position, no lag ── */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: clicking ? 0.55 : hovering ? 0 : 1,
          opacity: hovering ? 0 : 1,
        }}
        transition={{ scale: { type: "spring", stiffness: 600, damping: 22 } }}
      >
        <div
          style={{
            width:  8,
            height: 8,
            borderRadius: "50%",
            background: ACCENT,
            boxShadow: `0 0 8px 2px ${ACCENT_RGBA(0.7)}, 0 0 2px 1px ${ACCENT_RGBA(0.9)}`,
            filter: "blur(0.3px)",
          }}
        />
      </motion.div>

      {/* ── Outer ring — springs behind cursor, expands on hover ── */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width:  clicking ? 28 : hovering ? 52 : 36,
          height: clicking ? 28 : hovering ? 52 : 36,
          opacity: 1,
          rotate: hovering ? 45 : 0,
        }}
        transition={{
          width:   { type: "spring", stiffness: 280, damping: 22 },
          height:  { type: "spring", stiffness: 280, damping: 22 },
          rotate:  { type: "spring", stiffness: 200, damping: 18 },
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            border:      `1.5px solid ${ACCENT_RGBA(hovering ? 0.85 : 0.5)}`,
            boxShadow:   hovering
              ? `0 0 12px 2px ${ACCENT_RGBA(0.35)}, inset 0 0 6px ${ACCENT_RGBA(0.12)}`
              : `0 0 6px 1px ${ACCENT_RGBA(0.18)}`,
            background: hovering ? ACCENT_RGBA(0.04) : "transparent",
            transition:  "border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
          }}
        />

        {/* Two small "corner" tick marks visible on hover — gives it a targeting-reticle feel */}
        {hovering && (
          <>
            {[0, 90, 180, 270].map((deg) => (
              <motion.span
                key={deg}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute"
                style={{
                  width:  6,
                  height: 6,
                  top:   "50%",
                  left:  "50%",
                  transform: `rotate(${deg}deg) translate(0, -${(hovering ? 52 : 36) / 2 - 1}px) translate(-50%, -50%)`,
                  background: ACCENT,
                  borderRadius: 1,
                  boxShadow: `0 0 4px ${ACCENT}`,
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </>
  );
}
