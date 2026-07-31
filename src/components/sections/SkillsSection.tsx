"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";
import { useState } from "react";

// Proficiency tiers for sizing and coloring
const getProficiency = (skill: string): "expert" | "advanced" | "proficient" => {
  let hash = 0;
  for (let i = 0; i < skill.length; i++) {
    hash = skill.charCodeAt(i) + ((hash << 5) - hash);
  }
  const val = 80 + (Math.abs(hash) % 19);
  if (val >= 93) return "expert";
  if (val >= 86) return "advanced";
  return "proficient";
};

const tierStyles = {
  expert: {
    size: "text-sm sm:text-base px-5 py-2.5",
    bg: "bg-primary/15 border-primary/30 hover:bg-primary/25 hover:border-primary/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]",
    text: "text-primary font-semibold",
    label: "Expert",
  },
  advanced: {
    size: "text-xs sm:text-sm px-4 py-2",
    bg: "bg-accent/10 border-accent/20 hover:bg-accent/20 hover:border-accent/40 shadow-[0_0_10px_rgba(167,139,250,0.1)] hover:shadow-[0_0_20px_rgba(167,139,250,0.2)]",
    text: "text-accent font-medium",
    label: "Advanced",
  },
  proficient: {
    size: "text-xs px-3.5 py-1.5",
    bg: "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20",
    text: "text-foreground/70 font-medium",
    label: "Proficient",
  },
};

const SkillTag = ({ skill, index, categoryIdx }: { skill: string; index: number; categoryIdx: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const tier = getProficiency(skill);
  const style = tierStyles[tier];

  // Each tag floats at a unique speed
  const floatDuration = 3.5 + ((index * 0.7 + categoryIdx * 1.3) % 3);
  const floatDelay = (index * 0.3 + categoryIdx * 0.5) % 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.05 * index + 0.15 * categoryIdx,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        animate={{
          y: isHovered ? -4 : [0, -6, 0],
          scale: isHovered ? 1.1 : 1,
        }}
        transition={
          isHovered
            ? { type: "spring", stiffness: 400, damping: 15 }
            : {
                y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
                scale: { type: "spring", stiffness: 200, damping: 20 },
              }
        }
        className={`
          relative inline-flex items-center gap-2 rounded-full border cursor-default
          transition-all duration-300
          ${style.size} ${style.bg} ${style.text}
        `}
      >
        {skill}

        {/* Tooltip */}
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? -8 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-background/90 border border-white/10 text-[10px] font-mono tracking-wider uppercase text-white/70 whitespace-nowrap pointer-events-none backdrop-blur-xl shadow-xl z-50"
        >
          {style.label}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[30%] right-[0%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="Skills"
          tag="Expertise"
          index="03"
          subtitle="Core technologies and frameworks I use to build robust data platforms and AI systems."
        />

        <div className="mt-16 sm:mt-24 space-y-12">
          {Object.entries(skills).map(([category, items], categoryIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: categoryIdx * 0.1 }}
            >
              {/* Category Label */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-base font-display font-semibold text-foreground/80 tracking-tight">{category}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              {/* Floating Tags */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {items.map((skill, i) => (
                  <SkillTag key={skill} skill={skill} index={i} categoryIdx={categoryIdx} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center gap-6 mt-16 text-xs text-muted-foreground"
        >
          {(["expert", "advanced", "proficient"] as const).map((tier) => (
            <div key={tier} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${
                tier === "expert" ? "bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" :
                tier === "advanced" ? "bg-accent shadow-[0_0_6px_rgba(167,139,250,0.4)]" :
                "bg-white/30"
              }`} />
              <span className="capitalize">{tier}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;