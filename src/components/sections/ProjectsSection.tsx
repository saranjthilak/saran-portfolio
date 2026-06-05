
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio";
import HudFrame from "@/components/ui/hud-frame";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import { motion } from "framer-motion";
import productMatchingImg from "@/assets/project-product-matching.jpg";
import knowledgeAssistantImg from "@/assets/project-knowledge-assistant.jpg";
import divvyBikesImg from "@/assets/project-divvy-bikes.jpg";

const projectImages = [productMatchingImg, knowledgeAssistantImg, divvyBikesImg];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Featured Projects" tag="Builds" />
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 0.1} direction={index % 2 === 0 ? "right" : "left"} className="h-full">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="h-full"
            >
            <Card className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-elegant group flex flex-col h-full relative">
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative overflow-hidden aspect-[16/9] border-b border-border">
                <img
                  src={projectImages[index]}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md glass">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/80 font-mono">Live</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="font-display text-xl sm:text-2xl font-semibold text-foreground group-hover:text-gradient-primary transition-colors tracking-tight">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground pt-1 text-[11px] uppercase tracking-[0.2em] font-mono">{project.source}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <Badge key={skill} className="bg-secondary/60 border border-border text-foreground/80 hover:border-primary/40 hover:bg-primary/10 px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase font-mono font-medium rounded-md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
