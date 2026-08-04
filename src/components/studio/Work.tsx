"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import { ArrowUpRight, Eyebrow, PillButton, Reveal } from "./primitives";

const Work = () => {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
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
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-background transition-colors duration-500 hover:border-foreground/25"
              >
                <div className={`overflow-hidden ${i === 0 ? "aspect-[16/7]" : "aspect-[16/10]"} bg-muted/50`}>
                  <motion.img
                    src={p.image}
                    alt={`${p.title} preview`}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 grayscale-[0.35] contrast-[0.92] transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-7">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.02em] font-display">{p.title}</h3>
                      <p className="mt-1 text-sm text-foreground/60">{p.source}</p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-foreground/70 transition-all duration-300 group-hover:bg-ink group-hover:text-background">
                      <ArrowUpRight />
                    </span>
                  </div>
                  <p className="max-w-2xl text-sm leading-relaxed text-foreground/55">{p.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {p.skills.map((s) => (
                      <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-foreground/60">{s}</span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <ul className="mt-6 divide-y divide-border border-t border-border">
          {rest.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <li>
                <a href={p.url} target="_blank" rel="noreferrer" className="group flex flex-wrap items-center justify-between gap-4 py-6">
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <h3 className="text-xl font-medium transition-colors group-hover:text-foreground/70 font-display">{p.title}</h3>
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
  );
};

export default Work;
