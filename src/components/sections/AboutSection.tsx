import { motion } from "framer-motion";
import { achievements } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";
import { useInView } from "framer-motion";
import { useRef } from "react";

const bioLines = [
  "My path into AI started in telecom operations at Nokia and Huawei, where I spent years keeping mission-critical infrastructure running at 99.99% availability. That grounding in reliability, on-call discipline, and systems thinking is what still shapes how I build data platforms today.",
  "I moved deeper into the data stack through a Master's in Data Science, an AWS Solutions Architect certification, and Oracle's Generative AI credentials — then applied it end-to-end at Tesla, designing Airflow ETL pipelines and RAG-based LLM assistants with guardrails for hallucination detection.",
  "Today I focus on the intersection of data engineering and generative AI: vector databases, embedding pipelines, retrieval tuning, and evaluation frameworks that turn LLM prototypes into production systems."
];

const metricValues: Record<string, number> = {
  "40% Boost in RAG Processing": 40,
  "30% Embedding Pipeline Accuracy Gain": 30,
  "25% Vector DB Efficiency Boost": 25,
  "Two IEEE Machine Learning Publications": 100,
  "99.9% ETL Pipeline Reliability": 99,
  "~20% AWS Cloud Cost Reduction": 20,
  "99.99% Network Uptime": 99,
  "4 Professional AI & Cloud Certifications": 80,
};

const MetricCard = ({ 
  achievement, 
  index 
}: { 
  achievement: typeof achievements[0], 
  index: number 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const val = metricValues[achievement.title] ?? 50;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.05 }}
      className="group relative glass-panel p-5 rounded-2xl flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300 border border-white/[0.05] hover:border-primary/30 overflow-hidden bg-background/30 backdrop-blur-md"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />
      
      <div className="flex items-center justify-between relative z-10">
        <span className="text-xl p-2 bg-white/5 rounded-lg border border-white/5 group-hover:scale-110 transition-transform duration-300">{achievement.icon}</span>
        <span className="text-xs font-mono text-primary font-medium tracking-wider">{val === 100 ? 'MAX' : `${val}%`}</span>
      </div>
      <div className="relative z-10 mt-2">
        <h4 className="text-sm font-semibold text-foreground mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary/80 transition-all">{achievement.title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{achievement.description}</p>
      </div>
      <div className="mt-auto pt-2 relative z-10">
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: `${val}%` } : { width: 0 }}
            transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full relative"
          >
            <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20 blur-[2px]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="About"
          tag="Profile"
          index="01"
          subtitle="A blend of deep engineering discipline and modern AI innovation."
        />
        
        <div className="grid lg:grid-cols-5 gap-6 mt-16">
          {/* Left Bio Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 relative glass-panel rounded-3xl p-8 sm:p-10 flex flex-col justify-center border border-white/[0.08] hover:border-white/[0.15] transition-colors bg-background/50 backdrop-blur-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-inner flex items-center justify-center mb-8">
              <span className="text-2xl">👋</span>
            </div>
            <h3 className="text-3xl font-display font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">The Journey</h3>
            <div className="space-y-6">
              {bioLines.map((line, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed text-sm sm:text-base font-light">
                  {line}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Right Metrics Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement, i) => (
              <MetricCard key={i} achievement={achievement} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
