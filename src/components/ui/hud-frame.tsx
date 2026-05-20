import { cn } from "@/lib/utils";

interface HudFrameProps {
  children: React.ReactNode;
  className?: string;
  scan?: boolean;
  variant?: "cyan" | "fuchsia" | "mixed";
}

const variants = {
  cyan: { tl: "border-cyan-400/70", tr: "border-cyan-400/70", bl: "border-cyan-400/70", br: "border-cyan-400/70" },
  fuchsia: { tl: "border-fuchsia-400/70", tr: "border-fuchsia-400/70", bl: "border-fuchsia-400/70", br: "border-fuchsia-400/70" },
  mixed: { tl: "border-cyan-400/70", tr: "border-fuchsia-400/70", bl: "border-fuchsia-400/70", br: "border-cyan-400/70" },
};

const HudFrame = ({ children, className, scan = false, variant = "mixed" }: HudFrameProps) => {
  const v = variants[variant];
  return (
    <div className={cn("relative", scan && "scanline overflow-hidden", className)}>
      <div className={cn("pointer-events-none absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 z-10", v.tl)} />
      <div className={cn("pointer-events-none absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 z-10", v.tr)} />
      <div className={cn("pointer-events-none absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 z-10", v.bl)} />
      <div className={cn("pointer-events-none absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 z-10", v.br)} />
      {children}
    </div>
  );
};

export default HudFrame;