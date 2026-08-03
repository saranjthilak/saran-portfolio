"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CircleDot, Eyebrow, LineReveal, PillButton, Star } from "./primitives";

const MARQUEE = ["RAG Systems", "Data Pipelines", "LLM Guardrails", "MLOps", "Cloud Architecture", "Vector Search"];

const Hero = ({ ready, scrollToSection, onResume }: { ready: boolean; scrollToSection: (id: string) => void; onResume: () => void }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  return (
    <section ref={ref} id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="shell pad-x">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Headline */}
          <motion.div style={{ opacity: fade }} className="pb-4">
            <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
              <Eyebrow bordered>Data Engineer & Generative AI Specialist</Eyebrow>
            </motion.div>

            <h1 className="mt-7 text-[clamp(2.75rem,8.2vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.035em]">
              <LineReveal active={ready} delay={250} lines={["Systems that", "think, scale"]} />
              <span className="flex flex-wrap items-baseline gap-x-5">
                <LineReveal active={ready} delay={490} lines={["and ship."]} />
                <motion.span
                  initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
                  animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.85, ease: [0.165, 0.84, 0.44, 1] }}
                  className="text-accent"
                >
                  <Star className="text-[0.42em]" />
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              I&apos;m Saran — I design retrieval-augmented AI products and the data
              infrastructure underneath them. Nine years across Tesla, Huawei and Nokia,
              now building from Berlin.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <PillButton variant="dark" arrow="right" onClick={() => scrollToSection("works")}>
                See selected work
              </PillButton>
              <PillButton variant="outline" onClick={onResume}>Download CV</PillButton>
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-surface">
              <motion.img
                style={{ y: imgY }}
                src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png"
                alt="Portrait of Saran Jaya Thilak, Data Engineer and Generative AI Specialist"
                className="aspect-[4/5] w-full scale-[1.06] object-cover object-[center_18%]"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-white/85 px-4 py-3 text-sm backdrop-blur">
                <span className="font-medium">Saran Jaya Thilak</span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Open to work
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative mt-16 overflow-hidden border-y border-border py-4"
      >
        <motion.div
          className="flex w-max gap-10 pr-10 text-sm uppercase tracking-[0.06em] text-muted-foreground"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={m + i} className="flex shrink-0 items-center gap-10">
              {m}
              <CircleDot className="text-xs text-accent" />
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
