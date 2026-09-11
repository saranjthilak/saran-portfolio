"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;
const GREEN = "hsl(119,99%,46%)";

// ── Main section ─────────────────────────────────────────────────────────────
export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-40 overflow-hidden border-t border-white/10 min-h-screen flex flex-col justify-end bg-black"
      style={{
        boxShadow: "0 -10px 40px rgba(0,0,0,0.6)",
      }}
    >
      {/* ── Video Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "70% center" }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
            type="video/mp4"
          />
        </video>

        {/* Contrast overlay so certification text remains crisp and legible */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-40">

        {/* Section label */}
        <motion.p
          className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-xs mb-4"
          style={{ color: GREEN }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: GREEN }} />
          Credentials
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-black uppercase leading-[1.02] tracking-tight text-white mb-12"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          Certifications.
        </motion.h2>

        {/* Cert list */}
        {certifications.length > 0 && (
          <div className="flex flex-col border-t border-white/10">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                className="group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-8 py-6 md:py-8 border-b border-white/10 items-center px-4 -mx-4 rounded-xl transition-all duration-300 cursor-default"
                style={{}}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: 0.15 + idx * 0.08, ease: EASE }}
                whileHover={{ backgroundColor: "rgba(0,232,56,0.04)" }}
              >
                <div>
                  <span className="text-sm font-semibold uppercase tracking-widest block mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {cert.issuer}
                  </span>
                  <span className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {cert.level}
                  </span>
                </div>
                <div>
                  <h4
                    className="text-xl md:text-2xl font-medium text-white leading-tight transition-colors duration-300"
                    style={{ ["--tw-text-opacity" as string]: 1 }}
                  >
                    <span className="group-hover:text-[hsl(119,99%,46%)] transition-colors duration-300">
                      {cert.title}
                    </span>
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

