import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface HudFrameProps {
  children: React.ReactNode;
  className?: string;
  scan?: boolean;
  variant?: "cyan" | "fuchsia" | "mixed";
  delay?: number;
}

const variants = {
  cyan: { tl: "border-cyan-400/70", tr: "border-cyan-400/70", bl: "border-cyan-400/70", br: "border-cyan-400/70" },
  fuchsia: { tl: "border-fuchsia-400/70", tr: "border-fuchsia-400/70", bl: "border-fuchsia-400/70", br: "border-fuchsia-400/70" },
  mixed: { tl: "border-cyan-400/70", tr: "border-fuchsia-400/70", bl: "border-fuchsia-400/70", br: "border-cyan-400/70" },
};

const HudFrame = ({ children, className, scan = false, variant = "mixed", delay = 0 }: HudFrameProps) => {
  const v = variants[variant];
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96, filter: "blur(8px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.3 } }}
      className={cn("relative", scan && "scanline overflow-hidden", className)}
    >
      <motion.div
        aria-hidden
        className={cn("pointer-events-none absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 z-10", v.tl)}
        animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className={cn("pointer-events-none absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 z-10", v.tr)}
        animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.div
        aria-hidden
        className={cn("pointer-events-none absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 z-10", v.bl)}
        animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
      <motion.div
        aria-hidden
        className={cn("pointer-events-none absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 z-10", v.br)}
        animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
      />
      {children}
    </motion.div>
  );
};

export default HudFrame;