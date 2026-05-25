const HudFrame = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-cyan-400/60" />
      <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-fuchsia-400/60" />
      <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-fuchsia-400/60" />
      <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-cyan-400/60" />
      {/* Scan line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.6)] animate-scan" />
    </div>
  );
};

export default HudFrame;