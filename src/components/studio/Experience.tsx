"use client";

import { experience } from "@/data/portfolio";
import { Eyebrow, Reveal } from "./primitives";

const Experience = () => (
  <section id="experience" className="py-24 sm:py-32">
    <div className="shell pad-x">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal><Eyebrow>Experience</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Nine years, four teams.
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 border-t border-border">
        {experience.map((e, i) => (
          <Reveal key={e.company + e.period} delay={i * 80}>
            <article className="group grid gap-4 border-b border-border py-9 md:grid-cols-[10rem_1fr_1.4fr] md:gap-10">
              <div className="text-sm text-muted-foreground">{e.period}</div>
              <div>
                <h3 className="text-xl font-medium tracking-[-0.01em] font-display">{e.company}</h3>
                <p className="mt-1 text-sm text-foreground/70">{e.role}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{e.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
