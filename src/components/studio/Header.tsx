"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CloseIcon, LogoMark, MenuIcon } from "./primitives";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { label: "Home", id: "home" },
  { label: "Work", id: "works" },
  { label: "Capabilities", id: "services" },
  { label: "Experience", id: "experience" },
  { label: "Research", id: "research" },
  { label: "Contact", id: "contact" },
];

const useClock = () => {
  const [time, setTime] = useState("9:41am");
  const [date, setDate] = useState("12 March, 2025");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours() % 12 || 12;
      const m = String(d.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}${d.getHours() >= 12 ? "pm" : "am"}`);
      setDate(`${d.getDate()} ${d.toLocaleString("en-US", { month: "long" })}, ${d.getFullYear()}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return { time, date };
};

const Header = ({ ready, scrollToSection }: { ready: boolean; scrollToSection: (id: string) => void }) => {
  const { time, date } = useClock();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.removeProperty("overflow");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: string) => { setOpen(false); setTimeout(() => scrollToSection(id), 60); };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 top-0 z-50"
      >
        <div className="shell flex items-center justify-between gap-6 px-5 py-5 sm:px-8 sm:py-6">
          <button onClick={() => go("home")} className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-[0.16em] transition-transform hover:scale-[1.04]">
            <LogoMark className="text-xl text-accent" />
            Saran
          </button>

          <nav className="hidden lg:block">
            <ul className="flex gap-8 font-mono text-xs uppercase tracking-[0.12em]">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button onClick={() => go(n.id)} className="inline-block text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-accent">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 rounded-md border border-border bg-background/60 px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground backdrop-blur md:flex">
              <span className="text-foreground/45">Berlin</span>
              <span className="tnum min-w-[3.5rem] font-medium text-accent">{time}</span>
              <span className="text-foreground/30">/</span>
              <span className="font-medium">{date}</span>
            </div>
            <ThemeToggle />
            <button
              onClick={() => setOpen(true)}
              className="rounded-md border border-border bg-background/60 backdrop-blur transition-colors hover:border-accent hover:text-accent"
              aria-label="Open menu"
            >
              <span className="flex items-center gap-2 px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.1em]">
                <MenuIcon className="text-sm" />
                <span className="hidden sm:inline">Menu</span>
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[115] flex flex-col bg-background text-foreground"
          >
            <div className="shell flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
              <span className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-[0.16em]">
                <LogoMark className="text-xl text-accent" /> Saran
              </span>
              <button onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-accent hover:text-accent">
                <CloseIcon className="text-sm" /> Close
              </button>
            </div>

            <nav className="shell flex flex-1 flex-col justify-center px-5 sm:px-8">
              <ul className="flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 + i * 0.06, ease: "easeOut" }}
                  >
                    <button onClick={() => go(n.id)} className="group flex w-full items-baseline gap-4 py-2 text-left text-4xl font-semibold tracking-[-0.02em] sm:text-6xl font-display">
                      <span className="font-mono text-base font-normal text-accent/60 transition-colors group-hover:text-accent">0{i + 1}</span>
                      <span className="text-foreground/70 transition-colors group-hover:text-accent">{n.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="shell flex flex-col gap-3 border-t border-border px-5 py-6 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <span>Berlin, Germany — {time}</span>
              <button onClick={() => go("contact")} className="transition-colors hover:text-accent hover:underline">
                Start a project →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
