"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { publications } from "@/data/portfolio";

export default function ResearchSection() {
  const videoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(videoRef, { once: true, margin: "200px" });
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Silkscreen:wght@400;700&display=swap');
          
          .font-geist {
            font-family: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          .font-silkscreen {
            font-family: 'Silkscreen', cursive;
          }

          /* Hide scrollbar for the scrollable container */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `
      }} />

      <section id="research" className="relative min-h-screen w-full font-geist z-40 bg-[#0d0d0d]">
        {/* Background Video (Fixed behind content) */}
        <div ref={videoRef} className="absolute inset-0 overflow-hidden pointer-events-none">
          {isInView && (
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-30"
              autoPlay
              loop
              muted
              playsInline
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4"
            />
          )}
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col pt-12 md:pt-[20vh] pl-[6vw] md:pl-[8vw] pr-6 md:pr-12 max-w-4xl w-full pb-20">
          
          {/* Section Header */}
          <div className="mb-12">
            <p className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-white/50 text-xs mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
              Research
            </p>
            <h2 className="font-black leading-[1.02] tracking-tight text-white text-4xl sm:text-5xl md:text-6xl">
              Published work.
            </h2>
          </div>

          <div className="flex flex-col gap-10">
            {/* Publications */}
            {publications.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white/90 mb-4 border-b border-white/10 pb-2">Publications</h3>
                <div className="flex flex-col border-t border-white/10 mt-2">
                  {publications.map((pub, idx) => (
                    <a
                      key={idx}
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8 py-6 md:py-8 border-b border-white/10 items-start hover:bg-white/[0.03] transition-colors px-4 -mx-4 rounded-xl"
                    >
                      <div>
                        <span className="text-sm font-semibold text-white/70 uppercase tracking-widest block mb-1">
                          {pub.date}
                        </span>
                        <span className="text-xs text-white/40 uppercase tracking-wider">
                          {pub.journal}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl md:text-2xl font-medium text-white mb-3 leading-tight group-hover:text-blue-300 transition-colors">
                          {pub.title}
                        </h4>
                        <p className="text-sm md:text-base leading-relaxed text-white/60">
                          {pub.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
          
        </div>
      </section>
    </>
  );
}
