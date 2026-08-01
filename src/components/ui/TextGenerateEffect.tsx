"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TextGenerateEffectProps {
  /** The text to generate character by character */
  text: string;
  /** Delay per character in seconds */
  charDelay?: number;
  /** Initial delay before starting */
  startDelay?: number;
  /** Extra className on the wrapper */
  className?: string;
  /** Callback when generation completes */
  onComplete?: () => void;
}

/**
 * Text generate effect — characters appear one-by-one with a sweeping
 * glow cursor. Inspired by Aceternity UI's TextGenerateEffect.
 */
const TextGenerateEffect = ({
  text,
  charDelay = 0.04,
  startDelay = 0.5,
  className = "",
  onComplete,
}: TextGenerateEffectProps) => {
  const reduce = useReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), startDelay * 1000);
    return () => clearTimeout(timer);
  }, [startDelay]);

  // Trigger onComplete after all characters have appeared
  useEffect(() => {
    if (!hasStarted || !onComplete) return;
    const totalDuration = text.length * charDelay * 1000 + 400;
    const timer = setTimeout(onComplete, totalDuration);
    return () => clearTimeout(timer);
  }, [hasStarted, text.length, charDelay, onComplete]);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const characters = text.split("");

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
          animate={
            hasStarted
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : {}
          }
          transition={{
            duration: 0.35,
            delay: i * charDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}

      {/* Sweeping cursor/caret */}
      <motion.span
        className="inline-block w-[3px] h-[0.85em] bg-primary rounded-full self-center ml-1"
        initial={{ opacity: 0 }}
        animate={
          hasStarted
            ? {
                opacity: [0, 1, 1, 0],
              }
            : {}
        }
        transition={{
          duration: text.length * charDelay + 0.5,
          times: [0, 0.02, 0.85, 1],
          ease: "linear",
        }}
      />
    </span>
  );
};

export default TextGenerateEffect;
