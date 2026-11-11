"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/portfolio";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { Award, BadgeCheck, ExternalLink } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Issuer metadata ─────────────────────────────────────────────────────── */
const ISSUER_META: Record<string, { color: string; bg: string; short: string; url: string }> = {
  "Amazon Web Services": {
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    short: "AWS",
    url: "https://aws.amazon.com/certification/",
  },
  "Oracle": {
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    short: "OCI",
    url: "https://education.oracle.com/",
  },
  "DeepLearning.AI / LangChain": {
    color: "text-teal-400",
    bg: "bg-teal-500/10 border-teal-500/20",
    short: "DL.AI",
    url: "https://www.deeplearning.ai/",
  },
  "HashiCorp": {
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    short: "HCP",
    url: "https://developer.hashicorp.com/certifications",
  },
  "UC Davis": {
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    short: "UCD",
    url: "https://www.coursera.org/uc-davis",
  },
};

/* ── Metric pill ─────────────────────────────────────────────────────────── */
const MetricPill = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
    <span className="text-3xl font-black tracking-tighter text-white">{value}</span>
    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">{label}</span>
  </div>
);

/* ── Cert card ───────────────────────────────────────────────────────────── */
const CertCard = ({
  cert,
  idx,
}: {
  cert: (typeof certifications)[0];
  idx: number;
}) => {
  const meta = ISSUER_META[cert.issuer] ?? {
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    short: cert.issuer.slice(0, 3).toUpperCase(),
    url: "#",
  };

  return (
    <motion.div
      className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-green-500/30 hover:bg-white/[0.045] hover:shadow-[0_0_60px_rgba(0,232,56,0.06)]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.08 + idx * 0.07, ease: EASE }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,232,56,0.05) 0%, transparent 100%)" }}
      />

      {/* Top row: issuer badge + verified icon */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-mono uppercase tracking-widest font-semibold ${meta.bg} ${meta.color}`}>
            {meta.short}
          </span>
          {cert.level && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-widest text-white/45">
              {cert.level}
            </span>
          )}
        </div>
        <div className="shrink-0 w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:border-green-500/40 group-hover:bg-green-500/10">
          <BadgeCheck className="w-4 h-4 text-white/30 group-hover:text-green-400 transition-colors duration-300" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base md:text-lg font-bold text-white leading-snug group-hover:text-green-400 transition-colors duration-300">
        {cert.title}
      </h3>

      {/* Divider */}
      <div className="w-full h-px bg-white/8" />

      {/* Footer: issuer name + verify link */}
      <div className="flex items-center justify-between gap-3 mt-auto">
        <span className={`text-xs font-mono font-semibold uppercase tracking-wider ${meta.color} opacity-70`}>
          {cert.issuer}
        </span>
        <a
          href={meta.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-[11px] font-mono text-white/30 hover:text-white/70 transition-colors duration-200"
        >
          Verify
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
};

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative font-kanit rounded-t-section -mt-10 sm:-mt-12 md:-mt-14 z-40 overflow-hidden border-t border-white/10 min-h-screen flex flex-col justify-center bg-black"
      style={{ boxShadow: "0 -10px 40px rgba(0,0,0,0.6)" }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "70% center", opacity: 0.35 }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

        {/* Orbs */}
        <div className="absolute top-[10%] right-[8%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,232,56,0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[8%] left-[5%] w-[320px] h-[320px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,232,56,0.04) 0%, transparent 70%)" }} />

        {/* Animated scanning line */}
        <motion.div
          className="absolute left-0 w-full h-px opacity-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,232,56,0.8), transparent)" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        />

        {/* Vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 35%, rgba(0,0,0,0.6) 100%)" }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-20 md:pt-24 my-auto">

        {/* Eyebrow */}
        <FadeIn delay={0} y={20}>
          <p className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-white/50 text-xs mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
            Credentials
          </p>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.08} y={30}>
          <SectionHeading
            prefix="Credentials that "
            accentWord="check out"
            gradient="certifications"
            align="left"
            className="mb-4"
          />
        </FadeIn>

        {/* Subtitle + metrics */}
        <FadeIn delay={0.16} y={16}>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-end gap-6 mb-14 sm:mb-18 md:mb-20">
            <p className="text-white/50 max-w-xl font-kanit font-light text-base sm:text-lg flex-1">
              Cloud, GenAI, and data certifications from AWS, Oracle, HashiCorp, DeepLearning.AI, and UC Davis — all verifiable.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <MetricPill value={`${certifications.length}`} label="Certifications" />
              <MetricPill value="5+" label="Issuers" />
              <MetricPill value="2024–25" label="Active" />
            </div>
          </div>
        </FadeIn>

        {/* ── Cert grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, idx) => (
            <CertCard key={idx} cert={cert} idx={idx} />
          ))}
        </div>

        {/* Footer CTA */}
        <FadeIn delay={0.5} y={16}>
          <div className="mt-10 flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/saranjthilak/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 text-white/60 text-sm font-medium hover:border-green-500/40 hover:text-white hover:bg-white/8 transition-all duration-300"
            >
              <Award className="w-4 h-4" />
              View all on LinkedIn
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
