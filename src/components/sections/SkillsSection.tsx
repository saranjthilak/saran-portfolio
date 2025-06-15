
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

const colorThemes = [
  "from-[#151d2a]/80 via-[#14e0c3]/40 to-[#172254]/80",
  "from-[#24273c]/80 via-[#00f0ff]/60 to-[#2d2073]/70",
  "from-[#120c25]/90 via-[#00aaff]/40 to-[#0c183d]/90",
];

const SkillsSection = () => (
  <section id="skills" className="py-28 px-4 sm:px-8 bg-transparent">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight font-orbitron mb-6 neon-text text-white drop-shadow-[0_2px_32px_rgba(0,255,255,0.12)]">
          My Skills
        </h2>
        <div className="w-36 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mx-auto rounded-full animate-gradient-pan shadow-lg"></div>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-white/70 font-light neon-text-shadow">
          Flawlessly blending engineering, ML, AI, and analytics with modern toolkits.<br />
          Tap on skills to see my toolbox!
        </p>
      </div>
      <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 md:grid-cols-3">
        {Object.entries(skills).map(([category, skillList], idx) => (
          <Card
            key={category}
            className={`
              bg-gradient-to-br ${colorThemes[idx % colorThemes.length]}
              border-2 border-cyan-300/20 neon-shadow hover:border-cyan-300/70
              backdrop-blur-2xl relative overflow-hidden h-full
              transition-all duration-300 group
              hover:scale-105 shadow-[0_8px_64px_0_rgba(0,255,255,0.09)]
            `}
          >
            <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_70%_30%,#46e8fc55,transparent,transparent)]" />
            <CardHeader>
              <CardTitle className="text-center text-white text-2xl font-orbitron tracking-wider uppercase drop-shadow-[0_2px_4px_cyan]">
                {category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                {skillList.map((skill) => (
                  <div
                    key={skill}
                    className={`
                      flex flex-col items-center justify-center
                      p-3
                      rounded-xl
                      bg-black/60 hover:bg-black/90 border-2 border-transparent hover:border-cyan-300
                      shadow-xl neon-shadow transition-all duration-200
                      group-hover:scale-105 hover:scale-110
                    `}
                  >
                    {toolImages[skill] ? (
                      <div className="mb-2">
                        <img
                          src={toolImages[skill]}
                          alt={skill}
                          className="rounded-full w-14 h-14 object-cover object-center border-2 border-cyan-200 neon-shadow ring-4 ring-cyan-400/15 transition-transform duration-300 hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="mb-2 w-14 h-14 flex items-center justify-center rounded-full bg-cyan-900/40 border border-cyan-800/60 text-white font-bold font-orbitron uppercase text-xl neon-text-shadow">
                        {skill[0]}
                      </div>
                    )}
                    <span className="text-white font-semibold tracking-wide font-orbitron text-base neon-text-shadow text-center mt-1 group-hover:text-cyan-300 transition-colors">
                      {skill}
                    </span>
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

export default SkillsSection;
