"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const ApproachSection = () => {
  return (
    <section
      id="approach"
      className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-[15]"
      style={{
        background: "#0a0a0a", // Slightly lighter than Experience (#080808) for overlap contrast
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div className="mx-auto max-w-6xl grid gap-14 lg:grid-cols-2 items-start">
        {/* ── Left Column ─────────────────────────────────────────── */}
        <div>
          <FadeIn delay={0} y={20}>
            <h2
              className="font-black italic leading-[1.02] tracking-tight text-[#D7E2EA] mb-6 sm:mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              The Approach
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} y={20}>
            <p
              className="text-[#D7E2EA]/70 font-light leading-relaxed max-w-lg"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
            >
              I build systems that bridge the gap between raw data infrastructure and cutting-edge artificial intelligence. My focus is on scalability, reliability, and the operational excellence required for production-grade GenAI.
            </p>
          </FadeIn>
        </div>

        {/* ── Right Column (2 lists) ─────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-6 mt-4 lg:mt-8">
          {/* Core Capabilities */}
          <div>
            <FadeIn delay={0.15} y={20}>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40 mb-6 border-t border-[#2a2a2a] pt-4">
                Core Capabilities
              </h3>
            </FadeIn>
            <ul className="flex flex-col gap-4">
              {[
                "Data Engineering (ETL / ELT)",
                "Large Language Model Ops",
                "Distributed Systems Architecture",
                "Scalable Vector Databases",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 text-[#D7E2EA] font-light text-sm sm:text-base"
                >
                  <span className="w-1 h-1 rounded-full bg-[#D7E2EA]/50 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legacy */}
          <div>
            <FadeIn delay={0.2} y={20}>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40 mb-6 border-t border-[#2a2a2a] pt-4">
                Legacy
              </h3>
            </FadeIn>
            <ul className="flex flex-col gap-4">
              {[
                { company: "Tesla", role: "Data Systems" },
                { company: "Huawei", role: "R&D Engineering" },
                { company: "Nokia", role: "Network Data Analysis" },
              ].map((item, i) => (
                <motion.li
                  key={item.company}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 text-[#D7E2EA] font-light text-sm sm:text-base"
                >
                  <span className="w-1 h-1 rounded-full bg-[#D7E2EA]/50 flex-shrink-0" />
                  <span>
                    <span className="font-medium">{item.company}</span> — {item.role}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
