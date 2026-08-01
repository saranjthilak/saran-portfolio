"use client";

import { motion } from "framer-motion";
import { Sparkles, Cpu, Radio } from "lucide-react";

interface Badge {
  label: string;
  icon: React.ReactNode;
  color: string; // Tailwind border/text color class
  bgColor: string; // Tailwind bg color class
  /** Position offsets from center */
  x: string;
  y: string;
  /** Animation delay */
  delay: number;
  /** Floating amplitude */
  floatY: number;
  floatDuration: number;
}

const badges: Badge[] = [
  {
    label: "Data Engineer",
    icon: <Cpu className="w-3 h-3" />,
    color: "text-blue-400 border-blue-400/20",
    bgColor: "bg-blue-500/10",
    x: "-52%",
    y: "-180%",
    delay: 0.2,
    floatY: -12,
    floatDuration: 5,
  },
  {
    label: "AI/ML Specialist",
    icon: <Sparkles className="w-3 h-3" />,
    color: "text-violet-400 border-violet-400/20",
    bgColor: "bg-violet-500/10",
    x: "52%",
    y: "-140%",
    delay: 0.5,
    floatY: -10,
    floatDuration: 6,
  },
  {
    label: "Open to Work",
    icon: <Radio className="w-3 h-3" />,
    color: "text-emerald-400 border-emerald-400/20",
    bgColor: "bg-emerald-500/10",
    x: "60%",
    y: "80%",
    delay: 0.8,
    floatY: -8,
    floatDuration: 4.5,
  },
];

/**
 * Floating role/status badges that orbit subtly around the hero content.
 * Each badge enters with a staggered blur-in and then floats on a
 * gentle sine-wave path.
 */
const FloatingBadges = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 hidden md:block">
      {badges.map((badge) => (
        <motion.div
          key={badge.label}
          className="absolute top-1/2 left-1/2"
          style={{
            x: badge.x,
            y: badge.y,
          }}
          initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            delay: badge.delay + 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            animate={{
              y: [0, badge.floatY, 0],
            }}
            transition={{
              duration: badge.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border ${badge.color} ${badge.bgColor} shadow-lg`}
          >
            {badge.icon}
            <span className="text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap">
              {badge.label}
            </span>

            {/* Live ping for "Open to Work" */}
            {badge.label === "Open to Work" && (
              <span className="relative flex h-2 w-2 ml-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingBadges;
