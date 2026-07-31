"use client";

import { motion } from "framer-motion";

type DividerVariant = "glow-line" | "dot-fade" | "wave";

interface SectionDividerProps {
  variant?: DividerVariant;
  className?: string;
}

/**
 * Creative section dividers that replace the simple gradient line.
 *
 * Variants:
 * - glow-line: Gradient line that pulses with a traveling glow
 * - dot-fade: Three dots that fade in sequence
 * - wave: Subtle animated SVG wave
 */
const SectionDivider = ({ variant = "glow-line", className = "" }: SectionDividerProps) => {
  if (variant === "dot-fade") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className={`flex items-center justify-center gap-3 my-16 sm:my-24 ${className}`}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-1.5 h-1.5 rounded-full bg-white/20"
          />
        ))}
      </motion.div>
    );
  }

  if (variant === "wave") {
    return (
      <div className={`relative w-full h-16 my-8 sm:my-16 overflow-hidden ${className}`}>
        <motion.svg
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1 }}
          viewBox="0 0 1440 60"
          fill="none"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 30C240 10 480 50 720 30C960 10 1200 50 1440 30"
            stroke="url(#wave-gradient)"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="hsl(217 91% 60% / 0.3)" />
              <stop offset="50%" stopColor="hsl(258 90% 66% / 0.4)" />
              <stop offset="70%" stopColor="hsl(217 91% 60% / 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    );
  }

  // Default: glow-line with traveling light
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full h-px my-16 sm:my-24 origin-center ${className}`}
    >
      {/* Base line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      {/* Traveling glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          style={{ animation: "travel-glow 4s ease-in-out infinite" }}
        />
      </div>
    </motion.div>
  );
};

export default SectionDivider;
