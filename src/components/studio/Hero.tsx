"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface HeroProps {
  ready: boolean;
  scrollToSection: (id: string) => void;
  onResume: () => void;
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const Hero = ({ ready, scrollToSection, onResume }: HeroProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0.15]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 } as const,
    animate: ready ? { opacity: 1, y: 0 } as const : ({} as const),
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen flex-col border-b border-border md:flex-row"
    >
      {/* Left: content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="flex w-full flex-col justify-between border-r border-border p-8 md:w-1/2 md:p-16 lg:p-24"
      >
        <div className="space-y-12">
          <motion.nav
            {...fadeUp(0.2)}
            className="flex items-center justify-between"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40">
              Portfolio v.1.0
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">
              Berlin, DE
            </span>
          </motion.nav>

          <div className="pt-6 md:pt-16">
            <h1 className="font-display text-6xl font-semibold leading-[0.9] tracking-tighter text-foreground md:text-7xl lg:text-8xl">
              {["Saran Jaya", "Thilak"].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className={`block ${i === 1 ? "italic font-normal" : ""}`}
                    initial={{ y: "110%" }}
                    animate={ready ? { y: "0%" } : {}}
                    transition={{ duration: 1, delay: 0.35 + i * 0.12, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              {...fadeUp(0.5)}
              className="mt-8 max-w-md text-lg leading-relaxed text-foreground/80 md:text-xl"
            >
              Data Engineer &amp; Generative AI Specialist. Architecting intelligent
              data systems with nearly a decade of experience at{" "}
              <span className="link-sheen underline decoration-1 underline-offset-4">
                Tesla
              </span>
              ,{" "}
              <span className="link-sheen underline decoration-1 underline-offset-4">
                Huawei
              </span>
              , and{" "}
              <span className="link-sheen underline decoration-1 underline-offset-4">
                Nokia
              </span>
              .
            </motion.p>
          </div>
        </div>

        <motion.div
          {...fadeUp(0.65)}
          className="flex flex-wrap items-end gap-x-12 gap-y-4 pt-12 md:pt-0"
        >
          <div className="group">
            <span className="mb-2 block text-[9px] uppercase tracking-widest text-foreground/40">
              Specialization
            </span>
            <span className="text-sm font-semibold italic font-display">
              Generative AI & LLMOps
            </span>
          </div>
          <div>
            <span className="mb-2 block text-[9px] uppercase tracking-widest text-foreground/40">
              Contact
            </span>
            <button
              onClick={() => scrollToSection("contact")}
              className="link-sheen text-sm font-semibold underline underline-offset-4 transition-colors hover:text-foreground/70"
            >
              Get in touch
            </button>
          </div>
          <div>
            <span className="mb-2 block text-[9px] uppercase tracking-widest text-foreground/40">
              Resume
            </span>
            <button
              onClick={onResume}
              className="link-sheen text-sm font-semibold underline underline-offset-4 transition-colors hover:text-foreground/70"
            >
              Download CV
            </button>
          </div>
          <button
            onClick={() => scrollToSection("works")}
            className="ml-auto hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/45 transition-colors hover:text-foreground md:flex"
          >
            Scroll
            <span className="relative block h-8 w-px overflow-hidden bg-border">
              <span className="scroll-tick absolute inset-x-0 top-0 h-3 bg-foreground" />
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Right: portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4, ease }}
        className="relative w-full overflow-hidden bg-muted md:w-1/2"
      >
        <div className="group relative h-full min-h-[50vh] overflow-hidden md:min-h-screen">
          <motion.img
            style={{ y: imageY, scale: imageScale }}
            src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png"
            alt="Saran Jaya Thilak — Data Engineer and Generative AI Specialist"
            className="h-[112%] w-full object-cover object-[center_20%] grayscale-[0.2] transition-[filter,transform] duration-[1200ms] ease-out group-hover:grayscale-0"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent transition-opacity duration-700 group-hover:opacity-60" />
        </div>
        <div className="absolute bottom-8 right-8 text-foreground/80 mix-blend-multiply">
          <p className="vertical-text text-[10px] font-bold uppercase tracking-[0.2em]">
            9+ Years Experience
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
