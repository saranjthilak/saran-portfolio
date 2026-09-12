"use client";

import React, { useEffect, useRef } from "react";
import FadeIn from "./FadeIn";
import BlueprintSectionHeader from "./BlueprintSectionHeader";

const AboutSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl =
      "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";
    let hlsInstance: any = null;

    import("hls.js")
      .then(({ default: Hls }) => {
        if (Hls && Hls.isSupported()) {
          hlsInstance = new Hls({ enableWorker: false });
          hlsInstance.loadSource(streamUrl);
          hlsInstance.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = streamUrl;
        }
      })
      .catch(() => {
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = streamUrl;
        }
      });

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, []);

  return (
    <>
      <section
        id="about"
        className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-[15] overflow-hidden flex items-center border-t border-white/10 bg-[#070b0a]"
        style={{
          padding: "clamp(5rem, 9vw, 9rem) 1.25rem",
          boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
          minHeight: "100vh",
        }}
      >
        {/* ── Background Video & Overlays ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none opacity-60"
          />

          {/* Left linear gradient (#070b0a to transparent) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] via-[#070b0a]/75 to-transparent" />

          {/* Bottom-up gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-[#070b0a]/50 to-transparent" />
        </div>

        {/* ── Central Glow (cyan/dark green hue with 25px Gaussian blur) ── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-[4] w-[800px] max-w-full h-[320px] overflow-visible opacity-70">
          <svg
            className="w-full h-full"
            viewBox="0 0 800 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="about-central-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="25" />
              </filter>
              <linearGradient id="about-glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#5ed29c" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <ellipse
              cx="400"
              cy="90"
              rx="340"
              ry="70"
              fill="url(#about-glow-grad)"
              filter="url(#about-central-glow)"
            />
          </svg>
        </div>

        {/* ── Grid System: thin vertical lines (white/10) at 25%, 50%, 75% ── */}
        <div className="hidden md:block pointer-events-none absolute inset-y-0 left-1/4 w-px bg-white/10 z-[5]" />
        <div className="hidden md:block pointer-events-none absolute inset-y-0 left-2/4 w-px bg-white/10 z-[5]" />
        <div className="hidden md:block pointer-events-none absolute inset-y-0 left-3/4 w-px bg-white/10 z-[5]" />

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <BlueprintSectionHeader>
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          
          {/* Left: The Hook */}
          <div>
            <FadeIn delay={0} y={20}>
              <p className="mono-label flex items-center gap-2 mb-5 sm:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                About Me
              </p>
            </FadeIn>
            <FadeIn delay={0.1} y={20}>
              <h2
                className="font-podium uppercase leading-[0.95] tracking-tight text-foreground"
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
                   className="font-kanit font-light text-foreground/70 leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                >
                  I spent nine years keeping mission-critical infrastructure alive — first at <strong className="text-white font-normal">Nokia</strong>, then at <strong className="text-white font-normal">Huawei</strong> — managing telecom and cloud systems at 99.9%+ uptime, 24×7, with no tolerance for failure. That decade of operational discipline shaped how I think about reliability, observability, and what "production-ready" actually means.
                </p>
                <p
                   className="font-kanit font-light text-muted-foreground leading-relaxed"
                  style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}
                >
                  Now, with an M.Sc. in Data Science and hands-on work at <strong className="text-white font-normal">Tesla</strong> building RAG chatbots and Airflow pipelines, I bring that same infrastructure mindset to AI engineering. I build GenAI and data systems the way I once ran networks — with the assumption that they have to hold up under real load, not just in a notebook.
                </p>

                {/* ── Resume Download Button ── */}
                <div className="pt-2">
                  <a
                    href="/Saran-Jaya-Thilak-Resume.pdf"
                    download="Saran-Jaya-Thilak-Resume.pdf"
                    className="group relative inline-flex items-center gap-3 font-kanit font-light text-sm tracking-widest uppercase"
                    style={{ color: "#5ed29c" }}
                  >
                    {/* Blueprint grid card */}
                    <span
                      className="relative flex items-center gap-3 px-6 py-3 transition-all duration-300"
                      style={{
                        border: "1px solid rgba(94,210,156,0.35)",
                        background: "rgba(94,210,156,0.04)",
                      }}
                    >
                      {/* Corner marks */}
                      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l transition-all duration-300 group-hover:w-3 group-hover:h-3" style={{ borderColor: "#5ed29c" }} />
                      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r transition-all duration-300 group-hover:w-3 group-hover:h-3" style={{ borderColor: "#5ed29c" }} />
                      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-all duration-300 group-hover:w-3 group-hover:h-3" style={{ borderColor: "#5ed29c" }} />
                      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-all duration-300 group-hover:w-3 group-hover:h-3" style={{ borderColor: "#5ed29c" }} />

                      {/* Hover glow fill */}
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(94,210,156,0.07)" }}
                      />

                      {/* Download icon */}
                      <svg
                        className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 2v8M5 7l3 3 3-3" />
                        <path d="M2 12h12" />
                      </svg>

                      <span className="relative">Download Résumé</span>

                      {/* Mono label */}
                      <span
                        className="relative font-mono text-[10px] tracking-widest opacity-50"
                        style={{ color: "#5ed29c" }}
                      >
                        PDF
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </FadeIn>
            </div>
            </div>
          </BlueprintSectionHeader>
          
        </div>
      </section>
    </>
  );
};

export default AboutSection;
