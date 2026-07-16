import { useState, useRef, useMemo } from "react";
import { motion, useReducedMotion, useInView, AnimatePresence } from "framer-motion";
import { skills } from "@/data/portfolio";
import { skillLevels, HUBS } from "@/data/skills-graph";

/* ─── Types ─── */
interface SkillItem {
  name: string;
  level: number;
  hubIndex: number;
}

/* ─── Level label helper ─── */
const getLevelLabel = (level: number) =>
  level >= 90 ? "Expert" :
  level >= 80 ? "Advanced" :
  level >= 70 ? "Proficient" : "Intermediate";

/* ─── Circular progress arc ─── */
const SkillArc = ({ level, color, size = 28 }: { level: number; color: string; size?: number }) => {
  const r = (size - 4) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (level / 100) * circumference;

  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={2.5}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
      />
    </svg>
  );
};

/* ─── Individual Skill Chip ─── */
const SkillChip = ({
  skill,
  color,
  colorSoft,
  index,
  isActive,
}: {
  skill: SkillItem;
  color: string;
  colorSoft: string;
  index: number;
  isActive: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative"
      initial={reduce ? undefined : { opacity: 0, y: 12, scale: 0.9 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={reduce ? undefined : {
        duration: 0.4,
        delay: 0.08 + index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-default transition-all duration-300 border"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${color}18, ${color}08)`
            : "rgba(255,255,255,0.02)",
          borderColor: hovered ? `${color}50` : "rgba(255,255,255,0.06)",
          boxShadow: hovered
            ? `0 0 20px ${color}15, 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`
            : "0 2px 8px rgba(0,0,0,0.2)",
          opacity: isActive ? 1 : 0.35,
          transition: "all 400ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        whileHover={reduce ? undefined : { y: -2 }}
      >
        <SkillArc level={skill.level} color={color} />

        <span className="text-[13px] font-medium tracking-wide text-white/90 whitespace-nowrap">
          {skill.name}
        </span>

        {/* Hover percentage badge */}
        <AnimatePresence>
          {hovered && (
            <motion.span
              className="ml-auto text-[10px] font-mono tabular-nums font-semibold"
              style={{ color }}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.2 }}
            >
              {skill.level}%
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tooltip popover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-30 pointer-events-none"
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative px-3.5 py-2 rounded-lg backdrop-blur-xl border font-mono text-[10px] whitespace-nowrap"
              style={{
                background: "rgba(6,6,12,0.95)",
                borderColor: `${color}40`,
                boxShadow: `0 0 24px ${color}20, 0 8px 32px rgba(0,0,0,0.5)`,
              }}
            >
              {/* Scanline texture */}
              <div
                className="absolute inset-0 rounded-lg overflow-hidden opacity-[0.03]"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
                }}
              />

              <div className="relative flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                <span className="tracking-[0.2em] uppercase opacity-60" style={{ color }}>
                  {getLevelLabel(skill.level)}
                </span>
                <span className="text-white/50">·</span>
                <span className="text-white/80 font-semibold tabular-nums">{skill.level}%</span>
              </div>

              {/* Proficiency bar */}
              <div className="mt-1.5 h-1 w-full rounded-full bg-white/8 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                    boxShadow: `0 0 8px ${color}`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Arrow */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45"
                style={{
                  background: "rgba(6,6,12,0.95)",
                  borderRight: `1px solid ${color}40`,
                  borderBottom: `1px solid ${color}40`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Domain Card ─── */
const DomainCard = ({
  hub,
  hubIndex,
  skillList,
  isActive,
  onToggle,
}: {
  hub: typeof HUBS[0];
  hubIndex: number;
  skillList: SkillItem[];
  isActive: boolean;
  onToggle: () => void;
}) => {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.15 });

  const avgLevel = useMemo(
    () => Math.round(skillList.reduce((sum, s) => sum + s.level, 0) / skillList.length),
    [skillList]
  );

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={reduce ? undefined : { opacity: 0, y: 40 }}
      animate={isInView || reduce ? { opacity: 1, y: 0 } : undefined}
      transition={reduce ? undefined : {
        duration: 0.7,
        delay: hubIndex * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Animated border glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(135deg, ${hub.color}30, transparent 40%, transparent 60%, ${hub.color}20)`,
        }}
      />

      <div
        className="relative rounded-2xl border overflow-hidden"
        style={{
          background: "rgba(8,8,14,0.7)",
          borderColor: isActive ? `${hub.color}40` : "rgba(255,255,255,0.06)",
          boxShadow: isActive
            ? `0 0 40px ${hub.color}12, 0 20px 60px rgba(0,0,0,0.4)`
            : "0 10px 40px rgba(0,0,0,0.3)",
          backdropFilter: "blur(20px)",
          transition: "border-color 500ms ease, box-shadow 500ms ease",
        }}
      >
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)",
          }}
        />

        {/* Ambient glow at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${hub.color}15, transparent 70%)`,
          }}
        />

        {/* ── Card Header ── */}
        <div
          className="relative px-5 sm:px-6 pt-5 sm:pt-6 pb-4 cursor-pointer"
          onClick={onToggle}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Pulsing core dot */}
              <div className="relative">
                <span
                  className="block w-3 h-3 rounded-full"
                  style={{
                    background: hub.color,
                    boxShadow: `0 0 12px ${hub.color}, 0 0 24px ${hub.color}60`,
                  }}
                />
                {!reduce && (
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      background: hub.color,
                      opacity: 0.4,
                    }}
                  />
                )}
              </div>

              <div>
                <h3
                  className="text-sm sm:text-base font-mono font-semibold tracking-[0.15em] uppercase"
                  style={{ color: hub.color }}
                >
                  {hub.short}
                </h3>
                <p className="text-[10px] font-mono tracking-wider text-white/30 uppercase mt-0.5">
                  {hub.label}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Average proficiency arc */}
              <div className="relative">
                <SkillArc level={avgLevel} color={hub.color} size={36} />
                <span
                  className="absolute inset-0 flex items-center justify-center text-[8px] font-mono font-bold tabular-nums"
                  style={{ color: hub.color }}
                >
                  {avgLevel}
                </span>
              </div>

              {/* Skill count badge */}
              <span
                className="text-[10px] font-mono px-2.5 py-1 rounded-lg border tabular-nums"
                style={{
                  color: `${hub.color}cc`,
                  borderColor: `${hub.color}30`,
                  background: `${hub.color}08`,
                }}
              >
                {skillList.length}
              </span>
            </div>
          </div>

          {/* Separator line */}
          <div
            className="mt-4 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${hub.color}30, transparent)`,
            }}
          />
        </div>

        {/* ── Skills Grid ── */}
        <div className="relative px-5 sm:px-6 pb-5 sm:pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {skillList.map((skill, i) => (
              <SkillChip
                key={skill.name}
                skill={skill}
                color={hub.color}
                colorSoft={hub.colorSoft}
                index={i}
                isActive={isActive}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Filter Chip ─── */
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

/* ────────────────────────────── MAIN COMPONENT ────────────────────────────── */

const NeuralSkillsNetwork = () => {
  const [isolated, setIsolated] = useState<number | null>(null);

  /* Build skill lists per hub */
  const hubSkills = useMemo(() =>
    HUBS.map((hub, hi) => {
      const list = (skills as Record<string, string[]>)[hub.key] ?? [];
      return list.map((name): SkillItem => ({
        name,
        level: skillLevels[name] ?? 80,
        hubIndex: hi,
      }));
    }),
    []
  );

  const totalCount = hubSkills.reduce((sum, list) => sum + list.length, 0);

  return (
    <div className="relative">
      {/* ── Domain filter chips ── */}
      <div className="mb-8 sm:mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <FilterChip
          active={isolated === null}
          color="#ffffff"
          onClick={() => setIsolated(null)}
          label="All Domains"
          count={totalCount}
        />
        {HUBS.map((h, i) => (
          <FilterChip
            key={h.key}
            active={isolated === i}
            color={h.color}
            onClick={() => setIsolated(isolated === i ? null : i)}
            label={h.short}
            count={hubSkills[i].length}
          />
        ))}
      </div>

      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {HUBS.map((hub, i) => (
          <DomainCard
            key={hub.key}
            hub={hub}
            hubIndex={i}
            skillList={hubSkills[i]}
            isActive={isolated === null || isolated === i}
            onToggle={() => setIsolated(isolated === i ? null : i)}
          />
        ))}
      </div>

      {/* ── Interaction hint ── */}
      <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground">
        Hover a skill to inspect · Click a domain to isolate
      </p>
    </div>
  );
};

export default NeuralSkillsNetwork;