"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * Pill-label cursor shown while hovering project cards inside a container.
 * Wrap a section with <ProjectCursor> and mark hover targets with
 * `data-project-cursor` (and `cursor-none`).
 */
const ProjectCursor = ({
  label = "View Project",
  children,
  className = "",
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const over = (e.target as HTMLElement)?.closest?.("[data-project-cursor]");
      setActive(Boolean(over));
    };
    const onLeave = () => setActive(false);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onLeave, { passive: true });

    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (pillRef.current) {
        pillRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
      <div
        ref={pillRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden md:block"
      >
        <span
          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-background shadow-[0_10px_30px_-12px_hsl(var(--foreground)/0.6)] transition-all duration-300 ease-out ${
            active ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          {label}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
};

export default ProjectCursor;
