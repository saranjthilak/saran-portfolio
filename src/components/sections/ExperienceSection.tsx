
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/portfolio";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        <div className="space-y-8">
          {experience.map((job, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {job.logo}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{job.role}</h3>
                      <p className="text-blue-300 font-semibold text-xl mb-3">{job.company}</p>
                      <p className="text-white/70 text-lg leading-relaxed max-w-2xl">{job.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-500/30 text-blue-300 px-4 py-2 text-sm">
                    {job.period}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
