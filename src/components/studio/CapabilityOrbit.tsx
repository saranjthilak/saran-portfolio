"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Hub = { id: string; label: string; blurb: string; skills: string[] };

const HUBS: Hub[] = [
  {
    id: "llms",
    label: "LLMs",
    blurb: "Fine-tuning, prompt design and evaluation harnesses for models that behave in production.",
    skills: ["Prompt Engineering", "LangChain", "NLP", "PyTorch", "Deep Learning", "Hallucination Guardrails"],
  },
  {
    id: "rag",
    label: "RAG",
    blurb: "Retrieval pipelines — chunking, reranking and grounded answers with citations.",
    skills: ["LangChain", "Vector DB", "NLP", "FastAPI", "Prompt Engineering", "Evaluation"],
  },
  {
    id: "vectordb",
    label: "Vector DB",
    blurb: "Embedding stores and similarity search tuned for latency and recall.",
    skills: ["FAISS", "Vector DB", "Embeddings", "MongoDB", "BigQuery", "Python"],
  },
  {
    id: "mlops",
    label: "MLOps",
    blurb: "Training-to-serving loops: tracking, registries, CI/CD and drift monitoring.",
    skills: ["MLflow", "MLOps", "Docker", "CI/CD", "Automated Testing", "Airflow"],
  },
  {
    id: "cloud",
    label: "Cloud",
    blurb: "Infrastructure as code, orchestrated data platforms and observability, tuned for cost.",
    skills: ["AWS", "GCP", "Terraform", "Kubernetes", "Airflow", "DBT", "IaC", "BigQuery"],
  },
];

/* shared skills create the cross-links between hubs */
const relatedHubs = (hub: Hub) =>
  HUBS.filter((h) => h.id !== hub.id && h.skills.some((s) => hub.skills.includes(s))).map((h) => h.id);

const R = 33; // orbit radius in % of container
const pos = (i: number, n: number) => {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + Math.cos(a) * R * 1.35, y: 50 + Math.sin(a) * R };
};

const CapabilityOrbit = () => {
  const [active, setActive] = useState<string | null>(null);
  const [auto, setAuto] = useState(0);

  useEffect(() => {
    if (active) return;
    const t = setInterval(() => setAuto((v) => (v + 1) % HUBS.length), 3200);
    return () => clearInterval(t);
  }, [active]);

  const current = HUBS.find((h) => h.id === active) ?? HUBS[auto];
  const linked = relatedHubs(current);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      {/* graph */}
      <div
        className="relative aspect-[4/3] w-full sm:aspect-[16/11]"
        onMouseLeave={() => setActive(null)}
      >
        {/* orbit rings */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <ellipse cx="50" cy="50" rx={R * 1.35} ry={R} fill="none" stroke="currentColor" strokeWidth="0.12" className="text-border" />
          <ellipse cx="50" cy="50" rx={R * 0.78} ry={R * 0.58} fill="none" stroke="currentColor" strokeWidth="0.12" strokeDasharray="1 1.6" className="text-border" />
          {HUBS.map((h, i) => {
            const p = pos(i, HUBS.length);
            const isCur = h.id === current.id;
            const isLinked = linked.includes(h.id);
            return (
              <g key={h.id}>
                <line
                  x1="50" y1="50" x2={p.x} y2={p.y}
                  stroke="currentColor" strokeWidth={isCur ? 0.35 : 0.14}
                  className={isCur ? "text-foreground" : isLinked ? "text-foreground/40" : "text-border"}
                  style={{ transition: "all .4s ease" }}
                />
                {isLinked && (
                  <line
                    x1={pos(HUBS.findIndex((x) => x.id === current.id), HUBS.length).x}
                    y1={pos(HUBS.findIndex((x) => x.id === current.id), HUBS.length).y}
                    x2={p.x} y2={p.y}
                    stroke="currentColor" strokeWidth="0.18" strokeDasharray="1.2 1.2"
                    className="text-foreground/35"
                  >
                    <animate attributeName="stroke-dashoffset" from="4.8" to="0" dur="1.4s" repeatCount="indefinite" />
                  </line>
                )}
              </g>
            );
          })}
        </svg>

        {/* center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-border bg-background text-center shadow-sm sm:h-28 sm:w-28">
            <span className="font-display text-sm font-semibold leading-tight tracking-[-0.02em]">AI<br />Systems</span>
          </div>
        </div>

        {/* hub nodes */}
        {HUBS.map((h, i) => {
          const p = pos(i, HUBS.length);
          const isCur = h.id === current.id;
          const isLinked = linked.includes(h.id);
          return (
            <button
              key={h.id}
              onMouseEnter={() => setActive(h.id)}
              onFocus={() => setActive(h.id)}
              onClick={() => setActive(h.id)}
              aria-pressed={isCur}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <motion.span
                animate={{ scale: isCur ? 1.08 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={[
                  "block rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 sm:px-5 sm:py-2.5",
                  isCur
                    ? "border-foreground bg-foreground text-background shadow-md"
                    : isLinked
                      ? "border-foreground/40 bg-background text-foreground"
                      : "border-border bg-background text-muted-foreground",
                ].join(" ")}
              >
                {h.label}
              </motion.span>
            </button>
          );
        })}
      </div>

      {/* detail panel */}
      <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        <motion.div key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Node</p>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em]">{current.label}</h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{current.blurb}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {current.skills.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                className="tag border-border text-foreground/75"
              >
                {s}
              </motion.span>
            ))}
          </div>

          {linked.length > 0 && (
            <p className="mt-6 text-xs text-muted-foreground">
              Connects to{" "}
              <span className="text-foreground">
                {linked.map((id) => HUBS.find((h) => h.id === id)?.label).join(" · ")}
              </span>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CapabilityOrbit;
