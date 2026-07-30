"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** Max displacement in pixels. Default 10 */
  strength?: number;
  /** Element tag or component. */
  as?: "button" | "a" | "div";
  [key: string]: unknown;
}

/**
 * Magnetic hover button — element subtly follows the cursor
 * within its bounds, snapping back on leave. Premium micro-interaction.
 */
const MagneticButton = ({
  children,
  className = "",
  strength = 10,
  as: Tag = "button",
  ...props
}: MagneticButtonProps) => {
  const ref = useRef<any>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * (strength / (rect.width / 2)));
    y.set((e.clientY - centerY) * (strength / (rect.height / 2)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Use motion.button/motion.a/motion.div based on `as` prop
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
};

export default MagneticButton;
