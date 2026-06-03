import { useEffect, useState } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");

const MicroHud = () => {
  const [now, setNow] = useState<Date>(new Date());
  const [uptime, setUptime] = useState(0);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      setNow(new Date());
      setUptime((performance.now() - start) / 1000);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 100), 120);
    return () => clearInterval(id);
  }, []);

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const tzAbbr = now
    .toLocaleTimeString("en-US", { timeZoneName: "short" })
    .split(" ")
    .pop();
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const date = now.toISOString().slice(0, 10);
  const up = `${pad(Math.floor(uptime / 3600))}:${pad(Math.floor((uptime % 3600) / 60))}:${pad(Math.floor(uptime % 60))}`;
  const sig = 70 + ((pulse * 7) % 30);
  const cpu = 12 + ((pulse * 13) % 60);
  const bars = [0, 1, 2, 3, 4].map((i) => (((pulse + i * 3) % 10) > 3));

  return (
    <>
      {/* Top-right clock */}
      <div className="fixed top-3 right-3 z-40 hidden md:flex flex-col items-end pointer-events-none select-none">
        <div className="relative overflow-hidden flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/55 backdrop-blur-md border border-cyan-400/30 shadow-[0_0_18px_rgba(34,211,238,0.18)] animate-hud-flicker">
          <span className="absolute inset-0 hud-scanlines opacity-50 pointer-events-none" />
          <span className="absolute inset-0 hud-noise opacity-[0.08] mix-blend-overlay pointer-events-none animate-hud-noise" />
          <span className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent animate-hud-scan pointer-events-none" />
          <span className="relative w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-hud-blink" />
          <span className="relative font-mono text-[11px] tracking-[0.2em] text-cyan-200">{time}</span>
          <span className="relative font-mono text-[10px] tracking-[0.15em] text-cyan-300/60">{tzAbbr}</span>
          <span className="relative flex items-end gap-[2px] h-3 ml-1">
            {bars.map((on, i) => (
              <span
                key={i}
                className={`w-[2px] rounded-sm transition-colors ${on ? "bg-cyan-300 shadow-[0_0_6px_rgba(34,211,238,0.8)]" : "bg-cyan-300/20"}`}
                style={{ height: `${(i + 2) * 2}px` }}
              />
            ))}
          </span>
        </div>
        <div className="mt-1 font-mono text-[9px] tracking-[0.25em] text-cyan-300/50 uppercase flex items-center gap-2">
          <span>{date} · {tz}</span>
          <span className="text-fuchsia-300/60">CPU {cpu}%</span>
        </div>
      </div>

      {/* Bottom telemetry strip */}
      <div className="fixed bottom-0 left-72 right-0 z-40 hidden md:block pointer-events-none">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden flex items-center justify-between gap-4 px-4 py-1.5 rounded-t-md bg-black/65 backdrop-blur-md border border-b-0 border-fuchsia-400/20 font-mono text-[10px] tracking-[0.2em] uppercase text-fuchsia-200/70 animate-hud-flicker">
            <span className="absolute inset-0 hud-scanlines opacity-40 pointer-events-none" />
            <span className="absolute inset-0 hud-noise opacity-[0.07] mix-blend-overlay pointer-events-none animate-hud-noise" />
            <span className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-300/70 to-transparent animate-hud-scan pointer-events-none" style={{ animationDuration: "5s" }} />
            <div className="relative flex items-center gap-4 overflow-hidden whitespace-nowrap">
              <span className="flex items-center gap-1 text-cyan-300/80">
                SYS
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)] animate-hud-blink" />
                ONLINE
              </span>
              <span className="opacity-40">|</span>
              <span>LAT 52.52° N</span>
              <span>LON 13.40° E</span>
              <span className="opacity-40">|</span>
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-fuchsia-300 animate-hud-blink" style={{ animationDelay: "0.4s" }} />
                UPTIME 99.97%
              </span>
              <span className="opacity-40">|</span>
              <span className="text-cyan-300/70">SIG {sig}%</span>
            </div>
            <div className="relative flex items-center gap-4 whitespace-nowrap">
              <span className="flex items-end gap-[2px] h-3">
                {bars.map((on, i) => (
                  <span
                    key={i}
                    className={`w-[2px] rounded-sm ${on ? "bg-fuchsia-300 shadow-[0_0_6px_rgba(232,121,249,0.8)]" : "bg-fuchsia-300/20"}`}
                    style={{ height: `${(i + 2) * 2}px` }}
                  />
                ))}
              </span>
              <span className="text-fuchsia-300/70">SESSION {up}</span>
              <span className="opacity-40">|</span>
              <span className="text-cyan-300/70 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-cyan-300 animate-hud-blink" style={{ animationDelay: "0.8s" }} />
                {time} {tzAbbr}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MicroHud;