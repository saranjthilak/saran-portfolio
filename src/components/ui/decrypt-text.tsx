import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface DecryptTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  chars?: string;
}

const DEFAULT_CHARS = "!<>-_\\/[]{}—=+*^?#________";

const DecryptText = ({
  text,
  className,
  duration = 1600,
  delay = 0,
  chars = DEFAULT_CHARS,
}: DecryptTextProps) => {
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(reduce ? text : "");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) {
      setOutput(text);
      return;
    }
    let start = 0;
    const timer = window.setTimeout(() => {
      const tick = (ts: number) => {
        if (!start) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        const revealed = Math.floor(progress * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (i < revealed || text[i] === " ") {
            out += text[i];
          } else {
            out += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setOutput(out);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setOutput(text);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, duration, delay, chars, reduce]);

  return (
    <span className={className} aria-label={text}>
      {output || "\u00A0"}
    </span>
  );
};

export default DecryptText;