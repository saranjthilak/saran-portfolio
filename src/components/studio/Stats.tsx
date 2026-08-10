"use client";

import { Eyebrow, Reveal, ScrollCount } from "./primitives";
import StatParticles from "./StatParticles";

const STATS = [
  { v: 99.9, d: 1, s: "%", label: "ETL pipeline reliability", shape: [0.3, 0.45, 0.4, 0.6, 0.55, 0.75, 0.7, 0.9, 1] },
  { v: 40, d: 0, s: "%", label: "Faster RAG processing", shape: [0.9, 0.8, 0.85, 0.6, 0.55, 0.45, 0.5, 0.35, 0.3] },
  { v: 30, d: 0, s: "%", label: "Embedding accuracy gain", shape: [0.35, 0.5, 0.4, 0.65, 0.85, 0.6, 0.8, 0.7, 0.95] },
  { v: 9, d: 0, s: "+", label: "Years in production", shape: [0.25, 0.4, 0.5, 0.55, 0.7, 0.65, 0.85, 0.8, 1] },
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
                <div className="relative flex flex-col gap-2 overflow-hidden border-t border-border pt-5">
                  <StatParticles seed={i + 1} shape={s.shape} />
                  <span className="text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] font-display">
                    <ScrollCount value={s.v} suffix={s.s} decimals={s.d} />
                  </span>
                  <span className="relative text-sm text-foreground/50">{s.label}</span>
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
