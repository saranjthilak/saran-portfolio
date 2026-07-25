"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt angle in degrees. Default 8 */
  tiltMax?: number;
  /** Scale on hover. Default 1.02 */
  scaleOnHover?: number;
  /** Glare highlight effect. Default true */
  glare?: boolean;
}

/**
 * 3D perspective tilt card — follows cursor position to create
 * a premium parallax hover effect. Inspired by Apple product cards.
 */
const TiltCard = ({
  children,
  className = "",
  tiltMax = 8,
  scaleOnHover = 1.02,
  glare = true,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Raw mouse-driven values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring-smoothed rotation
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltMax, -tiltMax]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltMax, tiltMax]), {
    stiffness: 150,
    damping: 20,
  });

  // Glare position
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      whileHover={{ scale: scaleOnHover }}
      transition={{ scale: { type: "spring", stiffness: 200, damping: 20 } }}
      className={`relative ${className}`}
    >
      {children}

      {/* Glare overlay */}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
