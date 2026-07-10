
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useMemo, useState } from "react";
import { certifications } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";
import HudFrame from "@/components/ui/hud-frame";
import HeroGlobe from "@/components/ui/hero-globe";

/* ── Extended certification data ── */
interface CertDetail {
  title: string;
  level?: string;
  issuer: string;
  logo: string;
  credentialId: string;
  status: "VERIFIED" | "ACTIVE";
  year: string;
  category: string;
  variant: "cyan" | "fuchsia" | "mixed";
  signalStrength: number;
}

const certDetails: CertDetail[] = [
  {
    ...certifications[0],
    credentialId: "AWS-SAA-2024",
    status: "VERIFIED",
    year: "2024",
    category: "CLOUD ARCHITECTURE",
    variant: "cyan",
    signalStrength: 98,
  },
  {
    ...certifications[1],
    credentialId: "UCD-SQL-DS",
    status: "VERIFIED",
    year: "2023",
    category: "DATA SCIENCE",
    variant: "mixed",
    signalStrength: 95,
  },
  {
    ...certifications[2],
    credentialId: "OCI-GENAI-PRO",
    status: "ACTIVE",
    year: "2025",
    category: "GENERATIVE AI",
    variant: "fuchsia",
    signalStrength: 100,
  },
  {
    ...certifications[3],
    credentialId: "OCI-AI-FND",
    status: "ACTIVE",
    year: "2025",
    category: "AI FOUNDATIONS",
    variant: "fuchsia",
    signalStrength: 97,
  },
];

/* ── Scanning beam effect ── */
const ScanBeam = ({ variant }: { variant: "cyan" | "fuchsia" | "mixed" }) => {
  const glowColors: Record<string, string> = {
    cyan: "via-cyan-400/40",
    fuchsia: "via-fuchsia-400/40",
    mixed: "via-indigo-400/40",
  };
  const shadowColors: Record<string, string> = {
    cyan: "0 0 12px rgba(34,211,238,0.4)",
    fuchsia: "0 0 12px rgba(217,70,239,0.4)",
    mixed: "0 0 12px rgba(99,102,241,0.4)",
  };
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
      <motion.div
        className={`absolute inset-x-0 h-px bg-gradient-to-r from-transparent ${glowColors[variant]} to-transparent`}
        style={{ boxShadow: shadowColors[variant] }}
        animate={{ top: ["0%", "100%"] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

/* ── Hex fingerprint pattern ── */
const HexFingerprint = ({ variant }: { variant: "cyan" | "fuchsia" | "mixed" }) => {
  const color: Record<string, string> = {
    cyan: "border-cyan-400/8",
    fuchsia: "border-fuchsia-400/8",
    mixed: "border-indigo-400/8",
  };

  return (
    <div className="absolute right-4 bottom-4 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-700" aria-hidden>
      <svg width="60" height="60" viewBox="0 0 60 60" className="text-current">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => {
            const x = col * 20 + (row % 2 === 1 ? 10 : 0);
            const y = row * 17;
            return (
              <polygon
                key={`${row}-${col}`}
                points={`${x + 10},${y} ${x + 18},${y + 5} ${x + 18},${y + 13} ${x + 10},${y + 18} ${x + 2},${y + 13} ${x + 2},${y + 5}`}
                fill="none"
                strokeWidth="0.5"
                className={`stroke-current ${color[variant].replace("border-", "text-").replace("/8", "/20")}`}
              />
            );
          })
        )}
      </svg>
    </div>
  );
};

/* ── Signal strength indicator ── */
const SignalBars = ({ strength, variant }: { strength: number; variant: "cyan" | "fuchsia" | "mixed" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  const barColor: Record<string, string> = {
    cyan: "bg-cyan-400",
    fuchsia: "bg-fuchsia-400",
    mixed: "bg-indigo-400",
  };

  const glowColor: Record<string, string> = {
    cyan: "shadow-[0_0_6px_rgba(34,211,238,0.6)]",
    fuchsia: "shadow-[0_0_6px_rgba(217,70,239,0.6)]",
    mixed: "shadow-[0_0_6px_rgba(99,102,241,0.6)]",
  };

  const bars = 5;
  const activeBars = Math.round((strength / 100) * bars);

  return (
    <div ref={ref} className="flex items-end gap-[3px]">
      {Array.from({ length: bars }).map((_, i) => {
        const isActive = i < activeBars;
        const height = 6 + i * 3;
        return (
          <motion.div
            key={i}
            className={`w-[3px] rounded-sm transition-colors duration-300 ${
              isActive ? `${barColor[variant]} ${glowColor[variant]}` : "bg-white/10"
            }`}
            style={{ height }}
            initial={reduce ? false : { scaleY: 0 }}
            animate={isInView || reduce ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{
              duration: 0.3,
              delay: i * 0.08 + 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        );
      })}
    </div>
  );
};

/* ── Status indicator ── */
const StatusBadge = ({ status, variant }: { status: string; variant: "cyan" | "fuchsia" | "mixed" }) => {
  const dotColor: Record<string, string> = {
    cyan: "bg-cyan-400",
    fuchsia: "bg-fuchsia-400",
    mixed: "bg-indigo-400",
  };

  const ringColor: Record<string, string> = {
    cyan: "bg-cyan-400",
    fuchsia: "bg-fuchsia-400",
    mixed: "bg-indigo-400",
  };

  const textColor: Record<string, string> = {
    cyan: "text-cyan-300/80",
    fuchsia: "text-fuchsia-300/80",
    mixed: "text-indigo-300/80",
  };

  const borderColor: Record<string, string> = {
    cyan: "border-cyan-400/20",
    fuchsia: "border-fuchsia-400/20",
    mixed: "border-indigo-400/20",
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${borderColor[variant]} bg-black/40`}>
      <span className="relative flex h-1.5 w-1.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${ringColor[variant]} opacity-75`} />
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColor[variant]}`} />
      </span>
      <span className={`text-[9px] font-mono font-bold tracking-[0.2em] ${textColor[variant]}`}>
        {status}
      </span>
    </div>
  );
};

/* ── Main Section (placeholder — cards in next commit) ── */
const CertificationsSection = () => {
  return (
    <section id="certifications" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <HeroGlobe />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          title="Certifications"
          tag="Credential Vault"
          subtitle="Industry-validated credentials authenticating expertise in cloud architecture, generative AI, and data science."
        />
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {certDetails.map((cert, index) => (
            <HudFrame key={index} scan variant={cert.variant} id={`CERT${index}`}>
              <div className="bg-black/40 backdrop-blur-xl border border-cyan-400/15 rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl border border-cyan-400/30 bg-white/[0.03] flex items-center justify-center text-2xl">
                    {cert.logo}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                    {cert.level && <div className="text-cyan-400 text-xs uppercase tracking-[0.15em] mb-1">{cert.level}</div>}
                    <div className="text-white/50 text-sm font-mono">{cert.issuer}</div>
                  </div>
                </div>
              </div>
            </HudFrame>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
