"use client";

import { useEffect, useState, useCallback } from "react";

interface TextScrambleProps {
  /** Array of strings to cycle through */
  phrases: string[];
  /** Delay between phrases in ms. Default 3000 */
  interval?: number;
  /** Scramble animation speed in ms. Default 50 */
  speed?: number;
  className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

/**
 * Text scramble / decode effect — cycles through phrases with a
 * character-by-character decode animation. Inspired by terminal aesthetics.
 */
const TextScramble = ({
  phrases,
  interval = 3000,
  speed = 40,
  className = "",
}: TextScrambleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(phrases[0]);
  const [isScrambling, setIsScrambling] = useState(false);

  const scrambleTo = useCallback(
    (target: string) => {
      setIsScrambling(true);
      const length = Math.max(displayText.length, target.length);
      let iteration = 0;
      const totalIterations = length + 8; // extra iterations for tail effect

      const timer = setInterval(() => {
        setDisplayText(
          target
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              // Characters before the "reveal front" show final value
              if (i < iteration - 3) return target[i];
              // Characters at/near the front show random chars
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        iteration++;
        if (iteration > totalIterations) {
          clearInterval(timer);
          setDisplayText(target);
          setIsScrambling(false);
        }
      }, speed);

      return () => clearInterval(timer);
    },
    [displayText.length, speed]
  );

  useEffect(() => {
    if (phrases.length <= 1) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % phrases.length;
      setCurrentIndex(nextIndex);
      scrambleTo(phrases[nextIndex]);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, phrases, interval, scrambleTo]);

  return (
    <span className={`inline-block ${className}`}>
      {displayText}
    </span>
  );
};

export default TextScramble;
