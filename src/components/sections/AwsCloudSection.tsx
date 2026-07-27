"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { Cloud, Server, Database, Shield, Cpu, Zap, Activity } from "lucide-react";
import { useRef, type MouseEvent, type ReactNode } from "react";

interface AwsCategory {
  icon: ReactNode;
  name: string;
  services: string[];
  accent: { gradient: string; glow: string; text: string; bg: string; border: string };
}

const awsServices: AwsCategory[] = [
  {
    icon: <Cpu className="w-6 h-6" />,
    name: "Compute",
    services: ["EC2", "Lambda", "ECS", "EKS"],
    accent: { gradient: "from-orange-400 via-amber-500 to-yellow-500", glow: "rgba(251,191,36,0.3)", text: "text-amber-400", bg: "bg-amber-500", border: "border-amber-500/30" },
  },
  {
    icon: <Database className="w-6 h-6" />,
    name: "Data & Storage",
    services: ["S3", "RDS", "DynamoDB", "Redshift"],
    accent: { gradient: "from-cyan-400 via-sky-500 to-blue-600", glow: "rgba(56,189,248,0.3)", text: "text-sky-400", bg: "bg-sky-500", border: "border-sky-500/30" },
  },
  {
    icon: <Server className="w-6 h-6" />,
    name: "Networking & Content",
    services: ["VPC", "CloudFront", "Route 53", "API Gateway"],
    accent: { gradient: "from-emerald-400 via-green-500 to-teal-600", glow: "rgba(52,211,153,0.3)", text: "text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-500/30" },
  },
  {
    icon: <Shield className="w-6 h-6" />,
    name: "Security & Identity",
    services: ["IAM", "KMS", "Cognito", "WAF"],
    accent: { gradient: "from-violet-400 via-purple-500 to-fuchsia-600", glow: "rgba(167,139,250,0.3)", text: "text-violet-400", bg: "bg-violet-500", border: "border-violet-500/30" },
  },
];

const ServiceTag = ({ name, accent, delay }: { name: string; accent: AwsCategory["accent"]; delay: number }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.7 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 200, damping: 18, delay }}
    className={`relative px-4 py-2 text-xs font-mono font-semibold tracking-wider uppercase rounded-xl border bg-white/[0.02] backdrop-blur-sm ${accent.border} ${accent.text} hover:bg-white/[0.06] transition-all duration-300 cursor-default group/tag overflow-hidden`}
  >
    {/* Pulse dot */}
    <span className={`absolute top-1.5 right-1.5 w-1 h-1 rounded-full ${accent.bg} opacity-0 group-hover/tag:opacity-100 animate-pulse transition-opacity duration-300`} />
    {name}
  </motion.span>
);

const AwsCard = ({ category, index }: { category: AwsCategory; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { accent } = category;

  // 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => { mouseX.set(0.5); mouseY.set(0.5); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 80, damping: 18, delay: index * 0.12 }}
      className="group relative"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.03 }}
        transition={{ scale: { type: "spring", stiffness: 260, damping: 20 } }}
        className="relative h-full"
      >
        {/* Glow ring */}
        <div
          className="absolute -inset-[1px] rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-sm"
          style={{ background: `linear-gradient(135deg, ${accent.glow}, transparent 60%)` }}
        />

        {/* Gradient border shell */}
        <div className={`relative h-full rounded-[1.75rem] p-[1px] bg-gradient-to-br ${accent.gradient} opacity-25 group-hover:opacity-50 transition-opacity duration-500`}>
          <div className="relative h-full rounded-[calc(1.75rem-1px)] bg-background/90 backdrop-blur-2xl p-7 sm:p-9 flex flex-col overflow-hidden">

            {/* Holographic shimmer */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: useTransform(
                  [glareX, glareY],
                  ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
                ),
              }}
            />

            {/* Circuit-line decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-[inherit] z-0">
              <svg className="absolute top-0 right-0 w-40 h-40 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700" viewBox="0 0 120 120">
                <path d="M 100 0 L 100 40 L 60 40 L 60 80 L 20 80 L 20 120" stroke="currentColor" strokeWidth="0.8" fill="none" className={accent.text} />
                <circle cx="100" cy="0" r="2" fill="currentColor" className={accent.text} />
                <circle cx="60" cy="40" r="2" fill="currentColor" className={accent.text} />
                <circle cx="20" cy="80" r="2" fill="currentColor" className={accent.text} />
                <path d="M 0 20 L 30 20 L 30 50" stroke="currentColor" strokeWidth="0.5" fill="none" className={accent.text} strokeDasharray="4 3" />
              </svg>
              <svg className="absolute bottom-0 left-0 w-28 h-28 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700" viewBox="0 0 100 100">
                <path d="M 0 30 L 40 30 L 40 70 L 80 70 L 80 100" stroke="currentColor" strokeWidth="0.8" fill="none" className={accent.text} />
                <circle cx="40" cy="30" r="2" fill="currentColor" className={accent.text} />
                <circle cx="80" cy="70" r="2" fill="currentColor" className={accent.text} />
              </svg>
            </div>

            {/* Header: icon + name + service count */}
            <div className="flex items-center gap-4 mb-7 relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent.gradient} p-[1px] shadow-lg`}>
                <div className="w-full h-full rounded-[calc(1rem-1px)] bg-background/80 backdrop-blur-xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <span className={accent.text}>{category.icon}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-display font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                  {category.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Activity className={`w-3 h-3 ${accent.text} opacity-60`} />
                  <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
                    {category.services.length} services
                  </span>
                </div>
              </div>
            </div>

            {/* Service tags with staggered spring-in */}
            <div className="flex flex-wrap gap-2.5 relative z-10">
              {category.services.map((service, i) => (
                <ServiceTag
                  key={service}
                  name={service}
                  accent={accent}
                  delay={0.15 + index * 0.1 + i * 0.06}
                />
              ))}
            </div>

            {/* Bottom scan line */}
            <div className="relative mt-auto pt-5">
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.03]" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${accent.gradient} origin-left opacity-30`}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AwsCloudSection = () => {
  return (
    <section id="cloud" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Flashy multi-color background blobs */}
      <div className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-sky-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgwVjB6bTMwIDMwaDMwdjMwSDMweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAxKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="AWS & Cloud"
          tag="Infrastructure"
          index="09"
          subtitle="Certified expertise in architecting scalable, secure cloud environments."
        />

        {/* AWS badge bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 backdrop-blur-sm">
            <Cloud className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-mono text-muted-foreground">
              <span className="text-amber-400 font-semibold">AWS</span> Solutions Architect
            </span>
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-500/10 to-transparent" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {awsServices.map((category, idx) => (
            <AwsCard key={category.name} category={category} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwsCloudSection;
