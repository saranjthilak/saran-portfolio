
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

/* ── Main Section (placeholder — full layout in next commit) ── */
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
            <Reveal key={i} delay={i * 0.1} direction={i % 2 === 0 ? "right" : "left"}>
            <HudFrame scan variant={it.variant}>
              <div className="flex flex-col md:flex-row items-center bg-black/30 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 group hover:border-cyan-400/50">
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 rounded-2xl sm:rounded-3xl flex items-center justify-center text-2xl sm:text-4xl shadow-[0_0_25px_rgba(34,211,238,0.5)] mr-0 md:mr-6 lg:mr-8 mb-4 md:mb-0 group-hover:scale-110 transition-transform duration-300 mx-auto md:mx-0">
                  {it.icon}
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors tracking-wide">{it.institution}</h3>
                  <div className="text-cyan-300 text-sm sm:text-base mb-2 uppercase tracking-[0.2em]">{it.degree} — {it.field}</div>
                  <div className="text-white/70 text-sm sm:text-base font-mono">{it.period}</div>
                </div>
              </div>
            </HudFrame>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
