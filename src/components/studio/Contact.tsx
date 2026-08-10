"use client";

import ContactForm from "@/components/ContactForm";
import { Eyebrow, Reveal } from "./primitives";

const LINKS = [
  { label: "Email", value: "saranjaya.thilak@gmail.com", href: "mailto:saranjaya.thilak@gmail.com" },
  { label: "Phone", value: "+49 174 461 4592", href: "tel:+491744614592" },
  { label: "GitHub", value: "github.com/saranjthilak", href: "https://github.com/saranjthilak" },
  { label: "LinkedIn", value: "linkedin.com/in/saranjayathilak", href: "https://www.linkedin.com/in/saranjayathilak" },
];

const Contact = () => (
  <section id="contact" className="py-24 sm:py-32">
    <div className="shell pad-x">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal><Eyebrow>Contact</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Let&apos;s build<br />something reliable.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 max-w-sm text-muted-foreground">
              Available for data engineering and generative AI roles or collaborations,
              on-site in Berlin or remote.
            </p>
          </Reveal>

          <dl className="mt-10 divide-y divide-border border-y border-border">
            {LINKS.map((l, i) => (
              <Reveal key={l.label} delay={180 + i * 70}>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-sm text-muted-foreground">{l.label}</dt>
                  <dd>
                    <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-sm font-medium transition-colors hover:text-foreground/70">
                      {l.value}
                    </a>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={120}><ContactForm /></Reveal>
      </div>
    </div>
  </section>
);

export default Contact;
