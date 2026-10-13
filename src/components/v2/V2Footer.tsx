"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/saranjthilak",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/saranjayathilak",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:saranjthilak@gmail.com",
    icon: Mail,
  },
];

const V2Footer = () => {
  return (
    <footer className="w-full bg-v2-base border-t border-white/5 py-8 px-6 sm:px-12 font-sans relative z-40">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        {/* Branding */}
        <div className="flex items-center gap-2 text-white/50 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
          <span>Saran Jaya Thilak</span>
        </div>

        {/* Minimal Social Icons */}
        <div className="flex items-center gap-4 text-white/40">
          {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={name}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <nav aria-label="Legal information" className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <Link href="/impressum" className="transition-colors hover:text-accent">Impressum</Link>
          <Link href="/datenschutz" className="transition-colors hover:text-accent">Datenschutz</Link>
        </nav>

        {/* Copyright / Location */}
        <p className="text-white/30 tracking-wider">
          © {new Date().getFullYear()} · Berlin, Germany
        </p>
      </div>
    </footer>
  );
};

export default V2Footer;
