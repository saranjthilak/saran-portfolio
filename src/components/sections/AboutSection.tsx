import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { achievements } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import HudFrame from "@/components/ui/hud-frame";

const bioLines = [
  "My path into AI started in telecom operations at Nokia and Huawei, where I spent years keeping mission-critical infrastructure running at 99.99% availability. That grounding in reliability, on-call discipline, and systems thinking is what still shapes how I build data platforms today.",
  "I moved deeper into the data stack through a Master's in Data Science, an AWS Solutions Architect certification, and Oracle's Generative AI and AI Foundations credentials — then applied it end-to-end at Tesla, designing Airflow ETL pipelines and RAG-based LLM assistants with guardrails for hallucination detection and response validation.",
  "Today I focus on the intersection of data engineering and generative AI: vector databases, embedding pipelines, retrieval tuning, and evaluation frameworks that turn LLM prototypes into production systems. Two IEEE publications in applied machine learning keep the research muscle sharp.",
];

const metricValues: Record<string, number> = {
  "40% Boost in RAG Processing": 40,
  "30% Embedding Pipeline Accuracy Gain": 30,
  "25% Vector DB Efficiency Boost": 25,
  "Two IEEE Machine Learning Publications": 100,
};

const metricColors: Record<string, string> = {
  "40% Boost in RAG Processing": "from-emerald-400 to-green-500",
  "30% Embedding Pipeline Accuracy Gain": "from-cyan-400 to-blue-500",
  "25% Vector DB Efficiency Boost": "from-fuchsia-400 to-purple-500",
  "Two IEEE Machine Learning Publications": "from-pink-400 to-rose-500",
};

const BootLog = () => {
  const reduce = useReducedMotion();
  return (
    <div className="font-mono text-sm sm:text-base leading-relaxed text-cyan-100/80 space-y-4">
      <div className="flex items-center gap-2 text-cyan-300/60 text-xs uppercase tracking-[0.2em] mb-4">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        System Profile — v2.4.1
      </div>
      {bioLines.map((line, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative pl-5 border-l border-cyan-400/20"
        >
          <span className="absolute left-0 top-0 -translate-x-1/2 text-[10px] text-cyan-400/40 select-none">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p>{line}</p>
        </motion.div>
      ))}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: bioLines.length * 0.18 + 0.3 }}
        className="flex items-center gap-2 pt-2"
      >
        <span className="text-cyan-400/70">{">"}</span>
        <span className="w-2 h-4 bg-cyan-400/70 animate-hud-blink" />
      </motion.div>
    </div>
  );
};

const TelemetryBar = ({
  icon,
  title,
  value,
  colorClass,
  index,
}: {
  icon: string;
  title: string;
  value: number;
  colorClass: string;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <span className="text-sm sm:text-base font-medium text-foreground">
            {title}
          </span>
        </div>
        <span className="text-xs sm:text-sm font-mono text-cyan-300/70 tracking-wider">
          {value === 100 ? "MAX" : `${value}%`}
        </span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
          initial={{ width: reduce ? `${value}%` : "0%" }}
          animate={{ width: isInView || reduce ? `${value}%` : "0%" }}
          transition={{ duration: 1.2, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
};

const PerformanceTelemetry = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-fuchsia-300/60 text-xs uppercase tracking-[0.2em] mb-2">
        <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
        Performance Telemetry
      </div>
      <div className="space-y-5">
        {achievements.map((a, i) => (
          <TelemetryBar
            key={a.title}
            icon={a.icon}
            title={a.title}
            value={metricValues[a.title] ?? 50}
            colorClass={metricColors[a.title] ?? "from-cyan-400 to-blue-500"}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="About Me"
          tag="System Profile"
          subtitle="Operational history, performance metrics, and system capabilities."
        />
        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          <Reveal direction="wipe-right">
            <HudFrame scan variant="cyan" readout="LOG●" id="ABT1">
              <div className="bg-black/40 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6 sm:p-8 hover:border-cyan-400/50 transition-colors duration-500">
                <BootLog />
              </div>
            </HudFrame>
          </Reveal>

          <Reveal direction="wipe" delay={0.1}>
            <HudFrame scan variant="fuchsia" readout="METRICS●" id="ABT2">
              <div className="bg-black/40 backdrop-blur-xl border border-fuchsia-400/20 rounded-2xl p-6 sm:p-8 hover:border-fuchsia-400/50 transition-colors duration-500 h-full flex flex-col justify-center">
                <PerformanceTelemetry />
              </div>
            </HudFrame>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
