"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const EXPERTISE = [
  {
    number: "01",
    name: "Data Engineering",
    icon: "⚙️",
    description:
      "Designing and running production data pipelines with Airflow and DBT, moving and modeling data reliably at scale on BigQuery.",
    tags: ["Airflow", "DBT", "BigQuery", "ETL/ELT"],
  },
  {
    number: "02",
    name: "GenAI & RAG Systems",
    icon: "🤖",
    description:
      "Building retrieval-augmented generation systems end to end — ingestion, embeddings, vector search, and streaming LLM responses — with LangChain and modern inference APIs.",
    tags: ["LangChain", "Vector DB", "LLMs", "Embeddings"],
  },
  {
    number: "03",
    name: "MLOps",
    icon: "🔄",
    description:
      "Standing up model registries, experiment tracking, and versioned deployments so machine learning systems ship and stay reliable in production.",
    tags: ["MLflow", "CI/CD", "Model Registry", "Monitoring"],
  },
  {
    number: "04",
    name: "Cloud Architecture",
    icon: "☁️",
    description:
      "Designing secure, scalable infrastructure on AWS and GCP, drawing on prior cloud and networking engineering work at Tesla, Nokia, and Huawei.",
    tags: ["AWS", "GCP", "Terraform", "IaC"],
  },
  {
    number: "05",
    name: "Full-Stack Development",
    icon: "🖥️",
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
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const ServicesSection = () => {
  return (
    <section
      id="skills"
      className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 overflow-hidden"
      style={{
        background: "#0d1116",
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-[#00df8f]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <FadeIn y={30}>
          <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
            <p className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-[#ffffff]/40 text-xs mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00df8f] inline-block" />
              What I do
            </p>
            <h2
              className="font-black uppercase leading-[1.02] tracking-tight text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Expertise
            </h2>
          </div>
        </FadeIn>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {EXPERTISE.map((item, i) => (
            <motion.div
              key={item.number}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              whileHover="hover"
              className={`group relative rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 sm:p-8 flex flex-col gap-5 overflow-hidden cursor-default transition-colors duration-300 hover:border-[#00df8f]/30 hover:bg-white/[0.05]
                ${i === 4 ? "md:col-span-2" : ""}
              `}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,223,143,0.07) 0%, transparent 70%)" }}
              />

              {/* Top row: number + icon */}
              <div className="flex items-start justify-between">
                <span
                  className="font-black text-[#00df8f] leading-none select-none"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", opacity: 0.25 }}
                >
                  {item.number}
                </span>
                <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {item.icon}
                </span>
              </div>

              {/* Name */}
              <h3
                className="font-bold uppercase tracking-wide text-white leading-tight"
                style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
              >
                {item.name}
              </h3>

              {/* Description */}
              <p
                className="font-light text-white/50 leading-relaxed flex-1"
                style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)" }}
              >
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold uppercase tracking-widest text-[#00df8f]/70 border border-[#00df8f]/20 rounded-full px-2.5 py-0.5 bg-[#00df8f]/[0.05]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#00df8f]/60 to-transparent transition-all duration-500 rounded-b-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
