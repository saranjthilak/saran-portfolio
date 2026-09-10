import type { ReactNode } from "react";

interface BlueprintSectionHeaderProps {
  children: ReactNode;
  align?: "left" | "center";
}

const BlueprintSectionHeader = ({ children, align = "left" }: BlueprintSectionHeaderProps) => (
  <div className={`blueprint-section-header ${align === "center" ? "text-center" : ""}`}>
    <div className="pt-8 sm:pt-10">{children}</div>
  </div>
);

export default BlueprintSectionHeader;