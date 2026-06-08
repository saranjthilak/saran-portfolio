import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skills } from "@/data/portfolio";
import HudFrame from "@/components/ui/hud-frame";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const skillLevels: Record<string, number> = {
  LLMs: 95, RAG: 95, LangChain: 92, "Vector DB": 88, "Prompt Engineering": 94,
  PyTorch: 85, TensorFlow: 82, Keras: 80, "Scikit-learn": 90, "Deep Learning": 88,
  NLP: 90, "Time Series": 78, MLflow: 80, MLOps: 82,
  Python: 95, SQL: 92, FastAPI: 88, Streamlit: 85, Pandas: 94, NumPy: 92,
  REST: 90, "API Design": 88, Microservices: 82, "Automated Testing": 80,
  AWS: 92, GCP: 88, BigQuery: 90, DBT: 85, Airflow: 92, Docker: 90,
  Kubernetes: 80, Terraform: 88, IaC: 86, "CI/CD": 88, GitHub: 95,
  IAM: 82, ETL: 92, Tableau: 78,
};

const palette = [
  { from: "from-cyan-400", to: "to-emerald-400", glow: "rgba(34,211,238,0.65)", text: "text-cyan-200", dot: "bg-cyan-400" },
  { from: "from-indigo-400", to: "to-cyan-400", glow: "rgba(99,102,241,0.65)", text: "text-indigo-200", dot: "bg-indigo-400" },
  { from: "from-fuchsia-500", to: "to-pink-400", glow: "rgba(217,70,239,0.65)", text: "text-fuchsia-200", dot: "bg-fuchsia-400" },
];

const ProficiencyBar = ({
  name, level, idx, colorIdx,
}: { name: string; level: number; idx: number; colorIdx: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const c = palette[colorIdx];

  return (
    <div ref={ref} className="group/skill">
      <div className="flex items-center mb-1.5">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${c.text}`} style={{ boxShadow: `0 0 8px ${c.glow}` }} />
          <span className="text-white/90 text-xs font-medium tracking-wider uppercase group-hover/skill:text-white transition-colors">
            {name}
          </span>
        </div>
      </div>
      <div className="relative h-2 rounded-full bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 20px)",
          }}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            delay: reduce ? 0 : 0.15 + idx * 0.05,
            duration: reduce ? 0 : 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`relative h-full rounded-full bg-gradient-to-r ${c.from} ${c.to}`}
          style={{ boxShadow: `0 0 12px ${c.glow}, 0 0 24px ${c.glow}` }}
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full opacity-70 animate-shimmer"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
          />
          <motion.span
            aria-hidden
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
            style={{ boxShadow: `0 0 10px white, 0 0 18px ${c.glow}` }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="My Skills" tag="Stack" />
        <div className="grid md:grid-cols-3 gap-10">
          {Object.entries(skills).map(([category, skillList], index) => (
            <Reveal key={category} delay={index * 0.12} direction={index % 2 === 0 ? "up" : "scale"}>
              <HudFrame scan variant={index === 0 ? "cyan" : index === 1 ? "mixed" : "fuchsia"}>
                <Card className="bg-black/30 backdrop-blur-xl border border-cyan-400/20 hover:bg-white/5 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-cyan-500/30 group hover:border-cyan-400/50">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl text-center flex items-center justify-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-lg ${
                          index === 0
                            ? "bg-gradient-to-r from-cyan-400 to-emerald-500 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                            : index === 1
                            ? "bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]"
                            : "bg-gradient-to-r from-fuchsia-500 to-pink-500 shadow-[0_0_15px_rgba(217,70,239,0.6)]"
                        }`}
                      ></div>
                      <span>{category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {skillList.map((skill, i) => (
                        <ProficiencyBar
                          key={skill}
                          name={skill}
                          level={skillLevels[skill] ?? 80}
                          idx={i}
                          colorIdx={index}
                        />
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