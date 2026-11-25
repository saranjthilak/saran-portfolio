"use client";

import { useRef, useState, useCallback, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/data/portfolio";
import BlueprintSectionHeader from "./BlueprintSectionHeader";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import {
  X,
  ExternalLink,
  Github,
  Eye,
  Circle,
  FileText,
  Layers,
  Cpu,
  Search,
  Bot,
  Image as ImageIcon,
  Server,
  Database,
  ArrowRight,
  Cloud,
  GitBranch,
  BarChart3,
  Workflow,
  Copy,
  Check,
  Code2,
  Activity,
  Terminal,
  Sparkles,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

const ICON_MAP: Record<string, LucideIcon> = {
  file: FileText,
  layers: Layers,
  cpu: Cpu,
  search: Search,
  bot: Bot,
  image: ImageIcon,
  server: Server,
  database: Database,
  cloud: Cloud,
  workflow: Workflow,
  chart: BarChart3,
};

type ProjectCategory = "ALL" | "GenAI & RAG" | "MLOps & Vision" | "Data & Infra" | "Full-Stack AI";

const CATEGORIES: { label: string; value: ProjectCategory }[] = [
  { label: "All Projects", value: "ALL" },
  { label: "GenAI & RAG", value: "GenAI & RAG" },
  { label: "Data & Infra", value: "Data & Infra" },
  { label: "MLOps & Vision", value: "MLOps & Vision" },
  { label: "Full-Stack AI", value: "Full-Stack AI" },
];

/* ── Animated pipeline strip ──────────────────────────────── */
function PipelineStrip({ steps, inView }: { steps: { label: string; icon: string }[]; inView: boolean }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2" aria-label="Architecture pipeline">
      {steps.map((step, i) => {
        const Icon = ICON_MAP[step.icon] ?? Cpu;
        const isLast = i === steps.length - 1;
        return (
          <div key={step.label} className="contents">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: EASE }}
              className="relative flex items-center gap-1.5 border border-accent/25 bg-accent/5 px-3 py-1.5 rounded-lg group hover:border-accent/60 hover:bg-accent/10 transition-all duration-200"
            >
              {i === 0 && inView && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-accent opacity-50" />
                  <span className="relative h-2 w-2 rounded-full bg-accent" />
                </span>
              )}
              <Icon className="h-3 w-3 text-accent/80" strokeWidth={1.5} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-accent/90">{step.label}</span>
            </motion.div>
            {!isLast && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.25 + i * 0.08, ease: EASE }}
                style={{ transformOrigin: "left" }}
              >
                <ArrowRight className="h-3 w-3 text-accent/35 shrink-0" />
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Interactive Modal Tabs ──────────────────────────────────────────────── */
type ModalTab = "preview" | "architecture" | "casestudy" | "code";

interface PreviewModalProps {
  project: Project;
  onClose: () => void;
}

const PreviewModal = ({ project, onClose }: PreviewModalProps) => {
  const [activeTab, setActiveTab] = useState<ModalTab>("preview");
  const [copied, setCopied] = useState(false);
  const displayUrl = project.liveUrl ?? project.url ?? "";
  const isLive = Boolean(project.liveUrl);

  const copyCode = useCallback(() => {
    if (!project.codeSnippet?.code) return;
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [project.codeSnippet]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/15 bg-[#0f0f0f] shadow-[0_40px_120px_rgba(0,0,0,0.95)] max-h-[90vh] flex flex-col"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Browser Bar */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#181818] border-b border-white/10 shrink-0">
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

            {/* URL Display */}
            <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#242424] border border-white/8 max-w-md mx-auto">
              <Circle className="w-2.5 h-2.5 text-accent/70 shrink-0" />
              <span className="font-mono text-xs text-white/60 truncate">{displayUrl}</span>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 text-xs font-mono hover:text-white hover:bg-white/10 transition-all"
              >
                <Github className="w-3 h-3" />
                <span className="hidden sm:inline">Repo</span>
              </a>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Modal Navigation Tabs */}
          <div className="flex items-center gap-1 px-4 py-2 bg-[#141414] border-b border-white/8 overflow-x-auto shrink-0">
            {[
              { id: "preview", label: "Overview & UI", icon: Eye },
              { id: "architecture", label: "Architecture", icon: Activity },
              { id: "casestudy", label: "Case Study", icon: FileText },
              { id: "code", label: "Code & Config", icon: Code2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ModalTab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all ${
                    active
                      ? "bg-accent/15 text-accent border border-accent/40 font-semibold"
                      : "text-white/40 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7">
            {/* TAB 1: Preview */}
            {activeTab === "preview" && (
              <div className="flex flex-col gap-5">
                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black aspect-video">
                  {isLive ? (
                    <iframe
                      src={project.liveUrl}
                      title={`Live preview of ${project.title}`}
                      className="absolute inset-0 w-full h-full border-0"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                  ) : (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                      {/* Scanlines overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
                        }}
                      />
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                          {project.nodeId}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Metrics strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
                    >
                      <div className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                        {m.label}
                      </div>
                      <div
                        className="font-mono text-xl font-bold tracking-tight mt-1"
                        style={{ color: project.accent }}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Architecture */}
            {activeTab === "architecture" && (
              <div className="flex flex-col gap-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-1">
                    TOPOLOGY & PIPELINE // {project.nodeId}
                  </div>
                  <h3 className="font-kanit text-2xl font-bold text-white">{project.title}</h3>
                  <p className="font-kanit font-light text-sm text-white/60 mt-1">{project.description}</p>
                </div>

                {/* Pipeline visual nodes */}
                <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-4">
                    Execution Pipeline
                  </div>
                  <PipelineStrip steps={project.pipeline} inView={true} />
                </div>

                {/* Architecture Specifications Grid */}
                <div className="border border-white/10 rounded-xl overflow-hidden divide-y divide-white/8 bg-white/[0.02]">
                  {[
                    { label: "Data Ingestion & Input", value: project.architecture.input },
                    { label: "Processing & Embeddings", value: project.architecture.processing },
                    { label: "Storage & Indexing", value: project.architecture.storage },
                    { label: "Model & Serving Layer", value: project.architecture.serving },
                    { label: "Throughput & Benchmarks", value: project.architecture.latencyOrThroughput },
                  ].map((spec) => (
                    <div key={spec.label} className="p-4 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 items-start">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent/80 font-medium">
                        {spec.label}
                      </span>
                      <span className="font-kanit font-light text-sm text-white/80 leading-relaxed">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Case Study */}
            {activeTab === "casestudy" && (
              <div className="flex flex-col gap-5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-1">
                    PRODUCTION CASE STUDY // {project.source}
                  </div>
                  <h3 className="font-kanit text-2xl font-bold text-white mb-2">{project.title}</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/[0.03]">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-red-400 font-semibold mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      The Problem
                    </div>
                    <p className="font-kanit font-light text-sm sm:text-base text-white/80 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border border-sky-500/20 bg-sky-500/[0.03]">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      Engineering Approach
                    </div>
                    <p className="font-kanit font-light text-sm sm:text-base text-white/80 leading-relaxed">
                      {project.approach}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-500/[0.03]">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-semibold mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Production Result &amp; Impact
                    </div>
                    <p className="font-kanit font-light text-sm sm:text-base text-white/80 leading-relaxed">
                      {project.result}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Code & Config */}
            {activeTab === "code" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-accent" />
                    <span className="font-mono text-xs text-white/80 font-medium">
                      {project.codeSnippet.filename}
                    </span>
                    <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-white/10 text-white/50">
                      {project.codeSnippet.language}
                    </span>
                  </div>

                  <button
                    onClick={copyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-white/70 hover:text-white transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-accent" />
                        <span className="text-accent">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-xl overflow-hidden border border-white/10 bg-[#070707] p-4 font-mono text-xs text-white/80 leading-relaxed overflow-x-auto scrollbar-thin">
                  <pre>{project.codeSnippet.code}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Tech Stack */}
          <div className="flex items-center gap-2 px-5 py-3 bg-[#121212] border-t border-white/8 overflow-x-auto shrink-0">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 shrink-0">
              Stack:
            </span>
            {project.skills.map((s) => (
              <span
                key={s}
                className="shrink-0 px-2.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-white/60"
              >
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
const ProjectBento = ({ project, index }: { project: Project; index: number }) => {
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
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <>
      {previewOpen && <PreviewModal project={project} onClose={() => setPreviewOpen(false)} />}

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-24 md:mb-36 last:mb-0"
      >
        {/* ── IMAGE TILE ── */}
        <motion.div
          variants={itemVariants}
          className={`relative overflow-hidden rounded-card border border-white/10 hover:border-white/25 bg-v2-base ${
            isEven ? "md:col-span-2 md:row-span-2" : "md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-1"
          } min-h-[350px] md:min-h-0 h-full group transition-colors duration-500`}
        >
          {/* Top accent glow line */}
          <span
            className="absolute top-0 left-0 right-0 h-0.5 z-20 pointer-events-none"
            style={{ background: `linear-gradient(to right, ${project.accent}, transparent 60%)` }}
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-accent/[0.08] to-transparent z-10" />
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-v2-base/90 via-v2-base/30 to-transparent z-10" />

          {/* Floating index */}
          <div className="absolute bottom-6 right-8 z-20 overflow-hidden">
            <span className="font-kanit font-black text-[120px] leading-none text-white/5 select-none translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out block">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Preview button */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={openPreview}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/80 border border-white/30 backdrop-blur-md text-white text-xs font-mono uppercase tracking-wider hover:bg-accent hover:text-black hover:border-accent transition-all duration-200 shadow-2xl"
            >
              <Eye className="w-4 h-4" />
              Architecture &amp; Preview
            </button>
          </div>

          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-accent/40 z-20 pointer-events-none" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-accent/40 z-20 pointer-events-none" />
        </motion.div>

        {/* ── INFO TILE ── */}
        <motion.div
          variants={itemVariants}
          className={`flex flex-col justify-between p-7 sm:p-8 md:p-10 rounded-card border border-white/10 hover:border-white/20 bg-gradient-to-b from-white/[0.05] to-white/[0.01] hover:from-white/[0.08] hover:to-white/[0.02] transition-all duration-500 relative overflow-hidden ${
            isEven ? "md:col-span-2 md:row-span-1" : "md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-1"
          }`}
        >
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: project.accent, filter: "blur(70px)", opacity: 0.12 }}
          />

          <div className="relative z-10">
            {/* Header tags */}
            <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xs text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20 whitespace-nowrap">
                  {project.category}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 hidden sm:inline">
                  {project.nodeId}
                </span>
              </div>
              <div className="flex flex-col items-end gap-0.5 text-right">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/35">
                  {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
                <span className="font-kanit text-xs uppercase tracking-widest text-white/40">
                  {project.source}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide text-white mb-3 leading-tight">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-white/60 text-sm leading-relaxed mb-6 font-kanit font-light">
              {project.description}
            </p>

            {/* Key KPI Metric Chips */}
            <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-white/[0.07] mb-5">
              {project.metrics.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-white/40 truncate">
                    {m.label}
                  </span>
                  <span
                    className="font-mono text-sm sm:text-base font-bold tracking-tight mt-0.5"
                    style={{ color: project.accent }}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Pipeline Visualizer */}
            {project.pipeline.length > 0 && (
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 block mb-1">
                  Architecture Pipeline
                </span>
                <PipelineStrip steps={project.pipeline} inView={isInView} />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 relative z-10 flex items-center gap-3 flex-wrap">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 bg-white/5 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 hover:border-white/40 transition-all duration-200"
            >
              <Github className="w-3.5 h-3.5" />
              View Code
            </a>

            <button
              onClick={openPreview}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-accent/40 bg-accent/10 text-accent font-mono text-xs uppercase tracking-wider hover:bg-accent/20 hover:border-accent/70 transition-all duration-200"
            >
              <Eye className="w-3.5 h-3.5" />
              Inspect Architecture
            </button>
          </div>
        </motion.div>

        {/* ── CASE STUDY TILE ── */}
        <motion.div
          variants={itemVariants}
          className={`relative p-7 sm:p-8 md:p-10 rounded-card border border-white/10 hover:border-white/20 bg-v2-raised hover:bg-v2-base transition-colors duration-500 flex flex-col justify-center overflow-hidden ${
            isEven ? "md:col-span-1 md:row-span-1" : "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-2"
          }`}
        >
          {/* Corner brackets */}
          <span className="absolute top-3 left-3 h-3 w-3 border-t border-l border-white/15" />
          <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-white/15" />

          <div className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-4 flex items-center justify-between">
            <span>Case Study</span>
            <span className="font-mono text-[8px] text-white/20">VERIFIED SPEC</span>
          </div>

          <div className="flex flex-col gap-4">
            {project.problem && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff5f56] flex items-center gap-1.5 font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" /> Problem
                </span>
                <span className="font-kanit font-light text-xs sm:text-sm text-white/70 leading-relaxed">
                  {project.problem}
                </span>
              </div>
            )}
            {project.approach && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#38bdf8] flex items-center gap-1.5 font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> Approach
                </span>
                <span className="font-kanit font-light text-xs sm:text-sm text-white/70 leading-relaxed">
                  {project.approach}
                </span>
              </div>
            )}
            {project.result && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#f59e0b] flex items-center gap-1.5 font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" /> Result
                </span>
                <span className="font-kanit font-light text-xs sm:text-sm text-white/70 leading-relaxed">
                  {project.result}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── SKILLS TILE ── */}
        <motion.div
          variants={itemVariants}
          className={`p-7 sm:p-8 md:p-10 rounded-card border border-white/10 hover:border-white/20 bg-v2-raised hover:bg-v2-base transition-colors duration-500 flex flex-col justify-start gap-6 self-start md:self-stretch ${
            isEven ? "md:col-span-1 md:row-span-1" : "md:col-span-1 md:row-span-1 md:col-start-2 md:row-start-2"
          }`}
        >
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.skills?.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-white/75 text-xs font-mono bg-white/[0.03] hover:border-accent/50 hover:text-accent transition-colors duration-200 cursor-default"
                >
                  #{skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between text-white/30 font-mono text-[9px]">
            <span>NODE :: READY</span>
            <span>PRODUCTION TIER</span>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

/* ── Section Component ───────────────────────────────────────────────────── */
export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("ALL");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "ALL") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="font-kanit rounded-t-section -mt-10 sm:-mt-12 md:-mt-14 relative z-30 overflow-hidden border-t border-white/10 bg-v2-base"
      style={{ boxShadow: "0 -10px 40px rgba(0,0,0,0.5)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(0,223,143,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(56,189,248,0.05) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-v2-base/60" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 pt-24 md:pt-32 pb-24 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <BlueprintSectionHeader align="left">
            <div className="mb-14 md:mb-20">
              <FadeIn delay={0} y={20}>
                <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-white/50 mb-5">
                  <span className="relative flex h-2 w-2 items-center justify-center">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  Portfolio Systems
                  <span className="font-mono text-[9px] text-white/30 ml-2">
                    // ARCHITECTURE REPOSITORY
                  </span>
                </p>
              </FadeIn>
              <FadeIn delay={0.08} y={30}>
                <SectionHeading
                  id="projects-heading"
                  prefix="Proof of "
                  accentWord="work"
                  gradient="projects"
                  align="left"
                  className="mb-4"
                />
              </FadeIn>
              <FadeIn delay={0.2} y={16}>
                <p className="mt-4 text-white/55 max-w-2xl font-kanit font-light text-base sm:text-lg leading-relaxed">
                  Production architectures spanning Multimodal RAG, NVIDIA Triton MLOps, GCP Data Pipelines, and Full-Stack AI.
                  Inspect the live architecture, system telemetry, and verified code implementations below.
                </p>
              </FadeIn>
            </div>
          </BlueprintSectionHeader>

          {/* ── Category Filter Bar ── */}
          <FadeIn delay={0.25} y={15}>
            <div className="mb-14 flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat.value;
                const count =
                  cat.value === "ALL" ? projects.length : projects.filter((p) => p.category === cat.value).length;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setActiveCategory(cat.value)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all duration-200 border ${
                      active
                        ? "border-accent/60 bg-accent/10 text-accent shadow-[0_0_20px_hsl(var(--accent)/0.2)]"
                        : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_hsl(var(--accent))]" />
                    )}
                    <span>{cat.label}</span>
                    <span className={`text-[9px] opacity-60 ${active ? "text-accent" : "text-white/40"}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* ── Projects Bento List ── */}
          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectBento key={project.title} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
