"use client";

import FadeIn from "./FadeIn";
import { projects } from "@/data/portfolio";
import ProjectLinks from "./LiveProjectButton";
import BlueprintSectionHeader from "./BlueprintSectionHeader";

// All featured projects from portfolio.ts
const FEATURED = projects.filter((p) => p.featured);

interface ProjectCardProps {
  project: (typeof FEATURED)[number];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <FadeIn delay={0.05} y={40}>
      <div
        className="blueprint-cell w-full rounded-2xl border p-5 sm:p-8 md:p-10 flex flex-col gap-5"
        id={`project-${index}`}
        aria-label={project.title}
      >
        {/* Top row */}
        <div className="flex items-center justify-between flex-wrap gap-3">
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
        </div>

        {/* ── Case Study Strip ── */}
        {(project.problem || project.approach || project.result) && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.problem && (
              <div className="flex flex-col gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3.5">
                <span className="font-kanit font-bold uppercase tracking-widest text-[#00df8f] text-xs sm:text-sm">
                  Problem
                </span>
                <span className="font-kanit text-white/75 leading-relaxed text-sm sm:text-[0.95rem]">
                  {project.problem}
                </span>
              </div>
            )}
            {project.approach && (
              <div className="flex flex-col gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3.5">
                <span className="font-kanit font-bold uppercase tracking-widest text-[#38bdf8] text-xs sm:text-sm">
                  Approach
                </span>
                <span className="font-kanit text-white/75 leading-relaxed text-sm sm:text-[0.95rem]">
                  {project.approach}
                </span>
              </div>
            )}
            {project.result && (
              <div className="flex flex-col gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3.5">
                <span className="font-kanit font-bold uppercase tracking-widest text-[#f59e0b] text-xs sm:text-sm">
                  Result
                </span>
                <span className="font-kanit text-white/75 leading-relaxed text-sm sm:text-[0.95rem]">
                  {project.result}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Hero image */}
        <div className="rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden aspect-[16/9]">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>
    </FadeIn>
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
