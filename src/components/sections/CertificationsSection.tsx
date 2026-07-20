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
      className="glass rounded-3xl p-6 sm:p-8 flex flex-col group hover:bg-white/5 transition-colors"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
          {cert.logo}
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-mono">
          <CheckCircle2 className="w-3 h-3" />
          Verified
        </div>
      </div>
      
      <h3 className="text-lg font-bold font-display text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
        {cert.title}
      </h3>
      
      {cert.level && (
        <div className="text-xs font-mono text-primary/80 uppercase tracking-widest mb-2">
          {cert.level}
        </div>
      )}
      
      <div className="text-muted-foreground text-sm mt-auto pt-4">
        Issued by <span className="text-foreground/80 font-medium">{cert.issuer}</span>
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
