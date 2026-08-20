"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

const Magnet = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: MagnetProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    ref.current.style.transition = activeTransition;
    ref.current.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transition = inactiveTransition;
    ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  // Expanded hit area via negative margin + positive padding trick
  const wrapStyle: CSSProperties = {
    display: "inline-block",
    willChange: "transform",
    padding: `${padding}px`,
    margin: `-${padding}px`,
  };

  return (
    <div
      style={wrapStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <div ref={ref} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
};

export default Magnet;
