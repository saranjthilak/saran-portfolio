import type { ReactNode } from "react";

interface BlueprintSectionHeaderProps {
  index: string;
  label: string;
  children: ReactNode;
  align?: "left" | "center";
}

const BlueprintSectionHeader = ({ index, label, children, align = "left" }: BlueprintSectionHeaderProps) => (
  <div className={`blueprint-section-header ${align === "center" ? "text-center" : ""}`}>
    <div className="flex items-center justify-between gap-4 border-y border-accent/20 py-3">
      <span className="blueprint-label">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true">//</span>
        {label}
      </span>
      <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        System online
      </span>
    </div>
    <div className="pt-8 sm:pt-10">{children}</div>
  </div>
);

export default BlueprintSectionHeader;