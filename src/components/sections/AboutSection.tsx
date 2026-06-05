
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { achievements } from "@/data/portfolio";
import HudFrame from "@/components/ui/hud-frame";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="About Me" tag="Profile" />
        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          <Reveal direction="right">
          <Card className="glass rounded-2xl hover:border-primary/50 transition-all duration-500 hover:shadow-elegant group h-full">
            <CardHeader>
              <CardTitle className="font-display text-xl sm:text-2xl font-semibold flex items-center space-x-3">
                <div className="w-2 h-8 bg-gradient-primary rounded-full shadow-glow"></div>
                <span>Key Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 glass rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{achievement.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium text-base sm:text-lg">{achievement.title}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{achievement.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
          <Card className="glass rounded-2xl hover:border-accent/50 transition-all duration-500 hover:shadow-elegant group h-full">
            <CardHeader>
              <CardTitle className="font-display text-xl sm:text-2xl font-semibold flex items-center space-x-3">
                <div className="w-2 h-8 bg-gradient-primary rounded-full shadow-glow"></div>
                <span>Professional Background</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                Data Engineering and Generative AI professional with 3 years of experience designing and deploying scalable data pipelines and LLM-powered systems. Strong expertise in Python, distributed data processing, and Retrieval-Augmented Generation (RAG) architectures, including vector databases, embedding pipelines, and model evaluation frameworks. Master's in Data Science and AWS Certified Solutions Architect, with additional Oracle OCI Generative AI and AI Foundations certifications. Proven track record of 99.9% reliability in ML deployment, a 30% boost in LLM classification accuracy, and two IEEE publications in applied machine learning.
              </p>
            </CardContent>
          </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
