import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { publications } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";

/* ── Framer Motion variants ── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.94,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 18,
      mass: 1.2,
    },
  },
};

const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
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

/* ── Floating Research Particles ── */
const ResearchParticles = () => {
  const particles = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${4 + Math.random() * 4}s`,
      type: Math.random() > 0.6 ? "diamond" : "dot",
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
          {p.type === "diamond" ? (
            <div className="w-2 h-2 rotate-45 border border-indigo-400/30 bg-indigo-400/10" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/30" />
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Holographic Document Icon ── */
const HoloDocIcon = ({ isHovered, index }: { isHovered: boolean; index: number }) => {
  const color = index % 2 === 0 ? "cyan" : "fuchsia";
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0">
      {/* Outer rotating ring */}
      <div
        className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 ${
          isHovered
            ? `border-${color}-400/50 animate-projector-ring`
            : `border-${color}-400/15`
        }`}
      />
      {/* Inner ring */}
      <div
        className={`absolute inset-2 rounded-full border transition-all duration-700 ${
          isHovered
            ? `border-${color === "cyan" ? "fuchsia" : "cyan"}-400/40 animate-projector-ring-reverse`
            : `border-${color === "cyan" ? "fuchsia" : "cyan"}-400/10`
        }`}
        style={{ borderStyle: "dotted" }}
      />
      {/* Glow core */}
      <div
        className={`absolute inset-3 rounded-full transition-all duration-700 ${
          isHovered
            ? "bg-gradient-to-br from-cyan-500/20 via-indigo-500/15 to-fuchsia-500/20 shadow-[0_0_25px_rgba(99,102,241,0.3)]"
            : "bg-white/5"
        }`}
      />
      {/* IEEE icon */}
      <motion.div
        className="relative z-10 font-mono font-bold text-sm sm:text-base"
        animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className={`${isHovered ? "text-cyan-300" : "text-white/40"} transition-colors duration-500`}>
          IEEE
        </span>
      </motion.div>
    </div>
  );
};

/* ── Reticle Corners for Publication Cards ── */
const PubReticleCorners = ({ isHovered, index }: { isHovered: boolean; index: number }) => {
  const cyanOpacity = isHovered ? "border-cyan-400/70" : "border-cyan-400/15";
  const fuchsiaOpacity = isHovered ? "border-fuchsia-400/70" : "border-fuchsia-400/15";
  const labelId = `pub-${index}`;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-xl" aria-hidden>
      {/* Corners */}
      <div className={`absolute top-2 left-2 border-t-2 border-l-2 transition-all duration-700 ${isHovered ? "w-5 h-5" : "w-3 h-3"} ${cyanOpacity}`} />
      <div className={`absolute top-2 right-2 border-t-2 border-r-2 transition-all duration-700 ${isHovered ? "w-5 h-5" : "w-3 h-3"} ${fuchsiaOpacity}`} />
      <div className={`absolute bottom-2 left-2 border-b-2 border-l-2 transition-all duration-700 ${isHovered ? "w-5 h-5" : "w-3 h-3"} ${fuchsiaOpacity}`} />
      <div className={`absolute bottom-2 right-2 border-b-2 border-r-2 transition-all duration-700 ${isHovered ? "w-5 h-5" : "w-3 h-3"} ${cyanOpacity}`} />
      {/* HUD readouts */}
      <div className={`absolute top-2.5 left-9 font-mono text-[8px] tracking-[0.25em] uppercase transition-opacity duration-500 text-cyan-400/50 ${isHovered ? "opacity-100" : "opacity-0"}`}>
        RESEARCH·{labelId.toUpperCase()}
      </div>
      <div className={`absolute top-2.5 right-9 font-mono text-[8px] tracking-[0.25em] uppercase transition-opacity duration-500 text-cyan-400/50 ${isHovered ? "opacity-100" : "opacity-0"}`}>
        PEER REVIEWED
      </div>
      <div className={`absolute bottom-2.5 left-9 font-mono text-[8px] tracking-[0.25em] uppercase transition-opacity duration-500 text-fuchsia-400/40 ${isHovered ? "opacity-100" : "opacity-0"}`}>
        PUBLISHED
      </div>
      <div className={`absolute bottom-2.5 right-9 font-mono text-[8px] tracking-[0.25em] uppercase transition-opacity duration-500 text-fuchsia-400/40 ${isHovered ? "opacity-100" : "opacity-0"}`}>
        DOI VERIFIED
      </div>
    </div>
  );
};

/* ── Main PublicationsSection ── */
const PublicationsSection = () => {
  const shouldReduce = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="publications"
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Ambient data-grid background */}
      <div className="absolute inset-0 exp-data-grid animate-data-stream opacity-30 pointer-events-none" aria-hidden />

      {/* Floating particles */}
      {!shouldReduce && <ResearchParticles />}

      <div className="relative max-w-7xl mx-auto">
        <SectionHeading title="Publications" tag="Research Archive" index="06" />

        <motion.div
          className="space-y-8 sm:space-y-10"
          variants={shouldReduce ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {publications.map((pub, index) => {
            const isHovered = hoveredIndex === index;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                variants={shouldReduce ? undefined : cardVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group"
              >
                {/* Card container with animated gradient border */}
                <div className="relative rounded-xl overflow-hidden">
                  {/* Animated gradient border */}
                  <div
                    className={`absolute inset-0 rounded-xl transition-opacity duration-700 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute inset-0 rounded-xl exp-gradient-border animate-border-orbit" />
                  </div>

                  {/* Card inner */}
                  <div
                    className={`relative m-[1px] rounded-xl backdrop-blur-xl transition-all duration-500 overflow-hidden ${
                      isHovered
                        ? "bg-[#0a0e14]/90"
                        : "bg-[#0a0a0b]/80"
                    }`}
                  >
                    {/* Holographic scanline overlay */}
                    <div className="absolute inset-0 exp-holo-overlay animate-hologram-flicker pointer-events-none" aria-hidden />

                    {/* Scanline sweep on hover */}
                    {isHovered && !shouldReduce && (
                      <div
                        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent animate-scanline-sweep pointer-events-none"
                        aria-hidden
                      />
                    )}

                    {/* Hover glow overlay */}
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/6 via-indigo-500/4 to-fuchsia-500/6"
                      initial={false}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Left accent bar */}
                    <motion.div
                      className={`absolute left-0 top-0 bottom-0 ${
                        isEven
                          ? "bg-gradient-to-b from-cyan-400 via-indigo-400 to-fuchsia-400"
                          : "bg-gradient-to-b from-fuchsia-400 via-indigo-400 to-cyan-400"
                      }`}
                      animate={{
                        width: isHovered ? 4 : 2,
                        boxShadow: isHovered
                          ? `0 0 20px ${isEven ? "rgba(34,211,238,0.7)" : "rgba(217,70,239,0.7)"}`
                          : "0 0 0px rgba(0,0,0,0)",
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />

                    {/* Targeting reticle corners */}
                    <PubReticleCorners isHovered={isHovered} index={index} />

                    {/* Card content */}
                    <div className="relative z-10 p-6 sm:p-8 pl-8 sm:pl-10">
                      <div className="flex flex-col sm:flex-row items-start gap-6">
                        {/* Holographic Document Icon */}
                        <HoloDocIcon isHovered={isHovered} index={index} />

                        {/* Text content */}
                        <div className="flex-1 min-w-0">
                          <motion.h3
                            className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 font-display tracking-tight leading-snug group-hover:text-cyan-100 transition-colors duration-500"
                            variants={shouldReduce ? undefined : textRevealVariants}
                            custom={0.1}
                          >
                            {pub.title}
                          </motion.h3>

                          <motion.p
                            className="text-white/55 text-sm sm:text-base md:text-lg leading-relaxed mb-5 max-w-3xl"
                            variants={shouldReduce ? undefined : textRevealVariants}
                            custom={0.2}
                          >
                            {pub.description}
                          </motion.p>

                          {/* Metadata row */}
                          <motion.div
                            className="flex flex-wrap items-center gap-3 sm:gap-5"
                            variants={shouldReduce ? undefined : textRevealVariants}
                            custom={0.3}
                          >
                            {/* Journal badge */}
                            <div
                              className={`relative overflow-hidden rounded-md font-mono text-xs px-3 py-1.5 tracking-[0.2em] uppercase transition-all duration-500 ${
                                isHovered
                                  ? "border border-cyan-400/50 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.2)] bg-cyan-500/10"
                                  : "border border-white/10 text-white/40 bg-white/5"
                              }`}
                            >
                              <span className="relative z-10">{pub.journal}</span>
                            </div>

                            {/* Date */}
                            <span
                              className={`font-mono text-xs sm:text-sm tracking-[0.2em] uppercase transition-colors duration-500 ${
                                isHovered ? "text-fuchsia-300/70" : "text-white/30"
                              }`}
                            >
                              {pub.date}
                            </span>

                            {/* Separator dot */}
                            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/20" />

                            {/* Status indicator */}
                            <span
                              className={`flex items-center gap-1.5 font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
                                isHovered ? "text-emerald-400/80" : "text-white/20"
                              }`}
                            >
                              <span className="relative flex h-1.5 w-1.5">
                                <span className={`absolute inline-flex h-full w-full rounded-full ${isHovered ? "bg-emerald-400 animate-ping" : "bg-white/30"} opacity-75`} />
                                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isHovered ? "bg-emerald-400" : "bg-white/30"}`} />
                              </span>
                              Published
                            </span>
                          </motion.div>
                        </div>

                        {/* External link button */}
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 mx-auto sm:mx-0"
                          aria-label={`Read ${pub.title} on ${pub.journal}`}
                        >
                          <motion.div
                            className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-500 border ${
                              isHovered
                                ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                : "border-white/10 bg-white/5 text-white/30"
                            }`}
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />

                            {/* Corner accents on hover */}
                            {isHovered && (
                              <>
                                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-cyan-400/60" />
                                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-cyan-400/60" />
                              </>
                            )}
                          </motion.div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Section footer data readout */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex items-center gap-4 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/20">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-cyan-400/30" />
            <span>{publications.length} Publications Indexed</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-40" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400/60" />
            </span>
            <span>IEEE Database</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-fuchsia-400/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PublicationsSection;
