
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, MapPin, Zap, Globe, Terminal, Signal, Cpu, Wifi } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ── Status Line ── */
const StatusLine = ({ label, value, color }: { label: string; value: string; color: string }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setDisplayed(value.slice(0, idx + 1));
      idx++;
      if (idx >= value.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [value]);
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-wider">
      <span className={`w-1.5 h-1.5 rounded-full ${color} animate-pulse`} />
      <span className="text-muted-foreground uppercase">{label}:</span>
      <span className="text-foreground/80">{displayed}<span className="animate-pulse">_</span></span>
    </div>
  );
};

/* ── Glitch Text Effect ── */
const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 w-full text-[hsl(24,95%,53%)] opacity-0 hover:opacity-70 transition-opacity"
        style={{ clipPath: "inset(10% 0 60% 0)", transform: "translate(-2px, -1px)" }}
        aria-hidden
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 w-full text-cyan-400 opacity-0 hover:opacity-50 transition-opacity"
        style={{ clipPath: "inset(50% 0 10% 0)", transform: "translate(2px, 1px)" }}
        aria-hidden
      >
        {text}
      </span>
    </span>
  );
};

/* ── Animated Grid Background ── */
const AnimatedGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
    {/* Perspective grid floor */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `
          linear-gradient(hsl(24 95% 53% / 0.3) 1px, transparent 1px),
          linear-gradient(90deg, hsl(24 95% 53% / 0.3) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse at 50% 40%, black 20%, transparent 70%)",
      }}
    />
    {/* Radial glow */}
    <div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 30%, hsl(24 95% 53% / 0.06), transparent 70%)",
      }}
    />
    {/* Floating scan line */}
    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(24,95%,53%,0.3)] to-transparent animate-scanline-sweep" />
  </div>
);

/* ── Contact Link Card ── */
const ContactLink = ({
  href,
  icon: Icon,
  label,
  value,
  gradient,
  borderColor,
  delay,
}: {
  href?: string;
  icon: React.ElementType;
  label: string;
  value: string;
  gradient: string;
  borderColor: string;
  delay: number;
}) => {
  const variants: Variants = {
    hidden: { opacity: 0, x: -30, filter: "blur(8px)" },
    visible: {
      opacity: 1, x: 0, filter: "blur(0px)",
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
    },
  };

  const Tag = href ? "a" : "div";
  const linkProps = href
    ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: href.startsWith("http") ? "noopener noreferrer" : undefined }
    : {};

  return (
    <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <Tag
        {...linkProps}
        className={`group relative flex items-center gap-4 p-4 rounded-lg border ${borderColor} bg-background/80 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-primary/50 hover:bg-primary/5`}
      >
        {/* Hover sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        {/* Icon */}
        <div className={`relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-lg ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {/* Text */}
        <div className="relative z-10 flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
          <span className="text-foreground text-sm sm:text-base font-medium tracking-wide break-all">{value}</span>
        </div>
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-primary/20 group-hover:border-primary/60 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-primary/20 group-hover:border-primary/60 transition-colors duration-300" />
      </Tag>
    </motion.div>
  );
};

/* ── Social Button ── */
const SocialButton = ({
  href, icon: Icon, label, color, delay
}: {
  href: string; icon: React.ElementType; label: string; color: string; delay: number;
}) => {
  const variants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
    },
  };
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg border border-border bg-background/80 backdrop-blur-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-foreground overflow-hidden transition-colors duration-300 hover:border-primary/50`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${color}`} />
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:text-white transition-colors" />
      <span className="relative z-10 group-hover:text-white transition-colors">{label}</span>
    </motion.a>
  );
};

/* ── Telemetry Readout ── */
const TelemetryReadout = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[9px] sm:text-[10px] text-muted-foreground/60 tracking-[0.2em] uppercase mt-4 pt-4 border-t border-border/50">
      <span className="flex items-center gap-1.5">
        <Signal className="w-3 h-3" />
        SIG LOCKED
      </span>
      <span className="flex items-center gap-1.5">
        <Cpu className="w-3 h-3" />
        NODE ACTIVE
      </span>
      <span className="flex items-center gap-1.5">
        <Wifi className="w-3 h-3" />
        {time.toLocaleTimeString("en-US", { hour12: false })} UTC+1
      </span>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN CONTACT SECTION
   ═══════════════════════════════════════════════ */
const ContactSection = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 overflow-hidden"
    >


      {/* Animated Grid Overlay */}
      <AnimatedGrid />

      {/* Top terminal readout */}
      <Reveal direction="up">
        <div className="max-w-6xl mx-auto mb-4">
          <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[9px] sm:text-[10px] text-muted-foreground/40 tracking-[0.2em] uppercase">
            <StatusLine label="CHANNEL" value="OPEN" color="bg-[hsl(var(--signal))]" />
            <StatusLine label="PROTOCOL" value="ENCRYPTED" color="bg-primary" />
            <StatusLine label="LATENCY" value="12ms" color="bg-cyan-400" />
          </div>
        </div>
      </Reveal>

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          title="Let's Connect"
          tag="Transmission Ready"
          subtitle="Establishing secure connection. Ready to collaborate on data engineering, AI systems, or cutting-edge projects."
        />

        <div className="grid gap-8 md:gap-10 lg:grid-cols-2 mt-8">
          {/* ── Left Column: Contact Info ── */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="space-y-3">
              <ContactLink
                href="mailto:saranjthilak@gmail.com"
                icon={Mail}
                label="Primary Channel"
                value="saranjthilak@gmail.com"
                gradient="bg-gradient-to-br from-primary to-orange-600"
                borderColor="border-border hover:border-primary/40"
                delay={0.1}
              />
              <ContactLink
                icon={MapPin}
                label="Location Node"
                value="Berlin, Germany"
                gradient="bg-gradient-to-br from-cyan-500 to-blue-600"
                borderColor="border-border"
                delay={0.2}
              />
              <ContactLink
                icon={Globe}
                label="Network Status"
                value="Available for Opportunities"
                gradient="bg-gradient-to-br from-emerald-500 to-green-600"
                borderColor="border-border"
                delay={0.3}
              />
            </div>

            {/* Social Buttons */}
            <motion.div
              className="flex gap-3"
              initial={reduce ? undefined : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <SocialButton
                href="https://www.linkedin.com/in/saranjayathilak"
                icon={Linkedin}
                label="LinkedIn"
                color="bg-gradient-to-r from-blue-600/80 to-blue-500/80"
                delay={0.4}
              />
              <SocialButton
                href="https://github.com/saranjthilak"
                icon={Github}
                label="GitHub"
                color="bg-gradient-to-r from-purple-600/80 to-fuchsia-500/80"
                delay={0.5}
              />
            </motion.div>

            {/* Telemetry Footer */}
            <Reveal direction="up" delay={0.5}>
              <TelemetryReadout />
            </Reveal>
          </div>

          {/* ── Right Column: Contact Form ── */}
          <Reveal direction="left" delay={0.15}>
            <div className="relative">
              {/* Corner HUD brackets */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/50 z-20" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary/50 z-20" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary/50 z-20" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50 z-20" />

              {/* HUD readout tags */}
              <div className="absolute -top-1 left-10 font-mono text-[8px] tracking-[0.2em] text-primary/50 uppercase z-20">
                MSG·MODULE
              </div>
              <div className="absolute -top-1 right-10 font-mono text-[8px] tracking-[0.2em] text-primary/50 uppercase z-20 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[hsl(var(--signal))] animate-pulse" />
                ONLINE
              </div>

              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
