"use client";

import { LogoMark, PillButton } from "./primitives";

const SiteFooter = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => (
  <footer className="border-t border-border bg-surface pb-8 pt-20">
    <div className="shell pad-x">
      <div className="flex flex-wrap items-end justify-between gap-8 border-b border-border pb-14">
        <h2 className="max-w-2xl font-display text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
          Have a system<br />worth building?
        </h2>
        <PillButton variant="outline" arrow="right" onClick={() => scrollToSection("contact")}>
          Get in touch
        </PillButton>
      </div>

      <div className="flex flex-col gap-6 pt-8 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2 text-foreground/80">
          <LogoMark className="text-base text-accent" /> Saran Jaya Thilak
        </span>
        <div className="flex flex-wrap gap-6">
          <a href="https://github.com/saranjthilak" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">GitHub</a>
          <a href="https://www.linkedin.com/in/saranjayathilak" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">LinkedIn</a>
          <a href="mailto:saranjaya.thilak@gmail.com" className="transition-colors hover:text-accent">Email</a>
        </div>
        <span>© {new Date().getFullYear()} — Berlin, Germany</span>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
