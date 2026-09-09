"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectLinks from "./LiveProjectButton";
import BlueprintSectionHeader from "./BlueprintSectionHeader";

// All featured projects from portfolio.ts
const FEATURED = projects.filter((p) => p.featured);

const EASE = [0.16, 1, 0.3, 1] as const;

interface ProjectCardProps {
  project: (typeof FEATURED)[number];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Gentle parallax on the hero image as the card travels through the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const slideFrom = index % 2 === 0 ? -48 : 48;

  const caseStudy = [
    { label: "Problem", text: project.problem, color: "#00df8f" },
    { label: "Approach", text: project.approach, color: "#38bdf8" },
    { label: "Result", text: project.result, color: "#f59e0b" },
  ].filter((b) => b.text);

  return (
    <div
      ref={cardRef}
      className="blueprint-cell w-full rounded-2xl border p-5 sm:p-8 md:p-10 flex flex-col gap-5 overflow-hidden"
      id={`project-${index}`}
      aria-label={project.title}
    >
      {/* Top row — slides in from alternating sides */}
      <motion.div
        className="flex items-center justify-between flex-wrap gap-3"
        initial={{ opacity: 0, x: slideFrom }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="flex items-center gap-4">
          <span
            className="font-kanit font-black text-[#ffffff] leading-none"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="font-kanit font-light uppercase tracking-widest text-[#ffffff]/50"
            style={{ fontSize: "clamp(0.7rem, 1vw, 0.9rem)" }}
          >
            {project.source}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span
            className="font-kanit font-medium uppercase tracking-wide text-[#ffffff]"
            style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
          >
            {project.title}
          </span>
          <ProjectLinks githubUrl={project.url} liveUrl={project.liveUrl} />
        </div>
      </motion.div>

      {/* ── Case Study Strip — staggered pop-in ── */}
      {caseStudy.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {caseStudy.map((box, i) => (
            <motion.div
              key={box.label}
              className="flex flex-col gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3.5"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: EASE }}
            >
              <span
                className="font-kanit font-bold uppercase tracking-widest text-xs sm:text-sm"
                style={{ color: box.color }}
              >
                {box.label}
              </span>
              <span className="font-kanit text-white/75 leading-relaxed text-sm sm:text-[0.95rem]">
                {box.text}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Hero image — curtain reveal + scroll parallax */}
      <motion.div
        className="rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden aspect-[16/9]"
        initial={{ clipPath: "inset(12% 8% 12% 8% round 40px)", opacity: 0 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 40px)", opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
      >
        <motion.img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover object-center scale-[1.14]"
          style={{ y: imageY }}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="blueprint-section font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30 border-t border-accent/20"
      style={{
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem clamp(6rem, 10vw, 10rem)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <BlueprintSectionHeader index="SECTION_03" label="Selected work" align="center">
          <div className="mb-16 text-center sm:mb-20">
            <h2 className="hero-heading font-black uppercase leading-[1.02] tracking-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              Selected <span className="accent-serif">projects</span>
            </h2>
          </div>
        </BlueprintSectionHeader>

        {/* Scroll-reveal cards */}
        <div className="flex flex-col gap-10 sm:gap-14">
          {FEATURED.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
