"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
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
import { ArrowRight, Send, CheckCircle2, Terminal } from "lucide-react";
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

const ContactForm = () => {
  const [sent, setSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const SERVICE_ID = "service_bryeang";
    const TEMPLATE_ID = "template_quvbu2n";
    const PUBLIC_KEY = "VAq0C9MtRV5tJxyv8";

    // Pass multiple common template variable names just in case the template uses them
    const templateParams = {
      ...values,
      from_name: values.name,
      reply_to: values.email,
      user_name: values.name,
      user_email: values.email,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });
      toast.success("Message sent successfully! I'll get back to you soon.");
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 4000);
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Failed to send message. Please try again.");
    }
  }

  const inputClasses =
    "bg-background/60 border-border text-foreground placeholder:text-muted-foreground/50 rounded-lg py-3 px-4 font-mono text-sm backdrop-blur-sm focus:border-primary/60 focus:ring-1 focus:ring-primary/30 focus:bg-background/80 transition-all duration-300";

  return (
    <div className="relative bg-background/70 backdrop-blur-2xl border border-border rounded-lg overflow-hidden">
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 3px)",
        }}
        aria-hidden
      />

      {/* Header */}
      <div className="relative border-b border-border px-5 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--signal))]/70" />
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-xs tracking-[0.15em] text-foreground/80 uppercase font-semibold">
              Transmit Message
            </span>
          </div>
        </div>
        <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/50 uppercase hidden sm:block">
          SECURE·E2E
        </span>
      </div>

      {/* Form Content */}
      <div className="p-5 sm:p-6 relative z-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <motion.div
              variants={fieldVariants}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/70 text-xs font-mono uppercase tracking-[0.15em] mb-2 block">
                      <span className="text-primary mr-1">›</span> Identifier
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className={inputClasses}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-mono" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              variants={fieldVariants}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/70 text-xs font-mono uppercase tracking-[0.15em] mb-2 block">
                      <span className="text-primary mr-1">›</span> Return Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@domain.com"
                        className={inputClasses}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-mono" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              variants={fieldVariants}
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/70 text-xs font-mono uppercase tracking-[0.15em] mb-2 block">
                      <span className="text-primary mr-1">›</span> Payload
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message..."
                        rows={4}
                        className={`${inputClasses} resize-none`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-mono" />
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
            >
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || sent}
                className={`
                  group w-full relative overflow-hidden rounded-lg py-4 text-sm font-mono font-bold uppercase tracking-[0.2em]
                  transition-all duration-500
                  ${sent
                    ? "bg-[hsl(var(--signal))]/20 border border-[hsl(var(--signal))]/50 text-[hsl(var(--signal))]"
                    : "bg-primary/10 border border-primary/40 text-primary hover:bg-primary hover:text-background hover:shadow-[0_0_30px_hsl(24,95%,53%,0.3)]"
                  }
                  disabled:opacity-60 disabled:cursor-not-allowed
                `}
              >
                {/* Hover sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <span className="relative z-10 flex items-center justify-center gap-2">
                  {form.formState.isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Transmitting...
                    </>
                  ) : sent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Transmission Complete
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      Transmit Signal
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-2 group-hover:ml-0" />
                    </>
                  )}
                </span>
              </Button>
            </motion.div>

            {/* Bottom readout */}
            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/40 uppercase">
                Protocol: EmailJS v4
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/40 uppercase flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[hsl(var(--signal))] animate-pulse" />
                Encrypted
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
