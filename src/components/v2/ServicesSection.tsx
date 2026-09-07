"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import BlueprintSectionHeader from "./BlueprintSectionHeader";
import {
  Database,
  BrainCircuit,
  GitBranch,
  Cloud,
  Monitor,
} from "lucide-react";

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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

const ServicesSection = () => {
  return (
    <section
      id="skills"
      className="blueprint-section font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 overflow-hidden border-t border-accent/20"
      style={{
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn y={30}>
          <BlueprintSectionHeader index="SECTION_02" label="Capabilities" align="center">
            <div className="mb-16 text-center sm:mb-20">
              <h2 className="font-black uppercase leading-[1.02] tracking-tight text-foreground" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
                Expertise
              </h2>
            </div>
          </BlueprintSectionHeader>
        </FadeIn>

        {/* Cards grid: 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {EXPERTISE.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={cardVariants}
                whileHover="hover"
                 className="blueprint-cell group relative rounded-none border p-7 sm:p-8 flex flex-col gap-5 overflow-hidden cursor-default transition-all duration-300 hover:border-accent/50 hover:-translate-y-1"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                     background: "radial-gradient(ellipse at 50% 0%, hsl(var(--accent) / 0.07) 0%, transparent 70%)",
                  }}
                />

                {/* Top row: icon + number */}
                <div className="flex items-start justify-between relative z-10">
                   <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-accent/30 bg-accent/[0.06] text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/[0.12]">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                   <span className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground select-none">
                    {item.number}
                  </span>
                </div>

                {/* Name */}
                <h3
                   className="font-bold uppercase tracking-wide text-foreground leading-tight relative z-10"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
                >
                  {item.name}
                </h3>

                {/* Description */}
                <p
                   className="font-light text-muted-foreground leading-relaxed flex-1 relative z-10"
                  style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)" }}
                >
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1 relative z-10">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                       className="text-[10px] font-semibold uppercase tracking-widest text-accent/80 border border-accent/20 rounded-full px-2.5 py-0.5 bg-accent/[0.05]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom accent line */}
                 <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-accent transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
