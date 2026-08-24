"use client";

interface LiveProjectButtonProps {
  href: string;
  className?: string;
}

const LiveProjectButton = ({ href, className = "" }: LiveProjectButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-block font-kanit font-medium uppercase tracking-widest rounded-full
        border-2 border-[#ffffff] text-[#ffffff]
        px-8 py-3 sm:px-10 sm:py-3.5
        text-sm sm:text-base
        transition-all duration-200 hover:bg-[#ffffff]/10 active:scale-95
        ${className}`}
    >
      Live Project
    </a>
  );
};

export default LiveProjectButton;
