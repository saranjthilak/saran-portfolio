"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectLinks from "./LiveProjectButton";
import BlueprintSectionHeader from "./BlueprintSectionHeader";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import {
  X, Maximize2, Minus, Square, ExternalLink,
  Github, Eye, Circle,
} from "lucide-react";

const FEATURED = projects.filter((p) => p.featured);
const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Live Preview Modal ──────────────────────────────────────────────────── */
interface PreviewModalProps {
  project: (typeof FEATURED)[0];
  onClose: () => void;
}

const PreviewModal = ({ project, onClose }: PreviewModalProps) => {
  const displayUrl = project.liveUrl ?? project.url ?? "";
  const isLive = !!project.liveUrl;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        {/* Modal window */}
        <motion.div
          key="modal"
          className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Browser chrome ── */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border-b border-white/10">
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors flex items-center justify-center group"
                aria-label="Close preview"
              >
                <X className="w-1.5 h-1.5 text-[#8b0000] opacity-0 group-hover:opacity-100" />
              </button>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c940]" />
            </div>

            {/* URL bar */}
            <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#2a2a2a] border border-white/8 max-w-lg mx-auto">
              <Circle className="w-3 h-3 text-white/20 shrink-0" />
              <span className="font-mono text-xs text-white/50 truncate">{displayUrl}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-auto">
              <a
                href={displayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/50 text-xs font-mono hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <ExternalLink className="w-3 h-3" />
                Open
              </a>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ── Preview pane ── */}
          <div className="relative bg-[#111] overflow-hidden" style={{ aspectRatio: "16/9" }}>
            {isLive ? (
              /* Live iframe */
              <iframe
                src={project.liveUrl}
                title={`Live preview of ${project.title}`}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            ) : (
              /* Screenshot fallback with HUD overlay */
              <>
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
                  }}
                />
                {/* Bottom HUD bar */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-between gap-4">
                  <div>
                    <p className="text-white font-black text-xl leading-tight mb-1">{project.title}</p>
                    <p className="text-white/50 text-xs font-mono">{project.source}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-white/90 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      View on GitHub
                    </a>
                  </div>
                </div>

                {/* "No live demo" notice */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">GitHub Preview</span>
                </div>
              </>
            )}
          </div>

          {/* ── Tech stack strip ── */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-t border-white/8 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest shrink-0">Stack</span>
            <div className="w-px h-3 bg-white/10 mx-1 shrink-0" />
            {project.skills?.map((s) => (
              <span key={s} className="shrink-0 px-2.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-white/50">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ── Bento Box Component ──────────────────────────────────────────────────── */
const ProjectBento = ({ project, index }: { project: (typeof FEATURED)[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;
  const [previewOpen, setPreviewOpen] = useState(false);

  const openPreview = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setPreviewOpen(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <>
      {/* Preview modal — rendered in place, AnimatePresence handles mounting */}
      {previewOpen && (
        <PreviewModal project={project} onClose={() => setPreviewOpen(false)} />
      )}

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-24 md:mb-40 last:mb-0"
      >
        {/* ── IMAGE TILE ── */}
        <motion.div
          variants={itemVariants}
          className={`relative overflow-hidden rounded-card border border-white/10 hover:border-white/20 bg-v2-base ${
            isEven ? "md:col-span-2 md:row-span-2" : "md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-1"
          } min-h-[350px] md:min-h-0 h-full group transition-colors duration-500`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/[0.08] to-transparent z-10" />
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-v2-base/90 via-v2-base/20 to-transparent z-10" />

          {/* Floating index */}
          <div className="absolute bottom-6 right-8 z-20 overflow-hidden">
            <span className="font-kanit font-black text-[120px] leading-none text-white/5 select-none translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out block">
              0{index + 1}
            </span>
          </div>

          {/* ── Preview button — appears on hover ── */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={openPreview}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md text-white text-sm font-semibold hover:bg-white/20 hover:border-white/40 transition-all duration-200 shadow-lg"
            >
              <Eye className="w-4 h-4" />
              Live Preview
            </button>
          </div>

          {/* Corner bracket decoration */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-accent/40 z-20 pointer-events-none" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-accent/40 z-20 pointer-events-none" />
        </motion.div>

        {/* ── INFO TILE ── */}
        <motion.div
          variants={itemVariants}
          className={`flex flex-col justify-between p-8 md:p-10 rounded-card border border-white/10 hover:border-white/20 bg-gradient-to-b from-white/[0.05] to-white/[0.01] hover:from-white/[0.08] hover:to-white/[0.02] transition-all duration-500 relative overflow-hidden ${
            isEven ? "md:col-span-2 md:row-span-1" : "md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-1"
          }`}
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/10 pointer-events-none" style={{ filter: "blur(60px)" }} />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-sm text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
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

          <div className="mt-10 relative z-10 flex items-center gap-3 flex-wrap">
            <ProjectLinks githubUrl={project.url} liveUrl={project.liveUrl} />
            {/* Preview CTA in info tile too */}
            <button
              onClick={openPreview}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/60 text-xs font-mono hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-all duration-200"
            >
              <Maximize2 className="w-3 h-3" />
              Preview
            </button>
          </div>
        </motion.div>

        {/* ── CASE STUDY TILE ── */}
        <motion.div
          variants={itemVariants}
          className={`p-8 md:p-10 rounded-card border border-white/10 hover:border-white/20 bg-v2-raised hover:bg-v2-base transition-colors duration-500 flex flex-col justify-center ${
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
          className={`p-8 md:p-10 rounded-card border border-white/10 hover:border-white/20 bg-v2-raised hover:bg-v2-base transition-colors duration-500 ${
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
                className="px-4 py-2 rounded-full border border-white/10 text-white/70 text-xs font-mono bg-white/[0.03] hover:border-accent/50 hover:text-accent transition-colors duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

/* ── Section Component ───────────────────────────────────────────────────── */
export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="font-kanit rounded-t-section -mt-10 sm:-mt-12 md:-mt-14 relative z-30 overflow-hidden border-t border-white/10 bg-v2-base"
      style={{ boxShadow: "0 -10px 40px rgba(0,0,0,0.5)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30" style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(0,223,143,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(56,189,248,0.05) 0%, transparent 60%)"
        }} />
        <div className="absolute inset-0 bg-v2-base/60" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 pt-24 md:pt-32 pb-24 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <BlueprintSectionHeader align="left">
            <div className="mb-20 md:mb-32">
              <FadeIn delay={0} y={20}>
                <p className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-white/50 text-xs mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
                  Projects
                </p>
              </FadeIn>
              <FadeIn delay={0.08} y={30}>
                <SectionHeading
                  prefix="Proof of "
                  accentWord="work"
                  gradient="projects"
                  align="left"
                  className="mb-4"
                />
              </FadeIn>
              <FadeIn delay={0.2} y={16}>
                <p className="mt-6 text-white/50 max-w-xl font-kanit font-light text-lg">
                  Four projects across RAG, computer vision, and data engineering — hover the image and click <span className="text-white/70 font-medium">Live Preview</span> to explore each one.
                </p>
              </FadeIn>
            </div>
          </BlueprintSectionHeader>

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
