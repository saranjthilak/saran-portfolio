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
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      className="glass rounded-3xl p-6 sm:p-8 flex flex-col group hover:bg-white/5 transition-colors"
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">{pub.date}</span>
          <span className="px-2 py-1 text-[10px] font-medium bg-primary/10 text-primary rounded-md uppercase tracking-widest">{pub.journal}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold font-display text-foreground mb-3 group-hover:text-primary transition-colors">
        {pub.title}
      </h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed font-light mb-8 flex-grow">
        {pub.description}
      </p>
      
      <a
        href={pub.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors mt-auto"
      >
        Read Publication <ExternalLink className="w-4 h-4" />
      </a>
    </motion.div>
  );
};

const PublicationsSection = () => {
  return (
    <section id="publications" className="py-20 sm:py-32 px-6 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading 
          title="Publications" 
          tag="Research" 
          index="05" 
          subtitle="Peer-reviewed research in applied machine learning and data science." 
        />
        
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {publications.map((pub, index) => (
            <PublicationCard key={index} pub={pub} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
