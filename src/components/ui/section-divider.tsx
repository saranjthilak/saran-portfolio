import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

interface SectionDividerProps {
  variant?: "cyan" | "fuchsia" | "mixed";
  flip?: boolean;
}

const COLORS = {
  cyan: { primary: "#22d3ee", secondary: "#06b6d4", glow: "rgba(34,211,238,0.6)" },
  fuchsia: { primary: "#e879f9", secondary: "#d946ef", glow: "rgba(232,121,249,0.6)" },
  mixed: { primary: "#818cf8", secondary: "#22d3ee", glow: "rgba(129,140,248,0.5)" },
};

/* Deterministic pseudo-random for particle placement */
const sRand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const SectionDivider = ({ variant = "cyan", flip = false }: SectionDividerProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const colors = COLORS[variant];

  /* Generate particles deterministically */
  const particles = useMemo(() => {
    const seed = variant === "cyan" ? 1 : variant === "fuchsia" ? 2 : 3;
    return Array.from({ length: 7 }, (_, i) => ({
      id: i,
      yOffset: (sRand(seed * 10 + i) - 0.5) * 300,
      xOffset: (sRand(seed * 10 + i + 50) - 0.5) * 30,
      size: 1.5 + sRand(seed * 10 + i + 100) * 2,
      delay: sRand(seed * 10 + i + 150) * 2,
      duration: 2 + sRand(seed * 10 + i + 200) * 3,
    }));
  }, [variant]);

  if (reduce) {
    return (
      <div
        ref={ref}
        className="relative h-full w-px pointer-events-none select-none"
        style={{ background: `linear-gradient(180deg, transparent, ${colors.primary}40, transparent)` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={ref}
      className="relative h-full pointer-events-none select-none overflow-visible"
      style={{ width: "60px" }}
      aria-hidden="true"
    >
      {/* ── Center energy beam ── */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px">
        {/* Base line */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 5%, ${colors.primary}30 20%, ${colors.primary}60 50%, ${colors.secondary ?? colors.primary}30 80%, transparent 95%)`,
          }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style-origin="center"
        />

        {/* Bright core line */}
        <motion.div
          className="absolute inset-0 w-px"
          style={{
            background: `linear-gradient(180deg, transparent 10%, ${colors.primary}80 30%, ${colors.primary} 50%, ${colors.secondary ?? colors.primary}80 70%, transparent 90%)`,
            boxShadow: `0 0 12px ${colors.glow}, 0 0 24px ${colors.glow}`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Shimmer sweep */}
        {isInView && (
          <motion.div
            className="absolute left-0 w-px h-32"
            style={{
              background: `linear-gradient(180deg, transparent, ${colors.primary}, transparent)`,
              boxShadow: `0 0 16px ${colors.glow}`,
              filter: "blur(1px)",
            }}
            animate={{
              top: flip ? ["100%", "-10%"] : ["-10%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            }}
          />
        )}
      </div>

      {/* ── Center glitch burst ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Diamond shape */}
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="w-3 h-3 rotate-45"
            style={{
              background: colors.primary,
              boxShadow: `0 0 12px ${colors.glow}, 0 0 24px ${colors.glow}, 0 0 48px ${colors.glow}`,
            }}
          />

          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 w-3 h-3 rotate-45 border"
            style={{ borderColor: colors.primary }}
            animate={{
              scale: [1, 3, 5],
              opacity: [0.6, 0.2, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute inset-0 w-3 h-3 rotate-45 border"
            style={{ borderColor: colors.secondary ?? colors.primary }}
            animate={{
              scale: [1, 2.5, 4],
              opacity: [0.5, 0.15, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1.8,
            }}
          />
        </motion.div>
      </div>

      {/* ── Scattered particles ── */}
      {isInView &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: p.id % 2 === 0 ? colors.primary : (colors.secondary ?? colors.primary),
              boxShadow: `0 0 6px ${colors.glow}`,
            }}
            initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
            animate={{
              y: [0, p.yOffset * 0.5, p.yOffset],
              x: [0, p.xOffset - 5, p.xOffset],
              opacity: [0, 0.8, 0],
              scale: [0, 1.2, 0.5],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay + 0.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

      {/* ── Side accent ticks ── */}
      {[0.15, 0.85].map((pos, i) => (
        <motion.div
          key={`tick-${i}`}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: `${pos * 100}%`,
            height: "1px",
            width: "12px",
            background: `linear-gradient(90deg, transparent, ${colors.primary}60, transparent)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 0.6 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.8 + i * 0.15 }}
        />
      ))}
    </div>
  );
};

export default SectionDivider;