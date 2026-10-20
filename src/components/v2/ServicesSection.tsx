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
    description: "Reference architecture for resilient ETL/ELT pipelines with Apache Airflow and dbt, including data contracts, idempotent processing, and streaming ingestion into analytical warehouses.",
    pipeline: ["Kafka Ingest", "Airflow DAG", "dbt Models", "BigQuery"],
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
    description: "Reference architecture for grounded, citation-backed responses, combining semantic and keyword retrieval, cross-encoder reranking, and answer guardrails with LangChain and FAISS.",
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
    description: "Reference workflow for model registration, quantized inference, canary routing, and drift monitoring using NVIDIA Triton, MLflow, and FastAPI.",
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
    description: "Reference workflow for provisioning cloud infrastructure with Terraform and Kubernetes, with security, cost visibility, and repeatable deployments as design considerations.",
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
    description: "Reference patterns for high-availability operations, including failover design, Prometheus/Grafana telemetry, incident response, and circuit-breaker remediation.",
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
    description: "Reference architecture connecting AI services to reactive client applications through FastAPI, type-safe React interfaces, and WebSocket token streaming.",
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

function CornerTicks() {
  return <><span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-accent/70" /><span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-accent/70" /><span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-accent/70" /><span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-accent/70" /></>;
}

function PipelineConnector({ active, tone, vertical = false }: { active: boolean; tone: DomainTone; vertical?: boolean }) {
  return <div aria-hidden="true" className={`${vertical ? "h-8 w-3" : "h-3 min-w-5 flex-1"} relative overflow-hidden ${toneClasses[tone]}`}>
    <span className={`absolute rounded-full bg-border/80 ${vertical ? "left-1/2 top-0 h-full w-px -translate-x-1/2" : "left-0 top-1/2 h-px w-full -translate-y-1/2"}`} />
    <span className={`absolute ${vertical ? "inset-x-0 top-0 h-10 expertise-signal-vertical" : "inset-y-0 left-0 w-16 expertise-signal"} ${active ? "opacity-100" : "opacity-0"}`} />
    {[0, 1].map((i) => <span key={i} className={`expertise-packet ${vertical ? "left-[calc(50%-2px)] expertise-packet-vertical" : "top-[calc(50%-2px)]"} ${active ? "expertise-packet-hot" : ""}`} style={{ animationDelay: `${i * 1.8}s` }} />)}
  </div>;
}

interface SystemNodeProps {
  item: ExpertiseItem;
  active: boolean;
  onSelect: () => void;
  index: number;
  stacked?: boolean;
  motionPaused: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const SystemNode = forwardRef<HTMLButtonElement, SystemNodeProps>(function SystemNode(
  { item, active, onSelect, index, stacked = false, motionPaused, onKeyDown },
  ref
) {
  const Icon = item.icon;
  const hasNumber = !isTodoOrEmpty(item.number);
  const hasCategory = !isTodoOrEmpty(item.categoryLabel);
  const hasName = !isTodoOrEmpty(item.name);

  return <motion.button ref={ref} type="button" role="tab" id={`expertise-tab-${item.number}`} aria-selected={active} aria-controls={`expertise-panel-${item.number}`} tabIndex={active ? 0 : -1} onClick={onSelect} onKeyDown={onKeyDown} className={`group ${toneClasses[item.tone]} relative flex min-w-0 flex-1 items-center gap-3 border bg-card/60 p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${stacked ? "min-h-[88px] w-full px-4 py-4" : ""} backdrop-blur-md transition-colors duration-300 ${active ? "expertise-domain-border expertise-domain-surface expertise-domain-glow" : "border-border/70 hover:border-accent/50 hover:bg-card"}`} initial={motionPaused ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: motionPaused ? 0 : 0.5, delay: motionPaused ? 0 : index * 0.07, ease: EASE }} whileHover={motionPaused ? undefined : { y: -3 }}>
    {Icon && <span className={`grid h-9 w-9 shrink-0 place-items-center border ${active ? "expertise-domain-border expertise-domain-surface expertise-domain-text" : "border-border text-muted-foreground group-hover:text-foreground"}`}><Icon className="h-4 w-4" strokeWidth={1.6} /></span>}
    <span className="min-w-0 flex-1">
      {(hasNumber || hasCategory) && (
        <span className={`block font-mono ${stacked ? "text-[10px]" : "whitespace-nowrap text-[9px]"} tracking-[0.12em] ${active ? "expertise-domain-text" : "text-muted-foreground"}`}>
          {hasNumber && hasCategory ? `${item.number} / ${item.categoryLabel}` : (hasNumber ? item.number : item.categoryLabel)}
        </span>
      )}
      {hasName && (
        <span className={`mt-1 block font-semibold text-foreground ${stacked ? "text-sm leading-5" : "truncate text-[11px] leading-tight"}`} title={item.name}>
          {item.name}
        </span>
      )}
    </span>
    {stacked && <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 transition-transform ${active ? "rotate-180 expertise-domain-text" : "text-muted-foreground"}`} />}
    {active && <motion.span layoutId={motionPaused ? undefined : stacked ? "active-mobile-node" : "active-node"} className="absolute bottom-0 left-3 right-3 h-px bg-[var(--domain-color)]" />}
  </motion.button>;
});

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

  // Merged, de-duplicated chip row: skills first, then tools not already in skills
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

  const hasProjects = validProjects.length > 0;

  return <motion.div id={id} role="tabpanel" aria-labelledby={`expertise-tab-${item.number}`} key={item.number} className={`${toneClasses[item.tone]} relative overflow-hidden border border-border/80 bg-card/70 backdrop-blur-xl`} initial={motionPaused ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionPaused ? 0 : 0.45, ease: EASE }}>
    <CornerTicks />
    <div className="absolute inset-x-0 top-0 h-px bg-[var(--domain-color)] opacity-70" />

    {/* ── Header: label + name + description ── */}
    <div className="flex min-w-0 gap-3 p-5 sm:p-7">
      {Icon && (
        <span className="grid h-11 w-11 shrink-0 place-items-center border expertise-domain-border expertise-domain-surface expertise-domain-text">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <div className="min-w-0">
        {!isTodoOrEmpty(item.number) && (
          <p className="font-mono text-[10px] tracking-[0.18em] expertise-domain-text">
            {item.number} / {item.categoryLabel}
          </p>
        )}
        {!isTodoOrEmpty(item.name) && (
          <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">{item.name}</h3>
        )}
        {!isTodoOrEmpty(item.description) && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{item.description}</p>
        )}
      </div>
    </div>

    {/* ── Flow diagram ── */}
    {validPipeline.length > 0 && (
      <div className="border-t border-border/70 px-5 py-4 sm:px-7">
        <span className="mb-3 block font-mono text-[10px] tracking-[0.18em] text-muted-foreground">ARCHITECTURE FLOW</span>
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {validPipeline.map((step, index) => (
            <div key={step} className="contents">
              <motion.div
                className={`border px-2.5 py-2 font-mono text-[10px] font-semibold text-foreground transition-colors ${
                  isSimulating && index <= 3 ? "expertise-domain-border expertise-domain-surface" : "border-border/70 bg-background/40"
                }`}
                animate={isSimulating && !motionPaused ? { y: [0, -3, 0] } : { y: 0 }}
                transition={{
                  duration: motionPaused ? 0 : 1.3,
                  repeat: isSimulating && !motionPaused ? Infinity : 0,
                  delay: index * 0.12,
                }}
              >
                {step}
              </motion.div>
              {index < validPipeline.length - 1 && (
                <ArrowRight className="mx-auto h-3 w-3 shrink-0 rotate-90 text-muted-foreground sm:mx-0 sm:rotate-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* ── Metrics panel (compact, muted) ── */}
    {validTelemetry.length > 0 && (
      <div className="border-t border-border/70 px-5 py-3 sm:px-7">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {validTelemetry.map((metric) => (
            <span key={metric.label} className="flex items-baseline gap-1.5">
              <span className="font-mono text-[10px] text-muted-foreground/60">{metric.label}</span>
              <span className="font-mono text-[11px] font-semibold expertise-domain-text opacity-70">{metric.value}</span>
            </span>
          ))}
          <span className="ml-auto font-mono text-[9px] italic text-muted-foreground/40">Illustrative example, not measured data</span>
        </div>
      </div>
    )}

    {/* ── Merged chip row: skills + tools de-duplicated ── */}
    {mergedChips.length > 0 && (
      <div className="border-t border-border/70 px-5 py-4 sm:px-7">
        <ul className="flex flex-wrap gap-2">
          {mergedChips.map((chip) => (
            <li key={chip} className="border border-border bg-background/40 px-2.5 py-1.5 font-mono text-[11px] text-foreground">
              {chip}
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* ── "From my work" project links ── */}
    {hasProjects && (
      <div className="border-t border-border/70 px-5 py-4 sm:px-7">
        <p className="mb-3 font-mono text-[10px] tracking-[0.18em] expertise-domain-text">From my work</p>
        <ul className="flex flex-col gap-1">
          {validProjects.map((project) => (
            <li key={project.url}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                className="group inline-flex min-h-9 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 expertise-domain-text" />
                <span className="font-medium group-hover:underline underline-offset-2">{project.title}</span>
                {!isTodoOrEmpty(project.source) && (
                  <span className="font-mono text-[10px] text-muted-foreground/60">— {project.source}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </motion.div>;
}

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [pauseOverride, setPauseOverride] = useState<boolean | null>(null);
  const [motionPreferenceReady, setMotionPreferenceReady] = useState(false);
  useEffect(() => { setMotionPreferenceReady(true); }, []);
  const motionPaused = pauseOverride ?? (motionPreferenceReady && Boolean(prefersReducedMotion));
  const stageLabel = useMemo(() => motionPaused ? "MOTION PAUSED" : isSimulating ? "SIMULATION RUNNING" : "PIPELINE READY", [isSimulating, motionPaused]);

  // ── Arrow-key navigation for tabs ──
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

  // Cursor-parallax depth
  const rotateX = useSpring(0, { stiffness: 55, damping: 16, mass: 0.6 });
  const rotateY = useSpring(0, { stiffness: 55, damping: 16, mass: 0.6 });
  const stageShiftX = useTransform(rotateY, (value) => value * -1.6);
  const stageShiftY = useTransform(rotateX, (value) => value * 1.4);
  const tiltEnabled = () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)").matches;

  const handleTilt = (event: React.MouseEvent<HTMLDivElement>) => {
    if (motionPaused || !tiltEnabled()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(nx * 5);
    rotateX.set(-ny * 4);
  };
  const resetTilt = () => { rotateX.set(0); rotateY.set(0); };

  useEffect(() => {
    if (!isSimulating || motionPaused) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % EXPERTISE.length), 1500);
    return () => window.clearInterval(timer);
  }, [isSimulating, motionPaused]);

  useEffect(() => {
    if (motionPaused) { rotateX.jump(0); rotateY.jump(0); }
  }, [motionPaused, rotateX, rotateY]);

  // Scroll the active tab into view on mobile when activeIndex changes
  useEffect(() => {
    tabRefs.current[activeIndex]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  const activeItem = EXPERTISE[activeIndex];

  return <section data-motion-paused={motionPaused} id="skills" className="relative z-20 -mt-10 overflow-hidden rounded-t-section border-t border-border bg-v2-recessed px-5 pb-24 pt-16 sm:-mt-12 sm:px-8 sm:pt-24 md:-mt-14" aria-labelledby="expertise-heading">
    <div className="absolute inset-0 blueprint-dots opacity-[0.16]" aria-hidden="true" />
    <div className="relative mx-auto max-w-7xl">
      <BlueprintSectionHeader align="center">
        <div className="mb-10 text-center sm:mb-14">
          <FadeIn delay={0} y={20}>
            <p className="flex items-center justify-center gap-2 font-medium uppercase tracking-[0.25em] text-white/50 text-xs mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
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
              className="mb-4"
            />
          </FadeIn>

          <FadeIn y={16} delay={0.2} duration={0.6} className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Reference architectures for data engineering, GenAI retrieval, model serving, cloud infrastructure, resilient operations, and full-stack AI—paired with illustrative telemetry.
          </FadeIn>
        </div>
      </BlueprintSectionHeader>

      <motion.div className="expertise-canvas relative overflow-hidden border border-border/80 p-3 shadow-[0_20px_80px_hsl(var(--background)/0.45)] [transform-style:preserve-3d] sm:p-5" style={{ rotateX: motionPaused ? 0 : rotateX, rotateY: motionPaused ? 0 : rotateY, transformPerspective: 1400 }} onMouseMove={handleTilt} onMouseLeave={resetTilt}><CornerTicks /><div className="mb-4 flex flex-col gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground"><Activity className="h-3.5 w-3.5 text-accent" />REFERENCE ARCHITECTURE</div><div className="flex flex-col gap-2 sm:flex-row sm:items-center"><span className="font-mono text-[9px] text-muted-foreground">Illustrative simulation</span><div className="flex items-stretch gap-2"><button type="button" aria-label={motionPaused ? "Resume canvas animations" : "Pause canvas animations"} title={motionPaused ? "Resume canvas animations" : "Pause canvas animations"} aria-pressed={motionPaused} onClick={() => setPauseOverride(!motionPaused)} className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-accent/50 bg-accent/10 text-accent hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{motionPaused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}</button><button type="button" onClick={() => { setIsSimulating((value) => !value); }} disabled={motionPaused} className="group inline-flex min-h-11 flex-1 items-center disabled:cursor-not-allowed disabled:opacity-50 justify-center gap-2 border border-accent/50 bg-accent/10 px-3 py-2 font-mono text-[10px] font-semibold tracking-widest text-accent transition-all hover:bg-accent/20 hover:shadow-[0_0_24px_hsl(var(--accent)/0.2)]" aria-pressed={isSimulating}>{isSimulating ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />} {isSimulating ? "PAUSE RUN" : "SIMULATE PIPELINE FLOW"}</button></div></div></div>

        {/* ── Desktop tablist — horizontal with pipeline connectors ── */}
        <motion.div role="tablist" aria-label="Expertise domains" aria-orientation="horizontal" className="hidden items-stretch lg:flex [transform-style:preserve-3d]" style={{ x: motionPaused ? 0 : stageShiftX, y: motionPaused ? 0 : stageShiftY }}>{EXPERTISE.map((item, index) => <div key={item.number} className="contents"><SystemNode ref={(el: HTMLButtonElement | null) => { tabRefs.current[index] = el; }} motionPaused={motionPaused} item={item} active={activeIndex === index} onSelect={() => { setActiveIndex(index); setIsSimulating(false); }} index={index} onKeyDown={(e) => handleTabKeyDown(e, index)} />{index < EXPERTISE.length - 1 && <PipelineConnector active={isSimulating || activeIndex === index} tone={item.tone} />}</div>)}</motion.div>

        {/* ── Mobile tablist — horizontal scroll-snap, no stepper ── */}
        {/*
          - overflow-x-auto on the wrapper clips scroll to this element only,
            preventing the section from widening the page at 375 px.
          - Each tab is scroll-snap-align:start so swiping lands cleanly.
          - Tabs are min-w-[140px] so 2.5 are visible at 375 px, signalling scrollability.
          - The inner ul carries the ARIA tablist role so the row is one landmark.
        */}
        <div className="lg:hidden -mx-3 sm:-mx-5 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul
            role="tablist"
            aria-label="Expertise domains"
            aria-orientation="horizontal"
            className="flex w-max min-w-full gap-1 px-3 sm:px-5 pb-1 [scroll-snap-type:x_mandatory]"
          >
            {EXPERTISE.map((item, index) => {
              const Icon = item.icon;
              const active = activeIndex === index;
              return (
                <li key={item.number} className="[scroll-snap-align:start]" role="presentation">
                  <button
                    ref={(el: HTMLButtonElement | null) => { tabRefs.current[index] = el; }}
                    type="button"
                    role="tab"
                    id={`expertise-tab-${item.number}`}
                    aria-selected={active}
                    aria-controls={`expertise-panel-${item.number}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => { setActiveIndex(index); setIsSimulating(false); }}
                    onKeyDown={(e) => handleTabKeyDown(e, index)}
                    className={`${toneClasses[item.tone]} group relative flex min-h-[72px] min-w-[140px] flex-col items-start gap-1.5 border bg-card/60 px-3 py-3 text-left backdrop-blur-md transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      active
                        ? "expertise-domain-border expertise-domain-surface expertise-domain-glow"
                        : "border-border/70 hover:border-accent/50 hover:bg-card"
                    }`}
                  >
                    <span className={`flex items-center gap-2`}>
                      {Icon && (
                        <span className={`grid h-6 w-6 shrink-0 place-items-center border ${
                          active ? "expertise-domain-border expertise-domain-surface expertise-domain-text" : "border-border text-muted-foreground"
                        }`}>
                          <Icon className="h-3 w-3" strokeWidth={1.6} />
                        </span>
                      )}
                      <span className={`font-mono text-[9px] tracking-[0.12em] ${
                        active ? "expertise-domain-text" : "text-muted-foreground"
                      }`}>{item.number} / {item.categoryLabel}</span>
                    </span>
                    <span className="block text-[11px] font-semibold leading-tight text-foreground line-clamp-2">{item.name}</span>
                    {active && <motion.span layoutId={motionPaused ? undefined : "active-mobile-tab"} className="absolute bottom-0 left-2 right-2 h-px bg-[var(--domain-color)]" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3 font-mono text-[9px] tracking-widest text-muted-foreground"><span className="flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full ${isSimulating ? "animate-ping bg-accent" : "bg-accent"}`} />{stageLabel}</span><span>PIPELINE FLOW / <span className="text-foreground">6 DOMAINS</span></span></div>
      </motion.div>

      {/* ── Single shared inspector (rendered once, shown for active tab) ── */}
      <div className="mt-5">
        {EXPERTISE.map((item, index) => (
          <div key={item.number} id={`expertise-panel-${item.number}`} role="tabpanel" aria-labelledby={`expertise-tab-${item.number}`} hidden={activeIndex !== index}>
            <Inspector motionPaused={motionPaused || activeIndex !== index} item={item} isSimulating={isSimulating && activeIndex === index} id={`expertise-inspector-${item.number}`} />
          </div>
        ))}
      </div>

      <FadeIn y={16} delay={0.2} duration={0.6} className="mt-10 flex justify-center"><a href="#projects" className="group inline-flex items-center gap-3 border border-accent/40 bg-accent/5 px-6 py-3 font-mono text-xs font-semibold tracking-widest text-accent transition-all hover:border-accent hover:bg-accent/10"><span>EXPLORE THE BUILDS</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a></FadeIn>
    </div>
  </section>;
};

export default ServicesSection;
