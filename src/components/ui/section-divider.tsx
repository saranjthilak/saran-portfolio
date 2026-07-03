interface SectionDividerProps {
  variant?: "cyan" | "fuchsia" | "mixed";
  flip?: boolean;
}

const SectionDivider = (_props: SectionDividerProps) => {
  return (
    <div
      className="relative w-full h-px bg-border pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};

export default SectionDivider;