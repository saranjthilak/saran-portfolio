"use client";

import { Github, ExternalLink } from "lucide-react";

interface ProjectLinksProps {
  githubUrl: string;
  liveUrl?: string;
  className?: string;
}

const ProjectLinks = ({ githubUrl, liveUrl, className = "" }: ProjectLinksProps) => {
  if (liveUrl) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {/* Primary: Live Demo */}
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-kanit font-medium uppercase tracking-widest rounded-full
            border-2 border-[#ffffff] text-[#ffffff]
            px-8 py-3 sm:px-10 sm:py-3.5
            text-sm sm:text-base
            transition-all duration-200 hover:bg-[#ffffff]/10 active:scale-95"
        >
          <ExternalLink className="w-4 h-4" />
          Live Demo
        </a>
        {/* Secondary: GitHub */}
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="View source on GitHub"
          className="inline-flex items-center justify-center w-11 h-11 rounded-full
            border-2 border-[#ffffff]/40 text-[#ffffff]/60
            transition-all duration-200 hover:border-[#ffffff] hover:text-[#ffffff] hover:bg-[#ffffff]/10 active:scale-95"
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    );
  }

  // No live demo — link directly to GitHub repo
  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 font-kanit font-medium uppercase tracking-widest rounded-full
        border-2 border-[#ffffff] text-[#ffffff]
        px-8 py-3 sm:px-10 sm:py-3.5
        text-sm sm:text-base
        transition-all duration-200 hover:bg-[#ffffff]/10 active:scale-95
        ${className}`}
    >
      <Github className="w-4 h-4" />
      View Code
    </a>
  );
};

export default ProjectLinks;
