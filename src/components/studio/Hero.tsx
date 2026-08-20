"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

// ─── Terminal sequence timing ──────────────────────────────────────────────────
const PROMPT_TEXT  = "> initializing_profile.exe";
const NAME_TEXT    = "Saran Jaya Thilak";
const TITLE_TEXT   = "RAG · Pipelines · Cloud · LLMs";

// ═══ Mainframe-style cycling taglines ═══════════════════════════════════════
const TAGLINES = [
  "Building data infrastructure that never sleeps.",
  "Shipping LLM products from prototype to production.",
  "Turning raw pipelines into intelligent systems.",
  "Code that scales · Systems that reason · Products that ship.",
] as const;
const PROMPT_SPEED = 38;   // ms per char — prompt line
const NAME_SPEED   = 30;   // ms per char — name
const TITLE_SPEED  = 22;   // ms per char — title
const CLEAR_PAUSE  = 180;  // ms pause before clearing prompt
const NAME_START_DELAY = 80; // ms after prompt fades before name starts

// ─── Hook: one-per-session terminal typewriter ────────────────────────────────
function useTerminalSequence(active: boolean, reduced: boolean) {
  const SESSION_KEY = "hero_terminal_done";

  // If already ran this session → skip straight to done
  const alreadyRan = typeof window !== "undefined"
    ? sessionStorage.getItem(SESSION_KEY) === "1"
    : false;

  const [promptText,   setPromptText]   = useState(alreadyRan ? ""  : "");
  const [promptVisible,setPromptVisible]= useState(!alreadyRan);
  const [nameText,     setNameText]     = useState(alreadyRan ? NAME_TEXT  : "");
  const [titleText,    setTitleText]    = useState(alreadyRan ? TITLE_TEXT : "");
  const [showCursor,   setShowCursor]   = useState(!alreadyRan);
  const [cursorTarget, setCursorTarget] = useState<"prompt" | "name" | "title" | "none">("prompt");

  useEffect(() => {
    if (!active || alreadyRan || reduced) {
      // Skip: show final state immediately
      setPromptVisible(false);
      setNameText(NAME_TEXT);
      setTitleText(TITLE_TEXT);
      setShowCursor(false);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, ms: number) => {
      const t = setTimeout(() => { if (!cancelled) fn(); }, ms);
      timers.push(t);
      return ms;
    };

    // Type the prompt character by character
    let elapsed = 0;
    setCursorTarget("prompt");
    setShowCursor(true);

    for (let i = 0; i <= PROMPT_TEXT.length; i++) {
      const captured = i;
      elapsed += PROMPT_SPEED;
      schedule(() => {
        setPromptText(PROMPT_TEXT.slice(0, captured));
      }, elapsed);
    }

    // Pause, then fade prompt out
    elapsed += CLEAR_PAUSE;
    schedule(() => {
      setPromptVisible(false);
      setPromptText("");
    }, elapsed);

    // Brief gap, then switch cursor target to name and start typing
    elapsed += NAME_START_DELAY;
    schedule(() => setCursorTarget("name"), elapsed);

    for (let i = 0; i <= NAME_TEXT.length; i++) {
      const captured = i;
      elapsed += NAME_SPEED;
      schedule(() => {
        setNameText(NAME_TEXT.slice(0, captured));
      }, elapsed);
    }

    // Then type title
    elapsed += 40; // small gap between name and title
    schedule(() => setCursorTarget("title"), elapsed);

    for (let i = 0; i <= TITLE_TEXT.length; i++) {
      const captured = i;
      elapsed += TITLE_SPEED;
      schedule(() => {
        setTitleText(TITLE_TEXT.slice(0, captured));
      }, elapsed);
    }

    // Done — hide cursor, mark session
    elapsed += 200;
    schedule(() => {
      setShowCursor(false);
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    }, elapsed);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return { promptText, promptVisible, nameText, titleText, showCursor, cursorTarget };
}

// ─── Blinking block cursor ────────────────────────────────────────────────────

// === Cycling tagline hook ====================================================
function useCyclingTagline() {
  const TAGLINES = [
    "Building data infrastructure that never sleeps.",
    "Shipping LLM products from prototype to production.",
    "Turning raw pipelines into intelligent systems.",
    "Code that scales · Systems that reason · Products that ship.",
  ];
  const [index,     setIndex]     = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [fadingOut, setFadingOut] = useState(false);
  const SPEED = 28;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;
    let charIdx = 0;
    const text = TAGLINES[index];

    setDisplayed("");
    charIdx = 0;
    interval = setInterval(() => {
      charIdx += 1;
      setDisplayed(text.slice(0, charIdx));
      if (charIdx >= text.length) clearInterval(interval);
    }, SPEED);

    const fullLen = text.length * SPEED;
    timeout = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setIndex(i => (i + 1) % TAGLINES.length);
        setFadingOut(false);
      }, 380);
    }, fullLen + 3500);

    return () => { clearInterval(interval); clearTimeout(timeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return { displayed, fadingOut };
}
const BlockCursor = () => (
  <span
    aria-hidden
    className="inline-block w-[0.55em] h-[0.85em] align-middle bg-accent ml-[2px] hero-cursor"
    style={{ verticalAlign: "middle" }}
  />
);

// ─── Component ────────────────────────────────────────────────────────────────
const Hero = ({ ready, scrollToSection, onResume }: HeroProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY       = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  const contentScale   = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.95]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28 } as const,
    animate: ready ? ({ opacity: 1, y: 0 } as const) : ({ opacity: 0, y: 28 } as const),
    transition: { duration: 0.85, delay, ease },
  });

  const {
    promptText, promptVisible, nameText, titleText,
    showCursor, cursorTarget,
  } = useTerminalSequence(ready, !!reduce);

  // Mainframe-style cycling tagline
  const { displayed: taglineText, fadingOut: taglineFading } = useCyclingTagline();

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
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">v1.0</span>
          <span className="h-3 w-px bg-foreground/10" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">Berlin, DE</span>
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
        <motion.div {...fadeUp(0.25)} className="group relative mb-8">
          <div
            className="absolute -inset-[3px] rounded-full animate-spin-slow opacity-60 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              animationDuration: '6s',
              background: 'conic-gradient(from 0deg, hsl(var(--accent)), hsl(var(--primary)), hsl(var(--accent)))',
            }}
          />
          <div className="absolute -inset-2 rounded-full animate-avatar-pulse" />
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

        {/* ── Terminal headline block ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative mb-6 w-full"
        >
          {/* Prompt line — above the name, fades once done */}
          <div
            aria-hidden
            className="mb-3 flex justify-center transition-opacity duration-200"
            style={{ opacity: promptVisible ? 1 : 0, minHeight: "1.4em" }}
          >
            <span className="font-mono text-xs tracking-[0.12em] text-accent/70 sm:text-sm">
              {promptText}
              {showCursor && cursorTarget === "prompt" && <BlockCursor />}
            </span>
          </div>

          {/* Name — terminal typed */}
          <h1 className="font-display text-5xl font-semibold leading-[0.92] tracking-tighter text-foreground sm:text-7xl md:text-8xl lg:text-[6.5rem]">
            {/* Line 1 */}
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="block">
                {/* We split the typed name into line 1 / line 2 */}
                {nameText.length <= "Saran Jaya".length
                  ? nameText
                  : "Saran Jaya"}
                {showCursor && cursorTarget === "name" && nameText.length <= "Saran Jaya".length && <BlockCursor />}
              </span>
            </span>
            {/* Line 2 */}
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="block italic font-normal text-foreground/80">
                {nameText.length > "Saran Jaya ".length
                  ? nameText.slice("Saran Jaya ".length)
                  : ""}
                {showCursor && cursorTarget === "name" && nameText.length > "Saran Jaya".length && <BlockCursor />}
              </span>
            </span>
          </h1>

          {/* Title line — typed below name */}
          <div className="mt-4 flex justify-center">
            <span className="font-mono text-xs tracking-[0.12em] text-accent/60 sm:text-sm">
              {titleText.length > 0 && <span className="text-accent/40 mr-1">//</span>}
              {titleText}
              {showCursor && cursorTarget === "title" && <BlockCursor />}
            </span>
          </div>

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
        </motion.div>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.7)}
          className="mb-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
        >
          Reliable infrastructure that never sleeps,{" "}
          <span className="text-foreground font-medium">AI products that ship</span>.{" "}
          Proven at{" "}
          <span className="link-sheen font-medium text-foreground underline decoration-1 underline-offset-4">Tesla</span>,{" "}
          <span className="link-sheen font-medium text-foreground underline decoration-1 underline-offset-4">Huawei</span>, and{" "}
          <span className="link-sheen font-medium text-foreground underline decoration-1 underline-offset-4">Nokia</span>.
        </motion.p>

        {/* ═══ Cycling tagline — Mainframe style ═══ */}
        <motion.div
          {...fadeUp(0.78)}
          className="mb-8 h-[1.8em] overflow-hidden"
        >
          <motion.p
            key={taglineText.slice(0, 12)}
            animate={{ opacity: taglineFading ? 0 : 1, y: taglineFading ? -6 : 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent/50 sm:text-xs"
          >
            {taglineText}
            {!taglineFading && (
              <span
                aria-hidden
                className="inline-block w-[0.45em] h-[0.75em] bg-accent/50 align-middle ml-[2px] hero-cursor"
              />
            )}
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.85)}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <button
              onClick={() => scrollToSection("works")}
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-accent-foreground transition-all active:scale-95"
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = "scale(1.06) translateY(-2px)";
                el.style.boxShadow = "0 8px 32px hsl(var(--accent) / 0.45)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = "";
                el.style.boxShadow = "";
              }}
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
              className="group inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-foreground/5 px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-foreground/80 backdrop-blur-sm transition-all active:scale-95"
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = "scale(1.06) translateY(-2px)";
                el.style.borderColor = "rgba(255,255,255,0.3)";
                el.style.color = "#fff";
                el.style.boxShadow = "0 8px 28px rgba(255,255,255,0.08)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = "";
                el.style.borderColor = "";
                el.style.color = "";
                el.style.boxShadow = "";
              }}
            >
              <span className="text-foreground/30">[</span>
              <Download className="w-3.5 h-3.5" />
              Download CV
              <span className="text-foreground/30">]</span>
            </button>
          </Magnetic>
        </motion.div>

        {/* Glassmorphic Stats Row */}
        <motion.div {...fadeUp(1.0)} className="mt-16 w-full max-w-3xl">
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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

      {/* Cursor blink keyframes */}
      <style>{`
        .hero-cursor {
          animation: hero-blink 0.7s step-start infinite;
        }
        @keyframes hero-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;


