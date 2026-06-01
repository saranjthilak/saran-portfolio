import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";

type SoundType = "tick" | "hover" | "click";

interface UiSoundContextValue {
  muted: boolean;
  toggleMuted: () => void;
  play: (type?: SoundType) => void;
}

const UiSoundContext = createContext<UiSoundContextValue | null>(null);
const STORAGE_KEY = "ui-sound-muted";

export const UiSoundProvider = ({ children }: { children: ReactNode }) => {
  // Default to muted to respect users; they can opt in via toggle.
  const [muted, setMuted] = useState<boolean>(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const lastPlayRef = useRef<number>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) setMuted(stored === "1");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
    } catch {}
  }, [muted]);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    if (!ctxRef.current) ctxRef.current = new AC();
    if (ctxRef.current.state === "suspended") ctxRef.current.resume().catch(() => {});
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (type: SoundType = "tick") => {
      if (muted) return;
      const now = performance.now();
      // Throttle to avoid audio spam on rapid hovers
      if (now - lastPlayRef.current < 35) return;
      lastPlayRef.current = now;

      const ctx = getCtx();
      if (!ctx) return;

      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = type === "click" ? 880 : type === "hover" ? 1760 : 1320;
      const peak = type === "click" ? 0.06 : 0.025;
      const dur = type === "click" ? 0.07 : 0.04;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.6, t + dur);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(peak, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    },
    [getCtx, muted]
  );

  const toggleMuted = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      // Prime audio context on the user gesture that unmutes.
      if (!next) {
        const ctx = (() => {
          const AC = window.AudioContext || (window as any).webkitAudioContext;
          if (!AC) return null;
          if (!ctxRef.current) ctxRef.current = new AC();
          if (ctxRef.current.state === "suspended") ctxRef.current.resume().catch(() => {});
          return ctxRef.current;
        })();
        if (ctx) {
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(1320, t);
          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.exponentialRampToValueAtTime(0.04, t + 0.005);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
          osc.connect(gain).connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.08);
        }
      }
      return next;
    });
  }, []);

  const value = useMemo<UiSoundContextValue>(() => ({ muted, toggleMuted, play }), [muted, toggleMuted, play]);

  return <UiSoundContext.Provider value={value}>{children}</UiSoundContext.Provider>;
};

export const useUiSound = () => {
  const ctx = useContext(UiSoundContext);
  if (!ctx) {
    // Safe no-op fallback so components don't crash if provider is missing.
    return { muted: true, toggleMuted: () => {}, play: () => {} } as UiSoundContextValue;
  }
  return ctx;
};