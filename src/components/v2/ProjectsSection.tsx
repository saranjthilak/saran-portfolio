"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectLinks from "./LiveProjectButton";
import BlueprintSectionHeader from "./BlueprintSectionHeader";

const FEATURED = projects.filter((p) => p.featured);
const EASE = [0.16, 1, 0.3, 1] as const;

// ── Animated number counter ──────────────────────────────────────────────────
function CountUp({ to, duration = 0.8 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current)
          ref.current.textContent = String(Math.round(v)).padStart(2, "0");
      },
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} aria-label={String(to).padStart(2, "0")}>
      00
    </span>
  );
}

// ── 3-D tilt card ────────────────────────────────────────────────────────────
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

function TiltCard({ children, className = "", id, ariaLabel }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 10;
    const y = -((e.clientY - top) / height - 0.5) * 10;
    setTilt({ x, y });
  }, []);

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <motion.div
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      className={`relative ${className}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      animate={{
        rotateX: tilt.y,
        rotateY: tilt.x,
        scale: hovered ? 1.008 : 1,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      {/* Glow border that brightens on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: hovered
            ? "0 0 0 1.5px rgba(99,102,241,0.6), 0 0 40px rgba(99,102,241,0.15)"
            : "0 0 0 1px rgba(255,255,255,0.08)",
        }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
}

// ── Single project card ──────────────────────────────────────────────────────
interface ProjectCardProps {
  project: (typeof FEATURED)[number];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgHovered, setImgHovered] = useState(false);
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0.6]);

  const slideFrom = index % 2 === 0 ? -56 : 56;

  const caseStudy = [
    { label: "Problem", text: project.problem, color: "#00df8f" },
    { label: "Approach", text: project.approach, color: "#38bdf8" },
    { label: "Result", text: project.result, color: "#f59e0b" },
  ].filter((b) => b.text);

  const onImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setShimmerPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity: cardOpacity }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: EASE }}
    >
      <TiltCard
        id={`project-${index}`}
        ariaLabel={project.title}
        className="blueprint-cell w-full rounded-2xl p-5 sm:p-8 md:p-10 flex flex-col gap-6 overflow-hidden"
      >

        {/* ── Top row ── */}
        <motion.div
          className="flex items-center justify-between flex-wrap gap-3"
          initial={{ opacity: 0, x: slideFrom }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex items-center gap-4">
            <span
              className="font-kanit font-black text-white leading-none tabular-nums"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}
            >
              <CountUp to={index + 1} duration={0.7} />
            </span>
            <span
              className="font-kanit font-light uppercase tracking-widest text-white/40"
              style={{ fontSize: "clamp(0.7rem, 1vw, 0.9rem)" }}
            >
              {project.source}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="font-kanit font-medium uppercase tracking-wide text-white"
              style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
            >
              {project.title}
            </span>
            <ProjectLinks githubUrl={project.url} liveUrl={project.liveUrl} />
          </div>
        </motion.div>

        {/* ── Tech tags — staggered pop-in chips ── */}
        {project.skills && project.skills.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
            }}
          >
            {project.skills.map((tag) => (
              <motion.span
                key={tag}
                className="font-kanit text-[0.7rem] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 bg-white/[0.05] text-white/55 hover:border-accent/50 hover:text-accent hover:bg-accent/5 transition-colors duration-200 cursor-default"
                variants={{
                  hidden: { opacity: 0, scale: 0.7, y: 10 },
                  visible: {
                    opacity: 1, scale: 1, y: 0,
                    transition: { duration: 0.38, ease: EASE },
                  },
                }}
                whileHover={{ scale: 1.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* ── Case study strip ── */}
        {caseStudy.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {caseStudy.map((box, i) => (
              <motion.div
                key={box.label}
                className="flex flex-col gap-1.5 bg-white/[0.04] border border-white/[0.07] rounded-2xl px-4 py-3.5"
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease: EASE }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                <span
                  className="font-kanit font-bold uppercase tracking-widest text-xs sm:text-sm"
                  style={{ color: box.color }}
                >
                  {box.label}
                </span>
                <span className="font-kanit text-white/70 leading-relaxed text-sm sm:text-[0.95rem]">
                  {box.text}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Hero image — curtain reveal + parallax + cursor shimmer ── */}
        <motion.div
          className="rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden aspect-[16/9] relative cursor-pointer"
          initial={{ clipPath: "inset(14% 8% 14% 8% round 40px)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 40px)", opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.25, ease: EASE }}
          onMouseEnter={() => setImgHovered(true)}
          onMouseLeave={() => setImgHovered(false)}
          onMouseMove={onImageMouseMove}
        >
          <motion.img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-center scale-[1.14]"
            style={{ y: imageY }}
            animate={{ scale: imgHovered ? 1.19 : 1.14 }}
            transition={{ duration: 0.6, ease: EASE }}
            loading="lazy"
          />

          {/* Cursor-following spotlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: imgHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `radial-gradient(circle 200px at ${shimmerPos.x}% ${shimmerPos.y}%, rgba(255,255,255,0.10), transparent 70%)`,
            }}
          />

          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </TiltCard>
    </motion.div>
  );
};

// ── Section ──────────────────────────────────────────────────────────────────
const HEADING_WORDS = ["Selected", "projects"];

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="blueprint-section font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30 border-t border-accent/20"
      style={{
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem clamp(6rem, 10vw, 10rem)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <BlueprintSectionHeader align="center">
          <div className="mb-16 text-center sm:mb-20">
            {/* Word-by-word stagger heading */}
            <motion.h2
              className="hero-heading font-black uppercase leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
            >
              {HEADING_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  className={`inline-block mr-[0.25em] ${i === 1 ? "accent-serif" : ""}`}
                  variants={{
                    hidden: { opacity: 0, y: 40, skewY: 4 },
                    visible: {
                      opacity: 1, y: 0, skewY: 0,
                      transition: { duration: 0.65, ease: EASE },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            {/* Animated underline */}
            <motion.div
              className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
              style={{ width: "min(200px, 40%)" }}
            />
          </div>
        </BlueprintSectionHeader>

        {/* Cards */}
        <div className="relative flex flex-col gap-10 sm:gap-14">
          {FEATURED.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

