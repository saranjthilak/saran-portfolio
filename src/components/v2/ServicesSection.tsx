"use client";

import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  BrainCircuit,
  Cloud,
  Database,
  GitBranch,
  Monitor,
  Pause,
  Play,
  Radio,
} from "lucide-react";
import BlueprintSectionHeader from "./BlueprintSectionHeader";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { projects } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;

type DomainTone = "cyan" | "violet" | "amber" | "sky" | "rose" | "emerald";

interface ExpertiseItem {
  number: string;
  categoryLabel: string;
  name: string;
  icon: LucideIcon;
  description: string;
  pipeline: string[];
  tags: string[];
  skills: string[];
  projectRepos: string[];
  tone: DomainTone;
  telemetry?: { label: string; value: string }[];
}

function isTodoOrEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" || /^todo(\b|…|\.{3}|:|\s|$)/i.test(trimmed);
  }
  if (Array.isArray(value)) {
    return value.length === 0 || value.every(isTodoOrEmpty);
  }
  if (typeof value === "object") {
    const vals = Object.values(value);
    return vals.length === 0 || vals.every(isTodoOrEmpty);
  }
  return false;
}

const EXPERTISE: ExpertiseItem[] = [
  {
    number: "01",
    skills: ["ETL/ELT design", "Streaming ingestion", "Data contracts", "SQL transformations"],
    projectRepos: ["Divvy-Bike-Data-End-to-End-Pipeline"],
    categoryLabel: "Data Engineering",
    name: "Data Engineering Architecture",
    icon: Database,
    description: "Resilient ETL/ELT pipelines with Apache Airflow and dbt, data contracts, idempotent processing, and streaming ingestion into analytical warehouses.",
    pipeline: ["Source Ingest", "Airflow DAG", "dbt Models", "BigQuery"],
    tags: ["Airflow", "dbt", "BigQuery", "Snowflake", "ETL/ELT"],
    tone: "cyan",
    telemetry: [{ label: "Throughput", value: "1.2M events/s" }, { label: "Schema", value: "Enforced" }, { label: "Dropped", value: "0.00%" }],
  },
  {
    number: "02",
    skills: ["Hybrid retrieval", "Multimodal embeddings", "Citation grounding", "Hallucination guardrails"],
    projectRepos: ["Multimodel_RAG", "Car-Manual-RAG-Assistant"],
    categoryLabel: "GenAI & RAG",
    name: "GenAI & RAG Systems",
    icon: BrainCircuit,
    description: "Grounded, citation-backed responses with semantic and keyword retrieval, cross-encoder reranking, and answer guardrails via LangChain and FAISS.",
    pipeline: ["Query", "Embed", "FAISS Vector", "Rerank", "Grounded LLM"],
    tags: ["LangChain", "Vector DB", "FAISS", "Guardrails", "Reranking"],
    tone: "violet",
    telemetry: [{ label: "P99 latency", value: "42 ms" }, { label: "Grounding", value: "99.4%" }, { label: "Top-K", value: "8 docs" }],
  },
  {
    number: "03",
    skills: ["Model serving", "Quantized inference", "Canary deployments", "Drift monitoring"],
    projectRepos: ["ai_poduct_matching"],
    categoryLabel: "MLOps",
    name: "Model Operations & Serving",
    icon: GitBranch,
    description: "Model registration, quantized inference, canary routing, and drift monitoring using NVIDIA Triton, MLflow, and FastAPI.",
    pipeline: ["Train / Log", "MLflow", "Triton Server", "Canary Route"],
    tags: ["MLflow", "Triton", "Quantization", "Docker", "Model Registry"],
    tone: "amber",
    telemetry: [{ label: "P99 inference", value: "18 ms" }, { label: "Canary traffic", value: "10%" }, { label: "Drift", value: "Normal" }],
  },
  {
    number: "04",
    skills: ["Infrastructure as code", "Multi-cloud provisioning", "Container orchestration", "Cost optimization"],
    projectRepos: ["Divvy-Bike-Data-End-to-End-Pipeline", "vanilla-steel-assessment"],
    categoryLabel: "Cloud & IaC",
    name: "Cloud Topology & IaC",
    icon: Cloud,
    description: "Cloud infrastructure with Terraform and Kubernetes, security, cost visibility, and repeatable deployments as design considerations.",
    pipeline: ["Terraform HCL", "State Lock", "K8s Mesh", "Live Cluster"],
    tags: ["Terraform", "AWS", "GCP", "Kubernetes", "FinOps"],
    tone: "sky",
    telemetry: [{ label: "Availability", value: "99.99%" }, { label: "Pods", value: "12 / 12 ready" }, { label: "State", value: "Synced" }],
  },
  {
    number: "05",
    skills: ["Incident response", "Failover design", "SLA operations", "Infrastructure monitoring"],
    projectRepos: [],
    categoryLabel: "Mission-Critical",
    name: "Mission-Critical Ops & High Availability",
    icon: Radio,
    description: "High-availability operations with failover design, Prometheus/Grafana telemetry, incident response, and circuit-breaker remediation.",
    pipeline: ["Prometheus", "Telemetry", "Circuit Breaker", "Auto-Heal"],
    tags: ["High Availability", "Prometheus", "Grafana", "Incident SRE", "Failover"],
    tone: "rose",
    telemetry: [{ label: "Uptime", value: "99.99%" }, { label: "MTTR", value: "< 8 min" }, { label: "Failover", value: "Armed" }],
  },
  {
    number: "06",
    skills: ["Reactive interfaces", "Async APIs", "Token streaming", "Type-safe development"],
    projectRepos: ["German-Learning-APP", "vanilla-steel-assessment"],
    categoryLabel: "Full-Stack AI",
    name: "Full-Stack AI Interfaces",
    icon: Monitor,
    description: "AI services connected to reactive clients through FastAPI, type-safe React interfaces, and WebSocket token streaming.",
    pipeline: ["FastAPI RPC", "WebSocket", "React State", "Edge Render"],
    tags: ["FastAPI", "React", "Next.js", "TypeScript", "WebSocket"],
    tone: "emerald",
    telemetry: [{ label: "Stream", value: "Live" }, { label: "Active sockets", value: "2.4k" }, { label: "Frame time", value: "16 ms" }],
  },
];

const toneClasses: Record<DomainTone, string> = {
  cyan: "expertise-domain-cyan",
  violet: "expertise-domain-violet",
  amber: "expertise-domain-amber",
  sky: "expertise-domain-sky",
  rose: "expertise-domain-rose",
  emerald: "expertise-domain-emerald",
};

/* ───── Ambient glow orbs behind the canvas ───── */
function AmbientOrbs({ activeTone = "cyan" }: { activeTone?: DomainTone }) {
  const toneMap: Record<DomainTone, string> = {
    cyan: "187 80% 48%",
    violet: "258 90% 76%",
    amber: "38 92% 55%",
    sky: "199 92% 60%",
    rose: "350 86% 60%",
    emerald: "160 84% 39%",
  };
  const primary = toneMap[activeTone];
  const secondary = activeTone === "cyan" ? toneMap.violet : toneMap.cyan;

  return (
    <div className="pointer-events-none inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[hsl(var(--domain-color)/0.10)] blur-[120px]" style={{ "--domain-color": primary } as React.CSSProperties} />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[hsl(var(--domain-color)/0.08)] blur-[100px]" style={{ "--domain-color": secondary } as React.CSSProperties} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[hsl(var(--domain-color)/0.06)] blur-[80px] animate-pulse" style={{ "--domain-color": primary } as React.CSSProperties} />
    </div>
  );
}

/* ───── Pipeline connector between domain tabs ───── */
function PipelineConnector({ active, tone, vertical = false }: { active: boolean; tone: DomainTone; vertical?: boolean }) {
  return (
    <div aria-hidden="true" className={`${vertical ? "h-6 w-2" : "h-2 min-w-4 flex-1"} relative overflow-hidden ${toneClasses[tone]}`}>
      <span className={`absolute rounded-full bg-border/60 ${vertical ? "left-1/2 top-0 h-full w-px -translate-x-1/2" : "left-0 top-1/2 h-px w-full -translate-y-1/2"}`} />
      <span className={`absolute ${vertical ? "inset-x-0 top-0 h-8 expertise-signal-vertical" : "inset-y-0 left-0 w-20 expertise-signal"} ${active ? "opacity-100" : "opacity-0"}`} />
      {[0, 1].map((i) => (
        <span
          key={i}
          className={`expertise-packet ${vertical ? "left-[calc(50%-1px)] expertise-packet-vertical" : "top-[calc(50%-1px)]"} ${active ? "expertise-packet-hot" : ""}`}
          style={{ animationDelay: `${i * 1.6}s` }}
        />
      ))}
    </div>
  );
}

/* ───── Domain tab (glass card) ───── */
interface SystemNodeProps {
  item: ExpertiseItem;
  active: boolean;
  onSelect: () => void;
  index: number;
  motionPaused: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const SystemNode = forwardRef<HTMLButtonElement, SystemNodeProps>(function SystemNode(
  { item, active, onSelect, index, motionPaused, onKeyDown },
  ref
) {
  const Icon = item.icon;

  const baseClasses = "group relative flex min-w-0 flex-1 items-center gap-3 border bg-white/5 backdrop-blur-md p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300";
  const activeClasses = active ? "expertise-domain-border bg-white/10 shadow-[0_0_30px_color-mix(in_srgb,var(--domain-color)_35%,transparent)]" : "border-border/60 hover:border-accent/50 hover:bg-white/8 hover:shadow-[0_0_20px_color-mix(in_srgb,var(--domain-color)_15%,transparent)]";
  const iconClasses = active ? "expertise-domain-border expertise-domain-surface expertise-domain-text expertise-domain-glow" : "border-border/70 bg-white/5 text-muted-foreground group-hover:border-accent/40 group-hover:expertise-domain-text";
  const labelClasses = active ? "text-[var(--domain-color)] font-semibold" : "text-muted-foreground";
  const nameClasses = "mt-1 block font-semibold text-[11px] leading-tight text-foreground truncate group-hover:text-[var(--domain-color)] transition-colors";
  const dotClasses = active ? "h-1.5 w-1.5 rounded-full bg-[var(--domain-color)] shadow-[0_0_6px_var(--domain-color)]" : "";
  const nodeDotClasses = active ? "h-1 w-1 rounded-full bg-[var(--domain-color)] shadow-[0_0_6px_var(--domain-color)]" : "";
  const bottomLineClasses = "absolute bottom-0 left-2 right-2 h-px bg-[var(--domain-color)]";

  return (
    <motion.button
      ref={ref}
      type="button"
      role="tab"
      id={`expertise-tab-${item.number}`}
      aria-selected={active}
      aria-controls={`expertise-panel-${item.number}`}
      tabIndex={active ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={`${baseClasses} ${toneClasses[item.tone]} ${activeClasses}`}
      initial={motionPaused ? false : { opacity: 0, y: 16, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: motionPaused ? 0 : 0.5, delay: motionPaused ? 0 : index * 0.08, ease: EASE }}
      whileHover={motionPaused ? undefined : { y: -4, scale: 1.02 }}
    >
      {active && (
        <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-[var(--domain-color)] shadow-[0_0_12px_var(--domain-color)]" />
      )}
      <span className={`grid h-9 w-9 shrink-0 place-items-center border rounded-xl transition-all duration-300 ${iconClasses}`}>
        <Icon className="h-4 w-4" strokeWidth={1.6} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] ${labelClasses}`}>
          {active && <span className={dotClasses} />}
          {item.number} / {item.categoryLabel}
        </span>
        <span className={nameClasses} title={item.name}>
          {item.name}
        </span>
      </span>
      {active && (
        <motion.span layoutId={motionPaused ? undefined : "active-node"} className={bottomLineClasses} />
      )}
    </motion.button>
  );
});

/* ───── Inspector panel (mounted, hidden when inactive) ───── */
function Inspector({ item, isSimulating, motionPaused, id }: { item: ExpertiseItem; isSimulating: boolean; motionPaused: boolean; id: string }) {
  const Icon = item.icon;

  const validPipeline = useMemo(
    () => (item.pipeline ?? []).filter((step) => !isTodoOrEmpty(step)),
    [item.pipeline]
  );

  const validTelemetry = useMemo(
    () => (item.telemetry ?? []).filter((m) => !isTodoOrEmpty(m.label) && !isTodoOrEmpty(m.value)),
    [item.telemetry]
  );

  const validSkills = useMemo(
    () => (item.skills ?? []).filter((skill) => !isTodoOrEmpty(skill)),
    [item.skills]
  );

  const validTags = useMemo(
    () => (item.tags ?? []).filter((tool) => !isTodoOrEmpty(tool)),
    [item.tags]
  );

  const mergedChips = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const chip of [...validSkills, ...validTags]) {
      const key = chip.trim().toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(chip);
      }
    }
    return result;
  }, [validSkills, validTags]);

  const validProjects = useMemo(() => {
    return (item.projectRepos ?? [])
      .filter((repo) => !isTodoOrEmpty(repo))
      .map((repo) => projects.find((candidate) => candidate.url.split("/").pop() === repo))
      .filter((project): project is NonNullable<typeof project> => Boolean(project));
  }, [item.projectRepos]);

  return (
    <motion.div
      id={id}
      role="tabpanel"
      aria-labelledby={`expertise-tab-${item.number}`}
      key={item.number}
      className={`${toneClasses[item.tone]} relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_24px_80px_hsl(var(--background)/0.6)] rounded-3xl`}
      initial={motionPaused ? false : { opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: motionPaused ? 0 : 0.5, ease: EASE }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--domain-color)]/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 [mask-image:radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),black,transparent)]" style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties} />

      {/* Header */}
      <div className="relative flex min-w-0 gap-4 p-6 sm:p-8">
        <span className="grid h-13 w-13 shrink-0 place-items-center border rounded-2xl expertise-domain-border expertise-domain-surface expertise-domain-text shadow-[0_0_20px_color-mix(in_srgb,var(--domain-color)_35%,transparent)]">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] expertise-domain-text">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--domain-color)] shadow-[0_0_8px_var(--domain-color)]" />
            DOMAIN {item.number} OF 06 • {item.categoryLabel}
          </div>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{item.name}</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{item.description}</p>
        </div>
      </div>

      {/* Pipeline */}
      {validPipeline.length > 0 && (
        <div className="border-t border-white/10 px-6 py-5 sm:px-8">
          <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="flex items-center gap-2">PIPELINE TOPOLOGY</span>
            {isSimulating && (
              <span className="flex items-center gap-1.5 font-semibold expertise-domain-text animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--domain-color)] shadow-[0_0_8px_var(--domain-color)]" />
                SIGNAL ACTIVE
              </span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
            {validPipeline.map((step, index) => {
              const isStepActive = isSimulating && index < validPipeline.length - 1;
              return (
                <div key={step} className="contents">
                  <motion.div
                    className={`relative flex items-center gap-2 border rounded-lg px-4 py-2.5 font-mono text-[11px] font-semibold transition-all duration-300 ${
                      isStepActive
                        ? "border-[var(--domain-color)]/70 bg-[var(--domain-color)]/10 text-foreground shadow-[0_0_20px_color-mix(in_srgb,var(--domain-color)_30%,transparent)]"
                        : "border-white/10 bg-white/5 text-foreground/70 hover:border-[var(--domain-color)]/40 hover:bg-[var(--domain-color)]/5"
                    }`}
                    animate={isSimulating && !motionPaused ? { y: [0, -4, 0] } : { y: 0 }}
                    transition={{
                      duration: motionPaused ? 0 : 1.2,
                      repeat: isSimulating && !motionPaused ? Infinity : 0,
                      delay: index * 0.15,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="font-mono text-[9px] text-[var(--domain-color)] opacity-80">0{index + 1}.</span>
                    <span>{step}</span>
                    {isStepActive && <span className="h-2 w-2 rounded-full bg-[var(--domain-color)] shadow-[0_0_10px_var(--domain-color)] animate-ping" />}
                  </motion.div>
                  {index < validPipeline.length - 1 && (
                    <ArrowRight className="mx-auto h-4 w-4 shrink-0 rotate-90 text-[var(--domain-color)] opacity-50 sm:mx-0 sm:rotate-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Telemetry */}
      {validTelemetry.length > 0 && (
        <div className="border-t border-white/10 px-6 py-5 sm:px-8">
          <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="flex items-center gap-2">
              <Activity className="h-3 w-3 text-[var(--domain-color)]" />
              RUNTIME TELEMETRY
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {validTelemetry.map((metric) => (
              <div key={metric.label} className="relative p-4 rounded-xl border border-[var(--domain-color)]/20 bg-white/5 backdrop-blur-sm group hover:border-[var(--domain-color)]/50 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--domain-color)_25%,transparent)] transition-all duration-300">
                <div className="absolute left-0 top-0 h-1 w-1 rounded-full border-l border-t border-[var(--domain-color)]/60" />
                <div className="absolute right-0 top-0 h-1 w-1 rounded-full border-r border-t border-[var(--domain-color)]/60" />
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{metric.label}</span>
                  <span className="flex h-2 w-2 items-center justify-center">
                    <span className="h-1 w-1 rounded-full bg-[var(--domain-color)] shadow-[0_0_6px_var(--domain-color)]" />
                  </span>
                </div>
                <div className="mt-1 font-mono text-2xl font-bold tracking-tight text-[var(--domain-color)] drop-shadow-[0_0_12px_color-mix(in_srgb,var(--domain-color)_40%,transparent)] group-hover:scale-105 transition-transform duration-200">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toolchain chips */}
      {mergedChips.length > 0 && (
        <div className="border-t border-white/10 px-6 py-5 sm:px-8">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">TOOLCHAIN & DOMAIN SPECIFICATIONS</div>
          <ul className="flex flex-wrap gap-2">
            {mergedChips.map((chip) => (
              <li key={chip} className="relative px-3 py-1.5 rounded-lg border border-[var(--domain-color)]/20 bg-white/5 text-[10px] font-mono text-[var(--domain-color)]/80 uppercase tracking-[0.1em] group cursor-default transition-all duration-200 hover:bg-[var(--domain-color)]/10 hover:border-[var(--domain-color)]/40 hover:shadow-[0_0_12px_color-mix(in_srgb,var(--domain-color)_30%,transparent)]">
                <span className="opacity-50">#</span>{chip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Verified implementations */}
      {validProjects.length > 0 && (
        <div className="border-t border-white/10 px-6 py-5 sm:px-8 pb-8">
          <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="flex items-center gap-2 expertise-domain-text">
              <GitBranch className="h-3 w-3" />
              VERIFIED IMPLEMENTATIONS
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {validProjects.map((project) => (
              <a
                key={project.url}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                className="group relative flex items-center justify-between border border-white/10 bg-white/5 p-3 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-[var(--domain-color)]/50 hover:bg-[var(--domain-color)]/5 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--domain-color)_20%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--domain-color)]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center border border-white/10 bg-white/8 rounded-lg text-muted-foreground transition-colors group-hover:border-[var(--domain-color)]/50 group-hover:text-[var(--domain-color)]">
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground group-hover:text-[var(--domain-color)] transition-colors">{project.title}</p>
                    {!isTodoOrEmpty(project.source) && (
                      <p className="font-mono text-[9px] text-muted-foreground/70 truncate">{project.source}</p>
                    )}
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 transition-colors group-hover:text-[var(--domain-color)] flex items-center gap-1">
                  REPO <ArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [motionPreferenceReady, setMotionPreferenceReady] = useState(false);
  useEffect(() => { setMotionPreferenceReady(true); }, []);
  const motionPaused = motionPreferenceReady && Boolean(prefersReducedMotion);
  const activeItem = EXPERTISE[activeIndex];

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const handleTabKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % EXPERTISE.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + EXPERTISE.length) % EXPERTISE.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = EXPERTISE.length - 1;
    }
    if (nextIndex !== null) {
      setActiveIndex(nextIndex);
      setIsSimulating(false);
      tabRefs.current[nextIndex]?.focus();
    }
  }, []);

  const rotateX = useSpring(0, { stiffness: 70, damping: 18, mass: 0.5 });
  const rotateY = useSpring(0, { stiffness: 70, damping: 18, mass: 0.5 });
  const stageShiftX = useTransform(rotateY, (value) => value * -2);
  const stageShiftY = useTransform(rotateX, (value) => value * 1.8);
  const tiltEnabled = () =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)").matches;

  const handleTilt = (event: React.MouseEvent<HTMLDivElement>) => {
    if (motionPaused || !tiltEnabled()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(nx * 6);
    rotateX.set(-ny * 5);
  };
  const resetTilt = () => { rotateX.set(0); rotateY.set(0); };

  useEffect(() => {
    if (!isSimulating || motionPaused) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % EXPERTISE.length), 2000);
    return () => window.clearInterval(timer);
  }, [isSimulating, motionPaused]);

  useEffect(() => {
    if (motionPaused) { rotateX.jump(0); rotateY.jump(0); }
  }, [motionPaused, rotateX, rotateY]);

  useEffect(() => {
    tabRefs.current[activeIndex]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  const stageLabel = useMemo(() => (motionPaused ? "MOTION PAUSED" : isSimulating ? "SIMULATION RUNNING" : "PIPELINE READY"), [isSimulating, motionPaused]);

  return (
    <section data-motion-paused={motionPaused} id="skills" className="relative z-20 -mt-10 overflow-hidden rounded-t-section border-t border-white/10 bg-white/2 px-5 pb-28 pt-20 sm:-mt-12 sm:px-8 sm:pt-32 md:-mt-16 lg:pb-36" aria-labelledby="expertise-heading">
      {/* Ambient orbs shift with active domain */}
      <AmbientOrbs activeTone={activeItem.tone} />

      <div className="relative mx-auto max-w-7xl">
        <BlueprintSectionHeader align="center">
          <div className="mb-10 text-center sm:mb-16">
            <FadeIn delay={0} y={20}>
              <p className="flex items-center justify-center gap-2 font-medium uppercase tracking-[0.25em] text-white/60 text-xs mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--domain-color)] shadow-[0_0_10px_var(--domain-color)] inline-block" />
                Expertise
              </p>
            </FadeIn>

            <FadeIn delay={0.08} y={30}>
              <SectionHeading
                id="expertise-heading"
                prefix="Six domains, one "
                accentWord="reliability"
                suffix=" mindset"
                gradient="expertise"
                align="center"
                className="mb-6"
              />
            </FadeIn>

            <FadeIn y={16} delay={0.2} duration={0.7} className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Production-grade systems across data, AI, cloud, and operations — each a reference architecture I’ve built and operated.
            </FadeIn>
          </div>
        </BlueprintSectionHeader>

        <motion.div
          className="expertise-canvas relative overflow-hidden border border-white/15 p-4 shadow-[0_30px_100px_hsl(var(--background)/0.7)] [transform-style:preserve-3d] rounded-2xl sm:p-6"
          style={{
            rotateX: motionPaused ? 0 : rotateX,
            rotateY: motionPaused ? 0 : rotateY,
            transformPerspective: 1400,
          }}
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <div className="absolute inset-0 blueprint-dots opacity-[0.12]" aria-hidden="true" />
          <div className="relative z-10">

            <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5 font-mono text-[9px] tracking-[0.18em] text-muted-foreground">
                <div className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </div>
                <span className="font-semibold text-foreground">REFERENCE ARCHITECTURE</span>
                <span className="hidden text-white/40 sm:inline">|</span>
                <span className="hidden font-mono text-[9px] text-muted-foreground/60 sm:inline">TOPOLOGY SPEC // REV-2.4</span>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                  Interactive Simulation
                </span>
                <button
                  type="button"
                  onClick={() => setIsSimulating((value) => !value)}
                  disabled={motionPaused}
                  className="group inline-flex min-h-10 items-center disabled:cursor-not-allowed disabled:opacity-50 justify-center gap-2 border border-accent/40 bg-accent/5 px-3.5 py-1.5 font-mono text-[9px] font-semibold tracking-widest text-accent transition-all hover:bg-accent/10 hover:shadow-[0_0_24px_hsl(var(--accent)/0.3)]"
                  aria-pressed={isSimulating}
                >
                  {isSimulating ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  )}{" "}
                  {isSimulating ? "PAUSE RUN" : "SIMULATE PIPELINE FLOW"}
                </button>
              </div>
            </div>

            {/* Desktop tablist */}
            <motion.div
              role="tablist"
              aria-label="Expertise domains"
              aria-orientation="horizontal"
              className="hidden items-stretch lg:flex [transform-style:preserve-3d]"
              style={{ x: motionPaused ? 0 : stageShiftX, y: motionPaused ? 0 : stageShiftY }}
            >
              {EXPERTISE.map((item, index) => (
                <div key={item.number} className="contents">
                  <SystemNode
                    ref={(el) => { tabRefs.current[index] = el; }}
                    motionPaused={motionPaused}
                    item={item}
                    active={activeIndex === index}
                    onSelect={() => { setActiveIndex(index); setIsSimulating(false); }}
                    index={index}
                    onKeyDown={(e) => handleTabKeyDown(e, index)}
                  />
                  {index < EXPERTISE.length - 1 && <PipelineConnector active={isSimulating || activeIndex === index} tone={item.tone} />}
                </div>
              ))}
            </motion.div>

            {/* Mobile tablist */}
            <div className="lg:hidden -mx-4 sm:-mx-6 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2">
              <ul role="tablist" aria-label="Expertise domains" aria-orientation="horizontal" className="flex w-max min-w-full gap-2 px-4 sm:px-6 [scroll-snap-type:x_mandatory]">
                {EXPERTISE.map((item, index) => {
                  const Icon = item.icon;
                  const active = activeIndex === index;
                  return (
                    <li key={item.number} className="[scroll-snap-align:start]" role="presentation">
                      <button
                        ref={(el) => { tabRefs.current[index] = el; }}
                        type="button"
                        role="tab"
                        id={`expertise-tab-${item.number}`}
                        aria-selected={active}
                        aria-controls={`expertise-panel-${item.number}`}
                        tabIndex={active ? 0 : -1}
                        onClick={() => { setActiveIndex(index); setIsSimulating(false); }}
                        onKeyDown={(e) => handleTabKeyDown(e, index)}
                        className={`${toneClasses[item.tone]} group relative flex min-h-[72px] min-w-[150px] flex-col items-start gap-1.5 border bg-white/5 backdrop-blur-md p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--domain-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 ${
                          active
                            ? "border-[var(--domain-color)]/70 bg-white/10 shadow-[0_0_24px_color-mix(in_srgb,var(--domain-color)_30%,transparent)]"
                            : "border-white/6 hover:border-[var(--domain-color)]/40 hover:bg-white/8"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {Icon && (
                            <span className={`grid h-6 w-6 shrink-0 place-items-center border rounded-lg ${
                              active ? "border-[var(--domain-color)]/70 bg-[var(--domain-color)]/15 text-[var(--domain-color)]" : "border-white/10 bg-white/5 text-muted-foreground"
                            }`}>
                              <Icon className="h-3 w-3" strokeWidth={1.6} />
                            </span>
                          )}
                          <span className={`flex items-center gap-1 font-mono text-[9px] tracking-[0.14em] ${
                            active ? "text-[var(--domain-color)] font-semibold" : "text-muted-foreground"
                          }`}>
                            {active && <span className="h-1 w-1 rounded-full bg-[var(--domain-color)] shadow-[0_0_6px_var(--domain-color)]" />}
                            {item.number} / {item.categoryLabel}
                          </span>
                        </span>
                        <span className="block text-[11px] font-semibold leading-tight text-foreground line-clamp-2">{item.name}</span>
                        {active && <motion.span layoutId={motionPaused ? undefined : "active-mobile-tab"} className="absolute bottom-0 left-2 right-2 h-px bg-[var(--domain-color)]" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-[9px] tracking-widest text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${isSimulating ? "animate-ping bg-accent" : "bg-accent"}`} />
                {stageLabel}
              </span>
              <span className="flex items-center gap-2">
                <span>PIPELINE FLOW</span>
                <span className="text-white/30">/</span>
                <span className="text-foreground font-semibold">6 DOMAINS</span>
              </span>
            </div>
          </div>

          {/* Single shared inspector */}
          <AnimatePresence mode="wait">
            <div className="mt-8">
              {EXPERTISE.map((item, index) => (
                <div key={item.number} id={`expertise-panel-${item.number}`} role="tabpanel" aria-labelledby={`expertise-tab-${item.number}`} hidden={activeIndex !== index}>
                  <Inspector motionPaused={motionPaused || activeIndex !== index} item={item} isSimulating={isSimulating && activeIndex === index} id={`expertise-inspector-${item.number}`} />
                </div>
              ))}
            </div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
