
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Magnetic from "@/components/ui/magnetic";

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
    <section id="home" className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 40 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
        <Card className="relative bg-black/30 backdrop-blur-2xl border border-indigo-500/30 shadow-2xl shadow-indigo-500/30 overflow-hidden scanline">
          {/* Corner brackets */}
          <div className="pointer-events-none absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-400/70"></div>
          <div className="pointer-events-none absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-fuchsia-400/70"></div>
          <div className="pointer-events-none absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-fuchsia-400/70"></div>
          <div className="pointer-events-none absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-400/70"></div>
          <CardContent className="relative p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <motion.div
                className="flex-1 lg:pr-8 text-center lg:text-left"
                variants={container}
                initial={reduce ? undefined : "hidden"}
                animate={reduce ? undefined : "show"}
              >
                <motion.div variants={item} className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 px-4 sm:px-6 py-2 rounded-full border border-cyan-400/40 mb-6 sm:mb-8 backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                  </span>
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span className="text-cyan-200 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">// Online — Available for new opportunities</span>
                </motion.div>
                
                <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-cyan-200 via-white to-fuchsia-300 bg-clip-text text-transparent neon-text bg-[length:200%_auto] animate-gradient-pan">
                  Saran Jaya Thilak
                </motion.h1>
                <motion.p variants={item} className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-cyan-200/90 font-light tracking-[0.15em]">
                  Generative AI | RAG Architectures | LLM Orchestration | Python Expertise
                </motion.p>
                <motion.p variants={item} className="text-base sm:text-lg mb-8 sm:mb-10 text-white/80 max-w-3xl leading-relaxed mx-auto lg:mx-0">
                  Data Engineering and Generative AI professional with 3 years of experience designing and deploying scalable data pipelines and LLM-powered systems. Strong expertise in Python, distributed data processing, and Retrieval-Augmented Generation (RAG) architectures — including vector databases, embedding pipelines, and model evaluation frameworks. Proven track record of 99.9% reliability in ML model deployment and a 30% boost in LLM classification accuracy through prompt engineering and retrieval tuning.
                </motion.p>
                <motion.div variants={item} className="flex items-center justify-center lg:justify-start space-x-3 mb-8 sm:mb-10">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-white/80 text-base sm:text-lg">Berlin, Germany</span>
                </motion.div>
                <motion.div variants={item} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center justify-center lg:justify-start">
                  <Magnetic className="w-full sm:w-auto">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                    <Button
                      onClick={() => scrollToSection('projects')}
                      className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 hover:from-cyan-400 hover:via-indigo-400 hover:to-fuchsia-400 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg shadow-cyan-500/40 hover:shadow-fuchsia-500/50 transition-all duration-300 uppercase tracking-wider bg-[length:200%_auto] animate-gradient-pan"
                    >
                      Explore My Work
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }} className="inline-flex ml-2">
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    </Button>
                  </motion.div>
                  </Magnetic>
                  <Magnetic className="w-full sm:w-auto">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                    <Button
                      onClick={handleDownloadResume}
                      variant="outline"
                      className="w-full sm:w-auto bg-white/5 border-cyan-400/40 text-cyan-100 hover:bg-cyan-500/10 hover:border-cyan-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl backdrop-blur-sm transition-all duration-300 uppercase tracking-wider"
                    >
                      <Download className="mr-2 w-5 h-5" />
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
                  <div className="absolute inset-0 -m-8 rounded-full border border-cyan-400/30 animate-orbit"></div>
                  <div className="absolute inset-0 -m-12 rounded-full border border-fuchsia-400/20 animate-orbit" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
                  <div className="absolute inset-0 -m-4 rounded-3xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 blur-2xl opacity-40 animate-neural-pulse"></div>
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border border-cyan-400/40 neon-ring bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 backdrop-blur-sm mx-auto">
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
                    <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-scan"></div>
                  </div>
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full border-4 border-black/40 shadow-[0_0_20px_rgba(34,211,238,0.9)]"
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
