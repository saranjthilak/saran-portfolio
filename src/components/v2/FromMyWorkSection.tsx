"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { achievements, fromMyWork, type Achievement } from "@/data/portfolio";
import BlueprintSectionHeader from "./BlueprintSectionHeader";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import {
  TrendingUp,
  Shield,
  Award,
  Zap,
  Cpu,
  Sparkles,
  ArrowUpRight,
  Database,
  Cloud,
  CheckCircle2,
  Terminal,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type CategoryFilter = "ALL" | "GenAI & LLMs" | "Data & MLOps" | "Cloud & SRE" | "Research";

const CATEGORIES: { label: string; value: CategoryFilter }[] = [
  { label: "All Achievements", value: "ALL" },
  { label: "GenAI & LLMs", value: "GenAI & LLMs" },
  { label: "Data & MLOps", value: "Data & MLOps" },
  { label: "Cloud & SRE", value: "Cloud & SRE" },
  { label: "Research", value: "Research" },
];

/* ── Metric icon selector ─────────────────────────────────────────── */
function getCategoryIcon(category: Achievement["category"]) {
  switch (category) {
    case "GenAI & LLMs":
      return Sparkles;
    case "Data & MLOps":
      return Database;
    case "Cloud & SRE":
      return Cloud;
    case "Research":
      return Award;
    default:
      return Cpu;
  }
}

/* ── Animated Counter with decimal support ─────────────────────────── */
function MetricCounter({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setCount(target);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const startTime = performance.now();
          const isDecimal = target % 1 !== 0;

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            setCount(isDecimal ? Math.round(current * 100) / 100 : Math.round(current));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, prefersReduced]);

  const displayVal = target % 1 !== 0 ? count.toFixed(target === 0.93 ? 2 : target === 99.99 ? 2 : 1) : count;

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayVal}
      {suffix}
    </span>
  );
}

/* ── 3D Tilt Achievement Card ─────────────────────────────────────── */
function AchievementCard({ item, index }: { item: Achievement; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 18 };
  const sx = useSpring(mx, springConfig);
  const sy = useSpring(my, springConfig);

  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReduced) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mx, my, prefersReduced]);

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const CategoryIcon = getCategoryIcon(item.category);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
      style={{
        rotateX: prefersReduced ? 0 : rotateX,
        rotateY: prefersReduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      {/* Top accent glow line */}
      <span
        className="pointer-events-none absolute left-0 top-0 h-0.5 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, ${item.accent}, transparent 75%)`,
        }}
      />

      {/* Ambient background glow on hover */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: item.accent }}
      />

      {/* Corner brackets */}
      <span className="pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 border-t border-l border-white/15 group-hover:border-accent/40 transition-colors" />
      <span className="pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 border-t border-r border-white/15 group-hover:border-accent/40 transition-colors" />
      <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-3 w-3 border-b border-l border-white/15 group-hover:border-accent/40 transition-colors" />
      <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r border-white/15 group-hover:border-accent/40 transition-colors" />

      {/* ── Top Header Row ── */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span
              className="grid h-7 w-7 place-items-center rounded-lg border text-xs"
              style={{
                borderColor: `${item.accent}35`,
                background: `${item.accent}12`,
                color: item.accent,
              }}
            >
              <CategoryIcon className="h-3.5 w-3.5" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
              {item.organization}
            </span>
          </div>

          <span className="font-mono text-[8px] uppercase tracking-widest text-white/25">
            {item.nodeId}
          </span>
        </div>

        {/* ── Main Stat & Trend Badge ── */}
        <div className="flex items-baseline justify-between gap-2 mb-3">
          <div
            className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight leading-none"
            style={{
              color: item.accent,
              textShadow: `0 0 24px ${item.accent}40`,
            }}
          >
            <MetricCounter
              target={item.metric}
              prefix={item.prefix}
              suffix={item.suffix}
            />
          </div>

          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-mono font-semibold uppercase tracking-wider border shrink-0"
            style={{
              borderColor: `${item.accent}40`,
              background: `${item.accent}14`,
              color: item.accent,
            }}
          >
            {item.impactBadge}
          </span>
        </div>

        {/* Metric Label */}
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-3">
          // {item.metricLabel}
        </div>

        {/* Title */}
        <h3 className="font-kanit font-medium text-lg text-white leading-snug group-hover:text-white transition-colors mb-2">
          {item.title}
        </h3>

        {/* Description */}
        <p className="font-kanit font-light text-white/50 text-xs sm:text-sm leading-relaxed mb-6">
          {item.description}
        </p>
      </div>

      {/* ── Tech Skills Chips Footer ── */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2 flex-wrap">
        <div className="flex flex-wrap gap-1.5">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.02] text-[9px] font-mono text-white/45 group-hover:border-white/15 transition-colors"
            >
              #{skill}
            </span>
          ))}
        </div>

        <span className="font-mono text-[8px] uppercase tracking-widest text-white/20">
          VERIFIED ✓
        </span>
      </div>
    </motion.div>
  );
}

/* ── Full Achievements Section ─────────────────────────────────────── */
const FromMyWorkSection = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("ALL");
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "ALL") return achievements;
    return achievements.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  /* Duplicated ticker items for seamless looping */
  const tickerItems = useMemo(() => [...fromMyWork, ...fromMyWork], []);

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="font-kanit rounded-t-section -mt-10 sm:-mt-12 md:-mt-14 relative z-20 overflow-hidden border-t border-white/10 bg-v2-base"
      style={{
        paddingTop: "clamp(5rem, 8vw, 8rem)",
        paddingBottom: "3rem",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full opacity-25 blur-[120px]"
          style={{ background: "radial-gradient(circle, hsl(var(--accent)/0.15) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 blueprint-dots opacity-[0.05]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* ── Section Header ── */}
        <BlueprintSectionHeader align="center">
          <div className="mb-10 text-center sm:mb-14">
            <FadeIn delay={0} y={20}>
              <p className="flex items-center justify-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-white/50 mb-5">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Engineering Metrics
                <span className="font-mono text-[9px] text-white/30 ml-2">
                  // VERIFIED IMPACT LOG
                </span>
              </p>
            </FadeIn>

            <FadeIn delay={0.08} y={30}>
              <SectionHeading
                id="achievements-heading"
                prefix="Quantified results in "
                accentWord="production"
                gradient="experience"
                align="center"
                className="mb-5"
              />
            </FadeIn>

            <FadeIn y={16} delay={0.2} duration={0.7} className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base font-kanit font-light">
              Real engineering outcomes across GenAI, distributed pipelines, and carrier infrastructure: cutting cloud costs by 20%, boosting RAG efficiency by 25%, and maintaining 99.9%+ availability.
            </FadeIn>
          </div>
        </BlueprintSectionHeader>

        {/* ── Category Filter Tabs ── */}
        <FadeIn delay={0.25} y={15}>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.value;
              const count = cat.value === "ALL" ? achievements.length : achievements.filter((a) => a.category === cat.value).length;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-200 border ${
                    active
                      ? "border-accent/60 bg-accent/10 text-accent shadow-[0_0_20px_hsl(var(--accent)/0.2)]"
                      : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_hsl(var(--accent))]" />}
                  <span>{cat.label}</span>
                  <span className={`text-[8px] opacity-60 ${active ? "text-accent" : "text-white/40"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* ── Achievements Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <AchievementCard key={item.id} item={item} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Real-Time Proof Points Marquee Ticker ── */}
      <div className="relative mt-4 border-y border-white/[0.06] bg-black/30 backdrop-blur-md py-4">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 z-10 bg-gradient-to-r from-v2-base to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 z-10 bg-gradient-to-l from-v2-base to-transparent" />

        <div
          ref={trackRef}
          className="flex items-center gap-0 will-change-transform from-my-work-track"
          style={{ width: "max-content" }}
        >
          {tickerItems.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex items-center flex-shrink-0">
              <div className="flex items-baseline gap-3 px-8 group cursor-default select-none">
                <span className="font-mono text-[9px] tracking-[0.2em] text-accent/60">
                  {item.id}
                </span>
                <span className="font-kanit font-light text-xs sm:text-sm text-white/50 transition-colors duration-300 group-hover:text-white">
                  {item.text}
                </span>
              </div>
              <span className="flex-shrink-0 w-1 h-1 rounded-full bg-accent/30 mx-2" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      {/* Inline keyframe animation */}
      <style>{`
        @keyframes fmw-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .from-my-work-track {
          animation: fmw-scroll 36s linear infinite;
        }
        .from-my-work-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .from-my-work-track {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
};

export default FromMyWorkSection;
