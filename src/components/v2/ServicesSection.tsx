"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import BlueprintSectionHeader from "./BlueprintSectionHeader";
import {
  Database,
  BrainCircuit,
  GitBranch,
  Cloud,
  Radio,
  Monitor,
  Activity,
  ShieldCheck,
  Zap,
  Cpu,
  Server,
  RotateCcw,
} from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

// ── Domain Color System ───────────────────────────────────────────────────────
// Each expertise domain gets a unique color identity instead of uniform green
const DOMAIN_COLORS = {
  data:  { primary: "#06b6d4", rgb: "6,182,212" },
  ai:    { primary: "#a78bfa", rgb: "167,139,250" },
  mlops: { primary: "#f59e0b", rgb: "245,158,11" },
  cloud: { primary: "#38bdf8", rgb: "56,189,248" },
  ops:   { primary: "#f43f5e", rgb: "244,63,94" },
  ui:    { primary: "#10b981", rgb: "16,185,129" },
} as const;
type DomainColor = (typeof DOMAIN_COLORS)[keyof typeof DOMAIN_COLORS];

type Category = "all" | "data-ai" | "cloud-sre" | "fullstack";

interface ExpertiseItem {
  number: string;
  category: "data-ai" | "cloud-sre" | "fullstack";
  categoryLabel: string;
  name: string;
  spec: string;
  icon: typeof Database;
  description: string;
  pipeline: string[];
  tags: string[];
  metrics: { label: string; value: string };
  visualizerType: keyof typeof DOMAIN_COLORS;
  heroSpan?: boolean;
}

// ── Expertise Data ────────────────────────────────────────────────────────────
const EXPERTISE: ExpertiseItem[] = [
  {
    number: "01",
    category: "data-ai",
    categoryLabel: "Data Engineering",
    name: "Production Data Engineering",
    spec: "99.9% RELIABILITY · PETABYTE SCALE",
    icon: Database,
    description:
      "Architecting fault-tolerant ETL/ELT pipelines with Apache Airflow & dbt. Delivering automated data contracts, strict idempotency schemas, and high-throughput ingestion into Snowflake & BigQuery designed to withstand massive real-time volume.",
    pipeline: ["Kafka Ingest", "Airflow DAG", "dbt Models", "BigQuery"],
    tags: ["Airflow", "dbt", "BigQuery", "Snowflake", "ETL/ELT"],
    metrics: { label: "THROUGHPUT", value: "48.2 GB/s" },
    visualizerType: "data",
    heroSpan: true,
  },
  {
    number: "02",
    category: "data-ai",
    categoryLabel: "GenAI & RAG",
    name: "Enterprise GenAI & RAG Systems",
    spec: "SUB-SECOND LATENCY · HYBRID RETRIEVAL",
    icon: BrainCircuit,
    description:
      "Engineering grounded conversational systems end-to-end with LangChain, FAISS, and hybrid sparse/dense vector search. Hardened with multi-stage hallucination guardrails, cross-encoder reranking, and verified citation traces.",
    pipeline: ["Vectorize", "FAISS Index", "Reranker", "Grounded LLM"],
    tags: ["LangChain", "Vector DB", "FAISS", "Guardrails", "Reranking"],
    metrics: { label: "RETRIEVAL COSINE", value: "0.96 SCORE" },
    visualizerType: "ai",
  },
  {
    number: "03",
    category: "data-ai",
    categoryLabel: "MLOps",
    name: "Production MLOps & Model Serving",
    spec: "AUTOMATED CI/CD · ZERO-DOWNTIME ROLLOUT",
    icon: GitBranch,
    description:
      "Deploying and serving optimized ML models via NVIDIA Triton & FastAPI with automated experiment tracking on MLflow. Implementing automated canary deployments, data drift detection, and quantized low-latency inference.",
    pipeline: ["Train/Log", "MLflow", "Triton Server", "Canary Route"],
    tags: ["MLflow", "Triton", "Quantization", "Docker", "Model Registry"],
    metrics: { label: "INFERENCE P99", value: "8.4ms LATENCY" },
    visualizerType: "mlops",
  },
  {
    number: "04",
    category: "cloud-sre",
    categoryLabel: "Cloud & IaC",
    name: "Cloud Topology & IaC",
    spec: "MULTI-CLOUD AWS/GCP · TERRAFORM AUTOMATION",
    icon: Cloud,
    description:
      "Provisioning secure, repeatable cloud infrastructure using Terraform and Kubernetes. Leveraging enterprise operational background at Tesla, Huawei, and Nokia to engineer cost-optimized architectures with 99.99% availability.",
    pipeline: ["Terraform HCL", "State Lock", "K8s Mesh", "Live Cluster"],
    tags: ["Terraform", "AWS", "GCP", "Kubernetes", "FinOps"],
    metrics: { label: "ORCHESTRATION", value: "100% DECLARATIVE" },
    visualizerType: "cloud",
  },
  {
    number: "05",
    category: "cloud-sre",
    categoryLabel: "Mission-Critical",
    name: "Mission-Critical Ops & High Availability",
    spec: "24/7 GOC SLA · ZERO SINGLE POINT OF FAILURE",
    icon: Radio,
    description:
      "Drawing on 5+ years directing enterprise NOC & telecom network backbones. Engineering distributed systems with self-healing failovers, real-time Prometheus/Grafana telemetry, and sub-minute incident remediation.",
    pipeline: ["Prometheus", "Telemetry", "Circuit Breaker", "Auto-Heal"],
    tags: ["High Availability", "Prometheus", "Grafana", "Incident SRE", "Failover"],
    metrics: { label: "HISTORICAL UPTIME", value: "99.999% SLA" },
    visualizerType: "ops",
  },
  {
    number: "06",
    category: "fullstack",
    categoryLabel: "Full-Stack AI",
    name: "Full-Stack AI Interfaces",
    spec: "REACTIVE STREAMING · ASYNC MICROSERVICES",
    icon: Monitor,
    description:
      "Bridging complex backend AI engines with high-fidelity, reactive client applications. Building low-latency asynchronous FastAPI microservices coupled with type-safe React, Next.js, and WebSocket streaming.",
    pipeline: ["FastAPI RPC", "WebSocket", "React State", "Edge Render"],
    tags: ["FastAPI", "React", "Next.js", "TypeScript", "WebSocket"],
    metrics: { label: "STREAM SPEED", value: "85 TOKENS/SEC" },
    visualizerType: "ui",
    heroSpan: true,
  },
];

// Connection definitions for SVG lines between related cards
const CARD_CONNECTIONS = [
  { from: "01", to: "03", key: "data" as const },
  { from: "02", to: "06", key: "ai" as const },
  { from: "03", to: "04", key: "mlops" as const },
  { from: "04", to: "05", key: "cloud" as const },
];

// ── Corner Blueprint Ticks (reusable) ─────────────────────────────────────────
function CornerTicks({ color, active }: { color?: string; active?: boolean }) {
  const c = active && color ? color : "rgba(255,255,255,0.2)";
  const base = "pointer-events-none absolute w-3 h-3 z-10 transition-colors duration-300";
  return (
    <>
      <span className={`${base} top-0 left-0 border-t-2 border-l-2`} style={{ borderColor: c }} />
      <span className={`${base} top-0 right-0 border-t-2 border-r-2`} style={{ borderColor: c }} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} style={{ borderColor: c }} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} style={{ borderColor: c }} />
    </>
  );
}

// ── Typewriter Title ──────────────────────────────────────────────────────────
function TypewriterTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const word = "Expertise";
  const typingEnd = 0.5 + word.length * 0.06;

  return (
    <motion.h2
      ref={ref}
      className="font-black leading-[0.92] tracking-tighter text-white text-center"
      style={{ fontSize: "clamp(2.6rem, 6.5vw, 4.8rem)" }}
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
      >
        My{" "}
      </motion.span>
      <span className="accent-serif">
        {word.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.05, delay: 0.5 + i * 0.06 }}
          >
            {char}
          </motion.span>
        ))}
      </span>
      <motion.span
        className="text-[#00df8f] inline-block"
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ type: "spring", stiffness: 500, damping: 12, delay: typingEnd + 0.15 }}
      >
        .
      </motion.span>
      {/* Blinking cursor */}
      <motion.span
        className="inline-block w-[3px] h-[0.8em] bg-[#00df8f] ml-1 align-middle rounded-full"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 0.7, repeat: 5, delay: 0.4, repeatType: "loop" }}
      />
    </motion.h2>
  );
}

// ── Magnetic Filter Tab ───────────────────────────────────────────────────────
function MagneticTab({
  tab,
  isActive,
  onClick,
}: {
  tab: { id: Category; label: string; count: number };
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * 0.15);
      y.set((e.clientY - (r.top + r.height / 2)) * 0.15);
    },
    [x, y],
  );

  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      className={`relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer ${
        !isActive ? "bg-white/[0.04] border border-white/[0.08] hover:border-white/20" : ""
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="expertise-active-tab"
          className="absolute inset-0 rounded-full bg-[#00df8f] shadow-[0_0_20px_rgba(0,223,143,0.4)]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className={`relative z-10 transition-colors duration-200 ${isActive ? "text-black font-semibold" : "text-white/60"}`}>
        {tab.label}
      </span>
      <span className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full transition-colors duration-200 ${
        isActive ? "bg-black/20 text-black font-bold" : "bg-white/10 text-white/60"
      }`}>
        {tab.count}
      </span>
    </motion.button>
  );
}

// ── Filter Tab Bar ────────────────────────────────────────────────────────────
function FilterTabs({ activeTab, onTabChange }: { activeTab: Category; onTabChange: (t: Category) => void }) {
  const tabs: { id: Category; label: string; count: number }[] = [
    { id: "all", label: "All Specializations", count: 6 },
    { id: "data-ai", label: "Data & GenAI", count: 3 },
    { id: "cloud-sre", label: "Cloud & SRE", count: 2 },
    { id: "fullstack", label: "Full-Stack AI", count: 1 },
  ];

  return (
    <motion.div
      className="flex items-center justify-center gap-2 mt-8 flex-wrap"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {tabs.map((tab) => (
        <MagneticTab key={tab.id} tab={tab} isActive={activeTab === tab.id} onClick={() => onTabChange(tab.id)} />
      ))}
    </motion.div>
  );
}

// ── Interactive Domain Micro-Visualizers ───────────────────────────────────────
function DomainVisualizer({ type, c }: { type: ExpertiseItem["visualizerType"]; c: DomainColor }) {
  if (type === "data") {
    return (
      <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3 font-mono text-[11px] flex flex-col gap-2 overflow-hidden relative">
        <div className="flex items-center justify-between text-white/50 text-[10px]">
          <span className="flex items-center gap-1.5" style={{ color: c.primary }}>
            <span className="h-1.5 w-1.5 rounded-full animate-ping" style={{ backgroundColor: c.primary }} />
            STREAM INGESTION ENGINE
          </span>
          <span className="font-semibold" style={{ color: c.primary }}>48.2 GB/s</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
            <div className="text-[9px] text-white/40">SCHEMA</div>
            <div className="font-medium mt-0.5" style={{ color: c.primary }}>ENFORCED</div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
            <div className="text-[9px] text-white/40">DROPPED</div>
            <div className="text-white/80 font-medium mt-0.5">0.00%</div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
            <div className="text-[9px] text-white/40">LAG</div>
            <div className="font-medium mt-0.5" style={{ color: c.primary }}>&lt;14ms</div>
          </div>
        </div>
        <div className="relative h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full w-24"
            style={{ background: `linear-gradient(90deg, transparent, ${c.primary}, transparent)` }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    );
  }

  if (type === "ai") {
    return (
      <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3 font-mono text-[11px] flex flex-col gap-2 overflow-hidden relative">
        <div className="flex items-center justify-between text-white/50 text-[10px]">
          <span className="flex items-center gap-1.5" style={{ color: c.primary }}>
            <BrainCircuit className="w-3.5 h-3.5" style={{ color: c.primary }} />
            HYBRID RETRIEVAL & CITATION
          </span>
          <span className="font-semibold" style={{ color: c.primary }}>cos: 0.96</span>
        </div>
        <div className="flex items-center justify-between gap-1 text-[10px] bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
          <span className="text-white/60">Top-k Embeddings</span>
          <span className="text-white/90">FAISS Index / FlatIP</span>
          <span className="flex items-center gap-1" style={{ color: c.primary }}>
            <ShieldCheck className="w-3 h-3" /> Grounded
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-white/40 px-0.5">
          <span>Guardrail check: Pass</span>
          <span style={{ color: c.primary }}>Trace verified</span>
        </div>
      </div>
    );
  }

  if (type === "mlops") {
    return (
      <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3 font-mono text-[11px] flex flex-col gap-2 overflow-hidden relative">
        <div className="flex items-center justify-between text-white/50 text-[10px]">
          <span className="flex items-center gap-1.5" style={{ color: c.primary }}>
            <Cpu className="w-3.5 h-3.5" style={{ color: c.primary }} />
            TRITON INFERENCE SERVER
          </span>
          <span className="font-semibold" style={{ color: c.primary }}>FP16 / INT8</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5 flex flex-col">
            <span className="text-[9px] text-white/40">CANARY DEPLOY</span>
            <div className="flex items-center justify-between mt-0.5 text-[10px]">
              <span className="text-white/70">v2.4 (90%)</span>
              <span style={{ color: c.primary }}>v2.5 (10%)</span>
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5 flex flex-col">
            <span className="text-[9px] text-white/40">DATA DRIFT</span>
            <span className="mt-0.5 text-[10px] font-semibold" style={{ color: c.primary }}>NORMAL (0.012)</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "cloud") {
    return (
      <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3 font-mono text-[11px] flex flex-col gap-2 overflow-hidden relative">
        <div className="flex items-center justify-between text-white/50 text-[10px]">
          <span className="flex items-center gap-1.5" style={{ color: c.primary }}>
            <Server className="w-3.5 h-3.5" style={{ color: c.primary }} />
            TERRAFORM MESH ARCHITECTURE
          </span>
          <span className="text-white/70">AWS + GCP</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
            <div className="text-[9px] text-white/40">TF STATE</div>
            <div className="font-medium mt-0.5" style={{ color: c.primary }}>SYNCED</div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
            <div className="text-[9px] text-white/40">K8S PODS</div>
            <div className="text-white/90 font-medium mt-0.5">12/12 READY</div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
            <div className="text-[9px] text-white/40">VPC PEER</div>
            <div className="font-medium mt-0.5" style={{ color: c.primary }}>ACTIVE</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "ops") {
    return (
      <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3 font-mono text-[11px] flex flex-col gap-2 overflow-hidden relative">
        <div className="flex items-center justify-between text-white/50 text-[10px]">
          <span className="flex items-center gap-1.5" style={{ color: c.primary }}>
            <Activity className="w-3.5 h-3.5" style={{ color: c.primary }} />
            PROMETHEUS SRE HEARTBEAT
          </span>
          <span className="font-semibold" style={{ color: c.primary }}>99.999% SLA</span>
        </div>
        <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded p-1.5 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full animate-ping" style={{ backgroundColor: c.primary }} />
            <span className="text-white/80">Self-Healing Failover:</span>
          </div>
          <span className="font-semibold" style={{ color: c.primary }}>ARMED (MTTR &lt; 45s)</span>
        </div>
      </div>
    );
  }

  // UI / Full-stack
  return (
    <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3 font-mono text-[11px] flex flex-col gap-2 overflow-hidden relative">
      <div className="flex items-center justify-between text-white/50 text-[10px]">
        <span className="flex items-center gap-1.5" style={{ color: c.primary }}>
          <Zap className="w-3.5 h-3.5" style={{ color: c.primary }} />
          WEBSOCKET STREAM BUFFER
        </span>
        <span className="font-semibold" style={{ color: c.primary }}>85 TOKENS/S</span>
      </div>
      <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded p-1.5 text-[10px]">
        <span className="text-white/60">FastAPI Async RPC</span>
        <span className="flex items-center gap-1" style={{ color: c.primary }}>
          <span className="h-1 w-1 rounded-full" style={{ backgroundColor: c.primary }} /> 18ms Roundtrip
        </span>
        <span className="text-white/70">React UI</span>
      </div>
    </div>
  );
}

// ── Micro Pipeline Component ──────────────────────────────────────────────────
function PipelineFlow({ steps, c, delay = 0 }: { steps: string[]; c: DomainColor; delay?: number }) {
  return (
    <div className="relative pt-2.5 pb-1 border-t border-white/[0.06] mt-auto">
      <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-white/40 mb-2">
        <span className="flex items-center gap-1.5" style={{ color: c.primary }}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: c.primary }} />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: c.primary }} />
          </span>
          PIPELINE SEQUENCE
        </span>
        <span className="text-[9px] uppercase tracking-widest text-white/30">Continuous</span>
      </div>

      <div className="relative flex items-center justify-between gap-1 py-1.5 px-2 rounded-lg bg-black/30 border border-white/[0.06] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 w-20 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, rgba(${c.rgb},0.22), transparent)` }}
          animate={{ x: ["-100%", "450%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay }}
        />
        {steps.map((step, idx) => (
          <div key={step} className="flex items-center gap-1 relative z-10">
            <span className="px-1.5 py-0.5 rounded text-[9.5px] font-mono tracking-tight text-white/80 bg-white/[0.04] border border-white/[0.08] transition-colors duration-200">
              {step}
            </span>
            {idx < steps.length - 1 && (
              <span className="text-[9px] font-mono select-none" style={{ color: `rgba(${c.rgb},0.6)` }}>→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Flip Card Component ───────────────────────────────────────────────────────
function FlipCard({
  item,
  i,
  isAllView,
  cardMapRef,
}: {
  item: ExpertiseItem;
  i: number;
  isAllView: boolean;
  cardMapRef: React.MutableRefObject<Map<string, HTMLDivElement>>;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(outerRef, { once: true, margin: "-60px" });

  const color = DOMAIN_COLORS[item.visualizerType];
  const Icon = item.icon;

  // Register card element for ConnectionLines measurement
  useEffect(() => {
    const el = outerRef.current;
    if (el) cardMapRef.current.set(item.number, el);
    return () => { cardMapRef.current.delete(item.number); };
  }, [item.number, cardMapRef]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = outerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  const handleFlip = useCallback(() => setIsFlipped((f) => !f), []);
  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsFlipped((f) => !f); }
  }, []);

  const spanClass = isAllView && item.heroSpan ? "lg:col-span-2" : "";

  return (
    <motion.div
      ref={outerRef}
      layout
      className={`h-full ${spanClass}`}
      initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      exit={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
      transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`${item.name} – ${isFlipped ? "click to see overview" : "click to explore details"}`}
        className="relative min-h-[420px] w-full cursor-pointer select-none outline-none"
        style={{ perspective: "1200px" }}
        onClick={handleFlip}
        onKeyDown={handleKey}
      >
        <motion.div
          className="relative w-full min-h-[420px]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
        >
          {/* ────────────── FRONT FACE ────────────── */}
          <div
            className="absolute inset-0 rounded-2xl bg-[#0a0e14]/90 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-7 flex flex-col gap-3 overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Grid dot pattern */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
                opacity: hovered ? 0.06 : 0.035,
              }}
            />

            {/* Cursor spotlight */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl z-0 transition-opacity duration-500"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${color.rgb},0.12), transparent 70%)`,
                opacity: hovered ? 1 : 0,
              }}
            />

            {/* Glow border */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-2xl z-0"
              animate={{
                boxShadow: hovered
                  ? `inset 0 0 0 1px rgba(${color.rgb},0.5), 0 16px 40px -10px rgba(${color.rgb},0.18)`
                  : "inset 0 0 0 1px rgba(255,255,255,0.07)",
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Bottom sweep line */}
            <div
              className="absolute bottom-0 left-0 h-[2px] pointer-events-none z-20 transition-all duration-500"
              style={{
                width: hovered ? "100%" : "0%",
                background: `linear-gradient(90deg, transparent, ${color.primary}, transparent)`,
              }}
            />

            <CornerTicks color={color.primary} active={hovered} />

            {/* Top bar: icon + number */}
            <div className="flex items-start justify-between relative z-10">
              <motion.div
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300"
                style={{
                  border: `1px solid rgba(${color.rgb},${hovered ? 0.7 : 0.25})`,
                  backgroundColor: `rgba(${color.rgb},${hovered ? 0.15 : 0.06})`,
                  color: color.primary,
                  boxShadow: hovered ? `0 0 24px rgba(${color.rgb},0.3)` : "none",
                }}
                animate={hovered ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <Icon className="w-5 h-5" strokeWidth={1.75} />
              </motion.div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="font-mono text-xs font-bold tracking-[0.2em] select-none" style={{ color: color.primary }}>
                  {item.number}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase select-none">
                  SYS.ARCH.v{parseInt(item.number)}
                </span>
              </div>
            </div>

            {/* Spec pill */}
            <div
              className="relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md w-fit"
              style={{ backgroundColor: `rgba(${color.rgb},0.06)`, border: `1px solid rgba(${color.rgb},0.2)` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color.primary }} />
              <span className="text-[9.5px] font-mono font-medium tracking-wider uppercase" style={{ color: color.primary }}>
                {item.spec}
              </span>
            </div>

            {/* Title */}
            <h3
              className="font-bold tracking-tight leading-tight relative z-10 text-lg transition-colors duration-300"
              style={{ color: hovered ? color.primary : "white" }}
            >
              {item.name}
            </h3>

            {/* Description preview (truncated) */}
            <p className="font-light text-white/65 leading-relaxed relative z-10 text-sm line-clamp-2">
              {item.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 relative z-10 mt-auto">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono font-medium tracking-wider rounded px-2 py-0.5 bg-white/[0.02] transition-all duration-200 cursor-default"
                  style={{
                    border: `1px solid ${hovered ? `rgba(${color.rgb},0.35)` : "rgba(255,255,255,0.1)"}`,
                    color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Flip hint */}
            <div className="relative z-10 flex items-center justify-center gap-2 pt-3 border-t border-white/[0.06] text-white/30 text-[10px] font-mono tracking-wider">
              <motion.div
                animate={{ rotate: [0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <RotateCcw className="w-3 h-3" />
              </motion.div>
              <span>TAP TO EXPLORE</span>
            </div>
          </div>

          {/* ────────────── BACK FACE ────────────── */}
          <div
            className="absolute inset-0 rounded-2xl bg-[#0a0e14]/95 backdrop-blur-xl p-6 sm:p-7 flex flex-col gap-3 overflow-y-auto"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              border: `1px solid rgba(${color.rgb},0.15)`,
            }}
          >
            {/* Subtle top gradient */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{ background: `linear-gradient(180deg, rgba(${color.rgb},0.06) 0%, transparent 40%)` }}
            />

            {/* Grid dot pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            <CornerTicks color={color.primary} active />

            {/* Header */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-mono tracking-wider uppercase font-semibold" style={{ color: color.primary }}>
                {item.categoryLabel}
              </span>
              <span className="text-[10px] font-mono text-white/40 flex items-center gap-1.5">
                <RotateCcw className="w-3 h-3" />
                FLIP BACK
              </span>
            </div>

            {/* Full description */}
            <p className="font-light text-white/75 leading-relaxed relative z-10 text-sm">
              {item.description}
            </p>

            {/* Domain visualizer */}
            <div className="relative z-10">
              <DomainVisualizer type={item.visualizerType} c={color} />
            </div>

            {/* Pipeline flow */}
            <div className="relative z-10">
              <PipelineFlow steps={item.pipeline} c={color} delay={i * 0.25} />
            </div>

            {/* Metrics bar */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] relative z-10 mt-auto">
              <span className="text-[10px] font-mono text-white/40 tracking-wider">{item.metrics.label}</span>
              <span className="text-sm font-mono font-semibold" style={{ color: color.primary }}>{item.metrics.value}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Architecture Summary Card (fills grid gap on "all" view) ──────────────────
function ArchSummaryCard({ i }: { i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      exit={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
      transition={{ duration: 0.65, delay: i * 0.12, ease: EASE }}
      className="h-full min-h-[420px] hidden lg:flex"
    >
      <div className="relative w-full rounded-2xl bg-[#0a0e14]/70 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-7 flex flex-col items-center justify-center gap-4 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <CornerTicks />

        <div className="text-center relative z-10 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#00df8f] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00df8f] animate-pulse" />
            SYSTEM STATUS
          </div>

          <div className="text-4xl font-black text-white tracking-tight">
            6<span className="text-[#00df8f]">.</span>
          </div>
          <div className="text-xs font-mono text-white/50 tracking-wider uppercase">
            Expertise Domains
          </div>

          <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent my-1" />

          <div className="flex flex-col gap-1.5 text-[10px] font-mono text-white/40 tracking-wider text-center">
            <span>5+ YEARS PRODUCTION</span>
            <span>99.999% UPTIME TRACK</span>
          </div>

          <div className="mt-2 px-4 py-2 rounded-lg border border-[rgba(0,223,143,0.15)] bg-[rgba(0,223,143,0.04)]">
            <span className="text-[9px] font-mono tracking-wider text-[#00df8f]/80 font-semibold">
              ARCHITECTURE READY
            </span>
          </div>

          <div className="mt-1 flex flex-wrap justify-center gap-x-2 gap-y-1">
            {["TESLA", "NOKIA", "HUAWEI"].map((co) => (
              <span key={co} className="text-[9px] font-mono tracking-widest text-white/30">{co}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Connection Lines (SVG overlay between related cards) ──────────────────────
interface ConnectionPath {
  d: string;
  color: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function ConnectionLines({
  gridRef,
  cardMapRef,
  visible,
}: {
  gridRef: React.RefObject<HTMLDivElement | null>;
  cardMapRef: React.MutableRefObject<Map<string, HTMLDivElement>>;
  visible: boolean;
}) {
  const [paths, setPaths] = useState<ConnectionPath[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!visible) {
      setPaths([]);
      return;
    }

    const measure = () => {
      const grid = gridRef.current;
      const cards = cardMapRef.current;
      if (!grid || !cards || cards.size < 6) return;

      const gr = grid.getBoundingClientRect();
      const result: ConnectionPath[] = [];

      for (const conn of CARD_CONNECTIONS) {
        const fromEl = cards.get(conn.from);
        const toEl = cards.get(conn.to);
        if (!fromEl || !toEl) continue;

        const fr = fromEl.getBoundingClientRect();
        const tr = toEl.getBoundingClientRect();
        const sameRow = Math.abs(fr.top - tr.top) < fr.height * 0.5;

        let x1: number, y1: number, x2: number, y2: number, d: string;

        if (sameRow) {
          x1 = fr.right - gr.left;
          y1 = fr.top + fr.height / 2 - gr.top;
          x2 = tr.left - gr.left;
          y2 = tr.top + tr.height / 2 - gr.top;
          const gap = (x2 - x1) * 0.4;
          d = `M ${x1} ${y1} C ${x1 + gap} ${y1}, ${x2 - gap} ${y2}, ${x2} ${y2}`;
        } else {
          x1 = fr.left + fr.width / 2 - gr.left;
          y1 = fr.bottom - gr.top;
          x2 = tr.left + tr.width / 2 - gr.left;
          y2 = tr.top - gr.top;
          const my = (y1 + y2) / 2;
          d = `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
        }

        result.push({ d, color: DOMAIN_COLORS[conn.key].primary, x1, y1, x2, y2 });
      }

      setPaths(result);
    };

    const timer = setTimeout(measure, 1400);
    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    if (gridRef.current) ro.observe(gridRef.current);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!paths.length) return null;

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] hidden lg:block"
      style={{ overflow: "visible" }}
    >
      {paths.map((p, i) => (
        <g key={i}>
          <motion.path
            d={p.d}
            stroke={p.color}
            strokeWidth="1"
            strokeDasharray="4 4"
            strokeOpacity="0.3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.8, delay: i * 0.3, ease: EASE }}
          />
          <motion.circle
            cx={p.x1}
            cy={p.y1}
            r="2.5"
            fill={p.color}
            fillOpacity="0.4"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: i * 0.3 + 0.5, type: "spring", stiffness: 300 }}
          />
          <motion.circle
            cx={p.x2}
            cy={p.y2}
            r="2.5"
            fill={p.color}
            fillOpacity="0.4"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: i * 0.3 + 1.2, type: "spring", stiffness: 300 }}
          />
        </g>
      ))}
    </svg>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState<Category>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const cardMapRef = useRef<Map<string, HTMLDivElement>>(new Map());

  const filteredItems = EXPERTISE.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  const isAllView = activeTab === "all";

  return (
    <section
      id="skills"
      className="relative font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 overflow-hidden border-t border-white/10 bg-[#090d12]"
      style={{
        padding: "clamp(4rem, 6vw, 6rem) 1.25rem clamp(6rem, 9vw, 9rem)",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.6)",
      }}
    >
      {/* ── Background Video & Ambient Mesh ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none opacity-40"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00df8f]/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[250px] bg-[#38bdf8]/[0.05] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[#090d12]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090d12] via-transparent to-[#090d12]" />
      </div>

      {/* Guide lines at container edges */}
      <div className="hidden xl:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-[calc(50%+38rem)] w-px bg-white/[0.08] z-[5]" />
      <div className="hidden xl:block pointer-events-none absolute inset-y-0 left-1/2 translate-x-[calc(-50%+38rem)] w-px bg-white/[0.08] z-[5]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <BlueprintSectionHeader align="center">
          <div className="mb-8 text-center sm:mb-12 -mt-3 sm:-mt-5">
            <TypewriterTitle />

            {/* Sub-line */}
            <motion.p
              className="text-white/60 font-light mt-4 max-w-2xl mx-auto text-center leading-relaxed"
              style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            >
              Battle-tested data engineering pipelines, low-latency GenAI retrieval systems, and high-availability cloud architecture engineered to hold up under real-world production scale.
            </motion.p>

            {/* Animated underline */}
            <motion.div
              className="mx-auto mt-6 h-px"
              style={{
                width: "min(200px, 40%)",
                background: "linear-gradient(90deg, transparent, rgba(94,210,156,0.8), transparent)",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            />

            <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </BlueprintSectionHeader>

        {/* ── Card Grid with Connection Lines ── */}
        <div ref={gridRef} className="relative">
          <ConnectionLines gridRef={gridRef} cardMapRef={cardMapRef} visible={isAllView} />

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 relative z-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, i) => (
                <FlipCard
                  key={item.number}
                  item={item}
                  i={i}
                  isAllView={isAllView}
                  cardMapRef={cardMapRef}
                />
              ))}
              {isAllView && <ArchSummaryCard key="arch-summary" i={filteredItems.length} />}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom architecture summary note (shown when filtered) */}
        {!isAllView && (
          <motion.div
            className="mt-12 text-center text-xs font-mono text-white/40 tracking-wider flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00df8f]" />
            <span>PRODUCTION-PROVEN ARCHITECTURE STACK · TESLA / NOKIA / HUAWEI / ENTERPRISE SLA</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
