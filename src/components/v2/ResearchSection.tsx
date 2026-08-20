"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { publications, certifications } from "@/data/portfolio";
import FadeIn from "./FadeIn";

const ResearchSection = () => {
  return (
    <section
      id="research"
      className="font-kanit"
      style={{
        background: "#0C0C0C",
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem",
      }}
    >
      <div className="mx-auto max-w-6xl grid gap-14 lg:grid-cols-[1.35fr_0.65fr] items-start">

        {/* ── Left: Publications ──────────────────────────────────── */}
        <div>
          {/* Eyebrow */}
          <FadeIn delay={0} y={20}>
            <p className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-[#D7E2EA]/50 text-xs mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA]/50 inline-block" />
              Research
            </p>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={0.08} y={30}>
            <h2
              className="font-black leading-[1.02] tracking-tight text-[#D7E2EA]"
              style={{ fontSize: "clamp(2rem, 4.2vw, 3.5rem)" }}
            >
              Published machine learning work.
            </h2>
          </FadeIn>

          {/* Publication cards */}
          <div className="mt-10 flex flex-col gap-4">
            {publications.map((pub, i) => (
              <motion.a
                key={pub.title}
                href={pub.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                className="group block rounded-[1.5rem] p-7 transition-transform duration-500 hover:-translate-y-1"
                style={{
                  background: "#141414",
                  border: "1px solid #2a2a2a",
                }}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <span
                      className="text-xs uppercase tracking-[0.06em] text-[#D7E2EA]/40 font-light"
                    >
                      {pub.journal} · {pub.date}
                    </span>
                    <h3
                      className="mt-3 font-medium leading-snug text-[#D7E2EA]"
                      style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)" }}
                    >
                      {pub.title}
                    </h3>
                  </div>
                  {/* Arrow icon */}
                  <span
                    className="grid shrink-0 place-items-center rounded-full border border-[#2a2a2a] text-[#D7E2EA]/40 transition-all duration-300 group-hover:border-[#D7E2EA]/40 group-hover:text-[#D7E2EA]"
                    style={{ width: 40, height: 40 }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <p
                  className="mt-4 line-clamp-3 leading-relaxed text-[#D7E2EA]/40 font-light"
                  style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)" }}
                >
                  {pub.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── Right: Certifications + Education ───────────────────── */}
        <div>
          {/* Eyebrow */}
          <FadeIn delay={0.05} y={20}>
            <p className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-[#D7E2EA]/50 text-xs mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA]/50 inline-block" />
              Certifications
            </p>
          </FadeIn>

          {/* Cert list */}
          <ul className="border-t border-[#2a2a2a]">
            {certifications.map((cert, i) => (
              <motion.li
                key={cert.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                className="flex flex-col gap-1 py-5 border-b border-[#2a2a2a]"
              >
                <span
                  className="font-medium text-[#D7E2EA]"
                  style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)" }}
                >
                  {cert.title}{cert.level ? ` — ${cert.level}` : ""}
                </span>
                <span
                  className="font-light text-[#D7E2EA]/40"
                  style={{ fontSize: "clamp(0.75rem, 1.1vw, 0.85rem)" }}
                >
                  {cert.issuer}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Education card */}
          <FadeIn delay={0.4} y={20}>
            <div
              className="mt-6 rounded-[1.5rem] p-6"
              style={{ background: "#141414", border: "1px solid #2a2a2a" }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[#D7E2EA]/40 font-light">
                Education
              </span>
              <p
                className="mt-3 font-medium text-[#D7E2EA]"
                style={{ fontSize: "clamp(0.85rem, 1.3vw, 0.95rem)" }}
              >
                MSc Data Science &amp; Artificial Intelligence
              </p>
              <p
                className="font-light text-[#D7E2EA]/40"
                style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.875rem)" }}
              >
                Le Wagon · Berlin, Germany
              </p>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

export default ResearchSection;
