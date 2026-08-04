"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoMark } from "./primitives";

const FILL_MS = 1300;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const PageLoader = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / FILL_MS, 1);
      setProgress(Math.round(easeInOutCubic(t) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setExiting(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!exiting && (
        <motion.div
          key="loader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-8 rounded-b-[2rem] bg-ink px-6 text-background"
        >
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="flex items-center gap-3 text-2xl font-semibold sm:text-3xl font-display">
              <LogoMark className="text-[1.875rem] text-background" />
              Saran Jaya Thilak
            </div>
            <p className="max-w-[24ch] text-sm text-background/55">
              Data engineering and generative AI, shipped with quiet precision.
            </p>
          </div>

          <div className="flex w-[min(22rem,72vw)] flex-col gap-3">
            <div className="h-px w-full bg-background/15">
              <div className="h-full bg-background transition-[width] duration-100 ease-out" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.05em] text-background/45">
              <span>Loading</span>
              <span className="tnum text-background/80">{String(progress).padStart(3, "0")}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
