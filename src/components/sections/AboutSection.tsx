
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { achievements } from "@/data/portfolio";
import HudFrame from "@/components/ui/hud-frame";
import SectionHeading from "@/components/ui/section-heading";

const AboutSection = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="About Me" tag="Profile" />
        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          <HudFrame scan>
          <Card className="bg-black/30 backdrop-blur-xl border border-cyan-400/30 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 group hover:border-cyan-400/60">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.6)]"></div>
                <span>Key Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${achievement.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{achievement.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base sm:text-lg">{achievement.title}</h3>
                      <p className="text-white/70 text-sm sm:text-base leading-relaxed">{achievement.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          </HudFrame>

          <HudFrame scan variant="fuchsia">
          <Card className="bg-black/30 backdrop-blur-xl border border-fuchsia-400/30 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-fuchsia-500/30 group hover:border-fuchsia-400/60">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg shadow-[0_0_15px_rgba(217,70,239,0.6)]"></div>
                <span>Professional Background</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 leading-relaxed text-base sm:text-lg">
                Data Engineering and Generative AI professional with 3 years of experience designing and deploying scalable data pipelines and LLM-powered systems. Strong expertise in Python, distributed data processing, and Retrieval-Augmented Generation (RAG) architectures, including vector databases, embedding pipelines, and model evaluation frameworks. Master's in Data Science and AWS Certified Solutions Architect, with additional Oracle OCI Generative AI and AI Foundations certifications. Proven track record of 99.9% reliability in ML deployment, a 30% boost in LLM classification accuracy, and two IEEE publications in applied machine learning.
              </p>
            </CardContent>
          </Card>
          </HudFrame>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
