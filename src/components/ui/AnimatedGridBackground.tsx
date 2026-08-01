"use client";

import { motion } from "framer-motion";

/**
 * Animated SVG grid background with radial fade mask and
 * subtle pulse animation. Replaces static SVG grid pattern.
 */
const AnimatedGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.2 }}
        style={{
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 45%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 45%, black 20%, transparent 70%)",
        }}
      >
        {/* Horizontal lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Animated crossing lines — vertical accent */}
        <motion.div
          className="absolute top-0 left-1/2 w-px h-full -translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, hsla(217, 91%, 60%, 0.1) 30%, hsla(217, 91%, 60%, 0.06) 70%, transparent)",
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style-origin="top"
        />

        {/* Animated crossing lines — horizontal accent */}
        <motion.div
          className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
          style={{
            background:
              "linear-gradient(to right, transparent, hsla(217, 91%, 60%, 0.08) 30%, hsla(217, 91%, 60%, 0.04) 70%, transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Subtle pulsing glow at grid center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsla(217, 91%, 60%, 0.06) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AnimatedGridBackground;
