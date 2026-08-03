"use client";

import { LogoMark, PillButton } from "./primitives";

const SiteFooter = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => (
  <footer className="bg-ink pb-8 pt-20 text-white">
    <div className="shell pad-x">
      <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/10 pb-14">
        <h2 className="max-w-2xl text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
          Have a system<br />worth building?
        </h2>
        <PillButton variant="light" arrow="right" onClick={() => scrollToSection("contact")}>
          Get in touch
        </PillButton>
      </div>

      <div className="flex flex-col gap-6 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2 text-white/80">
          <LogoMark className="text-base text-[#cf8047]" /> Saran Jaya Thilak
        </span>
        <div className="flex flex-wrap gap-6">
          <a href="https://github.com/saranjthilak" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">GitHub</a>
          <a href="https://www.linkedin.com/in/saranjayathilak" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">LinkedIn</a>
          <a href="mailto:saranjaya.thilak@gmail.com" className="transition-colors hover:text-white">Email</a>
        </div>
        <span>© {new Date().getFullYear()} — Berlin, Germany</span>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
