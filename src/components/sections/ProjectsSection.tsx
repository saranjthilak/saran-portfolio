
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid gap-8 md:gap-10 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20 group hover:border-white/20 flex flex-col">
              <CardHeader>
                <CardTitle className="text-white text-lg sm:text-xl group-hover:text-blue-200 transition-colors">{project.title}</CardTitle>
                <CardDescription className="text-blue-300 pt-1 text-sm sm:text-base">{project.source}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-white/80 mb-6 text-base sm:text-lg leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.skills.map((skill) => (
                    <Badge key={skill} className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-500/30 text-blue-300 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm tracking-wide">
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
