import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { HUBS, skillLevels } from "@/data/skills-graph";
import { skills } from "@/data/portfolio";

const Bar = ({ name, level, color, idx }: { name: string; level: number; color: string; idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-white/90">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
          {name}
        </span>
        <span className="text-[10px] font-mono opacity-60">{level}%</span>
      </div>
      <div className="relative h-1.5 rounded-full bg-white/5 border border-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay: reduce ? 0 : 0.1 + idx * 0.04, duration: reduce ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 10px ${color}` }}
        />
      </div>
    </div>
  );
};

const SkillsStackFallback = () => {
  return (
    <div className="space-y-6">
      {HUBS.map((hub) => {
        const list = (skills as Record<string, string[]>)[hub.key] ?? [];
        return (
          <div
            key={hub.key}
            className="rounded-2xl p-5 border backdrop-blur-xl"
            style={{
              background: "rgba(10,10,15,0.5)",
              borderColor: `${hub.color}33`,
              boxShadow: `0 0 24px ${hub.color}22`,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full" style={{ background: hub.color, boxShadow: `0 0 12px ${hub.color}` }} />
              <h3 className="text-sm font-mono tracking-[0.25em] uppercase" style={{ color: hub.color }}>
                {hub.short}
              </h3>
            </div>
            <div className="space-y-3">
              {list.map((name, i) => (
                <Bar key={name} name={name} level={skillLevels[name] ?? 80} color={hub.color} idx={i} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsStackFallback;