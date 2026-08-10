"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Download } from "lucide-react";
import EmbeddingField from "./EmbeddingField";
import Magnetic from "./Magnetic";

interface HeroProps {
  ready: boolean;
  scrollToSection: (id: string) => void;
  onResume: () => void;
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stats = [
  { value: "99.9%", label: "ML Reliability" },
  { value: "40%", label: "RAG Speed Boost" },
  { value: "30%", label: "Accuracy Gain" },
  { value: "3+", label: "Years Experience" },
];

const Hero = ({ ready, scrollToSection, onResume }: HeroProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.95]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28 } as const,
    animate: ready ? ({ opacity: 1, y: 0 } as const) : ({} as const),
    transition: { duration: 0.85, delay, ease },
  });

  const words = (text: string) => text.split(" ");

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* Embedding-space backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <EmbeddingField className="opacity-[0.55]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80" />
      </div>

      {/* HUD Status Bar */}
      <motion.div
        {...fadeUp(0.15)}
        className="absolute top-6 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 lg:px-24"
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/80">
            System Online
          </span>
        </div>
        <div className="hidden items-center gap-6 sm:flex">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
            v1.0
          </span>
          <span className="h-3 w-px bg-foreground/10" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
            Berlin, DE
          </span>
          <span className="h-3 w-px bg-foreground/10" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
            Data &middot; AI &middot; Engineering
          </span>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center sm:px-8 md:px-12"
      >
        {/* Avatar Badge */}
        <motion.div
          {...fadeUp(0.25)}
          className="group relative mb-8"
        >
          {/* Rotating gradient ring */}
          <div
            className="absolute -inset-[3px] rounded-full animate-spin-slow opacity-60 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              animationDuration: '6s',
              background: 'conic-gradient(from 0deg, hsl(var(--accent)), hsl(var(--primary)), hsl(var(--accent)))',
            }}
          />
          {/* Glow pulse */}
          <div className="absolute -inset-2 rounded-full animate-avatar-pulse" />
          {/* Photo */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-background z-[1]">
            <img
              src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png"
              alt="Saran Jaya Thilak"
              className="w-full h-full object-cover object-[center_20%] transition-transform duration-[2s] group-hover:scale-110 grayscale-[0.15] group-hover:grayscale-0"
            />
          </div>
        </motion.div>

        {/* Role tag */}
        <motion.div {...fadeUp(0.35)} className="mb-6">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.8)]" />
            Data Engineer &amp; Generative AI Specialist
          </span>
        </motion.div>

        {/* Name */}
        <div className="relative mb-6">
          <h1 className="font-display text-5xl font-semibold leading-[0.92] tracking-tighter text-foreground sm:text-7xl md:text-8xl lg:text-[6.5rem]">
            {["Saran Jaya", "Thilak"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className={`block ${i === 1 ? "italic font-normal text-foreground/80" : ""}`}>
                  {words(line).map((word, j) => (
                    <motion.span
                      key={word + j}
                      className="inline-block"
                      initial={{ y: "115%", opacity: 0 }}
                      animate={ready ? { y: "0%", opacity: 1 } : {}}
                      transition={{
                        duration: 1,
                        delay: 0.4 + i * 0.16 + j * 0.09,
                        ease,
                      }}
                    >
                      {word}
                      {j < words(line).length - 1 ? "\u00A0" : ""}
                    </motion.span>
                  ))}
                </span>
              </span>
            ))}
          </h1>

          {/* Scan beam */}
          {!reduce && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute top-0 bottom-0 w-[2px] animate-hero-scan"
                style={{
                  background: 'linear-gradient(180deg, transparent, hsl(var(--accent)), transparent)',
                  boxShadow: '0 0 20px 4px hsl(var(--accent) / 0.4)',
                }}
              />
            </div>
          )}
        </div>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.7)}
          className="mb-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
        >
          Architecting resilient data infrastructure and{" "}
          <span className="text-foreground font-medium">LLM-powered systems</span>.{" "}
          Building production-scale AI at{" "}
          <span className="link-sheen font-medium text-foreground underline decoration-1 underline-offset-4">Tesla</span>,{" "}
          <span className="link-sheen font-medium text-foreground underline decoration-1 underline-offset-4">Huawei</span>, and{" "}
          <span className="link-sheen font-medium text-foreground underline decoration-1 underline-offset-4">Nokia</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.85)}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <button
              onClick={() => scrollToSection("works")}
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-accent-foreground transition-all hover:shadow-[0_0_30px_hsl(var(--accent)/0.4)] active:scale-95"
            >
              <span className="text-accent-foreground/50">[</span>
              Explore Work
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              <span className="text-accent-foreground/50">]</span>
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={onResume}
              className="group inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-foreground/5 px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-foreground/80 backdrop-blur-sm transition-all hover:border-foreground/30 hover:text-foreground active:scale-95"
            >
              <span className="text-foreground/30">[</span>
              <Download className="w-3.5 h-3.5" />
              Download CV
              <span className="text-foreground/30">]</span>
            </button>
          </Magnetic>
        </motion.div>

        {/* Glassmorphic Stats Row */}
        <motion.div
          {...fadeUp(1.0)}
          className="mt-16 w-full max-w-3xl"
        >
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={ready ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.1 + i * 0.1, duration: 0.7, ease }}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <span className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {s.value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeUp(1.3)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-foreground/30 transition-colors hover:text-foreground/60"
        >
          Scroll
          <span className="relative block h-8 w-px overflow-hidden bg-border">
            <span className="scroll-tick absolute inset-x-0 top-0 h-3 bg-foreground" />
          </span>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
