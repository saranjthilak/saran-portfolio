"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import Magnet from "./Magnet";
import ContactButton from "./ContactButton";

const ease = [0.25, 0.1, 0.25, 1] as const;

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "mailto:saranjthilak@gmail.com" },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col h-screen font-kanit overflow-x-clip"
      style={{ background: "#0C0C0C" }}
    >
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0, ease }}
        className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 relative z-20"
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
          >
            {link.label}
          </a>
        ))}
      </motion.nav>

      {/* Hero Heading */}
      <div className="overflow-hidden relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease }}
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center
            text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]
            mt-6 sm:mt-4 md:-mt-5"
        >
          Hi, i&apos;m saran
        </motion.h1>
      </div>

      {/* Portrait — absolutely centered, magnetic */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease }}
        className="absolute left-1/2 -translate-x-1/2 z-10
          top-1/2 -translate-y-1/2
          sm:top-auto sm:translate-y-0 sm:bottom-0"
      >
        <Magnet padding={150} strength={3}>
          <img
            src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png"
            alt="Saran Jaya Thilak"
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] object-cover object-top select-none pointer-events-none"
            draggable={false}
          />
        </Magnet>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative z-20 mt-auto flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        {/* Left text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug
            max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
        >
          a data engineer and genai specialist building rag systems, mlops pipelines, and ai-native products
        </motion.p>

        {/* Contact button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
        >
          <ContactButton />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
