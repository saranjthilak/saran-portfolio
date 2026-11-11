"use client";

import { motion } from "framer-motion";
import { publications } from "@/data/portfolio";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight, BookOpen, Quote } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Metric pill ──────────────────────────────────────────────────────────── */
const MetricPill = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
    <span className="text-3xl font-black tracking-tighter text-white">{value}</span>
    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">{label}</span>
  </div>
);

/* ── Paper card ───────────────────────────────────────────────────────────── */
const PaperCard = ({
  pub,
  idx,
}: {
  pub: (typeof publications)[0];
  idx: number;
}) => (
  <motion.a
    href={pub.link}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex flex-col gap-5 p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[hsl(var(--accent)/0.4)] hover:bg-white/[0.045] hover:shadow-[0_0_60px_hsl(var(--accent)/0.07)]"
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: 0.1 + idx * 0.14, ease: EASE }}
  >
    {/* Hover glow */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, hsl(var(--accent)/0.06) 0%, transparent 100%)" }}
    />

    {/* Top row: badge + arrow */}
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        {/* IEEE badge */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[hsl(var(--accent)/0.12)] border border-[hsl(var(--accent)/0.25)] text-[11px] font-mono uppercase tracking-widest"
          style={{ color: "hsl(var(--accent))" }}>
          <BookOpen className="w-3 h-3" />
          {pub.journal}
        </span>
        {/* Date */}
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-widest text-white/50">
          {pub.date}
        </span>
      </div>

      {/* Arrow */}
      <div className="shrink-0 w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:border-[hsl(var(--accent)/0.5)] group-hover:bg-[hsl(var(--accent)/0.1)]">
        <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[hsl(var(--accent))] transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </div>

    {/* Title */}
    <h3 className="text-lg md:text-xl font-bold text-white leading-snug group-hover:text-[hsl(var(--accent))] transition-colors duration-300">
      {pub.title}
    </h3>

    {/* Divider */}
    <div className="w-full h-px bg-white/8" />

    {/* Description with quote icon */}
    <div className="relative pl-5">
      <Quote className="absolute left-0 top-0.5 w-3.5 h-3.5 text-white/20" />
      <p className="text-sm leading-relaxed text-white/55 font-light">
        {pub.description}
      </p>
    </div>

    {/* Key metric highlight */}
    {idx === 0 && (
      <div className="flex items-center gap-2 mt-1">
        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold tracking-wider">
          R² = 0.93
        </span>
        <span className="text-xs text-white/35 font-mono">RandomSearchCV · AdaBoost · Random Forest</span>
      </div>
    )}
    {idx === 1 && (
      <div className="flex items-center gap-2 mt-1">
        <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-semibold tracking-wider">
          Dynamic Pricing
        </span>
        <span className="text-xs text-white/35 font-mono">Random Forest · Randomized Search CV</span>
      </div>
    )}
  </motion.a>
);

/* ── Section ──────────────────────────────────────────────────────────────── */
export default function ResearchSection() {
  return (
    <section
      id="research"
      className="relative font-kanit rounded-t-section -mt-10 sm:-mt-12 md:-mt-14 z-[35] overflow-hidden min-h-screen flex flex-col justify-center"
      style={{
        background: "hsl(212, 18%, 5%)",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(8,12,16,0.78)" }} />

        {/* Orbs */}
        <div className="absolute top-[8%] left-[4%] w-[520px] h-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[6%] right-[5%] w-[380px] h-[380px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.05) 0%, transparent 70%)" }} />

        {/* Animated scanning line */}
        <motion.div
          className="absolute left-0 w-full h-px opacity-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />

        {/* Vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 35%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="absolute bottom-0 left-0 w-full h-32"
          style={{ background: "linear-gradient(to top, hsl(212, 18%, 5%), transparent)" }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[90%] lg:max-w-5xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-20 md:pt-24 my-auto">

        {/* Eyebrow */}
        <FadeIn delay={0} y={20}>
          <p className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-white/50 text-xs mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
            Research & Publications
          </p>
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

        {/* Subtitle + metrics row */}
        <FadeIn delay={0.16} y={16}>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-end gap-6 mb-14 sm:mb-18 md:mb-20">
            <p className="text-white/50 max-w-xl font-kanit font-light text-base sm:text-lg flex-1">
              Two peer-reviewed papers published at IEEE — on solar plant performance and air ticket price prediction — cited in applied ML literature.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <MetricPill value="2" label="IEEE Papers" />
              <MetricPill value="0.93" label="Best R²" />
              <MetricPill value="2022–23" label="Published" />
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
        <FadeIn delay={0.4} y={16}>
          <div className="mt-10 flex items-center gap-4">
            <a
              href="https://ieeexplore.ieee.org/author/37089504285"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 text-white/60 text-sm font-medium hover:border-[hsl(var(--accent)/0.4)] hover:text-white hover:bg-white/8 transition-all duration-300"
            >
              <BookOpen className="w-4 h-4" />
              View on IEEE Xplore
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
