
import { motion, useReducedMotion, useInView, type Variants } from "framer-motion";
import { useRef, useMemo } from "react";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import HudFrame from "@/components/ui/hud-frame";

/* ── Education Data ── */
interface EducationItem {
  icon: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  variant: "cyan" | "fuchsia" | "mixed";
  skills: string[];
  xp: number; // 0-100 representing knowledge gained
  nodeLabel: string; // short label for timeline node
}

const educationData: EducationItem[] = [
  {
    icon: "🧑‍💻",
    institution: "Le Wagon",
    degree: "Boot Camp",
    field: "Data Science & AI",
    period: "04/2025 – 06/2025",
    location: "Berlin, Germany",
    variant: "fuchsia",
    skills: ["Deep Learning", "NLP", "MLOps", "Python", "LLMs"],
    xp: 95,
    nodeLabel: "BOOT",
  },
  {
    icon: "🎓",
    institution: "University of Europe for Applied Sciences",
    degree: "Master's Degree",
    field: "Data Science",
    period: "04/2022 – 03/2023",
    location: "Berlin, Germany",
    variant: "cyan",
    skills: ["Machine Learning", "Statistics", "Big Data", "Research", "Cloud Computing"],
    xp: 88,
    nodeLabel: "MSc",
  },
  {
    icon: "🔬",
    institution: "Delhi University",
    degree: "PG Diploma — NIELIT",
    field: "VLSI & Embedded Systems HW Design",
    period: "01/2013 – 12/2014",
    location: "New Delhi, India",
    variant: "mixed",
    skills: ["VLSI Design", "Embedded Systems", "Hardware Architecture", "Signal Processing"],
    xp: 75,
    nodeLabel: "PGD",
  },
  {
    icon: "⚡",
    institution: "Cochin University of Science & Technology",
    degree: "Bachelor of Technology",
    field: "Electrical, Electronics & Communications Engineering",
    period: "01/2009 – 12/2013",
    location: "Kochi, India",
    variant: "cyan",
    skills: ["Circuit Design", "Control Systems", "Telecommunications", "Mathematics", "Physics"],
    xp: 82,
    nodeLabel: "BTech",
  },
];

/* ── Animated XP Bar ── */
const XPBar = ({
  value,
  variant,
  index,
}: {
  value: number;
  variant: "cyan" | "fuchsia" | "mixed";
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  const gradients: Record<string, string> = {
    cyan: "from-cyan-400 via-blue-400 to-indigo-500",
    fuchsia: "from-fuchsia-400 via-pink-400 to-rose-500",
    mixed: "from-cyan-400 via-indigo-400 to-fuchsia-500",
  };

  const glowColors: Record<string, string> = {
    cyan: "shadow-[0_0_12px_rgba(34,211,238,0.5)]",
    fuchsia: "shadow-[0_0_12px_rgba(217,70,239,0.5)]",
    mixed: "shadow-[0_0_12px_rgba(99,102,241,0.5)]",
  };

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40">
          Knowledge Acquired
        </span>
        <span className="text-[10px] font-mono text-cyan-300/70 tracking-wider">
          {value}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${gradients[variant]} ${glowColors[variant]}`}
          initial={{ width: reduce ? `${value}%` : "0%" }}
          animate={{ width: isInView || reduce ? `${value}%` : "0%" }}
          transition={{
            duration: 1.4,
            delay: index * 0.15 + 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </div>
  );
};

/* ── Skill Chip ── */
const SkillChip = ({
  label,
  variant,
  index,
}: {
  label: string;
  variant: "cyan" | "fuchsia" | "mixed";
  index: number;
}) => {
  const reduce = useReducedMotion();

  const borderColor: Record<string, string> = {
    cyan: "border-cyan-400/30 hover:border-cyan-400/70 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]",
    fuchsia:
      "border-fuchsia-400/30 hover:border-fuchsia-400/70 hover:shadow-[0_0_10px_rgba(217,70,239,0.2)]",
    mixed:
      "border-indigo-400/30 hover:border-indigo-400/70 hover:shadow-[0_0_10px_rgba(99,102,241,0.2)]",
  };

  const textColor: Record<string, string> = {
    cyan: "text-cyan-300/80 group-hover:text-cyan-200",
    fuchsia: "text-fuchsia-300/80 group-hover:text-fuchsia-200",
    mixed: "text-indigo-300/80 group-hover:text-indigo-200",
  };

  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: index * 0.06 + 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${borderColor[variant]} bg-white/[0.02] backdrop-blur-sm transition-all duration-300 cursor-default`}
    >
      <span
        className={`w-1 h-1 rounded-full ${
          variant === "fuchsia" ? "bg-fuchsia-400" : variant === "mixed" ? "bg-indigo-400" : "bg-cyan-400"
        }`}
      />
      <span className={`text-[10px] font-mono tracking-wider uppercase ${textColor[variant]}`}>
        {label}
      </span>
    </motion.span>
  );
};

/* ── Synaptic Timeline Node ── */
const SynapticNode = ({
  label,
  isLast,
  variant,
  index,
}: {
  label: string;
  isLast: boolean;
  variant: "cyan" | "fuchsia" | "mixed";
  index: number;
}) => {
  const reduce = useReducedMotion();

  const nodeColor: Record<string, { bg: string; border: string; glow: string; line: string }> = {
    cyan: {
      bg: "bg-cyan-400",
      border: "border-cyan-400",
      glow: "shadow-[0_0_20px_rgba(34,211,238,0.6),0_0_40px_rgba(34,211,238,0.2)]",
      line: "from-cyan-400/60 via-cyan-400/20 to-transparent",
    },
    fuchsia: {
      bg: "bg-fuchsia-400",
      border: "border-fuchsia-400",
      glow: "shadow-[0_0_20px_rgba(217,70,239,0.6),0_0_40px_rgba(217,70,239,0.2)]",
      line: "from-fuchsia-400/60 via-fuchsia-400/20 to-transparent",
    },
    mixed: {
      bg: "bg-indigo-400",
      border: "border-indigo-400",
      glow: "shadow-[0_0_20px_rgba(99,102,241,0.6),0_0_40px_rgba(99,102,241,0.2)]",
      line: "from-indigo-400/60 via-indigo-400/20 to-transparent",
    },
  };

  const c = nodeColor[variant];

  return (
    <div className="flex flex-col items-center">
      {/* Node */}
      <motion.div
        className="relative z-10"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: index * 0.15,
        }}
      >
        {/* Pulse ring */}
        <div
          className={`absolute -inset-2 rounded-full ${c.border} border opacity-30 animate-ping`}
          style={{ animationDuration: "3s" }}
        />
        {/* Outer ring */}
        <div
          className={`w-10 h-10 rounded-full border-2 ${c.border} ${c.glow} flex items-center justify-center bg-black/80 backdrop-blur-sm`}
        >
          {/* Inner label */}
          <span className="text-[8px] font-mono font-bold text-white tracking-wider">
            {label}
          </span>
        </div>
      </motion.div>

      {/* Connecting line */}
      {!isLast && (
        <motion.div
          className={`w-[2px] bg-gradient-to-b ${c.line}`}
          initial={reduce ? { height: 120 } : { height: 0 }}
          whileInView={{ height: 120 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: index * 0.15 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      )}
    </div>
  );
};

/* ── Data Particles ── */
const DataParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${4 + Math.random() * 4}s`,
        size: Math.random() > 0.6 ? 3 : 2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-cyan-400/20 animate-pulse"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
};

/* ── Education Card ── */
const EducationCard = ({ item, index }: { item: EducationItem; index: number }) => {
  const reduce = useReducedMotion();

  const accentColor: Record<string, string> = {
    cyan: "text-cyan-400",
    fuchsia: "text-fuchsia-400",
    mixed: "text-indigo-400",
  };

  const borderHover: Record<string, string> = {
    cyan: "hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]",
    fuchsia: "hover:border-fuchsia-400/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)]",
    mixed: "hover:border-indigo-400/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]",
  };

  const borderBase: Record<string, string> = {
    cyan: "border-cyan-400/15",
    fuchsia: "border-fuchsia-400/15",
    mixed: "border-indigo-400/15",
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: index % 2 === 0 ? -60 : 60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <HudFrame scan variant={item.variant} id={`EDU${index}`}>
        <div
          className={`relative bg-black/40 backdrop-blur-xl border ${borderBase[item.variant]} rounded-2xl p-6 sm:p-8 ${borderHover[item.variant]} transition-all duration-500 group overflow-hidden`}
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

          <div className="relative z-10">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-5">
              {/* Icon */}
              <motion.div
                className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl border ${borderBase[item.variant]} bg-white/[0.03] flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-500 mx-auto sm:mx-0`}
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
              </motion.div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300 tracking-wide leading-tight">
                  {item.institution}
                </h3>
                <div className={`text-sm font-semibold ${accentColor[item.variant]} mb-1`}>
                  {item.degree}
                </div>
                <div className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  {item.field}
                </div>
              </div>

              {/* Period & Location badge */}
              <div className="flex-shrink-0 text-center sm:text-right space-y-1.5">
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border ${borderBase[item.variant]} bg-white/[0.03]`}
                >
                  <span className="text-[10px] font-mono text-white/70 tracking-wider">
                    {item.period}
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-1.5">
                  <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[10px] font-mono text-white/40 tracking-wider">
                    {item.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {item.skills.map((skill, i) => (
                <SkillChip key={skill} label={skill} variant={item.variant} index={i} />
              ))}
            </div>

            {/* XP Bar */}
            <XPBar value={item.xp} variant={item.variant} index={index} />
          </div>
        </div>
      </HudFrame>
    </motion.div>
  );
};

/* ── Main Section (placeholder — final layout in next commit) ── */
const EducationSection = () => {
  return (
    <section id="education" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Education"
          tag="Neural Pathway"
          subtitle="A knowledge evolution spanning continents — from core engineering foundations to cutting-edge AI research and production ML systems."
        />
        <div className="space-y-6 sm:space-y-8">
          {educationData.map((it, i) => (
            <EducationCard key={i} item={it} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
