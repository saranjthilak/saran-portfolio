"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { certifications } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { useRef, type MouseEvent } from "react";

/** Brand accent colors for each certification for a flashy multi-color vibe */
const brandAccents = [
  { color: "from-amber-400 via-orange-500 to-amber-600",   glow: "rgba(251,191,36,0.35)",  border: "border-amber-500/30",  text: "text-amber-400",   bg: "bg-amber-500" },
  { color: "from-sky-400 via-blue-500 to-indigo-600",       glow: "rgba(56,189,248,0.35)",   border: "border-sky-500/30",    text: "text-sky-400",     bg: "bg-sky-500" },
  { color: "from-red-400 via-rose-500 to-pink-600",         glow: "rgba(251,113,133,0.35)",  border: "border-rose-500/30",   text: "text-rose-400",    bg: "bg-rose-500" },
  { color: "from-violet-400 via-purple-500 to-fuchsia-600", glow: "rgba(167,139,250,0.35)", border: "border-violet-500/30", text: "text-violet-400",  bg: "bg-violet-500" },
];

const CertificationCard = ({ cert, index }: { cert: typeof certifications[0], index: number }) => {
  const accent = brandAccents[index % brandAccents.length];
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => { mouseX.set(0.5); mouseY.set(0.5); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 80, damping: 18, delay: index * 0.12 }}
      className="group relative h-full perspective-[1200px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.04 }}
        transition={{ scale: { type: "spring", stiffness: 260, damping: 20 } }}
        className="relative h-full"
      >
        {/* Animated glow ring behind card */}
        <div
          className="absolute -inset-[1px] rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-sm"
          style={{ background: `linear-gradient(135deg, ${accent.glow}, transparent 60%)` }}
        />

        <div className={`relative h-full rounded-[1.75rem] glass-panel p-6 sm:p-8 flex flex-col`}>

            {/* Holographic shimmer on hover */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: useTransform(
                  [glareX, glareY],
                  ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, transparent 50%)`
                ),
              }}
            />

            {/* Animated circuit-line decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-[inherit] z-0">
              <svg className="absolute top-0 right-0 w-32 h-32 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700" viewBox="0 0 100 100">
                <path d="M 80 0 L 80 30 L 50 30 L 50 60 L 20 60 L 20 100" stroke="currentColor" strokeWidth="1" fill="none" className={accent.text} />
                <circle cx="80" cy="0" r="2" fill="currentColor" className={accent.text} />
                <circle cx="50" cy="30" r="2" fill="currentColor" className={accent.text} />
                <circle cx="20" cy="60" r="2" fill="currentColor" className={accent.text} />
              </svg>
              <svg className="absolute bottom-0 left-0 w-24 h-24 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700" viewBox="0 0 100 100">
                <path d="M 0 20 L 40 20 L 40 60 L 80 60 L 80 100" stroke="currentColor" strokeWidth="1" fill="none" className={accent.text} />
                <circle cx="40" cy="20" r="2" fill="currentColor" className={accent.text} />
                <circle cx="80" cy="60" r="2" fill="currentColor" className={accent.text} />
              </svg>
            </div>

            {/* Top: Logo + Verified badge */}
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accent.color} p-[1px] shadow-[0_0_20px_${accent.glow}] group-hover:shadow-[0_0_30px_${accent.glow}] transition-shadow duration-500`}>
                <div className="w-full h-full rounded-[calc(1rem-1px)] bg-background/80 backdrop-blur-xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  {cert.logo}
                </div>
              </div>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 + index * 0.1 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${accent.color} text-white text-[10px] uppercase tracking-wider font-mono font-semibold shadow-lg`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified</span>
              </motion.div>
            </div>

            {/* Title */}
            <div className="relative z-10 flex-grow flex flex-col">
              <h3 className="text-lg sm:text-xl font-bold font-display text-foreground mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                {cert.title}
              </h3>

              {/* Level badge */}
              {cert.level && (
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "auto" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden mb-4"
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${accent.border} border bg-white/[0.03]`}>
                    <Zap className={`w-3 h-3 ${accent.text}`} />
                    <span className={`text-[11px] font-mono ${accent.text} uppercase tracking-[0.2em] font-semibold`}>
                      {cert.level}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Issuer footer with animated border scan */}
              <div className="mt-auto pt-5 relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.04]" />
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${accent.color} origin-left opacity-40`}
                />

                <div className="flex items-center justify-between gap-2 mt-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${accent.bg} animate-pulse shadow-[0_0_6px_${accent.glow}]`} />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-mono">Issued By</span>
                  </div>
                  <span className={`text-sm font-semibold ${accent.text} font-mono tracking-wide`}>
                    {cert.issuer}
                  </span>
                </div>
              </div>
            </div>
          </div>
      </motion.div>
    </motion.div>
  );
};

const CertificationsSection = () => {
  return (
    <section id="certifications" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Flashy background effects */}
      <div className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-violet-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      {/* Floating grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgwVjB6bTMwIDMwaDMwdjMwSDMweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAxKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Certifications"
          tag="Credentials"
          index="07"
          subtitle="Industry-validated expertise in cloud architecture and generative AI."
        />

        {/* Certification count highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-mono text-muted-foreground">
              <span className="text-foreground font-semibold">{certifications.length}</span> Active Credentials
            </span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-white/5 to-transparent" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
