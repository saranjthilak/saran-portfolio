"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/data/portfolio";
import LiveProjectButton from "./LiveProjectButton";

// Use first 3 featured projects from portfolio.ts
const FEATURED = projects.filter((p) => p.featured).slice(0, 3);

const CARD_SCALE_STEP = 0.03;
const TOTAL_CARDS = 3;

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
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 flex flex-col gap-4"
        layoutId={`project-card-${index}`}
        id={`project-${index}`}
        aria-label={project.title}
      >
        {/* Top row */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <span
              className="font-kanit font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.5rem)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="font-kanit font-light uppercase tracking-widest text-[#D7E2EA]/50"
              style={{ fontSize: "clamp(0.6rem, 1vw, 0.85rem)" }}
            >
              {project.source}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span
              className="font-kanit font-medium uppercase tracking-wide text-[#D7E2EA]"
              style={{ fontSize: "clamp(0.85rem, 2vw, 1.5rem)" }}
            >
              {project.title}
            </span>
            <LiveProjectButton href={project.url} />
          </div>
        </div>

        {/* Image grid */}
        <div className="flex gap-4 flex-1 min-h-0">
          {/* Left column — 40% width, 2 stacked images */}
          <div className="flex flex-col gap-4" style={{ flex: "0 0 40%" }}>
            <div
              className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden flex-shrink-0"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            >
              <img
                src={project.image}
                alt={`${project.title} screenshot 1`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div
              className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden flex-1"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            >
              <img
                src={project.image}
                alt={`${project.title} screenshot 2`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right column — 60% width, 1 tall image */}
          <div className="flex-1 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
            <img
              src={project.image}
              alt={`${project.title} screenshot 3`}
              className="w-full h-full object-cover object-bottom"
              loading="lazy"
            />
          </div>
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
      className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10"
      style={{
        background: "#0C0C0C",
        padding: "clamp(4rem, 7vw, 7rem) 1.25rem clamp(6rem, 10vw, 10rem)",
      }}
    >
      {/* Heading */}
      <div className="text-center mb-16 sm:mb-20">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
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
