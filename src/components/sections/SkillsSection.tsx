
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skills } from "@/data/portfolio";

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold tracking-tight text-white mb-6">My Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {Object.entries(skills).map(([category, skillList], index) => (
            <Card key={category} className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20 group hover:border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center flex items-center justify-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg ${
                    index === 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                    index === 1 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                    'bg-gradient-to-r from-purple-500 to-pink-600'
                  }`}></div>
                  <span>{category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {skillList.map((skill) => (
                    <div
                      key={skill}
                      className="bg-black/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:border-blue-500/50 hover:bg-black/30 transition-all duration-300 hover:scale-105 group"
                    >
                      <span className="text-white text-sm font-medium group-hover:text-blue-200 transition-colors tracking-wide">{skill}</span>
                    </div>
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

export default SkillsSection;
