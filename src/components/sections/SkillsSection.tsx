
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skills } from "@/data/portfolio";

// Tool image mapping for select well-known skills/tools
const toolImages: Record<string, string> = {
  Python: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80",
  SQL: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80",
  Docker: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80",
  Tableau: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80",
  "Power BI": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80",
  "AWS": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80",
  "GCP": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80",
  "Kubernetes": "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80",
  "Jenkins": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80",
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold tracking-tight text-white font-orbitron mb-6 neon-text">
            My Skills
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mx-auto rounded-full animate-gradient-pan"></div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {Object.entries(skills).map(([category, skillList], index) => (
            <Card
              key={category}
              className={`
                bg-gradient-to-br
                ${
                  index === 0
                    ? "from-[#0fd850]/80 to-[#007cf0]/70"
                    : index === 1
                    ? "from-[#43e97b]/80 to-[#38f9d7]/70"
                    : "from-[#fa8bff]/80 to-[#2bd2ff]/70"
                }
                border-white/20 neon-shadow
                backdrop-blur-xl
                transition-all duration-300
                hover:scale-105
                hover:shadow-2xl
                hover:border-cyan-300/60
                group
                relative
                overflow-hidden
                `}
            >
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_70%_40%,#fff,transparent,transparent)]" />
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center flex items-center justify-center space-x-4 uppercase font-orbitron tracking-widest drop-shadow-[0_1.5px_1.5px_rgba(0,255,255,0.3)]">
                  <span>{category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {skillList.map((skill) => (
                    <div
                      key={skill}
                      className={`
                        flex flex-col items-center justify-center
                        bg-black/40 hover:bg-black/70
                        neon-border
                        rounded-xl p-4 min-h-[80px]
                        border-2 border-cyan-300/10 hover:border-cyan-300/80
                        transition-all duration-300
                        hover:scale-110 group
                        shadow-lg
                        `}
                    >
                      {toolImages[skill] ? (
                        <img
                          src={toolImages[skill]}
                          alt={skill}
                          className="rounded-lg mb-2 w-10 h-10 object-cover shadow-md border border-white/10"
                          loading="lazy"
                        />
                      ) : null}
                      <span className="text-white text-base font-semibold font-orbitron tracking-wide group-hover:text-cyan-200 transition-colors neon-text-shadow">{skill}</span>
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
