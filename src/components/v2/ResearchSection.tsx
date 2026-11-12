"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { publications } from "@/data/portfolio";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight, BookOpen, Cpu, GitBranch, Zap } from "lucide-react";
import { useRef, useCallback, useState, useEffect } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Animated counter ────────────────────────────────────────────────────── */
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1200;
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target * 100) / 100);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count % 1 === 0 ? count : count.toFixed(2)}{suffix}</span>;
};

/* ── Terminal line ───────────────────────────────────────────────────────── */
const TerminalLine = ({ children, delay = 0, dim = false }: { children: React.ReactNode; delay?: number; dim?: boolean }) => (
  <motion.div
    className={`font-mono text-xs leading-relaxed ${dim ? "text-white/25" : "text-white/60"}`}
    initial={{ opacity: 0, x: -8 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/* ── 3D tilt paper card ──────────────────────────────────────────────────── */
const PaperCard = ({ pub, idx }: { pub: (typeof publications)[0]; idx: number }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);

  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  const configs = [
    {
      accent: "rgba(99,255,180,1)",
      accentDim: "rgba(99,255,180,0.08)",
      accentBorder: "rgba(99,255,180,0.2)",
      tag: "SOLAR · ML",
      metric: "R² = 0.93",
      metricColor: "text-emerald-400",
      metricBg: "bg-emerald-500/10 border-emerald-500/25",
      models: ["RandomSearchCV", "AdaBoost", "Random Forest"],
      nodeId: "NODE-0x1A4F",
    },
    {
      accent: "rgba(99,180,255,1)",
      accentDim: "rgba(99,180,255,0.08)",
      accentBorder: "rgba(99,180,255,0.2)",
      tag: "PRICING · ML",
      metric: "KAGGLE×2",
      metricColor: "text-sky-400",
      metricBg: "bg-sky-500/10 border-sky-500/25",
      models: ["Random Forest", "Randomized Search CV"],
      nodeId: "NODE-0x2B7E",
    },
  ];
  const c = configs[idx] ?? configs[0];

  return (
    <motion.a
      ref={cardRef}
      href={pub.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="group relative flex flex-col gap-0 rounded-2xl border overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.1 + idx * 0.15, ease: EASE }}
      whileHover={{ scale: 1.012 }}
      whileTap={{ scale: 0.99 }}
      aria-label={pub.title}
    >
      {/* Border colour via inline style */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-30"
        style={{ border: `1px solid ${c.accentBorder}`, borderRadius: "inherit" }} />

      {/* Glass body */}
      <div className="absolute inset-0 rounded-2xl"
        style={{ background: "rgba(6,10,16,0.82)", backdropFilter: "blur(20px)" }} />

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }} />

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${c.accentDim} 0%, transparent 100%)` }} />

      {/* Corner scan lines */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l opacity-40 pointer-events-none"
        style={{ borderColor: c.accent }} />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r opacity-40 pointer-events-none"
        style={{ borderColor: c.accent }} />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l opacity-40 pointer-events-none"
        style={{ borderColor: c.accent }} />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r opacity-40 pointer-events-none"
        style={{ borderColor: c.accent }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-5 p-6 md:p-8">

        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            {/* Node ID */}
            <span className="font-mono text-[10px] tracking-[0.2em] opacity-40 text-white">{c.nodeId}</span>
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] font-mono uppercase tracking-widest"
                style={{ color: c.accent, borderColor: c.accentBorder, background: c.accentDim }}>
                <BookOpen className="w-2.5 h-2.5" />{pub.journal}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-white/40">
                <Zap className="w-2.5 h-2.5" />{pub.date}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-white/35 uppercase tracking-widest">
                {c.tag}
              </span>
            </div>
          </div>
          {/* Arrow button */}
          <div className="shrink-0 mt-5 w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg font-bold text-white leading-snug transition-colors duration-300"
          style={{ ["--hover-color" as string]: c.accent }}>
          <span className="group-hover:text-[var(--hover-color)] transition-colors duration-300"
            style={{ ["--hover-color" as string]: c.accent }}>
            {pub.title}
          </span>
        </h3>

        {/* Separator with label */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${c.accentBorder}, transparent)` }} />
          <span className="font-mono text-[9px] tracking-widest opacity-30 text-white uppercase">Abstract</span>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(270deg, ${c.accentBorder}, transparent)` }} />
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-white/50 font-light">
          {pub.description}
        </p>

        {/* Terminal block */}
        <div className="rounded-xl border border-white/8 bg-black/40 p-4 font-mono space-y-1">
          <TerminalLine delay={0} dim>$ model_eval --dataset IEEE_{idx === 0 ? "solar" : "airfare"}</TerminalLine>
          <TerminalLine delay={0.05}>
            <span style={{ color: c.accent }}>✓</span> best_model: <span style={{ color: c.accent }}>{c.models[0]}</span>
          </TerminalLine>
          {c.models.slice(1).map((m, i) => (
            <TerminalLine key={m} delay={0.08 + i * 0.04} dim>  · {m}</TerminalLine>
          ))}
          <TerminalLine delay={0.14}>
            <span style={{ color: c.accent }}>→</span> score: <span className="font-bold" style={{ color: c.accent }}>{c.metric}</span>
          </TerminalLine>
        </div>

        {/* Metric + models footer */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <span className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold tracking-wider ${c.metricColor} ${c.metricBg}`}>
            {c.metric}
          </span>
          <div className="flex items-center gap-1.5">
            <GitBranch className="w-3 h-3 text-white/20" />
            <span className="text-[10px] font-mono text-white/25">peer-reviewed</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

/* ── HUD stat box ────────────────────────────────────────────────────────── */
const HUDStat = ({
  value, suffix = "", label, accent, delay = 0,
}: { value: number; suffix?: string; label: string; accent: string; delay?: number }) => (
  <motion.div
    className="relative flex flex-col items-center px-5 py-4 rounded-xl border border-white/8 bg-black/30 backdrop-blur-sm overflow-hidden"
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: EASE }}
  >
    <div className="absolute top-0 left-0 right-0 h-[1px]"
      style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
    <span className="text-2xl md:text-3xl font-black tracking-tighter" style={{ color: accent }}>
      <AnimatedCounter target={value} suffix={suffix} />
    </span>
    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/35 mt-1 text-center">{label}</span>
  </motion.div>
);

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function ResearchSection() {
  return (
    <section
      id="research"
      className="relative font-kanit rounded-t-section -mt-10 sm:-mt-12 md:-mt-14 z-[35] overflow-hidden min-h-screen flex flex-col justify-center"
      style={{ background: "hsl(212, 18%, 5%)", boxShadow: "0 -10px 40px rgba(0,0,0,0.5)" }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.25 }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(6,10,16,0.82)" }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(99,255,180,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,255,180,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

        {/* Orbs */}
        <div className="absolute top-[8%] left-[4%] w-[520px] h-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,255,180,0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[6%] right-[5%] w-[380px] h-[380px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,180,255,0.05) 0%, transparent 70%)" }} />

        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 w-full h-[1px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,255,180,0.5), transparent)" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        />

        {/* Vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)" }} />
        <div className="absolute bottom-0 left-0 w-full h-32"
          style={{ background: "linear-gradient(to top, hsl(212, 18%, 5%), transparent)" }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[90%] lg:max-w-5xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-20 md:pt-24 my-auto">

        {/* Eyebrow */}
        <FadeIn delay={0} y={20}>
          <div className="flex items-center gap-3 mb-5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 opacity-70" />
            <p className="font-mono uppercase tracking-[0.25em] text-white/40 text-[11px]">
              Research &amp; Publications
            </p>
            <div className="flex-1 h-px bg-white/8 max-w-[80px]" />
            <span className="font-mono text-[10px] text-emerald-400/60 tracking-widest">SYS::ONLINE</span>
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.08} y={30}>
          <SectionHeading
            prefix="Peer-reviewed, "
            accentWord="not just claimed"
            gradient="research"
            align="left"
            className="mb-4 lg:whitespace-nowrap"
            fontSize="clamp(1.75rem, 3.8vw, 3.25rem)"
          />
        </FadeIn>

        {/* Subtitle + HUD stats */}
        <FadeIn delay={0.16} y={16}>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-end gap-6 mb-14 md:mb-20">
            <p className="text-white/45 max-w-xl font-kanit font-light text-base sm:text-lg flex-1">
              Two peer-reviewed papers at IEEE — applied ML on solar performance and dynamic airline pricing.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <HUDStat value={2}   label="IEEE Papers"  accent="rgba(99,255,180,1)" delay={0.2} />
              <HUDStat value={0.93} suffix="" label="Best R²" accent="rgba(99,255,180,0.8)" delay={0.26} />
              <HUDStat value={23}   suffix="'"  label="Published" accent="rgba(99,180,255,0.9)" delay={0.32} />
            </div>
          </div>
        </FadeIn>

        {/* ── Paper cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {publications.map((pub, idx) => (
            <PaperCard key={idx} pub={pub} idx={idx} />
          ))}
        </div>

        {/* Footer CTA */}
        <FadeIn delay={0.45} y={16}>
          <div className="mt-10 flex items-center gap-3">
            <a
              href="https://ieeexplore.ieee.org/author/37089504285"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/50 text-sm font-mono hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-300"
            >
              <BookOpen className="w-4 h-4" />
              ieee_xplore --author=saranjthilak
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
