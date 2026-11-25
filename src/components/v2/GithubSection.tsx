"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, GitBranch, Zap, Flame, Calendar, ArrowUpRight } from "lucide-react";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { fetchGitHubStats, type GitHubStats, type ContributionDay } from "@/lib/github-stats";

const ActivityCalendar = dynamic(
  async () => {
    const mod = await import("react-activity-calendar");
    return mod.ActivityCalendar;
  },
  {
    ssr: false,
    loading: () => (
      <div className="w-full flex flex-col gap-3 animate-pulse">
        <div className="h-4 w-40 bg-white/10 rounded mb-2" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex gap-1">
            {Array.from({ length: 53 }).map((_, j) => (
              <div key={j} className="w-[14px] h-[14px] rounded-sm bg-white/5" />
            ))}
          </div>
        ))}
      </div>
    ),
  }
);

const EASE = [0.16, 1, 0.3, 1] as const;
const GITHUB_USERNAME = "saranjthilak";

/* ── Animated counter ────────────────────────────────────────────────────── */
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1200; const startTime = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el); return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ── HUD Stat Card ───────────────────────────────────────────────────────── */
interface HUDStatProps {
  label: string;
  value: number;
  suffix?: string;
  accent: string;
  accentDim: string;
  accentBorder: string;
  icon: React.ReactNode;
  nodeId: string;
  delay: number;
  loading?: boolean;
}

const HUDStat = ({ label, value, suffix = "", accent, accentDim, accentBorder, icon, nodeId, delay, loading }: HUDStatProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-4, 4]);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);
  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className="group relative flex flex-col flex-1 min-w-[140px] rounded-xl overflow-hidden cursor-default"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Border */}
      <div className="absolute inset-0 rounded-xl pointer-events-none z-20"
        style={{ border: `1px solid ${accentBorder}` }} />
      {/* Glass body */}
      <div className="absolute inset-0 rounded-xl"
        style={{ background: "rgba(6,10,16,0.82)", backdropFilter: "blur(16px)" }} />
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accentDim} 0%, transparent 100%)` }} />
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l opacity-50" style={{ borderColor: accent }} />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r opacity-50" style={{ borderColor: accent }} />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l opacity-50" style={{ borderColor: accent }} />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r opacity-50" style={{ borderColor: accent }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-2 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-[0.2em] opacity-25 text-white">{nodeId}</span>
          <span style={{ color: accent, opacity: 0.7 }}>{icon}</span>
        </div>
        {loading ? (
          <div className="h-9 w-16 rounded-lg bg-white/5 animate-pulse" />
        ) : (
          <span className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none" style={{ color: "white" }}>
            <AnimatedCounter target={value} suffix={suffix} />
          </span>
        )}
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">{label}</span>
      </div>
    </motion.div>
  );
};

/* ── Main Component ──────────────────────────────────────────────────────── */
export default function GithubSection({ initialData }: { initialData?: { stats: GitHubStats; contributions: ContributionDay[] } | null }) {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => { setMounted(true); }, []);

  const statsLoaded = !!initialData;
  const contributions = statsLoaded ? initialData.stats.totalContributions : 0;
  const longestStreak = statsLoaded ? initialData.stats.longestStreak : 0;
  const currentStreak = statsLoaded ? initialData.stats.currentStreak : 0;
  const activeDays = statsLoaded ? initialData.stats.activeDays : 0;

  const statCards = [
    { label: "Contributions", value: contributions, suffix: "", accent: "rgba(99,255,180,1)", accentDim: "rgba(99,255,180,0.08)", accentBorder: "rgba(99,255,180,0.2)", icon: <Zap className="w-3.5 h-3.5" />, nodeId: "NODE-0xC1", delay: 0.1 },
    { label: "Longest Streak", value: longestStreak, suffix: "d", accent: "rgba(255,185,50,1)", accentDim: "rgba(255,185,50,0.08)", accentBorder: "rgba(255,185,50,0.2)", icon: <Flame className="w-3.5 h-3.5" />, nodeId: "NODE-0xC2", delay: 0.18 },
    { label: "Current Streak", value: currentStreak, suffix: "d", accent: "rgba(99,180,255,1)", accentDim: "rgba(99,180,255,0.08)", accentBorder: "rgba(99,180,255,0.2)", icon: <GitBranch className="w-3.5 h-3.5" />, nodeId: "NODE-0xC3", delay: 0.26 },
    { label: "Active Days", value: activeDays, suffix: "", accent: "rgba(167,139,250,1)", accentDim: "rgba(167,139,250,0.08)", accentBorder: "rgba(167,139,250,0.2)", icon: <Calendar className="w-3.5 h-3.5" />, nodeId: "NODE-0xC4", delay: 0.34 },
  ];

  return (
    <section
      ref={sectionRef}
      id="github"
      className="font-kanit relative w-full py-24 md:py-32 bg-v2-base z-40 border-t border-white/5 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(99,255,180,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,255,180,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        {/* Center orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(99,255,180,0.04) 0%, transparent 70%)" }} />
        {/* Scan line */}
        <motion.div
          className="absolute left-0 w-full h-[1px] pointer-events-none opacity-10"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,255,180,0.8), transparent)" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 relative z-10">

        {/* Eyebrow */}
        <FadeIn delay={0} y={20}>
          <div className="flex items-center gap-3 mb-5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 opacity-70" />
            <p className="font-mono uppercase tracking-[0.25em] text-white/40 text-[11px]">Activity</p>
            <div className="flex-1 h-px bg-white/8 max-w-[80px]" />
            <span className="font-mono text-[10px] text-emerald-400/60 tracking-widest">GIT::LIVE</span>
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.08} y={30}>
          <SectionHeading prefix="Code, " accentWord="every week" gradient="github" align="left" className="mb-4" />
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.16} y={16}>
          <p className="mt-4 text-white/40 max-w-md font-kanit font-light text-base mb-12 md:mb-16">
            Public activity on GitHub — updated automatically.
          </p>
        </FadeIn>

        {/* HUD Stat Cards */}
        <AnimatePresence>
          {statsLoaded && (
            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: "1.5rem" }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {statCards.map((s) => (
                <HUDStat key={s.nodeId} {...s} loading={!statsLoaded} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calendar Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="group relative rounded-2xl border border-white/10 hover:border-emerald-500/20 overflow-hidden transition-all duration-500"
          style={{ background: "rgba(6,10,16,0.82)", backdropFilter: "blur(20px)" }}
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(99,255,180,0.6), transparent)" }} />
          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-emerald-500/30" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-emerald-500/30" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-emerald-500/30" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-emerald-500/30" />
          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,255,180,0.04) 0%, transparent 100%)" }} />

          <div className="p-6 sm:p-10">
            <div className="mb-4 flex items-center justify-center">
              <span className="font-mono text-[9px] tracking-[0.2em] text-white/30">NODE-0xCAL</span>
            </div>
            <div className="overflow-x-auto pb-2 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.18)_transparent] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15">
              {!statsLoaded ? (
                <div className="flex flex-col items-center justify-center py-12 text-white/40 text-sm font-mono gap-3">
                  <span className="text-[10px] uppercase tracking-widest">GitHub data unavailable</span>
                  <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer"
                    className="text-emerald-400/70 hover:text-emerald-400 transition-colors flex items-center gap-1">
                    @{GITHUB_USERNAME} <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              ) : mounted && initialData ? (
                <ActivityCalendar
                  data={initialData.contributions}
                  colorScheme="dark"
                  theme={{ dark: ["#0d1117", "#0e4429", "#006d32", "#26a641", "#39d353"] }}
                  blockSize={14}
                  blockMargin={4}
                  fontSize={14}
                  labels={{ totalCount: `{{count}} contributions in the last year` }}
                />
              ) : null}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-white/35">@{GITHUB_USERNAME}</span>
              </div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/60 text-xs sm:text-sm font-mono whitespace-nowrap hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-300"
              >
                github --profile={GITHUB_USERNAME}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
