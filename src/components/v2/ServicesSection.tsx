"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

// ── Cyan particle canvas (matches --accent: 185 100% 50% = #00f0ff) ──────────
const CYAN = "rgba(0,240,255,";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; pulse: number;
    }[] = [];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.4 + 0.08,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `${CYAN}${0.07 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        p.pulse += 0.02;
        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${CYAN}${a})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;  if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
import BlueprintSectionHeader from "./BlueprintSectionHeader";
import {
  Database,
  BrainCircuit,
  GitBranch,
  Cloud,
  Monitor,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const EXPERTISE = [
  {
    number: "01",
    name: "Data Engineering",
    icon: Database,
    description:
      "Designing and running production data pipelines with Airflow and DBT, moving and modeling data reliably at scale on BigQuery.",
    tags: ["Airflow", "DBT", "BigQuery", "ETL/ELT"],
  },
  {
    number: "02",
    name: "GenAI & RAG Systems",
    icon: BrainCircuit,
    description:
      "Building retrieval-augmented generation systems end to end — ingestion, embeddings, vector search, and streaming LLM responses — with LangChain and modern inference APIs.",
    tags: ["LangChain", "Vector DB", "LLMs", "Embeddings"],
  },
  {
    number: "03",
    name: "MLOps",
    icon: GitBranch,
    description:
      "Standing up model registries, experiment tracking, and versioned deployments so machine learning systems ship and stay reliable in production.",
    tags: ["MLflow", "CI/CD", "Model Registry", "Monitoring"],
  },
  {
    number: "04",
    name: "Cloud Architecture",
    icon: Cloud,
    description:
      "Designing secure, scalable infrastructure on AWS and GCP, drawing on prior cloud and networking engineering work at Tesla, Nokia, and Huawei.",
    tags: ["AWS", "GCP", "Terraform", "IaC"],
  },
  {
    number: "05",
    name: "Full-Stack Development",
    icon: Monitor,
    description:
      "Shipping the frontend and backend both — from FastAPI services to React interfaces — so a system is usable end to end, not just functional.",
    tags: ["FastAPI", "React", "Docker", "REST APIs"],
  },
];

// ── 3-D tilt card (same as ProjectsSection) ──────────────────────────────────
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 12;
    const y = -((e.clientY - top) / height - 0.5) * 12;
    setTilt({ x, y });
  }, []);

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective: "900px", transformStyle: "preserve-3d" }}
      animate={{ rotateX: tilt.y, rotateY: tilt.x, scale: hovered ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      {/* Glow border */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: hovered
            ? "0 0 0 1.5px hsl(var(--accent) / 0.7), 0 0 32px hsl(var(--accent) / 0.12)"
            : "0 0 0 1px rgba(255,255,255,0.08)",
        }}
        transition={{ duration: 0.25 }}
      />
      {children}
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
const HEADING_WORDS = ["My", "Expertise"];

const ServicesSection = () => {
  return (
    <section
      id="skills"
      className="relative font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 overflow-hidden border-t border-accent/20"
      style={{
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem clamp(6rem, 10vw, 10rem)",
        background: "linear-gradient(160deg, #030d0e 0%, #040f10 40%, #030c0d 70%, #020909 100%)",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── Layered decorative background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleCanvas />

        {/* Cyan grid */}
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(${CYAN}0.04) 1px, transparent 1px), linear-gradient(90deg, ${CYAN}0.04) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />

        {/* Glow orbs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full" style={{ background: `radial-gradient(circle, ${CYAN}0.07) 0%, transparent 70%)` }} />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full" style={{ background: `radial-gradient(circle, ${CYAN}0.05) 0%, transparent 70%)` }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full" style={{ background: `radial-gradient(ellipse, ${CYAN}0.03) 0%, transparent 65%)` }} />

        {/* Rotating geometry */}
        <svg className="absolute top-10 right-10 w-28 h-28 opacity-[0.05]" viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ animation: "ex-spin 50s linear infinite" }}>
          <rect x="10" y="10" width="80" height="80" stroke={`${CYAN}1)`} strokeWidth="1.5"/>
          <rect x="25" y="25" width="50" height="50" stroke={`${CYAN}1)`} strokeWidth="1"/>
          <rect x="40" y="40" width="20" height="20" stroke={`${CYAN}1)`} strokeWidth="0.8"/>
        </svg>
        <svg className="absolute bottom-16 left-10 w-20 h-20 opacity-[0.05]" viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ animation: "ex-spin 38s linear infinite reverse" }}>
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" stroke={`${CYAN}1)`} strokeWidth="1.5"/>
          <polygon points="50,22 78,36 78,64 50,78 22,64 22,36" stroke={`${CYAN}1)`} strokeWidth="1"/>
        </svg>
        <svg className="absolute top-1/3 left-1/4 w-14 h-14 opacity-[0.04]" viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ animation: "ex-spin 60s linear infinite" }}>
          <circle cx="50" cy="50" r="45" stroke={`${CYAN}1)`} strokeWidth="1.5"/>
          <circle cx="50" cy="50" r="28" stroke={`${CYAN}1)`} strokeWidth="1"/>
        </svg>

        {/* Scan lines */}
        <div className="absolute left-0 w-full h-px" style={{ top: "33%", background: `linear-gradient(90deg, transparent, ${CYAN}0.1), transparent)` }} />
        <div className="absolute left-0 w-full h-px" style={{ top: "66%", background: `linear-gradient(90deg, transparent, ${CYAN}0.07), transparent)` }} />

        {/* Corner brackets */}
        <svg className="absolute top-8 left-8 w-8 h-8 opacity-20" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M0 16 L0 0 L16 0" stroke={`${CYAN}1)`} strokeWidth="2"/></svg>
        <svg className="absolute top-8 right-8 w-8 h-8 opacity-20" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M32 16 L32 0 L16 0" stroke={`${CYAN}1)`} strokeWidth="2"/></svg>
        <svg className="absolute bottom-8 left-8 w-8 h-8 opacity-20" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M0 16 L0 32 L16 32" stroke={`${CYAN}1)`} strokeWidth="2"/></svg>
        <svg className="absolute bottom-8 right-8 w-8 h-8 opacity-20" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M32 16 L32 32 L16 32" stroke={`${CYAN}1)`} strokeWidth="2"/></svg>

        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)" }} />
      </div>

      {/* Keyframes */}
      <style>{`@keyframes ex-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      <div className="relative z-10 max-w-6xl mx-auto">
        <BlueprintSectionHeader align="center">
          <div className="mb-16 text-center sm:mb-20">
            {/* Word-by-word stagger heading — matches ProjectsSection */}
            <motion.h2
              className="font-black uppercase leading-[1.02] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
            >
              {HEADING_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  className={`inline-block mr-[0.25em] ${i === 1 ? "accent-serif" : ""}`}
                  variants={{
                    hidden: { opacity: 0, y: 40, skewY: 4 },
                    visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.65, ease: EASE } },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            {/* Animated underline */}
            <motion.div
              className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
              style={{ width: "min(200px, 40%)" }}
            />
          </div>
        </BlueprintSectionHeader>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {EXPERTISE.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 50, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
              >
                <TiltCard className="blueprint-cell group rounded-2xl border border-border/70 bg-card/40 p-7 sm:p-8 flex flex-col gap-5 overflow-hidden cursor-default h-full">

                  {/* Hover radial glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background: "radial-gradient(ellipse at 50% 0%, hsl(var(--accent) / 0.09) 0%, transparent 70%)",
                    }}
                  />

                  {/* Top row: icon + number */}
                  <div className="flex items-start justify-between relative z-10">
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-accent/30 bg-accent/[0.06] text-accent"
                      whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--accent) / 0.12)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </motion.div>
                    <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/60 select-none">
                      {item.number}
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    className="font-bold uppercase tracking-wide text-foreground leading-tight relative z-10 group-hover:text-accent transition-colors duration-300"
                    style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" }}
                  >
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-light text-muted-foreground leading-relaxed flex-1 relative z-10"
                    style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.92rem)" }}
                  >
                    {item.description}
                  </p>

                  {/* Tags — staggered pop-in on card enter */}
                  <motion.div
                    className="flex flex-wrap gap-2 pt-1 relative z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 + i * 0.08 } } }}
                  >
                    {item.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="text-[10px] font-semibold uppercase tracking-widest text-accent/80 border border-accent/20 rounded-full px-2.5 py-0.5 bg-accent/[0.05] hover:border-accent/50 hover:bg-accent/[0.1] transition-colors duration-200 cursor-default"
                        variants={{
                          hidden: { opacity: 0, scale: 0.7, y: 6 },
                          visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Bottom accent line — grows on hover */}
                  <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-accent/60 via-accent to-accent/60 transition-all duration-500" />
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

