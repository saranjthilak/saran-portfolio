import { type ReactNode, useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface TextRevealProps {
  children: string;
  /** Split mode: "words" (default) or "letters" */
  mode?: "words" | "letters";
  /** Stagger delay between items in seconds */
  stagger?: number;
  /** Base animation duration per item */
  duration?: number;
  /** Additional delay before the animation starts */
  delay?: number;
  /** Extra className on the wrapper */
  className?: string;
  /** Element tag — defaults to "span" */
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p";
  /** If true, animates on mount. If false (default), animates when in view */
  animateOnMount?: boolean;
}

/**
 * Text split reveal animation — inspired by meesverberne.com.
 *
 * Splits text into words or letters, each in an overflow-hidden wrapper.
 * On scroll-into-view, items slide up from below with staggered timing.
 */
const TextReveal = ({
  children,
  mode = "words",
  stagger = 0.04,
  duration = 0.6,
  delay = 0,
  className = "",
  as: Tag = "span",
  animateOnMount = false,
}: TextRevealProps) => {
  const reduce = useReducedMotion();

  const items = useMemo(() => {
    if (mode === "letters") {
      return children.split("").map((char, i) => ({
        key: `${char}-${i}`,
        text: char === " " ? "\u00A0" : char,
      }));
    }
    // words mode — preserve spaces between words
    return children.split(" ").map((word, i) => ({
      key: `${word}-${i}`,
      text: word,
    }));
  }, [children, mode]);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: {
      y: "110%",
      rotate: 3,
      opacity: 0,
    },
    show: {
      y: "0%",
      rotate: 0,
      opacity: 1,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1], // power2.out equivalent
      },
    },
  };

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  const motionProps = animateOnMount
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-10%" } };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      {...motionProps}
    >
      {items.map((item_data, idx) => (
        <span
          key={item_data.key}
          className="inline-block overflow-hidden"
          style={{ lineHeight: 1.1 }}
        >
          <motion.span
            className="inline-block"
            variants={item}
            style={{ willChange: "transform" }}
          >
            {item_data.text}
          </motion.span>
          {/* Add space after each word (not after last) */}
          {mode === "words" && idx < items.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
