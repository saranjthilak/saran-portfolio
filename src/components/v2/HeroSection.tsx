"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import FadeIn from "./FadeIn";

/* ─── Nav links ──────────────────────────────────────────── */
const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

/* ─── Particle Network Canvas ────────────────────────────── */
const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const PARTICLE_COUNT = 60;
    const CONNECTION_DIST = 150;
    const MOUSE_DIST = 200;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
    }

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.4 + 0.1,
    }));

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);

    const accentRGB = { r: 255, g: 61, b: 0 }; // #ff3d00 flame

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const distMouse = Math.sqrt(dxm * dxm + dym * dym);
        if (distMouse < MOUSE_DIST) {
          const force = (1 - distMouse / MOUSE_DIST) * 0.02;
          p.vx += dxm * force;
          p.vy += dym * force;
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx *= 0.98;
          p.vy *= 0.98;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, ${p.baseAlpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      style={{ opacity: 0.5 }}
    />
  );
};

/* ─── Logo ───────────────────────────────────────────────── */
const Logo = (props: { className?: string }) => (
  <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" className={props.className}>
    <path d="M14 1.6 20.3 8 14 14.4 7.7 8 14 1.6Z" fill="#ff6a00" />
    <path d="M6.4 9.3 12.7 15.7 6.4 22.1 0.1 15.7 6.4 9.3Z" fill="#ff3d00" />
    <path d="M21.6 9.3 27.9 15.7 21.6 22.1 15.3 15.7 21.6 9.3Z" fill="#ff9a2e" />
  </svg>
);

/* ─── Animated Heading (Fluxora: 4-line display, serif italic accent) ─── */
const AnimatedHeading = () => {
  return (
    <motion.h1
      className="text-5xl md:text-[3.5rem] lg:text-[4rem] font-black leading-[0.92] tracking-tighter mb-6 text-white"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="block">I build AI systems</span>
      <span className="block">that hold up</span>
      <span className="block font-serif italic text-[hsl(var(--fluxora-flame))]">in production</span>
      <span className="block text-[hsl(var(--fluxora-flame-lit))]">.</span>
    </motion.h1>
  );
};

/* ─── 3D Tilt ID Card ────────────────────────────────────── */
const IDCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      initial={{ opacity: 0, scale: 0.85, rotate: 5 }}
      animate={{ opacity: 1, scale: 1, rotate: 3 }}
      transition={{ duration: 0.9, delay: 0.36, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ rotate: 0 }}
      className="relative z-10 w-[300px] h-[420px] bg-[hsl(var(--fluxora-ground-deep))/80] backdrop-blur-sm border border-white/15 overflow-hidden shadow-2xl shadow-black/80 cursor-pointer group rounded-2xl"
    >
      {/* Holographic shimmer overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "linear-gradient(105deg, transparent 20%, rgba(255,61,0,0.06) 35%, rgba(255,138,31,0.12) 45%, rgba(255,61,0,0.06) 55%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Scanning line animation */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] z-30 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(17 100% 50% / 0.6), transparent)",
          boxShadow: "0 0 20px hsl(17 100% 50% / 0.3)",
        }}
        animate={{ top: ["-5%", "105%"] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
      />

      {/* Card Header Hole */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-[hsl(var(--fluxora-ground-deep))] rounded-full border border-white/10 z-20 shadow-inner" />

      {/* ID Portrait */}
      <div className="absolute inset-0 p-3 pb-24">
        <div className="w-full h-full bg-[hsl(var(--fluxora-ground-deep))] rounded-2xl overflow-hidden relative">
          <img
            src="/images/profile.png"
            alt="Saran Portrait"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-500"
            draggable={false}
          />
          <div className="absolute inset-0 border border-[hsl(var(--fluxora-flame))]/30 rounded-2xl pointer-events-none" />
        </div>
      </div>

      {/* Card Bottom Details */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[hsl(var(--fluxora-ground-deep))] via-[hsl(var(--fluxora-ground-deep))/95] to-transparent flex flex-col justify-end p-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-[hsl(var(--fluxora-flame-lit))] animate-pulse shadow-[0_0_8px_rgba(255,138,31,0.6)]" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[hsl(var(--fluxora-flame-lit))]/80">Available for hire</span>
        </div>
        <h3 className="text-[1.35rem] font-black tracking-tighter text-white leading-tight">Saran Jaya Thilak</h3>
        <p className="text-[hsl(var(--fluxora-flame-lit))] text-xs uppercase tracking-widest font-semibold mt-1">Data Engineer &amp; GenAI Specialist</p>

        <div className="w-full h-6 mt-4 flex gap-[2px] opacity-40">
          <div className="w-1 h-full bg-white"></div>
          <div className="w-[6px] h-full bg-white"></div>
          <div className="w-1 h-full bg-white"></div>
          <div className="w-[10px] h-full bg-white"></div>
          <div className="w-1 h-full bg-white"></div>
          <div className="w-[2px] h-full bg-white"></div>
          <div className="w-[12px] h-full bg-white"></div>
          <div className="w-[5px] h-full bg-white"></div>
          <div className="w-1 h-full bg-white"></div>
          <div className="w-[8px] h-full bg-white"></div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Scroll Indicator ───────────────────────────────────── */
const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2, duration: 0.8 }}
  >
    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Scroll</span>
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <ChevronDown className="w-4 h-4 text-white/50" />
    </motion.div>
  </motion.div>
);

/* ─── Availability Badge ─────────────────────────────────── */
const AvailabilityBadge = () => (
  <motion.div
    className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[hsl(var(--fluxora-flame-lit))]/30 bg-[hsl(var(--fluxora-flame-lit))]/5"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.2, duration: 0.5 }}
  >
    <div className="relative">
      <div className="w-2 h-2 rounded-full bg-[hsl(var(--fluxora-flame-lit))]" />
      <div className="absolute inset-0 w-2 h-2 rounded-full bg-[hsl(var(--fluxora-flame-lit))] animate-ping" />
    </div>
    <span className="text-[11px] font-mono uppercase tracking-wider text-[hsl(var(--fluxora-flame-lit))]/90">
      Available
    </span>
  </motion.div>
);

/* ─── Main Hero Section ──────────────────────────────────── */
const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);

    const video = videoRef.current;
    if (!video) return;
    const play = video.play();
    if (play?.catch) play.catch(() => {});
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      setReady(true);
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden text-white font-sans">
      {/* Video background */}
      <div className="absolute inset-0 z-[-2]">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover object-position-[68%_center] hero__video ${ready ? "is-ready" : ""}`}
          src="/hero-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setReady(true)}
        />
        {/* Ember scrim overlay */}
        <div className="absolute inset-0 z-[-1]"
          style={{
            background:
              "linear-gradient(96deg, rgba(10, 3, 0, 0.9) 0%, rgba(14, 4, 0, 0.66) 30%, rgba(20, 6, 0, 0.16) 52%, rgba(20, 6, 0, 0) 68%)," +
              "linear-gradient(0deg, rgba(9, 2, 0, 0.78) 0%, rgba(9, 2, 0, 0.12) 28%, rgba(0, 0, 0, 0) 46%)," +
              "linear-gradient(180deg, rgba(8, 2, 0, 0.5) 0%, rgba(0, 0, 0, 0) 22%)",
          }}
        />
      </div>

      {/* Blueprint dotted grid background */}
      <div className="blueprint-dots absolute inset-0 pointer-events-none opacity-[0.06]" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[hsl(var(--fluxora-ground-deep))]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 md:px-12 h-24">
        <motion.a
          href="#home"
          className="text-2xl font-black tracking-tighter"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo className="w-6 h-6 mr-2" />
          SARAN<span className="text-[hsl(var(--fluxora-flame-lit))]">.</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-3">
          <div className="px-3 py-1 border border-white/10 rounded-full bg-[rgba(28,10,2,0.34)] backdrop-blur-sm flex items-center gap-2">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold uppercase text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-white/10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AvailabilityBadge />
          <a href="#contact" className="px-6 py-2 bg-[hsl(var(--fluxora-flame))] text-white font-bold text-sm uppercase tracking-wider rounded-full hover:bg-[hsl(var(--fluxora-flame-lit))] transition-colors shadow-[0_14px_40px_rgba(255,61,0,0.38)] hover:shadow-[0_20px_52px_rgba(255,61,0,0.5)]">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <section id="home" className="relative z-10 min-h-screen flex items-start pt-16 px-4 md:px-8">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left Column */}
          <div className="flex flex-col items-start pt-8 lg:pt-0 max-w-md">

            {/* Headline */}
            <AnimatedHeading />

            {/* Lede */}
            <FadeIn y={20} delay={0.14} viewportMargin="-100px">
              <p className="text-white/72 max-w-lg text-base leading-relaxed mb-10">
                RAG chatbots that cut support load by 25%. Airflow pipelines running at 99.9% reliability. I design and ship data&nbsp;+&nbsp;AI infrastructure that doesn&apos;t break under real workloads.
              </p>
            </FadeIn>

            {/* CTA row */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="#projects" className="group flex items-center gap-2 px-6 py-2.5 bg-[hsl(var(--fluxora-flame))] text-white font-bold text-sm uppercase tracking-wider rounded-full shadow-[0_14px_40px_rgba(255,61,0,0.38)] hover:bg-[hsl(var(--fluxora-flame-lit))] hover:shadow-[0_20px_52px_rgba(255,61,0,0.5)] transition-all">
                <span className="relative z-10">Get started</span>
                <span className="hero__go-dot flex items-center justify-center w-7 h-7 rounded-full bg-white text-[hsl(var(--fluxora-ground-deep))] ml-2">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                </span>
              </a>
              <a href="#contact" className="px-6 py-2.5 border border-white/25 text-white font-bold text-sm uppercase tracking-wider rounded-full hover:border-[hsl(var(--fluxora-flame-lit))] hover:text-[hsl(var(--fluxora-flame-lit))] transition-colors">
                Contact Me
              </a>
            </motion.div>

            {/* Proof: avatar dots + stats */}
            <motion.div
              className="mt-4 flex items-center gap-2"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full border-2 border-[hsl(var(--fluxora-ground-deep))] bg-gradient-to-br from-[#ff7a3d] to-[#ffb27a]" />
                <div className="w-7 h-7 rounded-full border-2 border-[hsl(var(--fluxora-ground-deep))] bg-gradient-to-br from-[#6f4bd8] to-[#a98cff]" />
                <div className="w-7 h-7 rounded-full border-2 border-[hsl(var(--fluxora-ground-deep))] bg-gradient-to-br from-[#1f9ea8] to-[#63d6df]" />
                <div className="w-7 h-7 rounded-full border-2 border-[hsl(var(--fluxora-ground-deep))] bg-gradient-to-br from-[#d8434b] to-[#ff8a8f]" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-white/72 leading-tight">
                <span className="block text-white font-semibold text-[12px]">10+ Years Exp</span>
                Live Support
              </span>
            </motion.div>

            {/* Glass stat cards */}
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative w-[160px] min-h-[110px] p-3 rounded-[12px] border border-white/10 bg-[rgba(56,20,6,0.42)] backdrop-blur-[16px] saturate-[1.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]">
                <span className="absolute top-[10px] right-[12px] text-[12px] text-white/80 font-mono">*</span>
                <span className="text-xl md:text-[2rem] font-black leading-1 tracking-tighter text-white">10+</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/80 mt-1">Years Exp.</span>
                <span className="absolute right-[12px] bottom-[18px] w-10 h-[1px] bg-white/28" />
              </div>
              <div className="relative w-[160px] min-h-[110px] p-3 rounded-[12px] border border-white/10 bg-gradient-to-br from-[rgba(120,30,4,0.5)] to-[rgba(48,14,2,0.5)] backdrop-blur-[16px] shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]">
                <span className="absolute top-[10px] right-[12px] text-[12px] text-white/80 font-mono">*</span>
                <span className="text-xl md:text-[2rem] font-black leading-1 tracking-tighter text-white">2</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/80 mt-1">IEEE Papers</span>
                <span className="absolute right-[12px] bottom-[18px] w-10 h-[1px] bg-white/28" />
              </div>
              <div className="relative w-[160px] min-h-[110px] p-3 rounded-[12px] border border-white/10 bg-[rgba(56,20,6,0.42)] backdrop-blur-[16px] saturate-[1.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]">
                <span className="absolute top-[10px] right-[12px] text-[12px] text-white/80 font-mono">*</span>
                <span className="text-xl md:text-[2rem] font-black leading-1 tracking-tighter text-white">5+</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/80 mt-1">Certifications</span>
                <span className="absolute right-[12px] bottom-[18px] w-10 h-[1px] bg-white/28" />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Interactive ID Card */}
          <div className="relative flex justify-center lg:justify-end items-center h-[500px]">
            <motion.div
              className="absolute w-[350px] h-[350px] rounded-full -z-0"
              style={{
                background: "radial-gradient(circle, hsl(17 100% 50% / 0.12) 0%, hsl(17 100% 50% / 0.04) 40%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute w-[380px] h-[380px] rounded-full border border-[hsl(var(--fluxora-flame))]/8 -z-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[hsl(var(--fluxora-flame))]/30" />
            </motion.div>

            <IDCard />
          </div>

        </div>
      </section>

      <ScrollIndicator />
    </div>
  );
};

export default HeroSection;
