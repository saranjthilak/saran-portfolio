import { useRef, useEffect, useState, type ReactNode } from "react";
import { useScroll } from "framer-motion";

interface MarqueeProps {
  children: ReactNode;
  /** Base speed in px/s. Default 60 */
  speed?: number;
  /** Direction: "left" (default) or "right" */
  direction?: "left" | "right";
  /** Whether scroll velocity affects marquee speed. Default true */
  scrollReactive?: boolean;
  /** Extra className on the wrapper */
  className?: string;
  /** Extra className on each copy of the content */
  itemClassName?: string;
  /** Pause on hover. Default false */
  pauseOnHover?: boolean;
}

/**
 * Infinite scroll-reactive marquee (inspired by meesverberne.com).
 *
 * - Duplicates content 4× for seamless looping
 * - Uses CSS translateX animation
 * - Adjusts animation speed based on scroll velocity
 * - Pauses when out of viewport via IntersectionObserver
 */
const Marquee = ({
  children,
  speed = 60,
  direction = "left",
  scrollReactive = true,
  className = "",
  itemClassName = "",
  pauseOnHover = false,
}: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  // IntersectionObserver — pause when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll velocity detection
  useEffect(() => {
    if (!scrollReactive) return;

    let rafId: number;
    const measure = () => {
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        const velocity = Math.abs(window.scrollY - lastScrollY.current) / dt;
        // Map velocity to speed multiplier: 0→1, high→3
        const multiplier = 1 + Math.min(velocity * 8, 2);
        setScrollSpeed((prev) => prev + (multiplier - prev) * 0.1); // smooth lerp
      }
      lastScrollY.current = window.scrollY;
      lastTime.current = now;
      rafId = requestAnimationFrame(measure);
    };
    rafId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(rafId);
  }, [scrollReactive]);

  // Compute animation duration from speed
  const baseDuration = 100 / speed; // seconds for one full cycle
  const adjustedDuration = baseDuration / scrollSpeed;

  const animDir = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{
        // Pause via CSS when not visible or reduced motion
        ["--marquee-play" as string]: isVisible ? "running" : "paused",
      }}
    >
      <div
        className={`inline-flex ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `${animDir} ${adjustedDuration}s linear infinite`,
          animationPlayState: isVisible ? "running" : "paused",
          willChange: "transform",
        }}
      >
        {/* 4 copies for seamless loop */}
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`inline-flex shrink-0 ${itemClassName}`} aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
