"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useCallback } from "react";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { Quote, Linkedin, Star, Cpu } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Testimonial data ────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "Fabian Menden",
    role: "Head of Product",
    company: "Vanilla Steel",
    avatar: "/images/testimonials/fabian.jpg",
    initials: "FM",
    accent: "rgba(99,255,180,1)",
    accentDim: "rgba(99,255,180,0.07)",
    accentBorder: "rgba(99,255,180,0.2)",
    linkedin: "https://www.linkedin.com/in/saranjayathilak/details/recommendations/",
    stars: 5,
    quote:
      "Saran delivered a production-ready RAG pipeline that cut our support ticket load by 25% within two months of deployment. His ability to translate ambiguous product requirements into clean, testable ML architecture is rare — he thinks in systems, not just models.",
    nodeId: "PEER-0xFM01",
  },
  {
    name: "Dr. Meera Krishnan",
    role: "Senior Data Architect",
    company: "Oracle",
    avatar: "/images/testimonials/meera.jpg",
    initials: "MK",
    accent: "rgba(99,180,255,1)",
    accentDim: "rgba(99,180,255,0.07)",
    accentBorder: "rgba(99,180,255,0.2)",
    linkedin: "https://www.linkedin.com/in/saranjayathilak/details/recommendations/",
    stars: 5,
    quote:
      "One of the sharpest data engineers I've worked with. Saran's Airflow pipelines ran at 99.9% uptime over six months without a single manual intervention. He writes infrastructure as if reliability is non-negotiable — because for him, it is.",
    nodeId: "PEER-0xMK02",
  },
  {
    name: "Lucas Brandt",
    role: "ML Engineering Lead",
    company: "Berlin AI Studio",
    avatar: "/images/testimonials/lucas.jpg",
    initials: "LB",
    accent: "rgba(167,139,250,1)",
    accentDim: "rgba(167,139,250,0.07)",
    accentBorder: "rgba(167,139,250,0.2)",
    linkedin: "https://www.linkedin.com/in/saranjayathilak/details/recommendations/",
    stars: 5,
    quote:
      "Saran joined us mid-sprint on a computer vision pipeline and had it shipping in two weeks. His CLIP + FAISS implementation outperformed our previous keyword approach by 30% on match accuracy. Beyond the technical output, he communicates tradeoffs clearly — which is rare.",
    nodeId: "PEER-0xLB03",
  },
];

/* ── Star row ────────────────────────────────────────────────────────────── */
const Stars = ({ count, accent }: { count: number; accent: string }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-3 h-3 fill-current" style={{ color: accent }} />
    ))}
  </div>
);

/* ── 3D tilt testimonial card ────────────────────────────────────────────── */
const TestimonialCard = ({
  t,
  idx,
}: {
  t: (typeof TESTIMONIALS)[0];
  idx: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 20 });
  const sy = useSpring(my, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-4, 4]);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my]
  );
  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: 0.08 + idx * 0.12, ease: EASE }}
      whileHover={{ scale: 1.012 }}
    >
      {/* Border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-30"
        style={{ border: `1px solid ${t.accentBorder}`, borderRadius: "inherit" }}
      />

      {/* Glass body */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: "rgba(6,10,16,0.84)", backdropFilter: "blur(20px)" }}
      />

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)` }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${t.accentDim} 0%, transparent 100%)`,
        }}
      />

      {/* Corner brackets */}
      {(["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r",
        "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"] as const).map((cls, i) => (
        <div key={i} className={`absolute w-4 h-4 opacity-40 pointer-events-none ${cls}`}
          style={{ borderColor: t.accent }} />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-5 p-6 md:p-7">

        {/* Top row: node ID + LinkedIn */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-[0.2em] opacity-25 text-white">{t.nodeId}</span>
          <a
            href={t.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-mono opacity-30 hover:opacity-80 transition-opacity duration-200 text-white"
          >
            <Linkedin className="w-3 h-3" />
            LinkedIn
          </a>
        </div>

        {/* Stars */}
        <Stars count={t.stars} accent={t.accent} />

        {/* Quote */}
        <div className="relative pl-5">
          <Quote
            className="absolute left-0 top-0.5 w-3.5 h-3.5 opacity-30"
            style={{ color: t.accent }}
          />
          <p className="text-sm leading-relaxed text-white/60 font-light italic">
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>

        {/* Separator */}
        <div
          className="w-full h-px"
          style={{
            background: `linear-gradient(90deg, ${t.accentBorder}, transparent)`,
          }}
        />

        {/* Author row */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0 overflow-hidden"
            style={{ borderColor: t.accentBorder, background: t.accentDim }}
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to initials if image 404s
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const next = e.currentTarget.nextElementSibling as HTMLElement;
                if (next) next.style.display = "flex";
              }}
            />
            <span
              className="hidden w-full h-full items-center justify-center font-mono text-xs font-bold"
              style={{ color: t.accent }}
            >
              {t.initials}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold text-white leading-tight">{t.name}</span>
            <span className="text-[11px] font-mono text-white/40">
              {t.role} · <span style={{ color: t.accent, opacity: 0.8 }}>{t.company}</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative font-kanit overflow-hidden rounded-t-section -mt-10 sm:-mt-12 md:-mt-14 z-[36] min-h-[70vh] flex flex-col justify-center"
      style={{
        background: "hsl(240, 10%, 4%)",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,255,180,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,255,180,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Orbs */}
        <div
          className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,255,180,0.05) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[8%] right-[6%] w-[350px] h-[350px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,180,255,0.05) 0%, transparent 70%)" }}
        />

        {/* Scan line */}
        <motion.div
          className="absolute left-0 w-full h-[1px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(99,255,180,0.4), transparent)",
          }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 30%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">

        {/* Eyebrow */}
        <FadeIn delay={0} y={20}>
          <div className="flex items-center gap-3 mb-5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 opacity-70" />
            <p className="font-mono uppercase tracking-[0.25em] text-white/40 text-[11px]">
              Social Proof
            </p>
            <div className="flex-1 h-px bg-white/8 max-w-[80px]" />
            <span className="font-mono text-[10px] text-emerald-400/60 tracking-widest">
              PEER::VERIFIED
            </span>
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.08} y={30}>
          <SectionHeading
            prefix="Endorsed by "
            accentWord="teammates"
            gradient="research"
            align="left"
            className="mb-4"
            fontSize="clamp(1.75rem, 3.8vw, 3.25rem)"
          />
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.16} y={16}>
          <p className="mt-4 sm:mt-6 text-white/45 max-w-xl font-kanit font-light text-base sm:text-lg mb-14 md:mb-20">
            What engineers and leaders say after shipping together.
          </p>
        </FadeIn>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, idx) => (
            <TestimonialCard key={t.nodeId} t={t} idx={idx} />
          ))}
        </div>

        {/* Footer CTA */}
        <FadeIn delay={0.5} y={16}>
          <div className="mt-10">
            <a
              href="https://www.linkedin.com/in/saranjayathilak/details/recommendations/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/50 text-sm font-mono hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-300"
            >
              <Linkedin className="w-4 h-4" />
              linkedin --recommendations=saranjayathilak
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
