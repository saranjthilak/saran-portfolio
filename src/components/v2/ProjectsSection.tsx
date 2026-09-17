"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectLinks from "./LiveProjectButton";
import BlueprintSectionHeader from "./BlueprintSectionHeader";

const FEATURED = projects.filter((p) => p.featured);
const EASE = [0.16, 1, 0.3, 1] as const;

// ── Magnetic Wrapper ─────────────────────────────────────────────────────────
const MagneticWrapper = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 150, mass: 0.1 });
  const springY = useSpring(y, { damping: 15, stiffness: 150, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.45);
    y.set((e.clientY - centerY) * 0.45);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

export default function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Mouse position for the floating image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring for floating image
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.1 });

  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the section
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Video Background Logic
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl =
      "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";
    let hlsInstance: any = null;

    import("hls.js")
      .then(({ default: Hls }) => {
        if (Hls && Hls.isSupported()) {
          hlsInstance = new Hls({ enableWorker: false });
          hlsInstance.loadSource(streamUrl);
          hlsInstance.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = streamUrl;
        }
      })
      .catch(() => {
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = streamUrl;
        }
      });

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30 overflow-hidden border-t border-white/10 bg-[#070b0a] min-h-screen cursor-default"
      style={{ boxShadow: "0 -10px 40px rgba(0,0,0,0.5)" }}
    >
      {/* ── Background Video & Overlays ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] via-[#070b0a]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-[#070b0a]/50 to-transparent" />
      </div>

      <div className="relative z-10 pt-24 md:pt-32 pb-24 md:pb-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <BlueprintSectionHeader align="left">
            <div className="mb-16 md:mb-24">
              <motion.h2
                className="font-black leading-[0.92] tracking-tighter text-white"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
                initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              >
                Selected <br className="hidden md:block" />
                <span className="accent-serif italic font-light text-white/80">Work</span><span className="text-[#00df8f]">.</span>
              </motion.h2>
            </div>
          </BlueprintSectionHeader>

          {/* Roster List */}
          <div className="flex flex-col border-t border-white/10 relative">
            {FEATURED.map((project, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <div
                  key={project.title}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 py-8 md:py-12 px-2 transition-colors duration-500 hover:bg-white/[0.02]"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center gap-6 md:gap-12 z-20 pointer-events-none md:pointer-events-auto">
                    <span className="font-mono text-sm text-white/30 group-hover:text-[#00df8f] transition-colors duration-300">
                      0{index + 1}
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wide text-white/70 group-hover:text-white transition-all duration-500 md:group-hover:translate-x-6 transform-gpu ease-out">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 mt-6 md:mt-0 z-20 md:ml-auto">
                    <div className="hidden lg:flex gap-2">
                      {project.skills?.slice(0, 3).map((skill) => (
                        <span key={skill} className="font-kanit text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 text-white/40 group-hover:border-[#00df8f]/30 group-hover:text-[#00df8f] transition-colors duration-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      {/* Mobile description */}
                      <p className="text-sm text-white/50 md:hidden w-2/3 leading-relaxed">
                        {project.description?.substring(0, 100)}...
                      </p>
                      <div className="ml-auto md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:-translate-x-4 md:group-hover:translate-x-0 transform-gpu ease-out">
                        <MagneticWrapper>
                          <ProjectLinks githubUrl={project.url} liveUrl={project.liveUrl} />
                        </MagneticWrapper>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Image (hidden on desktop) */}
                  <div className="block md:hidden mt-8 overflow-hidden rounded-xl border border-white/10 w-full relative aspect-[16/10]">
                     <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Image (Desktop Only) */}
      <div className="hidden md:block pointer-events-none absolute top-0 left-0 z-10 w-[500px] aspect-[16/10] overflow-visible">
        <motion.div
          className="w-full h-full absolute inset-0"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex !== null && (
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="w-full h-full absolute inset-0 rounded-2xl overflow-hidden border border-white/10"
                style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}
              >
                <img
                  src={FEATURED[hoveredIndex].image}
                  alt={FEATURED[hoveredIndex].title}
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00df8f]/10 to-transparent mix-blend-overlay" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
