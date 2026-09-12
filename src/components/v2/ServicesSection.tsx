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
  },
];

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

// ── 3-D Tilt & Spotlight Card ────────────────────────────────────────────────
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 8;
    const y = -((e.clientY - top) / height - 0.5) * 8;
    setTilt({ x, y });
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  }, []);

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      animate={{ rotateX: tilt.y, rotateY: tilt.x, scale: hovered ? 1.015 : 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      {/* Dynamic Cursor Spotlight Follow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(94, 210, 156, 0.12), transparent 70%)`,
        }}
      />

      {/* Reactive Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-all duration-300 z-0"
        style={{
          border: hovered ? "1px solid rgba(94, 210, 156, 0.45)" : "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: hovered
            ? "0 12px 36px -10px rgba(94, 210, 156, 0.16), 0 0 24px rgba(94, 210, 156, 0.08)"
            : "none",
        }}
      />

      {/* Corner crosshairs on hover */}
      <span className="pointer-events-none absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 transition-all duration-300 group-hover:border-[#5ed29c] group-hover:w-3 group-hover:h-3 z-10" />
      <span className="pointer-events-none absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 transition-all duration-300 group-hover:border-[#5ed29c] group-hover:w-3 group-hover:h-3 z-10" />
      <span className="pointer-events-none absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 transition-all duration-300 group-hover:border-[#5ed29c] group-hover:w-3 group-hover:h-3 z-10" />
      <span className="pointer-events-none absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 transition-all duration-300 group-hover:border-[#5ed29c] group-hover:w-3 group-hover:h-3 z-10" />

      {children}
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
        padding: "clamp(5rem, 8vw, 8rem) 1.25rem clamp(6rem, 9vw, 9rem)",
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
          <div className="mb-14 text-center sm:mb-18">
            {/* Section pill eyebrow */}
            <motion.p
              className="flex items-center justify-center gap-2 font-medium uppercase tracking-[0.25em] text-xs mb-4"
              style={{ color: "rgba(94,210,156,0.85)" }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
                style={{ background: "rgba(94,210,156,1)", boxShadow: "0 0 8px rgba(94,210,156,0.8)" }}
              />
              System Architecture & Core Capabilities
            </motion.p>

            {/* Main heading */}
            <motion.h2
              className="font-black uppercase leading-[1.02] tracking-[-0.04em] text-white text-center"
              style={{ fontSize: "clamp(2.6rem, 6.5vw, 4.8rem)" }}
              initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              My{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, rgba(94,210,156,1), rgba(115,255,0,0.9), rgba(94,210,156,1))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Expertise.
              </span>
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

        {/* Cards grid — 3x2 on desktop, 2x3 on tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {EXPERTISE.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 45, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="h-full"
              >
                <TiltCard className="group rounded-2xl border border-white/[0.08] bg-[#0c1015]/75 backdrop-blur-md p-6 sm:p-7 flex flex-col gap-4 overflow-hidden cursor-default h-full relative">

                  {/* Top row: icon + index & system version */}
                  <div className="flex items-start justify-between relative z-10">
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-[rgba(94,210,156,0.3)] bg-[rgba(94,210,156,0.06)] text-[#5ed29c] transition-all duration-300 group-hover:border-[rgba(94,210,156,0.65)] group-hover:bg-[rgba(94,210,156,0.12)] group-hover:shadow-[0_0_24px_rgba(94,210,156,0.25)]"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </motion.div>

                    <div className="flex flex-col items-end">
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#5ed29c]/80 select-none">
                        {item.number}
                      </span>
                      <span className="text-[9px] font-mono tracking-widest text-white/35 uppercase mt-0.5 select-none">
                        SYS.v0{i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Spec / SLA Status Pill */}
                  <div className="relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[rgba(94,210,156,0.05)] border border-[rgba(94,210,156,0.18)] w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c] animate-pulse" />
                    <span className="text-[10px] font-mono font-medium tracking-wider text-[#5ed29c]/90 uppercase">
                      {item.spec}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold uppercase tracking-tight text-white leading-tight relative z-10 group-hover:text-[#5ed29c] transition-colors duration-300 text-lg sm:text-xl pt-0.5"
                  >
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-light text-white/65 leading-relaxed relative z-10 text-sm flex-1"
                  >
                    {item.description}
                  </p>

                  {/* Visual Architecture Pipeline with animated beam */}
                  <div className="relative z-10">
                    <PipelineFlow steps={item.pipeline} delay={i * 0.3} />
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1 relative z-10 border-t border-white/[0.06]">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono font-medium uppercase tracking-wider text-white/70 border border-white/10 rounded px-2 py-0.5 bg-white/[0.02] group-hover:border-[rgba(94,210,156,0.28)] group-hover:text-white transition-all duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom accent glow sweep line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-[#5ed29c] to-transparent transition-all duration-500 pointer-events-none" />
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
