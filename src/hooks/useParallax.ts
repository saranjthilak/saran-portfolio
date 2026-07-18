import { useRef, type RefObject } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

interface UseParallaxOptions {
  /** Parallax speed factor. Positive = move with scroll, negative = against. Default 0.15 */
  speed?: number;
  /** Scroll offset config — defaults to element entering/leaving viewport */
  offset?: ["start end" | "end start" | "start start" | "end end", "start end" | "end start" | "start start" | "end end"];
}

/**
 * Viewport-center parallax hook (inspired by meesverberne.com).
 *
 * Returns a MotionValue<number> representing px offset.
 * When the element is centered in the viewport → offset is 0.
 * As it scrolls away from center → offset grows proportionally.
 */
export function useParallax(
  target: RefObject<HTMLElement>,
  options: UseParallaxOptions = {}
): MotionValue<number> {
  const { speed = 0.15, offset = ["start end", "end start"] } = options;

  const { scrollYProgress } = useScroll({
    target,
    offset,
  });

  // Map scroll progress [0,1] to pixel offset
  // At 0.5 (centered) → 0px offset
  // At 0 (entering bottom) → positive offset (pushed down)
  // At 1 (leaving top) → negative offset (pushed up)
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80 * speed, 0, -80 * speed]);

  return y;
}

/**
 * Convenience: returns both a ref and the parallax MotionValue.
 */
export function useParallaxRef(options: UseParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useParallax(ref as RefObject<HTMLElement>, options);
  return { ref, y };
}
