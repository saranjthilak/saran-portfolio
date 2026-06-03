import { useEffect, useState } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");

const MicroHud = () => {
  const [now, setNow] = useState<Date>(new Date());
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      setNow(new Date());
      setUptime((performance.now() - start) / 1000);
    }, 1000);
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

  return (
    <>
      {/* Top-right clock */}
      <div className="fixed top-3 right-3 z-40 hidden md:flex flex-col items-end pointer-events-none select-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/50 backdrop-blur-md border border-cyan-400/30 shadow-[0_0_18px_rgba(34,211,238,0.18)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-cyan-200">{time}</span>
          <span className="font-mono text-[10px] tracking-[0.15em] text-cyan-300/60">{tzAbbr}</span>
        </div>
        <div className="mt-1 font-mono text-[9px] tracking-[0.25em] text-cyan-300/50 uppercase">
          {date} · {tz}
        </div>
      </div>

      {/* Bottom telemetry strip */}
      <div className="fixed bottom-0 left-72 right-0 z-40 hidden md:block pointer-events-none">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between gap-4 px-4 py-1.5 rounded-t-md bg-black/60 backdrop-blur-md border border-b-0 border-fuchsia-400/20 font-mono text-[10px] tracking-[0.2em] uppercase text-fuchsia-200/70">
            <div className="flex items-center gap-4 overflow-hidden whitespace-nowrap">
              <span className="text-cyan-300/80">SYS<span className="text-cyan-400 mx-1">●</span>ONLINE</span>
              <span className="opacity-40">|</span>
              <span>LAT 52.52° N</span>
              <span>LON 13.40° E</span>
              <span className="opacity-40">|</span>
              <span>UPTIME 99.97%</span>
            </div>
            <div className="flex items-center gap-4 whitespace-nowrap">
              <span className="text-fuchsia-300/70">SESSION {up}</span>
              <span className="opacity-40">|</span>
              <span className="text-cyan-300/70">{time} {tzAbbr}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MicroHud;