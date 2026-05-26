import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const offsetFor = (d: Direction, dist: number) => {
  switch (d) {
    case "up":
      return { y: dist };
    case "down":
      return { y: -dist };
    case "left":
      return { x: dist };
    case "right":
      return { x: -dist };
    case "scale":
      return { scale: 0.92 };
    default:
      return {};
  }
};

const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 36,
  className,
  once = true,
  amount = 0.2,
}: RevealProps) => {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)", ...offsetFor(direction, distance) },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration, ease: [0.22, 1, 0.36, 1], delay },
    },
  };
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;