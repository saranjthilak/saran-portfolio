"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { certifications } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;
const GREEN = "hsl(119,99%,46%)";

// ── Canvas particle field ────────────────────────────────────────────────────
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
      r: number; alpha: number; pulse: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,232,56,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.pulse += 0.02;
        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,232,56,${a})`;
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

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-40 overflow-hidden border-t border-white/10 min-h-screen flex flex-col justify-end"
      style={{
        background: "hsl(0 0% 8%)",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.6)",
      }}
    >
      {/* ── Layered decorative background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">

        {/* Animated particle field */}
        <ParticleCanvas />

        {/* Subtle techy grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,232,56,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,232,56,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Large glowing orbs */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,232,56,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,232,56,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(0,232,56,0.04) 0%, transparent 65%)",
          }}
        />

        {/* Floating geometric shapes */}
        <svg
          className="absolute top-16 right-16 w-32 h-32 opacity-[0.06]"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
          style={{ animation: "spin 40s linear infinite" }}
        >
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" stroke={GREEN} strokeWidth="1.5" />
          <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" stroke={GREEN} strokeWidth="1" />
        </svg>

        <svg
          className="absolute bottom-24 left-12 w-24 h-24 opacity-[0.05]"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
          style={{ animation: "spin 30s linear infinite reverse" }}
        >
          <rect x="10" y="10" width="80" height="80" stroke={GREEN} strokeWidth="1.5" />
          <rect x="25" y="25" width="50" height="50" stroke={GREEN} strokeWidth="1" />
          <rect x="40" y="40" width="20" height="20" stroke={GREEN} strokeWidth="0.8" />
        </svg>

        <svg
          className="absolute top-1/3 left-1/4 w-16 h-16 opacity-[0.05]"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
          style={{ animation: "spin 50s linear infinite" }}
        >
          <circle cx="50" cy="50" r="45" stroke={GREEN} strokeWidth="1.5" />
          <circle cx="50" cy="50" r="30" stroke={GREEN} strokeWidth="1" />
          <circle cx="50" cy="50" r="15" stroke={GREEN} strokeWidth="0.8" />
        </svg>

        {/* Horizontal scan lines */}
        <div
          className="absolute left-0 w-full h-px"
          style={{
            top: "30%",
            background: `linear-gradient(90deg, transparent, ${GREEN}18, transparent)`,
          }}
        />
        <div
          className="absolute left-0 w-full h-px"
          style={{
            top: "60%",
            background: `linear-gradient(90deg, transparent, ${GREEN}10, transparent)`,
          }}
        />

        {/* Corner accent brackets */}
        <svg className="absolute top-8 left-8 w-8 h-8 opacity-20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M0 16 L0 0 L16 0" stroke={GREEN} strokeWidth="2" />
        </svg>
        <svg className="absolute top-8 right-8 w-8 h-8 opacity-20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M32 16 L32 0 L16 0" stroke={GREEN} strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-8 left-8 w-8 h-8 opacity-20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M0 16 L0 32 L16 32" stroke={GREEN} strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-8 right-8 w-8 h-8 opacity-20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M32 16 L32 32 L16 32" stroke={GREEN} strokeWidth="2" />
        </svg>

        {/* Vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-40">

        {/* Section label */}
        <motion.p
          className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-xs mb-4"
          style={{ color: GREEN }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: GREEN }} />
          Credentials
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-black uppercase leading-[1.02] tracking-tight text-white mb-12"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          Certifications.
        </motion.h2>

        {/* Cert list */}
        {certifications.length > 0 && (
          <div className="flex flex-col border-t border-white/10">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                className="group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-8 py-6 md:py-8 border-b border-white/10 items-center px-4 -mx-4 rounded-xl transition-all duration-300 cursor-default"
                style={{}}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: 0.15 + idx * 0.08, ease: EASE }}
                whileHover={{ backgroundColor: "rgba(0,232,56,0.04)" }}
              >
                <div>
                  <span className="text-sm font-semibold uppercase tracking-widest block mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {cert.issuer}
                  </span>
                  <span className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {cert.level}
                  </span>
                </div>
                <div>
                  <h4
                    className="text-xl md:text-2xl font-medium text-white leading-tight transition-colors duration-300"
                    style={{ ["--tw-text-opacity" as string]: 1 }}
                  >
                    <span className="group-hover:text-[hsl(119,99%,46%)] transition-colors duration-300">
                      {cert.title}
                    </span>
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* CSS keyframe for SVG rotation */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

