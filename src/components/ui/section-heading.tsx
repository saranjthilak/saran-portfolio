import { motion, useReducedMotion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";

interface SectionHeadingProps {
  title: string;
  tag?: string;
  subtitle?: string;
  /** Section index number, e.g. "02" */
  index?: string;
}

/**
 * Redesigned section heading — large left-aligned display type with
 * masked word-reveal animation. Inspired by meesverberne.com.
 */
const SectionHeading = ({ title, tag = "SECTION", subtitle, index }: SectionHeadingProps) => {
  const reduce = useReducedMotion();

  const viewportConfig = { once: true, margin: "-10%" as const };
  const easeOut = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="mb-14 sm:mb-20">
      {/* Tag line + index — slides in from the left */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportConfig}
        transition={{ duration: 0.6, ease: easeOut }}
        className="flex items-center gap-4 mb-4"
      >
        {index && (
          <span className="font-mono text-sm text-primary/50 tracking-[0.2em]">
            {index}
          </span>
        )}
        <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-muted-foreground">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          {tag}
        </span>
        <span className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      </motion.div>

      {/* Large heading with text reveal */}
      <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[0.9]">
        <TextReveal
          stagger={0.06}
          duration={0.7}
          className="gap-x-[0.25em]"
        >
          {title}
        </TextReveal>
      </h2>

      {/* Gradient accent line — scales in from the left */}
      <motion.div
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={viewportConfig}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
        className="mt-5 sm:mt-6 h-px w-24 bg-gradient-to-r from-primary via-primary/60 to-transparent origin-left"
      />

      {/* Subtitle — fades + slides up */}
      {subtitle && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.4 }}
          className="text-muted-foreground mt-5 text-base sm:text-lg max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;