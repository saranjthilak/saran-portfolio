
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { achievements } from "@/data/portfolio";
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
              <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
                <p>
                  My path into AI started in telecom operations at Nokia and Huawei, where I spent years keeping mission-critical infrastructure running at 99.99% availability. That grounding in reliability, on-call discipline, and systems thinking is what still shapes how I build data platforms today.
                </p>
                <p>
                  I moved deeper into the data stack through a Master's in Data Science, an AWS Solutions Architect certification, and Oracle's Generative AI and AI Foundations credentials — then applied it end-to-end at Tesla, designing Airflow ETL pipelines and RAG-based LLM assistants with guardrails for hallucination detection and response validation.
                </p>
                <p>
                  Today I focus on the intersection of data engineering and generative AI: vector databases, embedding pipelines, retrieval tuning, and evaluation frameworks that turn LLM prototypes into production systems. Two IEEE publications in applied machine learning keep the research muscle sharp.
                </p>
              </div>
            </CardContent>
          </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
