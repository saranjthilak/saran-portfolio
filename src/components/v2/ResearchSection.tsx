"use client";

import { motion } from "framer-motion";
import { publications } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;


// ── Section ──────────────────────────────────────────────────────────────────
export default function ResearchSection() {
  return (
    <section
      id="research"
      className="relative font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-[35] overflow-hidden min-h-screen flex flex-col justify-center"
      style={{
        background: "#080c10",
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
        <div className="absolute top-[8%] left-[4%] w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle, rgba(94,210,156,0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[6%] right-[5%] w-[380px] h-[380px] rounded-full" style={{ background: "radial-gradient(circle, rgba(94,210,156,0.06) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(115,255,0,0.03) 0%, transparent 65%)" }} />


        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 35%, rgba(0,0,0,0.65) 100%)" }} />
        <div className="absolute bottom-0 left-0 w-full h-32" style={{ background: "linear-gradient(to top, #080c10, transparent)" }} />
      </div>



      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[90%] lg:max-w-5xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-20 md:pt-24 my-auto">


        {/* Main heading */}
        <motion.h2
          className="font-black leading-[1.02] tracking-[-0.04em] text-white mb-8 uppercase text-center"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          Published{" "}
          <span
            style={{
              background: "linear-gradient(90deg, rgba(94,210,156,1), rgba(115,255,0,0.9), rgba(94,210,156,1))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            work.
          </span>
        </motion.h2>

        {/* Sub-line */}
        <motion.p
          className="text-white/55 font-light mb-10 max-w-xl mx-auto text-center"
          style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.15rem)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
        >
          Peer-reviewed machine learning research published at IEEE — spanning renewable energy
          forecasting and dynamic pricing systems.
        </motion.p>

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
                  <span className="text-sm font-semibold uppercase tracking-widest block mb-1" style={{ color: "rgba(94,210,156,0.85)" }}>
                    {pub.date}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-white/40">
                    {pub.journal}
                  </span>
                </div>

                {/* Title + description */}
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 leading-snug transition-colors duration-300 group-hover:text-[#5ed29c]">
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
                    style={{ color: "#5ed29c" }}
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
