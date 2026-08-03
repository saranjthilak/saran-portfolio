"use client";

import { Eyebrow, Globe, Reveal, WordReveal } from "./primitives";

const FACTS = [
  { k: "Based in", v: "Berlin, Germany" },
  { k: "Focus", v: "RAG · Data Platforms · MLOps" },
  { k: "Experience", v: "9 years in production systems" },
  { k: "Published", v: "2 IEEE machine-learning papers" },
];

const About = () => (
  <section id="about" className="py-24 sm:py-32">
    <div className="shell pad-x">
      <Reveal><Eyebrow>About</Eyebrow></Reveal>

      <div className="mt-8 grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <h2 className="text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.025em]">
          <WordReveal
            text="I build AI systems that survive contact with production — retrieval pipelines, guardrails and the data infrastructure that keeps them honest, reliable and fast."
            mutedFrom={13}
          />
        </h2>

        <div className="flex flex-col gap-6">
          <Reveal delay={120}>
            <div className="flex items-start gap-4 rounded-[1.5rem] bg-surface p-6">
              <Globe className="mt-1 shrink-0 text-2xl text-accent" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                From 24×7 telecom operations at Nokia to cloud architecture at Huawei and
                LLM tooling at Tesla, I&apos;ve spent my career on the parts of the stack
                where uptime and accuracy actually matter.
              </p>
            </div>
          </Reveal>

          <dl className="divide-y divide-border border-y border-border">
            {FACTS.map((f, i) => (
              <Reveal key={f.k} delay={160 + i * 80}>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-sm text-muted-foreground">{f.k}</dt>
                  <dd className="text-right text-sm font-medium">{f.v}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </div>
  </section>
);

export default About;
