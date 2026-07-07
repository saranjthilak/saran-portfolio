import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { buildGraph, VIEW_W, VIEW_H, HUBS, type NodeDef } from "@/data/skills-graph";

const NeuralSkillsNetwork = () => {
  const reduce = useReducedMotion();
  const { hubs, nodes } = useMemo(() => buildGraph(), []);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isolated, setIsolated] = useState<number | null>(null);
  const [hoveredHub, setHoveredHub] = useState<number | null>(null);

  const activeHub = hoveredHub ?? isolated;
  const hoveredNode = nodes.find((n) => n.id === hoveredId) ?? null;

  const nodeOpacity = (n: NodeDef) => {
    if (hoveredId) return n.id === hoveredId ? 1 : 0.18;
    if (activeHub !== null) return n.hubIndex === activeHub ? 1 : 0.15;
    return 0.92;
  };
  const linkOpacity = (n: NodeDef) => {
    if (hoveredId) return n.id === hoveredId ? 0.95 : 0.08;
    if (activeHub !== null) return n.hubIndex === activeHub ? 0.7 : 0.05;
    return 0.4;
  };

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-[560px] md:h-[680px] block"
        role="img"
        aria-label="Interactive neural network of skills grouped by domain"
      >
        <defs>
          {hubs.map((h, i) => (
            <radialGradient key={i} id={`hub-grad-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={h.color} stopOpacity="1" />
              <stop offset="60%" stopColor={h.color} stopOpacity="0.5" />
              <stop offset="100%" stopColor={h.color} stopOpacity="0" />
            </radialGradient>
          ))}
          <pattern id="cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
          <radialGradient id="grid-mask" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-fade">
            <rect width={VIEW_W} height={VIEW_H} fill="url(#grid-mask)" />
          </mask>
        </defs>

        {/* Background grid */}
        <rect width={VIEW_W} height={VIEW_H} fill="url(#cyber-grid)" mask="url(#grid-fade)" />

        {/* Hub aura */}
        {hubs.map((h, i) => (
          <circle
            key={`aura-${i}`}
            cx={h.x}
            cy={h.y}
            r={220}
            fill={`url(#hub-grad-${i})`}
            opacity={activeHub === null || activeHub === i ? 0.35 : 0.08}
            style={{ transition: "opacity 400ms ease" }}
          />
        ))}

        {/* Synapse links */}
        <g>
          {nodes.map((n) => {
            const hub = hubs[n.hubIndex];
            const dx = n.x - hub.x;
            const dy = n.y - hub.y;
            const len = Math.hypot(dx, dy);
            const dash = 6;
            return (
              <motion.line
                key={`l-${n.id}`}
                x1={hub.x}
                y1={hub.y}
                x2={n.x}
                y2={n.y}
                stroke={hub.color}
                strokeWidth={hoveredId === n.id ? 1.6 : 1}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${dash}`}
                style={{ opacity: linkOpacity(n), transition: "opacity 350ms ease, stroke-width 200ms ease" }}
                initial={reduce ? undefined : { strokeDashoffset: 0 }}
                animate={reduce ? undefined : { strokeDashoffset: [0, -len] }}
                transition={reduce ? undefined : {
                  duration: 4 + (len % 3),
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            );
          })}
        </g>

        {/* Hub cores */}
        {hubs.map((h, i) => (
          <g
            key={`hub-${i}`}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoveredHub(i)}
            onMouseLeave={() => setHoveredHub(null)}
            onClick={() => setIsolated(isolated === i ? null : i)}
          >
            <motion.circle
              cx={h.x}
              cy={h.y}
              r={26}
              fill={h.color}
              opacity={0.15}
              animate={reduce ? undefined : { r: [26, 34, 26], opacity: [0.15, 0.05, 0.15] }}
              transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
            <circle cx={h.x} cy={h.y} r={14} fill={h.color} opacity={0.9} />
            <circle cx={h.x} cy={h.y} r={6} fill="#ffffff" opacity={0.95} />
            <text
              x={h.x}
              y={h.y + 54}
              textAnchor="middle"
              fill={h.color}
              fontSize="13"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="3"
              style={{ textTransform: "uppercase" }}
            >
              {h.short}
            </text>
          </g>
        ))}

        {/* Skill nodes */}
        {nodes.map((n) => {
          const hub = hubs[n.hubIndex];
          return (
            <motion.g
              key={n.id}
              onMouseEnter={() => setHoveredId(n.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: "pointer", opacity: nodeOpacity(n), transition: "opacity 350ms ease" }}
              initial={reduce ? undefined : { opacity: 0, scale: 0.3 }}
              whileInView={reduce ? undefined : { opacity: nodeOpacity(n), scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={reduce ? undefined : { duration: 0.6, delay: 0.15 + (n.hubIndex * 0.05) + Math.hypot(n.x - hub.x, n.y - hub.y) / 900, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.g
                animate={reduce ? undefined : {
                  x: [0, n.driftAmp, 0, -n.driftAmp, 0],
                  y: [0, -n.driftAmp * 0.7, 0, n.driftAmp * 0.7, 0],
                }}
                transition={reduce ? undefined : {
                  duration: n.driftDur,
                  delay: n.driftDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* outer glow */}
                <circle cx={n.x} cy={n.y} r={n.r * 2.4} fill={hub.color} opacity={0.18} />
                {/* core */}
                <circle cx={n.x} cy={n.y} r={n.r} fill={hub.color} />
                <circle cx={n.x} cy={n.y} r={n.r * 0.45} fill="#ffffff" opacity={0.9} />
                {/* invisible larger hit target */}
                <circle cx={n.x} cy={n.y} r={Math.max(14, n.r * 2.4)} fill="transparent" />
              </motion.g>
            </motion.g>
          );
        })}
      </svg>

      {/* HUD tooltip */}
      {hoveredNode && (
        <NodeTooltip node={hoveredNode} color={hubs[hoveredNode.hubIndex].color} />
      )}

      {/* Legend chips */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <Chip
          active={isolated === null}
          color="#ffffff"
          onClick={() => setIsolated(null)}
          label="All Domains"
        />
        {HUBS.map((h, i) => (
          <Chip
            key={h.key}
            active={isolated === i}
            color={h.color}
            onClick={() => setIsolated(isolated === i ? null : i)}
            label={h.short}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground">
        Hover a node to inspect · Click a hub to isolate
      </p>
    </div>
  );
};

const NodeTooltip = ({ node, color }: { node: NodeDef; color: string }) => {
  // Position via percentage of viewBox → responsive to actual rendered size.
  const left = `${(node.x / VIEW_W) * 100}%`;
  const top = `${(node.y / VIEW_H) * 100}%`;
  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-[140%] z-10"
      style={{ left, top }}
    >
      <div
        className="px-3 py-2 rounded-md backdrop-blur-md border font-mono text-xs whitespace-nowrap shadow-xl animate-fade-in"
        style={{
          background: "rgba(10,10,15,0.85)",
          borderColor: color,
          boxShadow: `0 0 20px ${color}55, 0 0 40px ${color}25`,
          color: "#ffffff",
        }}
      >
        <div className="text-[10px] tracking-[0.25em] uppercase opacity-60" style={{ color }}>
          Skill Node
        </div>
        <div className="text-sm font-semibold tracking-wide">{node.name}</div>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-1 w-20 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${node.level}%`, background: color, boxShadow: `0 0 8px ${color}` }}
            />
          </div>
          <span className="text-[10px] opacity-80">{node.level}%</span>
        </div>
      </div>
    </div>
  );
};

const Chip = ({
  active, color, onClick, label,
}: { active: boolean; color: string; onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase border backdrop-blur-md transition-all"
    style={{
      borderColor: active ? color : "rgba(255,255,255,0.15)",
      background: active ? `${color}22` : "rgba(255,255,255,0.03)",
      color: active ? color : "rgba(255,255,255,0.7)",
      boxShadow: active ? `0 0 16px ${color}55` : "none",
    }}
  >
    <span className="inline-flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      {label}
    </span>
  </button>
);

export default NeuralSkillsNetwork;