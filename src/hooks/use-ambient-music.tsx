"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";
interface AmbientMusicContextValue {
  playing: boolean;
  toggle: () => void;
  volume: number;
  setVolume: (v: number) => void;
}

const Ctx = createContext<AmbientMusicContextValue | null>(null);
const STORAGE_KEY = "ambient-music-on";
const VOL_KEY = "ambient-music-vol";

type Nodes = {
  ctx: AudioContext;
  master: GainNode;
  oscs: OscillatorNode[];
  lfo: OscillatorNode;
  lfoGain: GainNode;
  filter: BiquadFilterNode;
};

export const AmbientMusicProvider = ({ children }: { children: ReactNode }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.18);
  const nodesRef = useRef<Nodes | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(VOL_KEY);
      if (v) setVolumeState(Math.max(0, Math.min(1, parseFloat(v))));
    } catch {
      // ignore
    }
  }, []);

  const build = useCallback((): Nodes | null => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    const ctx: AudioContext = new AC();
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.6;
    filter.connect(master).connect(ctx.destination);

    // Soft ambient pad: stacked detuned sine/triangle oscillators on a minor 7 chord
    const freqs = [110, 164.81, 220, 277.18, 329.63]; // A2, E3, A3, C#4ish, E4
    const oscs: OscillatorNode[] = [];
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      o.detune.value = (i - 2) * 6;
      const g = ctx.createGain();
      g.gain.value = 0.18 / freqs.length;
      o.connect(g).connect(filter);
      o.start();
      oscs.push(o);
    });

    // Slow LFO modulates filter cutoff for breathing motion
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 350;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    return { ctx, master, oscs, lfo, lfoGain, filter };
  }, []);

  const stop = useCallback(() => {
    const n = nodesRef.current;
    if (!n) return;
    const t = n.ctx.currentTime;
    n.master.gain.cancelScheduledValues(t);
    n.master.gain.setValueAtTime(n.master.gain.value, t);
    n.master.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
    setTimeout(() => {
      try {
        n.oscs.forEach((o) => o.stop());
        n.lfo.stop();
        n.ctx.close();
      } catch {
        // ignore
      }
      nodesRef.current = null;
    }, 1400);
  }, []);

  const start = useCallback(() => {
    if (nodesRef.current) return;
    const n = build();
    if (!n) return;
    nodesRef.current = n;
    if (n.ctx.state === "suspended") n.ctx.resume().catch(() => {});
    const t = n.ctx.currentTime;
    n.master.gain.cancelScheduledValues(t);
    n.master.gain.setValueAtTime(0.0001, t);
    n.master.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), t + 2.5);
  }, [build, volume]);

  const toggle = useCallback(() => {
    setPlaying((p) => {
      const next = !p;
      if (next) start();
      else stop();
      try { localStorage.setItem(STORAGE_KEY, next ? "1" : "0"); } catch { /* ignore */ }
      return next;
    });
  }, [start, stop]);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    try { localStorage.setItem(VOL_KEY, String(clamped)); } catch { /* ignore */ }
    const n = nodesRef.current;
    if (n) {
      const t = n.ctx.currentTime;
      n.master.gain.cancelScheduledValues(t);
      n.master.gain.setTargetAtTime(Math.max(0.0001, clamped), t, 0.4);
    }
  }, []);

  useEffect(() => () => stop(), [stop]);

  const value = useMemo(() => ({ playing, toggle, volume, setVolume }), [playing, toggle, volume, setVolume]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useAmbientMusic = () => {
  const c = useContext(Ctx);
  if (!c) return { playing: false, toggle: () => {}, volume: 0, setVolume: () => {} } as AmbientMusicContextValue;
  return c;
};