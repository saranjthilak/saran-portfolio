"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import { Eyebrow, Reveal } from "./primitives";

const BLURB: Record<string, string> = {
  "Generative AI & ML": "Retrieval-augmented assistants, evaluation harnesses, hallucination guardrails and model deployment that holds up under real traffic.",
  "Languages & Frameworks": "Typed Python services, clean APIs and tested code — the unglamorous layer that keeps AI products maintainable.",
  "Cloud, Data & DevOps": "Infrastructure as code, orchestrated pipelines and observability, tuned for reliability and cost.",
};

const Capabilities = () => {
  const entries = Object.entries(skills);
  const [open, setOpen] = useState<string | null>(entries[0][0]);

  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="shell pad-x">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Reveal><Eyebrow>Capabilities</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                What I do
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-sm text-muted-foreground">
                Three overlapping disciplines — used together, not in isolation.
              </p>
            </Reveal>
          </div>

          <div className="border-t border-border">
            {entries.map(([group, items], i) => {
              const isOpen = open === group;
              return (
                <Reveal key={group} delay={i * 90}>
                  <div className="border-b border-border">
                    <button
                      onClick={() => setOpen(isOpen ? null : group)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-6 py-8 text-left"
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="text-sm text-muted-foreground">0{i + 1}</span>
                        <span className="text-2xl font-medium tracking-[-0.02em] transition-colors group-hover:text-accent sm:text-3xl">
                          {group}
                        </span>
                      </span>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.35 }} className="text-2xl text-muted-foreground">
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pl-0 sm:pl-11">
                            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{BLURB[group]}</p>
                            <div className="mt-5 flex flex-wrap gap-2">
                              {items.map((s) => (
                                <span key={s} className="tag border-border text-foreground/75">{s}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
