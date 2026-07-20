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
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      className="glass p-5 rounded-2xl flex flex-col gap-3 group hover:bg-white/5 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="text-xl">{achievement.icon}</span>
        <span className="text-xs font-mono text-muted-foreground">{val === 100 ? 'MAX' : `${val}%`}</span>
      </div>
      <div>
        <h4 className="text-sm font-medium text-foreground mb-1">{achievement.title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2">{achievement.description}</p>
      </div>
      <div className="mt-auto h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={isInView ? { width: `${val}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
          className="h-full bg-primary/60 rounded-full"
        />
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20 sm:py-32 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="About"
          tag="Profile"
          index="01"
          subtitle="A blend of deep engineering discipline and modern AI innovation."
        />
        
        <div className="grid lg:grid-cols-5 gap-6 mt-12">
          {/* Left Bio Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="lg:col-span-2 glass rounded-3xl p-8 sm:p-10 flex flex-col justify-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
              <span className="text-xl">👋</span>
            </div>
            <h3 className="text-2xl font-display font-bold mb-6">The Journey</h3>
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
