"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Monitor,
  Pause,
  Play,
  Radio,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import BlueprintSectionHeader from "./BlueprintSectionHeader";
import FadeIn from "./FadeIn";

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
  metrics: { label: string; value: string };
  tone: DomainTone;
  telemetry: { label: string; value: string }[];
  terminal: string[];
}

const EXPERTISE: ExpertiseItem[] = [
  {
    number: "01", categoryLabel: "Data Engineering", name: "Production Data Engineering", spec: "99.9% RELIABILITY · PETABYTE SCALE", icon: Database,
    description: "Built for high-throughput, zero-data-loss ingestion at scale. Designing ultra-reliable, petabyte-scale ETL/ELT pipelines with Apache Airflow & dbt — automated data contracts, strict idempotency, and streaming ingestion into Snowflake & BigQuery.",
    pipeline: ["Kafka Ingest", "Airflow DAG", "dbt Models", "BigQuery"], tags: ["Airflow", "dbt", "BigQuery", "Snowflake", "ETL/ELT"], metrics: { label: "STATUS", value: "OPERATIONAL" }, tone: "cyan",
    telemetry: [{ label: "THROUGHPUT", value: "1.2M EVENTS/S" }, { label: "SCHEMA", value: "ENFORCED" }, { label: "DROPPED", value: "0.00%" }], terminal: ["> airflow dags trigger ingest_prod", "> dbt run --select marts+", "> contract.check() ........ PASS"],
  },
  {
    number: "02", categoryLabel: "GenAI & RAG", name: "Enterprise GenAI & RAG Systems", spec: "SUB-SECOND LATENCY · HYBRID RETRIEVAL", icon: BrainCircuit,
    description: "Hybrid retrieval with grounded, citation-backed responses. Building enterprise-grade GenAI & RAG platforms with sub-second latency, semantic + keyword search fusion, and robust hallucination guardrails using LangChain, FAISS, and cross-encoder reranking.",
    pipeline: ["Query", "Embed", "FAISS Vector", "Rerank", "Grounded LLM"], tags: ["LangChain", "Vector DB", "FAISS", "Guardrails", "Reranking"], metrics: { label: "GROUNDING", value: "VERIFIED" }, tone: "violet",
    telemetry: [{ label: "P99 LATENCY", value: "42 MS" }, { label: "GROUNDING", value: "99.4%" }, { label: "TOP-K", value: "8 DOCS" }], terminal: ["> retriever.search(hybrid=True)", "> reranker.score(cross_encoder)", "> citation_guard ............ PASS"],
  },
  {
    number: "03", categoryLabel: "MLOps", name: "Production MLOps & Model Serving", spec: "AUTOMATED CI/CD · ZERO-DOWNTIME ROLLOUT", icon: GitBranch,
    description: "Low-latency inference with canary rollout and drift monitoring. Operating ML model serving pipelines with zero-downtime deployments, real-time drift detection, and quantized inference via NVIDIA Triton, MLflow, and FastAPI.",
    pipeline: ["Train / Log", "MLflow", "Triton Server", "Canary Route"], tags: ["MLflow", "Triton", "Quantization", "Docker", "Model Registry"], metrics: { label: "ROLLOUT", value: "CANARY ENABLED" }, tone: "amber",
    telemetry: [{ label: "P99 INFERENCE", value: "18 MS" }, { label: "CANARY", value: "10% TRAFFIC" }, { label: "DRIFT", value: "NORMAL" }], terminal: ["> mlflow.register_model(v2.5)", "> triton_client.infer(model)", "> route.canary(traffic=0.1)"],
  },
  {
    number: "04", categoryLabel: "Cloud & IaC", name: "Cloud Topology & IaC", spec: "MULTI-CLOUD AWS/GCP · TERRAFORM AUTOMATION", icon: Cloud,
    description: "100% declarative, multi-cloud ready. Provisioning secure, cost-optimized infrastructure with Terraform & Kubernetes — battle-tested across Tesla, Huawei, and Nokia for 99.99% availability.",
    pipeline: ["Terraform HCL", "State Lock", "K8s Mesh", "Live Cluster"], tags: ["Terraform", "AWS", "GCP", "Kubernetes", "FinOps"], metrics: { label: "ORCHESTRATION", value: "100% DECLARATIVE" }, tone: "sky",
    telemetry: [{ label: "AVAILABILITY", value: "99.99%" }, { label: "PODS", value: "12 / 12 READY" }, { label: "STATE", value: "SYNCED" }], terminal: ["> terraform plan -out=prod.tfplan", "> kubectl rollout status deploy/mesh", "> policy.guard .............. PASS"],
  },
  {
    number: "05", categoryLabel: "Mission-Critical", name: "Mission-Critical Ops & High Availability", spec: "24/7 GOC SLA · ZERO SINGLE POINT OF FAILURE", icon: Radio,
    description: "High-availability operations with self-healing failover design. 5+ years directing enterprise NOC & telecom backbones — automated failovers, real-time Prometheus/Grafana telemetry, and circuit-breaker remediation at scale.",
    pipeline: ["Prometheus", "Telemetry", "Circuit Breaker", "Auto-Heal"], tags: ["High Availability", "Prometheus", "Grafana", "Incident SRE", "Failover"], metrics: { label: "AVAILABILITY", value: "SELF-HEALING" }, tone: "rose",
    telemetry: [{ label: "UPTIME", value: "99.99%" }, { label: "MTTR", value: "< 8 MIN" }, { label: "FAILOVER", value: "ARMED" }], terminal: ["> alertmanager.route(severity)", "> circuit_breaker.trip()", "> failover.recover ........ PASS"],
  },
  {
    number: "06", categoryLabel: "Full-Stack AI", name: "Full-Stack AI Interfaces", spec: "REACTIVE STREAMING · ASYNC MICROSERVICES", icon: Monitor,
    description: "Real-time token streaming over WebSocket with async microservices. Bridging AI backends with reactive client apps via FastAPI, type-safe React/Next.js frontends, and low-latency WebSocket streaming pipelines.",
    pipeline: ["FastAPI RPC", "WebSocket", "React State", "Edge Render"], tags: ["FastAPI", "React", "Next.js", "TypeScript", "WebSocket"], metrics: { label: "STREAMING", value: "REAL-TIME" }, tone: "emerald",
    telemetry: [{ label: "STREAM", value: "LIVE" }, { label: "SOCKETS", value: "2.4K ACTIVE" }, { label: "FRAME", value: "16 MS" }], terminal: ["> await socket.accept()", "> tokens.emit(chunk)", "> render.commit ............ PASS"],
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

function SystemNode({ item, active, onSelect, index }: { item: ExpertiseItem; active: boolean; onSelect: () => void; index: number }) {
  const Icon = item.icon;
  return <motion.button type="button" onClick={onSelect} aria-label={`${item.number} ${item.name}`} aria-pressed={active} className={`group ${toneClasses[item.tone]} relative flex min-w-0 flex-1 items-center gap-3 border bg-card/60 p-3 text-left backdrop-blur-md transition-colors duration-300 ${active ? "expertise-domain-border expertise-domain-surface expertise-domain-glow" : "border-border/70 hover:border-accent/50 hover:bg-card"}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }} whileHover={{ y: -3 }}>
    <span className={`grid h-9 w-9 shrink-0 place-items-center border ${active ? "expertise-domain-border expertise-domain-surface expertise-domain-text" : "border-border text-muted-foreground group-hover:text-foreground"}`}><Icon className="h-4 w-4" strokeWidth={1.6} /></span>
    <span className="min-w-0"><span className={`block whitespace-nowrap font-mono text-[9px] tracking-[0.12em] ${active ? "expertise-domain-text" : "text-muted-foreground"}`}>{item.number} / {item.categoryLabel}</span><span className="mt-1 block truncate text-[11px] font-semibold leading-tight text-foreground" title={item.name}>{item.name}</span></span>
    {active && <motion.span layoutId="active-node" className="absolute bottom-0 left-3 right-3 h-px bg-[var(--domain-color)]" />}
  </motion.button>;
}

function Inspector({ item, isSimulating }: { item: ExpertiseItem; isSimulating: boolean }) {
  const [tab, setTab] = useState<InspectorTab>("system");
  const Icon = item.icon;
  return <motion.div key={item.number} className={`${toneClasses[item.tone]} relative overflow-hidden border border-border/80 bg-card/70 backdrop-blur-xl`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: EASE }}>
    <CornerTicks />
    <div className="absolute inset-x-0 top-0 h-px bg-[var(--domain-color)] opacity-70" />
    <div className="flex flex-col gap-4 border-b border-border/70 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-7">
      <div className="flex gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center border expertise-domain-border expertise-domain-surface expertise-domain-text"><Icon className="h-5 w-5" /></span><div><p className="font-mono text-[10px] tracking-[0.18em] expertise-domain-text">ACTIVE SYSTEM INSPECTOR / {item.number}</p><h3 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">{item.name}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{item.description}</p></div></div>
      <div className="flex shrink-0 items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />{isSimulating ? "FLOWING" : item.metrics.value}</div>
    </div>
    <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="border-b border-border/70 p-5 sm:p-7 lg:border-b-0 lg:border-r"><div className="mb-4 flex items-center justify-between"><span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">ARCHITECTURE FLOW</span><span className="font-mono text-[10px] expertise-domain-text">{item.spec}</span></div><div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">{item.pipeline.map((step, index) => <div key={step} className="contents"><motion.div className={`border px-2.5 py-2 font-mono text-[10px] font-semibold text-foreground transition-colors ${isSimulating && index <= 3 ? "expertise-domain-border expertise-domain-surface" : "border-border/70 bg-background/40"}`} animate={isSimulating ? { y: [0, -3, 0] } : { y: 0 }} transition={{ duration: 1.3, repeat: isSimulating ? Infinity : 0, delay: index * 0.12 }}>{step}</motion.div>{index < item.pipeline.length - 1 && <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />}</div>)}</div><div className="mt-6 grid grid-cols-3 gap-2">{item.telemetry.map((metric) => <div key={metric.label} className="border border-border/70 bg-background/40 p-3"><span className="block truncate font-mono text-[9px] tracking-widest text-muted-foreground">{metric.label}</span><span className="mt-2 block font-mono text-xs font-bold expertise-domain-text">{metric.value}</span></div>)}</div></div>
      <div className="min-w-0 p-5 sm:p-7"><div className="mb-4 flex items-center justify-between"><div className="flex gap-1 border-b border-border/70"><button type="button" onClick={() => setTab("system")} className={`border-b-2 px-2 pb-2 font-mono text-[10px] tracking-widest transition-colors ${tab === "system" ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>SYSTEM</button><button type="button" onClick={() => setTab("terminal")} className={`border-b-2 px-2 pb-2 font-mono text-[10px] tracking-widest transition-colors ${tab === "terminal" ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>TERMINAL</button></div><Terminal className="h-4 w-4 text-muted-foreground" /></div><AnimatePresence mode="wait"><motion.div key={tab} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.2 }} className="min-h-[130px] font-mono text-[11px] leading-7">{tab === "system" ? <div className="space-y-3"><div className="flex items-center gap-2 expertise-domain-text"><ShieldCheck className="h-4 w-4" />PRODUCTION GRADE</div><p className="text-muted-foreground">{item.metrics.label}: <span className="text-foreground">{item.metrics.value}</span></p><p className="text-muted-foreground">deployment: <span className="expertise-domain-text">zero-downtime</span></p><p className="text-muted-foreground">guardrails: <span className="expertise-domain-text">enabled</span></p></div> : <div className="rounded border border-border/70 bg-background/70 p-3 text-muted-foreground">{item.terminal.map((line) => <div key={line}><span className="mr-2 expertise-domain-text">›</span>{line.replace(/^&gt; /, "")}</div>)}</div>}</motion.div></AnimatePresence></div>
    </div>
  </motion.div>;
}

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const activeItem = EXPERTISE[activeIndex];
  const activeTone = activeItem.tone;
  const stageLabel = useMemo(() => isSimulating ? "SIMULATION RUNNING" : "SYSTEM READY", [isSimulating]);

  useEffect(() => {
    if (!isSimulating) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % EXPERTISE.length), 1500);
    return () => window.clearInterval(timer);
  }, [isSimulating]);

  return <section id="skills" className="relative z-20 -mt-10 overflow-hidden rounded-t-section border-t border-border bg-v2-recessed px-5 pb-24 pt-16 sm:-mt-12 sm:px-8 sm:pt-24 md:-mt-14" aria-labelledby="expertise-heading">
    <div className="absolute inset-0 blueprint-dots opacity-[0.16]" aria-hidden="true" />
    <div className="relative mx-auto max-w-7xl">
      <BlueprintSectionHeader align="center"><div className="mb-10 text-center sm:mb-14"><motion.div initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="eyebrow justify-center">SYSTEM CLUSTER <span className="text-muted-foreground">/ 06 PRODUCTION DOMAINS</span></motion.div><motion.h2 id="expertise-heading" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08, ease: EASE }} className="mt-4 text-5xl font-black leading-none tracking-tighter text-foreground sm:text-7xl">My <span className="accent-serif text-accent">Expertise.</span></motion.h2><FadeIn y={16} delay={0.2} duration={0.6} className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Battle-tested data engineering pipelines, low-latency GenAI retrieval systems, and high-availability cloud architecture engineered to hold up under real-world production scale.</FadeIn></div></BlueprintSectionHeader>

      <div className="expertise-canvas relative overflow-hidden border border-border/80 p-3 shadow-[0_20px_80px_hsl(var(--background)/0.45)] sm:p-5"><CornerTicks /><div className="mb-4 flex flex-col gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground"><Activity className="h-3.5 w-3.5 text-accent" />END-TO-END PRODUCTION TOPOLOGY</div><button type="button" onClick={() => setIsSimulating((value) => !value)} className="group inline-flex items-center justify-center gap-2 border border-accent/50 bg-accent/10 px-3 py-2 font-mono text-[10px] font-semibold tracking-widest text-accent transition-all hover:bg-accent/20 hover:shadow-[0_0_24px_hsl(var(--accent)/0.2)]" aria-pressed={isSimulating}>{isSimulating ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />} {isSimulating ? "PAUSE RUN" : "SIMULATE PIPELINE FLOW"}</button></div>
        <div className="hidden items-stretch lg:flex">{EXPERTISE.map((item, index) => <div key={item.number} className="contents"><SystemNode item={item} active={activeIndex === index} onSelect={() => { setActiveIndex(index); setIsSimulating(false); }} index={index} />{index < EXPERTISE.length - 1 && <PipelineConnector active={isSimulating || activeIndex === index} tone={item.tone} />}</div>)}</div>
        <div className="flex flex-col lg:hidden">{EXPERTISE.map((item, index) => <div key={item.number} className="flex flex-col items-stretch"><SystemNode item={item} active={activeIndex === index} onSelect={() => { setActiveIndex(index); setIsSimulating(false); }} index={index} />{index < EXPERTISE.length - 1 && <div className="flex justify-center"><PipelineConnector vertical active={isSimulating || activeIndex === index} tone={item.tone} /></div>}</div>)}</div>
        <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-3 font-mono text-[9px] tracking-widest text-muted-foreground"><span className="flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full ${isSimulating ? "animate-ping bg-accent" : "bg-accent"}`} />{stageLabel}</span><span>LATENCY BUDGET / <span className="text-foreground">&lt; 50 MS</span></span></div>
      </div>

      <div className="mt-5"><Inspector item={activeItem} isSimulating={isSimulating} /></div>
      <FadeIn y={16} delay={0.2} duration={0.6} className="mt-10 flex justify-center"><a href="#projects" className="group inline-flex items-center gap-3 border border-accent/40 bg-accent/5 px-6 py-3 font-mono text-xs font-semibold tracking-widest text-accent transition-all hover:border-accent hover:bg-accent/10"><span>EXPLORE THE BUILDS</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a></FadeIn>
    </div>
  </section>;
};

export default ServicesSection;
