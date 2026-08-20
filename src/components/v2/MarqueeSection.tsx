"use client";

import { useEffect, useRef } from "react";

const STACK_TILES = [
  { name: "LangChain", icon: "🔗" },
  { name: "Airflow", icon: "🌊" },
  { name: "DBT", icon: "🔧" },
  { name: "BigQuery", icon: "🗄️" },
  { name: "FastAPI", icon: "⚡" },
  { name: "ChromaDB", icon: "🔮" },
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
  { name: "Kubernetes", icon: "⚙️" },
  { name: "Terraform", icon: "🏗️" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Groq", icon: "🚀" },
  { name: "HuggingFace", icon: "🤗" },
  { name: "Prometheus", icon: "🔥" },
  { name: "Grafana", icon: "📊" },
  { name: "Vercel", icon: "▲" },
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Python", icon: "🐍" },
  { name: "Poetry", icon: "📦" },
  { name: "MLflow", icon: "🧪" },
];

// Quadruple for seamless infinite loop
const looped = [...STACK_TILES, ...STACK_TILES, ...STACK_TILES, ...STACK_TILES];

const TechTile = ({ name, icon }: { name: string; icon: string }) => (
  <div
    className="flex-shrink-0 flex items-center gap-2 rounded-full select-none px-5 py-2.5 opacity-40"
    style={{
      background: "linear-gradient(135deg, #161616 0%, #1e1e1e 100%)",
      border: "1px solid #2a2a2a",
    }}
  >
    <span className="text-base">{icon}</span>
    <span
      className="font-kanit font-medium uppercase tracking-wider text-[#D7E2EA]"
      style={{ fontSize: "clamp(0.55rem, 0.9vw, 0.75rem)" }}
    >
      {name}
    </span>
  </div>
);

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const autoOffset = useRef(0);
  const frameId = useRef(0);

  useEffect(() => {
    const tick = () => {
      autoOffset.current += 0.5;
      if (rowRef.current) rowRef.current.style.transform = `translateX(${-autoOffset.current}px)`;
      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden font-kanit"
      style={{
        background: "#0C0C0C",
        paddingTop: "clamp(6rem, 10vw, 10rem)",
        paddingBottom: "2.5rem",
      }}
    >
      <div
        ref={rowRef}
        className="flex gap-2"
        style={{ willChange: "transform" }}
      >
        {looped.map((tile, i) => (
          <TechTile key={`t-${i}`} {...tile} />
        ))}
      </div>
    </section>
  );
};

export default MarqueeSection;
