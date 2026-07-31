"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/magnetic-button";

const Footer = () => {
  const { scrollYProgress } = useScroll();

  // Circular progress ring — maps scroll progress to stroke-dashoffset
  const circumference = 2 * Math.PI * 18; // radius 18
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0]
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/saranjayathilak",
      label: "LinkedIn",
      icon: Linkedin,
    },
    {
      href: "https://github.com/saranjthilak",
      label: "GitHub",
      icon: Github,
    },
    {
      href: "mailto:saranjthilak@gmail.com",
      label: "Email",
      icon: Mail,
    },
  ];

  return (
    <footer className="relative border-t border-white/[0.05] mt-24">
      {/* Large CTA Text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 sm:py-32 px-6 sm:px-8 text-center"
      >
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary/80 to-accent/60 animate-gradient-text" style={{ backgroundSize: "200% 200%" }}>
          Let&apos;s work together.
        </h2>
        <p className="mt-6 text-muted-foreground text-lg font-light max-w-md mx-auto">
          Got a project in mind? I&apos;d love to hear about it.
        </p>
      </motion.div>

      {/* Footer Bar */}
      <div className="py-8 px-6 sm:px-8 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-xl font-display font-bold">Saran Jaya Thilak</div>
            <p className="text-muted-foreground text-sm font-light">
              © {new Date().getFullYear()} — All rights reserved.
            </p>
          </div>

          {/* Social Links — Magnetic */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <MagneticButton
                key={label}
                as="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                strength={8}
                className="w-11 h-11 rounded-full glass flex items-center justify-center text-foreground hover:bg-white/10 hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                <Icon className="w-4 h-4" />
              </MagneticButton>
            ))}
            
            <div className="w-px h-6 bg-white/10 mx-2" />
            
            {/* Back to top with scroll progress ring */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="relative w-11 h-11 rounded-full glass flex items-center justify-center text-foreground hover:bg-white/10 transition-all duration-300 group"
            >
              {/* Progress Ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 44 44"
              >
                {/* Background ring */}
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="2"
                />
                {/* Progress ring */}
                <motion.circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  stroke="hsl(217, 91%, 60%)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  style={{ strokeDashoffset }}
                />
              </svg>
              <ArrowUp className="w-4 h-4 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
