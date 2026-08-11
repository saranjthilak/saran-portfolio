"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Eyebrow, Reveal } from "./primitives";

// ─── Stat data ───────────────────────────────────────────────────────────────
const STATS = [
  {
    value: 99.9,
    decimals: 1,
    suffix: "%",
    ringFill: 0.999,         // fraction 0-1 for the progress ring
    label: "ETL_RELIABILITY",
    sublabel: "Pipeline uptime · production",
    trend: "+2.1% YoY",
    shape: [0.3, 0.45, 0.4, 0.6, 0.55, 0.75, 0.7, 0.9, 1],
  },
  {
    value: 40,
    decimals: 0,
    suffix: "%",
    ringFill: 0.40,
    label: "RAG_SPEED_BOOST",
    sublabel: "Retrieval latency reduction",
    trend: "vs. baseline",
    shape: [0.9, 0.8, 0.85, 0.6, 0.55, 0.45, 0.5, 0.35, 0.3],
  },
  {
    value: 30,
    decimals: 0,
    suffix: "%",
    ringFill: 0.30,
    label: "EMBEDDING_ACCURACY",
    sublabel: "Similarity search gain",
    trend: "+30pp delta",
    shape: [0.35, 0.5, 0.4, 0.65, 0.85, 0.6, 0.8, 0.7, 0.95],
  },
  {
    value: 9,
    decimals: 0,
    suffix: "+",
    ringFill: 0.75,          // stylised — 9 yrs mapped to ~75%
    label: "YRS_IN_PRODUCTION",
    sublabel: "End-to-end ML systems",
    trend: "since 2016",
    shape: [0.25, 0.4, 0.5, 0.55, 0.7, 0.65, 0.85, 0.8, 1],
  },
] as const;

// ─── SVG ring sizes ───────────────────────────────────────────────────────────
const RING_SIZE  = 88;   // px — the SVG viewport
const RING_R     = 36;   // circle radius
const RING_CIRC  = 2 * Math.PI * RING_R;

// ─── Inline count-up that also exposes its 0-1 progress ─────────────────────
const useCountUp = (target: number, once = true) => {
  const ref  = useRef<HTMLSpanElement>(null);
  const inV  = useInView(ref, { once, margin: "-15%" });
  const mv   = useMotionValue(0);
  const sp   = useSpring(mv, { stiffness: 55, damping: 20 });
  const frac = useTransform(sp, (v) => v / target);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (inV) mv.set(target);
  }, [inV, mv, target]);

  useEffect(() => frac.on("change", (v) => setProgress(Math.min(1, v))), [frac]);

  return { ref, progress, inV };
};

// ─── Animated progress ring ─────────────────────────────────────────────────
const ProgressRing = ({ fill, progress }: { fill: number; progress: number }) => {
  const drawn = fill * progress;
  const dashOffset = RING_CIRC * (1 - drawn);

  return (
    <svg
      width={RING_SIZE}
      height={RING_SIZE}
      viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
      className="absolute inset-0 m-auto"
      aria-hidden
    >
      <defs>
        <filter id="ring-glow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background track */}
      <circle
        cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_R}
        fill="none"
        stroke="hsl(185 100% 50% / 0.07)"
        strokeWidth={2.5}
      />

      {/* Lit arc */}
      <circle
        cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_R}
        fill="none"
        stroke="hsl(185 100% 50%)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={RING_CIRC}
        strokeDashoffset={dashOffset}
        transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
        filter="url(#ring-glow)"
        style={{ transition: "stroke-dashoffset 0.05s linear" }}
      />

      {/* Tiny tick marks at 25 / 50 / 75% */}
      {[0.25, 0.5, 0.75].map((f) => {
        const angle = f * 360 - 90;
        const rad   = (angle * Math.PI) / 180;
        const cx    = RING_SIZE / 2;
        const cy    = RING_SIZE / 2;
        const inner = RING_R - 5;
        const outer = RING_R + 5;
        return (
          <line
            key={f}
            x1={cx + Math.cos(rad) * inner} y1={cy + Math.sin(rad) * inner}
            x2={cx + Math.cos(rad) * outer} y2={cy + Math.sin(rad) * outer}
            stroke="hsl(185 100% 50% / 0.18)"
            strokeWidth={0.8}
          />
        );
      })}
    </svg>
  );
};

// ─── Mini sparkline bar chart ─────────────────────────────────────────────────
const SparkBars = ({ shape, progress }: { shape: readonly number[]; progress: number }) => {
  const W   = 72;
  const H   = 28;
  const n   = shape.length;
  const bW  = W / n - 1.5;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden
      className="opacity-40">
      {shape.map((v, i) => {
        const barH = v * H * progress;
        return (
          <rect
            key={i}
            x={i * (W / n) + 0.75}
            y={H - barH}
            width={bW}
            height={barH}
            rx={1}
            fill="hsl(185 100% 50%)"
            opacity={0.5 + v * 0.5}
          />
        );
      })}
    </svg>
  );
};

// ─── Single stat card ─────────────────────────────────────────────────────────
const StatCard = ({
  value, decimals, suffix, ringFill, label, sublabel, trend, shape, delay,
}: typeof STATS[number] & { delay: number }) => {
  const { ref, progress } = useCountUp(value);
  const displayed = (value * progress).toFixed(decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-accent/15 bg-background/60 p-5 backdrop-blur-md"
      style={{
        boxShadow: "0 0 0 1px hsl(185 100% 50% / 0.06), inset 0 1px 0 hsl(185 100% 50% / 0.08)",
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-xl"
        style={{ background: "radial-gradient(ellipse at 50% 110%, hsl(185 100% 50% / 0.08), transparent 70%)" }}
      />

      {/* ── Top row: label + trend ── */}
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-accent/60">
          {label}
        </span>
        <span className="font-mono text-[0.55rem] uppercase tracking-widest text-muted-foreground/50 whitespace-nowrap">
          {trend}
        </span>
      </div>

      {/* ── Ring + number ── */}
      <div className="relative my-4 flex items-center justify-center" style={{ height: RING_SIZE }}>
        <ProgressRing fill={ringFill} progress={progress} />
        {/* Big number centred inside the ring */}
        <span
          ref={ref}
          className="tnum relative z-10 font-mono font-bold text-foreground"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", letterSpacing: "-0.04em" }}
        >
          {displayed}{suffix}
        </span>
      </div>

      {/* ── Bottom row: sublabel + sparkbars ── */}
      <div className="flex items-end justify-between gap-2">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground/55 leading-tight max-w-[55%]">
          {sublabel}
        </span>
        <SparkBars shape={shape} progress={progress} />
      </div>

      {/* Corner accent bracket */}
      <span
        className="pointer-events-none absolute bottom-3 left-3 block h-3 w-3 border-b border-l border-accent/25"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute right-3 top-3 block h-3 w-3 border-r border-t border-accent/25"
        aria-hidden
      />
    </motion.div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────
const Stats = () => (
  <section className="pb-24 sm:pb-32">
    <div className="shell pad-x">
      <Reveal>
        <div
          className="rounded-2xl border border-accent/10 px-7 py-12 sm:px-12 sm:py-16"
          style={{
            background: "hsl(var(--surface))",
            boxShadow: "0 0 60px -20px hsl(185 100% 50% / 0.08)",
          }}
        >
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Eyebrow>By the numbers</Eyebrow>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground/40">
              SYS:METRICS · LIVE
            </span>
          </div>

          {/* Grid of cards */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <StatCard key={s.label} {...s} delay={i * 90} />
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Stats;
