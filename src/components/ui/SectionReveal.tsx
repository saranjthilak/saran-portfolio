import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface SectionRevealProps {
  children: ReactNode;
  accent?: string; // CSS color for edge glow
  className?: string;
}

/**
 * Wraps a section and applies scroll-driven 3D perspective transforms:
 *  - rotateX tilt-in
 *  - scale from 0.96 → 1
 *  - subtle blur that clears
 *  - colored edge glow that fades in/out
 */
const SectionReveal = ({ children, accent = "rgba(34,211,238,0.3)", className }: SectionRevealProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // "start end" = target top hits viewport bottom
    // "end start" = target bottom hits viewport top
    offset: ["start end", "end start"],
  });

  // Map scroll progress to transforms
  // 0 = section top at viewport bottom (entering)
  // 0.5 = section centered in viewport
  // 1 = section bottom at viewport top (leaving)

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    reduce ? [0, 0, 0, 0, 0] : [3.5, 0.5, 0, 0.5, 3.5]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    reduce ? [1, 1, 1, 1, 1] : [0.965, 0.995, 1, 0.995, 0.965]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    reduce ? [0, 0, 0, 0, 0] : [40, 8, 0, -8, -40]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.3, 0.7, 0.88, 1],
    reduce ? [1, 1, 1, 1, 1, 1] : [0.4, 0.85, 1, 1, 0.85, 0.4]
  );

  const blur = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.7, 0.85, 1],
    reduce ? [0, 0, 0, 0, 0, 0] : [4, 1, 0, 0, 1, 4]
  );

  const filterValue = useTransform(blur, (v) => `blur(${v}px)`);

  // Edge glow opacity — brightest when entering/leaving
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.65, 0.85, 1],
    reduce ? [0, 0, 0, 0, 0, 0] : [0.7, 0.3, 0, 0, 0.3, 0.7]
  );

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative ${className ?? ""}`} style={{ perspective: "1200px" }}>
      {/* Top edge glow */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 right-0 h-32 z-10"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${accent}, transparent)`,
        }}
      />

      {/* Bottom edge glow */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${accent}, transparent)`,
        }}
      />

      <motion.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
          filter: filterValue,
          transformOrigin: "center center",
          willChange: "transform, opacity, filter",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SectionReveal;
