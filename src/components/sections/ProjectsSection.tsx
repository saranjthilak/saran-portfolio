import { Github, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import { projects as curatedProjects } from "@/data/portfolio";
import productMatchingImg from "@/assets/project-product-matching.jpg";
import knowledgeAssistantImg from "@/assets/project-knowledge-assistant.jpg";
import divvyBikesImg from "@/assets/project-divvy-bikes.jpg";

const IMAGE_MAP: Record<string, string> = {
  "/src/assets/project-product-matching.jpg": productMatchingImg,
  "/src/assets/project-knowledge-assistant.jpg": knowledgeAssistantImg,
  "/src/assets/project-divvy-bikes.jpg": divvyBikesImg,
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Projects" tag="GitHub" />

        {/* Curated featured projects */}
        <div>
          <div className="mb-6">
            <div className="text-[11px] tracking-[0.3em] uppercase font-mono text-primary/80 mb-1">Selected Work</div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-gradient-primary">
              Featured Projects
            </h3>
          </div>
          <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
            {curatedProjects.filter((p) => p.featured).map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} direction="up" className="h-full">
                <Card className="glass rounded-2xl overflow-hidden h-full flex flex-col group hover:border-primary/40 hover:shadow-elegant transition-all duration-500">
                  {p.image ? (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border/50">
                      <img
                        src={IMAGE_MAP[p.image] ?? p.image}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border/50 bg-secondary/40 flex items-center justify-center">
                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          backgroundImage:
                            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                        aria-hidden
                      />
                      <Github className="relative w-10 h-10 text-primary/70" aria-hidden />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-primary/80 mb-1">
                      {p.source}
                    </div>
                    <CardTitle className="font-display text-xl font-semibold tracking-tight group-hover:text-gradient-primary transition-colors">
                      {p.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col gap-4">
                    <p className="text-foreground/75 text-sm leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                      {p.skills.map((s) => (
                        <Badge
                          key={s}
                          className="bg-primary/10 border border-primary/30 text-primary px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase font-mono font-medium rounded-md"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 self-start text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
                        aria-label={`View ${p.title} on GitHub`}
                      >
                        <Github className="w-3.5 h-3.5" aria-hidden /> View Repo
                        <ExternalLink className="w-3 h-3 opacity-70" aria-hidden />
                      </a>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
