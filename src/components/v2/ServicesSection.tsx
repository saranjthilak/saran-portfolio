"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import BlueprintSectionHeader from "./BlueprintSectionHeader";
import {
  Database,
  BrainCircuit,
  GitBranch,
  Cloud,
  Radio,
  Monitor,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface ExpertiseItem {
  number: string;
  name: string;
  spec: string;
  icon: typeof Database;
  description: string;
  pipeline: string[];
  tags: string[];
  colSpan?: number;
  rowSpan?: number;
  bg: "data" | "ai" | "mlops" | "cloud" | "ops" | "ui";
}

const EXPERTISE: ExpertiseItem[] = [
  {
    number: "01",
    name: "Production Data Engineering",
    spec: "99.9% RELIABILITY · PETABYTE VOLUME",
    icon: Database,
    description:
      "Architecting fault-tolerant ETL/ELT pipelines with Apache Airflow & dbt. Delivering automated data contracts, strict idempotency schemas, and high-throughput ingestion into Snowflake & BigQuery designed to withstand massive real-time volume.",
    pipeline: ["Ingest", "Airflow", "dbt Transform", "BigQuery"],
    tags: ["Airflow", "dbt", "BigQuery", "Snowflake", "ETL/ELT"],
    colSpan: 2,
    bg: "data" as const,
  },
  {
    number: "02",
    name: "Enterprise GenAI & RAG Systems",
    spec: "SUB-SECOND LATENCY · HYBRID RETRIEVAL",
    icon: BrainCircuit,
    description:
      "Engineering grounded conversational systems end-to-end with LangChain, FAISS, and hybrid sparse/dense vector search. Hardened with multi-stage hallucination guardrails, cross-encoder reranking, and verified citation traces.",
    pipeline: ["Query", "Chunk/Embed", "FAISS Search", "Grounded LLM"],
    tags: ["LangChain", "Vector DB", "FAISS", "Guardrails", "Reranking"],
    rowSpan: 2,
    bg: "ai" as const,
  },
  {
    number: "03",
    name: "Production MLOps & Model Serving",
    spec: "AUTOMATED CI/CD · ZERO-DOWNTIME ROLLOUT",
    icon: GitBranch,
    description:
      "Deploying and serving optimized ML models via NVIDIA Triton & FastAPI with automated experiment tracking on MLflow. Implementing automated canary deployments, data drift detection, and quantized low-latency inference.",
    pipeline: ["Train", "MLflow", "Triton Server", "Telemetry"],
    tags: ["MLflow", "Triton", "Quantization", "Docker", "Model Registry"],
    bg: "mlops" as const,
  },
  {
    number: "04",
    name: "Cloud Topology & IaC",
    spec: "MULTI-CLOUD AWS/GCP · TERRAFORM AUTOMATION",
    icon: Cloud,
    description:
      "Provisioning secure, repeatable cloud infrastructure using Terraform and Kubernetes. Leveraging enterprise operational background at Tesla, Huawei, and Nokia to engineer cost-optimized architectures with 99.99% availability.",
    pipeline: ["IaC Code", "Terraform", "Cloud Topology", "Live Infra"],
    tags: ["Terraform", "AWS", "GCP", "Kubernetes", "FinOps"],
    colSpan: 2,
    bg: "cloud" as const,
  },
  {
    number: "05",
    name: "Mission-Critical Ops & High Availability",
    spec: "24/7 GOC SLA · ZERO SINGLE POINT OF FAILURE",
    icon: Radio,
    description:
      "Drawing on 5+ years directing enterprise NOC & telecom network backbones. Engineering distributed systems with self-healing failovers, real-time Prometheus/Grafana telemetry, and sub-minute incident remediation.",
    pipeline: ["Telemetry", "Prometheus", "Self-Healing", "99.99% SLA"],
    tags: ["High Availability", "Prometheus", "Grafana", "Incident SRE", "Failover"],
    colSpan: 2,
    bg: "ops" as const,
  },
  {
    number: "06",
    name: "Full-Stack AI Interfaces",
    spec: "REACTIVE STREAMING · ASYNC MICROSERVICES",
    icon: Monitor,
    description:
      "Bridging complex backend AI engines with high-fidelity, reactive client applications. Building low-latency asynchronous FastAPI microservices coupled with type-safe React, Next.js, and WebSocket streaming.",
    pipeline: ["FastAPI", "Async RPC", "WebSocket", "React UI"],
    tags: ["FastAPI", "React", "Next.js", "TypeScript", "WebSocket"],
    bg: "ui" as const,
  },
];

// ── Animated background SVG patterns per domain ────────────────────────────────
function BentoBg({ type }: { type: ExpertiseItem["bg"] }) {
  if (type === "data") return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {[0,1,2,3,4,5].map(i => (
        <motion.line key={i} x1={`${i*18}%`} y1="0%" x2={`${i*18+10}%`} y2="100%"
          stroke="#5ed29c" strokeWidth="1"
          animate={{ opacity:[0.3,1,0.3] }}
          transition={{ duration:3+i*0.7, repeat:Infinity, ease:"easeInOut", delay:i*0.4 }}
        />
      ))}
      {[0,1,2,3].map(i => (
        <motion.circle key={i} cx={`${15+i*25}%`} cy={`${20+i*18}%`} r="4"
          fill="#5ed29c"
          animate={{ cy:[`${20+i*18}%`,`${26+i*18}%`,`${20+i*18}%`], opacity:[0.4,1,0.4] }}
          transition={{ duration:2.5+i*0.5, repeat:Infinity, ease:"easeInOut", delay:i*0.6 }}
        />
      ))}
    </svg>
  );
  if (type === "ai") return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.065] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {([[30,22],[70,22],[15,52],[50,52],[85,52],[30,82],[70,82]] as [number,number][]).map(([cx,cy],i) => (
        <motion.circle key={i} cx={`${cx}%`} cy={`${cy}%`} r="5" fill="#5ed29c"
          animate={{ r:[4,7,4], opacity:[0.4,1,0.4] }}
          transition={{ duration:2+i*0.3, repeat:Infinity, ease:"easeInOut", delay:i*0.25 }}
        />
      ))}
      {([[30,22,50,52],[70,22,50,52],[15,52,50,52],[85,52,50,52],[30,82,50,52],[70,82,50,52]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i) => (
        <motion.line key={i} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
          stroke="#5ed29c" strokeWidth="1"
          animate={{ opacity:[0.15,0.55,0.15] }}
          transition={{ duration:2.5+i*0.2, repeat:Infinity, ease:"easeInOut", delay:i*0.3 }}
        />
      ))}
    </svg>
  );
  if (type === "mlops") return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.065] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {[0,1,2,3].map(i => (
        <motion.rect key={i} x={`${8+i*24}%`} y="15%" width="14%" height="70%"
          fill="none" stroke="#5ed29c" strokeWidth="1" rx="4"
          animate={{ scaleY:[0.8,1,0.8], opacity:[0.3,0.8,0.3] }}
          transition={{ duration:1.8+i*0.4, repeat:Infinity, ease:"easeInOut", delay:i*0.5 }}
        />
      ))}
      {[0,1,2].map(i => (
        <motion.line key={i} x1={`${22+i*24}%`} y1="50%" x2={`${32+i*24}%`} y2="50%"
          stroke="#5ed29c" strokeWidth="1.5"
          animate={{ opacity:[0.2,1,0.2] }}
          transition={{ duration:1.5, repeat:Infinity, ease:"easeInOut", delay:i*0.5+0.3 }}
        />
      ))}
    </svg>
  );
  if (type === "cloud") return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {([[20,40],[50,25],[80,40],[35,65],[65,65]] as [number,number][]).map(([cx,cy],i) => (
        <g key={i}>
          <motion.circle cx={`${cx}%`} cy={`${cy}%`} r="18"
            fill="none" stroke="#5ed29c" strokeWidth="1"
            animate={{ r:[16,22,16], opacity:[0.25,0.7,0.25] }}
            transition={{ duration:3+i*0.5, repeat:Infinity, ease:"easeInOut", delay:i*0.4 }}
          />
          <motion.circle cx={`${cx}%`} cy={`${cy}%`} r="4"
            fill="#5ed29c"
            animate={{ opacity:[0.4,1,0.4] }}
            transition={{ duration:2, repeat:Infinity, ease:"easeInOut", delay:i*0.4 }}
          />
        </g>
      ))}
    </svg>
  );
  if (type === "ops") return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.065] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {[0,1,2,3,4].map(i => (
        <motion.path key={i}
          d={`M 0 ${38+i*7}% Q 25% ${28+i*7}% 50% ${38+i*7}% T 100% ${38+i*7}%`}
          fill="none" stroke="#5ed29c" strokeWidth="1.5"
          animate={{ d:[
            `M 0 ${38+i*7}% Q 25% ${28+i*7}% 50% ${38+i*7}% T 100% ${38+i*7}%`,
            `M 0 ${38+i*7}% Q 25% ${48+i*7}% 50% ${38+i*7}% T 100% ${38+i*7}%`,
            `M 0 ${38+i*7}% Q 25% ${28+i*7}% 50% ${38+i*7}% T 100% ${38+i*7}%`,
          ], opacity:[0.15,0.6,0.15] }}
          transition={{ duration:2.5+i*0.3, repeat:Infinity, ease:"easeInOut", delay:i*0.4 }}
        />
      ))}
    </svg>
  );
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.065] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {[0,1,2,3,4,5,6,7].map(i => (
        <motion.rect key={i} x={`${4+i*12}%`} y={`${80-(i%3)*25}%`} width="8%" height={`${15+i*4}%`}
          rx="2" fill="#5ed29c"
          animate={{ height:[`${15+i*4}%`,`${25+i*4}%`,`${15+i*4}%`], opacity:[0.2,0.65,0.2] }}
          transition={{ duration:1.4+i*0.2, repeat:Infinity, ease:"easeInOut", delay:i*0.15 }}
        />
      ))}
    </svg>
  );
}

// ── Micro Pipeline Component ──────────────────────────────────────────────────
function PipelineFlow({ steps, delay = 0 }: { steps: string[]; delay?: number }) {
  return (
    <div className="relative pt-3 pb-1 border-t border-white/[0.08] mt-auto">
      <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-white/40 mb-2">
        <span className="flex items-center gap-1.5 text-[#5ed29c]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5ed29c] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#5ed29c]" />
          </span>
          PIPELINE FLOW
        </span>
        <span className="text-[9px] uppercase tracking-widest text-white/30">Auto-sync</span>
      </div>

      <div className="relative flex items-center justify-between gap-1 py-1.5 px-2 rounded-lg bg-black/40 border border-white/[0.06] overflow-hidden">
        {/* Animated luminous pulse sweep */}
        <motion.div
          className="absolute inset-y-0 w-16 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(94,210,156,0.2), transparent)",
          }}
          animate={{ x: ["-100%", "450%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay }}
        />

        {steps.map((step, idx) => (
          <div key={step} className="flex items-center gap-1 relative z-10">
            <span className="px-1.5 py-0.5 rounded text-[9.5px] font-mono tracking-tight text-white/75 bg-white/[0.04] border border-white/[0.08] group-hover:border-[rgba(94,210,156,0.3)] group-hover:text-white transition-colors duration-200">
              {step}
            </span>
            {idx < steps.length - 1 && (
              <span className="text-[9px] text-[#5ed29c]/50 font-mono select-none">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Bento Card ───────────────────────────────────────────────────────────────────
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
      x: ((e.clientX - left) / width - 0.5) * 6,
      y: -((e.clientY - top) / height - 0.5) * 6,
    });
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  }, []);

  const Icon = item.icon;
  const colClass = item.colSpan === 2 ? "md:col-span-2" : "";
  const rowClass = item.rowSpan === 2 ? "md:row-span-2" : "";

  return (
    <motion.div
      className={`${colClass} ${rowClass} h-full min-h-[280px]`}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: i * 0.07, ease: EASE }}
    >
      <motion.div
        ref={ref}
        className="group relative h-full rounded-2xl bg-[#0b0f14]/80 backdrop-blur-md border border-white/[0.07] p-6 sm:p-7 flex flex-col gap-4 overflow-hidden cursor-default"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        animate={{ rotateX: tilt.y, rotateY: tilt.x, scale: hovered ? 1.012 : 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      >
        {/* Domain background */}
        <BentoBg type={item.bg} />

        {/* Cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, rgba(94,210,156,0.10), transparent 70%)` }}
        />

        {/* Animated border glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl z-0"
          animate={{
            boxShadow: hovered
              ? "inset 0 0 0 1px rgba(94,210,156,0.45), 0 16px 48px -12px rgba(94,210,156,0.18)"
              : "inset 0 0 0 1px rgba(255,255,255,0.07)",
          }}
          transition={{ duration: 0.35 }}
        />

        {/* Bottom sweep */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-[#5ed29c] to-transparent transition-all duration-500 pointer-events-none z-20" />

        {/* Corner ticks */}
        <span className="pointer-events-none absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/20 group-hover:border-[#5ed29c] transition-colors duration-300 z-10" />
        <span className="pointer-events-none absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/20 group-hover:border-[#5ed29c] transition-colors duration-300 z-10" />
        <span className="pointer-events-none absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/20 group-hover:border-[#5ed29c] transition-colors duration-300 z-10" />
        <span className="pointer-events-none absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/20 group-hover:border-[#5ed29c] transition-colors duration-300 z-10" />

        {/* Top row */}
        <div className="flex items-start justify-between relative z-10">
          <motion.div
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[rgba(94,210,156,0.25)] bg-[rgba(94,210,156,0.05)] text-[#5ed29c] transition-all duration-300 group-hover:border-[rgba(94,210,156,0.6)] group-hover:bg-[rgba(94,210,156,0.12)] group-hover:shadow-[0_0_20px_rgba(94,210,156,0.22)]"
            animate={hovered ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Icon className="w-5 h-5" strokeWidth={1.75} />
          </motion.div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#5ed29c]/70 select-none">{item.number}</span>
            <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase select-none">SYS.v0{i + 1}</span>
          </div>
        </div>

        {/* Status pill */}
        <div className="relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[rgba(94,210,156,0.05)] border border-[rgba(94,210,156,0.16)] w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c] animate-pulse" />
          <span className="text-[9.5px] font-mono font-medium tracking-wider text-[#5ed29c]/85 uppercase">{item.spec}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold uppercase tracking-tight text-white leading-tight relative z-10 group-hover:text-[#5ed29c] transition-colors duration-300 text-base sm:text-lg pt-0.5">
          {item.name}
        </h3>

        {/* Description */}
        <p className="font-light text-white/60 leading-relaxed relative z-10 text-sm flex-1">{item.description}</p>

        {/* Pipeline */}
        <div className="relative z-10">
          <PipelineFlow steps={item.pipeline} delay={i * 0.3} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1 relative z-10 border-t border-white/[0.05]">
          {item.tags.map((tag) => (
            <motion.span
              key={tag}
              className="text-[10px] font-mono font-medium uppercase tracking-wider text-white/60 border border-white/10 rounded px-2 py-0.5 bg-white/[0.02] group-hover:border-[rgba(94,210,156,0.3)] group-hover:text-white/90 transition-all duration-200 cursor-default"
              whileHover={{ scale: 1.06 }}
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
  return (
    <section
      id="skills"
      className="relative font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 overflow-hidden border-t border-white/10 bg-[#0c0c0c]"
      style={{
        padding: "clamp(3rem, 5vw, 5rem) 1.25rem clamp(6rem, 9vw, 9rem)",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── Background Video ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />

        {/* Contrast overlay so cards and typography remain crisp and legible */}
        <div className="absolute inset-0 bg-[#0c0c0c]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/90 via-transparent to-[#0c0c0c]/90" />
      </div>

      {/* Guide lines at container edges */}
      <div className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <BlueprintSectionHeader align="center">
          <div className="mb-12 text-center sm:mb-16 -mt-3 sm:-mt-5">

            {/* Main heading */}
            <motion.h2
              className="font-black leading-[0.92] tracking-tighter text-white text-center"
              style={{ fontSize: "clamp(2.6rem, 6.5vw, 4.8rem)" }}
              initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              My <span className="accent-serif">Expertise</span><span className="text-[#00df8f]">.</span>
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
          </div>
        </BlueprintSectionHeader>

        {/* ── Asymmetric Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 auto-rows-auto">
          {EXPERTISE.map((item, i) => (
            <BentoCard key={item.number} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
