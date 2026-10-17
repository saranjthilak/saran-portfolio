"use client";

import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  ArrowDown,
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
  ShieldCheck,
  Terminal,
} from "lucide-react";
import BlueprintSectionHeader from "./BlueprintSectionHeader";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { projects } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;

type DomainTone = "cyan" | "violet" | "amber" | "sky" | "rose" | "emerald";
type InspectorTab = "system" | "terminal";

interface ExpertiseItem {
  number: string;
  categoryLabel: string;
  name: string;
  spec: string;
  icon: LucideIcon;
  description: string;
  pipeline: string[];
  tags: string[];
  skills: string[];
  projectRepos: string[];
  metrics: { label: string; value: string };
  inspectorNote?: string;
  tone: DomainTone;
  telemetry: { label: string; value: string }[];
  terminal: string[];
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
    spec: "REFERENCE PATTERN · STREAMING INGESTION",
    icon: Database,
    description: "Reference architecture for resilient ETL/ELT pipelines with Apache Airflow and dbt, including data contracts, idempotent processing, and streaming ingestion into analytical warehouses.",
    pipeline: ["Kafka Ingest", "Airflow DAG", "dbt Models", "BigQuery"],
    tags: ["Airflow", "dbt", "BigQuery", "Snowflake", "ETL/ELT"],
    metrics: { label: "SCENARIO", value: "STREAMING INGEST" },
    tone: "cyan",
    telemetry: [{ label: "THROUGHPUT", value: "1.2M EVENTS/S" }, { label: "SCHEMA", value: "ENFORCED" }, { label: "DROPPED", value: "0.00%" }],
    terminal: ["> airflow dags trigger ingest_reference", "> dbt run --select marts+", "> contract.check() ........ PASS"],
  },
  {
    number: "02",
    skills: ["Hybrid retrieval", "Multimodal embeddings", "Citation grounding", "Hallucination guardrails"],
    projectRepos: ["Multimodel_RAG", "Car-Manual-RAG-Assistant"],
    categoryLabel: "GenAI & RAG",
    name: "GenAI & RAG Systems",
    spec: "REFERENCE PATTERN · HYBRID RETRIEVAL",
    icon: BrainCircuit,
    description: "Reference architecture for grounded, citation-backed responses, combining semantic and keyword retrieval, cross-encoder reranking, and answer guardrails with LangChain and FAISS.",
    pipeline: ["Query", "Embed", "FAISS Vector", "Rerank", "Grounded LLM"],
    tags: ["LangChain", "Vector DB", "FAISS", "Guardrails", "Reranking"],
    metrics: { label: "DESIGN FOCUS", value: "CITATION GROUNDING" },
    tone: "violet",
    telemetry: [{ label: "P99 LATENCY", value: "42 MS" }, { label: "GROUNDING", value: "99.4%" }, { label: "TOP-K", value: "8 DOCS" }],
    terminal: ["> retriever.search(hybrid=True)", "> reranker.score(cross_encoder)", "> citation_guard ............ PASS"],
  },
  {
    number: "03",
    skills: ["Model serving", "Quantized inference", "Canary deployments", "Drift monitoring"],
    projectRepos: ["ai_poduct_matching"],
    categoryLabel: "MLOps",
    name: "Model Operations & Serving",
    spec: "MODEL REGISTRY · CANARY ROLLOUT",
    icon: GitBranch,
    description: "Reference workflow for model registration, quantized inference, canary routing, and drift monitoring using NVIDIA Triton, MLflow, and FastAPI.",
    pipeline: ["Train / Log", "MLflow", "Triton Server", "Canary Route"],
    tags: ["MLflow", "Triton", "Quantization", "Docker", "Model Registry"],
    metrics: { label: "DESIGN FOCUS", value: "CANARY ROLLOUT" },
    tone: "amber",
    telemetry: [{ label: "P99 INFERENCE", value: "18 MS" }, { label: "CANARY", value: "10% TRAFFIC" }, { label: "DRIFT", value: "NORMAL" }],
    terminal: ["> mlflow.register_model(v2.5)", "> triton_client.infer(model)", "> route.canary(traffic=0.1)"],
  },
  {
    number: "04",
    skills: ["Infrastructure as code", "Multi-cloud provisioning", "Container orchestration", "Cost optimization"],
    projectRepos: ["Divvy-Bike-Data-End-to-End-Pipeline", "vanilla-steel-assessment"],
    categoryLabel: "Cloud & IaC",
    name: "Cloud Topology & IaC",
    spec: "MULTI-CLOUD · TERRAFORM AUTOMATION",
    icon: Cloud,
    description: "Reference workflow for provisioning cloud infrastructure with Terraform and Kubernetes, with security, cost visibility, and repeatable deployments as design considerations.",
    pipeline: ["Terraform HCL", "State Lock", "K8s Mesh", "Live Cluster"],
    tags: ["Terraform", "AWS", "GCP", "Kubernetes", "FinOps"],
    metrics: { label: "DESIGN FOCUS", value: "DECLARATIVE INFRASTRUCTURE" },
    tone: "sky",
    telemetry: [{ label: "AVAILABILITY", value: "99.99%" }, { label: "PODS", value: "12 / 12 READY" }, { label: "STATE", value: "SYNCED" }],
    terminal: ["> terraform plan -out=prod.tfplan", "> kubectl rollout status deploy/mesh", "> policy.guard .............. PASS"],
  },
  {
    number: "05",
    skills: ["Incident response", "Failover design", "SLA operations", "Infrastructure monitoring"],
    projectRepos: [],
    categoryLabel: "Mission-Critical",
    name: "Mission-Critical Ops & High Availability",
    spec: "INCIDENT RESPONSE · FAILOVER DESIGN",
    icon: Radio,
    description: "Reference patterns for high-availability operations, including failover design, Prometheus/Grafana telemetry, incident response, and circuit-breaker remediation.",
    pipeline: ["Prometheus", "Telemetry", "Circuit Breaker", "Auto-Heal"],
    tags: ["High Availability", "Prometheus", "Grafana", "Incident SRE", "Failover"],
    metrics: { label: "DESIGN FOCUS", value: "FAILOVER READINESS" },
    tone: "rose",
    telemetry: [{ label: "UPTIME", value: "99.99%" }, { label: "MTTR", value: "< 8 MIN" }, { label: "FAILOVER", value: "ARMED" }],
    terminal: ["> alertmanager.route(severity)", "> circuit_breaker.trip()", "> failover.recover ........ PASS"],
  },
  {
    number: "06",
    skills: ["Reactive interfaces", "Async APIs", "Token streaming", "Type-safe development"],
    projectRepos: ["German-Learning-APP", "vanilla-steel-assessment"],
    categoryLabel: "Full-Stack AI",
    name: "Full-Stack AI Interfaces",
    spec: "REACTIVE STREAMING · ASYNC APIS",
    icon: Monitor,
    description: "Reference architecture connecting AI services to reactive client applications through FastAPI, type-safe React interfaces, and WebSocket token streaming.",
    pipeline: ["FastAPI RPC", "WebSocket", "React State", "Edge Render"],
    tags: ["FastAPI", "React", "Next.js", "TypeScript", "WebSocket"],
    metrics: { label: "DESIGN FOCUS", value: "TOKEN STREAMING" },
    tone: "emerald",
    telemetry: [{ label: "STREAM", value: "LIVE" }, { label: "SOCKETS", value: "2.4K ACTIVE" }, { label: "FRAME", value: "16 MS" }],
    terminal: ["> await socket.accept()", "> tokens.emit(chunk)", "> render.commit ............ PASS"],
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
    () => (item.telemetry ?? []).filter((metric) => !isTodoOrEmpty(metric.label) && !isTodoOrEmpty(metric.value)),
    [item.telemetry]
  );

  const validTerminal = useMemo(
    () => (item.terminal ?? []).filter((line) => !isTodoOrEmpty(line)),
    [item.terminal]
  );

  const validSkills = useMemo(
    () => (item.skills ?? []).filter((skill) => !isTodoOrEmpty(skill)),
    [item.skills]
  );

  const validTags = useMemo(
    () => (item.tags ?? []).filter((tool) => !isTodoOrEmpty(tool)),
    [item.tags]
  );

  const validProjects = useMemo(() => {
    return (item.projectRepos ?? [])
      .filter((repo) => !isTodoOrEmpty(repo))
      .map((repo) => projects.find((candidate) => candidate.url.split("/").pop() === repo))
      .filter((project): project is NonNullable<typeof project> => Boolean(project));
  }, [item.projectRepos]);

  const hasSystemMetric = !isTodoOrEmpty(item.metrics?.label) && !isTodoOrEmpty(item.metrics?.value);
  const hasInspectorNote = !isTodoOrEmpty(item.inspectorNote);
  const hasSystemContent = hasSystemMetric || hasInspectorNote;
  const hasTerminalContent = validTerminal.length > 0;

  const [tab, setTab] = useState<InspectorTab>(() => (hasSystemContent ? "system" : "terminal"));

  useEffect(() => {
    if (tab === "system" && !hasSystemContent && hasTerminalContent) {
      setTab("terminal");
    } else if (tab === "terminal" && !hasTerminalContent && hasSystemContent) {
      setTab("system");
    }
  }, [hasSystemContent, hasTerminalContent, tab]);

  const hasLeft = validSkills.length > 0 || validTags.length > 0;
  const hasProjects = validProjects.length > 0;

  return <motion.div id={id} role="tabpanel" aria-labelledby={`expertise-tab-${item.number}`} key={item.number} className={`${toneClasses[item.tone]} relative overflow-hidden border border-border/80 bg-card/70 backdrop-blur-xl`} initial={motionPaused ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionPaused ? 0 : 0.45, ease: EASE }}>
    <CornerTicks />
    <div className="absolute inset-x-0 top-0 h-px bg-[var(--domain-color)] opacity-70" />
    <div className="flex flex-col gap-4 border-b border-border/70 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-7">
      <div className="flex min-w-0 gap-3">
        {Icon && (
          <span className="grid h-11 w-11 shrink-0 place-items-center border expertise-domain-border expertise-domain-surface expertise-domain-text">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div className="min-w-0">
          {!isTodoOrEmpty(item.number) && (
            <p className="font-mono text-[10px] tracking-[0.18em] expertise-domain-text">
              ACTIVE SYSTEM INSPECTOR / {item.number}
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
      {(isSimulating || !isTodoOrEmpty(item.metrics?.value)) && (
        <div className="flex shrink-0 items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {isSimulating ? "FLOWING" : item.metrics.value}
        </div>
      )}
    </div>
    <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="border-b border-border/70 p-5 sm:p-7 lg:border-b-0 lg:border-r">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">ARCHITECTURE FLOW</span>
          {!isTodoOrEmpty(item.spec) && (
            <span className="font-mono text-[10px] expertise-domain-text">{item.spec}</span>
          )}
        </div>
        {validPipeline.length > 0 && (
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
        )}
        {validTelemetry.length > 0 && (
          <>
            <div className="mt-6 flex items-center justify-between gap-3">
              <span className="font-mono text-[9px] tracking-widest text-muted-foreground">METRICS PANEL</span>
              <span className="font-mono text-[9px] text-muted-foreground">Illustrative simulation</span>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {validTelemetry.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between gap-2 border border-border/70 bg-background/40 p-3 sm:block">
                  <span className="block font-mono text-[9px] tracking-widest text-muted-foreground">{metric.label}</span>
                  <span className="block font-mono text-xs sm:mt-2 font-bold expertise-domain-text">{metric.value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {(hasSystemContent || hasTerminalContent) && (
        <div className="min-w-0 p-5 sm:p-7">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-1 border-b border-border/70">
              {hasSystemContent && (
                <button
                  type="button"
                  onClick={() => setTab("system")}
                  className={`min-h-11 border-b-2 px-3 pb-2 font-mono text-[10px] tracking-widest transition-colors ${
                    tab === "system" ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  SYSTEM
                </button>
              )}
              {hasTerminalContent && (
                <button
                  type="button"
                  onClick={() => setTab("terminal")}
                  className={`min-h-11 border-b-2 px-3 pb-2 font-mono text-[10px] tracking-widest transition-colors ${
                    tab === "terminal" ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  TERMINAL
                </button>
              )}
            </div>
            <Terminal className="h-4 w-4 text-muted-foreground" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={motionPaused ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={motionPaused ? undefined : { opacity: 0, x: -8 }}
              transition={{ duration: motionPaused ? 0 : 0.2 }}
              className="min-h-[130px] font-mono text-[11px] leading-7"
            >
              {tab === "system" && hasSystemContent ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 expertise-domain-text">
                    <ShieldCheck className="h-4 w-4" />REFERENCE ARCHITECTURE
                  </div>
                  {hasSystemMetric && (
                    <p className="text-muted-foreground">
                      {item.metrics.label}: <span className="text-foreground">{item.metrics.value}</span>
                    </p>
                  )}
                  {hasInspectorNote && (
                    <p className="text-muted-foreground">{item.inspectorNote}</p>
                  )}
                </div>
              ) : (
                <div className="rounded border border-border/70 bg-background/70 p-3 text-muted-foreground break-words [overflow-wrap:anywhere]">
                  {validTerminal.map((line) => (
                    <div key={line}>
                      <span className="mr-2 expertise-domain-text">›</span>
                      {line.replace(/^&gt; /, "")}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>

    {(hasLeft || hasProjects) && (
      <div className={`grid border-t border-border/70 ${hasLeft && hasProjects ? "lg:grid-cols-[0.8fr_1.2fr]" : "grid-cols-1"}`}>
        {hasLeft && (
          <div className={`space-y-6 p-5 sm:p-7 ${hasProjects ? "border-b border-border/70 lg:border-b-0 lg:border-r" : ""}`}>
            {validSkills.length > 0 && (
              <div>
                <h4 className="font-mono text-[10px] tracking-widest expertise-domain-text">RELATED SKILLS</h4>
                <ul className="mt-3 grid gap-2 text-sm text-foreground">
                  {validSkills.map((skill) => (
                    <li key={skill} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-accent" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {validTags.length > 0 && (
              <div>
                <h4 className="font-mono text-[10px] tracking-widest expertise-domain-text">TOOLS & TECHNOLOGIES</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {validTags.map((tool) => (
                    <li key={tool} className="border border-border bg-background/40 px-2.5 py-2 font-mono text-[11px] text-foreground">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {hasProjects && (
          <div className="min-w-0 p-5 sm:p-7">
            <h4 className="font-mono text-[10px] tracking-widest expertise-domain-text">RELATED PROJECT EXAMPLES</h4>
            <div className="mt-3 divide-y divide-border/70">
              {validProjects.map((project) => (
                <a
                  key={project.url}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  className="group flex min-h-11 items-start gap-3 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {!isTodoOrEmpty(project.image) && (
                    <img
                      src={project.image}
                      alt=""
                      loading="lazy"
                      className="h-14 w-16 shrink-0 border border-border object-cover sm:h-16 sm:w-24"
                    />
                  )}
                  <span className="min-w-0 flex-1">
                    {!isTodoOrEmpty(project.title) && (
                      <span className="block text-sm font-semibold leading-5 text-foreground group-hover:text-accent">
                        {project.title}
                      </span>
                    )}
                    {!isTodoOrEmpty(project.source) && (
                      <span className="mt-1 block font-mono text-[10px] leading-5 text-muted-foreground">
                        {project.source}
                      </span>
                    )}
                    {!isTodoOrEmpty(project.description) && (
                      <span className="mt-2 block text-xs leading-5 text-muted-foreground">
                        {project.description}
                      </span>
                    )}
                  </span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 expertise-domain-text" />
                </a>
              ))}
            </div>
          </div>
        )}
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
  const stageLabel = useMemo(() => motionPaused ? "MOTION PAUSED" : isSimulating ? "SIMULATION RUNNING" : "SYSTEM READY", [isSimulating, motionPaused]);

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
      // Focus the new tab — find it in both desktop and mobile refs
      tabRefs.current[nextIndex]?.focus();
    }
  }, []);

  // Cursor-parallax depth: the canvas tilts subtly toward the cursor while the
  // node stage counter-shifts, creating a layered control-room feel.
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

  const activeItem = EXPERTISE[activeIndex];

  return <section data-motion-paused={motionPaused} id="skills" className="relative z-20 -mt-10 overflow-hidden rounded-t-section border-t border-border bg-v2-recessed px-5 pb-24 pt-16 sm:-mt-12 sm:px-8 sm:pt-24 md:-mt-14" aria-labelledby="expertise-heading">
    <div className="absolute inset-0 blueprint-dots opacity-[0.16]" aria-hidden="true" />
    <div className="relative mx-auto max-w-7xl">
      <BlueprintSectionHeader align="center">
        <div className="mb-10 text-center sm:mb-14">
          {/* Eyebrow — matches Experience section style */}
          <FadeIn delay={0} y={20}>
            <p className="flex items-center justify-center gap-2 font-medium uppercase tracking-[0.25em] text-white/50 text-xs mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
              Expertise
            </p>
          </FadeIn>

          {/* Heading — reuses SectionHeading exactly as Experience section does */}
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

          {/* Subtitle */}
          <FadeIn y={16} delay={0.2} duration={0.6} className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Reference architectures for data engineering, GenAI retrieval, model serving, cloud infrastructure, resilient operations, and full-stack AI—paired with illustrative telemetry.
          </FadeIn>
        </div>
      </BlueprintSectionHeader>

      <motion.div className="expertise-canvas relative overflow-hidden border border-border/80 p-3 shadow-[0_20px_80px_hsl(var(--background)/0.45)] [transform-style:preserve-3d] sm:p-5" style={{ rotateX: motionPaused ? 0 : rotateX, rotateY: motionPaused ? 0 : rotateY, transformPerspective: 1400 }} onMouseMove={handleTilt} onMouseLeave={resetTilt}><CornerTicks /><div className="mb-4 flex flex-col gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground"><Activity className="h-3.5 w-3.5 text-accent" />REFERENCE ARCHITECTURE</div><div className="flex flex-col gap-2 sm:flex-row sm:items-center"><span className="font-mono text-[9px] text-muted-foreground">Illustrative simulation</span><div className="flex items-stretch gap-2"><button type="button" aria-label={motionPaused ? "Resume canvas animations" : "Pause canvas animations"} title={motionPaused ? "Resume canvas animations" : "Pause canvas animations"} aria-pressed={motionPaused} onClick={() => setPauseOverride(!motionPaused)} className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-accent/50 bg-accent/10 text-accent hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{motionPaused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}</button><button type="button" onClick={() => { setIsSimulating((value) => !value); }} disabled={motionPaused} className="group inline-flex min-h-11 flex-1 items-center disabled:cursor-not-allowed disabled:opacity-50 justify-center gap-2 border border-accent/50 bg-accent/10 px-3 py-2 font-mono text-[10px] font-semibold tracking-widest text-accent transition-all hover:bg-accent/20 hover:shadow-[0_0_24px_hsl(var(--accent)/0.2)]" aria-pressed={isSimulating}>{isSimulating ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />} {isSimulating ? "PAUSE RUN" : "SIMULATE PIPELINE FLOW"}</button></div></div></div>

        {/* ── Desktop tablist (horizontal) ── */}
        <motion.div role="tablist" aria-label="Expertise domains" aria-orientation="horizontal" className="hidden items-stretch lg:flex [transform-style:preserve-3d]" style={{ x: motionPaused ? 0 : stageShiftX, y: motionPaused ? 0 : stageShiftY }}>{EXPERTISE.map((item, index) => <div key={item.number} className="contents"><SystemNode ref={(el: HTMLButtonElement | null) => { tabRefs.current[index] = el; }} motionPaused={motionPaused} item={item} active={activeIndex === index} onSelect={() => { setActiveIndex(index); setIsSimulating(false); }} index={index} onKeyDown={(e) => handleTabKeyDown(e, index)} />{index < EXPERTISE.length - 1 && <PipelineConnector active={isSimulating || activeIndex === index} tone={item.tone} />}</div>)}</motion.div>

        {/* ── Mobile tablist (vertical, stacked with inline connectors) ── */}
        <div role="tablist" aria-label="Expertise domains" aria-orientation="vertical" className="flex flex-col lg:hidden">
          {EXPERTISE.map((item, index) => {
            const nextItem = EXPERTISE[index + 1];
            return <div key={item.number} className="flex min-w-0 flex-col items-stretch">
              <SystemNode motionPaused={motionPaused} stacked item={item} active={activeIndex === index} onSelect={() => { setActiveIndex(index); setIsSimulating(false); }} index={index} onKeyDown={(e) => handleTabKeyDown(e, index)} />
              {nextItem && <button type="button" aria-label={`Connect ${item.categoryLabel} to ${nextItem.categoryLabel}`} onClick={() => { setActiveIndex(index + 1); setIsSimulating(false); }} className={`${toneClasses[item.tone]} group relative flex min-h-12 w-full items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}>
                <PipelineConnector vertical active={isSimulating || activeIndex === index} tone={item.tone} />
                <span className="absolute left-[calc(50%+14px)] flex items-center gap-2 font-mono text-[9px] text-muted-foreground group-hover:text-foreground"><ArrowDown aria-hidden="true" className="h-3 w-3 expertise-domain-text" />{item.number} → {nextItem.number}</span>
              </button>}
            </div>;
          })}
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
