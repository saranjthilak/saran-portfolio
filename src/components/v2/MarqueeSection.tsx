"use client";

import Marquee from "@/components/v2/Marquee";

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

// Split the tiles into two rows for a more dynamic layered effect
const row1 = STACK_TILES.slice(0, 11);
const row2 = STACK_TILES.slice(11);

const TechTile = ({ name, icon, isOutline }: { name: string; icon: string; isOutline?: boolean }) => (
  <div className="flex-shrink-0 flex items-center gap-4 sm:gap-6 select-none opacity-60 hover:opacity-100 transition-opacity duration-300">
    <span style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>{icon}</span>
    <span
      className="font-podium uppercase tracking-tighter"
      style={{
        fontSize: "clamp(4rem, 10vw, 8rem)",
        color: isOutline ? "transparent" : "#ffffff",
        WebkitTextStroke: isOutline ? "2px rgba(255,255,255,0.4)" : "none",
      }}
    >
      {name}
    </span>
  </div>
);

const MarqueeSection = () => {
  return (
    <section
      className="overflow-hidden font-kanit relative flex items-center justify-center min-h-[50vh]"
      style={{
        background: "#0d1116",
        paddingTop: "clamp(4rem, 8vw, 6rem)",
        paddingBottom: "4rem",
      }}
    >
      {/* Edge Gradients for smooth fade in/out */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-[#0d1116] to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-[#0d1116] to-transparent pointer-events-none" />

      {/* Tilted Wrapper */}
      <div className="flex flex-col gap-6 sm:gap-10 relative z-0 -rotate-3 scale-[1.15]">
        {/* Row 1: Moves Left — each tile rendered once; Marquee duplicates it for the loop */}
        <Marquee direction="left" speed={35} className="gap-8 sm:gap-12 pl-8 sm:pl-12">
          {row1.map((tile, i) => (
            <TechTile key={`r1-${tile.name}`} {...tile} isOutline={i % 2 !== 0} />
          ))}
        </Marquee>

        {/* Row 2: Moves Right */}
        <Marquee direction="right" speed={40} className="gap-8 sm:gap-12 pl-8 sm:pl-12">
          {row2.map((tile, i) => (
            <TechTile key={`r2-${tile.name}`} {...tile} isOutline={i % 2 === 0} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default MarqueeSection;
