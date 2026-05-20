interface SectionHeadingProps {
  title: string;
  tag?: string;
  subtitle?: string;
}

const SectionHeading = ({ title, tag = "SECTION", subtitle }: SectionHeadingProps) => {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 px-4 py-1.5 rounded-full border border-cyan-400/30 mb-5 backdrop-blur">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
        </span>
        <span className="text-cyan-200 text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase">// {tag}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-200 via-white to-fuchsia-300 bg-clip-text text-transparent neon-text mb-4 sm:mb-6">
        {title}
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 mx-auto rounded-full shadow-[0_0_20px_rgba(34,211,238,0.6)]"></div>
      {subtitle && (
        <p className="text-white/80 mt-4 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;