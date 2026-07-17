
import { ArrowRight, Download } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import CountUp from "@/components/ui/count-up";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
  handleDownloadResume: () => void;
}

const stats = [
  { value: 99.9, suffix: "%", decimals: 1, label: "ML Reliability" },
  { value: 40, suffix: "%", decimals: 0, label: "RAG Speed Boost", delta: true },
  { value: 30, suffix: "%", decimals: 0, label: "Accuracy Gain" },
  { value: 3, suffix: "+", decimals: 0, label: "Years Experience" },
];

const HeroSection = ({ scrollToSection, handleDownloadResume }: HeroSectionProps) => {
  const reduce = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-stretch overflow-hidden bg-background"
    >
      {/* Dot grid backdrop */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-60" aria-hidden />

      <div className="relative flex-1 flex flex-col lg:flex-row">
        {/* Main content */}
        <div className="flex-1 flex flex-col p-8 sm:p-12 lg:p-16 border-r border-border">
          <motion.div
            className="flex-1 flex flex-col justify-center gap-8 max-w-2xl"
            variants={container}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
          >
            <motion.span
              variants={item}
              className="inline-flex self-start items-center gap-2 px-2.5 py-1 border border-primary/30 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Data Engineer &amp; Generative AI Specialist
            </motion.span>

            <motion.h1
              variants={item}
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-foreground tracking-tighter leading-[0.85] uppercase"
            >
              Saran<br />Jaya<br />Thilak
            </motion.h1>

            <motion.p
              variants={item}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed border-l-2 border-border pl-6 max-w-lg"
            >
              Architecting resilient data infrastructure and LLM-powered systems.
              3 years designing RAG pipelines, vector-database retrieval, and
              production-scale ML deployments — with 99.9% reliability and a 30%
              lift in LLM classification accuracy.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToSection("projects")}
                className="group inline-flex items-center gap-3 px-7 py-4 bg-foreground text-background font-bold uppercase text-xs tracking-[0.2em] hover:bg-primary transition-colors"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-3 px-7 py-4 border border-border text-foreground font-bold uppercase text-xs tracking-[0.2em] hover:bg-foreground/5 hover:border-primary/40 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download CV
              </button>
            </motion.div>
          </motion.div>

          {/* Stats footer strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border-t border-border mt-12 -mx-8 sm:-mx-12 lg:-mx-16 -mb-8 sm:-mb-12 lg:-mb-16">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group bg-background p-6 flex flex-col justify-center gap-1"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
                  {s.label}
                </span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
                  <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals} />
                  {s.delta && <span className="text-xs text-[hsl(var(--signal))] ml-1">+</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar panel with floating tech keywords */}
        <div className="hidden lg:flex lg:w-1/3 relative bg-[hsl(var(--surface-2))] items-center justify-center p-12 overflow-hidden">
          {/* Floating tech keywords */}
          {[
            { label: "RAG", x: "8%", y: "8%", delay: "0s", dur: "7s" },
            { label: "LLMs", x: "72%", y: "5%", delay: "1.2s", dur: "8s" },
            { label: "Airflow", x: "5%", y: "75%", delay: "0.5s", dur: "9s" },
            { label: "FAISS", x: "75%", y: "80%", delay: "2s", dur: "7.5s" },
            { label: "PyTorch", x: "60%", y: "35%", delay: "0.8s", dur: "8.5s" },
            { label: "Vector DB", x: "3%", y: "40%", delay: "1.5s", dur: "6.5s" },
            { label: "AWS", x: "78%", y: "55%", delay: "2.5s", dur: "7s" },
            { label: "Docker", x: "35%", y: "88%", delay: "0.3s", dur: "9.5s" },
            { label: "Python", x: "55%", y: "12%", delay: "1.8s", dur: "8s" },
            { label: "ETL", x: "20%", y: "60%", delay: "3s", dur: "7.5s" },
          ].map((tag) => (
            <span
              key={tag.label}
              className="absolute font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-1 border border-primary/15 text-primary/30 bg-primary/[0.03] select-none pointer-events-none"
              style={{
                left: tag.x,
                top: tag.y,
                animation: `cyber-float ${tag.dur} ease-in-out infinite`,
                animationDelay: tag.delay,
              }}
            >
              {tag.label}
            </span>
          ))}

          <div className="relative w-full aspect-square border border-border p-2 z-10">
            {/* Corner accents */}
            <span className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary z-10" />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary z-10" />
            <div className="w-full h-full bg-secondary overflow-hidden grayscale contrast-125">
              <img
                src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png"
                alt="Saran Jaya Thilak"
                width="640"
                height="640"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute right-4 bottom-4 font-mono text-[8px] text-muted-foreground/50 leading-tight tracking-widest text-right z-10">
            DATA_STREAM_8829<br />
            BERLIN_NODE_04<br />
            STABLE_BUILD_2026
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
