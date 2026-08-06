"use client";

import { motion } from "framer-motion";
import {
  Bot, ChartNoAxesColumn, Cloud, Cpu, Database, FileText, Image as ImageIcon,
  Layers, Search, Server, Workflow,
} from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  image: ImageIcon,
  cpu: Cpu,
  search: Search,
  server: Server,
  database: Database,
  file: FileText,
  layers: Layers,
  bot: Bot,
  cloud: Cloud,
  workflow: Workflow,
  chart: ChartNoAxesColumn,
};

export type PipelineNode = { label: string; icon: string };

const PipelineFlow = ({ nodes, active }: { nodes: PipelineNode[]; active: boolean }) => (
  <div className="flex flex-wrap items-center gap-y-3">
    {nodes.map((n, i) => {
      const Icon = ICONS[n.icon] ?? Cpu;
      return (
        <div key={n.label} className="flex items-center">
          <motion.div
            initial={false}
            animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.35, delay: active ? i * 0.07 : 0, ease: "easeOut" }}
            className="flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-3 py-1.5"
          >
            <Icon className="h-3.5 w-3.5 text-foreground/70" />
            <span className="text-xs font-medium tracking-[-0.01em] text-foreground/80">{n.label}</span>
          </motion.div>

          {i < nodes.length - 1 && (
            <svg width="34" height="10" viewBox="0 0 34 10" className="mx-1 shrink-0 overflow-visible">
              <motion.line
                x1="0" y1="5" x2="26" y2="5"
                stroke="hsl(var(--foreground))"
                strokeOpacity="0.35"
                strokeWidth="1.25"
                strokeDasharray="4 4"
                initial={false}
                animate={active ? { pathLength: 1, opacity: 1, strokeDashoffset: [0, -16] } : { pathLength: 0, opacity: 0 }}
                transition={{
                  pathLength: { duration: 0.3, delay: active ? i * 0.07 + 0.12 : 0 },
                  opacity: { duration: 0.2, delay: active ? i * 0.07 + 0.12 : 0 },
                  strokeDashoffset: { duration: 0.9, repeat: Infinity, ease: "linear" },
                }}
              />
              <motion.path
                d="M26 1.5 L30.5 5 L26 8.5"
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeOpacity="0.45"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
                transition={{ duration: 0.3, delay: active ? i * 0.07 + 0.2 : 0 }}
              />
            </svg>
          )}
        </div>
      );
    })}
  </div>
);

export default PipelineFlow;
