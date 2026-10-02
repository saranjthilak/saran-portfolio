"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  /** Initial scale value (default 1 = no scale animation) */
  scale?: number;
  /** Initial blur in pixels (default 0 = no blur animation) */
  blur?: number;
  /** Custom cubic-bezier easing array (default [0.25, 0.1, 0.25, 1]) */
  ease?: readonly number[];
  /** Viewport intersection margin (default "50px") */
  viewportMargin?: string;
}

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
  scale = 1,
  blur = 0,
  ease = [0.25, 0.1, 0.25, 1],
  viewportMargin = "50px",
}: FadeInProps) => {
  const hasScale = scale !== 1;
  const hasBlur = blur > 0;

  const hidden: Record<string, unknown> = { opacity: 0, x, y };
  const visible: Record<string, unknown> = { opacity: 1, x: 0, y: 0 };

  if (hasScale) {
    hidden.scale = scale;
    visible.scale = 1;
  }

  if (hasBlur) {
    hidden.filter = `blur(${blur}px)`;
    visible.filter = "blur(0px)";
  }

  const variants: Variants = {
    hidden,
    visible: {
      ...visible,
      transition: {
        duration,
        delay,
        ease: ease as number[],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin, amount: 0 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;

