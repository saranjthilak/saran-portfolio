
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio";
import HudFrame from "@/components/ui/hud-frame";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import productMatchingImg from "@/assets/project-product-matching.jpg";
import knowledgeAssistantImg from "@/assets/project-knowledge-assistant.jpg";
import divvyBikesImg from "@/assets/project-divvy-bikes.jpg";

const projectImages = [productMatchingImg, knowledgeAssistantImg, divvyBikesImg];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Featured Projects" tag="Builds" />
        <div className="grid gap-8 md:gap-10 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 0.1} direction={index % 2 === 0 ? "right" : "left"} className="h-full">
            <HudFrame scan variant={index % 2 === 0 ? "cyan" : "fuchsia"} className="h-full">
            <Card className="bg-black/30 backdrop-blur-xl border border-cyan-400/20 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 group hover:border-cyan-400/50 flex flex-col h-full">
              <div className="relative overflow-hidden rounded-t-lg aspect-[16/9] border-b border-cyan-400/20">
                <img
                  src={projectImages[index]}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(34,211,238,0.06)_50%,transparent_100%)] bg-[length:100%_6px] mix-blend-overlay pointer-events-none" />
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded bg-black/60 backdrop-blur border border-cyan-400/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-cyan-200">Live Preview</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-white text-lg sm:text-xl group-hover:text-cyan-200 transition-colors tracking-wide">{project.title}</CardTitle>
                <CardDescription className="text-cyan-300/80 pt-1 text-xs sm:text-sm uppercase tracking-[0.2em]">// {project.source}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-white/80 mb-6 text-base sm:text-lg leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.skills.map((skill) => (
                    <Badge key={skill} className="bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-400/40 text-cyan-200 px-3 sm:px-4 py-1 sm:py-2 text-xs tracking-wider uppercase">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            </HudFrame>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
