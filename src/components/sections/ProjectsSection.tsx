
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio";
import HudFrame from "@/components/ui/hud-frame";
import SectionHeading from "@/components/ui/section-heading";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Featured Projects" tag="Builds" />
        <div className="grid gap-8 md:gap-10 sm:grid-cols-2">
          {projects.map((project, index) => (
            <HudFrame key={index} scan variant={index % 2 === 0 ? "cyan" : "fuchsia"} className="h-full">
            <Card className="bg-black/30 backdrop-blur-xl border border-cyan-400/20 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 group hover:border-cyan-400/50 flex flex-col h-full">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
