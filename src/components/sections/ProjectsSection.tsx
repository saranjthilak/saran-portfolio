
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gradient mb-4 sm:mb-6">Featured Projects</h2>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid gap-8 md:gap-10 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="glass-card hover-glow group flex flex-col animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="text-foreground text-lg sm:text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <CardDescription className="text-primary pt-1 text-sm sm:text-base">{project.source}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-foreground/80 mb-6 text-base sm:text-lg leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      className="glass border border-primary/30 text-primary px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm tracking-wide hover:bg-primary/10 transition-all duration-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
