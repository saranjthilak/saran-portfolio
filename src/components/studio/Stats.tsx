"use client";

import { Eyebrow, Reveal, ScrollCount } from "./primitives";

const STATS = [
  { v: 99.9, d: 1, s: "%", label: "ETL pipeline reliability" },
  { v: 40, d: 0, s: "%", label: "Faster RAG processing" },
  { v: 30, d: 0, s: "%", label: "Embedding accuracy gain" },
  { v: 9, d: 0, s: "+", label: "Years in production" },
];

const Stats = () => (
  <section className="pb-24 sm:pb-32">
    <div className="shell pad-x">
      <Reveal>
        <div className="card-surface px-7 py-12 sm:px-12 sm:py-16">
          <Eyebrow>By the numbers</Eyebrow>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="flex flex-col gap-2 border-t border-border pt-5">
                  <span className="text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] font-display">
                    <ScrollCount value={s.v} suffix={s.s} decimals={s.d} />
                  </span>
                  <span className="text-sm text-foreground/50">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Stats;
