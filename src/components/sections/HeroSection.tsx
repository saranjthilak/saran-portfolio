import { ArrowRight, Download, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 1,
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background pt-20 pb-16"
    >
      {/* Premium Vercel/Linear animated blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-accent/20 blur-[120px] rounded-full mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-success/10 blur-[120px] rounded-full mix-blend-screen animate-blob animation-delay-4000" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwaDIwdjIwSDIweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] z-0" />

      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col items-center justify-center text-center mt-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
        >
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-foreground/90">Available for new opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 mb-6 drop-shadow-sm"
        >
          Saran Jaya Thilak
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.3 }}
          className="max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed font-light"
        >
          Architecting resilient data infrastructure and <span className="text-foreground font-medium">LLM-powered systems</span>. 
          Specializing in RAG pipelines, vector databases, and production-scale ML deployments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] active:scale-95"
          >
            Explore Work
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={handleDownloadResume}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 glass rounded-full font-medium text-foreground hover:bg-white/5 transition-colors hover:border-white/20 active:scale-95"
          >
            <Download className="w-4 h-4" />
            Download CV
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Image / Avatar Card with Apple-like scroll reveal */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 sm:mt-32 w-full max-w-5xl mx-auto px-6 relative z-10"
      >
        <div className="relative aspect-[21/9] sm:aspect-[21/8] w-full rounded-[2rem] overflow-hidden glass-panel border border-white/10 shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
          
          <img
            src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png"
            alt="Saran Jaya Thilak"
            className="w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-105 filter grayscale-[20%]"
          />
          
          {/* Stats Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((s, i) => (
                <motion.div 
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
                  className="flex flex-col gap-1.5"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                    <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals} />
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-white/50 tracking-widest uppercase font-mono">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
