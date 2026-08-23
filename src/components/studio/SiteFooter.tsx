"use client";

import { LogoMark } from "./primitives";

const SiteFooter = ({ scrollToSection: _scrollToSection }: { scrollToSection: (id: string) => void }) => (
  <footer className="border-t border-border bg-surface pb-8 pt-12">
    <div className="shell pad-x">
      <div className="flex flex-col gap-6 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2 text-foreground/80">
          <LogoMark className="text-base text-accent" /> Saran Jaya Thilak
        </span>
        <div className="flex flex-wrap gap-6">
          <a href="https://github.com/saranjthilak" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">GitHub</a>
          <a href="https://www.linkedin.com/in/saranjayathilak" target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">LinkedIn</a>
          <a href="mailto:saranjthilak@gmail.com" className="transition-colors hover:text-accent">Email</a>
        </div>
        <span>© {new Date().getFullYear()} — Berlin, Germany</span>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
