"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import FadeIn from "./FadeIn";

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
  "w-full rounded-xl bg-[#181818] border border-[#2a2a2a] px-4 py-3.5 text-[#D7E2EA] placeholder-[#D7E2EA]/30 font-kanit text-sm outline-none focus:border-[#D7E2EA]/40 transition-colors duration-200";

const ContactSection = () => {
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
      className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-50"
      style={{
        background: "#0C0C0C",
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem clamp(4rem, 6vw, 6rem)",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)", // Shadow to emphasize overlap
      }}
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-t-[inherit]">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/80 via-[#0C0C0C]/40 to-[#0C0C0C]/90" />
      </div>

      <div className="mx-auto max-w-6xl grid gap-14 lg:grid-cols-[0.9fr_1.1fr] items-start relative z-10">

        {/* ── Left column ─────────────────────────────────────────── */}
        <div>
          {/* Eyebrow */}
          <FadeIn delay={0} y={20}>
            <p className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-[#D7E2EA]/50 text-xs mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA]/50 inline-block" />
              Contact
            </p>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={0.08} y={30}>
            <h2
              className="font-black leading-[1.02] tracking-tight text-[#D7E2EA]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Let&apos;s build<br />something reliable.
            </h2>
          </FadeIn>

          {/* Sub-text */}
          <FadeIn delay={0.16} y={20}>
            <p
              className="mt-5 font-light text-[#D7E2EA]/50 leading-relaxed max-w-sm"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
            >
              Available for data engineering and generative AI roles or collaborations,
              on-site in Berlin or remote.
            </p>
          </FadeIn>

          {/* Links list */}
          <FadeIn delay={0.24} y={20}>
            <dl className="mt-10 border-t border-[#2a2a2a]">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                  className="flex items-baseline justify-between gap-6 py-4 border-b border-[#2a2a2a]"
                >
                  <dt className="text-sm text-[#D7E2EA]/40 font-light">{link.label}</dt>
                  <dd>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="text-sm font-medium text-[#D7E2EA] hover:opacity-60 transition-opacity duration-200"
                    >
                      {link.value}
                    </a>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </FadeIn>
        </div>

        {/* ── Right column — form ─────────────────────────────────── */}
        <FadeIn delay={0.12} y={30}>
          <div
            className="rounded-[1.75rem] p-6 sm:p-8"
            style={{ background: "#141414", border: "1px solid #2a2a2a" }}
          >
            {/* Honeypot */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden", pointerEvents: "none" }}>
              <label htmlFor="v2-website">Website</label>
              <input id="v2-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name + Email row */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs text-[#D7E2EA]/50 font-light mb-2 uppercase tracking-wider">Your name</label>
                  <input type="text" placeholder="Jane Doe" {...register("name")} className={inputBase} />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs text-[#D7E2EA]/50 font-light mb-2 uppercase tracking-wider">Email</label>
                  <input type="email" placeholder="jane@company.com" {...register("email")} className={inputBase} />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-[#D7E2EA]/50 font-light mb-2 uppercase tracking-wider">Project or message</label>
                <textarea
                  rows={5}
                  placeholder="Tell me what you're building…"
                  {...register("message")}
                  className={`${inputBase} resize-none`}
                />
                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
              </div>

              {/* Submit row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  disabled={submitting || sent}
                  className="inline-flex items-center gap-0 rounded-full font-kanit font-medium uppercase tracking-[0.15em] text-sm disabled:opacity-60 transition-all duration-200 overflow-hidden"
                  style={{
                    background: "#D7E2EA",
                    color: "#0C0C0C",
                    paddingLeft: "2rem",
                    paddingTop: "0.75rem",
                    paddingBottom: "0.75rem",
                  }}
                >
                  <span className="pr-3">
                    {submitting ? "Sending…" : sent ? "Message sent" : "Send message"}
                  </span>
                  <span
                    className="grid place-items-center rounded-full bg-white ml-3 mr-1"
                    style={{ width: 36, height: 36 }}
                  >
                    {sent ? <Check className="w-4 h-4 text-[#0C0C0C]" /> : <ArrowRight className="w-4 h-4 text-[#0C0C0C]" />}
                  </span>
                </button>
                <span className="text-xs text-[#D7E2EA]/30 font-light">Usually replies within a day.</span>
              </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
