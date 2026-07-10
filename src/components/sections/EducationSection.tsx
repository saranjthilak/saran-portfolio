
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

/* ── Main Section (placeholder — will be enhanced in next commits) ── */
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
