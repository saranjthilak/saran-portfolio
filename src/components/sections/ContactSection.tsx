"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Mail, MapPin, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";

import ContactForm from "@/components/ContactForm";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const email = "saranjthilak@gmail.com";

  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10" ref={containerRef}>
        <SectionHeading
          title="Get In Touch"
          tag="Contact"
          index="08"
          subtitle="I'm always open to discussing new opportunities, technical challenges, or collaborations."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-16 sm:mt-24 glass-panel rounded-[2rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-white/[0.05] bg-background/50 backdrop-blur-xl shadow-2xl"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-12 w-full text-center lg:text-left">
            <div className="flex-1 flex flex-col items-center lg:items-start w-full">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-inner flex items-center justify-center text-primary mb-10">
                <Mail className="w-8 h-8" />
              </div>
              
              <h3 className="text-4xl sm:text-5xl font-display font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">Let's build<br/>something.</h3>
              <p className="text-muted-foreground text-lg mb-12 max-w-lg font-light leading-relaxed">
                Whether you need a resilient data pipeline, a scalable RAG architecture, or just want to say hi.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => {}}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 glass rounded-full font-semibold text-foreground hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 border border-white/5 shadow-sm"
                >
                  {copied ? <CheckCircle2 className="w-5 h-5 text-success" /> : <Copy className="w-5 h-5 text-primary/70" />}
                  {copied ? "Copied to clipboard!" : email}
                </button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3 mt-14 text-sm font-medium text-muted-foreground bg-white/5 px-4 py-2 rounded-full border border-white/5 w-fit mx-auto lg:mx-0">
                <MapPin className="w-4 h-4 text-primary" />
                Based in Berlin, Germany
              </div>
            </div>

            <div className="flex-1 w-full max-w-md lg:max-w-none lg:pl-12 lg:border-l border-white/[0.05]">
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
