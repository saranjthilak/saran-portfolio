"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/data/portfolio";
import FadeIn from "./FadeIn";

const ExperienceSection = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(videoRef, { once: true, margin: "200px" });
  return (
    <section
      id="experience"
      className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10"
      style={{
        background: "#080808", // Very dark to contrast slightly
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* Video background (Vesper.ai style) */}
      <div ref={videoRef} className="absolute inset-0 z-0 overflow-hidden rounded-t-[inherit] bg-black">
        {isInView && (
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Gradient overlay to ensure text is legible over the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-[#080808]" />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Eyebrow */}
        <FadeIn delay={0} y={20}>
          <p className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-[#ffffff]/50 text-xs mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff]/50 inline-block" />
            Experience
          </p>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.08} y={30}>
          <h2
            className="font-black leading-[1.02] tracking-tight text-[#ffffff] mb-12 sm:mb-16 md:mb-20"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Nine years, <span className="accent-serif">four teams.</span>
          </h2>
        </FadeIn>

        {/* Experience List */}
        <div className="flex flex-col border-t border-[rgba(255, 255, 255, 0.1)]">
          {experience.map((item, i) => (
            <motion.div
              key={`${item.company}-${item.period}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr_3fr] gap-6 md:gap-8 py-8 md:py-12 border-b border-[rgba(255, 255, 255, 0.1)] items-start"
            >
              {/* Period */}
              <div className="text-[#ffffff]/50 font-light text-sm md:text-base tracking-wider mt-1">
                {item.period}
              </div>

              {/* Company & Role */}
              <div>
                <h3 className="text-[#ffffff] font-medium text-xl md:text-2xl mb-1">
                  {item.company}
                </h3>
                <p className="text-[#ffffff]/50 font-light text-sm md:text-base">
                  {item.role}
                </p>
              </div>

              {/* Description */}
              <div
                className="text-[#ffffff]/40 font-light leading-relaxed mt-1"
                style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)" }}
              >
                {item.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
