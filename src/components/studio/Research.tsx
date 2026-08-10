"use client";

import { certifications, publications } from "@/data/portfolio";
import { ArrowUpRight, Eyebrow, Reveal } from "./primitives";

const Research = () => (
  <section id="research" className="bg-surface py-24 sm:py-32">
    <div className="shell pad-x">
      <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <Reveal><Eyebrow>Research</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Published machine learning work.
            </h2>
          </Reveal>

          <div className="mt-10 flex flex-col gap-4">
            {publications.map((p, i) => (
              <Reveal key={p.title} delay={120 + i * 90}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-[1.5rem] border border-border bg-background p-7 transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <span className="text-xs uppercase tracking-[0.06em] text-foreground/50">{p.journal} · {p.date}</span>
                      <h3 className="mt-3 text-lg font-medium leading-snug tracking-[-0.01em] font-display">{p.title}</h3>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                      <ArrowUpRight />
                    </span>
                  </div>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal><Eyebrow>Certifications</Eyebrow></Reveal>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <li className="flex flex-col gap-1 py-5">
                  <span className="text-sm font-medium">{c.title}{c.level ? ` — ${c.level}` : ""}</span>
                  <span className="text-sm text-muted-foreground">{c.issuer}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={340}>
            <div className="mt-8 rounded-[1.5rem] border border-border bg-background p-6">
              <span className="text-xs uppercase tracking-[0.06em] text-muted-foreground">Education</span>
              <p className="mt-3 text-sm font-medium">MSc Data Science & Artificial Intelligence</p>
              <p className="text-sm text-muted-foreground">Le Wagon · Berlin, Germany</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default Research;
