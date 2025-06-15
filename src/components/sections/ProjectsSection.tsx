
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group flex flex-col">
              <CardHeader>
                <CardTitle className="text-white text-xl group-hover:text-blue-200 transition-colors">{project.title}</CardTitle>
                <CardDescription className="text-blue-300 pt-1">{project.source}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-white/80 mb-6 text-lg leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                  {project.skills.map((skill) => (
                    <Badge key={skill} className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-500/30 text-blue-300 px-4 py-2">
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
