"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Check,
  Loader2,
  Mail,
  Github,
  Linkedin,
  Phone,
  Terminal,
  AlertCircle,
  X,
  Sparkles,
  Briefcase,
  Zap,
  Coffee,
  CornerDownLeft,
} from "lucide-react";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

// ── Validation schema (mirrors server-side limits) ─────────────────────────
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be at most 100 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .max(254, { message: "Email is too long." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(5000, { message: "Message must be at most 5,000 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const LINKS = [
  {
    label: "Email",
    value: "saranjthilak@gmail.com",
    href: "mailto:saranjthilak@gmail.com",
    icon: Mail,
    nodeId: "CHAN-0x01",
    accent: "hsl(var(--accent))",
  },
  {
    label: "LinkedIn",
    value: "in/saranjayathilak",
    href: "https://www.linkedin.com/in/saranjayathilak",
    icon: Linkedin,
    nodeId: "CHAN-0x02",
    accent: "#38bdf8",
  },
  {
    label: "GitHub",
    value: "saranjthilak",
    href: "https://github.com/saranjthilak",
    icon: Github,
    nodeId: "CHAN-0x03",
    accent: "#a78bfa",
  },
  {
    label: "Calls",
    value: "Available upon request",
    href: "",
    icon: Phone,
    nodeId: "CHAN-0x04",
    accent: "#f59e0b",
  },
];

const QUICK_TOPICS = [
  {
    id: "fulltime",
    label: "Full-Time Role",
    icon: Briefcase,
    template: "Hi Saran, we have an open role for a Data / AI Engineer and would like to invite you for an interview to discuss...",
  },
  {
    id: "rag",
    label: "GenAI / RAG Build",
    icon: Sparkles,
    template: "Hi Saran, we are designing a production RAG / LLM application and would like your expertise with citation grounding, vector search, and latency optimization for...",
  },
  {
    id: "pipeline",
    label: "Airflow / Cloud IaC",
    icon: Zap,
    template: "Hi Saran, we want to build or optimize our Apache Airflow pipelines, dbt modeling, and Terraform infrastructure for...",
  },
  {
    id: "connect",
    label: "Intro & Coffee",
    icon: Coffee,
    template: "Hi Saran, impressed by your background at Tesla and telecom operations. Would love to connect regarding...",
  },
];

const RATE_LIMIT_MS = 60_000;

const EASE = [0.16, 1, 0.3, 1] as const;

const ContactSection = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(videoRef, { once: true, margin: "200px" });
  const [sent, setSent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [lastSubmit, setLastSubmit] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [focusedField, setFocusedField] = useState<"name" | "email" | "message" | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const nameValue = watch("name") || "";
  const emailValue = watch("email") || "";
  const messageValue = watch("message") || "";

  const isNameValid = nameValue.trim().length >= 2 && !errors.name;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim()) && !errors.email;
  const isMessageValid = messageValue.trim().length >= 10 && !errors.message;

  const validCount = (isNameValid ? 1 : 0) + (isEmailValid ? 1 : 0) + (isMessageValid ? 1 : 0);
  const readinessPercent = Math.round((validCount / 3) * 100);

  const handleSelectTopic = (topic: (typeof QUICK_TOPICS)[number]) => {
    setSelectedTopic(topic.id);
    setValue("message", topic.template, { shouldValidate: true });
    setTimeout(() => {
      messageInputRef.current?.focus();
    }, 50);
  };

  const handleClearField = (field: "name" | "email" | "message") => {
    setValue(field, "", { shouldValidate: true });
    if (field === "message") setSelectedTopic(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (honeypot) return;

    const now = Date.now();
    if (now - lastSubmit < RATE_LIMIT_MS) {
      toast.error("Please wait before sending another message.");
      setStatusMessage("Rate limited. Please wait before sending another message.");
      return;
    }

    setSubmitting(true);
    setStatusMessage("Sending your message…");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Server error");
      }

      toast.success("Message sent! I'll get back to you soon.");
      setStatusMessage("Message sent successfully. I'll get back to you soon.");
      setSent(true);
      setLastSubmit(Date.now());
      reset();
      setSelectedTopic(null);
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Failed to send. Please try again.";
      toast.error(message);
      setStatusMessage(`Error: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="font-inter rounded-t-section -mt-10 sm:-mt-12 md:-mt-14 relative z-50 min-h-[100svh] flex items-center overflow-hidden border-t border-white/10"
      style={{
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem clamp(4rem, 6vw, 6rem)",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
        background: "hsl(var(--background))",
      }}
    >
      {/* Video background */}
      <div ref={videoRef} className="absolute inset-0 z-0 overflow-hidden rounded-t-[inherit]">
        {isInView && (
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.18)" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 blueprint-dots opacity-[0.07] z-[1]" aria-hidden="true" />

      {/* Accent glow top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 z-[2]"
        style={{ background: "linear-gradient(to right, transparent, hsl(var(--accent)/0.4), transparent)" }}
      />

      {/* Content */}
      <div className="mx-auto w-full max-w-6xl relative z-10">

        {/* Section eyebrow */}
        <FadeIn delay={0} y={20}>
          <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-white/50 mb-5">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Contact
            <span className="ml-auto font-mono text-[9px] text-white/30">ENDPOINT // OPEN</span>
          </p>
        </FadeIn>

        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] items-start">

          {/* ── Left column ── */}
          <div>
            <FadeIn delay={0.08} y={30}>
              <SectionHeading
                id="contact-heading"
                prefix="Let's build something that "
                accentWord="holds up"
                gradient="experience"
                align="left"
                className="font-kanit"
              />
            </FadeIn>

            <FadeIn delay={0.2} y={16}>
              <p className="mt-6 text-white/60 text-sm sm:text-base leading-relaxed max-w-md font-kanit font-light">
                I work on RAG systems, data pipelines, and cloud infrastructure. Tell me what you&apos;re building, and I&apos;ll get back to you within a day.
              </p>
            </FadeIn>

            {/* ── HUD channel list ── */}
            <div className="mt-10 relative overflow-hidden border border-white/10 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(12px)" }}
            >
              {/* corner brackets */}
              <span className="absolute top-0 left-0 h-4 w-4 border-t border-l border-accent/40" />
              <span className="absolute top-0 right-0 h-4 w-4 border-t border-r border-accent/40" />
              <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-accent/40" />
              <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-accent/40" />
              {/* top accent bar */}
              <span className="absolute left-0 top-0 h-0.5 w-full" style={{ background: "linear-gradient(to right, hsl(var(--accent)/0.5), transparent)" }} />

              {/* header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_hsl(var(--accent))]" />
                  <span className="text-foreground font-semibold">CONTACT CHANNELS</span>
                </span>
                <span className="font-mono text-[9px] text-white/25">4 NODES ACTIVE</span>
              </div>

              {LINKS.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
                    className="group relative flex items-center justify-between gap-4 px-5 py-4 border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    {/* hover left accent */}
                    <span
                      className="pointer-events-none absolute left-0 top-0 h-full w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: link.accent }}
                    />
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border"
                        style={{ borderColor: `${link.accent}30`, background: `${link.accent}10`, color: link.accent }}
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </span>
                      <div className="min-w-0">
                        <div className="font-mono text-[8px] uppercase tracking-widest text-white/30 mb-0.5">{link.nodeId} · {link.label}</div>
                        {link.href ? (
                          <a
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            className="block font-mono text-[11px] text-white/70 hover:text-white truncate transition-colors duration-200"
                            style={{ color: `${link.accent}cc` }}
                          >
                            {link.value}
                          </a>
                        ) : (
                          <span className="font-mono text-[11px] text-white/40">{link.value}</span>
                        )}
                      </div>
                    </div>
                    {link.href && (
                      <ArrowUpRight
                        className="h-3.5 w-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: link.accent }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Right column — form ── */}
          <FadeIn delay={0.15} y={24}>
            <div className="relative overflow-hidden border border-white/10 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(16px)" }}
            >
              {/* corner brackets */}
              <span className="absolute top-0 left-0 h-5 w-5 border-t border-l border-accent/40 z-10" />
              <span className="absolute top-0 right-0 h-5 w-5 border-t border-r border-accent/40 z-10" />
              <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-accent/40 z-10" />
              <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-accent/40 z-10" />
              {/* top accent bar */}
              <span className="absolute left-0 top-0 h-0.5 w-full z-10" style={{ background: "linear-gradient(to right, hsl(var(--accent)/0.6), transparent 60%)" }} />
              {/* inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent pointer-events-none" />

              {/* form header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_hsl(var(--accent))]" />
                  <span className="font-semibold text-foreground">MESSAGE TERMINAL</span>
                  <span className="hidden text-white/30 sm:inline">|</span>
                  <span className="hidden sm:inline">NODE-0xFF · SECURE</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-white/40">READY:</span>
                    <div className="w-14 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-300 shadow-[0_0_6px_hsl(var(--accent))]"
                        style={{ width: `${readinessPercent}%` }}
                      />
                    </div>
                    <span className="font-mono text-[9px] text-accent font-semibold">{validCount}/3</span>
                  </div>
                  <span className="font-mono text-[9px] text-white/25 uppercase tracking-wider">TLS 1.3</span>
                </div>
              </div>

              {/* Accessible live region */}
              <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
                {statusMessage}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6 sm:p-8" noValidate>
                {/* Quick select topic presets */}
                <div>
                  <div className="flex items-center justify-between mb-2 px-0.5">
                    <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-widest text-white/45">
                      <Terminal className="w-2.5 h-2.5 text-accent" />
                      QUICK_TEMPLATE // SELECT_INTENT
                    </span>
                    {selectedTopic && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTopic(null);
                          setValue("message", "", { shouldValidate: true });
                        }}
                        className="font-mono text-[8px] text-accent hover:underline flex items-center gap-1 uppercase tracking-wider transition-opacity hover:opacity-80"
                      >
                        <X className="w-2.5 h-2.5" /> RESET
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {QUICK_TOPICS.map((topic) => {
                      const Icon = topic.icon;
                      const isSelected = selectedTopic === topic.id;
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => handleSelectTopic(topic)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border font-mono text-[10px] tracking-wide transition-all duration-200 text-left ${
                            isSelected
                              ? "bg-accent/15 border-accent text-accent shadow-[0_0_12px_hsl(var(--accent)/0.25)]"
                              : "bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:border-white/25 hover:bg-white/[0.06]"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{topic.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name + Email grid */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name Input Block */}
                  <div className="relative group">
                    {focusedField === "name" && (
                      <>
                        <span className="pointer-events-none absolute -top-1 -left-1 h-2.5 w-2.5 border-t-2 border-l-2 border-accent z-20" />
                        <span className="pointer-events-none absolute -top-1 -right-1 h-2.5 w-2.5 border-t-2 border-r-2 border-accent z-20" />
                        <span className="pointer-events-none absolute -bottom-1 -left-1 h-2.5 w-2.5 border-b-2 border-l-2 border-accent z-20" />
                        <span className="pointer-events-none absolute -bottom-1 -right-1 h-2.5 w-2.5 border-b-2 border-r-2 border-accent z-20" />
                      </>
                    )}
                    <div className="flex items-center justify-between mb-1.5 px-1">
                      <label htmlFor="name" className="flex items-center gap-1.5 font-mono text-[9px] text-white/60 uppercase tracking-widest cursor-pointer">
                        <span className="text-accent/80 font-bold">$</span>
                        <span>name</span>
                        <span className="text-white/20 text-[8px]">INP-0x01</span>
                      </label>
                      <div>
                        {errors.name ? (
                          <span className="flex items-center gap-1 font-mono text-[8px] text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded border border-red-400/20">
                            <AlertCircle className="w-2.5 h-2.5" /> ERR // INVALID
                          </span>
                        ) : isNameValid ? (
                          <span className="flex items-center gap-1 font-mono text-[8px] text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20">
                            <Check className="w-2.5 h-2.5" /> OK // VERIFIED
                          </span>
                        ) : focusedField === "name" ? (
                          <span className="flex items-center gap-1 font-mono text-[8px] text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> INP // ACTIVE
                          </span>
                        ) : (
                          <span className="font-mono text-[8px] text-white/25">IDLE</span>
                        )}
                      </div>
                    </div>

                    <div
                      className={`relative flex items-center rounded-lg border transition-all duration-200 overflow-hidden ${
                        errors.name
                          ? "border-red-500/50 bg-red-500/[0.03] shadow-[0_0_12px_rgba(239,68,68,0.15)]"
                          : focusedField === "name"
                          ? "border-accent/70 bg-white/[0.07] shadow-[0_0_16px_hsl(var(--accent)/0.25)]"
                          : isNameValid
                          ? "border-accent/30 bg-white/[0.04]"
                          : "border-white/15 bg-white/[0.03] hover:border-white/25"
                      }`}
                    >
                      <span className="pl-3.5 pr-2 font-mono text-xs text-accent/60 select-none">&gt;</span>
                      <input
                        id="name"
                        type="text"
                        placeholder="Jane Doe"
                        maxLength={100}
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        {...register("name")}
                        onFocus={() => setFocusedField("name")}
                        onBlur={(e) => {
                          setFocusedField(null);
                          register("name").onBlur(e);
                        }}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent py-3 pr-2 text-white placeholder-white/25 font-mono text-sm outline-none"
                      />
                      {nameValue && (
                        <button
                          type="button"
                          onClick={() => handleClearField("name")}
                          className="px-3 text-white/30 hover:text-white transition-colors"
                          aria-label="Clear name input"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {errors.name && (
                      <p id="name-error" className="font-mono text-[9px] text-red-400 mt-1 pl-1 flex items-center gap-1" role="alert">
                        <span>⚠</span> {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Input Block */}
                  <div className="relative group">
                    {focusedField === "email" && (
                      <>
                        <span className="pointer-events-none absolute -top-1 -left-1 h-2.5 w-2.5 border-t-2 border-l-2 border-accent z-20" />
                        <span className="pointer-events-none absolute -top-1 -right-1 h-2.5 w-2.5 border-t-2 border-r-2 border-accent z-20" />
                        <span className="pointer-events-none absolute -bottom-1 -left-1 h-2.5 w-2.5 border-b-2 border-l-2 border-accent z-20" />
                        <span className="pointer-events-none absolute -bottom-1 -right-1 h-2.5 w-2.5 border-b-2 border-r-2 border-accent z-20" />
                      </>
                    )}
                    <div className="flex items-center justify-between mb-1.5 px-1">
                      <label htmlFor="email" className="flex items-center gap-1.5 font-mono text-[9px] text-white/60 uppercase tracking-widest cursor-pointer">
                        <span className="text-accent/80 font-bold">$</span>
                        <span>email</span>
                        <span className="text-white/20 text-[8px]">INP-0x02</span>
                      </label>
                      <div>
                        {errors.email ? (
                          <span className="flex items-center gap-1 font-mono text-[8px] text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded border border-red-400/20">
                            <AlertCircle className="w-2.5 h-2.5" /> ERR // INVALID
                          </span>
                        ) : isEmailValid ? (
                          <span className="flex items-center gap-1 font-mono text-[8px] text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20">
                            <Check className="w-2.5 h-2.5" /> OK // VERIFIED
                          </span>
                        ) : focusedField === "email" ? (
                          <span className="flex items-center gap-1 font-mono text-[8px] text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> INP // ACTIVE
                          </span>
                        ) : (
                          <span className="font-mono text-[8px] text-white/25">IDLE</span>
                        )}
                      </div>
                    </div>

                    <div
                      className={`relative flex items-center rounded-lg border transition-all duration-200 overflow-hidden ${
                        errors.email
                          ? "border-red-500/50 bg-red-500/[0.03] shadow-[0_0_12px_rgba(239,68,68,0.15)]"
                          : focusedField === "email"
                          ? "border-accent/70 bg-white/[0.07] shadow-[0_0_16px_hsl(var(--accent)/0.25)]"
                          : isEmailValid
                          ? "border-accent/30 bg-white/[0.04]"
                          : "border-white/15 bg-white/[0.03] hover:border-white/25"
                      }`}
                    >
                      <span className="pl-3.5 pr-2 font-mono text-xs text-accent/60 select-none">&gt;</span>
                      <input
                        id="email"
                        type="email"
                        placeholder="jane@company.com"
                        maxLength={254}
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        {...register("email")}
                        onFocus={() => setFocusedField("email")}
                        onBlur={(e) => {
                          setFocusedField(null);
                          register("email").onBlur(e);
                        }}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent py-3 pr-2 text-white placeholder-white/25 font-mono text-sm outline-none"
                      />
                      {emailValue && (
                        <button
                          type="button"
                          onClick={() => handleClearField("email")}
                          className="px-3 text-white/30 hover:text-white transition-colors"
                          aria-label="Clear email input"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {errors.email && (
                      <p id="email-error" className="font-mono text-[9px] text-red-400 mt-1 pl-1 flex items-center gap-1" role="alert">
                        <span>⚠</span> {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Input Block */}
                <div className="relative group">
                  {focusedField === "message" && (
                    <>
                      <span className="pointer-events-none absolute -top-1 -left-1 h-2.5 w-2.5 border-t-2 border-l-2 border-accent z-20" />
                      <span className="pointer-events-none absolute -top-1 -right-1 h-2.5 w-2.5 border-t-2 border-r-2 border-accent z-20" />
                      <span className="pointer-events-none absolute -bottom-1 -left-1 h-2.5 w-2.5 border-b-2 border-l-2 border-accent z-20" />
                      <span className="pointer-events-none absolute -bottom-1 -right-1 h-2.5 w-2.5 border-b-2 border-r-2 border-accent z-20" />
                    </>
                  )}
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <label htmlFor="message" className="flex items-center gap-1.5 font-mono text-[9px] text-white/60 uppercase tracking-widest cursor-pointer">
                      <span className="text-accent/80 font-bold">$</span>
                      <span>message_payload</span>
                      <span className="text-white/20 text-[8px]">INP-0x03</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {messageValue.length > 0 && messageValue.length < 10 ? (
                        <span className="font-mono text-[8px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                          MIN 10 CHARS ({10 - messageValue.length} MORE)
                        </span>
                      ) : isMessageValid ? (
                        <span className="flex items-center gap-1 font-mono text-[8px] text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20">
                          <Check className="w-2.5 h-2.5" /> OK // {messageValue.length}/5000
                        </span>
                      ) : (
                        <span className="font-mono text-[8px] text-white/30">
                          {messageValue.length} / 5,000 CHARS
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`relative rounded-lg border transition-all duration-200 overflow-hidden ${
                      errors.message
                        ? "border-red-500/50 bg-red-500/[0.03] shadow-[0_0_12px_rgba(239,68,68,0.15)]"
                        : focusedField === "message"
                        ? "border-accent/70 bg-white/[0.07] shadow-[0_0_16px_hsl(var(--accent)/0.25)]"
                        : isMessageValid
                        ? "border-accent/30 bg-white/[0.04]"
                        : "border-white/15 bg-white/[0.03] hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-start">
                      <span className="pl-3.5 pr-2 pt-3 font-mono text-xs text-accent/60 select-none">&gt;</span>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Tell me what you're building, roles you're hiring for, or architectural challenges you're facing…"
                        maxLength={5000}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        {...register("message")}
                        ref={(e) => {
                          register("message").ref(e);
                          messageInputRef.current = e;
                        }}
                        onFocus={() => setFocusedField("message")}
                        onBlur={(e) => {
                          setFocusedField(null);
                          register("message").onBlur(e);
                        }}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent py-3 pr-8 text-white placeholder-white/25 font-mono text-sm outline-none resize-none leading-relaxed"
                      />
                      {messageValue && (
                        <button
                          type="button"
                          onClick={() => handleClearField("message")}
                          className="p-3 text-white/30 hover:text-white transition-colors"
                          aria-label="Clear message input"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Subtle payload progress bar at the bottom of the textarea */}
                    <div className="h-0.5 w-full bg-white/5">
                      <div
                        className="h-full bg-accent transition-all duration-150"
                        style={{ width: `${Math.min(100, (messageValue.length / 5000) * 100)}%` }}
                      />
                    </div>
                  </div>
                  {errors.message && (
                    <p id="message-error" className="font-mono text-[9px] text-red-400 mt-1 pl-1 flex items-center gap-1" role="alert">
                      <span>⚠</span> {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Honeypot — hidden from real users */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    top: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="v2-website">Website</label>
                  <input
                    id="v2-website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Submit row with keybinding and SLA telemetry */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/[0.08]">
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={submitting || sent}
                      aria-busy={submitting}
                      className="group relative flex items-center gap-3 overflow-hidden border border-accent/40 bg-accent/10 px-6 py-3 font-mono text-[10px] font-semibold tracking-widest text-accent uppercase transition-all duration-300 hover:bg-accent/20 hover:border-accent/80 hover:shadow-[0_0_28px_hsl(var(--accent)/0.3)] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                    >
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
                      <span className="relative">
                        {submitting ? "$ transmitting..." : sent ? "$ transmitted ✓" : "$ dispatch --payload"}
                      </span>
                      {submitting ? (
                        <Loader2 className="relative w-3.5 h-3.5 animate-spin" />
                      ) : sent ? (
                        <Check className="relative w-3.5 h-3.5" />
                      ) : (
                        <ArrowUpRight className="relative w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      )}
                    </button>
                    <div className="hidden sm:flex items-center gap-1.5 font-mono text-[9px] text-white/35">
                      <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-white/60 text-[8px]">Ctrl</kbd>
                      <span>+</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-white/60 text-[8px]">Enter ↵</kbd>
                      <span className="text-white/25">to dispatch</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[9px] text-white/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    <span>Avg reply: &lt; 24h</span>
                  </div>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
