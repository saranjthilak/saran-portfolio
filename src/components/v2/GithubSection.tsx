"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import FadeIn from "./FadeIn";

// Disable SSR for the calendar to prevent hydration mismatch
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

export default function GithubSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section id="github" className="relative w-full py-24 bg-[#0a0a0a] z-40 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        <FadeIn delay={0} y={20}>
          <div className="text-center mb-16">
            <p className="flex items-center justify-center gap-2 font-medium uppercase tracking-[0.25em] text-white/50 text-xs mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
              Open Source
            </p>
            <h2 className="font-kanit font-black italic leading-[1.02] tracking-tight text-[#ffffff]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              GitHub Contributions
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <div className="bg-[#111] border border-white/10 rounded-[24px] p-6 sm:p-10 w-full overflow-x-auto">
            <div className="min-w-[800px] flex justify-center">
              {mounted && (
                <GitHubCalendar 
                  username="saranjthilak" 
                  colorScheme="dark"
                  theme={{
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  }}
                  blockSize={14}
                  blockMargin={4}
                  fontSize={14}
                />
              )}
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
