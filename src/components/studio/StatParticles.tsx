"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 9;
const DOTS_PER_COL = 5;
const W = 160;
const H = 56;
const DURATION = 850;

// deterministic pseudo-random so SSR/CSR agree
const rand = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

type Dot = { x0: number; y0: number; x1: number; y1: number; d: number; r: number };

const buildDots = (seed: number, shape: number[]): Dot[] => {
  const dots: Dot[] = [];
  const colW = W / COLS;
  for (let c = 0; c < COLS; c++) {
    const barH = shape[c] * H;
    for (let k = 0; k < DOTS_PER_COL; k++) {
      const n = seed * 100 + c * 10 + k;
      const x1 = c * colW + colW * 0.5 + (rand(n) - 0.5) * colW * 0.5;
      const y1 = H - (barH * (k + 0.5)) / DOTS_PER_COL;
      dots.push({
        x0: rand(n + 1) * W,
        y0: rand(n + 2) * H,
        x1,
        y1,
        d: rand(n + 3) * 220,
        r: 1 + rand(n + 4) * 0.8,
      });
    }
  }
  return dots;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const StatParticles = ({ seed = 0, shape }: { seed?: number; shape: number[] }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [dots] = useState(() => buildDots(seed, shape));
  const [t, setT] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(1);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / DURATION);
      setT(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden
      className="pointer-events-none absolute bottom-0 right-0 h-14 w-40 opacity-[0.28]"
    >
      {dots.map((d, i) => {
        const local = Math.min(1, Math.max(0, (t * DURATION - d.d) / (DURATION - 220)));
        const e = easeOut(local);
        return (
          <circle
            key={i}
            cx={d.x0 + (d.x1 - d.x0) * e}
            cy={d.y0 + (d.y1 - d.y0) * e}
            r={d.r}
            className="fill-foreground"
            opacity={0.25 + e * 0.75}
          />
        );
      })}
    </svg>
  );
};

export default StatParticles;
