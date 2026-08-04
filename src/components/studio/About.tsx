"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CAPABILITIES = [
  "Data Engineering (ETL / ELT)",
  "Large Language Model Ops",
  "Distributed Systems Architecture",
  "Scalable Vector Databases",
];

const LEGACY = [
  "Tesla — Data Systems",
  "Huawei — R&D Engineering",
  "Nokia — Network Data Analysis",
];

const About = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 } as const,
    animate: inView ? { opacity: 1, y: 0 } as const : ({} as const),
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <section id="about" ref={ref} className="py-24 md:py-32">
      <div className="shell pad-x">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.h2
              {...fadeUp(0)}
              className="font-display text-4xl italic leading-tight md:text-5xl"
            >
              The Approach
            </motion.h2>
            <motion.p
              {...fadeUp(0.1)}
              className="mt-8 text-xl leading-relaxed text-foreground/90"
            >
              I build systems that bridge the gap between raw data infrastructure and
              cutting-edge artificial intelligence. My focus is on scalability,
              reliability, and the operational excellence required for production-grade
              GenAI.
            </motion.p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-12 md:grid-cols-2">
              <motion.div
                {...fadeUp(0.15)}
                className="border-t border-border pt-6"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/40">
                  Core Capabilities
                </h3>
                <ul className="mt-6 space-y-3 text-sm font-medium text-foreground/80">
                  {CAPABILITIES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                {...fadeUp(0.25)}
                className="border-t border-border pt-6"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/40">
                  Legacy
                </h3>
                <ul className="mt-6 space-y-3 text-sm font-medium text-foreground/80">
                  {LEGACY.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
