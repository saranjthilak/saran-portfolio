import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { useUiSound } from "@/hooks/use-ui-sound";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const email = "saranjthilak@gmail.com";
  const { play } = useUiSound();
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    play("success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 sm:py-32 px-6 sm:px-8 bg-white/[0.01]">
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        <SectionHeading
          title="Get In Touch"
          tag="Contact"
          index="08"
          subtitle="I'm always open to discussing new opportunities, technical challenges, or collaborations."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          className="mt-16 glass rounded-3xl p-8 sm:p-12 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-8">
              <Mail className="w-8 h-8" />
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-foreground">Let's build something.</h3>
            <p className="text-muted-foreground text-lg mb-10 max-w-lg font-light">
              Whether you need a resilient data pipeline, a scalable RAG architecture, or just want to say hi.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href={`mailto:${email}`}
                onMouseEnter={() => play("hover")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
              >
                <Send className="w-4 h-4" />
                Send Email
              </a>
              
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => play("hover")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 glass rounded-full font-medium text-foreground hover:bg-white/5 transition-colors"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>

            <div className="flex items-center gap-2 mt-12 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary/70" />
              Based in Berlin, Germany
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
