"use client";

import FadeIn from "./FadeIn";

const EXPERTISE = [
  {
    number: "01",
    name: "Data Engineering",
    description:
      "Designing and running production data pipelines with Airflow and DBT, moving and modeling data reliably at scale on BigQuery.",
  },
  {
    number: "02",
    name: "GenAI & RAG Systems",
    description:
      "Building retrieval-augmented generation systems end to end — ingestion, embeddings, vector search, and streaming LLM responses — with LangChain and modern inference APIs.",
  },
  {
    number: "03",
    name: "MLOps",
    description:
      "Standing up model registries, experiment tracking, and versioned deployments so machine learning systems ship and stay reliable in production.",
  },
  {
    number: "04",
    name: "Cloud Architecture",
    description:
      "Designing secure, scalable infrastructure on AWS, drawing on prior cloud and networking engineering work at Tesla, Nokia, and Huawei.",
  },
  {
    number: "05",
    name: "Full-Stack Development",
    description:
      "Shipping the frontend and backend both — from FastAPI services to React interfaces — so a system is usable end to end, not just functional.",
  },
];

const ServicesSection = () => {
  return (
    <section
      id="skills"
      className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20"
      style={{
        background: "#FFFFFF",
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn y={30}>
          <h2
            className="font-black uppercase text-center leading-[1.02] tracking-tight text-[#0d1116]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              marginBottom: "clamp(2.5rem, 5vw, 4.5rem)",
            }}
          >
            Expertise
          </h2>
        </FadeIn>

        {/* Items */}
        <div>
          {EXPERTISE.map((item, i) => (
            <FadeIn key={item.number} delay={i * 0.1} y={20}>
              <div
                className="flex items-start gap-6 md:gap-10"
                style={{
                  padding: "1.25rem 0 1.25rem",
                  borderTop: "1px solid rgba(12, 12, 12, 0.15)",
                  ...(i === EXPERTISE.length - 1
                    ? { borderBottom: "1px solid rgba(12, 12, 12, 0.15)" }
                    : {}),
                }}
              >
                {/* Number */}
                <span
                  className="font-black text-[#0d1116] flex-shrink-0 leading-none"
                  style={{ fontSize: "clamp(2rem, 6vw, 80px)" }}
                >
                  {item.number}
                </span>

                {/* Name + description */}
                <div className="flex flex-col justify-center gap-2 pt-2 md:pt-4">
                  <h3
                    className="font-medium uppercase text-[#0d1116] tracking-wide"
                    style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.5rem)" }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="font-light text-[#0d1116] leading-relaxed max-w-2xl"
                    style={{
                      fontSize: "clamp(0.75rem, 1.2vw, 1rem)",
                      opacity: 0.6,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
