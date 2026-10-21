"use client";

import { useRef } from "react";
import { fromMyWork } from "@/data/portfolio";

/* Duplicate the list so the CSS animation has enough content to loop seamlessly */
const items = [...fromMyWork, ...fromMyWork];

const FromMyWorkSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section
      aria-label="Proof points from real work"
      className="relative overflow-hidden border-y border-white/[0.06] bg-v2-base"
      style={{ padding: "1.75rem 0" }}
    >
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-v2-base to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-v2-base to-transparent" />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex items-center gap-0 will-change-transform from-my-work-track"
        style={{ width: "max-content" }}
      >
        {items.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="flex items-center flex-shrink-0"
          >
            {/* Numbered proof point */}
            <div className="flex items-baseline gap-3 px-8 group cursor-default select-none">
              <span
                className="font-mono text-[10px] tracking-[0.22em] tabular-nums"
                style={{ color: "hsl(var(--accent) / 0.5)" }}
              >
                {item.id}
              </span>
              <span
                className="font-kanit font-light text-sm tracking-wide transition-colors duration-300"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "clamp(0.78rem, 1vw, 0.9rem)",
                }}
              >
                <span
                  className="transition-colors duration-300 group-hover:text-white"
                  style={{ color: "inherit" }}
                >
                  {item.text}
                </span>
              </span>
            </div>

            {/* Separator dot */}
            <span
              className="flex-shrink-0 w-1 h-1 rounded-full mx-2"
              style={{ background: "hsl(var(--accent) / 0.25)" }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      {/* Inline keyframe animation */}
      <style>{`
        @keyframes fmw-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .from-my-work-track {
          animation: fmw-scroll 38s linear infinite;
        }
        .from-my-work-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .from-my-work-track {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
};

export default FromMyWorkSection;
