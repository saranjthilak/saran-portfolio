"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const relatedHubs = (hub: Hub) =>
  HUBS.filter((h) => h.id !== hub.id && h.skills.some((s) => hub.skills.includes(s))).map((h) => h.id);

const R = 33;
const pos = (i: number, n: number) => {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + Math.cos(a) * R * 1.35, y: 50 + Math.sin(a) * R };
};

// ── Pulse packet animation state ────────────────────────────────────────────
type PulseEdge = { fromId: string; toId: string; key: number };

const CapabilityOrbit = () => {
  const [active, setActive] = useState<string | null>(null);
  const [auto, setAuto] = useState(0);
  const [pulses, setPulses] = useState<PulseEdge[]>([]);
  const pulseKeyRef = useRef(0);

  // Auto-cycle when nothing is hovered
  useEffect(() => {
    if (active) return;
    const t = setInterval(() => setAuto((v) => (v + 1) % HUBS.length), 3200);
    return () => clearInterval(t);
  }, [active]);

  const current = HUBS.find((h) => h.id === active) ?? HUBS[auto];
  const linked = relatedHubs(current);

  // Fire pulse packets along all edges of the newly-hovered node
  const handleHoverNode = (id: string) => {
    setActive(id);
    const hub = HUBS.find((h) => h.id === id);
    if (!hub) return;
    const edges: PulseEdge[] = relatedHubs(hub).map((toId) => ({
      fromId: id,
      toId,
      key: ++pulseKeyRef.current,
    }));
    // Hub → center
    edges.push({ fromId: id, toId: "center", key: ++pulseKeyRef.current });
    setPulses((prev) => [...prev, ...edges]);
    // Auto-remove after animation finishes
    setTimeout(() => {
      setPulses((prev) => prev.filter((p) => !edges.find((e) => e.key === p.key)));
    }, 1200);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      {/* ── Graph canvas ── */}
      <div
        className="relative aspect-[4/3] w-full sm:aspect-[16/11]"
        onMouseLeave={() => setActive(null)}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Glow for active/lit edges */}
            <filter id="co-edge-glow" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="0.6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Glow for central halo & active nodes */}
            <filter id="co-node-glow" x="-80%" y="-80%" width="360%" height="360%">
              <feGaussianBlur stdDeviation="1.2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Soft radial glow painted behind the center node */}
            <radialGradient id="co-center-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="hsl(185 100% 50% / 0.18)" />
              <stop offset="100%" stopColor="hsl(185 100% 50% / 0)" />
            </radialGradient>
          </defs>

          {/* ── Orbit guide rings ── */}
          <ellipse cx="50" cy="50" rx={R * 1.35} ry={R}
            fill="none" stroke="hsl(185 100% 50% / 0.07)" strokeWidth="0.15" />
          <ellipse cx="50" cy="50" rx={R * 0.72} ry={R * 0.53}
            fill="none" stroke="hsl(185 100% 50% / 0.05)" strokeWidth="0.12" strokeDasharray="0.8 1.4" />

          {/* ── Static base edges (dim, always visible) ── */}
          {HUBS.map((h, i) => {
            const p = pos(i, HUBS.length);
            return (
              <line key={`base-${h.id}`}
                x1="50" y1="50" x2={p.x} y2={p.y}
                stroke="hsl(185 100% 50% / 0.10)"
                strokeWidth="0.14"
              />
            );
          })}

          {/* ── Flowing dashed edges (always animated, dim except when active) ── */}
          {HUBS.map((h, i) => {
            const p = pos(i, HUBS.length);
            const isCur    = h.id === current.id;
            const isLinked = linked.includes(h.id);
            const bright   = isCur || isLinked;

            return (
              <g key={`flow-${h.id}`}>
                {/* Spoke from center → node */}
                <line
                  x1="50" y1="50" x2={p.x} y2={p.y}
                  stroke={bright ? "hsl(185 100% 50%)" : "hsl(185 100% 50% / 0.18)"}
                  strokeWidth={isCur ? 0.38 : isLinked ? 0.22 : 0.14}
                  strokeDasharray="1.4 1.8"
                  filter={bright ? "url(#co-edge-glow)" : undefined}
                  style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from={isCur ? "6.4" : "3.2"}
                    to="0"
                    dur={isCur ? "0.7s" : "1.4s"}
                    repeatCount="indefinite"
                  />
                </line>

                {/* Cross-link edge between current hub and each linked hub */}
                {isLinked && (() => {
                  const curP = pos(HUBS.findIndex((x) => x.id === current.id), HUBS.length);
                  return (
                    <line
                      x1={curP.x} y1={curP.y} x2={p.x} y2={p.y}
                      stroke="hsl(185 100% 50% / 0.55)"
                      strokeWidth="0.22"
                      strokeDasharray="1.2 1.4"
                      filter="url(#co-edge-glow)"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="5.2" to="0"
                        dur="0.9s"
                        repeatCount="indefinite"
                      />
                    </line>
                  );
                })()}
              </g>
            );
          })}

          {/* ── Hover-triggered pulse packets ── */}
          {pulses.map((pulse) => {
            const fromIdx = HUBS.findIndex((h) => h.id === pulse.fromId);
            const toIdx   = HUBS.findIndex((h) => h.id === pulse.toId);
            const from    = fromIdx >= 0 ? pos(fromIdx, HUBS.length) : { x: 50, y: 50 };
            const to      = toIdx   >= 0 ? pos(toIdx,   HUBS.length) : { x: 50, y: 50 };

            return (
              <circle key={pulse.key} r="0.9" fill="hsl(185 100% 80%)" filter="url(#co-node-glow)">
                <animateMotion
                  dur="0.75s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.25 0.1 0.25 1"
                  path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                />
                <animate attributeName="opacity" values="0;1;1;0" dur="0.75s" fill="freeze" />
                <animate attributeName="r"       values="0.5;1.1;0.9;0.3" dur="0.75s" fill="freeze" />
              </circle>
            );
          })}

          {/* ── Central halo aura (painted behind center node HTML via SVG) ── */}
          <circle cx="50" cy="50" r="10" fill="url(#co-center-halo)" />
        </svg>

        {/* ── Central "Saran" node with pulsing rings ── */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          {/* Outer pulse rings */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span
              className="absolute block rounded-full border border-accent/20"
              style={{
                width: "7.5rem", height: "7.5rem",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                animation: "co-halo-ring 2.6s ease-out infinite",
              }}
            />
            <span
              className="absolute block rounded-full border border-accent/12"
              style={{
                width: "9rem", height: "9rem",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                animation: "co-halo-ring 2.6s ease-out 0.6s infinite",
              }}
            />
          </span>

          {/* Core node */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px 0px hsl(185 100% 50% / 0)",
                "0 0 18px 4px hsl(185 100% 50% / 0.35)",
                "0 0 10px 2px hsl(185 100% 50% / 0.18)",
                "0 0 0px 0px hsl(185 100% 50% / 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border border-accent/50 bg-background text-center sm:h-28 sm:w-28"
            style={{ boxShadow: "0 0 12px 2px hsl(185 100% 50% / 0.15)" }}
          >
            <span className="font-display text-sm font-semibold leading-tight tracking-[-0.02em] text-accent">
              Saran
            </span>
            <span className="mt-0.5 font-mono text-[0.52rem] uppercase tracking-widest text-accent/50">
              AI · ML
            </span>
          </motion.div>
        </div>

        {/* ── Hub nodes ── */}
        {HUBS.map((h, i) => {
          const p        = pos(i, HUBS.length);
          const isCur    = h.id === current.id;
          const isLinked = linked.includes(h.id);
          return (
            <button
              key={h.id}
              onMouseEnter={() => handleHoverNode(h.id)}
              onFocus={() => handleHoverNode(h.id)}
              onClick={() => setActive(h.id)}
              aria-pressed={isCur}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <motion.span
                animate={{ scale: isCur ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={[
                  "block rounded-full border px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-300 sm:px-5 sm:py-2.5",
                  isCur
                    ? "border-accent bg-accent/10 text-accent"
                    : isLinked
                    ? "border-accent/35 bg-background text-foreground/80"
                    : "border-border bg-background text-muted-foreground",
                ].join(" ")}
                style={isCur ? {
                  boxShadow: "0 0 14px 2px hsl(185 100% 50% / 0.30), inset 0 0 8px hsl(185 100% 50% / 0.08)",
                } : isLinked ? {
                  boxShadow: "0 0 6px 1px hsl(185 100% 50% / 0.12)",
                } : undefined}
              >
                {h.label}
              </motion.span>
            </button>
          );
        })}
      </div>

      {/* ── Detail panel ── */}
      <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-accent/60">Node</p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em]">{current.label}</h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{current.blurb}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {current.skills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  className="tag border-accent/25 text-foreground/75 transition-colors duration-300 hover:border-accent/60 hover:text-accent"
                >
                  {s}
                </motion.span>
              ))}
            </div>

            {linked.length > 0 && (
              <p className="mt-6 font-mono text-xs text-muted-foreground">
                Connects to{" "}
                <span className="text-accent">
                  {linked.map((id) => HUBS.find((h) => h.id === id)?.label).join(" · ")}
                </span>
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Keyframe for central halo rings */}
      <style>{`
        @keyframes co-halo-ring {
          0%   { transform: translate(-50%, -50%) scale(0.85); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(1.35); opacity: 0;   }
        }
      `}</style>
    </div>
  );
};

export default CapabilityOrbit;
