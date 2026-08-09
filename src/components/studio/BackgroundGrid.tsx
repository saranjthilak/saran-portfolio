"use client";

import { useEffect, useState } from "react";

const BackgroundGrid = () => {
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY * 0.06));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="grid-drift absolute -inset-[60px]"
        style={{
          transform: `translate3d(0, ${-y}px, 0)`,
          backgroundImage:
            "linear-gradient(to right, hsl(var(--grid-line) / 0.06) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--grid-line) / 0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 30%, hsl(var(--background) / 0.9) 100%)",
        }}
      />
    </div>
  );
};

export default BackgroundGrid;
