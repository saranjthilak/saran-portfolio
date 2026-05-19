
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { achievements } from "@/data/portfolio";

const AboutSection = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-6">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20 group hover:border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
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

          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/20 group hover:border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg"></div>
                <span>Professional Background</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 leading-relaxed text-base sm:text-lg">
                Data Engineering and Generative AI professional with 3 years of experience designing and deploying scalable data pipelines and LLM-powered systems. Strong expertise in Python, distributed data processing, and Retrieval-Augmented Generation (RAG) architectures, including vector databases, embedding pipelines, and model evaluation frameworks. Master's in Data Science and AWS Certified Solutions Architect, with additional Oracle OCI Generative AI and AI Foundations certifications. Proven track record of 99.9% reliability in ML deployment, a 30% boost in LLM classification accuracy, and two IEEE publications in applied machine learning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
