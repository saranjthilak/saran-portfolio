
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { achievements } from "@/data/portfolio";

const AboutSection = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gradient mb-4 sm:mb-6">About Me</h2>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          <Card className="glass-card hover-glow group animate-scale-in">
            <CardHeader>
              <CardTitle className="text-foreground text-xl sm:text-2xl flex items-center space-x-3">
                <div className="w-8 h-8 gradient-primary rounded-2xl shadow-lg shadow-primary/25"></div>
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
                      <h3 className="text-foreground font-semibold text-base sm:text-lg">{achievement.title}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{achievement.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow group animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-foreground text-xl sm:text-2xl flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-2xl shadow-lg shadow-accent/25"></div>
                <span>Professional Background</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 leading-relaxed text-base sm:text-lg">
                Data Science and AI professional with expertise in data engineering, machine learning, and cloud infrastructure. Holds a Master's in Data Science and completed a boot camp in Data Science & AI. AWS Certified Solutions Architect with hands-on experience in building scalable pipelines (AWS, GCP), automating workflows with CI/CD, and developing LLM-based applications including Retrieval-Augmented Generation (RAG) systems. Proficient in Python, SQL, Airflow, DBT, and MLflow. Published author of two IEEE research papers in applied machine learning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
