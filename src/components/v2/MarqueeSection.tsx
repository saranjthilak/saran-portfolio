"use client";

import { useEffect, useRef, useState } from "react";

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

const ROW1 = STACK_TILES.slice(0, 11);
const ROW2 = STACK_TILES.slice(11);

// Triple for seamless infinite visual
const tripled = <T,>(arr: T[]) => [...arr, ...arr, ...arr];

const TechTile = ({ name, icon }: { name: string; icon: string }) => (
  <div
    className="flex-shrink-0 flex flex-col items-center justify-center gap-3 rounded-2xl select-none"
    style={{
      width: 150,
      height: 90,
      background: "linear-gradient(135deg, #161616 0%, #1e1e1e 100%)",
      border: "1px solid #2a2a2a",
    }}
  >
    <span className="text-xl">{icon}</span>
    <span
      className="font-kanit font-medium uppercase tracking-wider text-[#D7E2EA]"
      style={{ fontSize: "clamp(0.6rem, 1vw, 0.8rem)" }}
    >
      {name}
    </span>
  </div>
);

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(200);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const raw = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(raw);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const row1Tiles = tripled(ROW1);
  const row2Tiles = tripled(ROW2);

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
      <div className="flex flex-col gap-2">
        {/* Row 1 — moves right */}
        <div
          className="flex gap-2"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: "transform",
          }}
        >
          {row1Tiles.map((tile, i) => (
            <TechTile key={`r1-${i}`} {...tile} />
          ))}
        </div>

        {/* Row 2 — moves left */}
        <div
          className="flex gap-2"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: "transform",
          }}
        >
          {row2Tiles.map((tile, i) => (
            <TechTile key={`r2-${i}`} {...tile} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
