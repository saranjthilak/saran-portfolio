"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

/* ─── Floating stat badges ───────────────────────────────── */
const statBadges = [
  { label: "Uptime", value: "99.9%", position: "top-8 -left-12", delay: 0.8 },
  { label: "Support ↓", value: "25%", position: "top-8 -right-16", delay: 1.0 },
  { label: "Pipelines", value: "ETL", position: "bottom-12 -left-12", delay: 1.2 },
  { label: "IEEE Papers", value: "2", position: "bottom-4 -right-16", delay: 1.4 },
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

    const accentRGB = { r: 0, g: 223, b: 143 }; // #00df8f

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse repulsion
        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const distMouse = Math.sqrt(dxm * dxm + dym * dym);
        if (distMouse < MOUSE_DIST) {
          const force = (1 - distMouse / MOUSE_DIST) * 0.02;
          p.vx += dxm * force;
          p.vy += dym * force;
        }

        // Speed damping
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

      // Draw connections
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
      style={{ opacity: 0.6 }}
    />
  );
};

/* ─── Animated Heading ───────────────────────────────────── */
const AnimatedHeading = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.h1
      className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.92] tracking-tighter mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.span variants={lineVariants} className="inline">
        I build AI systems
      </motion.span>
      <br/>
      <motion.span variants={lineVariants} className="inline">
        that hold up{" "}
      </motion.span>
      <motion.span variants={lineVariants} className="accent-serif inline">
        in production
      </motion.span>
      <motion.span variants={lineVariants} className="text-accent inline">.</motion.span>
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
      transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ rotate: 0 }}
      className="relative z-10 w-[300px] h-[420px] bg-[#161b22]/80 backdrop-blur-sm border border-white/15 overflow-hidden shadow-2xl shadow-black/80 cursor-pointer group"
    >
      {/* Holographic shimmer overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "linear-gradient(105deg, transparent 20%, rgba(0,223,143,0.06) 35%, rgba(0,223,143,0.12) 45%, rgba(0,223,143,0.06) 55%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Scanning line animation */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] z-30 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(158 100% 44% / 0.6), transparent)",
          boxShadow: "0 0 20px hsl(158 100% 44% / 0.3)",
        }}
        animate={{ top: ["-5%", "105%"] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
      />

      {/* Card Header Hole */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-v2-raised rounded-full border border-white/10 z-20 shadow-inner" />

      {/* ID Portrait */}
      <div className="absolute inset-0 p-3 pb-24">
        <div className="w-full h-full bg-v2-raised rounded-2xl overflow-hidden relative">
          <img
            src="/images/profile.png"
            alt="Saran Portrait"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-500"
            draggable={false}
          />
          {/* Inner neon border effect */}
          <div className="absolute inset-0 border border-accent/30 rounded-2xl pointer-events-none" />
        </div>
      </div>

      {/* Card Bottom Details */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#14181f] via-[#14181f]/95 to-transparent flex flex-col justify-end p-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/80">Available for hire</span>
        </div>
        <h3 className="text-[1.35rem] font-black tracking-tighter text-white leading-tight">Saran Jaya Thilak</h3>
        <p className="text-accent text-xs uppercase tracking-widest font-semibold mt-1">Data Engineer &amp; GenAI Specialist</p>

        {/* Barcode graphic */}
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
    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">Scroll</span>
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <ChevronDown className="w-4 h-4 text-gray-500" />
    </motion.div>
  </motion.div>
);

/* ─── Availability Badge ─────────────────────────────────── */
const AvailabilityBadge = () => (
  <motion.div
    className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.2, duration: 0.5 }}
  >
    <div className="relative">
      <div className="w-2 h-2 rounded-full bg-emerald-400" />
      <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
    </div>
    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400/90">
      Available
    </span>
  </motion.div>
);

/* ─── Main Hero Section ──────────────────────────────────── */
const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative bg-v2-raised min-h-screen overflow-hidden text-white font-sans">
      {/* Ambient gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, hsl(158 100% 44% / 0.06) 0%, transparent 70%)",
        }}
      />
      <div className="absolute bottom-[-30%] right-[-10%] w-[800px] h-[800px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, hsl(158 100% 44% / 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Particle Network Background */}
      {mounted && <ParticleNetwork />}

      {/* Blueprint dotted grid background */}
      <div className="blueprint-dots absolute inset-0 pointer-events-none opacity-[0.06]" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full h-24 z-50 bg-v2-raised/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 md:px-12">
        <motion.a
          href="#home"
          className="text-2xl font-black tracking-tighter"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          SARAN<span className="text-accent">.</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-gray-300 uppercase hover:text-accent transition-colors relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <AvailabilityBadge />
      </nav>

      {/* Massive Typography Graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.h1
          className="text-[20vw] font-black opacity-[0.02] tracking-tighter select-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.02, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          PRODUCTION
        </motion.h1>
      </div>

      {/* Hero Content */}
      <section id="home" className="relative z-10 min-h-screen flex items-center pt-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column */}
          <div className="flex flex-col items-start pt-12 lg:pt-0">
            <motion.div
              className="mb-6 inline-block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="px-3 py-1.5 border border-accent/60 text-xs uppercase tracking-widest relative overflow-hidden group">
                <span className="text-accent font-mono font-medium relative z-10">DATA ENGINEER & GENAI SPECIALIST</span>
                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
              </div>
            </motion.div>

            <AnimatedHeading />

            <FadeIn y={20} delay={0.8} viewportMargin="-100px">
              <p className="text-gray-400 max-w-lg text-base leading-relaxed mb-10">
                RAG chatbots that cut support load by 25%. Airflow pipelines running at 99.9% reliability. I design and ship data&nbsp;+&nbsp;AI infrastructure that doesn&apos;t break under real workloads.
              </p>
            </FadeIn>

            <motion.div
              className="flex flex-wrap items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <a href="#projects" className="btn-frame group flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 font-bold text-sm uppercase tracking-wider relative overflow-hidden">
                <span className="relative z-10">View My Work</span>
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform relative z-10" />
                {/* Hover shine */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </a>
              <a href="#contact" className="btn-frame flex items-center gap-3 bg-transparent border border-white/25 px-8 py-4 font-bold text-sm uppercase tracking-wider text-white hover:border-accent hover:text-accent transition-colors">
                Contact Me
              </a>
            </motion.div>

            {/* Social proof metrics */}
            <motion.div
              className="mt-12 flex items-center gap-8 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tnum">10+</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500">Years Exp.</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tnum">2</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500">IEEE Papers</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tnum">5+</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500">Certifications</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Interactive ID Card */}
          <div className="relative flex justify-center lg:justify-end items-center h-[500px]">
            {/* Ambient green glow behind card */}
            <motion.div
              className="absolute w-[350px] h-[350px] rounded-full -z-0"
              style={{
                background: "radial-gradient(circle, hsl(158 100% 44% / 0.12) 0%, hsl(158 100% 44% / 0.04) 40%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Orbiting ring */}
            <motion.div
              className="absolute w-[380px] h-[380px] rounded-full border border-accent/[0.08] -z-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/30" />
            </motion.div>

            {/* Floating stat badges */}
            {statBadges.map((badge) => (
              <motion.div
                key={badge.label}
                className={`absolute z-20 px-3 py-2 bg-[#161b22]/90 backdrop-blur-md border border-white/10 rounded-lg shadow-lg hidden xl:block ${badge.position}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: badge.delay,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                whileHover={{ scale: 1.1, borderColor: "hsl(158 100% 44% / 0.4)" }}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-500">{badge.label}</div>
                <div className="text-sm font-black text-accent tnum">{badge.value}</div>
              </motion.div>
            ))}

            <IDCard />
          </div>

        </div>
      </section>

      <ScrollIndicator />
    </div>
  );
};

export default HeroSection;
