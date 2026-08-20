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
      {/* Video background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/60 via-transparent to-[#0C0C0C]/90" />
      </div>

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

      {/* Hero Heading — fills remaining space, centered */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease }}
          className="hero-heading font-black uppercase tracking-tight leading-none w-full text-center"
          style={{ fontSize: "clamp(3rem, 17.5vw, 22vw)" }}
        >
          Hi, i&apos;m saran
        </motion.h1>
      </div>

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
