
import HudFrame from "@/components/ui/hud-frame";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

const items = [
  { logo: "🧑‍💻", title: "Le Wagon", level: "Boot Camp, Data science and AI", period: "04/2025 – 06/2025", variant: "fuchsia" as const },
  { logo: "📓", title: "University of Europe for Applied Sciences", level: "Master's degree, Data Science", period: "04/2022 – 03/2023", variant: "cyan" as const },
  { logo: "📜", title: "Delhi University", level: "PG DIPLOMA; NIELIT, VLSI AND EMBEDDED SYSTEMS HW DESIGNING", period: "01/2013 – 12/2014", variant: "mixed" as const },
  { logo: "🏫", title: "Cochin University of Science and Technology", level: "Bachelor of Technology (BTech), Electrical, Electronics and Communications Engineering", period: "01/2009 – 12/2013", variant: "cyan" as const },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Education"
          tag="Academic"
          subtitle="Dedicated to continuous learning—my academic journey spans engineering, data science, and specialized bootcamps across top universities and institutes."
        />
        <div className="space-y-6 sm:space-y-8">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.1} direction={i % 2 === 0 ? "right" : "left"}>
            <HudFrame scan variant={it.variant}>
              <div className="flex flex-col md:flex-row items-center bg-black/30 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 group hover:border-cyan-400/50">
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 rounded-2xl sm:rounded-3xl flex items-center justify-center text-2xl sm:text-4xl shadow-[0_0_25px_rgba(34,211,238,0.5)] mr-0 md:mr-6 lg:mr-8 mb-4 md:mb-0 group-hover:scale-110 transition-transform duration-300 mx-auto md:mx-0">
                  {it.logo}
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors tracking-wide">{it.title}</h3>
                  <div className="text-cyan-300 text-sm sm:text-base mb-2 uppercase tracking-[0.2em]">{it.level}</div>
                  <div className="text-white/70 text-sm sm:text-base font-mono">{it.period}</div>
                </div>
              </div>
            </HudFrame>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
