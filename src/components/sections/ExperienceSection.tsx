
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/portfolio";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-6">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        <div className="space-y-6 sm:space-y-8">
          {experience.map((job, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20 group hover:border-white/20">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 flex-1">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center text-2xl sm:text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                      {job.logo}
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{job.role}</h3>
                      <p className="text-blue-300 font-semibold text-lg sm:text-xl mb-2 sm:mb-3">{job.company}</p>
                      <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">{job.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-500/30 text-blue-300 px-3 sm:px-4 py-1 sm:py-2 text-sm whitespace-nowrap mx-auto sm:mx-0">
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
