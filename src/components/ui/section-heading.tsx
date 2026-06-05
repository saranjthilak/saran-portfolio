import { motion, useReducedMotion, type Variants } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  tag?: string;
  subtitle?: string;
}

const SectionHeading = ({ title, tag = "SECTION", subtitle }: SectionHeadingProps) => {
  const reduce = useReducedMotion();
  const item: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
  };
  return (
    <motion.div
      className="text-center mb-12 sm:mb-16"
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.12 }}
    >
      <motion.div variants={item} className="inline-flex items-center space-x-2 glass px-4 py-1.5 rounded-full mb-5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="text-foreground/80 text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase font-mono">{tag}</span>
      </motion.div>
      <motion.h2 variants={item} className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gradient-primary neon-text mb-4 sm:mb-6">
        {title}
      </motion.h2>
      <motion.div
        variants={item}
        className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
      />
      {subtitle && (
        <motion.p variants={item} className="text-muted-foreground mt-5 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;