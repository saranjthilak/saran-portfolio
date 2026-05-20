
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/portfolio";
import HudFrame from "@/components/ui/hud-frame";
import SectionHeading from "@/components/ui/section-heading";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Experience" tag="Timeline" />
        <div className="space-y-6 sm:space-y-8">
          {experience.map((job, index) => (
            <HudFrame key={index} scan variant={index % 2 === 0 ? "cyan" : "fuchsia"}>
            <Card className="bg-black/30 backdrop-blur-xl border border-cyan-400/20 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 group hover:border-cyan-400/50">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 flex-1">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 rounded-2xl sm:rounded-3xl flex items-center justify-center text-2xl sm:text-4xl shadow-[0_0_25px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                      {job.logo}
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{job.role}</h3>
                      <p className="text-cyan-300 font-semibold text-lg sm:text-xl mb-2 sm:mb-3 tracking-wide">{job.company}</p>
                      <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">{job.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-400/40 text-cyan-200 px-3 sm:px-4 py-1 sm:py-2 text-xs whitespace-nowrap mx-auto sm:mx-0 uppercase tracking-[0.2em]">
                    {job.period}
                  </Badge>
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

export default ExperienceSection;
