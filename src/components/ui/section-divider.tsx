import { motion, useReducedMotion } from "framer-motion";

interface SectionDividerProps {
  variant?: "cyan" | "fuchsia" | "mixed";
  flip?: boolean;
}

const palette = {
  cyan: { a: "hsl(189 94% 55%)", b: "hsl(217 91% 60%)" },
  fuchsia: { a: "hsl(292 84% 61%)", b: "hsl(330 81% 60%)" },
  mixed: { a: "hsl(189 94% 55%)", b: "hsl(292 84% 61%)" },
};

const SectionDivider = ({ variant = "mixed", flip = false }: SectionDividerProps) => {
  const reduce = useReducedMotion();
  const { a, b } = palette[variant];
  const gid = `sd-${variant}-${flip ? "f" : "n"}`;
  return (
    <div
      className="relative w-full h-16 sm:h-20 md:h-24 pointer-events-none select-none"
      aria-hidden="true"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <motion.svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
      >
        <defs>
          <linearGradient id={gid} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={a} stopOpacity="0" />
            <stop offset="50%" stopColor={a} stopOpacity="0.9" />
            <stop offset="100%" stopColor={b} stopOpacity="0" />
          </linearGradient>
          <filter id={`${gid}-glow`} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated draw line */}
        <motion.path
          d="M0,50 C200,20 400,80 600,50 C800,20 1000,80 1200,50"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="1.5"
          filter={`url(#${gid}-glow)`}
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Ticks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const x = (i + 0.5) * (1200 / 24);
          const h = i % 4 === 0 ? 10 : 5;
          return (
            <motion.line
              key={i}
              x1={x}
              x2={x}
              y1={50 - h / 2}
              y2={50 + h / 2}
              stroke={i % 4 === 0 ? a : b}
              strokeOpacity="0.55"
              strokeWidth="1"
              initial={reduce ? false : { opacity: 0, scaleY: 0 }}
              whileInView={reduce ? undefined : { opacity: 0.6, scaleY: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.02 }}
              style={{ transformOrigin: `${x}px 50px` }}
            />
          );
        })}
        {/* Center node */}
        <motion.circle
          cx="600"
          cy="50"
          r="3"
          fill={a}
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          whileInView={reduce ? undefined : { scale: [0, 1.6, 1], opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 1.2 }}
        />
        {/* Traveling pulse */}
        {!reduce && (
          <motion.circle
            r="2.5"
            fill={b}
            initial={{ cx: 0, cy: 50, opacity: 0 }}
            whileInView={{
              cx: [0, 600, 1200],
              cy: [50, 50, 50],
              opacity: [0, 1, 0],
            }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 2.4, delay: 0.6, ease: "easeInOut" }}
            style={{ filter: `drop-shadow(0 0 6px ${b})` }}
          />
        )}
      </motion.svg>
    </div>
  );
};

export default SectionDivider;