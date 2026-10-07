"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import BlueprintSectionHeader from "./BlueprintSectionHeader";
import SectionHeading from "./SectionHeading";
import FadeIn from "./FadeIn";
import { fetchGitHubStats, type GitHubStats, type ContributionDay } from "@/lib/github-stats";

const ActivityCalendar = dynamic(
  async () => {
    const mod = await import("react-activity-calendar");
    return mod.ActivityCalendar;
  },
  {
    ssr: false,
    loading: () => (
      <div className="w-full flex flex-col gap-3 animate-pulse">
        <div className="h-4 w-40 bg-white/10 rounded mb-2" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex gap-1">
            {Array.from({ length: 53 }).map((_, j) => (
              <div key={j} className="w-[14px] h-[14px] rounded-sm bg-white/5" />
            ))}
          </div>
        ))}
      </div>
    ),
  }
);

const EASE = [0.16, 1, 0.3, 1] as const;
const GITHUB_USERNAME = "saranjthilak";

// ── Stat Card ───────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accentColor: string;
  delay: number;
  loading?: boolean;
}

const StatCard = ({ label, value, icon, accentColor, delay, loading }: StatCardProps) => {

  return (
    <FadeIn
      y={24}
      scale={0.95}
      duration={0.7}
      delay={delay}
      ease={[0.16, 1, 0.3, 1]}
      viewportMargin="-60px"
      className="relative group flex-1 min-w-[160px] p-5 sm:p-6 rounded-stat border border-white/10 hover:border-white/20 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 overflow-hidden"
    >
      {/* Ambient glow on hover */}
      <div
        className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span style={{ color: accentColor }} className="opacity-80">
            {icon}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            {label}
          </span>
        </div>
        {loading ? (
          <div className="h-9 sm:h-10 w-16 rounded-lg bg-white/5 animate-pulse" />
        ) : (
          <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
            {value}
          </span>
        )}
      </div>
    </FadeIn>
  );
};

// ── Main Component ──────────────────────────────────────────────────────────
export default function GithubSection({ initialData }: { initialData?: { stats: GitHubStats; contributions: ContributionDay[] } | null }) {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const statsLoaded = !!initialData;

  // Render stats directly instead of using useAnimatedNumber to avoid 0 values before JS loads
  const contributions = statsLoaded ? initialData.stats.totalContributions : 0;
  const longestStreak = statsLoaded ? initialData.stats.longestStreak : 0;
  const currentStreak = statsLoaded ? initialData.stats.currentStreak : 0;
  const activeDays = statsLoaded ? initialData.stats.activeDays : 0;

  // If the fetch failed, don't render stat cards at all (no fake data)
  const showStats = statsLoaded;

  return (
    <section
      ref={sectionRef}
      id="github"
      className="font-kanit relative w-full py-24 md:py-32 bg-v2-base z-40 border-t border-white/5 overflow-hidden"
    >
      {/* ── Background Effects ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow behind the card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 relative z-10">
        {/* ── Section Header ── */}
        <BlueprintSectionHeader align="center">
          <div className="text-center mb-16 md:mb-20">
            <FadeIn
              y={10}
              duration={0.6}
              ease={[0.16, 1, 0.3, 1]}
              className="flex items-center justify-center gap-2 font-medium uppercase tracking-[0.25em] text-white/50 text-xs mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Open Source
            </FadeIn>
            <SectionHeading
              prefix="GitHub "
              accentWord="Contributions"
              gradient="github"
              align="center"
            />
            <FadeIn y={0} delay={0.3} duration={1} className="mt-5 text-white/40 max-w-md mx-auto font-kanit font-light text-base">
              <p>Shipping code consistently — building in public, one commit at a time.</p>
            </FadeIn>
          </div>
        </BlueprintSectionHeader>

        {/* ── Stats Row — only rendered when data is loading or loaded (never with fake data) ── */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: "1.5rem" }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <StatCard
                label="Contributions"
                value={contributions.toLocaleString()}
                loading={!statsLoaded}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                }
                accentColor="hsl(158, 100%, 44%)"
                delay={0.1}
              />
              <StatCard
                label="Longest Streak"
                value={`${longestStreak}d`}
                loading={!statsLoaded}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 1.5-3.5C9.5 5.5 11 5 12 2z" />
                  </svg>
                }
                accentColor="#f59e0b"
                delay={0.2}
              />
              <StatCard
                label="Current Streak"
                value={`${currentStreak}d`}
                loading={!statsLoaded}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                }
                accentColor="#38bdf8"
                delay={0.3}
              />
              <StatCard
                label="Active Days"
                value={activeDays}
                loading={!statsLoaded}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                }
                accentColor="#a78bfa"
                delay={0.4}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Calendar Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="relative rounded-panel border border-white/10 hover:border-white/15 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-2xl p-6 sm:p-10 overflow-hidden transition-all duration-500 group"
          style={{
            boxShadow:
              "0 0 80px rgba(0,223,143,0.03), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Top-left accent line */}
          <div className="absolute top-0 left-8 w-20 h-[1px] bg-gradient-to-r from-accent/60 to-transparent" />
          {/* Bottom-right accent line */}
          <div className="absolute bottom-0 right-8 w-20 h-[1px] bg-gradient-to-l from-accent/40 to-transparent" />

          {/* Calendar */}
          <div className="min-w-[800px] flex justify-center overflow-x-auto">
            {!showStats ? (
              <div className="flex flex-col items-center justify-center py-12 text-white/50 text-sm">
                <p>GitHub data is currently unavailable.</p>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-accent hover:underline"
                >
                  View Profile on GitHub →
                </a>
              </div>
            ) : mounted && initialData ? (
              <ActivityCalendar
                data={initialData.contributions}
                colorScheme="dark"
                theme={{
                  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                }}
                blockSize={14}
                blockMargin={4}
                fontSize={14}
                labels={{
                  totalCount: `{{count}} contributions in the last year`,
                }}
              />
            ) : null}
          </div>

          {/* ── Footer: Profile Link ── */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white/60"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <span className="text-white/40 text-sm font-mono">
                @{GITHUB_USERNAME}
              </span>
            </div>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-accent/40 bg-white/[0.03] hover:bg-accent/10 text-white/60 hover:text-accent text-sm font-mono transition-all duration-300"
            >
              View Profile
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover/btn:translate-x-0.5 transition-transform duration-300"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
