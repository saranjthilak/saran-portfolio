"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/data/portfolio";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

/* ── accent colour per company ── */
const companyAccent: Record<string, string> = {
  Tesla:    "hsl(var(--accent))",
  Huawei:   "#f59e0b",
  Nokia:    "#38bdf8",
  "University of Europe for Applied Sciences": "#a78bfa",
};

const companyNodeId: Record<string, string> = {
  Tesla:    "NODE-0x3E5A",
  Huawei:   "NODE-0x2B7E",
  Nokia:    "NODE-0x1A4F",
  "University of Europe for Applied Sciences": "NODE-0x4C1D",
};

const EASE = [0.16, 1, 0.3, 1] as const;

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="font-kanit rounded-t-section -mt-10 sm:-mt-12 md:-mt-14 relative z-10 overflow-hidden"
      style={{
        background: "hsl(212, 18%, 5%)",
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── Background video ── */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-t-[inherit] bg-black">
        {isInView && (
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.25)" }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.75), hsl(212, 18%, 5%))",
          }}
        />
      </div>

      {/* ── Blueprint dot grid ── */}
      <div className="absolute inset-0 blueprint-dots opacity-[0.07] z-[1]" aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Eyebrow */}
        <FadeIn delay={0} y={20}>
          <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-white/50 mb-5">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Career Timeline
            <span className="ml-auto font-mono text-[9px] text-white/30">REV-2.4 // VERIFIED</span>
          </p>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.08} y={30}>
          <SectionHeading
            id="experience-heading"
            prefix="A decade of "
            accentWord="building"
            gradient="experience"
            align="left"
            className="mb-12 sm:mb-16 md:mb-20"
          />
        </FadeIn>

        {/* ── HUD timeline canvas ── */}
        <div
          className="relative overflow-hidden border border-white/10 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* Corner brackets */}
          <span className="absolute top-0 left-0 h-5 w-5 border-t border-l border-accent/40 z-10" />
          <span className="absolute top-0 right-0 h-5 w-5 border-t border-r border-accent/40 z-10" />
          <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-accent/40 z-10" />
          <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-accent/40 z-10" />

          {/* Canvas header bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-2.5 font-mono text-[9px] tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_hsl(var(--accent))]" />
              <span className="font-semibold text-foreground">EMPLOYMENT RECORD</span>
              <span className="hidden text-white/30 sm:inline">|</span>
              <span className="hidden sm:inline">TOPOLOGY SPEC // CAREER-LOG</span>
            </div>
            <span className="font-mono text-[9px] text-white/30">
              {experience.length} ENTRIES • SORTED DESC
            </span>
          </div>

          {/* Timeline rows */}
          <div className="relative">
            {/* Vertical spine */}
            <div
              aria-hidden="true"
              className="absolute left-[2.6rem] top-0 bottom-0 w-px hidden sm:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 10%, rgba(255,255,255,0.08) 90%, transparent)",
              }}
            />

            {experience.map((item, i) => {
              const accent = companyAccent[item.company] ?? "#ffffff";
              const nodeId =
                companyNodeId[item.company] ??
                `NODE-0x${i.toString(16).padStart(4, "0").toUpperCase()}`;
              const isEdu = "type" in item && item.type === "education";

              return (
                <motion.div
                  key={`${item.company}-${item.period}`}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
                  className="group relative grid grid-cols-1 sm:grid-cols-[5.5rem_1fr_auto] gap-4 sm:gap-8 px-6 py-7 border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.015] transition-colors duration-300"
                >
                  {/* Top accent bar on hover */}
                  <span
                    className="pointer-events-none absolute left-0 top-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                    style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
                  />

                  {/* ── Col 1: Period + node id ── */}
                  <div className="flex sm:flex-col sm:items-center sm:pt-1 gap-3 sm:gap-1.5">
                    {/* Timeline node */}
                    <div className="relative hidden sm:flex h-5 w-5 shrink-0 items-center justify-center">
                      <span
                        className="absolute h-full w-full rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                        style={{ background: accent }}
                      />
                      <span
                        className="h-2.5 w-2.5 rounded-full border"
                        style={{
                          background: accent,
                          borderColor: accent,
                          boxShadow: `0 0 10px ${accent}`,
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="font-mono text-[10px] font-semibold tracking-wider"
                        style={{ color: accent }}
                      >
                        {item.period}
                      </span>
                      <span className="font-mono text-[8px] text-white/25 hidden sm:block">
                        {nodeId}
                      </span>
                    </div>
                  </div>

                  {/* ── Col 2: Company, role, description ── */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1">
                      <h3 className="text-white font-medium text-xl md:text-2xl leading-tight">
                        {item.company}
                      </h3>
                      {isEdu && (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase tracking-wider border"
                          style={{
                            background: "rgba(167,139,250,0.1)",
                            borderColor: "rgba(167,139,250,0.3)",
                            color: "#a78bfa",
                          }}
                        >
                          🎓 Education
                        </span>
                      )}
                    </div>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.14em] mb-2"
                      style={{ color: accent, opacity: 0.8 }}
                    >
                      {item.role}
                    </p>

                    {/* Metric highlight chips */}
                    {'metrics' in item && Array.isArray(item.metrics) && item.metrics.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {item.metrics.map((m: { label: string; value: string }) => (
                          <span
                            key={m.label}
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] font-mono tracking-wider"
                            style={{
                              borderColor: `${accent}35`,
                              background: `${accent}0d`,
                              color: accent,
                            }}
                          >
                            <span className="font-bold">{m.value}</span>
                            <span className="text-white/40 uppercase text-[8px]">{m.label}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    <p
                      className="font-kanit font-light text-white/50 leading-relaxed"
                      style={{ fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)" }}
                    >
                      {item.description}
                    </p>

                    {/* Key achievements bullet points */}
                    {'achievements' in item && Array.isArray(item.achievements) && item.achievements.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-2">
                        <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/35 flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
                          Key Deliverables &amp; Impact
                        </div>
                        <ul className="space-y-1.5 pl-0.5">
                          {item.achievements.map((ach: string, achIdx: number) => (
                            <li
                              key={achIdx}
                              className="flex items-start gap-2 text-white/70 font-kanit font-light text-[13px] leading-relaxed"
                            >
                              <span
                                className="font-mono text-[10px] mt-0.5 shrink-0 select-none"
                                style={{ color: accent }}
                              >
                                ▹
                              </span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* ── Col 3: Status badge ── */}
                  <div className="hidden sm:flex items-start pt-1">
                    <span
                      className="font-mono text-[8px] uppercase tracking-widest border px-2 py-1 rounded whitespace-nowrap"
                      style={{
                        color: accent,
                        borderColor: `${accent}40`,
                        background: `${accent}0d`,
                        opacity: 0.8,
                      }}
                    >
                      {i === 0 ? "LATEST" : "LOGGED"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Canvas footer bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-3 font-mono text-[8px] tracking-widest text-white/30">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              RECORD VERIFIED
            </span>
            <span>CAREER LOG // {experience.length} NODES ACTIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
