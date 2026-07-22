import { motion } from "framer-motion";
import { certifications } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";
import { CheckCircle2 } from "lucide-react";

const CertificationCard = ({ cert, index }: { cert: typeof certifications[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      className="group relative h-full"
    >
      {/* Glow effect behind the card */}
      <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative h-full glass rounded-3xl p-6 sm:p-8 flex flex-col border border-white/5 group-hover:border-primary/30 transition-all duration-500 overflow-hidden bg-background/40 backdrop-blur-xl hover:-translate-y-1">
        
        {/* Subtle animated gradient background inside */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />

        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
            {cert.logo}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-wider font-mono shadow-[0_0_15px_rgba(var(--primary),0.15)] group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-shadow duration-500">
            <CheckCircle2 className="w-3 h-3" />
            <span>Verified</span>
          </div>
        </div>
        
        <div className="relative z-10 flex-grow flex flex-col">
          <h3 className="text-xl font-bold font-display text-foreground mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary/80 transition-all duration-300">
            {cert.title}
          </h3>
          
          {cert.level && (
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse" />
              <span className="text-[11px] font-mono text-primary/80 uppercase tracking-widest">
                {cert.level}
              </span>
            </div>
          )}
          
          <div className="mt-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
              Issued By
            </div>
            <div className="text-sm font-medium text-foreground/90 bg-white/5 px-3 py-1 rounded-md border border-white/5">
              {cert.issuer}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-20 sm:py-32 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Certifications"
          tag="Credentials"
          index="07"
          subtitle="Industry-validated expertise in cloud architecture and generative AI."
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
