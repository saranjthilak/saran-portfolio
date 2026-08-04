"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface HeroProps {
  ready: boolean;
  scrollToSection: (id: string) => void;
  onResume: () => void;
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const Hero = ({ ready, scrollToSection, onResume }: HeroProps) => {
  const ref = useRef<HTMLElement>(null);

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
      <div className="flex w-full flex-col justify-between border-r border-border p-8 md:w-1/2 md:p-16 lg:p-24">
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
            <motion.h1
              {...fadeUp(0.35)}
              className="font-display text-6xl font-semibold leading-[0.9] tracking-tighter text-foreground md:text-7xl lg:text-8xl"
            >
              Saran Jaya
              <br />
              <span className="italic font-normal">Thilak</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.5)}
              className="mt-8 max-w-md text-lg leading-relaxed text-foreground/80 md:text-xl"
            >
              Data Engineer & Generative AI Specialist. Architecting intelligent
              data systems with nearly a decade of experience at{" "}
              <span className="underline decoration-1 underline-offset-4 opacity-100">
                Tesla
              </span>
              ,{" "}
              <span className="underline decoration-1 underline-offset-4 opacity-100">
                Huawei
              </span>
              , and{" "}
              <span className="underline decoration-1 underline-offset-4 opacity-100">
                Nokia
              </span>
              .
            </motion.p>
          </div>
        </div>

        <motion.div
          {...fadeUp(0.65)}
          className="flex flex-wrap gap-x-12 gap-y-4 pt-12 md:pt-0"
        >
          <div>
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
              className="text-sm font-semibold underline underline-offset-2 transition-colors hover:text-foreground/70"
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
              className="text-sm font-semibold underline underline-offset-2 transition-colors hover:text-foreground/70"
            >
              Download CV
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right: portrait */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4, ease }}
        className="relative w-full overflow-hidden bg-muted md:w-1/2"
      >
        <div className="group relative h-full min-h-[50vh] md:min-h-screen">
          <img
            src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png"
            alt="Saran Jaya Thilak"
            className="h-full w-full object-cover object-[center_20%] transition-transform duration-1000 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
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
