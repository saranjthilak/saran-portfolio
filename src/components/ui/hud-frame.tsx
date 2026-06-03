import { ReactNode } from "react";

type Variant = "cyan" | "fuchsia" | "mixed";

interface HudFrameProps {
  children: ReactNode;
  scan?: boolean;
  variant?: Variant;
  className?: string;
  readout?: string;
  id?: string;
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

const HudFrame = ({ children, scan = false, variant = "mixed", className = "", readout, id }: HudFrameProps) => {
  const c = colorMap[variant];
  const textColor = variant === "fuchsia" ? "text-fuchsia-300/70" : "text-cyan-300/70";
  const stamp = id ?? Math.random().toString(36).slice(2, 6).toUpperCase();
  return (
    <div className={`relative ${className}`}>
      {children}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
        <div className={`absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 ${c.a}`} />
        <div className={`absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 ${c.b}`} />
        <div className={`absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 ${c.b}`} />
        <div className={`absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 ${c.a}`} />
        <div className={`absolute top-2.5 left-12 font-mono text-[8px] tracking-[0.2em] ${textColor} uppercase`}>
          ID·{stamp}
        </div>
        <div className={`absolute top-2.5 right-12 font-mono text-[8px] tracking-[0.2em] ${textColor} uppercase`}>
          {readout ?? "REC●"}
        </div>
        <div className={`absolute bottom-2.5 left-12 font-mono text-[8px] tracking-[0.2em] ${textColor} uppercase opacity-80`}>
          CH·01
        </div>
        <div className={`absolute bottom-2.5 right-12 font-mono text-[8px] tracking-[0.2em] ${textColor} uppercase opacity-80`}>
          SIG 98%
        </div>
        {scan && (
          <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${c.scan} to-transparent ${c.glow} animate-scan`} />
        )}
      </div>
    </div>
  );
};

export default HudFrame;