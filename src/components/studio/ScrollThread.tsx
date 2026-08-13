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

// ─── SVG geometry ─────────────────────────────────────────────────────────────
const W        = 56;        // total SVG width
const TRACE_X  = 18;        // main vertical spine X
const JOG_W    = 10;        // horizontal jog width (right-angle only)
const DOT_R    = 4;         // radius of core dot
const PAD_TOP  = 40;        // top padding
const PAD_BOT  = 40;        // bottom padding

/**
 * Builds a PCB-style path with strict 90° (right-angle) bends only.
 * Between each node the path dips away and returns, like a real trace routing.
 */
function buildPCBPath(nodeYs: number[], svgH: number): string {
  if (nodeYs.length === 0) return "";

  const segs: string[] = [`M ${TRACE_X} 0`];

  for (let i = 0; i < nodeYs.length; i++) {
    const y   = nodeYs[i];
    const dir = i % 2 === 0 ? 1 : -1;     // alternate jog directions
    const jx  = TRACE_X + dir * JOG_W;

    if (i === 0) {
      // Approach first node with a right-angle jog
      segs.push(
        `L ${TRACE_X} ${y - 12}`,   // drop vertically near node
        `L ${jx} ${y - 12}`,        // horizontal jog (90°)
        `L ${jx} ${y}`,             // vertical back to node y (90°)
        `L ${TRACE_X} ${y}`         // horizontal back to spine (90°)
      );
    } else {
      const prevY = nodeYs[i - 1];
      const midY  = Math.round(prevY + (y - prevY) * 0.45);

      segs.push(
        `L ${TRACE_X} ${midY}`,      // travel down to mid-point (vertical)
        `L ${jx} ${midY}`,           // horizontal jog (90°)
        `L ${jx} ${midY + 10}`,      // short vertical (90°)
        `L ${TRACE_X} ${midY + 10}`, // horizontal back to spine (90°)
        `L ${TRACE_X} ${y}`          // travel down to node (vertical)
      );
    }
  }

  segs.push(`L ${TRACE_X} ${svgH}`);
  return segs.join(" ");
}

// ─── Component ────────────────────────────────────────────────────────────────
const CircuitTrace = () => {
  const svgRef   = useRef<SVGSVGElement>(null);
  const ghostRef = useRef<SVGPathElement>(null);

  const [svgH,        setSvgH]        = useState(680);
  const [nodeYs,      setNodeYs]      = useState<number[]>([]);
  const [progress,    setProgress]    = useState(0);
  const [active,      setActive]      = useState<string>("home");
  const [pastSet,     setPastSet]     = useState<Set<string>>(new Set(["home"]));
  const [visible,     setVisible]     = useState(false);
  const [pathLen,     setPathLen]     = useState(0);

  // ── Compute node Y positions ─────────────────────────────────────────────
  const measure = useCallback(() => {
    const docH      = document.documentElement.scrollHeight;
    const maxScroll = Math.max(1, docH - window.innerHeight);
    const trackH    = svgH - PAD_TOP - PAD_BOT;

    const ys = SECTIONS.map((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) {
        return PAD_TOP + (i / (SECTIONS.length - 1)) * trackH;
      }
      const frac = Math.max(0, Math.min(1, el.offsetTop / maxScroll));
      return PAD_TOP + frac * trackH;
    });

    setNodeYs(ys);
  }, [svgH]);

  // ── Keep SVG height = 78% viewport ──────────────────────────────────────
  useEffect(() => {
    const upd = () => setSvgH(Math.round(window.innerHeight * 0.78));
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  // ── Re-measure on mount / svgH change ───────────────────────────────────
  useEffect(() => {
    const t = setTimeout(measure, 100);
    return () => clearTimeout(t);
  }, [measure]);

  // ── Scroll: track progress and visibility ────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p   = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      setProgress(p);
      setVisible(window.scrollY > 60);
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
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
            setPastSet((prev) => new Set([...prev, e.target.id]));
          }
        });
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ── Measure path length once nodeYs are set ──────────────────────────────
  useEffect(() => {
    if (ghostRef.current) {
      setPathLen(ghostRef.current.getTotalLength());
    }
  }, [nodeYs]);

  const pathD   = buildPCBPath(nodeYs, svgH);
  const dashOff = pathLen > 0 ? pathLen * (1 - progress) : pathLen;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed left-0 top-1/2 z-30 -translate-y-1/2 transition-opacity duration-700 hidden lg:block ${
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
          {/* Multi-layer trace glow (bloom effect) */}
          <filter id="ct-trace-glow" x="-100%" y="-5%" width="300%" height="110%">
            <feGaussianBlur stdDeviation="3" result="b1" />
            <feGaussianBlur stdDeviation="6" result="b2" in="SourceGraphic" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Node glow */}
          <filter id="ct-node-glow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Active node strong bloom */}
          <filter id="ct-active-glow" x="-400%" y="-400%" width="900%" height="900%">
            <feGaussianBlur stdDeviation="5.5" result="b1" />
            <feGaussianBlur stdDeviation="2" result="b2" in="SourceGraphic" />
            <feMerge>
              <feMergeNode in="b1" />
              <feMergeNode in="b2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <clipPath id="ct-clip">
            <rect x={0} y={0} width={W} height={svgH} />
          </clipPath>
        </defs>

        {/* ── Dim ghost trace ──────────────────────────────────── */}
        {pathD && (
          <path
            d={pathD}
            stroke="hsl(var(--accent) / 0.07)"
            strokeWidth={1}
            strokeLinecap="square"
            strokeLinejoin="miter"
            clipPath="url(#ct-clip)"
          />
        )}

        {/* ── Invisible ghost for getTotalLength() ────────────── */}
        {pathD && (
          <path
            ref={ghostRef}
            d={pathD}
            stroke="transparent"
            strokeWidth={1}
            fill="none"
          />
        )}

        {/* ── Glowing scroll-filled trace ──────────────────────── */}
        {pathD && pathLen > 0 && (
          <path
            d={pathD}
            stroke="hsl(var(--accent))"
            strokeWidth={1.5}
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeDasharray={pathLen}
            strokeDashoffset={dashOff}
            filter="url(#ct-trace-glow)"
            clipPath="url(#ct-clip)"
            style={{ transition: "stroke-dashoffset 0.08s linear" }}
          />
        )}

        {/* ── Section marker nodes ─────────────────────────────── */}
        {nodeYs.map((y, i) => {
          const s      = SECTIONS[i];
          const isAct  = active === s.id;
          const isLit  = pastSet.has(s.id);
          const isPast = isLit && !isAct;

          // Also use progress-based lit for nodes not yet visited but scrolled to
          const nodePct  = nodeYs.length > 1 ? i / (nodeYs.length - 1) : 0;
          const isScrollLit = progress >= nodePct - 0.02;
          const finalLit    = isLit || isScrollLit;

          return (
            <g key={s.id}>
              {/* Square PCB land-pad outline */}
              <rect
                x={TRACE_X - DOT_R - 3.5}
                y={y - DOT_R - 3.5}
                width={(DOT_R + 3.5) * 2}
                height={(DOT_R + 3.5) * 2}
                rx={1}
                stroke={
                  isAct       ? "hsl(var(--accent) / 0.55)"
                  : finalLit  ? "hsl(var(--accent) / 0.22)"
                  :             "hsl(var(--border) / 0.28)"
                }
                strokeWidth={0.6}
                fill="none"
                style={{ transition: "stroke 0.5s ease" }}
              />

              {/* Pulse rings — active section */}
              {isAct && (
                <>
                  <circle cx={TRACE_X} cy={y} r={DOT_R + 6}
                    fill="none" stroke="hsl(var(--accent))" strokeWidth={0.8}
                    opacity={0.5} className="ct-ping" />
                  <circle cx={TRACE_X} cy={y} r={DOT_R + 11}
                    fill="none" stroke="hsl(var(--accent))" strokeWidth={0.5}
                    opacity={0.25} className="ct-ping-slow" />
                  <circle cx={TRACE_X} cy={y} r={DOT_R + 17}
                    fill="none" stroke="hsl(var(--accent))" strokeWidth={0.3}
                    opacity={0.1} className="ct-ping-slowest" />
                </>
              )}

              {/* Core dot */}
              <circle
                cx={TRACE_X} cy={y} r={DOT_R}
                fill={
                  isAct      ? "hsl(var(--accent))"
                  : finalLit ? "hsl(var(--accent) / 0.45)"
                  :            "hsl(var(--background))"
                }
                stroke={
                  isAct      ? "hsl(var(--accent))"
                  : finalLit ? "hsl(var(--accent) / 0.55)"
                  :            "hsl(var(--border) / 0.45)"
                }
                strokeWidth={1}
                filter={
                  isAct      ? "url(#ct-active-glow)"
                  : finalLit ? "url(#ct-node-glow)"
                  :            undefined
                }
                style={{ transition: "fill 0.4s ease, stroke 0.4s ease" }}
              />

              {/* Bright center for active node */}
              {isAct && (
                <circle cx={TRACE_X} cy={y} r={1.8}
                  fill="white" opacity={0.95}
                  className="ct-center-pulse" />
              )}

              {/* Half-lit center for past sections */}
              {isPast && (
                <circle cx={TRACE_X} cy={y} r={1.5}
                  fill="hsl(var(--accent) / 0.65)" />
              )}

              {/* Monospace label */}
              <text
                x={TRACE_X + 11} y={y}
                dominantBaseline="middle"
                fontFamily="var(--font-jetbrains-mono), JetBrains Mono, monospace"
                fontSize="6"
                letterSpacing="0.14em"
                fill={
                  isAct      ? "hsl(var(--accent))"
                  : finalLit ? "hsl(var(--foreground) / 0.35)"
                  :            "hsl(var(--foreground) / 0.12)"
                }
                style={{ transition: "fill 0.4s ease" }}
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>

      <style>{`
        /* ── Pulse ring animations ─────────────────────────── */
        .ct-ping {
          animation: ct-ring-expand 2s ease-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .ct-ping-slow {
          animation: ct-ring-expand 2.2s ease-out 0.55s infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .ct-ping-slowest {
          animation: ct-ring-expand 2.4s ease-out 1.1s infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes ct-ring-expand {
          0%   { transform: scale(0.55); opacity: 0.8; }
          100% { transform: scale(1.7);  opacity: 0;   }
        }

        /* ── Center dot breathe ────────────────────────────── */
        .ct-center-pulse {
          animation: ct-breathe 1.8s ease-in-out infinite;
        }
        @keyframes ct-breathe {
          0%, 100% { opacity: 0.95; }
          50%       { opacity: 1;   }
        }
      `}</style>
    </div>
  );
};

export default CircuitTrace;
