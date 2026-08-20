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
      className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]"
      style={{
        background: "#FFFFFF",
        padding: "5rem 1.25rem clamp(5rem, 8vw, 8rem)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn y={30}>
          <h2
            className="font-black uppercase text-center leading-none tracking-tight text-[#0C0C0C]"
            style={{
              fontSize: "clamp(3rem, 12vw, 160px)",
              marginBottom: "clamp(4rem, 7vw, 7rem)",
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
                  padding: "2rem 0 2rem",
                  borderTop: "1px solid rgba(12, 12, 12, 0.15)",
                  ...(i === EXPERTISE.length - 1
                    ? { borderBottom: "1px solid rgba(12, 12, 12, 0.15)" }
                    : {}),
                }}
              >
                {/* Number */}
                <span
                  className="font-black text-[#0C0C0C] flex-shrink-0 leading-none"
                  style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
                >
                  {item.number}
                </span>

                {/* Name + description */}
                <div className="flex flex-col justify-center gap-2 pt-2 md:pt-4">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="font-light text-[#0C0C0C] leading-relaxed max-w-2xl"
                    style={{
                      fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)",
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
