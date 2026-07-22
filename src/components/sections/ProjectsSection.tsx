import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { projects as curatedProjects } from "@/data/portfolio";
import productMatchingImg from "@/assets/project-product-matching.png";
import knowledgeAssistantImg from "@/assets/project-knowledge-assistant.png";
import divvyBikesImg from "@/assets/project-divvy-bikes.png";
import multimodalRagImg from "@/assets/project-multimodal-rag.png";
import germanAppImg from "@/assets/project-german-app.png";
import vanillaSteelImg from "@/assets/project-vanilla-steel.png";
import SectionHeading from "@/components/ui/section-heading";

const IMAGE_MAP: Record<string, string> = {
  "/src/assets/project-product-matching.png": productMatchingImg,
  "/src/assets/project-knowledge-assistant.png": knowledgeAssistantImg,
  "/src/assets/project-divvy-bikes.png": divvyBikesImg,
  "/src/assets/project-multimodal-rag.png": multimodalRagImg,
  "/src/assets/project-german-app.png": germanAppImg,
  "/src/assets/project-vanilla-steel.png": vanillaSteelImg,
};

const ProjectCard = ({ project, index }: { project: typeof curatedProjects[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className={`group relative glass-panel rounded-3xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 border border-white/[0.05] hover:border-white/[0.15] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] bg-background/50 backdrop-blur-xl ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.02]">
        {project.image ? (
          <img
            src={IMAGE_MAP[project.image] ?? project.image}
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
              rel="noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full glass-panel border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 shrink-0"
              aria-label={`View ${project.title} on GitHub`}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading title="Projects" tag="Portfolio" index="04" subtitle="Featured work spanning AI, data engineering, and full-stack development." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 sm:mt-24">
          {curatedProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
