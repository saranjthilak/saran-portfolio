"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import { ArrowUpRight, Eyebrow, PillButton, Reveal } from "./primitives";
import PipelineFlow, { type PipelineNode } from "./PipelineFlow";
import ProjectCursor from "./ProjectCursor";

const FeaturedCard = ({ p, wide }: { p: (typeof projects)[number]; wide: boolean }) => {
  const [hover, setHover] = useState(false);
  const pipeline = ((p as any).pipeline ?? []) as PipelineNode[];
  const hasPipeline = pipeline.length > 0;
  const showFlow = hasPipeline && hover;

  return (
    <motion.a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      data-project-cursor
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-background shadow-[0_1px_0_hsl(var(--border))] transition-[border-color,box-shadow] duration-500 hover:border-foreground/25 hover:shadow-[0_24px_60px_-30px_hsl(var(--foreground)/0.35)] md:cursor-none"
    >
      <div className={`overflow-hidden ${wide ? "aspect-[16/7]" : "aspect-[16/10]"} bg-muted/50`}>
        <motion.img
          src={p.image}
          alt={`${p.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover opacity-90 grayscale-[0.75] contrast-[0.9] transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.02em] font-display">{p.title}</h3>
            <p className="mt-1 text-sm text-foreground/60">{p.source}</p>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-foreground/70 transition-all duration-300 group-hover:rotate-45 group-hover:border-foreground group-hover:bg-ink group-hover:text-background">
            <ArrowUpRight />
          </span>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-foreground/55">{p.description}</p>

        <div className="relative mt-auto pt-2">
          <div
            className={`flex flex-wrap gap-2 transition-all duration-300 ${
              showFlow ? "pointer-events-none opacity-0 blur-[2px]" : "opacity-100"
            }`}
          >
            {p.skills.map((s) => (
              <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-foreground/60 transition-colors duration-300 group-hover:border-foreground/25 group-hover:text-foreground/80">{s}</span>
            ))}
          </div>

          {hasPipeline && (
            <div
              aria-hidden
              className={`absolute inset-x-0 top-2 transition-opacity duration-300 ${
                showFlow ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <PipelineFlow nodes={pipeline} active={showFlow} />
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );
};

const Work = () => {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <ProjectCursor>
      <section id="works" className="bg-surface py-24 sm:py-32">
        <div className="shell pad-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><Eyebrow>Selected work</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                Projects built end to end.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <PillButton variant="outline" arrow="up-right" href="https://github.com/saranjthilak">
              All repositories
            </PillButton>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className={i === 0 ? "md:col-span-2" : ""}>
              <FeaturedCard p={p} wide={i === 0} />
            </Reveal>
          ))}
        </div>

        <ul className="mt-6 divide-y divide-border border-t border-border">
          {rest.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <li>
                <a href={p.url} target="_blank" rel="noreferrer" data-project-cursor className="group flex flex-wrap items-center justify-between gap-4 py-6 transition-[padding] duration-500 hover:pl-4 md:cursor-none">
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <h3 className="font-display text-xl font-medium italic transition-colors duration-300 group-hover:text-foreground/60">{p.title}</h3>
                    <span className="text-sm text-foreground/40">{p.source}</span>
                  </div>
                  <span className="text-foreground/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground">
                    <ArrowUpRight className="text-lg" />
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
        </div>
      </section>
    </ProjectCursor>
  );
};

export default Work;
