"use client";

import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";

const ABOUT_TEXT =
  "With an M.Sc. in Data Science and hands-on experience across cloud, networking, and AI engineering at companies like Tesla, Nokia, and Huawei, i focus on data pipelines, retrieval-augmented generation, and MLOps. i truly enjoy turning messy data and ambitious ideas into production-grade systems. Let's build something incredible together!";

// SVG corner decorations — data/AI themed
const DatabaseIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
    <ellipse cx="50" cy="20" rx="38" ry="12" stroke="#BBCCD7" strokeWidth="3" />
    <path d="M12 20v20c0 6.627 17.013 12 38 12s38-5.373 38-12V20" stroke="#BBCCD7" strokeWidth="3" />
    <path d="M12 40v20c0 6.627 17.013 12 38 12s38-5.373 38-12V40" stroke="#BBCCD7" strokeWidth="3" />
    <path d="M12 60v20c0 6.627 17.013 12 38 12s38-5.373 38-12V60" stroke="#BBCCD7" strokeWidth="3" />
  </svg>
);

const NodeGraphIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
    <circle cx="50" cy="50" r="8" stroke="#BBCCD7" strokeWidth="3" />
    <circle cx="20" cy="20" r="6" stroke="#BBCCD7" strokeWidth="2.5" />
    <circle cx="80" cy="20" r="6" stroke="#BBCCD7" strokeWidth="2.5" />
    <circle cx="20" cy="80" r="6" stroke="#BBCCD7" strokeWidth="2.5" />
    <circle cx="80" cy="80" r="6" stroke="#BBCCD7" strokeWidth="2.5" />
    <line x1="26" y1="26" x2="43" y2="43" stroke="#BBCCD7" strokeWidth="2" />
    <line x1="74" y1="26" x2="57" y2="43" stroke="#BBCCD7" strokeWidth="2" />
    <line x1="26" y1="74" x2="43" y2="57" stroke="#BBCCD7" strokeWidth="2" />
    <line x1="74" y1="74" x2="57" y2="57" stroke="#BBCCD7" strokeWidth="2" />
  </svg>
);

const CloudPipelineIcon = () => (
  <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
    <path d="M30 55 C30 35 55 30 65 45 C70 30 90 28 95 45 C105 45 110 55 100 60 H30 C20 60 18 45 30 55Z"
      stroke="#BBCCD7" strokeWidth="2.5" />
    <line x1="30" y1="70" x2="90" y2="70" stroke="#BBCCD7" strokeWidth="2" strokeLinecap="round" />
    <line x1="40" y1="70" x2="40" y2="76" stroke="#BBCCD7" strokeWidth="2" strokeLinecap="round" />
    <line x1="60" y1="70" x2="60" y2="76" stroke="#BBCCD7" strokeWidth="2" strokeLinecap="round" />
    <line x1="80" y1="70" x2="80" y2="76" stroke="#BBCCD7" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TerminalIcon = () => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
    <rect x="5" y="5" width="90" height="70" rx="6" stroke="#BBCCD7" strokeWidth="2.5" />
    <line x1="5" y1="22" x2="95" y2="22" stroke="#BBCCD7" strokeWidth="2" />
    <circle cx="16" cy="13.5" r="3" fill="#BBCCD7" />
    <circle cx="26" cy="13.5" r="3" fill="#BBCCD7" />
    <circle cx="36" cy="13.5" r="3" fill="#BBCCD7" />
    <path d="M16 36 L26 43 L16 50" stroke="#BBCCD7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="30" y1="50" x2="50" y2="50" stroke="#BBCCD7" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-center min-h-screen font-kanit overflow-hidden"
      style={{
        background: "#0C0C0C",
        padding: "5rem 1.25rem",
      }}
    >
      {/* Corner decorations */}
      {/* Top-left */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] aspect-square pointer-events-none">
        <DatabaseIcon />
      </FadeIn>

      {/* Bottom-left */}
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] aspect-square pointer-events-none">
        <NodeGraphIcon />
      </FadeIn>

      {/* Top-right */}
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] aspect-square pointer-events-none">
        <CloudPipelineIcon />
      </FadeIn>

      {/* Bottom-right */}
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] aspect-square pointer-events-none">
        <TerminalIcon />
      </FadeIn>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated paragraph */}
        <div
          className="mt-10 sm:mt-14 md:mt-16 max-w-[560px]"
          style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
        >
          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[#D7E2EA] font-medium leading-relaxed"
          />
        </div>

        {/* Contact button */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <ContactButton />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
