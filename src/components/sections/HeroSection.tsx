
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Magnetic from "@/components/ui/magnetic";
import DecryptText from "@/components/ui/decrypt-text";
import CountUp from "@/components/ui/count-up";
import HeroGlobe from "@/components/ui/hero-globe";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
  handleDownloadResume: () => void;
}

const HeroSection = ({ scrollToSection, handleDownloadResume }: HeroSectionProps) => {
  const reduce = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
  };
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 overflow-hidden">
      <HeroGlobe />
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 40 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
        <Card className="relative glass rounded-2xl overflow-hidden shadow-elegant">
          <div className="pointer-events-none absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-radial-glow opacity-60" />
          <CardContent className="relative p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <motion.div
                className="flex-1 lg:pr-8 text-center lg:text-left"
                variants={container}
                initial={reduce ? undefined : "hidden"}
                animate={reduce ? undefined : "show"}
              >
                <motion.div variants={item} className="inline-flex items-center space-x-2 glass px-4 sm:px-5 py-2 rounded-full mb-6 sm:mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-foreground/85 text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase font-mono">Available for new opportunities</span>
                </motion.div>
                
                <motion.h1 variants={item} className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.03em] mb-4 sm:mb-6 text-gradient-primary neon-text leading-[1.02]">
                  Saran Jaya Thilak
                </motion.h1>
                <motion.p variants={item} className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-primary/90 font-normal tracking-[0.04em] font-mono">
                  <DecryptText
                    text="Generative AI | RAG Architectures | LLM Orchestration | Python Expertise"
                    duration={2000}
                    delay={400}
                  />
                </motion.p>
                <motion.p variants={item} className="text-base sm:text-lg mb-8 sm:mb-10 text-muted-foreground max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Data Engineering and Generative AI professional with 3 years of experience designing and deploying scalable data pipelines and LLM-powered systems. Strong expertise in Python, distributed data processing, and Retrieval-Augmented Generation (RAG) architectures — including vector databases, embedding pipelines, and model evaluation frameworks. Proven track record of 99.9% reliability in ML model deployment and a 30% boost in LLM classification accuracy through prompt engineering and retrieval tuning.
                </motion.p>
                <motion.div variants={item} className="flex items-center justify-center lg:justify-start space-x-3 mb-8 sm:mb-10">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground text-sm sm:text-base">Berlin, Germany</span>
                </motion.div>
                <motion.div
                  variants={item}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10"
                >
                  {[
                    { value: 99.9, suffix: "%", decimals: 1, label: "ML Reliability" },
                    { value: 40, suffix: "%", decimals: 0, label: "RAG Speed Boost" },
                    { value: 30, suffix: "%", decimals: 0, label: "Accuracy Gain" },
                    { value: 3, suffix: "+", decimals: 0, label: "Years Experience" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="relative glass rounded-xl px-3 py-4 text-center hover:border-primary/50 transition-colors hover-lift"
                    >
                      <div className="font-display text-2xl sm:text-3xl font-semibold text-gradient-primary">
                        <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals} />
                      </div>
                      <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
                <motion.div variants={item} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center justify-center lg:justify-start">
                  <Magnetic className="w-full sm:w-auto">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                    <Button
                      onClick={() => scrollToSection('projects')}
                      className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 text-primary-foreground px-7 py-5 text-sm sm:text-base rounded-xl shadow-glow transition-all duration-300 tracking-tight font-medium"
                    >
                      Explore My Work
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }} className="inline-flex ml-2">
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </Button>
                  </motion.div>
                  </Magnetic>
                  <Magnetic className="w-full sm:w-auto">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                    <Button
                      onClick={handleDownloadResume}
                      variant="outline"
                      className="w-full sm:w-auto glass border-border text-foreground hover:bg-primary/10 hover:border-primary/40 px-7 py-5 text-sm sm:text-base rounded-xl transition-all duration-300 tracking-tight font-medium"
                    >
                      <Download className="mr-2 w-4 h-4" />
                      Download Resume
                    </Button>
                  </motion.div>
                  </Magnetic>
                </motion.div>
              </motion.div>
              <motion.div
                className="mt-8 lg:mt-0 lg:block"
                initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: -8 }}
                animate={reduce ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="relative"
                  animate={reduce ? undefined : { y: [0, -14, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.04 }}
                >
                  {/* Orbiting rings */}
                  <div className="absolute inset-0 -m-8 rounded-full border border-primary/25 animate-orbit"></div>
                  <div className="absolute inset-0 -m-12 rounded-full border border-accent/15 animate-orbit" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
                  <div className="absolute inset-0 -m-4 rounded-3xl bg-gradient-primary blur-3xl opacity-30 animate-neural-pulse"></div>
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border border-primary/30 neon-ring bg-card/40 backdrop-blur-sm mx-auto">
                    <img 
                      src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png" 
                      alt="Saran Jaya Thilak" 
                      width="320"
                      height="320"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                    {/* Scan line */}
                    <div className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent shadow-glow animate-scan"></div>
                  </div>
                  <motion.div
                    className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-glow"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
