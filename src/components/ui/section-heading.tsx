import { useReducedMotion } from "framer-motion";
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

  return (
    <div className="mb-14 sm:mb-20">
      {/* Tag line + index */}
      <div className="flex items-center gap-4 mb-4">
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
      </div>

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

      {/* Gradient accent line */}
      <div className="mt-5 sm:mt-6 h-px w-24 bg-gradient-to-r from-primary via-primary/60 to-transparent" />

      {/* Subtitle */}
      {subtitle && (
        <p className="text-muted-foreground mt-5 text-base sm:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;