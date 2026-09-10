"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { publications } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;

// Indigo/blue palette to match the research section theme
const INDIGO = "rgba(99,102,241,";   // indigo-500
const BLUE   = "rgba(59,130,246,";   // blue-500

// ── Canvas particle field (indigo-blue variant) ──────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; pulse: number; blue: boolean;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.45 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        blue: Math.random() > 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = 0.07 * (1 - dist / 130);
            ctx.beginPath();
            ctx.strokeStyle = `${INDIGO}${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      particles.forEach((p) => {
        p.pulse += 0.018;
        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        const color = p.blue ? BLUE : INDIGO;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${a})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

// ── Section ──────────────────────────────────────────────────────────────────
export default function ResearchSection() {
  return (
    <section
      id="research"
      className="relative font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-[35] overflow-hidden border-t border-indigo-500/20 min-h-screen flex flex-col justify-end"
      style={{
        background: "linear-gradient(160deg, #080c18 0%, #0b0f1e 40%, #080b16 70%, #050810 100%)",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── Layered background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">

        {/* Indigo particle field */}
        <ParticleCanvas />

        {/* Scholarly grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(${INDIGO}0.05) 1px, transparent 1px), linear-gradient(90deg, ${INDIGO}0.05) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />

        {/* Large glowing orbs */}
        <div className="absolute top-[10%] left-[6%] w-[420px] h-[420px] rounded-full" style={{ background: `radial-gradient(circle, ${INDIGO}0.1) 0%, transparent 70%)` }} />
        <div className="absolute bottom-[12%] right-[5%] w-[360px] h-[360px] rounded-full" style={{ background: `radial-gradient(circle, ${BLUE}0.08) 0%, transparent 70%)` }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full" style={{ background: `radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 65%)` }} />

        {/* Floating document SVG icons */}
        <svg className="absolute top-[8%] right-[12%] w-28 h-28 opacity-[0.07]" fill={`${INDIGO}1)`} viewBox="0 0 24 24" aria-hidden="true" style={{ animation: "research-float 12s ease-in-out infinite" }}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
          <path d="M8 14h8v1H8zm0 3h5v1H8z"/>
        </svg>
        <svg className="absolute bottom-[20%] left-[4%] w-20 h-20 opacity-[0.06]" fill={`${BLUE}1)`} viewBox="0 0 24 24" aria-hidden="true" style={{ animation: "research-float-2 16s ease-in-out infinite 3s" }}>
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
        <svg className="absolute top-[35%] right-[3%] w-16 h-16 opacity-[0.06]" fill="rgba(139,92,246,1)" viewBox="0 0 24 24" aria-hidden="true" style={{ animation: "research-float 20s ease-in-out infinite 6s" }}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
        </svg>

        {/* Rotating geometric shapes */}
        <svg className="absolute top-16 left-16 w-24 h-24 opacity-[0.05]" viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ animation: "research-spin 45s linear infinite" }}>
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" stroke={`${INDIGO}1)`} strokeWidth="1.5"/>
          <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" stroke={`${INDIGO}1)`} strokeWidth="1"/>
        </svg>
        <svg className="absolute bottom-28 right-16 w-20 h-20 opacity-[0.05]" viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ animation: "research-spin 35s linear infinite reverse" }}>
          <circle cx="50" cy="50" r="45" stroke={`${BLUE}1)`} strokeWidth="1.5"/>
          <circle cx="50" cy="50" r="30" stroke={`${BLUE}1)`} strokeWidth="1"/>
          <circle cx="50" cy="50" r="15" stroke={`${BLUE}1)`} strokeWidth="0.8"/>
        </svg>

        {/* Horizontal scan lines */}
        <div className="absolute left-0 w-full h-px" style={{ top: "32%", background: `linear-gradient(90deg, transparent, ${INDIGO}0.12), transparent)` }} />
        <div className="absolute left-0 w-full h-px" style={{ top: "63%", background: `linear-gradient(90deg, transparent, ${BLUE}0.09), transparent)` }} />

        {/* Corner brackets */}
        <svg className="absolute top-8 left-8 w-8 h-8 opacity-20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M0 16 L0 0 L16 0" stroke={`${INDIGO}1)`} strokeWidth="2"/>
        </svg>
        <svg className="absolute top-8 right-8 w-8 h-8 opacity-20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M32 16 L32 0 L16 0" stroke={`${INDIGO}1)`} strokeWidth="2"/>
        </svg>
        <svg className="absolute bottom-8 left-8 w-8 h-8 opacity-20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M0 16 L0 32 L16 32" stroke={`${BLUE}1)`} strokeWidth="2"/>
        </svg>
        <svg className="absolute bottom-8 right-8 w-8 h-8 opacity-20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M32 16 L32 32 L16 32" stroke={`${BLUE}1)`} strokeWidth="2"/>
        </svg>

        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
        <div className="absolute bottom-0 left-0 w-full h-32" style={{ background: "linear-gradient(to top, #050810, transparent)" }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-40">

        {/* Section label */}
        <motion.p
          className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-xs mb-4"
          style={{ color: "rgba(165,180,252,0.7)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgba(165,180,252,0.7)" }} />
          Research
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-black leading-[1.02] tracking-tight text-white mb-12"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          Published{" "}
          <span style={{ background: "linear-gradient(90deg, #818cf8, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            work.
          </span>
        </motion.h2>

        {/* Publications */}
        {publications.length > 0 && (
          <div>
            <motion.h3
              className="text-xl font-semibold mb-4 pb-2"
              style={{ color: "rgba(255,255,255,0.75)", borderBottom: "1px solid rgba(99,102,241,0.2)" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Publications
            </motion.h3>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {publications.map((pub, idx) => (
                <motion.a
                  key={idx}
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-8 py-6 md:py-8 items-start px-4 -mx-4 rounded-xl transition-all duration-300 cursor-pointer"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.55, delay: 0.15 + idx * 0.1, ease: EASE }}
                  whileHover={{ backgroundColor: "rgba(99,102,241,0.05)" }}
                >
                  <div>
                    <span className="text-sm font-semibold uppercase tracking-widest block mb-1" style={{ color: "rgba(165,180,252,0.7)" }}>
                      {pub.date}
                    </span>
                    <span className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {pub.journal}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-medium text-white mb-3 leading-tight transition-colors duration-300 group-hover:text-indigo-300">
                      {pub.title}
                    </h4>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {pub.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes research-float   { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-16px) rotate(1deg); } }
        @keyframes research-float-2 { 0%,100% { transform: translateY(0) rotate(2deg);  } 50% { transform: translateY(-10px) rotate(-1.5deg); } }
        @keyframes research-spin    { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}

