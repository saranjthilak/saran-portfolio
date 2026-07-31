"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type RevealPreset =
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "fade-down"
  | "blur-in"
  | "scale-up"
  | "slide-mask";

interface ScrollRevealProps {
  children: ReactNode;
  preset?: RevealPreset;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Duration of the animation */
  duration?: number;
  /** Extra className */
  className?: string;
  /** If true, staggers children (wrap children in individual elements) */
  stagger?: number;
  /** Viewport margin for triggering earlier/later */
  margin?: string;
  /** Whether to animate once or every time */
  once?: boolean;
}

const presets: Record<RevealPreset, { hidden: Record<string, unknown>; visible: Record<string, unknown> }> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-mask": {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
  },
};

/**
 * Reusable scroll-triggered reveal animation wrapper with multiple presets.
 *
 * Usage:
 * ```tsx
 * <ScrollReveal preset="blur-in">
 *   <Card />
 * </ScrollReveal>
 *
 * // With stagger for list items:
 * <ScrollReveal preset="fade-up" stagger={0.1}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </ScrollReveal>
 * ```
 */
const ScrollReveal = ({
  children,
  preset = "fade-up",
  delay = 0,
  duration = 0.7,
  className = "",
  stagger,
  margin = "-80px",
  once = true,
}: ScrollRevealProps) => {
  const hidden = presets[preset].hidden as any;
  const visible = presets[preset].visible as any;

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]; // Smooth ease-out

  if (stagger !== undefined) {
    // Stagger mode: wraps children in a container with staggerChildren
    const container: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    };

    const item: Variants = {
      hidden: hidden as Variants["hidden"],
      visible: {
        ...visible,
        transition: { duration, ease },
      },
    };

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: margin as `${number}px` }}
        variants={container}
        className={className}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={item}>
                {child}
              </motion.div>
            ))
          : <motion.div variants={item}>{children}</motion.div>
        }
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once, margin: margin as `${number}px` }}
      transition={{ duration, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
