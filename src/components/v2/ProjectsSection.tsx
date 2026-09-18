"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectLinks from "./LiveProjectButton";
import BlueprintSectionHeader from "./BlueprintSectionHeader";

const FEATURED = projects.filter((p) => p.featured);
const EASE = [0.16, 1, 0.3, 1] as const;

// ── Bento Box Component ───────────────────────────────────────────────────────
const ProjectBento = ({ project, index }: { project: (typeof FEATURED)[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: EASE } 
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-24 md:mb-40 last:mb-0"
    >
      {/* ── IMAGE TILE (Main visual) ── */}
      <motion.div
        variants={itemVariants}
        className={`relative overflow-hidden rounded-[32px] border border-white/10 hover:border-white/20 bg-[#0a0a0a] backdrop-blur-sm ${
          isEven ? "md:col-span-2 md:row-span-2" : "md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-1"
        } min-h-[350px] md:min-h-0 h-full group transition-colors duration-500 shadow-xl`}
        style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00df8f]/10 to-transparent mix-blend-overlay z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a]/90 via-[#070b0a]/20 to-transparent opacity-80 z-10" />
        
        {/* Floating index in the corner */}
        <div className="absolute bottom-6 right-8 z-20 overflow-hidden">
          <motion.span 
            className="font-kanit font-black text-[120px] leading-none text-white/5 select-none translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out block"
          >
            0{index + 1}
          </motion.span>
        </div>
      </motion.div>

      {/* ── INFO TILE (Title, Desc, Links) ── */}
      <motion.div
        variants={itemVariants}
        className={`flex flex-col justify-between p-8 md:p-10 rounded-[32px] border border-white/10 hover:border-white/20 bg-gradient-to-b from-white/[0.05] to-white/[0.01] hover:from-white/[0.08] hover:to-white/[0.02] backdrop-blur-xl shadow-2xl transition-all duration-500 relative overflow-hidden ${
          isEven ? "md:col-span-2 md:row-span-1" : "md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-1"
        }`}
      >
        {/* Subtle glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00df8f]/20 blur-[60px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <span className="font-mono text-sm text-[#00df8f] bg-[#00df8f]/10 px-3 py-1 rounded-full border border-[#00df8f]/20">
              Featured
            </span>
            <span className="font-kanit text-xs uppercase tracking-widest text-white/40">
              {project.source}
            </span>
          </div>
          <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-wide text-white mb-4 leading-tight">
            {project.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">
            {project.description}
          </p>
        </div>
        
        <div className="mt-10 relative z-10">
          <ProjectLinks githubUrl={project.url} liveUrl={project.liveUrl} />
        </div>
      </motion.div>

      {/* ── CASE STUDY TILE ── */}
      <motion.div
        variants={itemVariants}
        className={`p-8 md:p-10 rounded-[32px] border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-lg shadow-lg transition-all duration-500 flex flex-col justify-center ${
          isEven ? "md:col-span-1 md:row-span-1" : "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-2"
        }`}
      >
        <div className="flex flex-col gap-5">
          {project.problem && (
            <div className="flex flex-col gap-1.5">
              <span className="font-kanit text-[10px] uppercase tracking-widest text-[#ff4f4f] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff4f4f]" /> Problem
              </span>
              <span className="text-sm text-white/70 leading-relaxed">{project.problem}</span>
            </div>
          )}
          {project.approach && (
            <div className="flex flex-col gap-1.5">
              <span className="font-kanit text-[10px] uppercase tracking-widest text-[#38bdf8] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> Approach
              </span>
              <span className="text-sm text-white/70 leading-relaxed">{project.approach}</span>
            </div>
          )}
          {project.result && (
            <div className="flex flex-col gap-1.5">
              <span className="font-kanit text-[10px] uppercase tracking-widest text-[#f59e0b] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" /> Result
              </span>
              <span className="text-sm text-white/70 leading-relaxed">{project.result}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── SKILLS TILE ── */}
      <motion.div
        variants={itemVariants}
        className={`p-8 md:p-10 rounded-[32px] border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-lg shadow-lg transition-all duration-500 ${
          isEven ? "md:col-span-1 md:row-span-1" : "md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-2"
        }`}
      >
        <h4 className="font-kanit text-xs uppercase tracking-widest text-white/30 mb-6 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white/20" /> Tech Stack
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.skills?.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full border border-white/10 text-white/70 text-xs font-mono bg-white/[0.02] backdrop-blur-md hover:border-[#00df8f]/50 hover:text-[#00df8f] transition-all duration-300 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Section Component ────────────────────────────────────────────────────────
export default function ProjectsSection() {
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
      className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30 overflow-hidden border-t border-white/10 bg-[#070b0a]"
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
          className="w-full h-full object-cover pointer-events-none opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[#070b0a]/80" />
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="relative z-10 pt-24 md:pt-32 pb-24 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <BlueprintSectionHeader align="left">
            <div className="mb-20 md:mb-32">
              <motion.h2
                className="font-black leading-[0.92] tracking-tighter text-white"
                style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                Featured <br className="hidden md:block" />
                <span className="accent-serif italic font-light text-white/80">Dashboard</span>
                <span className="text-[#00df8f]">.</span>
              </motion.h2>
              <motion.p 
                className="mt-6 text-white/50 max-w-xl font-kanit font-light text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                A curated selection of my most significant technical achievements, 
                architected for performance and scale.
              </motion.p>
            </div>
          </BlueprintSectionHeader>

          {/* Bento Boxes */}
          <div className="flex flex-col">
            {FEATURED.map((project, index) => (
              <ProjectBento key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
