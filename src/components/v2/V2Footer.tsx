"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

const SOCIAL_LINKS = [
  { name: "GitHub",   href: "https://github.com/saranjthilak",          icon: Github   },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/saranjayathilak", icon: Linkedin },
  { name: "Email",    href: "mailto:saranjthilak@gmail.com",             icon: Mail     },
];

const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

const V2Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer className="w-full relative z-40 overflow-hidden border-t border-white/[0.07]"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Top accent line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3"
        style={{ background: "linear-gradient(to right, transparent, hsl(var(--accent)/0.35), transparent)" }}
      />

      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-dots opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Main footer row */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-4 items-center">

          {/* Left — branding + telemetry */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs font-semibold text-foreground tracking-wider">SARAN JAYA THILAK</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-widest text-white/30">
              <span>Data Engineer</span>
              <span className="text-white/15">·</span>
              <span>GenAI Specialist</span>
              <span className="text-white/15">·</span>
              <span>Berlin, DE</span>
            </div>
            {/* Open-to-work badge */}
            <div className="inline-flex items-center gap-1.5 mt-1 font-mono text-[9px] uppercase tracking-widest"
              style={{ color: "hsl(var(--accent)/0.8)" }}
            >
              <span className="h-1 w-1 rounded-full bg-accent" />
              Open to opportunities
            </div>
          </div>

          {/* Centre — nav links */}
          <nav aria-label="Footer navigation" className="flex items-center justify-center gap-6 flex-wrap">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-widest text-white/35 hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right — social + legal */}
          <div className="flex flex-col items-start md:items-end gap-3">
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={name}
                  className="p-2 rounded-lg border border-white/[0.07] text-white/35 hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
            {/* Legal links */}
            <nav aria-label="Legal information" className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-white/25">
              <Link href="/impressum" className="hover:text-accent transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-accent transition-colors">Datenschutz</Link>
            </nav>
          </div>
        </div>

        {/* Bottom divider row */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/20">
            © {new Date().getFullYear()} · Built with Next.js, Framer Motion &amp; Tailwind
          </p>
          <p className="font-mono text-[9px] text-white/15 tracking-widest">
            SYS :: EOF // ALL NODES NOMINAL
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full border border-white/15 bg-black/80 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 shadow-lg"
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default V2Footer;
