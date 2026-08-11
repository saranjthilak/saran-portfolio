"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Section nodes ──────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "home",       label: "HOME" },
  { id: "works",      label: "WORK" },
  { id: "services",   label: "CAP"  },
  { id: "experience", label: "EXP"  },
  { id: "research",   label: "RES"  },
  { id: "contact",    label: "CON"  },
] as const;

// ─── SVG geometry ────────────────────────────────────────────────────────────
const W         = 52;   // SVG viewport width
const TRACE_X   = 20;   // main vertical trace x
const DOT_R     = 4;    // node dot radius
const PAD_TOP   = 32;
const PAD_BOT   = 32;

// Alternate the horizontal jog direction for each inter-node segment.
// This produces the classic PCB right-angle-bend look.
function buildPath(nodeYs: number[], svgH: number): string {
  if (nodeYs.length === 0) return "";
  const segs: string[] = [`M ${TRACE_X} 0`];

  for (let i = 0; i < nodeYs.length; i++) {
    const y   = nodeYs[i];
    const dir = i % 2 === 0 ? 1 : -1;   // alternate L / R jog
    const jx  = TRACE_X + dir * 10;

    if (i === 0) {
      segs.push(
        `L ${TRACE_X} ${y - 8}`,
        `L ${jx} ${y - 4}`,
        `L ${TRACE_X} ${y}`
      );
    } else {
      const prevY = nodeYs[i - 1];
      const mid   = prevY + (y - prevY) * 0.42;
      segs.push(
        `L ${TRACE_X} ${mid}`,
        `L ${jx} ${mid + 5}`,
        `L ${TRACE_X} ${mid + 10}`,
        `L ${TRACE_X} ${y}`
      );
    }
  }

  segs.push(`L ${TRACE_X} ${svgH}`);
  return segs.join(" ");
}

// ─── Component ───────────────────────────────────────────────────────────────
const CircuitTrace = () => {
  const svgRef   = useRef<SVGSVGElement>(null);
  const ghostRef = useRef<SVGPathElement>(null);

  const [svgH,      setSvgH]      = useState(640);
  const [nodeYs,    setNodeYs]    = useState<number[]>([]);
  const [progress,  setProgress]  = useState(0);
  const [active,    setActive]    = useState<string>("home");
  const [visible,   setVisible]   = useState(false);
  const [pathLen,   setPathLen]   = useState(0);

  // ── Measure section centres → SVG-space Y positions ─────────────────────
  const measure = useCallback(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    // getBoundingClientRect is viewport-relative; add scrollY for page coords
    const rect   = svgEl.getBoundingClientRect();
    const top    = rect.top  + window.scrollY;
    const height = rect.height;

    const ys = SECTIONS.map((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) {
        // Fallback: even distribution
        return PAD_TOP + (i / (SECTIONS.length - 1)) * (svgH - PAD_TOP - PAD_BOT);
      }
      const elMid = el.getBoundingClientRect().top + window.scrollY + el.offsetHeight * 0.25;
      const frac  = Math.max(0, Math.min(1, (elMid - top) / height));
      return PAD_TOP + frac * (svgH - PAD_TOP - PAD_BOT);
    });

    setNodeYs(ys);
  }, [svgH]);

  // ── Keep SVG height at 75 % of viewport ─────────────────────────────────
  useEffect(() => {
    const upd = () => setSvgH(Math.round(window.innerHeight * 0.76));
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  // ── Re-measure after height change & on initial mount ───────────────────
  useEffect(() => {
    const t = setTimeout(measure, 100);
    return () => clearTimeout(t);
  }, [measure, svgH]);

  // ── Re-measure on scroll (section positions shift with scroll) ───────────
  useEffect(() => {
    window.addEventListener("scroll", measure, { passive: true });
    return () => window.removeEventListener("scroll", measure);
  }, [measure]);

  // ── Scroll progress & visibility ─────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setVisible(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section (IntersectionObserver) ────────────────────────────────
  useEffect(() => {
    const els = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-28% 0px -62% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ── Measure path length after nodes are positioned ───────────────────────
  useEffect(() => {
    if (ghostRef.current) setPathLen(ghostRef.current.getTotalLength());
  }, [nodeYs, svgH]);

  const pathD   = buildPath(nodeYs, svgH);
  const dashOff = pathLen > 0 ? pathLen * (1 - progress) : pathLen;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed left-0 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-700 xl:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ width: W, height: svgH }}
    >
      <svg
        ref={svgRef}
        width={W}
        height={svgH}
        viewBox={`0 0 ${W} ${svgH}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <defs>
          {/* Glow for the lit trace */}
          <filter id="ct-trace-glow" x="-60%" y="-10%" width="220%" height="120%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Glow for active nodes */}
          <filter id="ct-node-glow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Clip so trace doesn't bleed outside SVG bounds */}
          <clipPath id="ct-clip">
            <rect x={0} y={0} width={W} height={svgH} />
          </clipPath>
        </defs>

        {/* ── Ghost (dim) base trace ── */}
        {pathD && (
          <path
            d={pathD}
            stroke="hsl(var(--border))"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#ct-clip)"
          />
        )}

        {/* ── Invisible path used only for getTotalLength() ── */}
        {pathD && (
          <path
            ref={ghostRef}
            d={pathD}
            stroke="transparent"
            strokeWidth={1}
            fill="none"
            clipPath="url(#ct-clip)"
          />
        )}

        {/* ── Glowing, scroll-filled trace ── */}
        {pathD && pathLen > 0 && (
          <path
            d={pathD}
            stroke="hsl(var(--accent))"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLen}
            strokeDashoffset={dashOff}
            filter="url(#ct-trace-glow)"
            clipPath="url(#ct-clip)"
            style={{ transition: "stroke-dashoffset 0.12s ease-out" }}
          />
        )}

        {/* ── Section nodes ── */}
        {nodeYs.map((y, i) => {
          const s       = SECTIONS[i];
          const isAct   = active === s.id;
          // Node is "lit" when the fill wave has reached or passed it
          const nodePct = nodeYs.length > 1 ? i / (nodeYs.length - 1) : 0;
          const isLit   = progress >= nodePct - 0.03;

          return (
            <g key={s.id}>
              {/* Square pad outline (PCB land pad aesthetic) */}
              <rect
                x={TRACE_X - DOT_R - 3}
                y={y - DOT_R - 3}
                width={(DOT_R + 3) * 2}
                height={(DOT_R + 3) * 2}
                rx={1}
                stroke={isLit ? "hsl(var(--accent) / 0.3)" : "hsl(var(--border) / 0.5)"}
                strokeWidth={0.5}
                fill="none"
                style={{ transition: "stroke 0.4s ease" }}
              />

              {/* Outer halo for active node (CSS animation via className) */}
              {isAct && (
                <circle
                  cx={TRACE_X}
                  cy={y}
                  r={DOT_R + 5}
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth={0.75}
                  opacity={0.5}
                  className="ct-ping"
                />
              )}
              {isAct && (
                <circle
                  cx={TRACE_X}
                  cy={y}
                  r={DOT_R + 9}
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth={0.5}
                  opacity={0.25}
                  className="ct-ping-slow"
                />
              )}

              {/* Core circle */}
              <circle
                cx={TRACE_X}
                cy={y}
                r={DOT_R}
                fill={isLit ? "hsl(var(--accent))" : "hsl(var(--background))"}
                stroke={isLit ? "hsl(var(--accent))" : "hsl(var(--border))"}
                strokeWidth={1}
                filter={isLit ? "url(#ct-node-glow)" : undefined}
                style={{ transition: "fill 0.5s ease, stroke 0.5s ease" }}
              />

              {/* Bright centre dot for active lit node */}
              {isAct && isLit && (
                <circle cx={TRACE_X} cy={y} r={1.5} fill="white" opacity={0.9} />
              )}

              {/* Monospace label to the right */}
              <text
                x={TRACE_X + 10}
                y={y}
                dominantBaseline="middle"
                fontFamily="var(--font-jetbrains-mono), JetBrains Mono, monospace"
                fontSize="6.5"
                letterSpacing="0.13em"
                fill={
                  isAct
                    ? "hsl(var(--accent))"
                    : isLit
                    ? "hsl(var(--foreground) / 0.4)"
                    : "hsl(var(--foreground) / 0.18)"
                }
                style={{ transition: "fill 0.4s ease" }}
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Keyframe animations injected inline for isolation */}
      <style>{`
        .ct-ping {
          animation: ct-ring-expand 2s ease-out infinite;
          transform-origin: ${TRACE_X}px center;
        }
        .ct-ping-slow {
          animation: ct-ring-expand 2s ease-out 0.5s infinite;
          transform-origin: ${TRACE_X}px center;
        }
        @keyframes ct-ring-expand {
          0%   { transform: scale(0.6); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0;   }
        }
      `}</style>
    </div>
  );
};

export default CircuitTrace;
