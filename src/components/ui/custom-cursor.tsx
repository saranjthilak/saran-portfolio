import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 180, damping: 20, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 20, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 600, damping: 30, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 600, damping: 30, mass: 0.3 });

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

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-screen"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          borderColor: hovering
            ? "rgba(217,70,239,0.9)"
            : "rgba(34,211,238,0.8)",
          boxShadow: hovering
            ? "0 0 30px rgba(217,70,239,0.6), inset 0 0 12px rgba(34,211,238,0.4)"
            : "0 0 18px rgba(34,211,238,0.55)",
          scale: clicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="w-full h-full rounded-full border-[1.5px] border-inherit" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] w-1.5 h-1.5 rounded-full bg-white mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          boxShadow: "0 0 8px rgba(255,255,255,0.9)",
        }}
      />
    </>
  );
};

export default CustomCursor;