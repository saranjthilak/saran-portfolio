"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

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
  visualizerType: "data" | "ai" | "mlops" | "cloud" | "ops" | "ui";
}

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
  },
];

// ── Interactive Domain Micro-Visualizers ───────────────────────────────────────
function DomainVisualizer({ type }: { type: ExpertiseItem["visualizerType"] }) {
  if (type === "data") {
    return (
      <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3 font-mono text-[11px] flex flex-col gap-2 overflow-hidden relative">
        <div className="flex items-center justify-between text-white/50 text-[10px]">
          <span className="flex items-center gap-1.5 text-[#5ed29c]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5ed29c] animate-ping" />
            STREAM INGESTION ENGINE
          </span>
          <span className="text-[#5ed29c]/90 font-semibold">48.2 GB/s</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
            <div className="text-[9px] text-white/40">SCHEMA</div>
            <div className="text-[#5ed29c] font-medium mt-0.5">ENFORCED</div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
            <div className="text-[9px] text-white/40">DROPPED</div>
            <div className="text-white/80 font-medium mt-0.5">0.00%</div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
            <div className="text-[9px] text-white/40">LAG</div>
            <div className="text-[#5ed29c] font-medium mt-0.5">&lt;14ms</div>
          </div>
        </div>
        {/* Animated packet stream */}
        <div className="relative h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-[#5ed29c] to-transparent w-24"
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
          <span className="flex items-center gap-1.5 text-[#5ed29c]">
            <BrainCircuit className="w-3.5 h-3.5 text-[#5ed29c]" />
            HYBRID RETRIEVAL & CITATION
          </span>
          <span className="text-emerald-400 font-semibold">cos: 0.96</span>
        </div>
        <div className="flex items-center justify-between gap-1 text-[10px] bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
          <span className="text-white/60">Top-k Embeddings</span>
          <span className="text-white/90">FAISS Index / FlatIP</span>
          <span className="text-[#5ed29c] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Grounded
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-white/40 px-0.5">
          <span>Guardrail check: Pass</span>
          <span className="text-[#5ed29c]">Trace verified</span>
        </div>
      </div>
    );
  }

  if (type === "mlops") {
    return (
      <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3 font-mono text-[11px] flex flex-col gap-2 overflow-hidden relative">
        <div className="flex items-center justify-between text-white/50 text-[10px]">
          <span className="flex items-center gap-1.5 text-[#5ed29c]">
            <Cpu className="w-3.5 h-3.5 text-[#5ed29c]" />
            TRITON INFERENCE SERVER
          </span>
          <span className="text-[#5ed29c] font-semibold">FP16 / INT8</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5 flex flex-col">
            <span className="text-[9px] text-white/40">CANARY DEPLOY</span>
            <div className="flex items-center justify-between mt-0.5 text-[10px]">
              <span className="text-white/70">v2.4 (90%)</span>
              <span className="text-[#5ed29c]">v2.5 (10%)</span>
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5 flex flex-col">
            <span className="text-[9px] text-white/40">DATA DRIFT</span>
            <span className="text-[#5ed29c] mt-0.5 text-[10px] font-semibold">NORMAL (0.012)</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "cloud") {
    return (
      <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3 font-mono text-[11px] flex flex-col gap-2 overflow-hidden relative">
        <div className="flex items-center justify-between text-white/50 text-[10px]">
          <span className="flex items-center gap-1.5 text-[#5ed29c]">
            <Server className="w-3.5 h-3.5 text-[#5ed29c]" />
            TERRAFORM MESH ARCHITECTURE
          </span>
          <span className="text-white/70">AWS + GCP</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
            <div className="text-[9px] text-white/40">TF STATE</div>
            <div className="text-[#5ed29c] font-medium mt-0.5">SYNCED</div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
            <div className="text-[9px] text-white/40">K8S PODS</div>
            <div className="text-white/90 font-medium mt-0.5">12/12 READY</div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-1.5">
            <div className="text-[9px] text-white/40">VPC PEER</div>
            <div className="text-[#5ed29c] font-medium mt-0.5">ACTIVE</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "ops") {
    return (
      <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3 font-mono text-[11px] flex flex-col gap-2 overflow-hidden relative">
        <div className="flex items-center justify-between text-white/50 text-[10px]">
          <span className="flex items-center gap-1.5 text-[#5ed29c]">
            <Activity className="w-3.5 h-3.5 text-[#5ed29c]" />
            PROMETHEUS SRE HEARTBEAT
          </span>
          <span className="text-[#5ed29c] font-semibold">99.999% SLA</span>
        </div>
        <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded p-1.5 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5ed29c] animate-ping" />
            <span className="text-white/80">Self-Healing Failover:</span>
          </div>
          <span className="text-[#5ed29c] font-semibold">ARMED (MTTR &lt; 45s)</span>
        </div>
      </div>
    );
  }

  // UI / Full-stack
  return (
    <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3 font-mono text-[11px] flex flex-col gap-2 overflow-hidden relative">
      <div className="flex items-center justify-between text-white/50 text-[10px]">
        <span className="flex items-center gap-1.5 text-[#5ed29c]">
          <Zap className="w-3.5 h-3.5 text-[#5ed29c]" />
          WEBSOCKET STREAM BUFFER
        </span>
        <span className="text-[#5ed29c] font-semibold">85 TOKENS/S</span>
      </div>
      <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded p-1.5 text-[10px]">
        <span className="text-white/60">FastAPI Async RPC</span>
        <span className="text-[#5ed29c] flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-[#5ed29c]" /> 18ms Roundtrip
        </span>
        <span className="text-white/70">React UI</span>
      </div>
    </div>
  );
}

// ── Micro Pipeline Component ──────────────────────────────────────────────────
function PipelineFlow({ steps, delay = 0 }: { steps: string[]; delay?: number }) {
  return (
    <div className="relative pt-2.5 pb-1 border-t border-white/[0.06] mt-auto">
      <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-white/40 mb-2">
        <span className="flex items-center gap-1.5 text-[#5ed29c]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5ed29c] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#5ed29c]" />
          </span>
          PIPELINE SEQUENCE
        </span>
        <span className="text-[9px] uppercase tracking-widest text-white/30">Continuous</span>
      </div>

      <div className="relative flex items-center justify-between gap-1 py-1.5 px-2 rounded-lg bg-black/30 border border-white/[0.06] overflow-hidden">
        {/* Animated luminous pulse sweep */}
        <motion.div
          className="absolute inset-y-0 w-20 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(94,210,156,0.22), transparent)",
          }}
          animate={{ x: ["-100%", "450%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay }}
        />

        {steps.map((step, idx) => (
          <div key={step} className="flex items-center gap-1 relative z-10">
            <span className="px-1.5 py-0.5 rounded text-[9.5px] font-mono tracking-tight text-white/80 bg-white/[0.04] border border-white/[0.08] group-hover:border-[rgba(94,210,156,0.35)] group-hover:text-white transition-colors duration-200">
              {step}
            </span>
            {idx < steps.length - 1 && (
              <span className="text-[9px] text-[#5ed29c]/60 font-mono select-none">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Bento Card Component ───────────────────────────────────────────────────────
function BentoCard({ item, i }: { item: ExpertiseItem; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - left) / width - 0.5) * 5,
      y: -((e.clientY - top) / height - 0.5) * 5,
    });
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  }, []);

  const Icon = item.icon;

  return (
    <motion.div
      layout
      className="h-full flex flex-col"
      initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
    >
      <motion.div
        ref={ref}
        className="group relative h-full rounded-2xl bg-[#0a0e14]/90 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-7 flex flex-col gap-4 overflow-hidden cursor-default transition-shadow duration-300"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? "0 20px 50px -10px rgba(0,0,0,0.8), 0 0 30px -5px rgba(94,210,156,0.15)"
            : "0 10px 30px -10px rgba(0,0,0,0.5)",
        }}
        animate={{ rotateX: tilt.y, rotateY: tilt.x, scale: hovered ? 1.015 : 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setTilt({ x: 0, y: 0 });
          setHovered(false);
        }}
      >
        {/* Subtle grid pattern background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] group-hover:opacity-[0.06] transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* Cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(94,210,156,0.12), transparent 70%)`,
          }}
        />

        {/* Animated border glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl z-0"
          animate={{
            boxShadow: hovered
              ? "inset 0 0 0 1px rgba(94,210,156,0.5), 0 16px 40px -10px rgba(94,210,156,0.18)"
              : "inset 0 0 0 1px rgba(255,255,255,0.07)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom sweep */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-[#5ed29c] to-transparent transition-all duration-500 pointer-events-none z-20" />

        {/* Corner blueprint ticks */}
        <span className="pointer-events-none absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20 group-hover:border-[#5ed29c] transition-colors duration-300 z-10" />
        <span className="pointer-events-none absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-[#5ed29c] transition-colors duration-300 z-10" />
        <span className="pointer-events-none absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20 group-hover:border-[#5ed29c] transition-colors duration-300 z-10" />
        <span className="pointer-events-none absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20 group-hover:border-[#5ed29c] transition-colors duration-300 z-10" />

        {/* Top bar */}
        <div className="flex items-start justify-between relative z-10">
          <motion.div
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[rgba(94,210,156,0.25)] bg-[rgba(94,210,156,0.06)] text-[#5ed29c] transition-all duration-300 group-hover:border-[rgba(94,210,156,0.7)] group-hover:bg-[rgba(94,210,156,0.15)] group-hover:shadow-[0_0_24px_rgba(94,210,156,0.3)]"
            animate={hovered ? { scale: [1, 1.12, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Icon className="w-5 h-5" strokeWidth={1.75} />
          </motion.div>

          <div className="flex flex-col items-end gap-0.5">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#5ed29c] select-none">
              {item.number}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase select-none">
              SYS.ARCH.v{i + 1}
            </span>
          </div>
        </div>

        {/* Spec Pill */}
        <div className="relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[rgba(94,210,156,0.06)] border border-[rgba(94,210,156,0.2)] w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c] animate-pulse" />
          <span className="text-[9.5px] font-mono font-medium tracking-wider text-[#5ed29c] uppercase">
            {item.spec}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold tracking-tight text-white leading-tight relative z-10 group-hover:text-[#5ed29c] transition-colors duration-300 text-lg">
          {item.name}
        </h3>

        {/* Description */}
        <p className="font-light text-white/65 leading-relaxed relative z-10 text-sm">
          {item.description}
        </p>

        {/* Bespoke Interactive Domain Micro-Visualizer */}
        <div className="relative z-10 pt-1">
          <DomainVisualizer type={item.visualizerType} />
        </div>

        {/* Pipeline Sequence */}
        <div className="relative z-10 mt-auto">
          <PipelineFlow steps={item.pipeline} delay={i * 0.25} />
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2 relative z-10 border-t border-white/[0.05]">
          {item.tags.map((tag) => (
            <motion.span
              key={tag}
              className="text-[10px] font-mono font-medium tracking-wider text-white/60 border border-white/10 rounded px-2 py-0.5 bg-white/[0.02] group-hover:border-[rgba(94,210,156,0.35)] group-hover:text-white/90 transition-all duration-200 cursor-default"
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filteredItems = EXPERTISE.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

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

        {/* Ambient radial lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00df8f]/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[250px] bg-[#38bdf8]/[0.05] rounded-full blur-[100px] pointer-events-none" />

        {/* Gradient dark overlays */}
        <div className="absolute inset-0 bg-[#090d12]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090d12] via-transparent to-[#090d12]" />
      </div>

      {/* Guide lines at container edges */}
      <div className="hidden xl:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-[calc(50%+38rem)] w-px bg-white/[0.08] z-[5]" />
      <div className="hidden xl:block pointer-events-none absolute inset-y-0 left-1/2 translate-x-[calc(-50%+38rem)] w-px bg-white/[0.08] z-[5]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <BlueprintSectionHeader align="center">
          <div className="mb-8 text-center sm:mb-12 -mt-3 sm:-mt-5">
            {/* Main heading */}
            <motion.h2
              className="font-black leading-[0.92] tracking-tighter text-white text-center"
              style={{ fontSize: "clamp(2.6rem, 6.5vw, 4.8rem)" }}
              initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              My <span className="accent-serif">Expertise</span>
              <span className="text-[#00df8f]">.</span>
            </motion.h2>

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

            {/* Interactive Domain Filter Tabs */}
            <motion.div
              className="flex items-center justify-center gap-2 mt-8 flex-wrap"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {[
                { id: "all", label: "All Specializations", count: 6 },
                { id: "data-ai", label: "Data & GenAI", count: 3 },
                { id: "cloud-sre", label: "Cloud & SRE", count: 2 },
                { id: "fullstack", label: "Full-Stack AI", count: 1 },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Category)}
                    className={`relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "text-black font-semibold bg-[#00df8f] shadow-[0_0_20px_rgba(0,223,143,0.4)]"
                        : "text-white/60 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive ? "bg-black/20 text-black font-bold" : "bg-white/10 text-white/60"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </BlueprintSectionHeader>

        {/* ── Perfectly Balanced Bento Grid (Zero Layout Holes) ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 auto-rows-fr"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <BentoCard key={item.number} item={item} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom architecture summary note */}
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
      </div>
    </section>
  );
};

export default ServicesSection;
