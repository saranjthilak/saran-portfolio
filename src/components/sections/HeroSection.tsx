
import { ArrowRight, Download } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import CountUp from "@/components/ui/count-up";
import { useEffect, useRef, useState } from "react";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
  handleDownloadResume: () => void;
}

const stats = [
  { value: 99.9, suffix: "%", decimals: 1, label: "ML Reliability" },
  { value: 40, suffix: "%", decimals: 0, label: "RAG Speed Boost", delta: true },
  { value: 30, suffix: "%", decimals: 0, label: "Accuracy Gain" },
  { value: 3, suffix: "+", decimals: 0, label: "Years Experience" },
];

const techKeywords = [
  { label: "RAG", x: "8%", y: "8%", delay: "0s", dur: "7s" },
  { label: "LLMs", x: "72%", y: "5%", delay: "1.2s", dur: "8s" },
  { label: "Airflow", x: "5%", y: "75%", delay: "0.5s", dur: "9s" },
  { label: "FAISS", x: "75%", y: "80%", delay: "2s", dur: "7.5s" },
  { label: "PyTorch", x: "60%", y: "35%", delay: "0.8s", dur: "8.5s" },
  { label: "Vector DB", x: "3%", y: "40%", delay: "1.5s", dur: "6.5s" },
  { label: "AWS", x: "78%", y: "55%", delay: "2.5s", dur: "7s" },
  { label: "Docker", x: "35%", y: "88%", delay: "0.3s", dur: "9.5s" },
  { label: "Python", x: "55%", y: "12%", delay: "1.8s", dur: "8s" },
  { label: "ETL", x: "20%", y: "60%", delay: "3s", dur: "7.5s" },
];

/* Binary/hex strings for the data overlay */
const dataLines = [
  "0x4A 0x54 0x48 0x49 0x4C",
  "STREAM_ACTIVE //ok",
  "node.sync() → 200",
  "▓▓▓▓▓▓▓░░░ 72%",
  "ml.predict(batch_09)",
  "FAISS.index ✓ dim=768",
  "torch.cuda → gpu:0",
  "latency: 12ms ▼",
];

const HeroSection = ({ scrollToSection, handleDownloadResume }: HeroSectionProps) => {
  const reduce = useReducedMotion();
  const [glitchActive, setGlitchActive] = useState(false);
  const glitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Periodic random glitch burst */
  useEffect(() => {
    if (reduce) return;
    const triggerGlitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200 + Math.random() * 300);
      glitchTimerRef.current = setTimeout(triggerGlitch, 3000 + Math.random() * 5000);
    };
    glitchTimerRef.current = setTimeout(triggerGlitch, 2000);
    return () => {
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
    };
  }, [reduce]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-stretch overflow-hidden bg-background"
    >
      {/* Dot grid backdrop */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-60" aria-hidden />

      <div className="relative flex-1 flex flex-col lg:flex-row">
        {/* ═══ Left: Main content ═══ */}
        <div className="flex-1 flex flex-col p-8 sm:p-12 lg:p-16 border-r border-border z-10">
          <motion.div
            className="flex-1 flex flex-col justify-center gap-8 max-w-2xl"
            variants={container}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
          >
            <motion.span
              variants={item}
              className="inline-flex self-start items-center gap-2 px-2.5 py-1 border border-primary/30 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Data Engineer &amp; Generative AI Specialist
            </motion.span>

            <motion.h1
              variants={item}
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-foreground tracking-tighter leading-[0.85] uppercase"
            >
              Saran<br />Jaya<br />Thilak
            </motion.h1>

            <motion.p
              variants={item}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed border-l-2 border-border pl-6 max-w-lg"
            >
              Architecting resilient data infrastructure and LLM-powered systems.
              3 years designing RAG pipelines, vector-database retrieval, and
              production-scale ML deployments — with 99.9% reliability and a 30%
              lift in LLM classification accuracy.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToSection("projects")}
                className="group inline-flex items-center gap-3 px-7 py-4 bg-foreground text-background font-bold uppercase text-xs tracking-[0.2em] hover:bg-primary transition-colors"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-3 px-7 py-4 border border-border text-foreground font-bold uppercase text-xs tracking-[0.2em] hover:bg-foreground/5 hover:border-primary/40 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download CV
              </button>
            </motion.div>
          </motion.div>

          {/* Stats footer strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border-t border-border mt-12 -mx-8 sm:-mx-12 lg:-mx-16 -mb-8 sm:-mb-12 lg:-mb-16">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group bg-background p-6 flex flex-col justify-center gap-1"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
                  {s.label}
                </span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
                  <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals} />
                  {s.delta && <span className="text-xs text-[hsl(var(--signal))] ml-1">+</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ Right: Immersive Avatar Panel ═══ */}
        <div className="hidden lg:flex lg:w-[42%] relative items-center justify-center overflow-hidden">
          {/* ── Background: radial glow matching primary color ── */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 50% 45%, hsl(24 95% 53% / 0.08) 0%, transparent 70%),
                radial-gradient(ellipse 60% 80% at 30% 60%, hsl(190 85% 53% / 0.05) 0%, transparent 60%)
              `,
            }}
          />

          {/* ── Animated scanlines overlay ── */}
          <div className="hero-scanlines absolute inset-0 pointer-events-none z-20" />

          {/* ── Rotating reticle ring ── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div
              className="hero-reticle"
              style={{
                width: "clamp(280px, 70%, 420px)",
                height: "clamp(280px, 70%, 420px)",
              }}
            />
          </div>

          {/* ── Floating tech keywords ── */}
          {techKeywords.map((tag) => (
            <span
              key={tag.label}
              className="absolute font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-1 border border-primary/15 text-primary/30 bg-primary/[0.03] select-none pointer-events-none z-30"
              style={{
                left: tag.x,
                top: tag.y,
                animation: `cyber-float ${tag.dur} ease-in-out infinite`,
                animationDelay: tag.delay,
              }}
            >
              {tag.label}
            </span>
          ))}

          {/* ── The image itself with merge effects ── */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Hexagonal / circular image with gradient mask to merge into BG */}
            <div
              className={`hero-avatar-wrapper ${glitchActive ? "hero-glitch-active" : ""}`}
              style={{
                width: "clamp(300px, 75%, 450px)",
                height: "clamp(300px, 75%, 450px)",
              }}
            >
              {/* RGB shift layers (only visible during glitch) */}
              <div className="hero-rgb-layer hero-rgb-red">
                <img
                  src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hero-rgb-layer hero-rgb-blue">
                <img
                  src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main image */}
              <div className="hero-avatar-img">
                <img
                  src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png"
                  alt="Saran Jaya Thilak"
                  width="640"
                  height="640"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient mask overlay to dissolve edges */}
              <div className="hero-avatar-fade" />

              {/* Scanline bar sweeping over the image */}
              <div className="hero-scan-bar" />
            </div>
          </div>

          {/* ── Data stream overlay ── */}
          <div className="absolute right-6 top-12 bottom-12 w-[140px] pointer-events-none z-30 overflow-hidden opacity-40">
            <div className="hero-data-stream font-mono text-[8px] text-primary/60 leading-[2.4] whitespace-nowrap">
              {[...dataLines, ...dataLines, ...dataLines].map((line, i) => (
                <div key={i} className="hero-data-line" style={{ animationDelay: `${i * 0.3}s` }}>
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* ── Corner brackets (HUD targeting) ── */}
          <span className="absolute top-6 left-6 w-8 h-8 border-t border-l border-primary/40 z-30" />
          <span className="absolute top-6 right-6 w-8 h-8 border-t border-r border-primary/40 z-30" />
          <span className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-primary/40 z-30" />
          <span className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-primary/40 z-30" />

          {/* ── Status footer ── */}
          <div className="absolute right-4 bottom-4 font-mono text-[8px] text-muted-foreground/50 leading-tight tracking-widest text-right z-30">
            <span className="text-primary/60">●</span> DATA_STREAM_8829<br />
            BERLIN_NODE_04<br />
            STABLE_BUILD_2026
          </div>

          {/* ── Coordinate label ── */}
          <div className="absolute left-6 bottom-4 font-mono text-[8px] text-muted-foreground/30 tracking-widest z-30">
            52.5200°N 13.4050°E
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
