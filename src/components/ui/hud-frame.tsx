import { ReactNode } from "react";

type Variant = "cyan" | "fuchsia" | "mixed";

interface HudFrameProps {
  children: ReactNode;
  scan?: boolean;
  variant?: Variant;
  className?: string;
}

const colorMap: Record<Variant, { a: string; b: string; scan: string; glow: string }> = {
  cyan: {
    a: "border-cyan-400/60",
    b: "border-cyan-400/60",
    scan: "via-cyan-400/70",
    glow: "shadow-[0_0_12px_rgba(34,211,238,0.6)]",
  },
  fuchsia: {
    a: "border-fuchsia-400/60",
    b: "border-fuchsia-400/60",
    scan: "via-fuchsia-400/70",
    glow: "shadow-[0_0_12px_rgba(217,70,239,0.6)]",
  },
  mixed: {
    a: "border-cyan-400/60",
    b: "border-fuchsia-400/60",
    scan: "via-cyan-400/70",
    glow: "shadow-[0_0_12px_rgba(34,211,238,0.6)]",
  },
};

const HudFrame = ({ children, scan = false, variant = "mixed", className = "" }: HudFrameProps) => {
  const c = colorMap[variant];
  return (
    <div className={`relative ${className}`}>
      {children}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
        <div className={`absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 ${c.a}`} />
        <div className={`absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 ${c.b}`} />
        <div className={`absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 ${c.b}`} />
        <div className={`absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 ${c.a}`} />
        {scan && (
          <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${c.scan} to-transparent ${c.glow} animate-scan`} />
        )}
      </div>
    </div>
  );
};

export default HudFrame;