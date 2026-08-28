"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { toast } from "sonner";
import { motion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const RATE_LIMIT_MS = 60_000; // 60-second cooldown between submissions

const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Honeypot check — bots will fill the hidden field
    if (honeypot) return;

    // Rate limiting — prevent rapid-fire submissions
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      toast.error("Please wait a moment before sending another message.");
      return;
    }

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

      toast.success("Message sent successfully! I'll get back to you soon.");
      setSent(true);
      setLastSubmitTime(Date.now());
      form.reset();
      setTimeout(() => setSent(false), 4000);
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    }
  }

  const inputClasses =
    "h-auto rounded-xl border-border bg-background px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:border-accent transition-colors";

  return (
    <div className="rounded-[1.75rem] bg-surface p-6 sm:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Honeypot — real users never see or tab to this; bots fill it and get silently dropped */}
          <div
            aria-hidden="true"
            className="hidden"
            style={{ display: "none" }}
          >
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {(["name", "email"] as const).map((n, i) => (
              <motion.div key={n} variants={fieldVariants} custom={0.1 + i * 0.08} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <FormField
                  control={form.control}
                  name={n}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2 block text-sm text-muted-foreground">
                        {n === "name" ? "Your name" : "Email"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={n === "email" ? "email" : "text"}
                          placeholder={n === "name" ? "Jane Doe" : "jane@company.com"}
                          className={inputClasses}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </motion.div>
            ))}
          </div>

          <motion.div variants={fieldVariants} custom={0.3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 block text-sm text-muted-foreground">Project or message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell me what you're building…"
                      rows={5}
                      className={`${inputClasses} resize-none`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            variants={fieldVariants}
            custom={0.4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-between gap-4 pt-1"
          >
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || sent}
              className="pill pill-dark pill-arrow h-auto hover:bg-ink disabled:opacity-60"
            >
              <span>{form.formState.isSubmitting ? "Sending…" : sent ? "Message sent" : "Send message"}</span>
              <span className="pill-badge bg-white text-ink">
                {sent ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </span>
            </Button>
            <span className="text-xs text-muted-foreground">Usually replies within a day.</span>
          </motion.div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
