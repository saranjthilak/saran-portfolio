"use client";

import React, { useRef, useEffect, useState } from "react";
import FadeIn from "./FadeIn";
import BlueprintSectionHeader from "./BlueprintSectionHeader";
import SectionHeading from "./SectionHeading";

/* ── Animated counter that counts up when it enters the viewport ── */
function HudCounter({
  target,
  suffix = "",
  prefix = "",
  label,
  accent = "hsl(var(--accent))",
  nodeId,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  accent?: string;
  nodeId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }
    let frame = 0;
    const duration = 1200;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <div ref={ref} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm hover:border-[var(--stat-accent,hsl(var(--accent)))]/40 hover:bg-white/[0.05] transition-all duration-300" style={{ "--stat-accent": accent } as React.CSSProperties}>
      {/* corner marks */}
      <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-[var(--stat-accent,hsl(var(--accent)))]/40" />
      <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-[var(--stat-accent,hsl(var(--accent)))]/40" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[var(--stat-accent,hsl(var(--accent)))]/40" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[var(--stat-accent,hsl(var(--accent)))]/40" />
      {/* top accent bar */}
      <span className="absolute left-0 top-0 h-0.5 w-full" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />
      <div className="font-mono text-[8px] uppercase tracking-widest text-white/25 mb-2">{nodeId}</div>
      <div className="font-mono text-3xl font-bold leading-none tracking-tight" style={{ color: accent, textShadow: `0 0 20px ${accent}60` }}>
        {prefix}{count}{suffix}
      </div>
      <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
    </div>
  );
}

const AboutSection = () => {
  return (
    <>
      <section
        id="about"
        className="font-kanit rounded-t-section -mt-10 sm:-mt-12 md:-mt-14 relative z-[15] overflow-hidden flex items-center border-t border-white/10 bg-v2-base"
        style={{
          padding: "clamp(5rem, 9vw, 9rem) 1.25rem",
          boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
          minHeight: "100vh",
        }}
      >
        {/* ── Lightweight Background (replaces HLS video) ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 70% 40%, rgba(0,223,143,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 30% 60%, rgba(0,240,255,0.05) 0%, transparent 60%)"
            }}
          />

          {/* Left linear gradient (bg-base to transparent) */}
          <div className="absolute inset-0 bg-gradient-to-r from-v2-base via-v2-base/75 to-transparent" />

          {/* Bottom-up gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-v2-base via-v2-base/50 to-transparent" />
        </div>

        {/* ── Central Glow (cyan/dark green hue with 25px Gaussian blur) ── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-[4] w-[800px] max-w-full h-[320px] overflow-visible opacity-70">
          <svg
            className="w-full h-full"
            viewBox="0 0 800 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="about-central-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="25" />
              </filter>
              <linearGradient id="about-glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.35" />
                <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.55" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <ellipse
              cx="400"
              cy="90"
              rx="340"
              ry="70"
              fill="url(#about-glow-grad)"
              filter="url(#about-central-glow)"
            />
          </svg>
        </div>

        {/* ── Grid System: thin vertical lines (white/10) at 25%, 50%, 75% ── */}
        <div className="hidden md:block pointer-events-none absolute inset-y-0 left-1/4 w-px bg-white/10 z-[5]" />
        <div className="hidden md:block pointer-events-none absolute inset-y-0 left-2/4 w-px bg-white/10 z-[5]" />
        <div className="hidden md:block pointer-events-none absolute inset-y-0 left-3/4 w-px bg-white/10 z-[5]" />

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <BlueprintSectionHeader>
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          
          {/* Left: The Hook */}
          <div>
            <FadeIn delay={0} y={20}>
              <p className="mono-label flex items-center gap-2 mb-5 sm:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
                About Me
              </p>
            </FadeIn>
            <FadeIn delay={0.08} y={30}>
              <SectionHeading
                prefix="Ops brain, "
                accentWord={"AI\u00a0hands"}
                gradient="research"
                align="left"
                className="mb-4"
              />
            </FadeIn>

            {/* ── Compact profile card ── */}
            <FadeIn delay={0.18} y={20}>
              <div className="mt-8 relative overflow-hidden border border-white/10 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)", maxWidth: "380px" }}
              >
                {/* corner brackets */}
                <span className="absolute top-0 left-0 h-4 w-4 border-t border-l border-accent/40" />
                <span className="absolute top-0 right-0 h-4 w-4 border-t border-r border-accent/40" />
                <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-accent/40" />
                <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-accent/40" />
                {/* top accent bar */}
                <span className="absolute left-0 top-0 h-0.5 w-full" style={{ background: "linear-gradient(to right, hsl(var(--accent)/0.5), transparent)" }} />

                <div className="flex items-center gap-4 p-5">
                  {/* photo */}
                  <div className="relative shrink-0 h-16 w-16 rounded-xl overflow-hidden border border-white/10">
                    <img src="/images/profile.png" alt="Saran Jaya Thilak" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 border border-accent/20 rounded-xl pointer-events-none" />
                  </div>
                  {/* info */}
                  <div className="min-w-0">
                    <div className="font-mono text-[8px] uppercase tracking-widest text-white/30 mb-1">ID // SJT-001</div>
                    <div className="text-white font-semibold text-sm leading-tight">Saran Jaya Thilak</div>
                    <div className="font-mono text-[10px] text-white/50 mt-0.5">Data Engineer · GenAI Specialist</div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute h-full w-full rounded-full bg-accent opacity-70" />
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "hsl(var(--accent)/0.8)" }}>
                        Open to opportunities · Berlin
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: The Details */}
          <div>
            <FadeIn delay={0.2} y={20}>
              <div className="flex flex-col gap-6">
                <p
                   className="font-kanit font-light text-foreground/70 leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                >
                  I spent seven years keeping mission-critical infrastructure alive — first at <strong className="text-white font-normal">Nokia</strong>, then at <strong className="text-white font-normal">Huawei</strong> — managing telecom and cloud systems at 99.9%+ uptime, 24×7, with no tolerance for failure. That decade of operational discipline shaped how I think about reliability, observability, and what "production-ready" actually means.
                </p>
                <p
                   className="font-kanit font-light text-muted-foreground leading-relaxed"
                  style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}
                >
                  Now, with an M.Sc. in Data Science and hands-on work at <strong className="text-white font-normal">Tesla</strong> building RAG chatbots and Airflow pipelines, I bring that same infrastructure mindset to AI engineering. I build GenAI and data systems the way I once ran networks — with the assumption that they have to hold up under real load, not just in a notebook.
                </p>

                {/* ── HUD Stat Counters ── */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <HudCounter target={10} suffix="+" label="Years of experience" nodeId="STAT-0x01" accent="hsl(var(--accent))" />
                  <HudCounter target={99.9} suffix="%" label="Uptime SLA operated" nodeId="STAT-0x02" accent="#38bdf8" />
                  <HudCounter target={2} label="IEEE publications" nodeId="STAT-0x03" accent="#a78bfa" />
                  <HudCounter target={5} suffix="+" label="Certifications" nodeId="STAT-0x04" accent="#f59e0b" />
                </div>

                {/* ── Resume Download Button ── */}
                <div className="pt-2">
                  <a
                    href="/Saran-Jaya-Thilak-Resume.pdf"
                    download="Saran-Jaya-Thilak-Resume.pdf"
                    className="group relative inline-flex items-center gap-3 font-kanit font-light text-sm tracking-widest uppercase"
                    style={{ color: "hsl(var(--accent))" }}
                  >
                    {/* Blueprint grid card */}
                    <span
                      className="relative flex items-center gap-3 px-6 py-3 transition-all duration-300"
                      style={{
                        border: "1px solid hsl(var(--accent) / 0.35)",
                        background: "hsl(var(--accent) / 0.04)",
                      }}
                    >
                      {/* Corner marks */}
                      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l transition-all duration-300 group-hover:w-3 group-hover:h-3" style={{ borderColor: "hsl(var(--accent))" }} />
                      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r transition-all duration-300 group-hover:w-3 group-hover:h-3" style={{ borderColor: "hsl(var(--accent))" }} />
                      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-all duration-300 group-hover:w-3 group-hover:h-3" style={{ borderColor: "hsl(var(--accent))" }} />
                      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-all duration-300 group-hover:w-3 group-hover:h-3" style={{ borderColor: "hsl(var(--accent))" }} />

                      {/* Hover glow fill */}
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "hsl(var(--accent) / 0.07)" }}
                      />

                      {/* Download icon */}
                      <svg
                        className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 2v8M5 7l3 3 3-3" />
                        <path d="M2 12h12" />
                      </svg>

                      <span className="relative">Download Résumé</span>

                      {/* Mono label */}
                      <span
                        className="relative font-mono text-[10px] tracking-widest opacity-50"
                        style={{ color: "hsl(var(--accent))" }}
                      >
                        PDF
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </FadeIn>
            </div>
            </div>
          </BlueprintSectionHeader>
          
        </div>
      </section>
    </>
  );
};

export default AboutSection;
