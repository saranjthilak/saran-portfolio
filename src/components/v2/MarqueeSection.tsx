"use client";

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
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-left {
            display: flex;
            width: max-content;
            animation: marquee-left 35s linear infinite;
          }
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: marquee-right 40s linear infinite;
          }
          .animate-marquee-left:hover, .animate-marquee-right:hover {
            animation-play-state: paused;
          }
        `
      }} />

      {/* Edge Gradients for smooth fade in/out */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-[#0d1116] to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-[#0d1116] to-transparent pointer-events-none" />

      {/* Tilted Wrapper */}
      <div className="flex flex-col gap-6 sm:gap-10 relative z-0 -rotate-3 scale-[1.15]">
        
        {/* Row 1: Moves Left */}
        <div className="animate-marquee-left gap-8 sm:gap-12 pl-8 sm:pl-12">
          {/* We repeat the array once (2 sets total) for a seamless 50% translation loop */}
          {[...row1, ...row1].map((tile, i) => (
            <TechTile key={`r1-${i}`} {...tile} isOutline={i % 2 !== 0} />
          ))}
        </div>

        {/* Row 2: Moves Right */}
        <div className="animate-marquee-right gap-8 sm:gap-12 pl-8 sm:pl-12">
          {[...row2, ...row2].map((tile, i) => (
            <TechTile key={`r2-${i}`} {...tile} isOutline={i % 2 === 0} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default MarqueeSection;
