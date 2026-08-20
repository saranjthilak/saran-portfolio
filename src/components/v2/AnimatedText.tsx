"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText = ({ text, className = "" }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <p ref={ref} className={`relative ${className}`} aria-label={text}>
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = (i + 1) / chars.length;

        return (
          <span key={i} className="relative inline-block" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
            {/* Invisible placeholder to maintain layout */}
            <span aria-hidden className="invisible">{char}</span>
            {/* Animated overlay */}
            <motion.span
              aria-hidden
              className="absolute inset-0"
              style={{
                opacity: useTransform(scrollYProgress, [start, end], [0.15, 1]),
              }}
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
