"use client";

import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "studio-theme";

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const isDark = stored ? stored === "dark" : true;
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
    setDark(isDark);
  }, []);

  const apply = useCallback((next: boolean) => {
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.classList.toggle("light", !next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    setDark(next);
  }, []);

  const toggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const next = !dark;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const root = document.documentElement;
      root.style.setProperty("--wipe-x", `${x}px`);
      root.style.setProperty("--wipe-y", `${y}px`);
      root.style.setProperty("--wipe-r", `${radius}px`);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const startViewTransition = (document as any).startViewTransition?.bind(document);

      if (reduce || !startViewTransition) {
        apply(next);
        return;
      }
      startViewTransition(() => apply(next));
    },
    [apply, dark]
  );

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={`grid h-9 w-9 place-items-center rounded-[0.875rem] border border-border bg-background/60 text-foreground/70 backdrop-blur transition-colors hover:bg-background hover:text-foreground ${className}`}
    >
      <span className="relative block h-4 w-4">
        <Sun
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ${
            dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`absolute inset-0 h-4 w-4 transition-all duration-500 ${
            dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </span>
    </button>
  );
};

export default ThemeToggle;
