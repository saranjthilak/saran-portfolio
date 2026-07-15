import { useMemo, useState, useRef, useCallback } from "react";
import { motion, useReducedMotion, useInView, AnimatePresence } from "framer-motion";
import { skills } from "@/data/portfolio";
import { skillLevels, HUBS, type HubDef } from "@/data/skills-graph";

/* ─── Layout constants ─── */
const VIEW_W = 1200;
const VIEW_H = 700;

/* ─── Types ─── */
interface SkillNode {
  id: string;
  name: string;
  level: number;
  hubIndex: number;
  x: number;
  y: number;
  r: number;
  angle: number;
  ring: number;
}

/* ─── Deterministic pseudo-random ─── */
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

/* ─── Build hexagonal constellation layout ─── */
function buildConstellation(): { nodes: SkillNode[] } {
  const nodes: SkillNode[] = [];
  const GOLDEN = Math.PI * (3 - Math.sqrt(5));

  HUBS.forEach((hub, hi) => {
    const list = (skills as Record<string, string[]>)[hub.key] ?? [];
    const baseAngle = hi * 0.5;

    list.forEach((name, i) => {
      const level = skillLevels[name] ?? 80;
      const ring = i < 5 ? 0 : i < 10 ? 1 : 2;
      const ringRadius = 100 + ring * 55;
      const angle = baseAngle + i * GOLDEN;
      const x = hub.x + Math.cos(angle) * ringRadius;
      const y = hub.y + Math.sin(angle) * ringRadius * 0.85;

      nodes.push({
        id: `${hi}-${i}-${name}`,
        name,
        level,
        hubIndex: hi,
        x, y,
        r: 4 + (level / 100) * 5,
        angle,
        ring,
      });
    });
  });

  return { nodes };
}

/* ────────────────────────────── MAIN COMPONENT ────────────────────────────── */

const NeuralSkillsNetwork = () => {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const { nodes } = useMemo(() => buildConstellation(), []);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isolated, setIsolated] = useState<number | null>(null);
  const [hoveredHub, setHoveredHub] = useState<number | null>(null);

  const activeHub = hoveredHub ?? isolated;
  const hoveredNode = nodes.find((n) => n.id === hoveredId) ?? null;

  /* ─ opacity helpers ─ */
  const getNodeOpacity = useCallback((n: SkillNode) => {
    if (hoveredId) return n.id === hoveredId ? 1 : 0.12;
    if (activeHub !== null) return n.hubIndex === activeHub ? 1 : 0.08;
    return 0.9;
  }, [hoveredId, activeHub]);

  const getLinkOpacity = useCallback((n: SkillNode) => {
    if (hoveredId) return n.id === hoveredId ? 0.9 : 0.04;
    if (activeHub !== null) return n.hubIndex === activeHub ? 0.55 : 0.03;
    return 0.25;
  }, [hoveredId, activeHub]);

  return (
    <div ref={containerRef} className="relative">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-[560px] md:h-[700px] block"
        role="img"
        aria-label="Interactive neural constellation of skills grouped by domain"
      >
        <defs>
          {/* Hub radial glows */}
          {HUBS.map((h, i) => (
            <radialGradient key={`hg-${i}`} id={`hub-glow-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={h.color} stopOpacity="0.3" />
              <stop offset="40%" stopColor={h.color} stopOpacity="0.08" />
              <stop offset="100%" stopColor={h.color} stopOpacity="0" />
            </radialGradient>
          ))}

          {/* Skill node gradient */}
          {HUBS.map((h, i) => (
            <radialGradient key={`ng-${i}`} id={`node-grad-${i}`} cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor={h.color} stopOpacity="1" />
              <stop offset="100%" stopColor={h.color} stopOpacity="0.6" />
            </radialGradient>
          ))}

          {/* Grid pattern */}
          <pattern id="hex-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="rgba(255,255,255,0.03)" />
          </pattern>
          <radialGradient id="grid-vignette" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width={VIEW_W} height={VIEW_H} fill="url(#grid-vignette)" />
          </mask>

          {/* Glow filter */}
          <filter id="glow-sm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-lg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dot grid backdrop */}
        <rect width={VIEW_W} height={VIEW_H} fill="url(#hex-grid)" mask="url(#grid-mask)" />

        {/* Hub ambient glow */}
        {HUBS.map((h, i) => (
          <motion.circle
            key={`glow-${i}`}
            cx={h.x}
            cy={h.y}
            r={240}
            fill={`url(#hub-glow-${i})`}
            style={{ transition: "opacity 500ms ease" }}
            opacity={activeHub === null || activeHub === i ? 1 : 0.15}
            animate={reduce ? undefined : {
              r: [240, 260, 240],
              opacity: activeHub === null || activeHub === i ? [1, 0.7, 1] : [0.15, 0.1, 0.15],
            }}
            transition={reduce ? undefined : {
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* ── Synapse connections (curved bezier) ── */}
        <g>
          {nodes.map((n) => {
            const hub = HUBS[n.hubIndex];
            const midX = (hub.x + n.x) / 2;
            const midY = (hub.y + n.y) / 2;
            // Offset control point perpendicular to the line
            const dx = n.x - hub.x;
            const dy = n.y - hub.y;
            const len = Math.hypot(dx, dy);
            const perpX = -dy / len * 20 * (n.ring % 2 === 0 ? 1 : -1);
            const perpY = dx / len * 20 * (n.ring % 2 === 0 ? 1 : -1);
            const cx = midX + perpX;
            const cy = midY + perpY;

            const isActive = hoveredId === n.id;
            return (
              <motion.path
                key={`link-${n.id}`}
                d={`M ${hub.x} ${hub.y} Q ${cx} ${cy} ${n.x} ${n.y}`}
                fill="none"
                stroke={hub.color}
                strokeWidth={isActive ? 2 : 0.8}
                strokeLinecap="round"
                style={{
                  opacity: getLinkOpacity(n),
                  transition: "opacity 400ms ease, stroke-width 200ms ease",
                }}
                initial={reduce ? undefined : { pathLength: 0 }}
                animate={isInView || reduce ? { pathLength: 1 } : { pathLength: 0 }}
                transition={reduce ? undefined : {
                  duration: 1.2,
                  delay: 0.3 + n.hubIndex * 0.15 + (nodes.indexOf(n) % 5) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            );
          })}
        </g>

        {/* ── Pulse rings on synapses (active connections) ── */}
        {!reduce && nodes.map((n) => {
          if (hoveredId && hoveredId !== n.id) return null;
          if (activeHub !== null && n.hubIndex !== activeHub) return null;
          const hub = HUBS[n.hubIndex];
          const seed = n.hubIndex * 100 + nodes.indexOf(n);
          return (
            <motion.circle
              key={`pulse-${n.id}`}
              cx={hub.x}
              cy={hub.y}
              r={3}
              fill={hub.color}
              opacity={0}
              animate={{
                cx: [hub.x, n.x],
                cy: [hub.y, n.y],
                opacity: [0, 0.6, 0],
                r: [2, 1.5, 0],
              }}
              transition={{
                duration: 2.5 + seededRandom(seed) * 2,
                repeat: Infinity,
                delay: seededRandom(seed + 7) * 4,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* ── Hub cores ── */}
        {HUBS.map((h, i) => (
          <g
            key={`hub-${i}`}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoveredHub(i)}
            onMouseLeave={() => setHoveredHub(null)}
            onClick={() => setIsolated(isolated === i ? null : i)}
          >
            {/* Outer pulse ring */}
            {!reduce && (
              <motion.circle
                cx={h.x}
                cy={h.y}
                r={30}
                fill="none"
                stroke={h.color}
                strokeWidth={1}
                opacity={0.3}
                animate={{
                  r: [30, 42, 30],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.6,
                }}
              />
            )}

            {/* Hex-like outer ring */}
            <circle
              cx={h.x}
              cy={h.y}
              r={22}
              fill="none"
              stroke={h.color}
              strokeWidth={1.5}
              opacity={activeHub === i ? 0.8 : 0.3}
              style={{ transition: "opacity 300ms ease" }}
            />

            {/* Core gradient */}
            <circle
              cx={h.x}
              cy={h.y}
              r={16}
              fill={h.color}
              opacity={0.2}
            />
            <circle
              cx={h.x}
              cy={h.y}
              r={10}
              fill={h.color}
              opacity={0.9}
              filter="url(#glow-sm)"
            />
            <circle
              cx={h.x}
              cy={h.y}
              r={4}
              fill="#ffffff"
              opacity={0.95}
            />

            {/* Hub label */}
            <text
              x={h.x}
              y={h.y + 52}
              textAnchor="middle"
              fill={h.color}
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="4"
              opacity={activeHub === null || activeHub === i ? 0.9 : 0.3}
              style={{ textTransform: "uppercase", transition: "opacity 400ms ease" }}
            >
              {h.short}
            </text>

            {/* Count badge */}
            <text
              x={h.x}
              y={h.y + 66}
              textAnchor="middle"
              fill={h.color}
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              opacity={0.4}
            >
              {((skills as Record<string, string[]>)[h.key] ?? []).length} nodes
            </text>
          </g>
        ))}

        {/* ── Skill nodes ── */}
        {nodes.map((n, idx) => {
          const hub = HUBS[n.hubIndex];
          const isHovered = hoveredId === n.id;

          return (
            <motion.g
              key={n.id}
              onMouseEnter={() => setHoveredId(n.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                cursor: "pointer",
                opacity: getNodeOpacity(n),
                transition: "opacity 400ms ease",
              }}
              initial={reduce ? undefined : { opacity: 0, scale: 0 }}
              animate={isInView || reduce ? { opacity: getNodeOpacity(n), scale: 1 } : undefined}
              transition={reduce ? undefined : {
                duration: 0.6,
                delay: 0.5 + idx * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Floating drift */}
              <motion.g
                animate={reduce ? undefined : {
                  y: [0, -(2 + seededRandom(idx) * 3), 0, 2 + seededRandom(idx + 5) * 3, 0],
                  x: [0, 1.5 + seededRandom(idx + 10) * 2, 0, -(1.5 + seededRandom(idx + 15) * 2), 0],
                }}
                transition={reduce ? undefined : {
                  duration: 6 + seededRandom(idx) * 4,
                  delay: seededRandom(idx + 20) * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Hover ring */}
                {isHovered && (
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r + 10}
                    fill="none"
                    stroke={hub.color}
                    strokeWidth={1}
                    initial={{ r: n.r, opacity: 0 }}
                    animate={{ r: n.r + 12, opacity: [0, 0.6, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}

                {/* Outer glow */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r * 2.5}
                  fill={hub.color}
                  opacity={isHovered ? 0.25 : 0.08}
                  style={{ transition: "opacity 300ms ease" }}
                />

                {/* Core node */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={isHovered ? n.r * 1.3 : n.r}
                  fill={`url(#node-grad-${n.hubIndex})`}
                  filter={isHovered ? "url(#glow-sm)" : undefined}
                  style={{ transition: "r 200ms ease" }}
                />

                {/* Inner highlight */}
                <circle
                  cx={n.x - n.r * 0.2}
                  cy={n.y - n.r * 0.2}
                  r={n.r * 0.35}
                  fill="#ffffff"
                  opacity={0.8}
                />

                {/* Skill name label (visible on hover or when isolated) */}
                {(isHovered || (activeHub === n.hubIndex && !hoveredId)) && (
                  <motion.text
                    x={n.x}
                    y={n.y - n.r - 8}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="1"
                    initial={{ opacity: 0, y: n.y - n.r - 2 }}
                    animate={{ opacity: 0.9, y: n.y - n.r - 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {n.name}
                  </motion.text>
                )}

                {/* Hit area */}
                <circle cx={n.x} cy={n.y} r={Math.max(16, n.r * 3)} fill="transparent" />
              </motion.g>
            </motion.g>
          );
        })}
      </svg>

      {/* ── Floating HUD Tooltip ── */}
      <AnimatePresence>
        {hoveredNode && (
          <HudTooltip node={hoveredNode} hub={HUBS[hoveredNode.hubIndex]} />
        )}
      </AnimatePresence>

      {/* ── Domain filter chips ── */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <FilterChip
          active={isolated === null}
          color="#ffffff"
          onClick={() => setIsolated(null)}
          label="All Domains"
          count={nodes.length}
        />
        {HUBS.map((h, i) => (
          <FilterChip
            key={h.key}
            active={isolated === i}
            color={h.color}
            onClick={() => setIsolated(isolated === i ? null : i)}
            label={h.short}
            count={((skills as Record<string, string[]>)[h.key] ?? []).length}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground">
        Hover a node to inspect · Click a hub to isolate
      </p>
    </div>
  );
};

/* ────────────────────────────── HUD TOOLTIP ────────────────────────────── */

const HudTooltip = ({ node, hub }: { node: SkillNode; hub: HubDef }) => {
  const left = `${(node.x / VIEW_W) * 100}%`;
  const top = `${(node.y / VIEW_H) * 100}%`;

  const levelLabel =
    node.level >= 90 ? "Expert" :
    node.level >= 80 ? "Advanced" :
    node.level >= 70 ? "Proficient" : "Intermediate";

  return (
    <motion.div
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-[160%] z-10"
      style={{ left, top }}
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative px-4 py-3 rounded-xl backdrop-blur-xl border font-mono text-xs whitespace-nowrap"
        style={{
          background: "rgba(8,8,14,0.92)",
          borderColor: `${hub.color}60`,
          boxShadow: `0 0 30px ${hub.color}30, 0 0 60px ${hub.color}10, inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
      >
        {/* Scanline effect */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
          }}
        />

        <div className="relative">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: hub.color, boxShadow: `0 0 8px ${hub.color}` }} />
            <span className="text-[9px] tracking-[0.3em] uppercase opacity-50" style={{ color: hub.color }}>
              Skill Node
            </span>
          </div>

          <div className="text-sm font-bold tracking-wide text-white">{node.name}</div>

          <div className="mt-2 flex items-center gap-3">
            {/* Level bar */}
            <div className="h-1.5 w-24 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${hub.color}, ${hub.color}cc)`,
                  boxShadow: `0 0 8px ${hub.color}`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${node.level}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="text-[10px] tabular-nums" style={{ color: hub.color }}>
              {node.level}%
            </span>
          </div>

          <div className="mt-1.5 text-[9px] tracking-wider uppercase opacity-40">
            {levelLabel}
          </div>
        </div>

        {/* Bottom arrow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45"
          style={{
            background: "rgba(8,8,14,0.92)",
            borderRight: `1px solid ${hub.color}60`,
            borderBottom: `1px solid ${hub.color}60`,
          }}
        />
      </div>
    </motion.div>
  );
};

/* ────────────────────────────── FILTER CHIP ────────────────────────────── */

const FilterChip = ({
  active, color, onClick, label, count,
}: {
  active: boolean;
  color: string;
  onClick: () => void;
  label: string;
  count: number;
}) => (
  <button
    onClick={onClick}
    className="group relative px-4 py-2 rounded-xl text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase border backdrop-blur-xl transition-all duration-300 overflow-hidden"
    style={{
      borderColor: active ? `${color}80` : "rgba(255,255,255,0.1)",
      background: active ? `${color}15` : "rgba(255,255,255,0.02)",
      color: active ? color : "rgba(255,255,255,0.6)",
      boxShadow: active ? `0 0 20px ${color}30, inset 0 0 20px ${color}08` : "none",
    }}
  >
    {/* Hover shimmer */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: `linear-gradient(135deg, transparent 30%, ${color}08 50%, transparent 70%)`,
      }}
    />
    <span className="relative inline-flex items-center gap-2">
      <span
        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
        style={{
          background: color,
          boxShadow: active ? `0 0 8px ${color}` : `0 0 4px ${color}80`,
        }}
      />
      {label}
      <span
        className="text-[8px] opacity-40 tabular-nums"
        style={{ color }}
      >
        {count}
      </span>
    </span>
  </button>
);

export default NeuralSkillsNetwork;