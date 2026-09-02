"use client";

import React from "react";
import FadeIn from "./FadeIn";


const AboutSection = () => {
  return (
    <>
      <section
        id="about"
        className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-[15] overflow-hidden flex items-center"
        style={{
          padding: "clamp(5rem, 9vw, 9rem) 1.25rem",
          boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
          minHeight: "100vh"
        }}
      >
        {/* Lumen Background Elements */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#0d1116] to-[#0a0a0a] bg-[length:200%_200%] animate-gradient-pan" />
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Decorative Glowing Orbs */}
          <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-[10%] left-[5%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          
          {/* Left: The Hook */}
          <div>
            <FadeIn delay={0} y={20}>
              <p className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-[#ffffff]/50 text-xs mb-5 sm:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff]/50 inline-block" />
                About Me
              </p>
            </FadeIn>
            <FadeIn delay={0.1} y={20}>
              <h2
                className="font-podium uppercase leading-[0.95] tracking-tight text-white"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                I engineer data<br />
                and AI systems<br />
                that <span className="accent-serif">scale.</span>
              </h2>
            </FadeIn>
          </div>

          {/* Right: The Details */}
          <div>
            <FadeIn delay={0.2} y={20}>
              <div className="flex flex-col gap-6">
                <p
                  className="font-kanit font-light text-[#ffffff]/70 leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                >
                  I spent nine years keeping mission-critical infrastructure alive — first at <strong className="text-white font-normal">Nokia</strong>, then at <strong className="text-white font-normal">Huawei</strong> — managing telecom and cloud systems at 99.9%+ uptime, 24×7, with no tolerance for failure. That decade of operational discipline shaped how I think about reliability, observability, and what "production-ready" actually means.
                </p>
                <p
                  className="font-kanit font-light text-[#ffffff]/50 leading-relaxed"
                  style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}
                >
                  Now, with an M.Sc. in Data Science and hands-on work at <strong className="text-white font-normal">Tesla</strong> building RAG chatbots and Airflow pipelines, I bring that same infrastructure mindset to AI engineering. I build GenAI and data systems the way I once ran networks — with the assumption that they have to hold up under real load, not just in a notebook.
                </p>
              </div>
            </FadeIn>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default AboutSection;
