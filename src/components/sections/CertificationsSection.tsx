
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

/* ── Main Section (basic — will be enhanced in next commits) ── */
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
