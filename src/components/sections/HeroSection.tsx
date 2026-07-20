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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
      {/* Subtle Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col items-center justify-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium tracking-wide text-foreground/80">Available for new opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-foreground mb-6"
        >
          Saran Jaya Thilak
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.3 }}
          className="max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed font-light"
        >
          Architecting resilient data infrastructure and LLM-powered systems. 
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
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
          >
            Explore Work
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={handleDownloadResume}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 glass rounded-full font-medium text-foreground hover:bg-white/5 transition-colors hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            Download CV
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Image / Avatar Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.6 }}
        className="mt-16 sm:mt-24 w-full max-w-4xl mx-auto px-6 relative z-10"
      >
        <div className="relative aspect-[21/9] sm:aspect-[21/8] md:aspect-[21/7] w-full rounded-2xl sm:rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent z-10" />
          <img
            src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png"
            alt="Saran Jaya Thilak"
            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105 filter grayscale-[30%]"
          />
          
          {/* Stats Overlay inside the image frame */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((s, i) => (
                <motion.div 
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springTransition, delay: 0.8 + (i * 0.1) }}
                  className="flex flex-col gap-1"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white">
                    <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white/60 tracking-wide uppercase">
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
