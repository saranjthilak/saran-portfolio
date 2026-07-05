import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Orange accent token — matches --primary in index.css
const BRACKET_COLOR = "rgba(249, 115, 22, 0.95)";

const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Each bracket follows with a slight lag for a precision feel
  const tlX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.5 });
  const tlY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.5 });
  const brX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.5 });
  const brY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.5 });

  // Center dot is fast/snappy
  const dotX = useSpring(x, { stiffness: 800, damping: 32, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 800, damping: 32, mass: 0.2 });

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const enabledRef = useRef(true);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches;
    if (isTouch) {
      enabledRef.current = false;
      return;
    }

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]'
      );
      setHovering(interactive);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    document.documentElement.classList.add("cursor-none-root");
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("cursor-none-root");
    };
  }, [x, y, visible]);

  if (!enabledRef.current) return null;

  // Brackets frame the cursor point; on hover they snap tighter
  const offset = hovering ? 10 : 14;
  const arm = hovering ? 7 : 10;

  return (
    <>
      {/* Top-left L bracket */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x: tlX,
          y: tlY,
          translateX: `-${offset}px`,
          translateY: `-${offset}px`,
          opacity: visible ? 1 : 0,
        }}
        animate={{ scale: clicking ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <span
          style={{
            display: "block",
            width: arm,
            height: arm,
            borderTop: `1.5px solid ${BRACKET_COLOR}`,
            borderLeft: `1.5px solid ${BRACKET_COLOR}`,
          }}
        />
      </motion.div>

      {/* Bottom-right L bracket */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x: brX,
          y: brY,
          translateX: `${offset}px`,
          translateY: `${offset}px`,
          opacity: visible ? 1 : 0,
        }}
        animate={{ scale: clicking ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <span
          style={{
            display: "block",
            width: arm,
            height: arm,
            borderBottom: `1.5px solid ${BRACKET_COLOR}`,
            borderRight: `1.5px solid ${BRACKET_COLOR}`,
          }}
        />
      </motion.div>

      {/* Center dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <span
          style={{
            display: "block",
            width: 3,
            height: 3,
            borderRadius: 9999,
            background: BRACKET_COLOR,
            boxShadow: "0 0 6px rgba(249, 115, 22, 0.6)",
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
