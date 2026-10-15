"use client";

import { motion } from "framer-motion";
import { publications } from "@/data/portfolio";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;


// ── Section ──────────────────────────────────────────────────────────────────
export default function ResearchSection() {
  return (
    <section
      id="research"
      className="relative font-kanit rounded-t-section -mt-10 sm:-mt-12 md:-mt-14 z-[35] overflow-hidden min-h-screen flex flex-col justify-center"
      style={{
        background: "hsl(212, 18%, 5%)",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── Background video (Neuralyn-style) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />

        {/* Dark base to keep text readable */}
        <div className="absolute inset-0" style={{ background: "rgba(8,12,16,0.72)" }} />


        {/* Orb glows */}
        <div className="absolute top-[8%] left-[4%] w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[6%] right-[5%] w-[380px] h-[380px] rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(115,255,0,0.03) 0%, transparent 65%)" }} />


        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 35%, rgba(0,0,0,0.65) 100%)" }} />
        <div className="absolute bottom-0 left-0 w-full h-32" style={{ background: "linear-gradient(to top, hsl(212, 18%, 5%), transparent)" }} />
      </div>



      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[90%] lg:max-w-5xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-20 md:pt-24 my-auto">

        {/* Eyebrow — matches Experience section style */}
        <FadeIn delay={0} y={20}>
          <p className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-white/50 text-xs mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
            Research
          </p>
        </FadeIn>

        {/* Heading — reuses SectionHeading exactly as Experience section does */}
        <FadeIn delay={0.08} y={30}>
          <SectionHeading
            prefix="Peer-reviewed, "
            accentWord="not just claimed"
            gradient="research"
            align="left"
            className="mb-4 lg:whitespace-nowrap"
            fontSize="clamp(1.75rem, 3.8vw, 3.25rem)"
          />
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.2} y={16}>
          <p className="mt-4 sm:mt-6 text-white/50 max-w-2xl font-kanit font-light text-base sm:text-lg mb-12 sm:mb-16 md:mb-20">
            Two peer-reviewed papers published at IEEE, on solar plant performance and air ticket price prediction.
          </p>
        </FadeIn>

        {/* ── Publications ── */}
        {publications.length > 0 && (
          <div className="flex flex-col border-t border-white/10">
            {publications.map((pub, idx) => (
              <motion.a
                key={idx}
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-4 md:gap-8 py-6 md:py-8 border-b border-white/10 items-start px-4 -mx-4 rounded-xl transition-all duration-300 cursor-pointer hover:bg-white/[0.03]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: 0.15 + idx * 0.1, ease: EASE }}
              >
                {/* Date + journal */}
                <div>
                  <span className="text-sm font-semibold uppercase tracking-widest block mb-1" style={{ color: "hsl(var(--accent) / 0.85)" }}>
                    {pub.date}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-white/40">
                    {pub.journal}
                  </span>
                </div>

                {/* Title + description */}
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 leading-snug transition-colors duration-300 group-hover:text-accent">
                    {pub.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {pub.description}
                  </p>
                </div>

                {/* External-link arrow */}
                <div className="hidden md:flex items-start pt-1">
                  <svg
                    className="w-5 h-5 transition-all duration-300 opacity-25 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "hsl(var(--accent))" }}
                    viewBox="0 0 16 16" fill="none"
                    stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M3 13L13 3M13 3H5M13 3v8" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
