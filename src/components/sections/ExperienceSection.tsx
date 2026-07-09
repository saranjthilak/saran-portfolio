import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { experience } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";

/* ── Framer Motion variants ── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -100 : 100,
    scale: 0.92,
    filter: "blur(8px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 20,
      mass: 1.2,
    },
  },
};

const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ── Floating Particles ── */
const FloatingParticles = () => {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
      size: Math.random() > 0.7 ? 3 : 2,
      isCross: Math.random() > 0.8,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-particle-drift"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          {p.isCross ? (
            <svg width="8" height="8" viewBox="0 0 8 8" className="text-cyan-400/30">
              <line x1="0" y1="4" x2="8" y2="4" stroke="currentColor" strokeWidth="0.5" />
              <line x1="4" y1="0" x2="4" y2="8" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          ) : (
            <div
              className="rounded-full bg-cyan-400/40"
              style={{ width: p.size, height: p.size }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Hexagonal Waypoint Node ── */
const HexNode = ({ isActive, index }: { isActive: boolean; index: number }) => {
  const colors = index % 2 === 0
    ? { main: "cyan", glow: "rgba(34, 211, 238, 0.9)", ring: "rgba(34, 211, 238, 0.4)" }
    : { main: "fuchsia", glow: "rgba(217, 70, 239, 0.9)", ring: "rgba(217, 70, 239, 0.4)" };

  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      {/* Pulse ring - only on active */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-full animate-hex-pulse"
          style={{
            border: `2px solid ${colors.ring}`,
          }}
        />
      )}
      {/* Second pulse ring with delay */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-full animate-hex-pulse"
          style={{
            border: `2px solid ${colors.ring}`,
            animationDelay: "0.8s",
          }}
        />
      )}
      {/* Core hexagon (approximated as rotated square with rounded corners) */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: isActive ? 1.15 : 0.85,
          rotate: isActive ? 45 : 45,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div
          className="w-4 h-4 rounded-[3px] transition-all duration-500"
          style={{
            background: isActive
              ? `linear-gradient(135deg, ${colors.glow}, ${colors.ring})`
              : "rgba(10, 10, 11, 0.9)",
            border: `1.5px solid ${isActive ? colors.glow : colors.ring}`,
            boxShadow: isActive ? `0 0 20px ${colors.glow}, 0 0 40px ${colors.ring}` : "none",
          }}
        />
      </motion.div>
    </div>
  );
};

/* ── Holographic Projector Ring ── */
const ProjectorRing = ({ emoji, isActive }: { emoji: string; isActive: boolean }) => (
  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto sm:mx-0 flex-shrink-0">
    {/* Outer rotating ring */}
    <div
      className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 ${
        isActive
          ? "border-cyan-400/50 animate-projector-ring"
          : "border-cyan-400/15"
      }`}
    />
    {/* Middle counter-rotating ring */}
    <div
      className={`absolute inset-1.5 rounded-full border transition-all duration-700 ${
        isActive
          ? "border-fuchsia-400/40 animate-projector-ring-reverse"
          : "border-fuchsia-400/10"
      }`}
      style={{ borderStyle: "dotted" }}
    />
    {/* Inner glow ring */}
    <div
      className={`absolute inset-3 rounded-full transition-all duration-700 ${
        isActive
          ? "bg-gradient-to-br from-cyan-500/20 via-indigo-500/15 to-fuchsia-500/20 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          : "bg-white/5"
      }`}
    />
    {/* Emoji */}
    <motion.span
      className="relative z-10 text-3xl sm:text-4xl"
      animate={isActive ? {
        y: [0, -4, 0],
        scale: [1, 1.08, 1],
      } : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.span>
  </div>
);

/* ── Energy Conduit Timeline ── */
const EnergyConduit = ({ progressHeight, shouldReduce }: { progressHeight: any; shouldReduce: boolean | null }) => (
  <div className="pointer-events-none absolute left-3.5 top-0 bottom-0 hidden md:block">
    {/* Background rail */}
    <div className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-cyan-400/10" />

    {/* Progress fill */}
    <motion.div
      className="absolute left-0 top-0 w-[2px] rounded-full exp-conduit"
      style={shouldReduce ? { height: "100%" } : { height: progressHeight }}
    />

    {/* Flowing particles */}
    {!shouldReduce && Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="absolute left-[-1px] w-[4px] h-[12px] rounded-full bg-cyan-400/80 animate-conduit-flow blur-[1px]"
        style={{
          animationDelay: `${i * 0.6}s`,
          boxShadow: "0 0 8px rgba(34, 211, 238, 0.8)",
        }}
      />
    ))}
  </div>
);

/* ── Targeting Reticle Corners ── */
const ReticleCorners = ({ isActive }: { isActive: boolean }) => (
  <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-xl" aria-hidden>
    {/* Top-left */}
    <div className={`absolute top-2 left-2 border-t-2 border-l-2 transition-all duration-700 ${
      isActive ? "w-5 h-5 border-cyan-400/80" : "w-3 h-3 border-cyan-400/20"
    }`} />
    {/* Top-right */}
    <div className={`absolute top-2 right-2 border-t-2 border-r-2 transition-all duration-700 ${
      isActive ? "w-5 h-5 border-fuchsia-400/80" : "w-3 h-3 border-fuchsia-400/20"
    }`} />
    {/* Bottom-left */}
    <div className={`absolute bottom-2 left-2 border-b-2 border-l-2 transition-all duration-700 ${
      isActive ? "w-5 h-5 border-fuchsia-400/80" : "w-3 h-3 border-fuchsia-400/20"
    }`} />
    {/* Bottom-right */}
    <div className={`absolute bottom-2 right-2 border-b-2 border-r-2 transition-all duration-700 ${
      isActive ? "w-5 h-5 border-cyan-400/80" : "w-3 h-3 border-cyan-400/20"
    }`} />
    {/* HUD readouts */}
    <div className={`absolute top-2.5 left-9 font-mono text-[8px] tracking-[0.25em] uppercase transition-opacity duration-500 ${
      isActive ? "text-cyan-400/60 opacity-100" : "opacity-0"
    }`}>
      MISSION LOG
    </div>
    <div className={`absolute top-2.5 right-9 font-mono text-[8px] tracking-[0.25em] uppercase transition-opacity duration-500 ${
      isActive ? "text-cyan-400/60 opacity-100" : "opacity-0"
    }`}>
      REC●
    </div>
    <div className={`absolute bottom-2.5 left-9 font-mono text-[8px] tracking-[0.25em] uppercase transition-opacity duration-500 ${
      isActive ? "text-fuchsia-400/50 opacity-100" : "opacity-0"
    }`}>
      VERIFIED
    </div>
    <div className={`absolute bottom-2.5 right-9 font-mono text-[8px] tracking-[0.25em] uppercase transition-opacity duration-500 ${
      isActive ? "text-fuchsia-400/50 opacity-100" : "opacity-0"
    }`}>
      SIG 100%
    </div>
  </div>
);

/* ── Main ExperienceSection ── */
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
    <section
      ref={sectionRef}
      id="experience"
      role="region"
      aria-label="Work experience timeline"
      aria-roledescription="timeline"
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Ambient data-grid background */}
      <div className="absolute inset-0 exp-data-grid animate-data-stream opacity-40 pointer-events-none" aria-hidden />

      {/* Floating particles */}
      {!shouldReduce && <FloatingParticles />}

      <div className="relative max-w-7xl mx-auto">
        <SectionHeading title="Experience" tag="Mission Log" />

        <div ref={timelineRef} className="relative md:pl-14">
          {/* Live region for screen readers */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {`Now viewing item ${activeIndex + 1} of ${experience.length}: ${experience[activeIndex]?.role} at ${experience[activeIndex]?.company}`}
          </div>

          {/* Energy Conduit Timeline */}
          <EnergyConduit progressHeight={progressHeight} shouldReduce={shouldReduce} />

          {/* Hexagonal Node Markers */}
          <div aria-hidden className="pointer-events-none absolute left-0 top-0 bottom-0 hidden md:block w-8">
            {experience.map((_, i) => {
              const top = experience.length > 1 ? (i / (experience.length - 1)) * 100 : 50;
              return (
                <div
                  key={i}
                  className="absolute -translate-y-1/2"
                  style={{ top: `${top}%`, left: "0px" }}
                >
                  <HexNode isActive={activeIndex === i} index={i} />
                </div>
              );
            })}
          </div>

          {/* Experience Cards */}
          <motion.div
            role="list"
            aria-label="Experience entries"
            className="space-y-8 sm:space-y-10"
            variants={shouldReduce ? undefined : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {experience.map((job, index) => {
              const isActive = activeIndex === index;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  role="listitem"
                  aria-label={`${job.role} at ${job.company}, ${job.period}`}
                  aria-current={isActive ? "step" : undefined}
                  custom={index}
                  variants={shouldReduce ? undefined : cardVariants}
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-index={index}
                  animate={
                    shouldReduce
                      ? undefined
                      : {
                          scale: isActive ? 1.01 : 1,
                        }
                  }
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="group"
                >
                  {/* Card container */}
                  <div className="relative rounded-xl overflow-hidden">
                    {/* Animated gradient border */}
                    <div
                      className={`absolute inset-0 rounded-xl transition-opacity duration-700 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                    >
                      <div className="absolute inset-0 rounded-xl exp-gradient-border animate-border-orbit" />
                    </div>

                    {/* Card inner */}
                    <div
                      className={`relative m-[1px] rounded-xl backdrop-blur-xl transition-all duration-500 overflow-hidden ${
                        isActive
                          ? "bg-[#0a0e14]/90"
                          : "bg-[#0a0a0b]/80 group-hover:bg-[#0a0e14]/70"
                      }`}
                    >
                      {/* Holographic scanline overlay */}
                      <div className="absolute inset-0 exp-holo-overlay animate-hologram-flicker pointer-events-none" aria-hidden />

                      {/* Scanline sweep on active */}
                      {isActive && !shouldReduce && (
                        <div
                          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-scanline-sweep pointer-events-none"
                          aria-hidden
                        />
                      )}

                      {/* Active glow overlay */}
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-transparent to-fuchsia-500/8"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.6 }}
                      />

                      {/* Left accent bar */}
                      <motion.div
                        className={`absolute left-0 top-0 bottom-0 ${
                          isEven
                            ? "bg-gradient-to-b from-cyan-400 via-indigo-400 to-fuchsia-400"
                            : "bg-gradient-to-b from-fuchsia-400 via-indigo-400 to-cyan-400"
                        }`}
                        animate={{
                          width: isActive ? 4 : 2,
                          boxShadow: isActive
                            ? `0 0 20px ${isEven ? "rgba(34,211,238,0.8)" : "rgba(217,70,239,0.8)"}`
                            : "0 0 0px rgba(0,0,0,0)",
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />

                      {/* Targeting reticle corners */}
                      <ReticleCorners isActive={isActive} />

                      {/* Card content */}
                      <div className="relative z-10 p-6 sm:p-8 pl-8 sm:pl-10">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 flex-1">
                            {/* Holographic Projector Ring */}
                            <ProjectorRing emoji={job.logo} isActive={isActive} />

                            {/* Text content with decode animation */}
                            <div className="text-center sm:text-left flex-1">
                              <motion.h3
                                className="text-xl sm:text-2xl font-bold text-white mb-1.5 font-display tracking-tight"
                                variants={shouldReduce ? undefined : textRevealVariants}
                                custom={0.1}
                              >
                                {job.role}
                              </motion.h3>
                              <motion.p
                                className={`font-semibold text-lg sm:text-xl mb-3 tracking-wide font-mono ${
                                  isEven ? "text-cyan-300" : "text-fuchsia-300"
                                }`}
                                variants={shouldReduce ? undefined : textRevealVariants}
                                custom={0.2}
                              >
                                {`> ${job.company}`}
                              </motion.p>
                              <motion.p
                                className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl"
                                variants={shouldReduce ? undefined : textRevealVariants}
                                custom={0.3}
                              >
                                {job.description}
                              </motion.p>
                            </div>
                          </div>

                          {/* Period badge with glitch effect on hover */}
                          <div className="relative mx-auto sm:mx-0 flex-shrink-0">
                            <div
                              className={`relative overflow-hidden rounded-md font-mono text-xs sm:text-sm px-4 py-2 tracking-[0.2em] uppercase transition-all duration-500 ${
                                isActive
                                  ? `border ${isEven ? "border-cyan-400/60 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.3)]" : "border-fuchsia-400/60 text-fuchsia-200 shadow-[0_0_15px_rgba(217,70,239,0.3)]"} bg-white/5`
                                  : "border border-white/10 text-white/50 bg-white/5"
                              } group-hover:animate-em-glitch`}
                            >
                              {/* Glitch overlay */}
                              <div
                                className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                aria-hidden
                              />
                              <span className="relative z-10">{job.period}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
