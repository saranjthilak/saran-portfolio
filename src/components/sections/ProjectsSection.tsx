import { Github, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects as curatedProjects } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";
import TiltCard from "@/components/ui/tilt-card";

const ProjectCard = ({ project, index }: { project: typeof curatedProjects[0], index: number }) => {
  return (
    <div className="flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[38vw] xl:w-[32vw]">
      <TiltCard
        tiltMax={6}
        scaleOnHover={1.03}
        className={`group relative glass-panel rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-500 border border-white/[0.05] hover:border-white/[0.15] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] bg-background/50 backdrop-blur-xl`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.02]">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
              <Github className="w-16 h-16" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
        </div>

        {/* Content Container */}
        <div className="p-6 sm:p-8 flex flex-col flex-grow relative z-10 -mt-8">
          <div className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-primary mb-3 drop-shadow-sm font-semibold">
            {project.source}
          </div>
          <h3 className="text-2xl font-bold font-display mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 group-hover:to-white transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow font-light">
            {project.description}
          </p>

          {/* Footer: Tags & Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.skills.slice(0, 3).map(skill => (
                <span key={skill} className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-mono bg-white/5 rounded-full border border-white/5 text-foreground/70 shadow-inner group-hover:border-white/10 transition-colors">
                  {skill}
                </span>
              ))}
              {project.skills.length > 3 && (
                <span className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-mono bg-white/5 rounded-full border border-white/5 text-foreground/40 shadow-inner group-hover:border-white/10 transition-colors">
                  +{project.skills.length - 3}
                </span>
              )}
            </div>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full glass-panel border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 shrink-0"
                aria-label={`View ${project.title} on GitHub`}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </TiltCard>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Map vertical scroll to horizontal translation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Translate based on number of projects — scroll the full width
  const totalCards = curatedProjects.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["2%", `${-(totalCards - 1) * 28}%`]
  );

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden" style={{ height: `${Math.max(200, totalCards * 55)}vh` }}>
      {/* Background Blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      {/* Sticky container that stays in view while we scroll */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-6 sm:px-8 md:px-12 max-w-7xl mx-auto w-full mb-8 sm:mb-12">
          <SectionHeading title="Projects" tag="Portfolio" index="04" subtitle="Featured work spanning AI, data engineering, and full-stack development." />
        </div>

        {/* Horizontal scrolling cards */}
        <motion.div
          ref={scrollContainerRef}
          style={{ x }}
          className="flex gap-6 sm:gap-8 pl-6 sm:pl-8 md:pl-12 pr-[10vw] items-stretch"
        >
          {curatedProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>

        {/* Scroll progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-12">
          {curatedProjects.map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/20"
              style={{
                scale: useTransform(
                  scrollYProgress,
                  [i / totalCards, (i + 0.5) / totalCards, (i + 1) / totalCards],
                  [1, 1.5, 1]
                ),
                opacity: useTransform(
                  scrollYProgress,
                  [i / totalCards, (i + 0.5) / totalCards, (i + 1) / totalCards],
                  [0.3, 1, 0.3]
                ),
                backgroundColor: useTransform(
                  scrollYProgress,
                  [i / totalCards, (i + 0.5) / totalCards, (i + 1) / totalCards],
                  ["rgba(255,255,255,0.2)", "hsl(217, 91%, 60%)", "rgba(255,255,255,0.2)"]
                ),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
