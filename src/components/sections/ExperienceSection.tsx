import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/portfolio";
import HudFrame from "@/components/ui/hud-frame";
import SectionHeading from "@/components/ui/section-heading";

/*
 * Accessibility helpers
 */
const srOnly = "sr-only" as const;
const visuallyHidden = "absolute w-px h-px p-0 -m-px overflow-hidden clip-rect-0 border-、";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -80 : 80,
    scale: 0.95,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
    },
  },
};

const highlightVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const ExperienceSection = () => {
  const shouldReduce = useReducedMotion();
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const visibility = new Map<number, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          visibility.set(idx, entry.intersectionRatio);
        });
        let bestIdx = 0;
        let bestRatio = -1;
        visibility.forEach((ratio, idx) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = idx;
          }
        });
        if (bestRatio > 0) setActiveIndex(bestIdx);
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Experience" tag="Timeline" />
        <div ref={timelineRef} className="relative md:pl-10">
          {/* Scroll progress rail */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-3 top-0 bottom-0 hidden md:block w-[2px] rounded-full bg-white/10 overflow-hidden"
          >
            <motion.div
              style={shouldReduce ? { height: "100%" } : { height: progressHeight }}
              className="w-full bg-gradient-to-b from-cyan-400 via-indigo-400 to-fuchsia-400 shadow-[0_0_18px_rgba(34,211,238,0.7)]"
            />
          </div>
          {/* Node markers */}
          <div aria-hidden className="pointer-events-none absolute left-0 top-0 bottom-0 hidden md:block w-7">
            {experience.map((_, i) => {
              const top = experience.length > 1 ? (i / (experience.length - 1)) * 100 : 50;
              const isActive = activeIndex === i;
              return (
                <motion.div
                  key={i}
                  className={`absolute -translate-y-1/2 left-1 w-4 h-4 rounded-full border ${
                    isActive
                      ? "bg-cyan-400 border-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.9)]"
                      : "bg-black border-cyan-400/40"
                  }`}
                  style={{ top: `${top}%` }}
                  animate={{ scale: isActive ? 1.3 : 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                />
              );
            })}
          </div>
          <motion.div
            className="space-y-6 sm:space-y-8"
            variants={shouldReduce ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {experience.map((job, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={shouldReduce ? undefined : itemVariants}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              animate={
                shouldReduce
                  ? undefined
                  : {
                      scale: activeIndex === index ? 1.02 : 1,
                    }
              }
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <HudFrame scan variant={index % 2 === 0 ? "cyan" : "fuchsia"}>
                <Card
                  className={`relative backdrop-blur-xl border transition-all duration-500 group overflow-hidden ${
                    activeIndex === index
                      ? "bg-white/10 border-cyan-400/60 shadow-2xl shadow-cyan-500/40"
                      : "bg-black/30 border-cyan-400/20 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-500/30 hover:border-cyan-400/50"
                  }`}
                >
                  {/* Active glow overlay */}
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-indigo-500/5 to-fuchsia-500/10"
                    initial={false}
                    animate={{ opacity: activeIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Highlight bar on left edge */}
                  <motion.div
                    className={`absolute left-0 top-0 bottom-0 ${index % 2 === 0 ? "bg-gradient-to-b from-cyan-400 via-indigo-400 to-fuchsia-400" : "bg-gradient-to-b from-fuchsia-400 via-indigo-400 to-cyan-400"}`}
                    variants={shouldReduce ? undefined : highlightVariants}
                    animate={{
                      width: activeIndex === index ? 6 : 4,
                      boxShadow:
                        activeIndex === index
                          ? "0 0 24px hsl(190 100% 60% / 0.9)"
                          : "0 0 0px hsl(190 100% 60% / 0)",
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  <CardContent className="p-6 sm:p-8 pl-8 sm:pl-10">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 flex-1">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 rounded-2xl sm:rounded-3xl flex items-center justify-center text-2xl sm:text-4xl shadow-[0_0_25px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                          {job.logo}
                        </div>
                        <div className="text-center sm:text-left">
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{job.role}</h3>
                          <p className="text-cyan-300 font-semibold text-lg sm:text-xl mb-2 sm:mb-3 tracking-wide">{job.company}</p>
                          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">{job.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-400/40 text-cyan-200 px-3 sm:px-4 py-1 sm:py-2 text-xs whitespace-nowrap mx-auto sm:mx-0 uppercase tracking-[0.2em]">
                        {job.period}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </HudFrame>
            </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
