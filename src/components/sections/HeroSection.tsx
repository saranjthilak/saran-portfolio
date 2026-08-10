import { ArrowRight, Download } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import CountUp from "@/components/ui/count-up";
import MagneticButton from "@/components/ui/magnetic-button";
import TextScramble from "@/components/ui/text-scramble";
import TextGenerateEffect from "@/components/ui/TextGenerateEffect";
import AnimatedGridBackground from "@/components/ui/AnimatedGridBackground";
import FloatingBadges from "@/components/ui/FloatingBadges";
import dynamic from "next/dynamic";

const SpotlightEffect = dynamic(() => import("@/components/ui/SpotlightEffect"), { ssr: false });

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

const scramblePhrases = [
  "RAG pipelines",
  "vector databases",
  "LLM systems",
  "data platforms",
  "ML deployments",
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const HeroSection = ({ scrollToSection, handleDownloadResume }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [nameComplete, setNameComplete] = useState(false);

  // Scroll-driven parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // Mouse-follow parallax on hero text
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const textX = useTransform(smoothMouseX, [-1, 1], [-12, 12]);
  const textY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(cx);
      mouseY.set(cy);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Choreographed entrance
  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: 30, filter: "blur(10px)" } as const,
    animate: isMounted ? ({ opacity: 1, y: 0, filter: "blur(0px)" } as const) : ({} as const),
    transition: {
      duration: 0.8,
      delay,
      ease,
    },
  });

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-transparent pt-20 pb-16"
    >
      {/* ─── Layer 1: Spotlight cursor follower ─── */}
      <SpotlightEffect />

      {/* ─── Layer 2: Animated grid background ─── */}
      <AnimatedGridBackground />

      {/* ─── Layer 3: Animated blobs ─── */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-accent/20 blur-[120px] rounded-full mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-success/10 blur-[120px] rounded-full mix-blend-screen animate-blob animation-delay-4000" />
      </div>

      {/* ─── Layer 4: Cinematic beam sweep lines ─── */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
          <div
            className="absolute top-0 left-0 w-[200%] h-px animate-beam-sweep opacity-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsla(217, 91%, 60%, 0.4), hsla(258, 90%, 66%, 0.2), transparent)",
            }}
          />
          <div
            className="absolute top-[30%] left-0 w-[200%] h-px animate-beam-sweep-2 opacity-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsla(258, 90%, 66%, 0.3), hsla(217, 91%, 60%, 0.15), transparent)",
            }}
          />
        </div>
      )}

      {/* ─── Layer 5: Floating role badges ─── */}
      <FloatingBadges />

      {/* ─── Main content ─── */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col items-center justify-center text-center mt-12"
      >
        {/* Small status line */}
        <motion.div
          {...entrance(0.2)}
          className="flex items-center gap-2 mb-10"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/40" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground/70">
            AI · Data · Engineering
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary/40" />
        </motion.div>

        {/* Name — TextGenerateEffect with mouse parallax */}
        <motion.div style={{ x: textX, y: textY }}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-primary/60 mb-6 drop-shadow-sm animate-gradient-text"
              style={{ backgroundSize: "200% 200%" }}
          >
            <TextGenerateEffect
              text="Saran Jaya Thilak"
              charDelay={0.045}
              startDelay={0.5}
              onComplete={() => setNameComplete(true)}
            />
          </h1>
        </motion.div>

        {/* Subtitle — appears after name generates */}
        <motion.div style={{ y: y2 }}>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={
              nameComplete
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : {}
            }
            transition={{ duration: 0.8, ease }}
            className="max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed font-light"
          >
            Architecting resilient data infrastructure and{" "}
            <span className="text-foreground font-medium">LLM-powered systems</span>.{" "}
            Specializing in{" "}
            <span className="text-primary font-medium font-mono">
              <TextScramble phrases={scramblePhrases} interval={2500} speed={35} />
            </span>{" "}
            and production-scale AI.
          </motion.p>
        </motion.div>

        {/* CTA Buttons — appear after subtitle */}
        <motion.div style={{ y: y3 }}>
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={
              nameComplete
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : {}
            }
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <MagneticButton
              strength={12}
              onClick={() => scrollToSection("projects")}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] active:scale-95"
            >
              Explore Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              strength={8}
              onClick={handleDownloadResume}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 glass rounded-full font-medium text-foreground hover:bg-white/5 transition-colors hover:border-white/20 active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download CV
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ─── Portrait + Stats ─── */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease }}
        className="mt-20 sm:mt-32 w-full max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center gap-8"
      >
        {/* Portrait Photo Card */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden group">
          {/* Animated gradient border */}
          <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-spin-slow" style={{ animationDuration: '8s' }} />
          <div className="absolute inset-[3px] rounded-full overflow-hidden bg-transparent z-[1]">
            <img
              src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png"
              alt="Saran Jaya Thilak"
              className="w-full h-full object-cover object-[center_20%] transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-[40px] opacity-0 group-hover:opacity-60 transition-opacity duration-700 -z-10" />
        </div>

        {/* Stats Row */}
        <div className="w-full max-w-4xl glass-panel rounded-2xl border border-white/10 p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.12), duration: 0.8, ease }}
                className="flex flex-col items-center gap-1.5 text-center"
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
      </motion.div>
    </section>
  );
};

export default HeroSection;
