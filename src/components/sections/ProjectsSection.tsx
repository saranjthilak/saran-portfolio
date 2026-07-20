import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { projects as curatedProjects } from "@/data/portfolio";
import productMatchingImg from "@/assets/project-product-matching.jpg";
import knowledgeAssistantImg from "@/assets/project-knowledge-assistant.jpg";
import divvyBikesImg from "@/assets/project-divvy-bikes.jpg";
import SectionHeading from "@/components/ui/section-heading";

const IMAGE_MAP: Record<string, string> = {
  "/src/assets/project-product-matching.jpg": productMatchingImg,
  "/src/assets/project-knowledge-assistant.jpg": knowledgeAssistantImg,
  "/src/assets/project-divvy-bikes.jpg": divvyBikesImg,
};

const ProjectCard = ({ project, index }: { project: typeof curatedProjects[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      className={`glass rounded-3xl overflow-hidden group flex flex-col ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
        {project.image ? (
          <img
            src={IMAGE_MAP[project.image] ?? project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
            <Github className="w-16 h-16" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Content Container */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        <div className="text-xs font-mono tracking-widest uppercase text-primary/80 mb-3">
          {project.source}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-display mb-4 text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow font-light">
          {project.description}
        </p>

        {/* Footer: Tags & Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.skills.slice(0, 3).map(skill => (
              <span key={skill} className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono bg-white/5 rounded-md border border-white/5 text-foreground/70">
                {skill}
              </span>
            ))}
            {project.skills.length > 3 && (
              <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono bg-white/5 rounded-md border border-white/5 text-foreground/40">
                +{project.skills.length - 3}
              </span>
            )}
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full glass hover:bg-white/10 transition-colors shrink-0"
              aria-label={`View ${project.title} on GitHub`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 sm:py-32 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Projects" tag="Portfolio" index="04" subtitle="Featured work spanning AI, data engineering, and full-stack development." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {curatedProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
