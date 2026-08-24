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

const TechTile = ({ name, icon }: { name: string; icon: string }) => (
  <div
    className="flex-shrink-0 flex items-center gap-2 rounded-full select-none px-5 py-2.5 opacity-60 hover:opacity-100 transition-opacity duration-300"
    style={{
      background: "linear-gradient(135deg, #161616 0%, #1e1e1e 100%)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
    }}
  >
    <span className="text-base">{icon}</span>
    <span
      className="font-kanit font-medium uppercase tracking-wider text-[#ffffff]"
      style={{ fontSize: "clamp(0.55rem, 0.9vw, 0.75rem)" }}
    >
      {name}
    </span>
  </div>
);

const MarqueeSection = () => {
  return (
    <section
      className="overflow-hidden font-kanit relative"
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

      <div className="flex flex-col gap-4 sm:gap-5 relative z-0">
        
        {/* Row 1: Moves Left */}
        <div className="animate-marquee-left gap-4 sm:gap-5 pl-4 sm:pl-5">
          {/* We repeat the array multiple times to ensure it's wide enough for the -50% translation to look seamless */}
          {[...row1, ...row1, ...row1, ...row1, ...row1, ...row1].map((tile, i) => (
            <TechTile key={`r1-${i}`} {...tile} />
          ))}
        </div>

        {/* Row 2: Moves Right */}
        <div className="animate-marquee-right gap-4 sm:gap-5 pl-4 sm:pl-5">
          {[...row2, ...row2, ...row2, ...row2, ...row2, ...row2].map((tile, i) => (
            <TechTile key={`r2-${i}`} {...tile} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default MarqueeSection;
