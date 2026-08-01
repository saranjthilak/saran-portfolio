"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Full-viewport spotlight effect that follows the cursor.
 * Creates a large, soft radial gradient centered on the mouse position.
 * Inspired by Aceternity UI's Spotlight component.
 */
const SpotlightEffect = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring-physics tracking
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  // Transform to CSS background position
  const background = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(800px circle at ${x}px ${y}px, hsla(217, 91%, 60%, 0.07), hsla(258, 90%, 66%, 0.03) 40%, transparent 70%)`
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-500"
      style={{ background }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.2 }}
    />
  );
};

export default SpotlightEffect;
