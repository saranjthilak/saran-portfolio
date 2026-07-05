import { useEffect, useState } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");

const MicroHud = () => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;

  return (
    <div className="fixed top-6 right-6 z-40 hidden md:flex items-center gap-6 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground pointer-events-none select-none">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--signal))] animate-pulse" />
        <span>Available for Hire</span>
      </div>
      <span className="opacity-30">/</span>
      <span>
        Berlin, DE <span className="text-foreground/80">52.5200° N</span>
      </span>
      <span className="opacity-30">/</span>
      <span className="text-foreground/80 font-bold">{time} UTC</span>
    </div>
  );
};

export default MicroHud;