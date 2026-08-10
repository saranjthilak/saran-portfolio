"use client";

import { useEffect, useState } from "react";

const NODES = [
  { id: "works", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
];

const ScrollThread = () => {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NODES.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-700 xl:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative h-[46vh] w-px bg-border">
        <div
          className="absolute left-0 top-0 w-px bg-accent transition-[height] duration-200 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
        {NODES.map((n, i) => {
          const top = ((i + 0.5) / NODES.length) * 100;
          const isActive = active === n.id;
          return (
            <div key={n.id} className="absolute -left-[3px]" style={{ top: `${top}%` }}>
              <span className="relative block">
                {isActive && (
                  <span className="absolute -inset-[5px] animate-ping rounded-full bg-accent/25" />
                )}
                <span
                  className={`relative block h-[7px] w-[7px] rounded-full border transition-all duration-500 ${
                    isActive
                      ? "scale-125 border-accent bg-accent"
                      : "border-border bg-background"
                  }`}
                />
              </span>
              <span
                className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.18em] transition-all duration-500 ${
                  isActive ? "text-foreground opacity-100" : "text-muted-foreground opacity-0"
                }`}
              >
                {n.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollThread;
