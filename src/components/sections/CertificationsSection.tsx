
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useMemo, useState } from "react";
import { certifications } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";
import HudFrame from "@/components/ui/hud-frame";


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
  signalStrength: number; // 0-100
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

/* ── Certification Card ── */
const CertificationCard = ({ cert, index }: { cert: CertDetail; index: number }) => {
  const reduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const accentColor: Record<string, string> = {
    cyan: "text-cyan-400",
    fuchsia: "text-fuchsia-400",
    mixed: "text-indigo-400",
  };

  const borderBase: Record<string, string> = {
    cyan: "border-cyan-400/15",
    fuchsia: "border-fuchsia-400/15",
    mixed: "border-indigo-400/15",
  };

  const borderHover: Record<string, string> = {
    cyan: "hover:border-cyan-400/40",
    fuchsia: "hover:border-fuchsia-400/40",
    mixed: "hover:border-indigo-400/40",
  };

  const glowHover: Record<string, string> = {
    cyan: "hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]",
    fuchsia: "hover:shadow-[0_0_40px_rgba(217,70,239,0.08)]",
    mixed: "hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]",
  };

  const iconGradient: Record<string, string> = {
    cyan: "from-cyan-500/20 via-blue-500/15 to-indigo-500/20",
    fuchsia: "from-fuchsia-500/20 via-pink-500/15 to-rose-500/20",
    mixed: "from-cyan-500/15 via-indigo-500/20 to-fuchsia-500/15",
  };

  const iconBorder: Record<string, string> = {
    cyan: "border-cyan-400/30",
    fuchsia: "border-fuchsia-400/30",
    mixed: "border-indigo-400/30",
  };

  const iconGlow: Record<string, string> = {
    cyan: "shadow-[0_0_20px_rgba(34,211,238,0.3)]",
    fuchsia: "shadow-[0_0_20px_rgba(217,70,239,0.3)]",
    mixed: "shadow-[0_0_20px_rgba(99,102,241,0.3)]",
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HudFrame scan variant={cert.variant} id={`CERT${index}`} readout={cert.status === "ACTIVE" ? "LIVE●" : "VER●"}>
        <div
          className={`relative bg-black/40 backdrop-blur-xl border ${borderBase[cert.variant]} rounded-2xl p-6 sm:p-8 ${borderHover[cert.variant]} ${glowHover[cert.variant]} transition-all duration-500 group overflow-hidden min-h-[220px] flex flex-col`}
        >
          {/* Scan beam */}
          {isHovered && <ScanBeam variant={cert.variant} />}

          {/* Hex fingerprint watermark */}
          <HexFingerprint variant={cert.variant} />

          {/* Content */}
          <div className="relative z-10 flex flex-col flex-1">
            {/* Top row: Category + Status */}
            <div className="flex items-center justify-between mb-5">
              <span className={`text-[9px] font-mono tracking-[0.25em] uppercase ${accentColor[cert.variant]} opacity-70`}>
                {cert.category}
              </span>
              <StatusBadge status={cert.status} variant={cert.variant} />
            </div>

            {/* Icon + Title block */}
            <div className="flex items-start gap-4 sm:gap-5 mb-4 flex-1">
              {/* Holographic icon */}
              <motion.div
                className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl border ${iconBorder[cert.variant]} bg-gradient-to-br ${iconGradient[cert.variant]} flex items-center justify-center text-2xl sm:text-3xl ${iconGlow[cert.variant]} group-hover:scale-110 transition-all duration-500`}
                animate={
                  isHovered
                    ? {
                        boxShadow: [
                          "0 0 20px rgba(34,211,238,0.3)",
                          "0 0 30px rgba(34,211,238,0.5)",
                          "0 0 20px rgba(34,211,238,0.3)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                {cert.logo}
              </motion.div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300 tracking-wide leading-tight">
                  {cert.title}
                </h3>
                {cert.level && (
                  <div className={`text-xs font-semibold ${accentColor[cert.variant]} mb-1 uppercase tracking-[0.15em]`}>
                    {cert.level}
                  </div>
                )}
                <div className="text-white/50 text-xs sm:text-sm font-mono">
                  {cert.issuer}
                </div>
              </div>
            </div>

            {/* Bottom metadata row */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-3" />

            <div className="flex items-center justify-between">
              {/* Credential ID */}
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span className="text-[10px] font-mono text-white/35 tracking-wider">
                  {cert.credentialId}
                </span>
              </div>

              {/* Year */}
              <div className={`text-[10px] font-mono tracking-wider ${accentColor[cert.variant]} opacity-60`}>
                {cert.year}
              </div>

              {/* Signal strength */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-white/30 tracking-wider">SIG</span>
                <SignalBars strength={cert.signalStrength} variant={cert.variant} />
              </div>
            </div>
          </div>
        </div>
      </HudFrame>
    </motion.div>
  );
};

/* ── Ambient grid particles ── */
const GridParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${3 + Math.random() * 3}s`,
        size: Math.random() > 0.5 ? 2 : 1.5,
        isCross: Math.random() > 0.7,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) =>
        p.isCross ? (
          <svg
            key={p.id}
            width="8"
            height="8"
            viewBox="0 0 8 8"
            className="absolute text-fuchsia-400/15 animate-pulse"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          >
            <line x1="0" y1="4" x2="8" y2="4" stroke="currentColor" strokeWidth="0.5" />
            <line x1="4" y1="0" x2="4" y2="8" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        ) : (
          <div
            key={p.id}
            className="absolute rounded-full bg-cyan-400/15 animate-pulse"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        )
      )}
    </div>
  );
};

/* ── Main Section ── */
const CertificationsSection = () => {
  return (
    <section id="certifications" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden">

      {/* Ambient particles */}
      <GridParticles />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          title="Certifications"
          tag="Credential Vault"
          subtitle="Industry-validated credentials authenticating expertise in cloud architecture, generative AI, and data science."
        />

        {/* Certification grid */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {certDetails.map((cert, index) => (
            <CertificationCard key={index} cert={cert} index={index} />
          ))}
        </div>

        {/* Footer terminal readout */}
        <motion.div
          className="flex items-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/20 to-transparent" />
          <div className="flex items-center gap-3 px-5 py-2.5 border border-white/10 rounded-full bg-black/30 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-white/50 tracking-[0.2em] uppercase">
              {certDetails.length} Credentials Authenticated
            </span>
            <span className="text-[10px] font-mono text-emerald-400/60 tracking-wider">
              · ALL VERIFIED
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-fuchsia-400/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
