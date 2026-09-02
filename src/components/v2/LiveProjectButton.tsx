"use client";

import { Github, ExternalLink, PlayCircle } from "lucide-react";

interface ProjectLinksProps {
  githubUrl: string;
  /** Legacy hosted-app link — renders an ExternalLink icon button if provided */
  liveUrl?: string;
  /** YouTube / Loom / any demo URL — renders a "Watch Demo" pill if provided */
  demoUrl?: string;
  className?: string;
}

const ProjectLinks = ({
  githubUrl,
  liveUrl,
  demoUrl,
  className = "",
}: ProjectLinksProps) => {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {/* Always-present: GitHub "View Code" */}
      <a
        href={githubUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 font-kanit font-medium uppercase tracking-widest rounded-full
          border-2 border-[#ffffff] text-[#ffffff]
          px-6 py-2.5 sm:px-8 sm:py-3
          text-sm sm:text-base
          transition-all duration-200 hover:bg-[#ffffff]/10 active:scale-95"
      >
        <Github className="w-4 h-4" />
        View Code
      </a>

      {/* Optional: Watch Demo pill */}
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-kanit font-medium uppercase tracking-widest rounded-full
            border-2 border-[#00df8f] text-[#00df8f]
            px-6 py-2.5 sm:px-8 sm:py-3
            text-sm sm:text-base
            transition-all duration-200 hover:bg-[#00df8f]/10 active:scale-95"
        >
          <PlayCircle className="w-4 h-4" />
          Watch Demo
        </a>
      )}

      {/* Optional: Live app icon button (legacy liveUrl) */}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open live app"
          className="inline-flex items-center justify-center w-11 h-11 rounded-full
            border-2 border-[#ffffff]/40 text-[#ffffff]/60
            transition-all duration-200 hover:border-[#ffffff] hover:text-[#ffffff] hover:bg-[#ffffff]/10 active:scale-95"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
};

export default ProjectLinks;
