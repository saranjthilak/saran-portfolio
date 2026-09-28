"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// Gradient stop sets — one per section so each feels distinct yet cohesive
export const HEADING_GRADIENTS = {
  // My Expertise — cyan → purple → amber (original)
  expertise: ["#06b6d4", "#a78bfa", "#f59e0b"],
  // GitHub — cyan → accent-green (code / open-source feel)
  github: ["hsl(var(--accent))", "#06b6d4"],
  // Experience — amber → rose (tenure / time)
  experience: ["#f59e0b", "#f43f5e"],
  // Projects — sky-blue → purple (product / creativity)
  projects: ["#38bdf8", "#a78bfa"],
  // Research — emerald → cyan (science / data)
  research: ["hsl(var(--accent))", "#06b6d4"],
  // Certifications — amber → emerald (achievement / growth)
  certifications: ["#f59e0b", "hsl(var(--accent))"],
} as const;

type GradientKey = keyof typeof HEADING_GRADIENTS;

interface SectionHeadingProps {
  /** Plain text before the accent word (include trailing space if needed) */
  prefix?: string;
  /** The word rendered in italic serif + animated gradient */
  accentWord: string;
  /** Optional text after the accent word (before the period) */
  suffix?: string;
  /** Which gradient palette to use */
  gradient?: GradientKey;
  /** Explicit gradient stops if you don't want a named palette */
  gradientStops?: string[];
  /** Tailwind alignment classes, e.g. "text-center" or "text-left" */
  align?: "left" | "center";
  /** Extra className on the h2 */
  className?: string;
  /** font-size clamp; defaults to "clamp(2.6rem, 6.5vw, 4.8rem)" */
  fontSize?: string;
}

export default function SectionHeading({
  prefix,
  accentWord,
  suffix,
  gradient = "expertise",
  gradientStops,
  align = "center",
  className = "",
  fontSize = "clamp(2.6rem, 6.5vw, 4.8rem)",
}: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stops = gradientStops ?? HEADING_GRADIENTS[gradient];
  // Build a CSS gradient string from the stops array
  const gradientCss =
    stops.length === 2
      ? `linear-gradient(135deg, ${stops[0]}, ${stops[1]})`
      : `linear-gradient(135deg, ${stops[0]}, ${stops[1]}, ${stops[2]})`;

  // For the per-char typewriter the delay accumulates after the prefix fade-in
  const prefixDelay = 0.35;
  const charDelay = 0.055;
  const typingEnd = prefixDelay + accentWord.length * charDelay;

  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <motion.h2
      ref={ref}
      className={`font-black leading-[0.92] tracking-tighter ${alignClass} ${className}`}
      style={{ fontSize }}
    >
      {/* Prefix — plain white, fades in first */}
      {prefix && (
        <motion.span
          className="text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {prefix}
        </motion.span>
      )}

      {/* Accent word — italic serif, gradient, per-character typewriter */}
      <span
        className="accent-serif"
        style={{
          background: gradientCss,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {accentWord.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.05, delay: prefixDelay + i * charDelay }}
          >
            {char}
          </motion.span>
        ))}
      </span>

      {/* Optional suffix after accent word */}
      {suffix && (
        <motion.span
          className="text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: prefixDelay + 0.1 }}
        >
          {suffix}
        </motion.span>
      )}

      {/* Animated period — spring-pops in after typing finishes */}
      <motion.span
        className="inline-block"
        style={{
          background: gradientCss,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 12,
          delay: typingEnd + 0.15,
        }}
      >
        .
      </motion.span>

      {/* Blinking cursor — loops a few times then disappears */}
      <motion.span
        className="inline-block w-[3px] h-[0.8em] ml-1 align-middle rounded-full"
        style={{ background: gradientCss }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{
          duration: 0.7,
          repeat: 5,
          delay: 0.4,
          repeatType: "loop",
        }}
      />
    </motion.h2>
  );
}
