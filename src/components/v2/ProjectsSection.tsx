"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectLinks from "./LiveProjectButton";

// All featured projects from portfolio.ts
const FEATURED = projects.filter((p) => p.featured);

const CARD_SCALE_STEP = 0.03;
const TOTAL_CARDS = FEATURED.length;

interface ProjectCardProps {
  project: (typeof FEATURED)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}

const ProjectCard = ({ project, index, progress }: ProjectCardProps) => {
  const targetScale = 1 - (TOTAL_CARDS - 1 - index) * CARD_SCALE_STEP;
  const scale = useTransform(progress, [index / TOTAL_CARDS, 1], [1, targetScale]);

  return (
    <div
      className="sticky"
      style={{
        top: `${96 + index * 28}px`,
        height: "85vh",
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#ffffff] p-4 sm:p-6 md:p-8 flex flex-col gap-4"
        layoutId={`project-card-${index}`}
        id={`project-${index}`}
        aria-label={project.title}
      >
        {/* Top row */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <span
              className="font-kanit font-black text-[#ffffff] leading-none"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.5rem)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="font-kanit font-light uppercase tracking-widest text-[#ffffff]/50"
              style={{ fontSize: "clamp(0.6rem, 1vw, 0.85rem)" }}
            >
              {project.source}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span
              className="font-kanit font-medium uppercase tracking-wide text-[#ffffff]"
              style={{ fontSize: "clamp(0.85rem, 2vw, 1.5rem)" }}
            >
              {project.title}
            </span>
            <ProjectLinks githubUrl={project.url} liveUrl={project.liveUrl} />
          </div>
        </div>

        {/* Hero image */}
        <div className="flex-1 min-h-0 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="projects"
      className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30"
      style={{
        background: "#0d1116",
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem clamp(6rem, 10vw, 10rem)",
      }}
    >
      {/* Heading */}
      <div className="text-center mb-16 sm:mb-20">
        <h2
          className="hero-heading font-black uppercase leading-[1.02] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          Projects
        </h2>
      </div>

      {/* Sticky stacking cards */}
      <div style={{ paddingBottom: `${TOTAL_CARDS * 120}px` }}>
        {FEATURED.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
