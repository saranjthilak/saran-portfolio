"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Check, Crown, ArrowUpRight } from "lucide-react";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const LINKS = [
  { label: "Email", value: "saranjthilak@gmail.com", href: "mailto:saranjthilak@gmail.com" },
  { label: "Phone", value: "+49 174 461 4592", href: "tel:+491744614592" },
  { label: "GitHub", value: "github.com/saranjthilak", href: "https://github.com/saranjthilak" },
  { label: "LinkedIn", value: "linkedin.com/in/saranjayathilak", href: "https://www.linkedin.com/in/saranjayathilak" },
];

const RATE_LIMIT_MS = 60_000;

const inputBase =
  "w-full rounded bg-white/5 border border-white/20 px-4 py-3.5 text-white placeholder-white/30 font-inter text-sm outline-none focus:border-white/60 focus:bg-white/10 transition-colors duration-200 backdrop-blur-md";

const ContactSection = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(videoRef, { once: true, margin: "200px" });
  const [sent, setSent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [lastSubmit, setLastSubmit] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (values: FormValues) => {
    if (honeypot) return;
    const now = Date.now();
    if (now - lastSubmit < RATE_LIMIT_MS) {
      toast.error("Please wait before sending another message.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Server error");
      }
      toast.success("Message sent! I'll get back to you soon.");
      setSent(true);
      setLastSubmit(Date.now());
      reset();
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="font-inter rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-50 min-h-[100svh] flex items-center"
      style={{
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem clamp(4rem, 6vw, 6rem)",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
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
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="mr-auto ml-2 sm:ml-6 md:ml-[4vw] lg:ml-[6vw] w-full max-w-5xl grid gap-14 lg:grid-cols-[1fr_1fr] items-center relative z-10">

        {/* ── Left column ─────────────────────────────────────────── */}
        <div>


          {/* Heading */}
          <div className="animate-fade-up-delay-1">
            <h2
              className="font-podium text-white uppercase leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
            >
              Build.<br />Ship.<br />Scale.
            </h2>
          </div>

          {/* Subtext */}
          <div className="animate-fade-up-delay-2 mt-6 lg:mt-8">
            <p className="font-inter text-white/70 text-sm sm:text-base leading-relaxed max-w-md">
              I design and deliver production-grade RAG systems, end-to-end MLOps pipelines, and scalable cloud data infrastructure — built to handle real workloads, not just demos. If you have a data or AI problem worth solving, <strong className="text-white">let&apos;s get to work.</strong>
            </p>
          </div>

          {/* Links list */}
          <div className="animate-fade-up-delay-3">
            <dl className="mt-10 border-t border-white/20">
              {LINKS.map((link, i) => (
                <div
                  key={link.label}
                  className="flex items-baseline justify-between gap-6 py-4 border-b border-white/20"
                >
                  <dt className="text-sm text-white/50 font-light">{link.label}</dt>
                  <dd>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="text-sm font-medium text-white hover:opacity-60 transition-opacity duration-200"
                    >
                      {link.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── Right column — form ─────────────────────────────────── */}
        <div className="animate-fade-up-delay-4">
          <div
            className="rounded-[1.75rem] p-6 sm:p-8 relative overflow-hidden backdrop-blur-md"
            style={{ background: "rgba(20,20,20,0.4)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            {/* Honeypot — visually hidden from real users, bots fill it and get dropped */}
            <div
              aria-hidden="true"
              className="hidden"
              style={{ display: "none" }}
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name + Email row */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs text-white/70 font-light mb-2 uppercase tracking-wider">Your name</label>
                  <input id="name" aria-label="Your name" type="text" placeholder="Jane Doe" {...register("name")} className={inputBase} />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs text-white/70 font-light mb-2 uppercase tracking-wider">Email</label>
                  <input id="email" aria-label="Email" type="email" placeholder="jane@company.com" {...register("email")} className={inputBase} />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs text-white/70 font-light mb-2 uppercase tracking-wider">Project or message</label>
                <textarea
                  id="message"
                  aria-label="Project or message"
                  rows={5}
                  placeholder="Tell me what you're building…"
                  {...register("message")}
                  className={`${inputBase} resize-none`}
                />
                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
              </div>

              {/* Submit row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitting || sent}
                  className="group flex items-center gap-3 bg-black hover:bg-neutral-900 border border-white/20 hover:border-white/40 px-5 sm:px-7 py-3 sm:py-4 text-[11px] sm:text-xs text-white tracking-widest uppercase transition-all duration-300 disabled:opacity-60"
                >
                  <span>
                    {submitting ? "Sending…" : sent ? "Message sent" : "Get In Touch"}
                  </span>
                  {sent ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </button>
                <span className="text-xs text-white/50 font-light">Usually replies within a day.</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

