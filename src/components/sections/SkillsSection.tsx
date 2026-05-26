
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skills } from "@/data/portfolio";
import HudFrame from "@/components/ui/hud-frame";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="My Skills" tag="Stack" />
        <div className="grid md:grid-cols-3 gap-10">
          {Object.entries(skills).map(([category, skillList], index) => (
            <Reveal key={category} delay={index * 0.12} direction={index % 2 === 0 ? "up" : "scale"}>
            <HudFrame scan variant={index === 0 ? "cyan" : index === 1 ? "mixed" : "fuchsia"}>
            <Card className="bg-black/30 backdrop-blur-xl border border-cyan-400/20 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 group hover:border-cyan-400/50">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center flex items-center justify-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg ${
                    index === 0 ? 'bg-gradient-to-r from-cyan-400 to-emerald-500 shadow-[0_0_15px_rgba(34,211,238,0.6)]' :
                    index === 1 ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]' :
                    'bg-gradient-to-r from-fuchsia-500 to-pink-500 shadow-[0_0_15px_rgba(217,70,239,0.6)]'
                  }`}></div>
                  <span>{category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {skillList.map((skill) => (
                    <div
                      key={skill}
                      className="bg-black/40 backdrop-blur-sm rounded-xl p-4 text-center border border-cyan-400/20 hover:border-cyan-400/70 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300 hover:scale-105 group"
                    >
                      <span className="text-white text-sm font-medium group-hover:text-cyan-200 transition-colors tracking-wider uppercase">{skill}</span>
                    </div>
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

export default SkillsSection;
