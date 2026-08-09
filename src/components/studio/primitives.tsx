"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE_OUT = [0.215, 0.61, 0.355, 1] as [number, number, number, number];
export const EASE_QUART = [0.165, 0.84, 0.44, 1] as [number, number, number, number];

/* ── Icons ── */
export const LogoMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} width="1em" height="1em" fill="currentColor" aria-hidden>
    <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
  </svg>
);
export const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowUpRight = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const Star = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} width="1em" height="1em" fill="currentColor" aria-hidden>
    <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
  </svg>
);
export const Globe = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden>
    <circle cx="12" cy="12" r="9.25" />
    <path d="M12 2.75c2.6 2.3 4 5.8 4 9.25s-1.4 6.95-4 9.25c-2.6-2.3-4-5.8-4-9.25s1.4-6.95 4-9.25zM2.75 12h18.5" />
  </svg>
);
export const CloseIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
    <path d="M4 4l16 16M20 4 4 20" />
  </svg>
);
export const CircleDot = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
  </svg>
);
export const MenuIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

/* ── Eyebrow ── */
export const Eyebrow = ({ children, tone = "dark", bordered = false, className = "" }: { children: ReactNode; tone?: "dark" | "light"; bordered?: boolean; className?: string }) => (
  <span className={`eyebrow ${tone === "light" ? "eyebrow-light" : ""} ${bordered ? "rounded-full border border-border px-4 py-1.5" : ""} ${className}`}>
    {children}
  </span>
);

/* ── Pill button ── */
type PillProps = {
  children: ReactNode;
  variant?: "dark" | "light" | "outline";
  arrow?: "right" | "up-right" | null;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};
export const PillButton = ({ children, variant = "dark", arrow = null, href, onClick, type = "button", className = "" }: PillProps) => {
  const badge = variant === "dark" ? "bg-accent-foreground text-accent" : "bg-accent text-accent-foreground";
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className={`pill-badge ${badge}`}>
          {arrow === "right" ? <ArrowRight /> : <ArrowUpRight />}
        </span>
      )}
    </>
  );
  const cls = `pill pill-${variant} ${arrow ? "pill-arrow" : "pill-plain"} ${className}`;
  if (href) return <a href={href} className={cls}>{content}</a>;
  return <button type={type} onClick={onClick} className={cls}>{content}</button>;
};

/* ── Reveal ── */
export const Reveal = ({ children, delay = 0, y = 24, className = "", once = true }: { children: ReactNode; delay?: number; y?: number; className?: string; once?: boolean }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "-10%" }}
    transition={{ duration: 0.8, delay: delay / 1000, ease: EASE_OUT }}
  >
    {children}
  </motion.div>
);

/* ── Line reveal (clip) ── */
export const LineReveal = ({ lines, className = "", delay = 0, stagger = 120, active = true }: { lines: string[]; className?: string; delay?: number; stagger?: number; active?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const go = inView && active;
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={line + i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "100%", opacity: 0 }}
            animate={go ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: delay / 1000 + (i * stagger) / 1000, ease: EASE_OUT }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ── Word reveal ── */
export const WordReveal = ({ text, className = "", mutedFrom, delay = 0 }: { text: string; className?: string; mutedFrom?: number; delay?: number }) => {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ staggerChildren: 0.035, delayChildren: delay / 1000 }}
    >
      {words.map((w, i) => (
        <motion.span
          key={w + i}
          className={`inline-block ${mutedFrom !== undefined && i >= mutedFrom ? "text-muted-foreground" : ""}`}
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: EASE_QUART }}
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
};

/* ── Scroll count-up ── */
export const ScrollCount = ({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const text = useTransform(spring, (v) => v.toFixed(decimals));
  const [out, setOut] = useState("0");
  useEffect(() => { if (inView) mv.set(value); }, [inView, mv, value]);
  useEffect(() => text.on("change", (v) => setOut(v)), [text]);
  return <span ref={ref} className="tnum">{out}{suffix}</span>;
};
