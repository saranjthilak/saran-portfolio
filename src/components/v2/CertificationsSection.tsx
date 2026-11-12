"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { certifications } from "@/data/portfolio";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { Award, BadgeCheck, ExternalLink, Shield, Cpu } from "lucide-react";
import { useRef, useCallback, useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Issuer metadata ─────────────────────────────────────────────────────── */
const ISSUER_META: Record<string, {
  accent: string; accentDim: string; accentBorder: string;
  short: string; url: string; nodeId: string; tier: string;
}> = {
  "Amazon Web Services": {
    accent: "rgba(255,153,51,1)",
    accentDim: "rgba(255,153,51,0.08)",
    accentBorder: "rgba(255,153,51,0.22)",
    short: "AWS", nodeId: "NODE-0xAWS", tier: "ASSOCIATE",
    url: "https://aws.amazon.com/certification/",
  },
  "Oracle": {
    accent: "rgba(255,80,80,1)",
    accentDim: "rgba(255,80,80,0.08)",
    accentBorder: "rgba(255,80,80,0.22)",
    short: "OCI", nodeId: "NODE-0xOCI", tier: "PROFESSIONAL",
    url: "https://education.oracle.com/",
  },
  "DeepLearning.AI / LangChain": {
    accent: "rgba(45,212,191,1)",
    accentDim: "rgba(45,212,191,0.08)",
    accentBorder: "rgba(45,212,191,0.22)",
    short: "DL.AI", nodeId: "NODE-0xDLAI", tier: "CERTIFICATE",
    url: "https://www.deeplearning.ai/",
  },
  "HashiCorp": {
    accent: "rgba(167,139,250,1)",
    accentDim: "rgba(167,139,250,0.08)",
    accentBorder: "rgba(167,139,250,0.22)",
    short: "HCP", nodeId: "NODE-0xHCP", tier: "CERTIFICATE",
    url: "https://developer.hashicorp.com/certifications",
  },
  "UC Davis": {
    accent: "rgba(96,165,250,1)",
    accentDim: "rgba(96,165,250,0.08)",
    accentBorder: "rgba(96,165,250,0.22)",
    short: "UCD", nodeId: "NODE-0xUCD", tier: "CERTIFICATE",
    url: "https://www.coursera.org/uc-davis",
  },
};

const DEFAULT_META = (issuer: string, idx: number) => {
  const accents = ["rgba(99,255,180,1)", "rgba(255,200,80,1)", "rgba(200,99,255,1)"];
  const a = accents[idx % accents.length];
  return {
    accent: a, accentDim: a.replace("1)", "0.08)"), accentBorder: a.replace("1)", "0.22)"),
    short: issuer.slice(0, 3).toUpperCase(), nodeId: `NODE-0x${idx.toString(16).toUpperCase().padStart(3,"0")}`,
    tier: "CERTIFICATE", url: "#",
  };
};

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
        const duration = 1100; const startTime = performance.now();
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
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ── HUD stat box ────────────────────────────────────────────────────────── */
const HUDStat = ({ value, suffix = "", label, accent, delay = 0 }: {
  value: number; suffix?: string; label: string; accent: string; delay?: number;
}) => (
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

/* ── 3D tilt cert card ───────────────────────────────────────────────────── */
const CertCard = ({ cert, idx }: { cert: (typeof certifications)[0]; idx: number }) => {
  const c = ISSUER_META[cert.issuer] ?? DEFAULT_META(cert.issuer, idx);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-5, 5]);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);
  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  // Status bar mock
  const statusSegments = [75, 90, 60, 100, 85, 70, 95, 50, 80, 65, 100, 88];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.07 + idx * 0.07, ease: EASE }}
      whileHover={{ scale: 1.015 }}
    >
      {/* Border overlay */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-30"
        style={{ border: `1px solid ${c.accentBorder}`, borderRadius: "inherit" }} />

      {/* Glass body */}
      <div className="absolute inset-0 rounded-2xl"
        style={{ background: "rgba(6,10,16,0.84)", backdropFilter: "blur(20px)" }} />

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }} />

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${c.accentDim} 0%, transparent 100%)` }} />

      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l opacity-50 pointer-events-none"
        style={{ borderColor: c.accent }} />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r opacity-50 pointer-events-none"
        style={{ borderColor: c.accent }} />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l opacity-50 pointer-events-none"
        style={{ borderColor: c.accent }} />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r opacity-50 pointer-events-none"
        style={{ borderColor: c.accent }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 p-5">

        {/* Top row: node ID + verified tick */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-[0.2em] opacity-30 text-white">{c.nodeId}</span>
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: c.accent }} />
            <span className="font-mono text-[9px] tracking-widest" style={{ color: c.accent }}>VERIFIED</span>
          </div>
        </div>

        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border text-[10px] font-mono uppercase tracking-widest font-bold"
            style={{ color: c.accent, borderColor: c.accentBorder, background: c.accentDim }}>
            {c.short}
          </span>
          {cert.level && (
            <span className="inline-flex items-center px-2.5 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-white/35 uppercase tracking-widest">
              {cert.level}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm md:text-base font-bold text-white leading-snug transition-colors duration-300 group-hover:text-white"
          style={{ ["--acc" as string]: c.accent }}>
          <span className="group-hover:[color:var(--acc)] transition-colors duration-300"
            style={{ ["--acc" as string]: c.accent }}>
            {cert.title}
          </span>
        </h3>

        {/* Separator */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${c.accentBorder}, transparent)` }} />
          <span className="font-mono text-[8px] tracking-widest opacity-25 text-white uppercase">Status</span>
        </div>

        {/* Signal bar / status viz */}
        <div className="flex items-end gap-[2px] h-6">
          {statusSegments.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: c.accent, opacity: 0.15 }}
              whileHover={{ opacity: 0.7 }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + idx * 0.07 + i * 0.03, ease: EASE }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3 h-3" style={{ color: c.accent, opacity: 0.6 }} />
            <span className="text-[10px] font-mono uppercase tracking-wider opacity-50 text-white truncate max-w-[120px]">
              {cert.issuer}
            </span>
          </div>
          <a
            href={ISSUER_META[cert.issuer]?.url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[10px] font-mono text-white/25 hover:text-white/70 transition-colors duration-200"
          >
            verify <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative font-kanit rounded-t-section -mt-10 sm:-mt-12 md:-mt-14 z-40 overflow-hidden border-t border-white/10 min-h-screen flex flex-col justify-center bg-black"
      style={{ boxShadow: "0 -10px 40px rgba(0,0,0,0.6)" }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "70% center", opacity: 0.22 }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(96,165,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

        {/* Orbs */}
        <div className="absolute top-[10%] right-[8%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[8%] left-[5%] w-[320px] h-[320px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/3 w-[250px] h-[250px] rounded-full -translate-y-1/2"
          style={{ background: "radial-gradient(circle, rgba(45,212,191,0.04) 0%, transparent 70%)" }} />

        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 w-full h-[1px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.6), transparent)" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
        />

        {/* Vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 30%, rgba(0,0,0,0.65) 100%)" }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-20 md:pt-24 my-auto">

        {/* Eyebrow */}
        <FadeIn delay={0} y={20}>
          <div className="flex items-center gap-3 mb-5">
            <Cpu className="w-3.5 h-3.5 text-blue-400 opacity-70" />
            <p className="font-mono uppercase tracking-[0.25em] text-white/40 text-[11px]">
              Credentials &amp; Certifications
            </p>
            <div className="flex-1 h-px bg-white/8 max-w-[80px]" />
            <span className="font-mono text-[10px] text-blue-400/60 tracking-widest">VAULT::VERIFIED</span>
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.08} y={30}>
          <SectionHeading
            prefix="Credentials that "
            accentWord="check out"
            gradient="certifications"
            align="left"
            className="mb-4"
          />
        </FadeIn>

        {/* Subtitle + HUD stats */}
        <FadeIn delay={0.16} y={16}>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-end gap-6 mb-14 md:mb-20">
            <p className="text-white/45 max-w-xl font-kanit font-light text-base sm:text-lg flex-1">
              Cloud, GenAI, and data certifications from AWS, Oracle, HashiCorp, DeepLearning.AI, and UC Davis — all verifiable.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <HUDStat value={certifications.length} label="Credentials" accent="rgba(96,165,250,1)"   delay={0.2} />
              <HUDStat value={5}                     label="Issuers"     accent="rgba(167,139,250,0.9)" delay={0.26} suffix="+" />
              <HUDStat value={25}                    label="Active"      accent="rgba(45,212,191,0.9)"  delay={0.32} suffix="'" />
            </div>
          </div>
        </FadeIn>

        {/* ── Cert grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, idx) => (
            <CertCard key={idx} cert={cert} idx={idx} />
          ))}
        </div>

        {/* Footer CTA */}
        <FadeIn delay={0.5} y={16}>
          <div className="mt-10 flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/saranjthilak/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/50 text-sm font-mono hover:border-blue-500/40 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-300"
            >
              <Award className="w-4 h-4" />
              linkedin --verify-credentials=saranjthilak
              <BadgeCheck className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
