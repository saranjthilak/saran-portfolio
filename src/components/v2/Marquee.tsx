"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeDirection = "left" | "right";

interface MarqueeProps {
  children: ReactNode;
  direction?: MarqueeDirection;
  speed?: number; // seconds for one loop
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee = ({
  children,
  direction = "left",
  speed = 35,
  pauseOnHover = true,
  className,
}: MarqueeProps) => {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div
      className={cn(
        "flex w-max will-change-transform",
        direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        pauseOnHover && "hover:[animation-play-state:paused]",
        className
      )}
      style={{ animationDuration: `${speed}s` }}
    >
      {/* Original set */}
      <div className="flex items-center" aria-hidden="false">
        {items}
      </div>
      {/* Duplicate set for seamless loop — visually hidden from assistive tech */}
      <div className="flex items-center" aria-hidden="true">
        {items}
      </div>
    </div>
  );
};

export default Marquee;
