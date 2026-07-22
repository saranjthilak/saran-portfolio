import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import { publications } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";

const PublicationCard = ({ pub, index }: { pub: typeof publications[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group relative glass-panel rounded-3xl p-6 sm:p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 border border-white/[0.05] hover:border-white/[0.15] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] bg-background/50 backdrop-blur-xl overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-inner flex items-center justify-center text-primary shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
          <BookOpen className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">{pub.date}</span>
          <span className="px-2.5 py-1 text-[10px] font-medium bg-primary/10 text-primary border border-primary/20 rounded-md uppercase tracking-widest shadow-[0_0_10px_rgba(var(--primary),0.1)]">{pub.journal}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold font-display text-foreground mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary/80 transition-all duration-300 relative z-10">
        {pub.title}
      </h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed font-light mb-8 flex-grow relative z-10">
        {pub.description}
      </p>
      
      <a
        href={pub.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors mt-auto relative z-10 w-fit group/link"
      >
        Read Publication <ExternalLink className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
      </a>
    </motion.div>
  );
};

const PublicationsSection = () => {
  return (
    <section id="publications" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading 
          title="Publications" 
          tag="Research" 
          index="05" 
          subtitle="Peer-reviewed research in applied machine learning and data science." 
        />
        
        <div className="grid md:grid-cols-2 gap-8 mt-16 sm:mt-24">
          {publications.map((pub, index) => (
            <PublicationCard key={index} pub={pub} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
