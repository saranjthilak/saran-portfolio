"use client";

import { useRef, useState, useEffect } from "react";
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

// ── Sticky project card ───────────────────────────────────────────────────────
interface StickyCardProps {
  project: (typeof FEATURED)[number];
  index: number;
  total: number;
}


const StickyCard = ({ project, index, total }: StickyCardProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [imgHovered, setImgHovered] = useState(false);
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0]);
  const yUp = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  const { scrollYProgress: imgScroll } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(imgScroll, [0, 1], ["-10%", "10%"]);

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

  const isLast = index === total - 1;

  return (
    <div ref={wrapRef} className="relative" style={{ height: isLast ? "auto" : "200vh" }}>
      <div className={isLast ? "" : "sticky top-20 md:top-24"}>
        <motion.div
          style={{ scale, opacity: cardOpacity, y: yUp }}
          initial={{ opacity: 0, y: 70, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div
            id={`project-${index}`}
            className="w-full rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/90 backdrop-blur-md overflow-hidden"
            style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.55)" }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between flex-wrap gap-3 px-6 sm:px-10 pt-6 sm:pt-8 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <span className="font-kanit font-black text-white leading-none tabular-nums" style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)" }}>
                  <CountUp to={index + 1} duration={0.7} />
                </span>
                <span className="font-kanit font-light uppercase tracking-widest text-white/40 text-xs">{project.source}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-kanit font-medium uppercase tracking-wide text-white" style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.3rem)" }}>
                  {project.title}
                </span>
                <ProjectLinks githubUrl={project.url} liveUrl={project.liveUrl} />
              </div>
            </div>

            {/* Body: image | details */}
            <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr]">

              {/* Image */}
              <div
                className="relative overflow-hidden aspect-[16/10] md:aspect-auto md:min-h-[380px] cursor-pointer"
                onMouseEnter={() => setImgHovered(true)}
                onMouseLeave={() => setImgHovered(false)}
                onMouseMove={onImageMouseMove}
              >
                <motion.img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover object-center scale-[1.12]"
                  style={{ y: imageY }}
                  animate={{ scale: imgHovered ? 1.18 : 1.12 }}
                  transition={{ duration: 0.65, ease: EASE }}
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: imgHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ background: `radial-gradient(circle 220px at ${shimmerPos.x}% ${shimmerPos.y}%, rgba(255,255,255,0.11), transparent 70%)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a]/80 pointer-events-none hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-widest text-white/30 select-none">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              {/* Details panel */}
              <div className="flex flex-col gap-5 px-6 sm:px-8 py-7 sm:py-8">
                {project.description && (
                  <p className="font-kanit font-light text-white/65 leading-relaxed text-sm sm:text-[0.95rem]">{project.description}</p>
                )}
                {project.skills && project.skills.length > 0 && (
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                  >
                    {project.skills.map((tag) => (
                      <motion.span
                        key={tag}
                        className="font-kanit text-[0.65rem] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/55 hover:border-[#00df8f]/50 hover:text-[#00df8f] hover:bg-[#00df8f]/5 transition-colors duration-200 cursor-default"
                        variants={{ hidden: { opacity: 0, scale: 0.7, y: 10 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: EASE } } }}
                        whileHover={{ scale: 1.08 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
                {caseStudy.length > 0 && (
                  <div className="flex flex-col gap-2.5 mt-auto">
                    {caseStudy.map((box, i) => (
                      <motion.div
                        key={box.label}
                        className="flex gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 hover:bg-white/[0.055] transition-colors duration-200"
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: 0.08 + i * 0.1, ease: EASE }}
                      >
                        <span className="font-kanit font-bold uppercase tracking-widest text-[10px] min-w-[60px] pt-0.5 shrink-0" style={{ color: box.color }}>
                          {box.label}
                        </span>
                        <span className="font-kanit text-white/65 leading-relaxed text-sm">{box.text}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30 border-t border-white/10"
      style={{ background: "#010101", boxShadow: "0 -10px 40px rgba(0,0,0,0.5)" }}
    >
      {/* ── Background Video ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover object-center pointer-events-none"
          style={{ opacity: 0.35 }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4"
        />
        <div className="absolute inset-0 bg-[#010101]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010101]/90 via-transparent to-[#010101]/90" />
      </div>

      <div className="relative z-10">
        {/* Heading */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8" style={{ paddingTop: "clamp(5rem, 9vw, 9rem)" }}>
          <BlueprintSectionHeader align="center">
            <div className="mb-16 text-center sm:mb-20">
              <motion.h2
                className="font-black leading-[0.92] tracking-tighter text-white text-center"
                style={{ fontSize: "clamp(2.6rem, 6.5vw, 4.8rem)" }}
                initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              >
                Selected <span className="accent-serif">Projects</span><span className="text-[#00df8f]">.</span>
              </motion.h2>
              <motion.div
                className="mx-auto mt-6 h-px"
                style={{ width: "min(200px, 40%)", background: "linear-gradient(90deg, transparent, rgba(94,210,156,0.8), transparent)" }}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
              />
            </div>
          </BlueprintSectionHeader>
        </div>

        {/* Sticky scroll cards */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6" style={{ paddingBottom: "clamp(6rem, 10vw, 10rem)" }}>
          {FEATURED.map((project, index) => (
            <StickyCard key={project.title} project={project} index={index} total={FEATURED.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

